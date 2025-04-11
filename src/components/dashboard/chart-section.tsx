"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts"

// Mock data for charts
const vulnerabilityData = [
  { name: "Flash Loans", value: 40 },
  { name: "Reentrancy", value: 25 },
  { name: "Access Control", value: 15 },
  { name: "Oracle Manipulation", value: 12 },
  { name: "Other", value: 8 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8']

const fundsByMonth = [
  { name: "Jan", value: 18.5 },
  { name: "Feb", value: 12.3 },
  { name: "Mar", value: 25.2 },
  { name: "Apr", value: 30.5 },
  { name: "May", value: 22.1 },
  { name: "Jun", value: 6.8 },
  { name: "Jul", value: 3.5 },
  { name: "Aug", value: 15.2 },
  { name: "Sep", value: 8.9 },
  { name: "Oct", value: 9.4 },
  { name: "Nov", value: 2.1 },
  { name: "Dec", value: 3.8 },
]

const responseTimeData = [
  { name: "Flash Loans", x: 40, y: 2, z: 1200 },
  { name: "Reentrancy", x: 25, y: 6, z: 800 },
  { name: "Access Control", x: 15, y: 4, z: 600 },
  { name: "Oracle Manipulation", x: 12, y: 9, z: 400 },
  { name: "Other", x: 8, y: 7, z: 300 },
]

const projectsAffectedData = [
  { name: "DEX", value: 32 },
  { name: "Lending", value: 26 },
  { name: "Yield Aggregator", value: 18 },
  { name: "Bridge", value: 14 },
  { name: "NFT Marketplace", value: 10 },
]

export function ChartSection() {
  const [activeTab, setActiveTab] = useState("vulnerability")

  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Analytics</CardTitle>
        <CardDescription>
          Data visualizations of security incidents across the Solana ecosystem
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="vulnerability" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="vulnerability">Vulnerabilities</TabsTrigger>
            <TabsTrigger value="funds">Funds Lost</TabsTrigger>
            <TabsTrigger value="response">Response Time</TabsTrigger>
            <TabsTrigger value="projects">Projects Affected</TabsTrigger>
          </TabsList>

          <div className="mt-6 h-[350px]">
            <TabsContent value="vulnerability" className="h-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    dataKey="value"
                    isAnimationActive={true}
                    data={vulnerabilityData}
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    fill="#8884d8"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {vulnerabilityData.map((entry) => (
                      <Cell key={`cell-${entry.name}`} fill={COLORS[vulnerabilityData.findIndex(item => item.name === entry.name) % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`${value}%`, "Percentage"]}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </TabsContent>

            <TabsContent value="funds" className="h-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={fundsByMonth}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis label={{ value: 'Millions USD', angle: -90, position: 'insideLeft' }} />
                  <Tooltip formatter={(value) => [`$${value}M`, "Funds Lost"]} />
                  <Legend />
                  <Bar dataKey="value" name="Funds Lost (Millions USD)" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>

            <TabsContent value="response" className="h-full">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart
                  margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20,
                  }}
                >
                  <CartesianGrid />
                  <XAxis
                    type="number"
                    dataKey="x"
                    name="Percentage"
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
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Legend />
                  <Scatter name="Vulnerability Types" data={responseTimeData} fill="#FF8042" />
                </ScatterChart>
              </ResponsiveContainer>
            </TabsContent>

            <TabsContent value="projects" className="h-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    dataKey="value"
                    isAnimationActive={true}
                    data={projectsAffectedData}
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    fill="#8884d8"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {projectsAffectedData.map((entry) => (
                      <Cell key={`cell-${entry.name}`} fill={COLORS[projectsAffectedData.findIndex(item => item.name === entry.name) % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} Projects`, "Count"]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  )
}
