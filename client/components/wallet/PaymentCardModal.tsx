"use client";

import React from 'react';
import { X } from 'lucide-react';

interface PaymentMethod {
  id: string;
  brand: string;
  last4: string;
  exp_month: number;
  exp_year: number;
}

interface PaymentCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  paymentMethods: PaymentMethod[];
  onSelectCard: (paymentMethodId: string) => void;
  isLoading?: boolean;
}

export default function PaymentCardModal({ 
  isOpen, 
  onClose, 
  paymentMethods, 
  onSelectCard,
  isLoading = false 
}: PaymentCardModalProps) {
  if (!isOpen) return null;

  const getCardIcon = (brand: string) => {
    switch (brand.toLowerCase()) {
      case 'visa': return '💳';
      case 'mastercard': return '💳';
      case 'amex': return '💳';
      case 'discover': return '💳';
      default: return '💳';
    }
  };
  
  const getCardColor = (brand: string) => {
    switch (brand.toLowerCase()) {
      case 'visa': return 'text-blue-600';
      case 'mastercard': return 'text-red-600';
      case 'amex': return 'text-green-600';
      case 'discover': return 'text-orange-600';
      default: return 'text-black';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#071626] border border-[#1E3A4B] rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-[#22C55E]">Select Payment Method</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {paymentMethods.length > 0 ? (
          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => onSelectCard(method.id)}
                disabled={isLoading}
                className="w-full bg-white text-black rounded-lg p-4 flex items-center justify-between shadow hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{getCardIcon(method.brand)}</span>
                    <span className={`text-xl font-bold ${getCardColor(method.brand)}`}>
                      {method.brand.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-sm">{method.brand} ending in {method.last4}</p>
                    <span className="text-xs text-black">
                      Expiry {method.exp_month.toString().padStart(2, '0')}/{method.exp_year}
                    </span>
                  </div>
                </div>
                <div className="text-[#22C55E] font-semibold">
                  Select
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-400 mb-4">No payment methods available</p>
            <p className="text-sm text-black">Please add a payment method first</p>
          </div>
        )}

        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}