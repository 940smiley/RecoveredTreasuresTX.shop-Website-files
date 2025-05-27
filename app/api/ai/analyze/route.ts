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

    const categoryMap = {
      'Comic Books': ['Marvel', 'DC Comics', 'Independent', 'Golden Age', 'Silver Age'],
      'Trading Cards': ['Pokemon', 'Yu-Gi-Oh', 'Buddyfight', 'Magic: The Gathering'],
      'Sports Cards': ['Baseball', 'Football', 'Basketball', 'Hockey', 'Soccer'],
      'Star Wars': ['Original Trilogy', 'Prequel Trilogy', 'Sequel Trilogy', 'Expanded Universe'],
      'Vintage Books': ['Science Fiction', 'Adventure', 'Pulp Fiction', 'First Editions']
    } as const
    
    const categories = Object.keys(categoryMap) as Array<keyof typeof categoryMap>
    const selectedCategory = categories[Math.floor(Math.random() * categories.length)]
    const subcategories = categoryMap[selectedCategory]
    const selectedSubcategory = subcategories[Math.floor(Math.random() * subcategories.length)]
    
    const analysis = {
      category: selectedCategory,
      subcategory: selectedSubcategory,
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
