"use client";

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { verifyEmail, isLoading } = useAuthStore();
  
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const uid = searchParams.get('uid');
    const token = searchParams.get('token');
    const email = searchParams.get('email');

    if (uid && token && email) {
      verifyEmail(uid, token, email).then((success) => {
        setStatus(success ? 'success' : 'error');
      });
    } else {
      setStatus('error');
    }
  }, [searchParams, verifyEmail]);

  useEffect(() => {
    if (status === 'success') {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            router.push('/login');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [status, router]);

  const renderContent = () => {
    switch (status) {
      case 'loading':
        return (
          <>
            <Loader2 className="w-16 h-16 text-blue-500 animate-spin mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Verifying Email</h1>
            <p className="text-black">Please wait while we verify your email address...</p>
          </>
        );
      
      case 'success':
        return (
          <>
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Email Verified Successfully!</h1>
            <p className="text-black mb-4">Your email has been verified. You can now access your account.</p>
            <p className="text-sm text-black">
              Redirecting to login in {countdown} second{countdown !== 1 ? 's' : ''}...
            </p>
          </>
        );
      
      case 'error':
        return (
          <>
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Verification Failed</h1>
            <p className="text-black mb-4">
              The verification link is invalid or has expired. Please try registering again.
            </p>
            <button
              onClick={() => router.push('/register')}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Go to Register
            </button>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        {renderContent()}
      </div>
    </div>
  );
}

export default function VerifyEmail() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <Loader2 className="w-16 h-16 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-black">Loading...</p>
        </div>
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
}