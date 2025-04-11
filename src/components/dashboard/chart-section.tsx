"use client"

import { useState, useRef, useEffect } from "react"
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

// Chart color constants 
const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#0088fe", "#00C49F"];

// Sample data for the vulnerability types
const vulnerabilityData = [
  { name: "Smart Contract", value: 42 },
  { name: "Oracle Manipulation", value: 18 },
  { name: "Flash Loan", value: 15 },
  { name: "Access Control", value: 11 },
  { name: "Reentrancy", value: 9 },
  { name: "Other", value: 5 },
];

// Sample data for funds lost
const fundsLostData = [
  { name: "Jan", value: 12000000 },
  { name: "Feb", value: 8000000 },
  { name: "Mar", value: 15000000 },
  { name: "Apr", value: 5000000 },
  { name: "May", value: 22000000 },
  { name: "Jun", value: 18000000 },
  { name: "Jul", value: 9000000 },
  { name: "Aug", value: 30000000 },
];

// Sample data for response times
const responseTimeData = [
  { name: "Project A", time: 2.4 },
  { name: "Project B", time: 1.1 },
  { name: "Project C", time: 4.8 },
  { name: "Project D", time: 3.2 },
  { name: "Project E", time: 2.9 },
  { name: "Project F", time: 0.8 },
  { name: "Project G", time: 1.5 },
];

// Sample data for affected projects
const projectsData = [
  { date: "2023-01", projects: 3, loss: 12000000 },
  { date: "2023-02", projects: 1, loss: 8000000 },
  { date: "2023-03", projects: 5, loss: 15000000 },
  { date: "2023-04", projects: 2, loss: 5000000 },
  { date: "2023-05", projects: 6, loss: 22000000 },
  { date: "2023-06", projects: 4, loss: 18000000 },
  { date: "2023-07", projects: 2, loss: 9000000 },
  { date: "2023-08", projects: 8, loss: 30000000 },
];

export function ChartSection() {
  const [activeTab, setActiveTab] = useState("vulnerabilities")
  const [containerHeight, setContainerHeight] = useState(400)
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef(null)

  // Adjust container height and check mobile based on screen size
  useEffect(() => {
    const updateSizes = () => {
      const width = window.innerWidth;
      setIsMobile(width < 640);
      setContainerHeight(width < 640 ? 300 : 400);
    }
    
    // Initialize on mount
    updateSizes();
    
    // Update on resize
    window.addEventListener('resize', updateSizes);
    return () => window.removeEventListener('resize', updateSizes);
  }, []);

  return (
    <Card ref={containerRef}>
      <CardHeader>
        <CardTitle>Security Analytics</CardTitle>
        <CardDescription>
          Data visualizations of security incidents across the Solana ecosystem
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[500px] sm:h-[550px] md:h-[500px]">
          <Tabs 
            defaultValue="vulnerabilities" 
            className="h-full flex flex-col"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <div className="px-6">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                <TabsTrigger value="vulnerabilities">Vulnerabilities</TabsTrigger>
                <TabsTrigger value="funds">Funds Lost</TabsTrigger>
                <TabsTrigger value="response">Response Time</TabsTrigger>
                <TabsTrigger value="projects">Projects Affected</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="vulnerabilities" className="flex-1 px-2 sm:px-6">
              <div className="h-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      dataKey="value"
                      isAnimationActive={true}
                      data={vulnerabilityData}
                      cx="50%"
                      cy="50%"
                      outerRadius={containerHeight < 400 ? 80 : 120}
                      fill="#8884d8"
                      label={({ name, percent }) => 
                        isMobile
                          ? `${(percent * 100).toFixed(0)}%` 
                          : `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {vulnerabilityData.map((entry, index) => (
                        <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend 
                      layout={isMobile ? "horizontal" : "vertical"}
                      verticalAlign={isMobile ? "bottom" : "middle"}
                      align={isMobile ? "center" : "right"}
                      wrapperStyle={isMobile ? { fontSize: '10px' } : { fontSize: '12px', right: 0 }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>

            <TabsContent value="funds" className="flex-1 px-2 sm:px-6">
              <div className="h-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={fundsLostData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis 
                      tickFormatter={(value) => `$${value / 1000000}M`}
                    />
                    <Tooltip 
                      formatter={(value) => [`$${value.toLocaleString()}`, "Funds Lost"]}
                    />
                    <Legend />
                    <Bar dataKey="value" name="Funds Lost (USD)" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>

            <TabsContent value="response" className="flex-1 px-2 sm:px-6">
              <div className="h-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={responseTimeData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: isMobile ? 20 : 40, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      type="number" 
                      label={{ value: 'Hours', position: 'insideBottom', offset: -5 }}
                    />
                    <YAxis 
                      type="category" 
                      dataKey="name" 
                      width={isMobile ? 50 : 80}
                    />
                    <Tooltip formatter={(value) => [`${value} hours`, "Response Time"]} />
                    <Legend />
                    <Bar dataKey="time" name="Response Time (Hours)" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>

            <TabsContent value="projects" className="flex-1 px-2 sm:px-6">
              <div className="h-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                  >
                    <CartesianGrid />
                    <XAxis 
                      dataKey="date" 
                      name="Date" 
                      tick={{ fontSize: isMobile ? 10 : 12 }}
                    />
                    <YAxis 
                      dataKey="projects" 
                      name="Projects Affected" 
                      tick={{ fontSize: isMobile ? 10 : 12 }}
                    />
                    <ZAxis 
                      dataKey="loss" 
                      range={[50, 400]} 
                      name="Loss" 
                    />
                    <Tooltip 
                      cursor={{ strokeDasharray: '3 3' }}
                      formatter={(value, name) => {
                        if (name === "Loss") {
                          return [`$${Number(value).toLocaleString()}`, "Funds Lost"];
                        }
                        return [value, name];
                      }}
                    />
                    <Legend />
                    <Scatter name="Projects Affected vs Loss" data={projectsData} fill="#FF8042" />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  )
}

