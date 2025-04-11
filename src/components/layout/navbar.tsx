"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Code2Icon, Menu, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <Code2Icon className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">
              Superteam Security
            </span>
          </Link>
          
          {/* Desktop Navigation */}
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
        
        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          className="md:hidden" 
          size="icon" 
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border">
          <nav className="flex flex-col px-4 py-2 bg-background">
            <Link
              href="/"
              className={`py-3 text-sm font-medium transition-colors hover:text-primary ${
                pathname === '/' ? 'text-primary font-bold' : 'text-muted-foreground'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/exploits"
              className={`py-3 text-sm font-medium transition-colors hover:text-primary ${
                pathname === '/exploits' ? 'text-primary font-bold' : 'text-muted-foreground'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Exploits
            </Link>
            <Link
              href="/analytics"
              className={`py-3 text-sm font-medium transition-colors hover:text-primary ${
                pathname === '/analytics' ? 'text-primary font-bold' : 'text-muted-foreground'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Analytics
            </Link>
            <Link
              href="/submit"
              className={`py-3 text-sm font-medium transition-colors hover:text-primary ${
                pathname === '/submit' ? 'text-primary font-bold' : 'text-muted-foreground'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Submit Hack
            </Link>
            <Link
              href="/resources"
              className={`py-3 text-sm font-medium transition-colors hover:text-primary ${
                pathname === '/resources' ? 'text-primary font-bold' : 'text-muted-foreground'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Resources
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
