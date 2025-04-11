"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RotateCw } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { solanaService } from "@/services/solanaService";
import { LiveAlert } from "@/types";

export function LiveTracker() {
  const [alerts, setAlerts] = useState<LiveAlert[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());
  const [error, setError] = useState<string | null>(null);
  const [secondsUntilRefresh, setSecondsUntilRefresh] = useState(60);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);
  const isMounted = useRef(true);
  
  // Number of transactions to display (3-4)
  const TX_COUNT = 4;
  // Refresh interval in ms (exactly 1 minute)
  const REFRESH_INTERVAL = 60000;

  // Fetch alerts with specific transaction count
  const fetchAlerts = useCallback(async (forceRefresh = false) => {
    if (!isMounted.current) return;
    
    try {
      setLoading(true);
      setError(null);
      
      console.log("Fetching alerts...");
      // Force refresh when manually requested
      const newAlerts = await solanaService.fetchRecentSuspiciousTransactions(TX_COUNT, forceRefresh);
      
      if (isMounted.current) {
        if (newAlerts && newAlerts.length > 0) {
          console.log(`Found ${newAlerts.length} alerts`);
          setAlerts(newAlerts);
        } else {
          console.log("No alerts found");
        }
        
        setLastRefreshed(new Date());
        setSecondsUntilRefresh(60);
      }
    } catch (err) {
      console.error("Error fetching alerts:", err);
      if (isMounted.current) {
        setError("Failed to fetch transactions. Please try again.");
      }
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  }, []); 

  // Manual refresh handler
  const handleRefresh = () => {
    console.log("Manual refresh triggered");
    // Reset all timers
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (countdownRef.current) clearInterval(countdownRef.current);
    
    // Fetch immediately with force refresh
    fetchAlerts(true).catch(err => {
      console.error("Manual refresh failed:", err);
    });
    
    // Reset auto-refresh timers
    setupAutoRefresh();
  };

  // Setup auto-refresh intervals
  const setupAutoRefresh = useCallback(() => {
    // Clear existing intervals if any
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (countdownRef.current) clearInterval(countdownRef.current);
    
    // Set up new interval - exactly 1 minute
    intervalRef.current = setInterval(() => {
      console.log("Auto-refresh triggered (1 minute passed)");
      fetchAlerts(true).catch(err => {
        console.error("Auto-refresh failed:", err);
      });
    }, REFRESH_INTERVAL);
    
    // Set up countdown timer (updates every second)
    countdownRef.current = setInterval(() => {
      setSecondsUntilRefresh(prev => {
        const newVal = prev - 1;
        return newVal <= 0 ? 60 : newVal;
      });
    }, 1000);
  }, [fetchAlerts]);

  // Effect to set up initial fetch and auto-refresh
  useEffect(() => {
    // Initial fetch on mount
    fetchAlerts();
    
    // Set up auto-refresh timer
    setupAutoRefresh();
    
    // Clean up on unmount
    return () => {
      console.log("Cleaning up intervals");
      isMounted.current = false;
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, [fetchAlerts, setupAutoRefresh]);

  // Get badge color based on severity
  const getSeverityBadge = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical':
        return <Badge className="bg-red-600">Critical</Badge>;
      case 'high':
        return <Badge className="bg-red-500">High</Badge>;
      case 'medium':
        return <Badge className="bg-blue-500">Medium</Badge>;
      case 'low':
        return <Badge className="bg-green-500">Low</Badge>;
      default:
        return <Badge>{severity}</Badge>;
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
            <span className="text-white text-xs">⚡</span>
          </div>
          <h3 className="text-xl font-bold">Live Security Alerts</h3>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-muted-foreground">
            Refreshes in: {secondsUntilRefresh}s
          </span>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleRefresh}
            disabled={loading}
            title="Refresh alerts"
          >
            <RotateCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            <span className="sr-only">Refresh</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="text-sm text-muted-foreground px-6 pb-2">
          Real-time security alerts from the Solana blockchain
        </div>
        
        {error && (
          <div className="px-6 py-2 text-sm text-red-500">
            {error}. <Button variant="link" className="p-0 h-auto text-sm" onClick={handleRefresh}>Try again</Button>
          </div>
        )}
        
        <div className="pt-2">
          {alerts.length > 0 ? (
            alerts.map((alert) => (
              <div 
                key={alert.id} 
                className="border-l-4 border-yellow-500 pl-4 py-3 hover:bg-muted/50 transition-colors"
                style={{marginLeft: "12px"}}
              >
                <div className="flex justify-between items-start px-4 pb-1">
                  <div>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      <span className="font-medium">{alert.protocol}</span>
                    </div>
                    <div className="text-muted-foreground text-sm mt-1">{alert.type}</div>
                    
                    <Button variant="link" className="text-blue-500 p-0 h-auto text-sm mt-1" asChild>
                      <a 
                        href={`https://solscan.io/tx/${alert.transactionHash}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        View Transaction
                      </a>
                    </Button>
                  </div>
                  <div className="flex flex-col items-end">
                    {getSeverityBadge(alert.severity)}
                    <span className="text-xs text-muted-foreground mt-2">
                      {alert.timestamp ? 
                        formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true }) : 
                        "Unknown time"}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-8 text-center text-muted-foreground">
              {loading ? (
                <p>Fetching transactions...</p>
              ) : (
                <>
                  <p>No suspicious transactions detected</p>
                  <Button variant="outline" className="mt-2" onClick={handleRefresh} size="sm">
                    Check for new alerts
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
        
        <div className="px-6 py-2 text-xs text-muted-foreground border-t mt-2 text-right">
          Last updated: {formatDistanceToNow(lastRefreshed, { addSuffix: true })}
          {loading && <span className="ml-2">(refreshing...)</span>}
        </div>
      </CardContent>
    </Card>
  );
}
