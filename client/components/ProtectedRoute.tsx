"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const { user, accessToken, validateToken, logout } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      // Check if user has token
      if (!accessToken && !localStorage.getItem('accessToken')) {
        router.push('/login');
        return;
      }

      // Validate token
      const isValid = await validateToken();
      if (!isValid) {
        logout();
        router.push('/login');
        return;
      }

      setIsLoading(false);
    };

    checkAuth();
  }, [accessToken, validateToken, logout, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#22C55E]"></div>
      </div>
    );
  }

  return <>{children}</>;
}