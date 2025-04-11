"use client"

import { Navbar } from "@/components/layout/navbar"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <footer className="border-t py-4">
        <div className="container flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Superteam Security Dashboard - Enhancing security in the Solana ecosystem
          </p>
          <p className="text-sm text-muted-foreground">
            {new Date().getFullYear()} © MIT License
          </p>
        </div>
      </footer>
    </div>
  )
}
