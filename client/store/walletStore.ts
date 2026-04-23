import { create } from 'zustand';
import api from '@/lib/axios';
import { useToastStore } from './toastStore';
import { useOnboardingStore } from './onboardingStore';

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

interface Transaction {
  id: string;
  type: 'top_up' | 'payment' | 'refund' | 'deduction';
  amount: number;
  currency: string;
  status: 'completed' | 'pending' | 'failed';
  date: string;
  description: string;
  reference_id?: string;
  receipt_url?: string;
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
  walletBalance: number;
  currency: string;
  pricingPlans: PricingPlan[];
  paymentMethods: PaymentMethod[];
  billingHistory: BillingHistory[];
  transactions: Transaction[];
  selectedPlan: PricingPlan | null;
  stripeCustomerId: string | null;
  subscriptionStatus: SubscriptionStatus | null;
  
  // Actions
  fetchWalletBalance: () => Promise<void>;
  fetchPricingPlans: () => Promise<void>;
  fetchPaymentMethods: () => Promise<void>;
  fetchBillingHistory: () => Promise<void>;
  fetchTransactions: (params?: { page?: number; type?: string; status?: string }) => Promise<void>;
  fetchSubscriptionStatus: () => Promise<void>;
  createStripeCustomer: () => Promise<string | null>;
  createSetupIntent: () => Promise<{clientSecret: string, customerId: string} | null>;
  addPaymentMethod: (paymentMethodId: string) => Promise<boolean>;
  removePaymentMethod: (paymentMethodId: string) => Promise<boolean>;
  setSelectedPlan: (plan: PricingPlan) => void;
  subscribeToPlan: (planId: number, paymentMethodId: string) => Promise<boolean>;
  createCheckoutSession: (priceId: string, paymentMethodId: string) => Promise<string | null>;
  initiateTopUp: (amount: number, paymentMethodId?: string) => Promise<string | null>;
  settleInvoiceWithWallet: (invoiceId: string, amount: number) => Promise<boolean>;
  updateCurrency: (currency: 'USD' | 'EUR') => Promise<boolean>;
  healthCheck: () => Promise<boolean>;
}

export const useWalletStore = create<WalletState>()((set, get) => ({
  isLoading: false,
  walletBalance: 0,
  currency: 'USD',
  pricingPlans: [],
  paymentMethods: [],
  billingHistory: [],
  transactions: [],
  selectedPlan: null,
  stripeCustomerId: null,
  subscriptionStatus: null,

  fetchWalletBalance: async () => {
    try {
      const response = await api.get('/wallet/balance/');
      set({ 
        walletBalance: response.data.data?.balance || 0,
        currency: response.data.data?.currency || 'USD'
      });
    } catch (error) {
      console.error('Failed to fetch wallet balance:', error);
      // Fallback to 0 if endpoint doesn't exist
      set({ walletBalance: 0 });
    }
  },

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
      const errorMessage = error.response?.data?.message || 'Failed to fetch payment methods. Please check if your account is fully set up.';
      useToastStore.getState().addToast(errorMessage, 'error');
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

  fetchTransactions: async (params = {}) => {
    set({ isLoading: true });
    try {
      const response = await api.get('/wallet/transactions/', { params });
      set({ 
        transactions: response.data.data?.results || response.data.data || [],
        isLoading: false 
      });
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
      set({ isLoading: false, transactions: [] });
    }
  },

  createStripeCustomer: async () => {
    // Reuse existing ID if we already have it
    const currentId = get().stripeCustomerId;
    if (currentId) {
      console.log('✅ Reusing existing Stripe Customer ID:', currentId);
      return currentId;
    }

    try {
      console.log('🚀 Attempting to create/ensure Stripe customer on backend...');
      const response = await api.post('/user/create-stripe-customer/');
      const customerId = response.data.customer_id;
      
      console.log('✅ Stripe Customer Ensured:', customerId);
      set({ stripeCustomerId: customerId });
      return customerId;
    } catch (error: any) {
      console.error('❌ Failed to create Stripe customer:', error);
      
      const status = error.response?.status;
      const statusText = error.response?.statusText || '';
      const serverMessage = error.response?.data?.message || error.response?.data?.error || '';
      
      let displayMessage = `Billing Error (${status}): ${statusText}`;
      if (serverMessage) displayMessage += ` - ${serverMessage}`;
      if (status === 500) displayMessage += ' (Check backend Stripe keys)';

      useToastStore.getState().addToast(displayMessage, 'error');
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
      const status = error.response?.status;
      const serverMessage = error.response?.data?.message || 'Failed to add payment method';
      
      useToastStore.getState().addToast(`Error (${status}): ${serverMessage}`, 'error');
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
        // Multiple variants for compatibility
        success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/payment/cancel`,
        successUrl: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${origin}/payment/cancel`,
        site_url: origin,
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

  initiateTopUp: async (amount: number, paymentMethodId?: string) => {
    try {
      const origin = typeof window !== 'undefined' ? window.location.origin : '';
      const response = await api.post('/wallet/topup/', {
        amount,
        payment_method_id: paymentMethodId,
        success_url: `${origin}/account/wallet?success=true`,
        cancel_url: `${origin}/account/wallet?canceled=true`,
      });
      
      const data = response.data?.data || response.data;
      if (data?.checkout_url) {
        return data.checkout_url;
      }
      
      // If immediate success (e.g. using saved card on backend)
      await get().fetchWalletBalance();
      useToastStore.getState().addToast('Top-up successful', 'success');
      return null;
    } catch (error: any) {
      console.error('Failed to initiate top-up:', error);
      const errorMessage = error.response?.data?.message || 'Failed to initiate top-up';
      useToastStore.getState().addToast(errorMessage, 'error');
      return null;
    }
  },

  settleInvoiceWithWallet: async (invoiceId: string, amount: number) => {
    try {
      await api.post('/wallet/pay-invoice/', {
        invoice_id: invoiceId,
        amount
      });
      
      await get().fetchWalletBalance();
      useToastStore.getState().addToast('Invoice settled using wallet balance', 'success');
      return true;
    } catch (error: any) {
      console.error('Failed to settle invoice:', error);
      const errorMessage = error.response?.data?.message || 'Insufficient wallet balance';
      useToastStore.getState().addToast(errorMessage, 'error');
      return false;
    }
  },

  updateCurrency: async (newCurrency: 'USD' | 'EUR') => {
    set({ isLoading: true });
    try {
      // Get the current onboarding status to preserve existing preferences
      // This prevents 500 errors caused by missing required fields in the backend
      const { onboardingStatus } = useOnboardingStore.getState();
      
      const payload = {
        ...onboardingStatus,
        currency: newCurrency,
        is_completed: true
      };

      // Remove internal metadata fields that shouldn't be sent back
      delete (payload as any).id;
      delete (payload as any).created_at;
      delete (payload as any).updated_at;

      await api.post('/onboarding/submit/', payload);
      
      // Update local state
      set({ currency: newCurrency, isLoading: false });
      
      // Refresh balance to ensure consistency
      await get().fetchWalletBalance();
      
      useToastStore.getState().addToast('Currency updated successfully', 'success');
      return true;
    } catch (error: any) {
      console.error('Failed to update currency:', error);
      set({ isLoading: false });
      return false;
    }
  },

  healthCheck: async () => {
    try {
      console.log('🚀 Running Backend Health Check...');
      const response = await api.get('/pricing-plans/');
      console.log('✅ Health Check (Public Endpoint) Success:', response.data);
      return true;
    } catch (error: any) {
      console.error('❌ Health Check Failed:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        url: error.config?.url
      });
      return false;
    }
  },
}));