"use client"

import { useState, useEffect, useCallback } from "react"
import { RefreshCw, AlertTriangle, ExternalLink } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { LiveAlert } from "@/types"
import { solanaService } from "@/services/solanaService"
import { cn } from "@/lib/utils"
import { formatDistanceToNow } from "date-fns"

export function LiveTracker() {
  const [alerts, setAlerts] = useState<LiveAlert[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())
  const [refreshCountdown, setRefreshCountdown] = useState(60)
  
  // Function to fetch alerts
  const fetchAlerts = useCallback(async (forceRefresh = false) => {
    try {
      setLoading(true)
      const data = await solanaService.fetchRecentSuspiciousTransactions(5, forceRefresh)
      setAlerts(data)
      setLastUpdated(new Date())
      setRefreshCountdown(60)
      setError(null)
    } catch (err) {
      console.error("Error fetching alerts:", err)
      setError("Failed to fetch security alerts. Please try again.")
    } finally {
      setLoading(false)
    }
  }, [])
  
  // Handle manual refresh
  const handleRefresh = useCallback(() => {
    fetchAlerts(true)
  }, [fetchAlerts])
  
  // Initial data fetch and set up automatic refresh
  useEffect(() => {
    fetchAlerts(true)
    
    // Set up automatic refresh countdown
    const countdownInterval = setInterval(() => {
      setRefreshCountdown(prev => {
        if (prev <= 1) {
          fetchAlerts(true)
          return 60
        }
        return prev - 1
      })
    }, 1000)
    
    return () => {
      clearInterval(countdownInterval)
    }
  }, [fetchAlerts])
  
  // Format alert time
  const formatAlertTime = (timestamp: string) => {
    try {
      const date = new Date(timestamp)
      return formatDistanceToNow(date, { addSuffix: true })
    } catch (err) {
      return "recently"
    }
  }
  
  // Determine severity color
  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical': return "bg-red-500 hover:bg-red-600"
      case 'high': return "bg-orange-500 hover:bg-orange-600"
      case 'medium': return "bg-amber-500 hover:bg-amber-600"
      case 'low': return "bg-green-500 hover:bg-green-600"
      default: return "bg-blue-500 hover:bg-blue-600"
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-2">
        <div className="flex items-center">
          <AlertTriangle className="mr-2 h-5 w-5 text-blue-500" />
          <CardTitle>Live Security Alerts</CardTitle>
        </div>
        <div className="flex items-center text-sm text-muted-foreground w-full sm:w-auto justify-between sm:justify-start">
          <span>Refreshes in: {refreshCountdown}s</span>
          <Button
            variant="ghost"
            size="icon"
            className="ml-2"
            onClick={handleRefresh}
            disabled={loading}
          >
            <RefreshCw className={cn("h-4 w-4", loading && "animate-spin")} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Real-time security alerts from the Solana blockchain
        </p>
        
        {error ? (
          <div className="mt-4 p-4 border border-red-200 bg-red-50 text-red-700 rounded">
            {error}
            <div className="mt-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleRefresh} 
                disabled={loading}
              >
                Retry
              </Button>
            </div>
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            {alerts.map((alert) => (
              <div 
                key={alert.id}
                className="border-l-4 border-yellow-500 pl-4 py-2"
              >
                <div className="flex flex-wrap items-start sm:items-center justify-between gap-2">
                  <div className="flex items-center">
                    <AlertTriangle className="mr-2 h-4 w-4 text-yellow-500" />
                    <span className="font-medium">{alert.protocol}</span>
                  </div>
                  <Badge className={getSeverityColor(alert.severity)}>
                    {alert.severity}
                  </Badge>
                </div>
                
                <p className="mt-1">{alert.type}</p>
                
                <div className="mt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <a
                    href={`https://solscan.io/tx/${alert.transactionHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline text-sm flex items-center"
                  >
                    View Transaction
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                  <span className="text-sm text-gray-500">
                    {formatAlertTime(alert.timestamp)}
                  </span>
                </div>
              </div>
            ))}
            
            {alerts.length === 0 && !loading && (
              <div className="py-8 text-center text-gray-500">
                No security alerts detected
              </div>
            )}
            
            {loading && alerts.length === 0 && (
              <div className="py-8 text-center text-gray-500">
                Loading alerts...
              </div>
            )}
          </div>
        )}
        
        <div className="text-xs text-right text-gray-400 mt-4">
          Last updated: {formatAlertTime(lastUpdated.toISOString())}
        </div>
      </CardContent>
    </Card>
  )
}
