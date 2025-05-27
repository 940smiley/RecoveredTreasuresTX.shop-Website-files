import { UploadInterface } from '@/components/upload/upload-interface'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Upload, Sparkles, Zap } from 'lucide-react'

export default function UploadPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Upload Your Collectibles</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Upload photos of your collectibles and let our AI automatically categorize, enhance, and describe them
        </p>
      </div>

      {/* Upload Interface */}
      <UploadInterface />

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="text-center">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Upload className="w-6 h-6 text-blue-600" />
            </div>
            <CardTitle className="text-lg">Easy Upload</CardTitle>
            <CardDescription>
              Drag & drop or click to upload multiple photos at once
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Sparkles className="w-6 h-6 text-purple-600" />
            </div>
            <CardTitle className="text-lg">AI Enhancement</CardTitle>
            <CardDescription>
              Automatic photo cleanup and professional descriptions
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Zap className="w-6 h-6 text-green-600" />
            </div>
            <CardTitle className="text-lg">Smart Sorting</CardTitle>
            <CardDescription>
              Automatic categorization using computer vision and OCR
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  )
}
