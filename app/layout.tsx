import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Navbar } from '@/components/layout/navbar'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Recollected Treasures TX - Premium Collectibles Store',
  description: 'Discover rare and valuable collectibles including vintage books, comics, toys, trading cards, memorabilia, and more. AI-powered organization and authentication.',
  keywords: ['collectibles', 'vintage', 'antiques', 'trading cards', 'comics', 'toys', 'memorabilia'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-background">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
          <Toaster />
        </div>
      </body>
    </html>
  )
}
