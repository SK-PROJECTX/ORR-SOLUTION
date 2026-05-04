'use client';

import { useEffect, useCallback } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { useOnboardingStore } from '@/store/onboardingStore';

export function useGoogleAuth() {
  const { googleLogin, isLoading } = useAuthStore();
  const router = useRouter();

  const handleCredentialResponse = useCallback(async (response: any) => {
    try {
      const success = await googleLogin(response.credential);
      if (success) {
        const onboardingStatus = useOnboardingStore.getState().onboardingStatus;
        if (onboardingStatus && onboardingStatus.is_completed) {
          router.push('/dashboard');
        } else {
          router.push('/onboarding');
        }
      }
    } catch (error) {
      console.error('Google Auth Error:', error);
    }
  }, [googleLogin, router]);

  useEffect(() => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    
    if (!clientId) {
      console.warn('Google Client ID not found in environment variables');
      return;
    }

    const initializeGoogle = () => {
      if (typeof window !== 'undefined' && window.google) {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: handleCredentialResponse,
          ux_mode: 'popup',
        });
      }
    };

    // If script already loaded
    if (typeof window !== 'undefined' && window.google) {
      initializeGoogle();
    } else {
      // Wait for script to load (added in layout.tsx)
      const interval = setInterval(() => {
        if (typeof window !== 'undefined' && window.google) {
          initializeGoogle();
          clearInterval(interval);
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [handleCredentialResponse]);

  const signInWithGoogle = () => {
    if (typeof window !== 'undefined' && window.google) {
      window.google.accounts.id.prompt();
    }
  };

  return { signInWithGoogle, isLoading };
}
