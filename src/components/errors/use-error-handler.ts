import { useState, useEffect } from 'react';
import { createConsoleError } from './console-error';

export function useErrorHandler() {
  const [error, setError] = useState<Error | null>(null);
  const [isSolanaError, setIsSolanaError] = useState(false);

  // Function to handle errors
  const handleConsoleError = (event: ErrorEvent) => {
    const errorMessage = event.message || 'Unknown error';
    
    // Check if this is a Solana connection error
    if (
      errorMessage.includes('WebSocket') || 
      errorMessage.includes('Connection') || 
      errorMessage.includes('Solana RPC') ||
      event.filename?.includes('@solana/web3.js')
    ) {
      // Mark as Solana error for special handling
      setIsSolanaError(true);
      
      // For Solana connection errors, we can suppress them or show a more user-friendly message
      event.preventDefault(); // Prevent default error UI
      
      // Only set error if we don't already have one to avoid constant updates
      if (!error) {
        setError(createConsoleError('Solana network connection issue. Data may be stale or limited.'));
      }
      return;
    }
    
    // Handle other errors normally
    setError(createConsoleError(errorMessage));
  };

  useEffect(() => {
    // Add event listener for errors
    window.addEventListener('error', handleConsoleError);
    
    // Clean up
    return () => {
      window.removeEventListener('error', handleConsoleError);
    };
  }, [error]);

  return { error, isSolanaError, clearError: () => setError(null) };
}