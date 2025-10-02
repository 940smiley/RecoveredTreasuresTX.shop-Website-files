import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { authMiddleware } from '@/lib/middleware';
import { useStaticData } from '@/lib/config';

export const dynamic = 'force-static';

export async function GET(request: NextRequest) {
  try {
    // Check authentication using middleware
    const authResponse = await authMiddleware(request);
    if (authResponse) return authResponse;
    
    // If using static data, return mock data
    if (useStaticData) {
      return NextResponse.json({
        totalItems: 2847,
        categories: 12,
        aiProcessed: 89,
        featured: 456
      });
    }
    
    // Real database queries using Prisma
    const totalItems = await prisma.product.count();
    const categories = await prisma.category.count();
    
    // Calculate percentage of products with AI-generated descriptions
    const productsWithAI = await prisma.product.count({
      where: {
        aiGeneratedDesc: {
          not: null
        }
      }
    });
    
    const aiProcessed = totalItems > 0 
      ? Math.round((productsWithAI / totalItems) * 100) 
      : 0;
    
    // Count featured products
    const featured = await prisma.product.count({
      where: {
        featured: true
      }
    });
    
    return NextResponse.json({
      totalItems,
      categories,
      aiProcessed,
      featured
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json(
      { message: 'An error occurred fetching dashboard statistics' },
      { status: 500 }
    );
  }
}
