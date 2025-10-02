import { NextRequest, NextResponse } from 'next/server';

export interface RateLimitConfig {
  limit: number;
  windowMs: number;
  // Optional identifier function to get a custom key (like IP)
  keyGenerator?: (req: NextRequest) => string;
}

// In-memory store for rate limiting
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Clean up expired entries periodically
const CLEANUP_INTERVAL = 60000; // 1 minute
setInterval(() => {
  const now = Date.now();
  for (const [key, data] of rateLimitStore.entries()) {
    if (data.resetTime <= now) {
      rateLimitStore.delete(key);
    }
  }
}, CLEANUP_INTERVAL);

/**
 * Creates a rate limiting middleware for Next.js API routes
 */
export function createRateLimiter(config: RateLimitConfig) {
  const { limit, windowMs, keyGenerator } = config;

  return async function rateLimit(req: NextRequest) {
    // Generate a key for the rate limit (default to IP)
    const key = keyGenerator 
      ? keyGenerator(req) 
      : (req.headers.get('x-forwarded-for') || 'unknown-ip').split(',')[0].trim();
    
    // Get current timestamp
    const now = Date.now();
    
    // Get or initialize rate limit data for this key
    let rateData = rateLimitStore.get(key);
    
    if (!rateData || rateData.resetTime <= now) {
      // Initialize new rate limit window
      rateData = { 
        count: 0, 
        resetTime: now + windowMs 
      };
    }
    
    // Increment counter
    rateData.count += 1;
    rateLimitStore.set(key, rateData);
    
    // Calculate remaining and reset headers
    const remaining = Math.max(0, limit - rateData.count);
    const reset = Math.ceil((rateData.resetTime - now) / 1000); // in seconds
    
    // Set rate limit headers
    const headers = new Headers();
    headers.set('X-RateLimit-Limit', limit.toString());
    headers.set('X-RateLimit-Remaining', remaining.toString());
    headers.set('X-RateLimit-Reset', reset.toString());
    
    // Check if rate limit exceeded
    if (rateData.count > limit) {
      headers.set('Retry-After', reset.toString());
      
      return NextResponse.json(
        { 
          success: false, 
          message: 'Too many requests. Please try again later.' 
        },
        { 
          status: 429, 
          headers
        }
      );
    }
    
    // Return headers to be applied to successful response
    return headers;
  };
}
