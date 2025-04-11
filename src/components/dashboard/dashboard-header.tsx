"use client"

import { Button } from "@/components/ui/button"
import { PlusIcon, ShieldAlert } from "lucide-react"
import Link from "next/link"

export function DashboardHeader() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <ShieldAlert className="h-8 w-8 text-primary" />
          <span>Solana Security Dashboard</span>
        </h1>
        <p className="mt-1 text-lg text-muted-foreground">
          Real-time visualization of major exploits in the Solana ecosystem
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Link href="/submit">
          <Button>
            <PlusIcon className="mr-2 h-4 w-4" />
            Report a Hack
          </Button>
        </Link>
      </div>
    </div>
  )
}
