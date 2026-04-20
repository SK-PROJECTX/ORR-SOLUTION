import { create } from 'zustand';
import api from '@/lib/axios';
import { useToastStore } from './toastStore';

interface PricingPlan {
  id: number;
  name: string;
  stripe_price_id: string;
  amount: number;
  billing_type: string;
  description: string;
  is_active?: boolean;
}

interface SubscriptionStatus {
  is_subscribed: boolean;
}

interface PaymentMethod {
  id: string;
  brand: string;
  last4: string;
  exp_month: number;
  exp_year: number;
}

interface BillingHistory {
  id: number;
  reference_id: string;
  transaction_date: string;
  client_name: string;
  client_email: string;
  payment_method: string;
  amount: string;
  status: string;
  billing_title: string;
  currency: string;
  plan: string;
  users: number;
  invoice_pdf: string;
  hosted_invoice_url: string;
}

interface WalletState {
  isLoading: boolean;
  pricingPlans: PricingPlan[];
  paymentMethods: PaymentMethod[];
  billingHistory: BillingHistory[];
  selectedPlan: PricingPlan | null;
  stripeCustomerId: string | null;
  subscriptionStatus: SubscriptionStatus | null;
  fetchPricingPlans: () => Promise<void>;
  fetchPaymentMethods: () => Promise<void>;
  fetchBillingHistory: () => Promise<void>;
  fetchSubscriptionStatus: () => Promise<void>;
  createStripeCustomer: () => Promise<string | null>;
  createSetupIntent: () => Promise<{clientSecret: string, customerId: string} | null>;
  addPaymentMethod: (paymentMethodId: string) => Promise<boolean>;
  removePaymentMethod: (paymentMethodId: string) => Promise<boolean>;
  setSelectedPlan: (plan: PricingPlan) => void;
  subscribeToPlan: (planId: number, paymentMethodId: string) => Promise<boolean>;
  createCheckoutSession: (priceId: string, paymentMethodId: string) => Promise<string | null>;
}

