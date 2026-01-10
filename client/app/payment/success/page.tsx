"use client";

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function PaymentSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    // Redirect to wallet after 5 seconds
    const timer = setTimeout(() => {
      router.push('/account/wallet');
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0A1929] to-[#071626] text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Success Card */}
        <div className="bg-card border border-[#1E3A4B] rounded-xl p-8 text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-[#22C55E] rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-black" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>

          {/* Success Message */}
          <h1 className="text-2xl font-bold text-[#22C55E] mb-2">Payment Successful!</h1>
          <p className="text-gray-300 mb-6">
            Your payment has been processed successfully. Thank you for your purchase!
          </p>

          {/* Session ID */}
          {sessionId && (
            <div className="bg-[#0A1929] border border-[#1E3A4B] rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-400 mb-1">Session ID:</p>
              <p className="text-xs text-[#22C55E] font-mono break-all">{sessionId}</p>
            </div>
          )}

          {/* Redirect Info */}
          <div className="space-y-4">
            <p className="text-sm text-gray-400">
              Redirecting to your wallet in 5 seconds...
            </p>
            
            {/* Manual Redirect Button */}
            <button
              onClick={() => router.push('/account/wallet')}
              className="w-full bg-[#22C55E] text-black font-semibold py-3 rounded-lg hover:bg-[#22C55E]/90 transition-colors"
            >
              Go to Wallet Now
            </button>
          </div>

          {/* Loading Animation */}
          <div className="mt-6">
            <div className="w-full bg-[#1E3A4B] rounded-full h-1">
              <div className="bg-[#22C55E] h-1 rounded-full animate-pulse" style={{width: '100%'}}></div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            You will receive a confirmation email shortly.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentSuccessContent />
    </Suspense>
  );
}