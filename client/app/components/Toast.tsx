"use client";
import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { useToastStore, Toast as ToastType } from '@/store/toastStore';

const Toast = ({ toast }: { toast: ToastType }) => {
  const { removeToast } = useToastStore();

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle className="w-5 h-5" />;
      case 'error':
        return <AlertCircle className="w-5 h-5" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5" />;
      case 'info':
        return <Info className="w-5 h-5" />;
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  const getStyles = () => {
    switch (toast.type) {
      case 'success':
        return 'bg-lemon/10 border-lemon text-lemon';
      case 'error':
        return 'bg-red-500/10 border-red-500 text-red-400';
      case 'warning':
        return 'bg-yellow-500/10 border-yellow-500 text-yellow-400';
      case 'info':
        return 'bg-primary/10 border-primary text-primary';
      default:
        return 'bg-secondary/10 border-secondary text-foreground';
    }
  };

  return (
    <div className={`flex items-center gap-3 p-4 rounded-lg border backdrop-blur-sm ${getStyles()} animate-in slide-in-from-right duration-300`}>
      {getIcon()}
      <span className="flex-1 text-sm font-medium">{toast.message}</span>
      <button
        onClick={() => removeToast(toast.id)}
        className="text-current hover:opacity-70 transition-opacity"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export const ToastContainer = () => {
  const { toasts } = useToastStore();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm w-full">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} />
      ))}
    </div>
  );
};

export default Toast;