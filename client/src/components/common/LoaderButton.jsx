import React from 'react';
import { Loader2 } from 'lucide-react';

const LoaderButton = ({
  children,
  isLoading,
  loadingText,
  onClick,
  disabled,
  variant = 'primary',
  className = ''
}) => {
  const variants = {
    primary: 'bg-purple-700 hover:bg-purple-800',
    secondary: 'bg-gray-700 hover:bg-gray-800'
  };

  return (
    <button
      onClick={onClick}
      disabled={isLoading || disabled}
      className={`w-full ${variants[variant]} text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center ${className}`}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          {loadingText}
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default LoaderButton;
