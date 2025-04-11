"use client"

import {
  BadgeAlertIcon,
  TrendingUpIcon,
  CircleDollarSignIcon,
  ClockIcon
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function DashboardStats() {
  // Normally would fetch this data from an API
  const stats = [
    {
      id: "total-exploits",
      title: "Total Exploits",
      value: "47",
      description: "Since January 2023",
      icon: <BadgeAlertIcon className="h-5 w-5 text-muted-foreground" />,
      trend: "+3 this month",
      trendUp: false
    },
    {
      id: "response-time",
      title: "Response Time",
      value: "4.6 hrs",
      description: "Average response time",
      icon: <ClockIcon className="h-5 w-5 text-muted-foreground" />,
      trend: "-0.5 hrs from last month",
      trendUp: true
    },
    {
      id: "funds-lost",
      title: "Total Funds Lost",
      value: "$157M",
      description: "Total value lost to exploits",
      icon: <CircleDollarSignIcon className="h-5 w-5 text-muted-foreground" />,
      trend: "+$3.2M this month",
      trendUp: false
    },
    {
      id: "vulnerability-types",
      title: "Vulnerability Types",
      value: "8",
      description: "Most common: Flash Loans",
      icon: <TrendingUpIcon className="h-5 w-5 text-muted-foreground" />,
      trend: "40% of all exploits",
      trendUp: null
    }
  ]

  return (
    <>
      {stats.map((stat) => (
        <Card key={stat.id}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            {stat.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
            <div className="mt-2 flex items-center text-xs">
              {stat.trendUp !== null && (
                <span
                  className={`mr-1 ${
                    stat.trendUp ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {stat.trendUp ? "↓" : "↑"}
                </span>
              )}
              <span className="text-muted-foreground">{stat.trend}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  )
}
