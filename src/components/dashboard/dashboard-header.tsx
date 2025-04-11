"use client"

import { Button } from "@/components/ui/button"
import { PlusIcon, ShieldAlert } from "lucide-react"
import Link from "next/link"

export function DashboardHeader() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center gap-2">
          <ShieldAlert className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
          <span>Solana Security Dashboard</span>
        </h1>
        <p className="mt-1 text-base sm:text-lg text-muted-foreground">
          Real-time visualization of major exploits in the Solana ecosystem
        </p>
      </div>
      <div className="flex items-center gap-2 mt-3 md:mt-0">
        <Link href="/submit" className="w-full sm:w-auto">
          <Button className="w-full sm:w-auto">
            <PlusIcon className="mr-2 h-4 w-4" />
            Report a Hack
          </Button>
        </Link>
      </div>
    </div>
  )
}
