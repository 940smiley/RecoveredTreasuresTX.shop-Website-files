"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Star, Eye, Sparkles } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'

// Mock product data - replace with actual database queries
const mockProducts = [
	{
		id: '1',
		title: '1977 Star Wars Topps Trading Card #1 Luke Skywalker',
		description:
			'Original 1977 Topps Star Wars trading card featuring Luke Skywalker. Near mint condition.',
		price: 45.0,
		originalPrice: 60.0,
		condition: 'Near Mint',
		category: 'Star Wars Memorabilia',
		year: 1977,
		images: ['/api/placeholder/300/300'],
		featured: true,
		rarity: 'Uncommon',
		aiGenerated: true,
	},
	{
		id: '2',
		title: 'Edgar Rice Burroughs - Tarzan of the Apes (1914) First Edition',
		description:
			'Rare first edition of Tarzan of the Apes by Edgar Rice Burroughs, published in 1914.',
		price: 1200.0,
		condition: 'Good',
		category: 'Vintage Books',
		year: 1914,
		images: ['/api/placeholder/300/300'],
		featured: true,
		rarity: 'Very Rare',
		aiGenerated: true,
	},
	{
		id: '3',
		title: 'Pokemon Charizard Base Set Holo Card',
		description:
			'Original Pokemon Base Set Charizard holographic card in excellent condition.',
		price: 350.0,
		condition: 'Excellent',
		category: 'Trading Cards',
		year: 1998,
		images: ['/api/placeholder/300/300'],
		featured: false,
		rarity: 'Rare',
		aiGenerated: true,
	},
	{
		id: '4',
		title: 'Coca-Cola Mini Fridge Collectible',
		description:
			'Vintage Coca-Cola mini refrigerator, holds 2 cans. Working condition.',
		price: 85.0,
		condition: 'Very Good',
		category: 'Coca Cola Collectibles',
		year: 1995,
		images: ['/api/placeholder/300/300'],
		featured: false,
		rarity: 'Common',
		aiGenerated: false,
	},
]

interface ProductGridProps {
	featured?: boolean
	limit?: number
	category?: string
}

export function ProductGrid({ featured = false, limit, category }: ProductGridProps) {
	let products = mockProducts

	if (featured) {
		products = products.filter(p => p.featured)
	}

	if (category) {
		products = products.filter(p => p.category.toLowerCase().includes(category.toLowerCase()))
	}

	if (limit) {
		products = products.slice(0, limit)
	}

	return (
		<div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
			{products.map((product) => (
				<ProductCard key={product.id} product={product} />
			))}
		</div>
	)
}

function ProductCard({ product }: { product: typeof mockProducts[0] }) {
	const getRarityColor = (rarity: string) => {
		switch (rarity.toLowerCase()) {
			case 'extremely rare':
				return 'bg-red-100 text-red-800'
			case 'very rare':
				return 'bg-orange-100 text-orange-800'
			case 'rare':
				return 'bg-yellow-100 text-yellow-800'
			case 'uncommon':
				return 'bg-blue-100 text-blue-800'
			default:
				return 'bg-gray-100 text-gray-800'
		}
	}

	return (
		<Link href={`/product/${product.id}`}>
			<Card className="card-hover h-full cursor-pointer group">
				<div className="relative">
					<div className="aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
						<div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
							<Eye className="w-12 h-12 text-gray-400" />
						</div>
					</div>
					<div className="absolute top-2 right-2 flex flex-col gap-1">
						{product.featured && (
							<Badge className="bg-yellow-500 text-white">
								<Star className="w-3 h-3 mr-1" />
								Featured
							</Badge>
						)}
						{product.aiGenerated && (
							<Badge
								variant="secondary"
								className="bg-purple-100 text-purple-800"
							>
								<Sparkles className="w-3 h-3 mr-1" />
								AI
							</Badge>
						)}
					</div>
				</div>

				<CardHeader className="pb-2">
					<CardTitle className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">
						{product.title}
					</CardTitle>
					<div className="flex items-center gap-2">
						<Badge variant="outline" className="text-xs">
							{product.category}
						</Badge>
						<Badge className={`text-xs ${getRarityColor(product.rarity)}`}>
							{product.rarity}
						</Badge>
					</div>
				</CardHeader>

				<CardContent className="pt-0">
					<CardDescription className="text-xs line-clamp-2 mb-3">
						{product.description}
					</CardDescription>

					<div className="flex items-center justify-between mb-3 text-xs text-muted-foreground">
						<span>Condition: {product.condition}</span>
						<span>Year: {product.year}</span>
					</div>

					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<span className="text-lg font-bold">
								{formatPrice(product.price)}
							</span>
							{product.originalPrice && product.originalPrice > product.price && (
								<span className="text-sm text-muted-foreground line-through">
									{formatPrice(product.originalPrice)}
								</span>
							)}
						</div>
						<Button size="sm" variant="outline">
							View
						</Button>
					</div>
				</CardContent>
			</Card>
		</Link>
	)
}
