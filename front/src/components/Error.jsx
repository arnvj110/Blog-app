import React from 'react';

const Error = ({ message }) => {
  const displayMessage =
    typeof message === 'string'
      ? message
      : message?.message || 'An unknown error occurred';

  return (
    <div className="bg-red-900/20 border border-red-500/50 rounded-xl p-4 backdrop-blur-sm mb-6">
      <div className="flex items-start space-x-3">
        <svg 
          className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
          />
        </svg>
        <p className="text-red-300 text-sm flex-1">{displayMessage}</p>
      </div>
    </div>
  );
};

export default Error;