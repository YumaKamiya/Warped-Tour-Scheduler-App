
import React from 'react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  color?: string; // e.g. 'text-blue-600'
}

const Spinner: React.FC<SpinnerProps> = ({ size = 'md', className = '', color = 'text-blue-600' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-4',
    lg: 'w-12 h-12 border-[6px]',
  };

  return (
    <div
      className={`animate-spin rounded-full border-solid border-t-transparent ${sizeClasses[size]} ${color} ${className}`}
      style={{ borderTopColor: 'transparent' }} // Ensure transparent part for spinning effect
    role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;