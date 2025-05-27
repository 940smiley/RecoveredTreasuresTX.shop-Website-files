import { CategoryGrid } from '@/components/store/category-grid'
import { ProductGrid } from '@/components/store/product-grid'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search, Filter, SortAsc, Star } from 'lucide-react'

export default function BrowsePage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Browse Collection</h1>
          <p className="text-muted-foreground">
            Discover rare and valuable collectibles across all categories
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" size="sm">
            <SortAsc className="w-4 h-4 mr-2" />
            Sort
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="search"
                placeholder="Search for comics, cards, toys, memorabilia..."
                className="w-full pl-10 pr-4 py-3 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <Button>Search</Button>
          </div>
        </CardContent>
      </Card>

      {/* Featured Items */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Featured Items</h2>
          <Button variant="outline">View All</Button>
        </div>
        <ProductGrid featured={true} />
      </section>

      {/* Categories */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Shop by Category</h2>
          <p className="text-muted-foreground">Browse our specialized collections</p>
        </div>
        <CategoryGrid />
      </section>

      {/* Recent Additions */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Recently Added</h2>
          <Button variant="outline">View All</Button>
        </div>
        <ProductGrid limit={8} />
      </section>

      {/* Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Collection Statistics</CardTitle>
          <CardDescription>Current inventory overview</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">2,847</div>
              <div className="text-sm text-muted-foreground">Total Items</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">12</div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">456</div>
              <div className="text-sm text-muted-foreground">Rare Items</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">89%</div>
              <div className="text-sm text-muted-foreground">AI Processed</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
