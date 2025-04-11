"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  ZAxis,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts'
import { CalendarIcon, DownloadIcon, FilterIcon } from "lucide-react"

// Monthly exploit data
const monthlyData = [
  { name: 'Jan', count: 5, funds: 18.5 },
  { name: 'Feb', count: 3, funds: 12.3 },
  { name: 'Mar', count: 6, funds: 25.2 },
  { name: 'Apr', count: 8, funds: 30.5 },
  { name: 'May', count: 7, funds: 22.1 },
  { name: 'Jun', count: 4, funds: 6.8 },
  { name: 'Jul', count: 2, funds: 3.5 },
  { name: 'Aug', count: 5, funds: 15.2 },
  { name: 'Sep', count: 4, funds: 8.9 },
  { name: 'Oct', count: 3, funds: 9.4 },
  { name: 'Nov', count: 1, funds: 2.1 },
  { name: 'Dec', count: 2, funds: 3.8 },
]

// Exploit data by protocol type
const protocolTypeData = [
  { name: 'DEX', value: 32 },
  { name: 'Lending', value: 26 },
  { name: 'Yield Aggregator', value: 18 },
  { name: 'Bridge', value: 14 },
  { name: 'NFT Marketplace', value: 10 },
]

// Vulnerability types data
const vulnerabilityData = [
  { name: 'Flash Loans', value: 40 },
  { name: 'Reentrancy', value: 25 },
  { name: 'Access Control', value: 15 },
  { name: 'Oracle Manipulation', value: 12 },
  { name: 'Other', value: 8 },
]

// Recovery rate data
const recoveryData = [
  { name: 'DEX', fullRecovery: 40, partialRecovery: 30, noRecovery: 30 },
  { name: 'Lending', fullRecovery: 60, partialRecovery: 20, noRecovery: 20 },
  { name: 'Yield', fullRecovery: 30, partialRecovery: 40, noRecovery: 30 },
  { name: 'Bridge', fullRecovery: 20, partialRecovery: 30, noRecovery: 50 },
  { name: 'NFT', fullRecovery: 50, partialRecovery: 30, noRecovery: 20 },
]

// Response time by vulnerability
const responseTimeData = [
  { name: 'Flash Loans', x: 40, y: 2.2, z: 1200 },
  { name: 'Reentrancy', x: 25, y: 5.6, z: 800 },
  { name: 'Access Control', x: 15, y: 3.8, z: 600 },
  { name: 'Oracle Manipulation', x: 12, y: 8.9, z: 400 },
  { name: 'Private Key Compromise', x: 5, y: 1.5, z: 300 },
  { name: 'Logic Error', x: 4, y: 4.2, z: 250 },
]

