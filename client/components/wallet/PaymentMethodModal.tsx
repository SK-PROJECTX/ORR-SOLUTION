"use client";

import { useState } from 'react';

import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { X } from 'lucide-react';
import { useWalletStore } from '@/store/walletStore';

const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY 
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null;

interface PaymentMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'add' | 'edit';
}

const PaymentForm = ({ onClose }: { onClose: () => void }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const { fetchPaymentMethods } = useWalletStore();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Payment form submitted');

    if (!stripe || !elements) {
      console.log('Stripe or elements not ready');
      return;
    }

    setIsLoading(true);

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      console.log('Card element not found');
      return;
    }

    try {
      // Create payment method with Stripe
      console.log('Creating payment method with Stripe...');
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        console.error('Error creating payment method:', error);
        return;
      }

      console.log('Payment method created:', paymentMethod);

      const { createStripeCustomer, addPaymentMethod } = useWalletStore.getState();

      // First ensure customer exists
      console.log('Ensuring Stripe customer exists...');
      await createStripeCustomer();

      // Send payment method ID to backend
      console.log('Sending payment method ID to backend...');
      const success = await addPaymentMethod(paymentMethod.id);

      if (success) {
        onClose();
      }
    } catch (error) {
      console.error('Error in payment flow:', error);
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