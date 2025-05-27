import { BatchUploadInterface } from '@/components/upload/batch-upload-interface'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Upload, Cpu, Eye, Wand2 } from 'lucide-react'

export default function BatchUploadPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <h1 className="text-3xl font-bold">Batch Upload</h1>
          <Badge variant="secondary">AI-Powered</Badge>
        </div>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          Upload hundreds of photos at once and let our AI automatically categorize, enhance, and organize your entire collection
        </p>
      </div>

      {/* Batch Upload Interface */}
      <BatchUploadInterface />

      {/* Process Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cpu className="w-5 h-5" />
            AI Processing Pipeline
          </CardTitle>
          <CardDescription>
            Here's what happens to each photo during batch processing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Upload className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-medium mb-2">1. Upload</h4>
              <p className="text-sm text-muted-foreground">
                Photos are securely uploaded and queued for processing
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Eye className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-medium mb-2">2. Analysis</h4>
              <p className="text-sm text-muted-foreground">
                Computer vision identifies objects, reads text, and extracts details
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Wand2 className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-medium mb-2">3. Enhancement</h4>
              <p className="text-sm text-muted-foreground">
                Photos are cleaned up, cropped, and optimized automatically
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Cpu className="w-6 h-6 text-orange-600" />
              </div>
              <h4 className="font-medium mb-2">4. Categorize</h4>
              <p className="text-sm text-muted-foreground">
                Items are sorted into categories and detailed descriptions are generated
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
