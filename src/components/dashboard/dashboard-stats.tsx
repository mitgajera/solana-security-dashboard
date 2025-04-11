"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ShieldIcon, ClockIcon, DollarSignIcon, AlertTriangleIcon } from "lucide-react";

export function DashboardStats() {
  return (
    <>
      <Card className="bg-card/50 border border-border/50">
        <CardContent className="p-6">
          <div className="flex flex-col">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium">Total Exploits</h3>
              <ShieldIcon className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="mt-2">
              <p className="text-3xl font-bold">47</p>
              <p className="text-xs text-muted-foreground">Since January 2023</p>
              <div className="flex items-center mt-1 text-xs">
                <span className="text-red-500">↑ +3 this month</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 border border-border/50">
        <CardContent className="p-6">
          <div className="flex flex-col">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium">Response Time</h3>
              <ClockIcon className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="mt-2">
              <p className="text-3xl font-bold">4.6 hrs</p>
              <p className="text-xs text-muted-foreground">Average response time</p>
              <div className="flex items-center mt-1 text-xs">
                <span className="text-green-500">↓ -0.5 hrs from last month</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 border border-border/50">
        <CardContent className="p-6">
          <div className="flex flex-col">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium">Total Funds Lost</h3>
              <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="mt-2">
              <p className="text-3xl font-bold">$157M</p>
              <p className="text-xs text-muted-foreground">Total value lost to exploits</p>
              <div className="flex items-center mt-1 text-xs">
                <span className="text-red-500">↑ +$3.2M this month</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 border border-border/50">
        <CardContent className="p-6">
          <div className="flex flex-col">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium">Vulnerability Types</h3>
              <AlertTriangleIcon className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="mt-2">
              <p className="text-3xl font-bold">8</p>
              <p className="text-xs text-muted-foreground">Most common: Flash Loans</p>
              <div className="flex items-center mt-1 text-xs">
                <span className="text-muted-foreground">40% of all exploits</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
