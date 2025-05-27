"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Edit, 
  Trash2, 
  Eye, 
  Star, 
  Package, 
  Search,
  Filter,
  MoreHorizontal,
  Sparkles
} from 'lucide-react'
import { formatPrice } from '@/lib/utils'

// Mock data for admin view
const mockInventory = [
  {
    id: '1',
    title: '1977 Star Wars Topps Trading Card #1 Luke Skywalker',
    description: 'Original 1977 Topps Star Wars trading card featuring Luke Skywalker.',
    price: 45.00,
    cost: 25.00,
    condition: 'Near Mint',
    category: 'Star Wars Memorabilia',
    sku: 'SW-77-001',
    stock: 1,
    status: 'active',
    featured: true,
    aiGenerated: true,
    dateAdded: '2024-01-15',
    views: 234,
    image: '/api/placeholder/150/150'
  },
  {
    id: '2',
    title: 'Edgar Rice Burroughs - Tarzan of the Apes (1914)',
    description: 'Rare first edition of Tarzan of the Apes.',
    price: 1200.00,
    cost: 800.00,
    condition: 'Good',
    category: 'Vintage Books',
    sku: 'VB-14-001',
    stock: 1,
    status: 'active',
    featured: true,
    aiGenerated: true,
    dateAdded: '2024-01-10',
    views: 567,
    image: '/api/placeholder/150/150'
  },
  {
    id: '3',
    title: 'Pokemon Charizard Base Set Holo Card',
    description: 'Original Pokemon Base Set Charizard holographic card.',
    price: 350.00,
    cost: 200.00,
    condition: 'Excellent',
    category: 'Trading Cards',
    sku: 'TC-98-001',
    stock: 1,
    status: 'active',
    featured: false,
    aiGenerated: true,
    dateAdded: '2024-01-12',
    views: 891,
    image: '/api/placeholder/150/150'
  },
  {
    id: '4',
    title: 'Coca-Cola Mini Fridge Collectible',
    description: 'Vintage Coca-Cola mini refrigerator, holds 2 cans.',
    price: 85.00,
    cost: 45.00,
    condition: 'Very Good',
    category: 'Coca Cola Collectibles',
    sku: 'CC-95-001',
    stock: 1,
    status: 'draft',
    featured: false,
    aiGenerated: false,
    dateAdded: '2024-01-18',
    views: 123,
    image: '/api/placeholder/150/150'
  }
]

export function AdminProductGrid() {
  const [products, setProducts] = useState(mockInventory)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter
    
    return matchesSearch && matchesStatus && matchesCategory
  })

  const toggleFeatured = (id: string) => {
    setProducts(prev => prev.map(p => 
      p.id === id ? { ...p, featured: !p.featured } : p
    ))
  }

  const toggleStatus = (id: string) => {
    setProducts(prev => prev.map(p => 
      p.id === id ? { 
        ...p, 
        status: p.status === 'active' ? 'draft' : 'active' 
      } : p
    ))
  }

  const deleteProduct = (id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      setProducts(prev => prev.filter(p => p.id !== id))
    }
  }

  const categories = Array.from(new Set(products.map(p => p.category)))

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by title or SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
            </select>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Items</p>
                <p className="text-2xl font-bold">{products.length}</p>
              </div>
              <Package className="w-6 h-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-2xl font-bold text-green-600">
                  {products.filter(p => p.status === 'active').length}
                </p>
              </div>
              <Eye className="w-6 h-6 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Featured</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {products.filter(p => p.featured).length}
                </p>
              </div>
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Value</p>
                <p className="text-2xl font-bold text-purple-600">
                  {formatPrice(products.reduce((sum, p) => sum + p.price, 0))}
                </p>
              </div>
              <Sparkles className="w-6 h-6 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Products Grid */}
      <div className="grid gap-4">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onToggleFeatured={toggleFeatured}
            onToggleStatus={toggleStatus}
            onDelete={deleteProduct}
          />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your search or filters.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function ProductCard({ 
  product, 
  onToggleFeatured, 
  onToggleStatus, 
  onDelete 
}: {
  product: typeof mockInventory[0]
  onToggleFeatured: (id: string) => void
  onToggleStatus: (id: string) => void
  onDelete: (id: string) => void
}) {
  const profit = product.price - product.cost
  const profitMargin = ((profit / product.price) * 100).toFixed(1)

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex items-center gap-6 p-6">
          {/* Image */}
          <div className="w-24 h-24 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center">
            <Package className="w-8 h-8 text-gray-400" />
          </div>

          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h3 className="font-medium truncate pr-4">{product.title}</h3>
                <p className="text-sm text-gray-600 mb-2">SKU: {product.sku}</p>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="text-xs">
                    {product.category}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {product.condition}
                  </Badge>
                  {product.aiGenerated && (
                    <Badge variant="secondary" className="text-xs">
                      <Sparkles className="w-3 h-3 mr-1" />
                      AI
                    </Badge>
                  )}
                  {product.featured && (
                    <Badge className="text-xs bg-yellow-500">
                      <Star className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                </div>
              </div>
              <div className="text-right">
                <Badge 
                  variant={product.status === 'active' ? 'default' : 'secondary'}
                  className="mb-2"
                >
                  {product.status}
                </Badge>
              </div>
            </div>

            {/* Pricing */}
            <div className="grid grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Price</p>
                <p className="font-medium">{formatPrice(product.price)}</p>
              </div>
              <div>
                <p className="text-gray-600">Cost</p>
                <p className="font-medium">{formatPrice(product.cost)}</p>
              </div>
              <div>
                <p className="text-gray-600">Profit</p>
                <p className="font-medium text-green-600">
                  {formatPrice(profit)} ({profitMargin}%)
                </p>
              </div>
              <div>
                <p className="text-gray-600">Views</p>
                <p className="font-medium">{product.views}</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onToggleFeatured(product.id)}
              className={product.featured ? 'text-yellow-600' : ''}
            >
              <Star className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onToggleStatus(product.id)}
            >
              <Eye className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Edit className="w-4 h-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onDelete(product.id)}
              className="text-red-600 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
