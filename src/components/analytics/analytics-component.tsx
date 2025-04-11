"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  LineChart,
  Line
} from "recharts";

// Vulnerability data from screenshot
const vulnerabilityData = [
  { name: "Flash Loans", value: 40, color: "#0284c7" },
  { name: "Reentrancy", value: 25, color: "#10b981" },
  { name: "Access Control", value: 15, color: "#f59e0b" },
  { name: "Oracle Manipulation", value: 12, color: "#f97316" },
  { name: "Other", value: 8, color: "#8b5cf6" }
];

// Monthly data for charts
const monthlyData = [
  { name: 'Jan', count: 2, funds: 4.5, response: 5.2 },
  { name: 'Feb', count: 3, funds: 12.3, response: 4.8 },
  { name: 'Mar', count: 6, funds: 25.2, response: 6.2 },
  { name: 'Apr', count: 8, funds: 30.5, response: 3.5 },
  { name: 'May', count: 7, funds: 22.1, response: 4.1 },
  { name: 'Jun', count: 4, funds: 6.8, response: 5.0 },
  { name: 'Jul', count: 2, funds: 3.5, response: 3.9 },
  { name: 'Aug', count: 5, funds: 15.2, response: 4.4 },
  { name: 'Sep', count: 4, funds: 8.9, response: 5.2 },
  { name: 'Oct', count: 3, funds: 9.4, response: 4.7 },
  { name: 'Nov', count: 1, funds: 2.1, response: 4.9 },
  { name: 'Dec', count: 2, funds: 3.8, response: 6.5 },
];

// Projects data
const projectsData = [
  { name: 'Jupiter', value: 5 },
  { name: 'Marinade', value: 3 },
  { name: 'Solend', value: 4 },
  { name: 'Raydium', value: 6 },
  { name: 'Mango', value: 2 },
];

export function AnalyticsComponent() {
  return (
    <div className="container py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Security Analytics</h1>
        <p className="text-muted-foreground">
          Data visualizations of security incidents across the Solana ecosystem
        </p>
      </div>
      
      <Tabs defaultValue="vulnerabilities" className="space-y-4">
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="vulnerabilities">Vulnerabilities</TabsTrigger>
          <TabsTrigger value="fundsLost">Funds Lost</TabsTrigger>
          <TabsTrigger value="responseTime">Response Time</TabsTrigger>
          <TabsTrigger value="projects">Projects Affected</TabsTrigger>
        </TabsList>
        
        {/* Vulnerabilities Tab */}
        <TabsContent value="vulnerabilities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Vulnerability Types</CardTitle>
              <CardDescription>Distribution of exploit types in the Solana ecosystem</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={vulnerabilityData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {vulnerabilityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Funds Lost Tab */}
        <TabsContent value="fundsLost" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Funds Lost Over Time</CardTitle>
              <CardDescription>Monthly funds lost to exploits in USD millions</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={monthlyData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorFunds" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}M`, "Funds Lost"]} />
                    <Legend />
                    <Area type="monotone" dataKey="funds" stroke="#ef4444" fillOpacity={1} fill="url(#colorFunds)" name="Funds Lost (USD Millions)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Response Time Tab */}
        <TabsContent value="responseTime" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Response Time Trends</CardTitle>
              <CardDescription>Average response time to security incidents (hours)</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={monthlyData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorResponse" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value} hours`, "Response Time"]} />
                    <Legend />
                    <Area type="monotone" dataKey="response" stroke="#3b82f6" fillOpacity={1} fill="url(#colorResponse)" name="Response Time (hours)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Projects Affected Tab */}
        <TabsContent value="projects" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Most Affected Projects</CardTitle>
              <CardDescription>Number of security incidents by project</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={projectsData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" name="Incidents" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