export const useWalletStore = create<WalletState>()((set, get) => ({
  isLoading: false,
  pricingPlans: [],
  paymentMethods: [],
  billingHistory: [],
  selectedPlan: null,
  stripeCustomerId: null,
  subscriptionStatus: null,

  fetchPricingPlans: async () => {
    set({ isLoading: true });
    try {
      const [plansResponse, statusResponse] = await Promise.all([
        api.get('/pricing-plans/'),
        api.get('/subscription/status/').catch(() => ({ data: { data: { is_subscribed: false } } }))
      ]);
      
      const isSubscribed = statusResponse.data.data?.is_subscribed || false;
      const plans = plansResponse.data.data.map((plan: any) => ({
        ...plan,
        amount: plan.amount / 100,
        is_active: isSubscribed && (plan.amount === 220 || plan.name.toLowerCase().includes('report'))
      }));
      
      set({ 
        pricingPlans: plans, 
        selectedPlan: plans[0] || null, 
        subscriptionStatus: statusResponse.data.data,
        isLoading: false 
      });
    } catch (error) {
      console.error('Failed to fetch pricing plans:', error);
      set({ isLoading: false });
    }
  },

  fetchSubscriptionStatus: async () => {
    try {
      const response = await api.get('/subscription/status/');
      set({ subscriptionStatus: response.data.data });
    } catch (error) {
      console.error('Failed to fetch subscription status:', error);
      set({ subscriptionStatus: { is_subscribed: false } });
    }
  },

  fetchPaymentMethods: async () => {
    try {
      const response = await api.get('/user/payment-methods/');
      console.log('Fetched payment methods:', response.data);
      const methods = response.data.data || response.data || [];
      set({ paymentMethods: methods });
    } catch (error: any) {
      console.error('Failed to fetch payment methods:', error);
      set({ paymentMethods: [] });
    }
  },

  fetchBillingHistory: async () => {
    try {
      const response = await api.get('/billing-history/');
      console.log('Fetched billing history:', response.data);
      const history = response.data.data || response.data || [];
      set({ billingHistory: history });
    } catch (error: any) {
      console.error('Failed to fetch billing history:', error);
      set({ billingHistory: [] });
    }
  },

  createStripeCustomer: async () => {
    try {
      const response = await api.post('/user/create-stripe-customer/');
      const customerId = response.data.customer_id;
      set({ stripeCustomerId: customerId });
      return customerId;
    } catch (error) {
      console.error('Failed to create Stripe customer:', error);
      useToastStore.getState().addToast('Failed to create customer', 'error');
      return null;
    }
  },

  createSetupIntent: async () => {
    try {
      const response = await api.post('/setup-intent/');
      console.log('Setup intent created:', response.data);
      const { client_secret, customer_id } = response.data.data;
      set({ stripeCustomerId: customer_id });
      return { clientSecret: client_secret, customerId: customer_id };
    } catch (error: any) {
      console.error('Failed to create setup intent:', error);
      const errorMessage = error.response?.data?.message || 'Failed to setup payment';
      useToastStore.getState().addToast(errorMessage, 'error');
      return null;
    }
  },

  addPaymentMethod: async (paymentMethodId: string) => {
    console.log('=== ADDING PAYMENT METHOD ===');
    console.log('Payment Method ID:', paymentMethodId);
    console.log('API Endpoint: /user/add-payment-method/');
    console.log('Payload:', { payment_method_id: paymentMethodId });
    
    try {
      const response = await api.post('/user/add-payment-method/', {
        payment_method_id: paymentMethodId
      });
      console.log('✅ Payment method API response:', response.data);
      
      // Refresh payment methods
      console.log('🔄 Refreshing payment methods...');
      await get().fetchPaymentMethods();
      const message = response.data?.message || 'Payment method added successfully';
      useToastStore.getState().addToast(message, 'success');
      return true;
    } catch (error: any) {
      console.error('❌ Failed to add payment method:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      const errorMessage = error.response?.data?.message || 'Failed to add payment method';
      useToastStore.getState().addToast(errorMessage, 'error');
      return false;
    }
  },

  removePaymentMethod: async (paymentMethodId: string) => {
    try {
      await api.delete(`/user/payment-methods/${paymentMethodId}/`);
      
      // Refresh payment methods
      await get().fetchPaymentMethods();
      useToastStore.getState().addToast('Payment method removed successfully', 'success');
      return true;
    } catch (error) {
      console.error('Failed to remove payment method:', error);
      useToastStore.getState().addToast('Failed to remove payment method', 'error');
      return false;
    }
  },

  setSelectedPlan: (plan: PricingPlan) => {
    set({ selectedPlan: plan });
  },

  subscribeToPlan: async (planId: number, paymentMethodId: string) => {
    set({ isLoading: true });
    try {
      const response = await api.post('/subscribe/', {
        plan_id: planId,
        payment_method_id: paymentMethodId
      });
      
      const message = response.data?.message || 'Successfully subscribed to plan!';
      useToastStore.getState().addToast(message, 'success');
      set({ isLoading: false });
      return true;
    } catch (error) {
      console.error('Failed to subscribe to plan:', error);
      useToastStore.getState().addToast('Failed to subscribe to plan', 'error');
      set({ isLoading: false });
      return false;
    }
  },

  createCheckoutSession: async (priceId: string, paymentMethodId: string) => {
    try {
      const origin = typeof window !== 'undefined' ? window.location.origin : '';
      const response = await api.post('/payments/create-checkout/', {
        price_id: priceId,
        payment_method_id: paymentMethodId,
        success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/payment/cancel`,
      });
      
      const checkoutData = response.data?.data || response.data;
      const message = response.data?.message || 'Redirecting to checkout...';
      useToastStore.getState().addToast(message, 'success');

      if (checkoutData?.checkout_url) {
        return checkoutData.checkout_url;
      }
      return null;
    } catch (error: any) {
      console.error('Failed to create checkout session:', error);
      const errorMessage = error.response?.data?.message || 'Failed to create checkout session';
      useToastStore.getState().addToast(errorMessage, 'error');
      return null;
    }
  },
}));