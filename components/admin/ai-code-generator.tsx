"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Sparkles, 
  Code, 
  Wand2, 
  Copy, 
  Download, 
  Play,
  Palette,
  Layout,
  Database,
  Zap
} from 'lucide-react'

interface CodeTemplate {
  id: string
  name: string
  description: string
  category: 'component' | 'page' | 'api' | 'style'
  icon: any
  prompt: string
  generated?: string
}

const templates: CodeTemplate[] = [
  {
    id: 'product-card',
    name: 'Product Card Component',
    description: 'Generate a reusable product card component with hover effects',
    category: 'component',
    icon: Layout,
    prompt: 'Create a modern product card component for collectibles with image, title, price, condition badge, and hover animations'
  },
  {
    id: 'search-filter',
    name: 'Search & Filter Component',
    description: 'Advanced search with category filters and sorting',
    category: 'component',
    icon: Code,
    prompt: 'Create a search component with category filters, price range, condition filters, and sort options for collectibles'
  },
  {
    id: 'admin-dashboard',
    name: 'Admin Dashboard Page',
    description: 'Complete admin dashboard with analytics and controls',
    category: 'page',
    icon: Layout,
    prompt: 'Generate an admin dashboard page with inventory stats, recent activity, and quick action buttons'
  },
  {
    id: 'api-upload',
    name: 'Upload API Endpoint',
    description: 'API route for handling file uploads with AI processing',
    category: 'api',
    icon: Database,
    prompt: 'Create a Next.js API route for handling multiple file uploads with AI image analysis integration'
  },
  {
    id: 'theme-colors',
    name: 'Custom Color Scheme',
    description: 'Generate CSS variables for a collectibles store theme',
    category: 'style',
    icon: Palette,
    prompt: 'Create a warm, vintage-inspired color scheme for a collectibles store with CSS custom properties'
  },
  {
    id: 'animation-lib',
    name: 'Animation Library',
    description: 'Custom CSS animations for store interactions',
    category: 'style',
    icon: Zap,
    prompt: 'Generate smooth CSS animations for card hovers, button clicks, and page transitions in a collectibles store'
  }
]

export function AICodeGenerator() {
  const [selectedTemplate, setSelectedTemplate] = useState<CodeTemplate | null>(null)
  const [customPrompt, setCustomPrompt] = useState('')
  const [generatedCode, setGeneratedCode] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const generateCode = async (prompt: string) => {
    setIsGenerating(true)
    
    // Simulate AI code generation
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Mock generated code based on template
    const mockCode = getMockCode(selectedTemplate?.id || 'custom')
    setGeneratedCode(mockCode)
    setIsGenerating(false)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode)
    alert('Code copied to clipboard!')
  }

  const downloadCode = () => {
    const element = document.createElement('a')
    const file = new Blob([generatedCode], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = `${selectedTemplate?.name?.replace(/\s+/g, '-').toLowerCase() || 'generated'}.tsx`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="space-y-6">
      {/* AI Code Generator Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            AI Code Generator
          </CardTitle>
          <CardDescription>
            Generate custom components, pages, and styles for your collectibles store using AI
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Templates */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Code Templates</h3>
          <div className="grid gap-3">
            {templates.map((template) => {
              const IconComponent = template.icon
              return (
                <Card 
                  key={template.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedTemplate?.id === template.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => setSelectedTemplate(template)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{template.name}</h4>
                          <Badge variant="outline" className="text-xs">
                            {template.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">
                          {template.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Custom Prompt */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Custom Prompt</CardTitle>
            </CardHeader>
            <CardContent>
              <textarea
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="Describe what you want to generate..."
                className="w-full h-24 p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button
                onClick={() => generateCode(customPrompt)}
                disabled={!customPrompt.trim() || isGenerating}
                className="w-full mt-3"
              >
                <Wand2 className="w-4 h-4 mr-2" />
                Generate Custom Code
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Generator & Output */}
        <div className="space-y-4">
          {selectedTemplate && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Selected Template</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <selectedTemplate.icon className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">{selectedTemplate.name}</p>
                    <p className="text-sm text-gray-600">{selectedTemplate.description}</p>
                  </div>
                </div>
                <Button
                  onClick={() => generateCode(selectedTemplate.prompt)}
                  disabled={isGenerating}
                  className="w-full"
                >
                  {isGenerating ? (
                    <>
                      <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-4 h-4 mr-2" />
                      Generate Code
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Generated Code */}
          {generatedCode && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Generated Code</CardTitle>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={copyToClipboard}>
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={downloadCode}>
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-auto max-h-96">
                  <pre className="text-sm">
                    <code>{generatedCode}</code>
                  </pre>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <Button size="sm">
                    <Play className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                  <Button variant="outline" size="sm">
                    Save to Project
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

function getMockCode(templateId: string): string {
  switch (templateId) {
    case 'product-card':
      return `import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star, Eye } from 'lucide-react'

interface ProductCardProps {
  product: {
    id: string
    title: string
    price: number
    condition: string
    category: string
    image: string
    featured?: boolean
  }
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="group cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1">
      <div className="relative overflow-hidden rounded-t-lg">
        <img 
          src={product.image} 
          alt={product.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.featured && (
          <Badge className="absolute top-2 right-2 bg-yellow-500">
            <Star className="w-3 h-3 mr-1" />
            Featured
          </Badge>
        )}
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg line-clamp-2 group-hover:text-blue-600 transition-colors">
          {product.title}
        </CardTitle>
        <div className="flex items-center gap-2">
          <Badge variant="outline">{product.category}</Badge>
          <Badge variant="secondary">{product.condition}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-green-600">
            \${product.price}
          </span>
          <button className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors">
            <Eye className="w-4 h-4" />
            View
          </button>
        </div>
      </CardContent>
    </Card>
  )
}`

    case 'search-filter':
      return `"use client"

import { useState } from 'react'
import { Search, Filter, SortAsc } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function SearchFilter() {
  const [searchTerm, setSearchTerm] = useState('')
  const [category, setCategory] = useState('all')
  const [condition, setCondition] = useState('all')
  const [sortBy, setSortBy] = useState('newest')

  return (
    <div className="bg-white p-6 rounded-lg border shadow-sm">
      <div className="grid md:grid-cols-5 gap-4">
        <div className="relative md:col-span-2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search collectibles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Categories</option>
          <option value="comics">Comic Books</option>
          <option value="cards">Trading Cards</option>
          <option value="toys">Toys</option>
        </select>
        
        <select
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Conditions</option>
          <option value="mint">Mint</option>
          <option value="near-mint">Near Mint</option>
          <option value="excellent">Excellent</option>
        </select>
        
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="newest">Newest First</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="popular">Most Popular</option>
        </select>
      </div>
    </div>
  )
}`

    default:
      return `// Generated code will appear here
// This is a placeholder for AI-generated content

export function GeneratedComponent() {
  return (
    <div className="p-6 border rounded-lg">
      <h2 className="text-xl font-bold mb-4">AI Generated Component</h2>
      <p className="text-gray-600">
        Your custom code will be generated here based on the prompt.
      </p>
    </div>
  )
}`
  }
}
