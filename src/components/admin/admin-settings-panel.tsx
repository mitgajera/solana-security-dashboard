"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { supabase } from "@/lib/supabase"
import { AlertCircle, CheckCircle, Database, RefreshCw, Upload } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface AdminSettingsPanelProps {
  dataSource: "live" | "mock";
  connectionStatus: "connected" | "disconnected";
  onTestConnection: () => Promise<void>;
}

export function AdminSettingsPanel({ 
  dataSource, 
  connectionStatus,
  onTestConnection
}: AdminSettingsPanelProps) {
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState<{
    status: "success" | "error" | null;
    message: string;
  }>({ status: null, message: "" });

  const runImport = async () => {
    setImporting(true);
    setImportResult({ status: null, message: "" });
    
    try {
      // In a real implementation, you might call an API endpoint that triggers the import
      const response = await fetch('/api/admin/import-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setImportResult({
          status: "success",
          message: `Successfully imported ${data.count} exploits`
        });
      } else {
        throw new Error(data.message || 'Import failed');
      }
    } catch (error) {
      console.error('Import error:', error);
      setImportResult({
        status: "error",
        message: error instanceof Error ? error.message : 'Unknown import error'
      });
    } finally {
      setImporting(false);
    }
  };

  return (
    <Tabs defaultValue="general" className="space-y-4">
      <TabsList>
        <TabsTrigger value="general">General Settings</TabsTrigger>
        <TabsTrigger value="data">Data Management</TabsTrigger>
        <TabsTrigger value="api">API Keys</TabsTrigger>
      </TabsList>
      
      <TabsContent value="general">
        {/* General settings content */}
      </TabsContent>
      
      <TabsContent value="data">
        <Card>
          <CardHeader>
            <CardTitle>Data Management</CardTitle>
            <CardDescription>
              Import data from external sources and manage database settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Database Connection */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium">Database Connection</h3>
                  <p className="text-sm text-muted-foreground">
                    Current status: {dataSource === "live" ? "Using live database" : "Using mock data"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {connectionStatus === "connected" ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  )}
                  <span className="font-medium">
                    {connectionStatus === "connected" ? "Connected" : "Disconnected"}
                  </span>
                  <Button variant="outline" size="sm" onClick={onTestConnection}>
                    <RefreshCw className="h-4 w-4 mr-1" />
                    Test Connection
                  </Button>
                </div>
              </div>
              
              {connectionStatus === "disconnected" && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Connection Failed</AlertTitle>
                  <AlertDescription>
                    Unable to connect to the database. Check your API keys and network connection.
                  </AlertDescription>
                </Alert>
              )}
            </div>
            
            <div className="border-t pt-4">
              <h3 className="text-lg font-medium mb-2">Data Import</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Import exploit data from external sources like SlowMist, Rekt, and SolanaFM
              </p>
              
              <div className="flex gap-4">
                <Button 
                  onClick={runImport} 
                  disabled={importing || connectionStatus === "disconnected"}
                >
                  {importing ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Importing...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      Run Import
                    </>
                  )}
                </Button>
                <Button variant="outline" disabled={importing}>
                  <Database className="h-4 w-4 mr-2" />
                  View Import History
                </Button>
              </div>
              
              {importResult.status && (
                <Alert 
                  variant={importResult.status === "success" ? "default" : "destructive"}
                  className="mt-4"
                >
                  {importResult.status === "success" ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <AlertCircle className="h-4 w-4" />
                  )}
                  <AlertTitle>
                    {importResult.status === "success" ? "Import Successful" : "Import Failed"}
                  </AlertTitle>
                  <AlertDescription>
                    {importResult.message}
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="api">
        {/* API keys content */}
      </TabsContent>
    </Tabs>
  )
}
