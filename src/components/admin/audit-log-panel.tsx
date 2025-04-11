"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, SearchIcon, FilterIcon } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock audit log data
const auditLogs = [
  {
    id: "log1",
    action: "exploit_approved",
    description: "Approved exploit submission for SolYield Finance",
    user: "Alice Johnson",
    timestamp: new Date("2025-04-09T15:30:00").toISOString(),
    ipAddress: "192.168.1.100",
    resourceId: "p1",
  },
  {
    id: "log2",
    action: "user_role_changed",
    description: "Changed Bob Smith's role from viewer to moderator",
    user: "Alice Johnson",
    timestamp: new Date("2025-04-09T14:15:00").toISOString(),
    ipAddress: "192.168.1.100",
    resourceId: "u2",
  },
  {
    id: "log3",
    action: "exploit_rejected",
    description: "Rejected exploit submission for invalid details",
    user: "Bob Smith",
    timestamp: new Date("2025-04-08T11:45:00").toISOString(),
    ipAddress: "192.168.1.101",
    resourceId: "p7",
  },
  {
    id: "log4",
    action: "user_created",
    description: "Created new user account for Edward Miller",
    user: "Alice Johnson",
    timestamp: new Date("2025-04-07T09:20:00").toISOString(),
    ipAddress: "192.168.1.100",
    resourceId: "u5",
  },
  {
    id: "log5",
    action: "system_settings_updated",
    description: "Updated notification settings",
    user: "Alice Johnson",
    timestamp: new Date("2025-04-06T16:10:00").toISOString(),
    ipAddress: "192.168.1.100",
    resourceId: "settings",
  },
  {
    id: "log6",
    action: "exploit_review",
    description: "Marked SolBridge exploit for review",
    user: "Diana Wilson",
    timestamp: new Date("2025-04-05T13:25:00").toISOString(),
    ipAddress: "192.168.1.102",
    resourceId: "p3",
  },
  {
    id: "log7",
    action: "user_deactivated",
    description: "Deactivated user account for John Doe",
    user: "Alice Johnson",
    timestamp: new Date("2025-04-04T10:50:00").toISOString(),
    ipAddress: "192.168.1.100",
    resourceId: "u8",
  },
]

export function AuditLogPanel() {
  const [searchTerm, setSearchTerm] = useState("")

  const getActionBadge = (action: string) => {
    if (action.includes("approved")) {
      return <Badge className="bg-green-500 hover:bg-green-600">Approved</Badge>
    }
    if (action.includes("rejected")) {
      return <Badge variant="destructive">Rejected</Badge>
    }
    if (action.includes("user")) {
      return <Badge variant="secondary">User Management</Badge>
    }
    if (action.includes("review")) {
      return <Badge variant="outline" className="border-blue-500 text-blue-500">Review</Badge>
    }
    return <Badge variant="outline">System</Badge>
  }

  const filteredLogs = auditLogs.filter(log =>
    log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.user.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle>Audit Log</CardTitle>
            <CardDescription>
              Track all administrative actions for security and compliance
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search logs..."
                className="pl-8 w-[260px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <FilterIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>All Actions</DropdownMenuItem>
                <DropdownMenuItem>Exploit Actions</DropdownMenuItem>
                <DropdownMenuItem>User Management</DropdownMenuItem>
                <DropdownMenuItem>System Settings</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" className="flex items-center gap-1">
              <CalendarIcon className="h-4 w-4" />
              <span>Date Range</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Action</TableHead>
                <TableHead className="w-[300px]">Description</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>IP Address</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                    No audit logs found
                  </TableCell>
                </TableRow>
              ) : (
                filteredLogs.map(log => (
                  <TableRow key={log.id}>
                    <TableCell>
                      {getActionBadge(log.action)}
                    </TableCell>
                    <TableCell className="font-medium">
                      {log.description}
                    </TableCell>
                    <TableCell>{log.user}</TableCell>
                    <TableCell>
                      {new Date(log.timestamp).toLocaleDateString()}{" "}
                      {new Date(log.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </TableCell>
                    <TableCell className="font-mono text-xs">
                      {log.ipAddress}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {filteredLogs.length} of {auditLogs.length} audit logs
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Export CSV</Button>
          <div className="flex">
            <Button variant="outline" size="sm">Previous</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
