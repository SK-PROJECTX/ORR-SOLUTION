"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useWalletStore } from "@/store/walletStore";
import { useToastStore } from "@/store/toastStore";
import PaymentMethodModal from "@/components/wallet/PaymentMethodModal";
import PaymentCardModal from "@/components/wallet/PaymentCardModal";

export default function PlansBillingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [isPlanDropdownOpen, setIsPlanDropdownOpen] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const {
    pricingPlans,
    paymentMethods,
    billingHistory,
    selectedPlan,
    subscriptionStatus,
    isLoading,
    fetchPricingPlans,
    fetchPaymentMethods,
    fetchBillingHistory,
    fetchSubscriptionStatus,
    setSelectedPlan
  } = useWalletStore();
  const { addToast } = useToastStore();

  useEffect(() => {
    fetchPricingPlans();
    fetchPaymentMethods();
    fetchBillingHistory();
    fetchSubscriptionStatus();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isPlanDropdownOpen) {
        setIsPlanDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isPlanDropdownOpen]);
  return (
    <div className="min-h-screen w-full text-white px-4 py-10 flex flex-col items-center">
      <div className="w-full max-w-6xl">
        {/* Page Title */}
        <h1 className="text-3xl font-semibold text-[#22C55E] mb-6">My Wallet</h1>

        {/* Two Top Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">

          {/* Basic Plan Card */}
          <div className="bg-card border border-[#1E3A4B] rounded-xl p-6">
            <h3 className="text-xl font-semibold text-[#22C55E] mb-2">{selectedPlan?.name || 'Basic plan'}</h3>
            <p className="text-sm text-gray-300 mb-6">{selectedPlan?.description || 'Our most popular plan for small teams.'}</p>

            {/* Avatars */}
            <div className="flex -space-x-2 mb-6">
              <div className="w-8 h-8 rounded-full bg-gray-300"></div>
              <div className="w-8 h-8 rounded-full bg-gray-400"></div>
              <div className="w-8 h-8 rounded-full bg-gray-500"></div>
              <div className="w-8 h-8 rounded-full bg-gray-600"></div>
              <div className="w-8 h-8 rounded-full bg-gray-700"></div>
            </div>

            <div className="flex items-end justify-between">
              <p className="text-3xl font-bold text-[#22C55E]">
                ${selectedPlan?.amount || 20}
                <span className="text-sm text-gray-300">per {selectedPlan?.billing_type === 'monthly' ? 'month' : selectedPlan?.billing_type || 'month'}</span>
              </p>
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsPlanDropdownOpen(!isPlanDropdownOpen);
                  }}
                  className="text-[#22C55E] text-sm flex items-center gap-1 hover:text-[#22C55E]/80"
                >
                  Change plan <ChevronDown className="w-4 h-4" />
                </button>

                {isPlanDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-[#071626] border border-[#1E3A4B] rounded-lg shadow-lg z-10">
                    {pricingPlans.map((plan) => (
                      <button
                        key={plan.id}
                        onClick={() => {
                          const isReportPlan = plan.amount === 220;
                          if (!isReportPlan || !subscriptionStatus?.is_subscribed) {
                            setSelectedPlan(plan);
                            setIsPlanDropdownOpen(false);
                          }
                        }}
                        disabled={plan.amount === 220 && subscriptionStatus?.is_subscribed}
                        className={`w-full text-left p-3 hover:bg-[#1E3A4B] first:rounded-t-lg last:rounded-b-lg ${plan.amount === 220 && subscriptionStatus?.is_subscribed ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium text-[#22C55E]">{plan.name}</div>
                            <div className="text-sm text-gray-300">${plan.amount}/{plan.billing_type === 'monthly' ? 'month' : plan.billing_type}</div>
                            <div className="text-xs text-gray-400">{plan.description}</div>
                          </div>
                          {plan.amount === 220 && subscriptionStatus?.is_subscribed && (
                            <span className="text-xs bg-[#22C55E] text-black px-2 py-1 rounded">Subscribed</span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={() => {
                  if (!selectedPlan) return;
                  const isReportPlan = (selectedPlan.name?.toLowerCase().includes('report')) || (selectedPlan.amount === 220);
                  if (isReportPlan && subscriptionStatus?.is_subscribed) {
                    addToast('You are already subscribed to the report plan', 'info');
                    return;
                  }
                  if (paymentMethods.length === 0) {
                    addToast('Please add a payment method first', 'error');
                    return;
                  }
                  setIsCardModalOpen(true);
                }}
                disabled={(((selectedPlan?.name?.toLowerCase().includes('report')) || (selectedPlan?.amount === 220)) && subscriptionStatus?.is_subscribed) || checkoutLoading}
                className={`w-full py-3 rounded-lg font-semibold transition-colors ${(((selectedPlan?.name?.toLowerCase().includes('report')) || (selectedPlan?.amount === 220)) && subscriptionStatus?.is_subscribed)
                  ? 'bg-[#1E3A4B] text-black cursor-not-allowed border border-gray-700 opacity-60'
                  : 'bg-[#22C55E] text-black hover:bg-[#22C55E]/90'
                  }`}
              >
                {(((selectedPlan?.name?.toLowerCase().includes('report')) || (selectedPlan?.amount === 220)) && subscriptionStatus?.is_subscribed)
                  ? 'Subscribed'
                  : checkoutLoading
                    ? 'Processing...'
                    : `Checkout - $${selectedPlan?.amount || 20}`
                }
              </button>
            </div>
          </div>

          {/* Payment Method Card */}
          <div className="bg-card border border-[#1E3A4B] rounded-xl p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-[#22C55E] mb-1">Payment method</h3>
                <p className="text-sm text-gray-300">Change how you pay for your plan.</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={async () => {
                    try {
                      await fetchPaymentMethods();
                      addToast('Payment methods refreshed', 'success');
                    } catch (error) {
                      addToast('Failed to refresh payment methods', 'error');
                    }
                  }}
                  className="text-[#22C55E] text-sm hover:text-[#22C55E]/80"
                >
                  🔄 Refresh
                </button>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="text-[#22C55E] text-sm hover:text-[#22C55E]/80"
                >
                  + Add Card
                </button>
              </div>
            </div>

            {paymentMethods.length > 0 ? (
              <div className="space-y-3">
                {paymentMethods.map((method) => {
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
                    <div key={method.id} className="bg-white text-black rounded-lg p-4 flex items-center justify-between shadow">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{getCardIcon(method.brand)}</span>
                          <span className={`text-xl font-bold ${getCardColor(method.brand)}`}>{method.brand.toUpperCase()}</span>
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{method.brand} ending in {method.last4}</p>
                          <span className="text-xs text-black">Expiry {method.exp_month.toString().padStart(2, '0')}/{method.exp_year}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-[#22C55E] text-black font-semibold px-6 py-2 rounded-md text-sm hover:bg-[#22C55E]/90"
                      >
                        Edit
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-400 mb-4">No payment methods added</p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-[#22C55E] text-black font-semibold px-6 py-2 rounded-md text-sm hover:bg-[#22C55E]/90"
                >
                  Add Payment Method
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Billing History */}
        <div className="bg-card border border-[#1E3A4B] rounded-xl p-6 mb-20">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-xl font-semibold text-[#22C55E] mb-1">Billing history</h3>
              <p className="text-sm text-gray-300">Download your previous plan receipts and usage details.</p>
            </div>
            <button className="bg-[#22C55E] text-black font-semibold px-6 py-2 rounded-md text-sm">Download all</button>
          </div>

          {/* Billing Table */}
          <div className="w-full overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-gray-300 border-b border-[#1E3A4B]">
                  <th className="py-3">Billing</th>
                  <th>Billing Date</th>
                  <th>Amount</th>
                  <th>Plan</th>
                  <th>Users</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {billingHistory.length > 0 ? (
                  billingHistory.map((bill) => (
                    <tr key={bill.id} className="border-b border-[#1E3A4B] text-gray-200 text-nowrap">
                      <td className="py-4 flex items-center gap-3">
                        <div className={`w-4 h-4 border rounded-sm ${bill.status.toLowerCase() === 'paid'
                          ? 'border-[#22C55E] bg-[#22C55E]'
                          : 'border-yellow-500 bg-yellow-500'
                          }`}></div>
                        <span className="text-[#22C55E]">{bill.billing_title}</span>
                        <span className="text-gray-400">{bill.status}</span>
                      </td>
                      <td>{new Date(bill.transaction_date).toLocaleDateString()}</td>
                      <td>{bill.currency} ${Math.abs(parseFloat(bill.amount)).toFixed(2)}</td>
                      <td>{bill.plan}</td>
                      <td>{bill.users} Users</td>
                      <td>
                        {bill.hosted_invoice_url && (
                          <a
                            href={bill.hosted_invoice_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#22C55E] text-black font-semibold px-4 py-2 rounded-md text-sm hover:bg-[#22C55E]/90"
                          >
                            Download
                          </a>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-gray-400">
                      No billing history found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <PaymentMethodModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          fetchPaymentMethods();
        }}
        mode="add"
      />

      <PaymentCardModal
        isOpen={isCardModalOpen}
        onClose={() => setIsCardModalOpen(false)}
        paymentMethods={paymentMethods}
        isLoading={checkoutLoading}
        onSelectCard={async (paymentMethodId) => {
          if (!selectedPlan) return;

          setCheckoutLoading(true);
          try {
            const { createCheckoutSession } = useWalletStore.getState();
            const checkoutUrl = await createCheckoutSession(
              selectedPlan.stripe_price_id,
              paymentMethodId
            );

            if (checkoutUrl) {
              window.location.href = checkoutUrl;
            } else {
              // Refresh status if it was a direct subscription (no redirect)
              await fetchSubscriptionStatus();
            }
          } catch (error) {
            console.error('Checkout error:', error);
          } finally {
            setCheckoutLoading(false);
            setIsCardModalOpen(false);
          }
        }}
      />
    </div>
  );
}