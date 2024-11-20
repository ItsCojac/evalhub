import React from 'react';

export const LoadingSpinner: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`animate-spin rounded-full border-2 border-gray-300 border-t-blue-600 h-5 w-5 ${className}`} />
);