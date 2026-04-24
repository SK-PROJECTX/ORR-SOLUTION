"use client";

import { useState } from 'react';

import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { X } from 'lucide-react';
import { useWalletStore } from '@/store/walletStore';
import { useToastStore } from '@/store/toastStore';

const getStripe = () => {
  const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  if (!key) return null;
  
  // Basic validation to ensure no quotes were accidentally included
  const cleanKey = key.replace(/['"]+/g, '').trim();
  return loadStripe(cleanKey);
};

let stripePromise: Promise<any> | null = null;
if (typeof window !== 'undefined') {
  stripePromise = getStripe();
}

interface PaymentMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'add' | 'edit';
}

const PaymentForm = ({ onClose }: { onClose: () => void }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const { fetchPaymentMethods, healthCheck } = useWalletStore();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Payment form submitted');

    if (!stripe || !elements) {
      console.log('Stripe or elements not ready', { stripe: !!stripe, elements: !!elements });
      return;
    }

    setIsLoading(true);

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      console.log('Card element not found');
      setIsLoading(false);
      return;
    }

    try {
      // Diagnostic logging
      const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '';
      console.log('🔍 Stripe Diagnostic:', {
        keyPresent: !!key,
        keyLength: key.length,
        keyStart: key ? `${key.substring(0, 7)}...` : 'none',
        keyEnd: key ? `...${key.substring(key.length - 4)}` : 'none',
        hasQuotes: /['"]/.test(key),
        stripeReady: !!stripe,
        elementsReady: !!elements
      });

      // Create payment method with Stripe
      console.log('Creating payment method with Stripe...');
      const result = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (result.error) {
        console.error('❌ STRIPE ERROR DETECTED');
        console.dir(result.error); // Best for browser inspection

        const err = result.error;
        console.log('--- Error Details ---');
        console.log('Type:', err.type);
        console.log('Code:', (err as any).code);
        console.log('Decline Code:', (err as any).decline_code);
        console.log('Message:', err.message);
        console.log('Param:', (err as any).param);
        console.log('---------------------');
        
        setErrorMessage(err.message || 'Failed to create payment method');
        useToastStore.getState().addToast(err.message || 'Failed to create payment method', 'error');
        return;
      }

      setErrorMessage(null); // Clear any previous errors on success

      console.log('✅ RAW STRIPE RESULT:', result);
      const paymentMethod = result.paymentMethod;
      console.log('✅ Payment method created:', paymentMethod);

      const { createStripeCustomer, addPaymentMethod } = useWalletStore.getState();

      // First ensure customer exists
      console.log('Ensuring Stripe customer exists...');
      const customerId = await createStripeCustomer();
      if (!customerId) {
        console.error('Failed to ensure Stripe customer exists');
        // Toast is already handled in createStripeCustomer
        return;
      }

      // Send payment method ID to backend
      console.log('Sending payment method ID to backend...');
      const success = await addPaymentMethod(paymentMethod.id);

      if (success) {
        console.log('✅ Payment method successfully added to account');
        onClose();
      }
    } catch (error: any) {
      console.error('❌ Error in payment flow:', error);
      useToastStore.getState().addToast(error.message || 'An unexpected error occurred', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-4 border border-[#1E3A4B] rounded-lg bg-[#0A1929]">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#ffffff',
                '::placeholder': {
                  color: '#9ca3af',
                },
              },
            },
          }}
        />
      </div>

      {isLoading && (
        <div className="text-sm text-gray-400 animate-pulse text-center">
          Verifying card with Stripe...
        </div>
      )}

      {errorMessage && (
        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
          {errorMessage}
        </div>
      )}

      <div className="flex gap-3 justify-end">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border border-[#1E3A4B] rounded-lg hover:bg-[#1E3A4B] transition-colors text-white"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!stripe || isLoading}
          className="px-4 py-2 bg-[#22C55E] text-black rounded-lg hover:bg-[#22C55E]/90 transition-colors disabled:opacity-50"
        >
          {isLoading ? 'Adding...' : 'Add Card'}
        </button>
      </div>

      <div className="pt-4 border-t border-[#1E3A4B]">
        <button
          type="button"
          onClick={async () => {
            setConnectionStatus('testing');
            const success = await healthCheck();
            setConnectionStatus(success ? 'success' : 'error');
          }}
          disabled={connectionStatus === 'testing'}
          className={`text-xs flex items-center gap-2 px-3 py-1.5 rounded bg-[#1E3A4B]/50 hover:bg-[#1E3A4B] transition-colors ${
            connectionStatus === 'success' ? 'text-[#22C55E]' : 
            connectionStatus === 'error' ? 'text-red-500' : 'text-gray-400'
          }`}
        >
          {connectionStatus === 'testing' ? 'Testing Connection...' : 
           connectionStatus === 'success' ? '✅ Server Connected' :
           connectionStatus === 'error' ? '❌ Server Connection Failed' : 'Test Server Connectivity'}
        </button>
      </div>
    </form>
  );
};

export default function PaymentMethodModal({ isOpen, onClose, mode }: PaymentMethodModalProps) {
  if (!isOpen) return null;

  // Check if Stripe is configured
  if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-[#071626] border border-[#1E3A4B] rounded-xl p-6 w-full max-w-md mx-4">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-[#22C55E]">
              Payment Configuration Error
            </h3>
            <button
              onClick={onClose}
              className="p-1 hover:bg-[#1E3A4B] rounded-lg transition-colors text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="text-center py-8">
            <p className="text-gray-400 mb-4">Stripe is not configured properly.</p>
            <p className="text-sm text-gray-500 mb-4">Please contact support to set up payment processing.</p>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#22C55E] text-black rounded-lg hover:bg-[#22C55E]/90 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#071626] border border-[#1E3A4B] rounded-xl p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-[#22C55E]">
            {mode === 'add' ? 'Add Payment Method' : 'Edit Payment Method'}
          </h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-[#1E3A4B] rounded-lg transition-colors text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <Elements stripe={stripePromise}>
          <PaymentForm onClose={onClose} />
        </Elements>
      </div>
    </div>
  );
}