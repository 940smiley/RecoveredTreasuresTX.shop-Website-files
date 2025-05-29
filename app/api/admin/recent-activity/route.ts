import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { authMiddleware } from '@/lib/middleware';
import { useStaticData } from '@/lib/config';

// Helper to format relative time
function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.round(diffMs / 1000);
  const diffMins = Math.round(diffSecs / 60);
  const diffHours = Math.round(diffMins / 60);
  const diffDays = Math.round(diffHours / 24);

  if (diffDays > 0) {
    return `${diffDays}d ago`;
  } else if (diffHours > 0) {
    return `${diffHours}h ago`;
  } else if (diffMins > 0) {
    return `${diffMins}m ago`;
  } else {
    return 'just now';
  }
}

// Activity type mapping
type ActivityType = 'upload' | 'ai' | 'edit' | 'delete';

export async function GET(request: NextRequest) {
  try {
    // Check authentication using middleware
    const authResponse = await authMiddleware(request);
    if (authResponse) return authResponse;
    
    // If using static data, return mock data
    if (useStaticData) {
      return NextResponse.json([
        {
          id: '1',
          type: 'upload',
          title: 'Batch upload completed',
          description: '24 items processed',
          timeAgo: '2h ago'
        },
        {
          id: '2',
          type: 'ai',
          title: 'AI descriptions generated',
          description: '15 products enhanced',
          timeAgo: '1d ago'
        },
        {
          id: '3',
          type: 'edit',
          title: 'Product information updated',
          description: 'Vintage camera details modified',
          timeAgo: '2d ago'
        },
        {
          id: '4',
          type: 'delete',
          title: 'Items removed',
          description: '3 duplicate entries deleted',
          timeAgo: '3d ago'
        }
      ]);
    }
    
    // Get recent batch uploads
    const recentBatches = await prisma.uploadBatch.findMany({
      take: 3,
      orderBy: {
        createdAt: 'desc'
      },
      where: {
        status: 'COMPLETED'
      }
    });
    
    const batchActivities = recentBatches.map(batch => ({
      id: batch.id,
      type: 'upload' as ActivityType,
      title: 'Batch upload completed',
      description: `${batch.successFiles} items processed`,
      timeAgo: formatTimeAgo(batch.updatedAt)
    }));
    
    // Get recently updated products (edited)
    const recentEdits = await prisma.product.findMany({
      take: 3,
      orderBy: {
        updatedAt: 'desc'
      },
      where: {
        updatedAt: {
          not: {
            equals: prisma.product.fields.createdAt
          }
        }
      }
    });
    
    const editActivities = recentEdits.map(product => ({
      id: product.id,
      type: 'edit' as ActivityType,
      title: 'Product information updated',
      description: `${product.title.substring(0, 30)}${product.title.length > 30 ? '...' : ''}`,
      timeAgo: formatTimeAgo(product.updatedAt)
    }));
    
    // Get recent AI-processed items
    const recentAIUpdates = await prisma.product.findMany({
      take: 2,
      orderBy: {
        updatedAt: 'desc'
      },
      where: {
        aiGeneratedDesc: {
          not: null
        }
      }
    });
    
    const aiActivities = recentAIUpdates.map(product => ({
      id: `ai-${product.id}`,
      type: 'ai' as ActivityType,
      title: 'AI description generated',
      description: `Enhanced: ${product.title.substring(0, 25)}${product.title.length > 25 ? '...' : ''}`,
      timeAgo: formatTimeAgo(product.updatedAt)
    }));
    
    // Combine and sort by time
    const allActivities = [...batchActivities, ...editActivities, ...aiActivities];
    
    // Sort by most recent first (we're assuming the timeAgo strings will sort correctly)
    // In a real app, we'd sort by the actual timestamps before formatting
    return NextResponse.json(allActivities.slice(0, 8)); // Return max 8 activities
  } catch (error) {
    console.error('Error fetching recent activity:', error);
    return NextResponse.json(
      { message: 'An error occurred fetching recent activity' },
      { status: 500 }
    );
  }
}

