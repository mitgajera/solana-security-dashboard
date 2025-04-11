"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Clock, AlertTriangle, RefreshCw } from "lucide-react"

interface RateLimitErrorProps {
  onRetry?: () => void
}

export function RateLimitError({ onRetry }: RateLimitErrorProps) {
  return (
    <Alert className="mb-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20">
      <AlertTriangle className="h-4 w-4 text-yellow-500" />
      <AlertTitle className="text-yellow-700 dark:text-yellow-400">Rate Limit Reached</AlertTitle>
      <AlertDescription className="text-yellow-600 dark:text-yellow-300">
        <p className="mb-2">
          The Solana network API is currently rate limited. We're displaying cached data where possible.
        </p>
        <div className="flex items-center gap-2 mt-2">
          <Clock className="h-4 w-4" />
          <span className="text-sm">Please try again in a few minutes</span>
        </div>
        {onRetry && (
          <Button 
            variant="outline" 
            className="mt-3 border-yellow-500 text-yellow-700 hover:bg-yellow-100"
            onClick={onRetry}
            size="sm"
          >
            <RefreshCw className="h-4 w-4 mr-1" /> 
            Try Again
          </Button>
        )}
      </AlertDescription>
    </Alert>
  )
}