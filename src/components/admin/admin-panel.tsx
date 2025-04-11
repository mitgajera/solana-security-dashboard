"use client"

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PendingExploitsTable } from "@/components/admin/pending-exploits-table";
import { ManageUsersPanel } from "@/components/admin/manage-users-panel";
import { AuditLogPanel } from "@/components/admin/audit-log-panel";
import { AdminSettingsPanel } from "@/components/admin/admin-settings-panel";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export function AdminPanel() {
  const [mounted, setMounted] = useState(false);
  const [dataSource, setDataSource] = useState<"live" | "mock">("mock");
  const [connectionStatus, setConnectionStatus] = useState<"connected" | "disconnected">("disconnected");
  
  // Only run on client side
  useEffect(() => {
    setMounted(true);
    
    // Check if we have a valid Supabase connection
    const checkConnection = async () => {
      try {
        // Use the fetchWithFallback helper instead of direct supabase calls
        // This safely handles the case where supabase isn't initialized
        const testData = await fetchWithFallback('connection_test', []);
        setDataSource(testData ? "live" : "mock");
        setConnectionStatus(testData ? "connected" : "disconnected");
      } catch (error) {
        console.warn("Unable to connect to Supabase, using mock data", error);
        setDataSource("mock");
        setConnectionStatus("disconnected");
      }
    };
    
    checkConnection();
  }, []);
  
  // Don't render anything until mounted on client
  if (!mounted) {
    return <div className="p-8">Loading admin panel...</div>;
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center gap-2">
          <Badge variant={dataSource === "live" ? "default" : "outline"}>
            {dataSource === "live" ? "Live Data" : "Mock Data"}
          </Badge>
          <Badge variant={connectionStatus === "connected" ? "success" : "destructive"}>
            {connectionStatus === "connected" ? "Connected" : "Disconnected"}
          </Badge>
        </div>
      </div>
      
      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full max-w-2xl">
          <TabsTrigger value="pending">Pending Submissions</TabsTrigger>
          <TabsTrigger value="users">Manage Users</TabsTrigger>
          <TabsTrigger value="audit">Audit Log</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          <PendingExploitsTable dataSource={dataSource} />
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <ManageUsersPanel dataSource={dataSource} />
        </TabsContent>

        <TabsContent value="audit" className="space-y-4">
          <AuditLogPanel dataSource={dataSource} />
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <AdminSettingsPanel 
            dataSource={dataSource} 
            connectionStatus={connectionStatus}
            onTestConnection={() => {
              const checkConnection = async () => {
                try {
                  const { data, error } = await supabase.from('connection_test').select('*').limit(1);
                  if (!error) {
                    setDataSource("live");
                    setConnectionStatus("connected");
                  } else {
                    throw new Error("Failed to connect to database");
                  }
                } catch (error) {
                  console.warn("Unable to connect to Supabase, using mock data", error);
                  setDataSource("mock");
                  setConnectionStatus("disconnected");
                } 
              };
              return checkConnection();
            }}
          />
        </TabsContent>
      </Tabs>
    </>
  );
}
