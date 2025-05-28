"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  BookOpen, 
  Zap, 
  Gamepad2, 
  Star, 
  CreditCard, 
  Trophy, 
  Camera, 
  Mail, 
  Newspaper, 
  Wine,
  Gamepad
} from 'lucide-react'
import Link from 'next/link'

const categories = [
  {
    id: 'books',
    name: 'Vintage Books',
    description: 'Edgar Rice Burroughs, early Tarzan editions (1910s-1920s)',
    icon: BookOpen,
    count: 145,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    featured: true
  },
  {
    id: 'comics',
    name: 'Comic Books',
    description: 'Rare and vintage comic book collection',
    icon: Zap,
    count: 234,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    id: 'fast-food-toys',
    name: 'Fast Food Toys',
    description: 'McDonald\'s, Burger King, and other promotional toys',
    icon: Gamepad2,
    count: 89,
    color: 'text-red-600',
    bgColor: 'bg-red-50'
  },
  {
    id: 'star-wars',
    name: 'Star Wars Memorabilia',
    description: 'Theater promos, popcorn buckets, magazines, bobbleheads',
    icon: Star,
    count: 67,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    featured: true
  },
  {
    id: 'trading-cards',
    name: 'Trading Cards',
    description: 'Pokemon, Buddyfight, and other trading card games',
    icon: CreditCard,
    count: 312,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  },
  {
    id: 'collectible-cards',
    name: 'Collectible Cards',
    description: 'DBZ, Magic: The Gathering, and premium cards',
    icon: CreditCard,
    count: 198,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50'
  },
  {
    id: 'sports-cards',
    name: 'Sports Cards',
    description: 'Baseball, football, basketball, some autographed',
    icon: Trophy,
    count: 456,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    featured: true
  },
  {
    id: 'cameras',
    name: 'Photography Equipment',
    description: 'Vintage cameras and photography accessories',
    icon: Camera,
    count: 23,
    color: 'text-gray-600',
    bgColor: 'bg-gray-50'
  },
  {
    id: 'stamps',
    name: 'Stamps',
    description: 'Worldwide stamp collection',
    icon: Mail,
    count: 789,
    color: 'text-pink-600',
    bgColor: 'bg-pink-50'
  },
  {
    id: 'ephemera',
    name: 'Ephemera',
    description: 'Newspapers, magazines, Hit Parader from the 80s',
    icon: Newspaper,
    count: 156,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50'
  },
  {
    id: 'coca-cola',
    name: 'Coca Cola Collectibles',
    description: 'Village sets, mini fridges, radios, bottles, memorabilia',
    icon: Wine,
    count: 78,
    color: 'text-red-700',
    bgColor: 'bg-red-100',
    featured: true
  },
  {
    id: 'atari',
    name: 'Atari Games',
    description: 'Atari system with 100+ games (untested)',
    icon: Gamepad,
    count: 101,
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50'
  }
]

export function CategoryGrid() {
  return (
    <div className="category-grid">
      {categories.map((category) => {
        const IconComponent = category.icon
        return (
          <Link key={category.id} href={`/browse/${category.id}`}>
            <Card className="card-hover h-full cursor-pointer group">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-lg ${category.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <IconComponent className={`w-6 h-6 ${category.color}`} />
                  </div>
                  <div className="flex gap-1">
                    {category.featured && (
                      <Badge variant="secondary" className="text-xs">Featured</Badge>
                    )}
                    <Badge variant="outline" className="text-xs">
                      {category.count}
                    </Badge>
                  </div>
                </div>
                <CardTitle className="text-lg">{category.name}</CardTitle>
                <CardDescription className="text-sm">
                  {category.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{category.count} items</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}
