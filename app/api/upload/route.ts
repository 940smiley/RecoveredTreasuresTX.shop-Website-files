import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  // For static deployment, simulate the upload API
  try {
    const data = await request.formData()
    const files: File[] = data.getAll('files') as File[]

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files uploaded' }, { status: 400 })
    }

    // Simulate processing for static deployment
    const uploadResults = files.map((file, index) => ({
      filename: `${Date.now()}-${file.name}`,
      originalName: file.name,
      size: file.size,
      url: `/uploads/placeholder-${index + 1}.jpg`,
      aiAnalysis: {
        detectedCategory: ['Comic Books', 'Trading Cards', 'Star Wars'][index % 3],
        confidence: 0.85 + Math.random() * 0.14,
        condition: ['Mint', 'Near Mint', 'Excellent'][index % 3],
        description: `AI-detected collectible item with clear details and good condition.`,
        tags: ['collectible', 'vintage', 'authentic'],
        estimatedValue: Math.floor(Math.random() * 200) + 10
      }
    }))

    return NextResponse.json({ 
      success: true, 
      files: uploadResults,
      message: `Successfully processed ${files.length} files (demo mode)`
    })

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload files' }, 
      { status: 500 }
    )
  }
}
