"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Code2Icon } from "lucide-react"

export function Navbar() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <Code2Icon className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block text-xl">
              Superteam Security
            </span>
          </Link>
          <nav className="hidden gap-6 md:flex">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === '/' ? 'text-primary font-bold' : 'text-muted-foreground'
              }`}
            >
              Dashboard
            </Link>
            <Link
              href="/exploits"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === '/exploits' ? 'text-primary font-bold' : 'text-muted-foreground'
              }`}
            >
              Exploits
            </Link>
            <Link
              href="/analytics"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === '/analytics' ? 'text-primary font-bold' : 'text-muted-foreground'
              }`}
            >
              Analytics
            </Link>
            <Link
              href="/submit"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === '/submit' ? 'text-primary font-bold' : 'text-muted-foreground'
              }`}
            >
              Submit Hack
            </Link>
            <Link
              href="/resources"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === '/resources' ? 'text-primary font-bold' : 'text-muted-foreground'
              }`}
            >
              Resources
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
