"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Search, 
  Upload, 
  BarChart3, 
  Settings, 
  Menu,
  ShoppingBag,
  Sparkles
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { getFullPath } from '@/lib/env'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl hidden sm:inline-block">
              Recovered Treasures TX
            </span>
            <span className="font-bold text-xl sm:hidden">
              RT-TX
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/browse" className="text-sm font-medium hover:text-primary transition-colors">
              Browse
            </Link>
            <Link href="/upload" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1">
              <Upload className="w-4 h-4" />
              Upload
            </Link>
            <Link href="/analytics" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1">
              <BarChart3 className="w-4 h-4" />
              Analytics
            </Link>
            <Link href="/ai-tools" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1">
              <Sparkles className="w-4 h-4" />
              AI Tools
              <Badge variant="secondary" className="ml-1 text-xs">New</Badge>
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center flex-1 max-w-sm mx-6">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="search"
                placeholder="Search collectibles..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Search className="w-5 h-5" />
            </Button>
            <Link href="/upload/batch">
              <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-1">
                <Upload className="w-4 h-4" />
                Quick Upload
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t py-4">
            <nav className="flex flex-col space-y-3">
              <Link href="/browse" className="text-sm font-medium hover:text-primary transition-colors">
                Browse Collection
              </Link>
              <Link href="/upload" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Upload Items
              </Link>
              <Link href="/analytics" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Analytics
              </Link>
              <Link href="/ai-tools" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                AI Tools
                <Badge variant="secondary" className="text-xs">New</Badge>
              </Link>
              <div className="pt-2 border-t">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <input
                    type="search"
                    placeholder="Search collectibles..."
                    className="w-full pl-10 pr-4 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
