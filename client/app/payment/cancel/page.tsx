"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PaymentCancelPage() {
  const router = useRouter();

  useEffect(() => {
    const getRedirectUrl = () => {
      if (typeof window !== 'undefined') {
        return window.location.hostname === "localhost"
          ? "/dashboard"
          : "https://orr.solutions/dashboard";
      }
      return "/dashboard";
    };

    // Redirect to dashboard after 3 seconds
    const timer = setTimeout(() => {
      const url = getRedirectUrl();
      if (url.startsWith("http")) {
        window.location.href = url;
      } else {
        router.push(url);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  const handleManualRedirect = () => {
    const url =
      typeof window !== "undefined" && window.location.hostname === "localhost"
        ? "/dashboard"
        : "https://orr.solutions/dashboard";

    if (url.startsWith("http")) {
      window.location.href = url;
    } else {
      router.push(url);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0A1929] to-[#071626] text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Cancel Card */}
        <div className="bg-card border border-[#1E3A4B] rounded-xl p-8 text-center">
          {/* Cancel Icon */}
          <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          {/* Cancel Message */}
          <h1 className="text-2xl font-bold text-red-400 mb-2">
            Payment Cancelled
          </h1>
          <p className="text-gray-300 mb-6">
            Your payment was cancelled. No charges were made to your account.
          </p>

          {/* Redirect Info */}
          <div className="space-y-4">
            <p className="text-sm text-gray-400">
              Redirecting to your dashboard in 3 seconds...
            </p>

            {/* Manual Redirect Button */}
            <button
              onClick={handleManualRedirect}
              className="w-full bg-[#22C55E] text-black font-semibold py-3 rounded-lg hover:bg-[#22C55E]/90 transition-colors"
            >
              Return to Dashboard
            </button>
          </div>

          {/* Loading Animation */}
          <div className="mt-6">
            <div className="w-full bg-[#1E3A4B] rounded-full h-1">
              <div className="bg-red-500 h-1 rounded-full animate-pulse" style={{width: '100%'}}></div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            You can try again anytime from your wallet.
          </p>
        </div>
      </div>
    </div>
  );
}