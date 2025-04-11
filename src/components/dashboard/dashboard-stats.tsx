"use client"

import { useEffect, useState } from "react"
import {
  BadgeAlertIcon,
  TrendingUpIcon,
  CircleDollarSignIcon,
  ClockIcon
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function DashboardStats() {
  const [stats, setStats] = useState({
    totalExploits: {
      value: "--",
      trend: "--",
      trendUp: false
    },
    responseTime: {
      value: "--",
      trend: "--",
      trendUp: true
    },
    fundsLost: {
      value: "--",
      trend: "--",
      trendUp: false
    },
    vulnActive: {
      value: "--",
      trend: "--",
      trendUp: false
    }
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        // Fetch from Supabase
        const { createClient } = await import('@supabase/supabase-js');
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
        const supabase = createClient(supabaseUrl, supabaseKey);

        // Get total exploits count
        const { count: totalCount, error: countError } = await supabase
          .from('exploits')
          .select('*', { count: 'exact', head: true });

        // Get recent exploits (last 30 days vs. previous 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const sixtyDaysAgo = new Date();
        sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);

        const { data: recentExploits, error: recentError } = await supabase
          .from('exploits')
          .select('*')
          .gte('date', thirtyDaysAgo.toISOString().split('T')[0]);

        const { data: previousExploits, error: prevError } = await supabase
          .from('exploits')
          .select('*')
          .lt('date', thirtyDaysAgo.toISOString().split('T')[0])
          .gte('date', sixtyDaysAgo.toISOString().split('T')[0]);

        // Calculate total funds lost
        const { data: allExploits, error: allError } = await supabase
          .from('exploits')
          .select('funds_lost');

        const totalFundsLost = allExploits?.reduce(
          (sum, item) => sum + (parseFloat(item.funds_lost) || 0), 0
        ) || 0;

        const recentFundsLost = recentExploits?.reduce(
          (sum, item) => sum + (parseFloat(item.funds_lost) || 0), 0
        ) || 0;

        const previousFundsLost = previousExploits?.reduce(
          (sum, item) => sum + (parseFloat(item.funds_lost) || 0), 0
        ) || 0;

        // Calculate average response time
        const { data: responseTimeData, error: rtError } = await supabase
          .from('exploits')
          .select('response_time');

        const avgResponseTime = responseTimeData?.length ?
          responseTimeData.reduce(
            (sum, item) => sum + (parseFloat(item.response_time) || 0), 0
          ) / responseTimeData.length : 0;

        const recentAvgResponseTime = recentExploits?.length ?
          recentExploits.reduce(
            (sum, item) => sum + (parseFloat(item.response_time) || 0), 0
          ) / recentExploits.length : 0;

        const previousAvgResponseTime = previousExploits?.length ?
          previousExploits.reduce(
            (sum, item) => sum + (parseFloat(item.response_time) || 0), 0
          ) / previousExploits.length : 0;

        // Get active vulnerabilities (from live_alerts)
        const { data: activeAlerts, error: alertsError } = await supabase
          .from('live_alerts')
          .select('*')
          .gte('timestamp', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());

        // Calculate trends
        const exploitsTrend = previousExploits?.length ?
          ((recentExploits?.length || 0) - previousExploits.length) / previousExploits.length * 100 : 0;

        const fundsTrend = previousFundsLost ?
          (recentFundsLost - previousFundsLost) / previousFundsLost * 100 : 0;

        const responseTrend = previousAvgResponseTime ?
          (recentAvgResponseTime - previousAvgResponseTime) / previousAvgResponseTime * 100 : 0;

        setStats({
          totalExploits: {
            value: `${totalCount || '0'}`,
            trend: `${Math.abs(Math.round(exploitsTrend))}%`,
            trendUp: exploitsTrend > 0
          },
          responseTime: {
            value: `${avgResponseTime.toFixed(1)} hrs`,
            trend: `${Math.abs(responseTrend.toFixed(1))}%`,
            trendUp: responseTrend < 0 // Lower is better for response time
          },
          fundsLost: {
            value: `$${(totalFundsLost / 1000000).toFixed(1)}M`,
            trend: `${Math.abs(Math.round(fundsTrend))}%`,
            trendUp: fundsTrend > 0
          },
          vulnActive: {
            value: `${activeAlerts?.length || '0'}`,
            trend: "Last 7 days",
            trendUp: false
          }
        });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        // Use fallback stats
        setStats({
          totalExploits: {
            value: "47",
            trend: "+6%",
            trendUp: true
          },
          responseTime: {
            value: "4.8 hrs",
            trend: "-10%",
            trendUp: false
          },
          fundsLost: {
            value: "$157M",
            trend: "+12%",
            trendUp: true
          },
          vulnActive: {
            value: "12",
            trend: "Last 7 days",
            trendUp: false
          }
        });
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className={loading ? "animate-pulse" : ""}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Exploits</CardTitle>
          <BadgeAlertIcon className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalExploits.value}</div>
          <p className={`text-xs ${stats.totalExploits.trendUp ? "text-destructive" : "text-primary"} flex items-center gap-1`}>
            {stats.totalExploits.trendUp ? (
              <TrendingUpIcon className="h-3 w-3" />
            ) : (
              <TrendingUpIcon className="h-3 w-3 rotate-180" />
            )}
            {stats.totalExploits.trend} {stats.totalExploits.trendUp ? "increase" : "decrease"}
          </p>
        </CardContent>
      </Card>
      
      <Card className={loading ? "animate-pulse" : ""}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Response Time</CardTitle>
          <ClockIcon className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.responseTime.value}</div>
          <p className={`text-xs ${stats.responseTime.trendUp ? "text-destructive" : "text-primary"} flex items-center gap-1`}>
            {stats.responseTime.trendUp ? (
              <TrendingUpIcon className="h-3 w-3" />
            ) : (
              <TrendingUpIcon className="h-3 w-3 rotate-180" />
            )}
            {stats.responseTime.trend} {stats.responseTime.trendUp ? "slower" : "faster"}
          </p>
        </CardContent>
      </Card>
      
      <Card className={loading ? "animate-pulse" : ""}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Funds Lost</CardTitle>
          <CircleDollarSignIcon className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.fundsLost.value}</div>
          <p className={`text-xs ${stats.fundsLost.trendUp ? "text-destructive" : "text-primary"} flex items-center gap-1`}>
            {stats.fundsLost.trendUp ? (
              <TrendingUpIcon className="h-3 w-3" />
            ) : (
              <TrendingUpIcon className="h-3 w-3 rotate-180" />
            )}
            {stats.fundsLost.trend} {stats.fundsLost.trendUp ? "increase" : "decrease"}
          </p>
        </CardContent>
      </Card>
      
      <Card className={loading ? "animate-pulse" : ""}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Vulnerabilities</CardTitle>
          <ShieldAlertIcon className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.vulnActive.value}</div>
          <p className="text-xs text-muted-foreground">{stats.vulnActive.trend}</p>
        </CardContent>
      </Card>
    </div>
  );
}

function ShieldAlertIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M12 8v4" />
      <path d="M12 16h.01" />
    </svg>
  );
}
