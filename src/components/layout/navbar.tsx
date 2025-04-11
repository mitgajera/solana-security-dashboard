"use client"

import Link from "next/link"
import { MoonIcon, SunIcon, Code2Icon } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { usePathname } from "next/navigation" // Add this import

export function Navbar() {
  const { setTheme } = useTheme()
  const pathname = usePathname() // Get current path

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
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
