"use client"

import { useState, useEffect } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangleIcon, ShieldAlertIcon, ActivityIcon, RefreshCwIcon } from "lucide-react"
import { useLiveAlerts } from "@/hooks/useLiveAlerts"
import { LiveAlert } from "@/types"
import { formatDistanceToNow } from "date-fns"

export function LiveTracker() {
  const { alerts, loading, error } = useLiveAlerts();
  const [connectionError, setConnectionError] = useState(false);

  // Function to handle refresh with error handling
  const handleRefresh = async () => {
    try {
      // Your refresh implementation
      setConnectionError(false);
    } catch (err) {
      console.log("Unable to refresh data - network issue");
      setConnectionError(true);
    }
  };

  useEffect(() => {
    // Set connection error state based on error from useLiveAlerts
    if (error && error.toString().includes('WebSocket')) {
      setConnectionError(true);
    }
  }, [error]);

  // Format timestamp to relative time (e.g. "5 minutes ago")
  const formatRelativeTime = (timestamp: string): string => {
    try {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    } catch (err) {
      return 'Recently';
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center">
          <ShieldAlertIcon className="mr-2 h-5 w-5 text-primary" />
          <div>
            <CardTitle className="text-sm font-medium">Live Security Alerts</CardTitle>
            {connectionError && (
              <Badge variant="outline" className="text-amber-500 border-amber-500 mt-1">
                <AlertTriangleIcon className="h-3 w-3 mr-1" />
                Using cached data
              </Badge>
            )}
          </div>
        </div>
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleRefresh} 
            disabled={loading}
          >
            <RefreshCwIcon className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </CardHeader>
      <CardDescription className="px-6">
        Real-time security alerts from the Solana blockchain
      </CardDescription>
      <CardContent>
        {loading && alerts.length === 0 ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="text-center text-destructive py-10">
            Unable to load security alerts. Please try again later.
          </div>
        ) : alerts.length === 0 ? (
          <div className="text-center text-muted-foreground py-10">
            No active security alerts at this time.
          </div>
        ) : (
          <div className="space-y-4 overflow-auto max-h-[400px] pr-2">
            {alerts.map((alert, index) => (
              <div 
                key={`${alert.id}-${index}`} 
                className="flex space-x-3 items-start border-l-2 pl-3 py-2 animate-in fade-in slide-in-from-right-5 duration-300"
                style={{
                  borderColor:
                    alert.severity === "Critical" ? "rgb(239, 68, 68)" :
                    alert.severity === "High" ? "rgb(245, 158, 11)" :
                    alert.severity === "Medium" ? "rgb(234, 179, 8)" :
                    "rgb(59, 130, 246)"
                }}
              >
                {alert.severity === "Critical" || alert.severity === "High" ? (
                  <ShieldAlertIcon className="h-5 w-5 text-red-500 mt-0.5" />
                ) : alert.severity === "Medium" ? (
                  <AlertTriangleIcon className="h-5 w-5 text-amber-500 mt-0.5" />
                ) : (
                  <ActivityIcon className="h-5 w-5 text-blue-500 mt-0.5" />
                )}
                <div className="flex-1">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <div className="font-medium">{alert.protocol}</div>
                      <p className="text-sm text-muted-foreground mt-1">{alert.type}</p>
                    </div>
                    <Badge variant={
                      alert.severity === "Critical" ? "destructive" :
                      alert.severity === "High" ? "destructive" :
                      alert.severity === "Medium" ? "default" :
                      "outline"
                    }>
                      {alert.severity}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <a 
                      href={`https://solscan.io/tx/${alert.transactionHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary hover:underline"
                    >
                      View Transaction
                    </a>
                    <p className="text-xs text-muted-foreground">
                      {formatRelativeTime(alert.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
