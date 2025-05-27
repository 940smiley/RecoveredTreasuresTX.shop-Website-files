"use client"

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Upload, 
  FolderOpen, 
  FileImage, 
  Sparkles, 
  Eye, 
  CheckCircle, 
  X,
  Wand2,
  Camera
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface UploadedFile {
  file: File
  id: string
  preview: string
  status: 'uploading' | 'processing' | 'analyzing' | 'complete' | 'error'
  progress: number
  category?: string
  description?: string
  estimatedValue?: number
  condition?: string
  error?: string
}

export function AdminUploadZone() {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [processingMode, setProcessingMode] = useState<'auto' | 'manual'>('auto')

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => ({
      file,
      id: Math.random().toString(36).substring(2, 15),
      preview: URL.createObjectURL(file),
      status: 'uploading' as const,
      progress: 0
    }))
    
    setFiles(prev => [...prev, ...newFiles])
    
    // Start processing
    newFiles.forEach(uploadFile => {
      if (processingMode === 'auto') {
        simulateAIProcessing(uploadFile.id)
      }
    })
  }, [processingMode])

  const simulateAIProcessing = async (fileId: string) => {
    const updateFile = (updates: Partial<UploadedFile>) => {
      setFiles(prev => prev.map(f => f.id === fileId ? { ...f, ...updates } : f))
    }

    // Upload phase
    for (let i = 0; i <= 100; i += 20) {
      await new Promise(resolve => setTimeout(resolve, 100))
      updateFile({ progress: i })
    }

    // Processing phase
    updateFile({ status: 'processing', progress: 0 })
    for (let i = 0; i <= 100; i += 25) {
      await new Promise(resolve => setTimeout(resolve, 200))
      updateFile({ progress: i })
    }

    // AI Analysis phase
    updateFile({ status: 'analyzing', progress: 0 })
    for (let i = 0; i <= 100; i += 20) {
      await new Promise(resolve => setTimeout(resolve, 300))
      updateFile({ progress: i })
    }

    // Complete with AI results
    const categories = ['Comic Books', 'Trading Cards', 'Sports Cards', 'Star Wars', 'Vintage Books', 'Coca Cola']
    const conditions = ['Mint', 'Near Mint', 'Excellent', 'Very Good', 'Good']
    const randomCategory = categories[Math.floor(Math.random() * categories.length)]
    const randomCondition = conditions[Math.floor(Math.random() * conditions.length)]
    
    updateFile({ 
      status: 'complete', 
      progress: 100,
      category: randomCategory,
      condition: randomCondition,
      estimatedValue: Math.floor(Math.random() * 200) + 10,
      description: `AI-detected ${randomCategory.toLowerCase()} in ${randomCondition.toLowerCase()} condition. Includes automated categorization, condition assessment, and market value estimation.`
    })
  }

  const removeFile = (id: string) => {
    setFiles(prev => {
      const file = prev.find(f => f.id === id)
      if (file) {
        URL.revokeObjectURL(file.preview)
      }
      return prev.filter(f => f.id !== id)
    })
  }

  const processManually = (id: string) => {
    simulateAIProcessing(id)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp']
    },
    multiple: true
  })

  return (
    <div className="space-y-6">
      {/* Processing Mode Toggle */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wand2 className="w-5 h-5" />
            Processing Mode
          </CardTitle>
          <CardDescription>
            Choose how uploaded files should be processed
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button
              variant={processingMode === 'auto' ? 'default' : 'outline'}
              onClick={() => setProcessingMode('auto')}
              className="flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Auto AI Processing
            </Button>
            <Button
              variant={processingMode === 'manual' ? 'default' : 'outline'}
              onClick={() => setProcessingMode('manual')}
              className="flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              Manual Review
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Upload Zone */}
      <Card>
        <div
          {...getRootProps()}
          className={cn(
            "upload-zone p-12 text-center cursor-pointer transition-all border-2 border-dashed rounded-lg",
            isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
          )}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              {isDragActive ? (
                <FolderOpen className="w-10 h-10 text-white" />
              ) : (
                <Upload className="w-10 h-10 text-white" />
              )}
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-3">
                {isDragActive ? 'Drop your inventory here' : 'Upload Inventory Items'}
              </h3>
              <p className="text-gray-600 mb-6 max-w-md">
                Drag & drop photos or click to browse. AI will automatically categorize, 
                enhance, and price your collectibles.
              </p>
              <div className="flex items-center gap-4 justify-center">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Camera className="w-3 h-3" />
                  Auto Enhancement
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  AI Categorization
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  Value Estimation
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* File Processing List */}
      {files.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Processing Queue ({files.length})</h3>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setFiles([])}
              >
                Clear All
              </Button>
              <Button size="sm">
                Create Listings ({files.filter(f => f.status === 'complete').length})
              </Button>
            </div>
          </div>
          
          <div className="grid gap-4">
            {files.map((file) => (
              <AdminFileCard 
                key={file.id} 
                file={file} 
                onRemove={removeFile}
                onProcess={processManually}
                processingMode={processingMode}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function AdminFileCard({ 
  file, 
  onRemove, 
  onProcess, 
  processingMode 
}: { 
  file: UploadedFile
  onRemove: (id: string) => void
  onProcess: (id: string) => void
  processingMode: 'auto' | 'manual'
}) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'uploading': return 'bg-blue-500'
      case 'processing': return 'bg-yellow-500'
      case 'analyzing': return 'bg-purple-500'
      case 'complete': return 'bg-green-500'
      case 'error': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'uploading': return 'Uploading...'
      case 'processing': return 'Enhancing image...'
      case 'analyzing': return 'AI analyzing...'
      case 'complete': return 'Ready for listing!'
      case 'error': return 'Processing failed'
      default: return 'Pending'
    }
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-start gap-6">
          {/* Image Preview */}
          <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
            <img
              src={file.preview}
              alt={file.file.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* File Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-medium truncate">{file.file.name}</h4>
                <p className="text-sm text-gray-500">
                  {(file.file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemove(file.id)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Status */}
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-2 h-2 rounded-full ${getStatusColor(file.status)}`} />
              <span className="text-sm font-medium">{getStatusText(file.status)}</span>
            </div>

            {/* Progress */}
            {file.status !== 'complete' && file.status !== 'error' && (
              <Progress value={file.progress} className="mb-4" />
            )}

            {/* AI Results */}
            {file.status === 'complete' && (
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <Badge variant="outline">{file.category}</Badge>
                  <Badge variant="outline">{file.condition}</Badge>
                  <Badge variant="outline" className="text-green-600">
                    ${file.estimatedValue}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">
                  {file.description}
                </p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    Edit Details
                  </Button>
                  <Button size="sm">
                    Create Listing
                  </Button>
                </div>
              </div>
            )}

            {/* Manual Processing */}
            {processingMode === 'manual' && file.status === 'uploading' && (
              <Button
                size="sm"
                onClick={() => onProcess(file.id)}
                className="flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Process with AI
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