// Security metrics radar chart data
const securityMetricsData = [
  {
    subject: 'Audit Coverage',
    A: 85,
    B: 65,
    fullMark: 100,
  },
  {
    subject: 'Response Time',
    A: 75,
    B: 50,
    fullMark: 100,
  },
  {
    subject: 'Recovery Rate',
    A: 80,
    B: 40,
    fullMark: 100,
  },
  {
    subject: 'Monitoring',
    A: 90,
    B: 60,
    fullMark: 100,
  },
  {
    subject: 'Bug Bounty',
    A: 70,
    B: 45,
    fullMark: 100,
  },
  {
    subject: 'Code Quality',
    A: 75,
    B: 55,
    fullMark: 100,
  },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8']

export function AnalyticsComponent() {
  const [period, setPeriod] = useState("12m")

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Exploit Analytics Dashboard</h2>
          <p className="text-muted-foreground">
            Comprehensive data analysis of security incidents
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <FilterIcon className="h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <CalendarIcon className="h-4 w-4" />
            Jan 2023 - Dec 2023
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <DownloadIcon className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Total Exploits</CardTitle>
            <CardDescription>Last 12 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">+5% from previous year</p>
            <div className="h-[150px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Area type="monotone" dataKey="count" stroke="#3b82f6" fillOpacity={1} fill="url(#colorCount)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Total Funds Lost</CardTitle>
            <CardDescription>Last 12 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$157.3M</div>
            <p className="text-xs text-muted-foreground">-12% from previous year</p>
            <div className="h-[150px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorFunds" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip formatter={(value) => [`$${value}M`, "Funds Lost"]} />
                  <Area type="monotone" dataKey="funds" stroke="#ef4444" fillOpacity={1} fill="url(#colorFunds)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Avg. Response Time</CardTitle>
            <CardDescription>Hours to respond</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">4.6 hrs</div>
            <p className="text-xs text-muted-foreground">-0.8 hrs from previous year</p>
            <div className="h-[150px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={responseTimeData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <XAxis dataKey="name" tick={false} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip formatter={(value, name) => [name === 'y' ? `${value} hrs` : value, name === 'y' ? "Response Time" : name === 'x' ? "Frequency %" : "Size"]} />
                  <Bar dataKey="y" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="exploits" className="space-y-4">
        <TabsList>
          <TabsTrigger value="exploits">Exploit Analysis</TabsTrigger>
          <TabsTrigger value="vulnerabilities">Vulnerability Types</TabsTrigger>
          <TabsTrigger value="recovery">Recovery Analysis</TabsTrigger>
          <TabsTrigger value="protocols">Protocol Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="exploits" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Exploit Trends</CardTitle>
              <CardDescription>Number of exploits and funds lost by month</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={monthlyData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" label={{ value: 'Count', angle: -90, position: 'insideLeft' }} />
                    <YAxis yAxisId="right" orientation="right" label={{ value: 'Funds (M)', angle: 90, position: 'insideRight' }} />
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="count" stroke="#3b82f6" activeDot={{ r: 8 }} name="Exploit Count" />
                    <Line yAxisId="right" type="monotone" dataKey="funds" stroke="#ef4444" name="Funds Lost (M)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vulnerabilities" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Common Vulnerability Types</CardTitle>
                <CardDescription>Distribution of exploit vulnerabilities</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        dataKey="value"
                        isAnimationActive={true}
                        data={vulnerabilityData}
                        cx="50%"
                        cy="50%"
                        outerRadius={150}
                        fill="#8884d8"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {vulnerabilityData.map((entry) => (
                          <Cell key={`cell-${entry.name}`} fill={COLORS[vulnerabilityData.findIndex(item => item.name === entry.name) % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                      <Legend layout="vertical" verticalAlign="middle" align="right" />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Response Time by Vulnerability</CardTitle>
                <CardDescription>Time to respond by vulnerability type</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                      <CartesianGrid />
                      <XAxis
                        type="number"
                        dataKey="x"
                        name="Frequency"
                        unit="%"
                        label={{ value: 'Frequency (%)', position: 'bottom' }}
                      />
                      <YAxis
                        type="number"
                        dataKey="y"
                        name="Response Time"
                        unit="hrs"
                        label={{ value: 'Response Time (hrs)', angle: -90, position: 'insideLeft' }}
                      />
                      <ZAxis
                        type="number"
                        dataKey="z"
                        range={[60, 400]}
                        name="Funds Lost"
                        unit="K"
                      />
                      <Tooltip cursor={{ strokeDasharray: '3 3' }}
                        formatter={(value, name) => [
                          name === 'y' ? `${value} hrs` :
                          name === 'x' ? `${value}%` :
                          `$${value}K`,
                          name === 'y' ? "Response Time" :
                          name === 'x' ? "Frequency" :
                          "Funds Lost"
                        ]}
                      />
                      <Legend />
                      <Scatter name="Vulnerability Types" data={responseTimeData} fill="#FF8042" />
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="recovery" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Funds Recovery Rate by Protocol Type</CardTitle>
              <CardDescription>Percentage of funds recovered after exploits</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={recoveryData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis label={{ value: 'Percentage %', angle: -90, position: 'insideLeft' }} />
                    <Tooltip formatter={(value) => [`${value}%`, ""]} />
                    <Legend />
                    <Bar dataKey="fullRecovery" stackId="a" name="Full Recovery" fill="#10b981" />
                    <Bar dataKey="partialRecovery" stackId="a" name="Partial Recovery" fill="#f59e0b" />
                    <Bar dataKey="noRecovery" stackId="a" name="No Recovery" fill="#ef4444" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="protocols" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Exploits by Protocol Type</CardTitle>
                <CardDescription>Distribution of exploits across protocol categories</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        dataKey="value"
                        isAnimationActive={true}
                        data={protocolTypeData}
                        cx="50%"
                        cy="50%"
                        outerRadius={150}
                        fill="#8884d8"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {protocolTypeData.map((entry) => (
                          <Cell key={`cell-${entry.name}`} fill={COLORS[protocolTypeData.findIndex(item => item.name === entry.name) % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}`, "Count"]} />
                      <Legend layout="vertical" verticalAlign="middle" align="right" />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Metrics Comparison</CardTitle>
                <CardDescription>Top protocols vs. average (Scale: 0-100)</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={securityMetricsData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} />
                      <Radar name="Top Protocols" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                      <Radar name="Average" dataKey="B" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} />
                      <Legend />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
