"use client"

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Upload, X, FileImage, Sparkles, Eye, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface UploadedFile {
  file: File
  id: string
  preview: string
  status: 'uploading' | 'processing' | 'analyzing' | 'complete' | 'error'
  progress: number
  category?: string
  description?: string
  error?: string
}

export function UploadInterface() {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [isProcessing, setIsProcessing] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => ({
      file,
      id: Math.random().toString(36).substring(2, 15),
      preview: URL.createObjectURL(file),
      status: 'uploading' as const,
      progress: 0
    }))
    
    setFiles(prev => [...prev, ...newFiles])
    
    // Simulate upload and processing
    newFiles.forEach(uploadFile => {
      simulateUpload(uploadFile.id)
    })
  }, [])

  const simulateUpload = async (fileId: string) => {
    const updateFile = (updates: Partial<UploadedFile>) => {
      setFiles(prev => prev.map(f => f.id === fileId ? { ...f, ...updates } : f))
    }

    // Upload phase
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 100))
      updateFile({ progress: i })
    }

    // Processing phase
    updateFile({ status: 'processing', progress: 0 })
    for (let i = 0; i <= 100; i += 20) {
      await new Promise(resolve => setTimeout(resolve, 200))
      updateFile({ progress: i })
    }

    // Analysis phase
    updateFile({ status: 'analyzing', progress: 0 })
    for (let i = 0; i <= 100; i += 25) {
      await new Promise(resolve => setTimeout(resolve, 300))
      updateFile({ progress: i })
    }

    // Complete
    const categories = ['Comic Books', 'Trading Cards', 'Sports Cards', 'Star Wars', 'Vintage Books']
    const randomCategory = categories[Math.floor(Math.random() * categories.length)]
    
    updateFile({ 
      status: 'complete', 
      progress: 100,
      category: randomCategory,
      description: `AI-detected ${randomCategory.toLowerCase()} item with excellent condition and clear details.`
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

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp']
    },
    multiple: true
  })

  return (
    <div className="space-y-6">
      {/* Upload Zone */}
      <Card>
        <div
          {...getRootProps()}
          className={cn(
            "upload-zone p-8 text-center cursor-pointer transition-all",
            isDragActive && "dragover"
          )}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
              <Upload className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">
                {isDragActive ? 'Drop your photos here' : 'Upload Your Collectibles'}
              </h3>
              <p className="text-muted-foreground mb-4">
                Drag & drop photos or click to browse. Supports PNG, JPG, GIF, WebP
              </p>
              <Button variant="outline">
                Choose Files
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Uploaded Files ({files.length})</h3>
            {files.some(f => f.status === 'complete') && (
              <Button>
                Create Listings
              </Button>
            )}
          </div>
          
          <div className="grid gap-4">
            {files.map((file) => (
              <FileCard key={file.id} file={file} onRemove={removeFile} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function FileCard({ file, onRemove }: { file: UploadedFile, onRemove: (id: string) => void }) {
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
      case 'processing': return 'Processing image...'
      case 'analyzing': return 'AI analyzing...'
      case 'complete': return 'Complete!'
      case 'error': return 'Error'
      default: return 'Unknown'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'uploading': return <Upload className="w-4 h-4" />
      case 'processing': return <FileImage className="w-4 h-4" />
      case 'analyzing': return <Eye className="w-4 h-4" />
      case 'complete': return <CheckCircle className="w-4 h-4" />
      default: return <FileImage className="w-4 h-4" />
    }
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          {/* Preview */}
          <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
            <img
              src={file.preview}
              alt={file.file.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4 className="font-medium truncate">{file.file.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {(file.file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onRemove(file.id)}
                className="h-8 w-8"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Status */}
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-2 h-2 rounded-full ${getStatusColor(file.status)}`} />
              <span className="text-sm font-medium">{getStatusText(file.status)}</span>
              {getStatusIcon(file.status)}
            </div>

            {/* Progress */}
            {file.status !== 'complete' && (
              <Progress value={file.progress} className="mb-3" />
            )}

            {/* AI Results */}
            {file.status === 'complete' && file.category && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    {file.category}
                  </Badge>
                </div>
                {file.description && (
                  <p className="text-sm text-muted-foreground">
                    {file.description}
                  </p>
                )}
              </div>
            )}

            {/* Error */}
            {file.status === 'error' && file.error && (
              <p className="text-sm text-red-600">{file.error}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
