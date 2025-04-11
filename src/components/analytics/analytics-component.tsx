"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from "recharts";
import { useEffect, useState } from "react";

export function AnalyticsComponent() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="grid gap-4 sm:gap-6">
      <Card>
        <CardHeader className="px-4 sm:px-6">
          <CardTitle>Security Analytics</CardTitle>
          <CardDescription>
            Data visualizations of security incidents across the Solana ecosystem
          </CardDescription>
        </CardHeader>
        <CardContent className="px-2 sm:px-6">
          <Tabs defaultValue="vulnerabilities">
            <TabsList className="grid grid-cols-2 md:grid-cols-4">
              <TabsTrigger value="vulnerabilities">
                {isMobile ? "Vulns" : "Vulnerabilities"}
              </TabsTrigger>
              <TabsTrigger value="funds">Funds Lost</TabsTrigger>
              <TabsTrigger value="response">Response</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
            </TabsList>

            <TabsContent value="vulnerabilities" className="mt-4 sm:mt-6">
              <div className="h-[300px] sm:h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  {/* Chart content with responsive adjustments */}
                </ResponsiveContainer>
              </div>
            </TabsContent>

            {/* Other tabs with responsive adjustments */}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

