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
import { AlertTriangleIcon, ShieldAlertIcon, ActivityIcon } from "lucide-react"

// Mock data - would be replaced with real-time API
const initialAlerts = [
  {
    id: "a1",
    message: "Potential flash loan attack detected on SolanaSwap",
    timestamp: "10 minutes ago",
    severity: "high",
  },
  {
    id: "a2",
    message: "Unusual transaction volume on MoonDeFi protocol",
    timestamp: "25 minutes ago",
    severity: "medium",
  },
  {
    id: "a3",
    message: "Price oracle deviation detected on SolPrice",
    timestamp: "40 minutes ago",
    severity: "medium",
  },
  {
    id: "a4",
    message: "Multiple failed authentication attempts on SolBridge",
    timestamp: "1 hour ago",
    severity: "low",
  },
  {
    id: "a5",
    message: "Smart contract upgrade scheduled for SolLending",
    timestamp: "2 hours ago",
    severity: "info",
  },
]

export function LiveTracker() {
  const [alerts, setAlerts] = useState(initialAlerts)

  // Simulate receiving new alerts periodically
  useEffect(() => {
    const interval = setInterval(() => {
      // 20% chance to add a new alert
      if (Math.random() < 0.2) {
        const newAlert = {
          id: `a${Math.floor(Math.random() * 1000)}`,
          message: `New activity detected on ${Math.random() > 0.5 ? 'SolWallet' : 'LunaSwap'} protocol`,
          timestamp: "Just now",
          severity: ["low", "medium", "high"][Math.floor(Math.random() * 3)],
        }
        setAlerts(prev => [newAlert, ...prev.slice(0, 4)])
      }
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="col-span-1">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <ActivityIcon className="h-5 w-5 text-primary animate-pulse" />
          <CardTitle>Live Security Alerts</CardTitle>
        </div>
        <CardDescription>
          Real-time security alerts and notifications
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 overflow-auto max-h-[300px]">
          {alerts.map((alert) => (
            <div key={alert.id} className="flex space-x-3 items-start border-l-2 pl-3 py-1 animate-in fade-in slide-in-from-right-5 duration-500"
              style={{
                borderColor:
                  alert.severity === "high" ? "rgb(239, 68, 68)" :
                  alert.severity === "medium" ? "rgb(245, 158, 11)" :
                  alert.severity === "low" ? "rgb(59, 130, 246)" :
                  "rgb(156, 163, 175)"
              }}
            >
              {alert.severity === "high" ? (
                <ShieldAlertIcon className="h-5 w-5 text-red-500 mt-0.5" />
              ) : alert.severity === "medium" ? (
                <AlertTriangleIcon className="h-5 w-5 text-amber-500 mt-0.5" />
              ) : (
                <ActivityIcon className="h-5 w-5 text-blue-500 mt-0.5" />
              )}
              <div className="flex-1">
                <div className="flex justify-between items-start gap-2">
                  <p className="text-sm font-medium">{alert.message}</p>
                  <Badge variant={
                    alert.severity === "high" ? "destructive" :
                    alert.severity === "medium" ? "default" :
                    alert.severity === "low" ? "outline" :
                    "secondary"
                  }>
                    {alert.severity}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {alert.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
