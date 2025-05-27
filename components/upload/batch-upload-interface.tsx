"use client"

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Upload, FolderOpen, Cpu, CheckCircle, AlertCircle, Eye, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BatchUpload {
  id: string
  name: string
  files: File[]
  status: 'pending' | 'processing' | 'completed' | 'error'
  progress: number
  totalFiles: number
  processedFiles: number
  successFiles: number
  failedFiles: number
  categories: Record<string, number>
  startTime?: Date
  endTime?: Date
}

export function BatchUploadInterface() {
  const [batches, setBatches] = useState<BatchUpload[]>([])
  const [isProcessing, setIsProcessing] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newBatch: BatchUpload = {
      id: Math.random().toString(36).substring(2, 15),
      name: `Batch Upload ${new Date().toLocaleTimeString()}`,
      files: acceptedFiles,
      status: 'pending',
      progress: 0,
      totalFiles: acceptedFiles.length,
      processedFiles: 0,
      successFiles: 0,
      failedFiles: 0,
      categories: {},
      startTime: new Date()
    }
    
    setBatches(prev => [newBatch, ...prev])
    startBatchProcessing(newBatch.id)
  }, [])

  const startBatchProcessing = async (batchId: string) => {
    setIsProcessing(true)
    
    const updateBatch = (updates: Partial<BatchUpload>) => {
      setBatches(prev => prev.map(b => b.id === batchId ? { ...b, ...updates } : b))
    }

    updateBatch({ status: 'processing' })

    const batch = batches.find(b => b.id === batchId)
    if (!batch) return

    const categories = ['Comic Books', 'Trading Cards', 'Sports Cards', 'Star Wars', 'Vintage Books', 'Fast Food Toys', 'Coca Cola']
    const categoryCount: Record<string, number> = {}

    // Simulate processing each file
    for (let i = 0; i < batch.totalFiles; i++) {
      await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000))
      
      // Randomly assign success/failure and category
      const isSuccess = Math.random() > 0.1 // 90% success rate
      if (isSuccess) {
        const category = categories[Math.floor(Math.random() * categories.length)]
        categoryCount[category] = (categoryCount[category] || 0) + 1
      }

      updateBatch({
        processedFiles: i + 1,
        successFiles: isSuccess ? (batch.successFiles + 1) : batch.successFiles,
        failedFiles: isSuccess ? batch.failedFiles : (batch.failedFiles + 1),
        progress: ((i + 1) / batch.totalFiles) * 100,
        categories: categoryCount
      })
    }

    updateBatch({ 
      status: 'completed', 
      endTime: new Date(),
      progress: 100
    })
    
    setIsProcessing(false)
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
            "upload-zone p-12 text-center cursor-pointer transition-all",
            isDragActive && "dragover",
            isProcessing && "pointer-events-none opacity-50"
          )}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <FolderOpen className="w-10 h-10 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-3">
                {isDragActive ? 'Drop your collection here' : 'Batch Upload Your Collection'}
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                Upload hundreds of photos at once. Our AI will automatically categorize, enhance, and organize everything for you.
              </p>
              <Button size="lg" disabled={isProcessing}>
                {isProcessing ? 'Processing...' : 'Select Photos'}
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Batch History */}
      {batches.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Upload Batches</h3>
          <div className="space-y-4">
            {batches.map((batch) => (
              <BatchCard key={batch.id} batch={batch} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function BatchCard({ batch }: { batch: BatchUpload }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'border-yellow-200 bg-yellow-50'
      case 'processing': return 'border-blue-200 bg-blue-50'
      case 'completed': return 'border-green-200 bg-green-50'
      case 'error': return 'border-red-200 bg-red-50'
      default: return 'border-gray-200 bg-gray-50'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Upload className="w-5 h-5 text-yellow-600" />
      case 'processing': return <Cpu className="w-5 h-5 text-blue-600 animate-pulse" />
      case 'completed': return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'error': return <AlertCircle className="w-5 h-5 text-red-600" />
      default: return <Upload className="w-5 h-5 text-gray-600" />
    }
  }

  const formatDuration = (start?: Date, end?: Date) => {
    if (!start) return ''
    const endTime = end || new Date()
    const duration = Math.round((endTime.getTime() - start.getTime()) / 1000)
    if (duration < 60) return `${duration}s`
    return `${Math.round(duration / 60)}m ${duration % 60}s`
  }

  return (
    <Card className={cn("transition-all", getStatusColor(batch.status))}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {getStatusIcon(batch.status)}
            <div>
              <CardTitle className="text-lg">{batch.name}</CardTitle>
              <CardDescription>
                {batch.totalFiles} files • Started {batch.startTime?.toLocaleTimeString()}
                {batch.status === 'completed' && batch.endTime && (
                  <> • Completed in {formatDuration(batch.startTime, batch.endTime)}</>
                )}
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {batch.status === 'completed' && (
              <Button variant="outline" size="sm">
                View Results
              </Button>
            )}
            <Badge variant={batch.status === 'completed' ? 'default' : 'secondary'}>
              {batch.status}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        {/* Progress */}
        {batch.status === 'processing' && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Processing files...</span>
              <span className="text-sm text-muted-foreground">
                {batch.processedFiles} / {batch.totalFiles}
              </span>
            </div>
            <Progress value={batch.progress} className="h-2" />
          </div>
        )}

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{batch.totalFiles}</div>
            <div className="text-sm text-muted-foreground">Total Files</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{batch.successFiles}</div>
            <div className="text-sm text-muted-foreground">Processed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{batch.failedFiles}</div>
            <div className="text-sm text-muted-foreground">Failed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {Object.keys(batch.categories).length}
            </div>
            <div className="text-sm text-muted-foreground">Categories</div>
          </div>
        </div>

        {/* Categories */}
        {Object.keys(batch.categories).length > 0 && (
          <div>
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              AI-Detected Categories
            </h4>
            <div className="flex flex-wrap gap-2">
              {Object.entries(batch.categories).map(([category, count]) => (
                <Badge key={category} variant="outline" className="flex items-center gap-1">
                  {category}
                  <span className="text-muted-foreground">({count})</span>
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
