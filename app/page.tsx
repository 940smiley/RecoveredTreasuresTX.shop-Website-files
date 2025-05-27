import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Upload, Sparkles, Camera, BarChart3, Search, Star } from 'lucide-react'
import Link from 'next/link'
import { CategoryGrid } from '@/components/store/category-grid'
import { FeatureShowcase } from '@/components/store/feature-showcase'

export default function HomePage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-12 gradient-bg rounded-2xl text-white">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl font-bold mb-6">
            Recollected Treasures TX
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Premium collectibles with AI-powered organization, authentication, and discovery
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/upload">
              <Button size="lg" variant="secondary" className="gap-2">
                <Upload className="w-5 h-5" />
                Start Uploading
              </Button>
            </Link>
            <Link href="/browse">
              <Button size="lg" variant="outline" className="gap-2 text-white border-white hover:bg-white hover:text-gray-900">
                <Search className="w-5 h-5" />
                Browse Collection
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* AI Features Showcase */}
      <FeatureShowcase />

      {/* Categories Section */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Collection Categories</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our carefully curated categories of collectibles, each with specialized AI analysis and authentication
          </p>
        </div>
        <CategoryGrid />
      </section>

      {/* Quick Actions */}
      <section className="grid md:grid-cols-3 gap-6">
        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5 text-blue-600" />
              Bulk Upload
            </CardTitle>
            <CardDescription>
              Upload multiple items at once with AI-powered categorization
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/upload/batch">
              <Button className="w-full">Start Batch Upload</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-green-600" />
              Analytics
            </CardTitle>
            <CardDescription>
              View insights about your collection and market trends
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/analytics">
              <Button variant="outline" className="w-full">View Analytics</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-600" />
              Featured Items
            </CardTitle>
            <CardDescription>
              Discover rare and valuable pieces in our collection
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/featured">
              <Button variant="outline" className="w-full">View Featured</Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Recent Activity */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
        <div className="grid gap-4">
          <Card>
            <CardContent className="flex items-center justify-between p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Upload className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Batch upload completed</p>
                  <p className="text-sm text-muted-foreground">24 items processed and categorized</p>
                </div>
              </div>
              <Badge variant="secondary">2 hours ago</Badge>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center justify-between p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">AI descriptions generated</p>
                  <p className="text-sm text-muted-foreground">15 product descriptions enhanced</p>
                </div>
              </div>
              <Badge variant="secondary">1 day ago</Badge>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
