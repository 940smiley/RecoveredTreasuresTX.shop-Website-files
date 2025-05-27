import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Sparkles, 
  Camera, 
  BarChart3, 
  Eye, 
  Wand2, 
  ScanLine,
  Zap,
  Shield
} from 'lucide-react'

const features = [
  {
    icon: Sparkles,
    title: 'AI Product Descriptions',
    description: 'Automatically generate detailed, accurate product descriptions using advanced computer vision and language models',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    badge: 'Smart'
  },
  {
    icon: Camera,
    title: 'Photo Enhancement',
    description: 'Automatic photo cleanup, color correction, background removal, and professional touch-ups',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    badge: 'Auto'
  },
  {
    icon: ScanLine,
    title: 'Smart Categorization',
    description: 'OCR and computer vision to automatically sort items into proper categories and extract key details',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    badge: 'AI-Powered'
  },
  {
    icon: Eye,
    title: 'Object Recognition',
    description: 'Advanced CV algorithms identify collectibles, read text, and detect condition automatically',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    badge: 'Vision'
  },
  {
    icon: Zap,
    title: 'Batch Processing',
    description: 'Upload hundreds of photos at once and let AI handle the heavy lifting of organization',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    badge: 'Fast'
  },
  {
    icon: Shield,
    title: 'Authentication',
    description: 'AI-assisted authenticity verification using pattern recognition and database comparisons',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    badge: 'Secure'
  }
]

export function FeatureShowcase() {
  return (
    <section>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">AI-Powered Features</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Revolutionary technology that transforms how you manage your collectibles collection
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => {
          const IconComponent = feature.icon
          return (
            <Card key={index} className="card-hover">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center`}>
                    <IconComponent className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
                <CardDescription>
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
