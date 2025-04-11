"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SearchIcon,
  MoreHorizontalIcon,
  UserPlusIcon,
  ArrowUpDownIcon,
  ShieldIcon,
  ShieldAlertIcon,
  UserIcon,
} from "lucide-react"

// Mock user data
const users = [
  {
    id: "u1",
    name: "Alice Johnson",
    email: "alice@securityteam.com",
    role: "admin",
    lastActive: new Date("2025-04-09T14:32:00").toISOString(),
    status: "active",
  },
  {
    id: "u2",
    name: "Bob Smith",
    email: "bob@protocol.io",
    role: "moderator",
    lastActive: new Date("2025-04-08T10:15:00").toISOString(),
    status: "active",
  },
  {
    id: "u3",
    name: "Charlie Davis",
    email: "charlie@solana.dev",
    role: "viewer",
    lastActive: new Date("2025-04-07T16:45:00").toISOString(),
    status: "active",
  },
  {
    id: "u4",
    name: "Diana Wilson",
    email: "diana@research.org",
    role: "moderator",
    lastActive: new Date("2025-04-05T09:20:00").toISOString(),
    status: "inactive",
  },
  {
    id: "u5",
    name: "Edward Miller",
    email: "edward@security.io",
    role: "viewer",
    lastActive: new Date("2025-04-01T11:30:00").toISOString(),
    status: "pending",
  },
]

export function ManageUsersPanel() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return <Badge className="bg-blue-500 hover:bg-blue-600">Admin</Badge>
      case 'moderator':
        return <Badge variant="secondary">Moderator</Badge>
      default:
        return <Badge variant="outline">Viewer</Badge>
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <ShieldAlertIcon className="h-4 w-4 text-blue-500" />
      case 'moderator':
        return <ShieldIcon className="h-4 w-4 text-purple-500" />
      default:
        return <UserIcon className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="bg-green-500 hover:bg-green-600">Active</Badge>
      case 'inactive':
        return <Badge variant="secondary" className="bg-gray-500 hover:bg-gray-600">Inactive</Badge>
      default:
        return <Badge variant="outline" className="text-amber-500 border-amber-500">Pending</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle>Manage Users</CardTitle>
            <CardDescription>
              Add, edit, or remove users and their permissions
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                className="pl-8 w-[200px] sm:w-[260px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button className="flex gap-1">
              <UserPlusIcon className="h-4 w-4" />
              <span>Add User</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <div className="flex items-center gap-1 cursor-pointer">
                    <span>Name</span>
                    <ArrowUpDownIcon className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                    No users found
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map(user => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getRoleIcon(user.role)}
                        {getRoleBadge(user.role)}
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(user.lastActive).toLocaleDateString()}
                      {' '}
                      {new Date(user.lastActive).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(user.status)}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontalIcon className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit User</DropdownMenuItem>
                          <DropdownMenuItem>Change Role</DropdownMenuItem>
                          <DropdownMenuItem>Reset Password</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-500">Deactivate User</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredUsers.length} of {users.length} users
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Previous</Button>
          <Button variant="outline" size="sm">Next</Button>
        </div>
      </CardFooter>
    </Card>
  )
}
