"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Code2Icon, Menu, X, ShieldIcon } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="border-b border-border sticky top-0 bg-background z-50">
      <div className="container flex items-center justify-between py-3 sm:py-4">
        <div className="flex items-center gap-6 sm:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <Code2Icon className="h-6 w-6 text-primary" />
            <span className="font-bold">SolSec</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
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
            <Link
              href="/admin"
              className={`text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 ${
                pathname === '/admin' ? 'text-primary font-bold' : 'text-muted-foreground'
              }`}
            >
              Admin
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
              Submit
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
            <Link
              href="/admin"
              className={`py-3 text-sm font-medium transition-colors hover:text-primary flex items-center gap-2 ${
                pathname === '/admin' ? 'text-primary font-bold' : 'text-muted-foreground'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Admin
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
