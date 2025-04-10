import React, { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { AlertTriangle, DollarSign, Clock } from "lucide-react";
import { useExploitData } from "../../hooks/useExploitData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";

const Dashboard = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Security Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              {children}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;