import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { imageUrl, imageData } = await request.json()

    if (!imageUrl && !imageData) {
      return NextResponse.json(
        { error: 'Image URL or data is required' }, 
        { status: 400 }
      )
    }

    // Simulate AI analysis for static deployment
    await new Promise(resolve => setTimeout(resolve, 1000))

    const categories = ['Comic Books', 'Trading Cards', 'Sports Cards', 'Star Wars', 'Vintage Books']
    const subcategories = ['Marvel', 'Pokemon', 'Baseball', 'Original Trilogy', 'Science Fiction']
    
    const analysis = {
      category: categories[Math.floor(Math.random() * categories.length)],
      subcategory: subcategories[Math.floor(Math.random() * subcategories.length)],
      confidence: 0.88 + Math.random() * 0.11,
      description: `This appears to be a collectible item in good condition with clear details visible.`,
      detectedText: ['Copyright', 'Vintage', 'Collectible'],
      condition: 'Very Good',
      rarity: Math.random() > 0.7 ? 'Rare' : 'Common',
      estimatedYear: 1970 + Math.floor(Math.random() * 50),
      features: ['Clear imagery', 'Readable text', 'Good lighting', 'Minimal wear visible']
    }

    return NextResponse.json({
      success: true,
      analysis
    })

  } catch (error) {
    console.error('AI analysis error:', error)
    return NextResponse.json(
      { error: 'Failed to analyze image' }, 
      { status: 500 }
    )
  }
}
