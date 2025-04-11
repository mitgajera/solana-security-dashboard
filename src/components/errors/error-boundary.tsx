"use client"

import React from "react"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { AlertTriangleIcon, RefreshCwIcon } from "lucide-react"

interface ErrorBoundaryProps {
  children: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  isSolanaError: boolean
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { 
      hasError: false, 
      error: null,
      isSolanaError: false
    }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Check if this is a Solana-related error
    const isSolanaError = error.message.includes('WebSocket') || 
                         error.message.includes('Connection') || 
                         error.message.includes('Solana RPC');
    
    return { 
      hasError: true, 
      error, 
      isSolanaError 
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // You can log the error to an error reporting service here
    console.log("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Show simplified error for Solana connection issues
      if (this.state.isSolanaError) {
        return (
          <Alert className="mb-4">
            <AlertTriangleIcon className="h-4 w-4" />
            <AlertTitle>Connection Issue</AlertTitle>
            <AlertDescription>
              <p className="mb-2">Unable to connect to Solana network. Some data may be limited or unavailable.</p>
              <Button 
                variant="outline" 
                onClick={() => window.location.reload()}
                size="sm"
                className="mt-2"
              >
                <RefreshCwIcon className="h-4 w-4 mr-1" /> Retry Connection
              </Button>
            </AlertDescription>
          </Alert>
        )
      }
      
      // For other errors, show standard error UI
      return (
        <Alert variant="destructive">
          <AlertTriangleIcon className="h-4 w-4" />
          <AlertTitle>Something went wrong</AlertTitle>
          <AlertDescription>
            <p className="mb-2">An error occurred while loading this content.</p>
            <Button 
              variant="outline" 
              onClick={() => window.location.reload()}
              size="sm"
              className="mt-2"
            >
              <RefreshCwIcon className="h-4 w-4 mr-1" /> Refresh Page
            </Button>
          </AlertDescription>
        </Alert>
      )
    }

    return this.props.children
  }
}