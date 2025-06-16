
import React, { useEffect, useState } from 'react';
import Button from './Button';
import XMarkIcon from '../icons/XMarkIcon';

interface SnackbarProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number; // in ms
  onDismiss: () => void;
  onRetry?: () => void;
}

const Snackbar: React.FC<SnackbarProps> = ({
  message,
  type = 'info',
  duration = 5000,
  onDismiss,
  onRetry,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        handleDismiss();
      }, duration);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message, duration]); // Intentionally not including onDismiss in deps to avoid re-triggering timeout

  const handleDismiss = () => {
    setIsVisible(false);
    // Add a slight delay for the animation to complete before calling onDismiss
    setTimeout(() => {
        onDismiss();
    }, 300);
  };

  if (!isVisible && !message) return null; // Ensure it's fully hidden if no message

  const baseStyles = "fixed bottom-4 left-1/2 -translate-x-1/2 p-4 rounded-lg shadow-xl text-white flex items-center justify-between min-w-[280px] max-w-[calc(100%-2rem)] z-[100] transition-all duration-300 ease-in-out";
  
  const typeStyles = {
    success: 'bg-emerald-500',
    error: 'bg-red-600',
    info: 'bg-sky-500',
  };

  const animationClass = isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8';

  return (
    <div className={`${baseStyles} ${typeStyles[type]} ${animationClass}`} role="alert">
      <p className="mr-4">{message}</p>
      <div className="flex items-center">
        {type === 'error' && onRetry && (
          <Button onClick={onRetry} variant="ghost" size="sm" className="mr-2 !text-white hover:!bg-red-700 !bg-red-500/50">
            Retry
          </Button>
        )}
        <button onClick={handleDismiss} className="p-1 rounded-full hover:bg-black/20" aria-label="Dismiss">
          <XMarkIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Snackbar;