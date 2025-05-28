// Security utilities for the application

export function validateFileType(file: File): boolean {
  const allowedTypes = [
    'image/jpeg',
    'image/jpg', 
    'image/png',
    'image/gif',
    'image/webp'
  ]
  return allowedTypes.includes(file.type)
}

export function validateFileSize(file: File, maxSizeMB: number = 10): boolean {
  const maxSizeBytes = maxSizeMB * 1024 * 1024
  return file.size <= maxSizeBytes
}

export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim()
}

export function validatePassword(password: string): {
  isValid: boolean
  message: string
} {
  if (password.length < 8) {
    return { isValid: false, message: 'Password must be at least 8 characters' }
  }
  
  if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
    return { 
      isValid: false, 
      message: 'Password must contain uppercase, lowercase, and numbers' 
    }
  }
  
  return { isValid: true, message: 'Password is valid' }
}

export function isValidUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url)
    return ['http:', 'https:'].includes(parsedUrl.protocol)
  } catch {
    return false
  }
}

// Rate limiting for client-side
export class RateLimiter {
  private attempts: Map<string, number[]> = new Map()
  
  constructor(private maxAttempts: number = 5, private windowMs: number = 60000) {}
  
  canAttempt(key: string): boolean {
    const now = Date.now()
    const attempts = this.attempts.get(key) || []
    
    // Remove old attempts outside the window
    const validAttempts = attempts.filter(time => now - time < this.windowMs)
    
    if (validAttempts.length >= this.maxAttempts) {
      return false
    }
    
    // Add current attempt
    validAttempts.push(now)
    this.attempts.set(key, validAttempts)
    
    return true
  }
  
  reset(key: string): void {
    this.attempts.delete(key)
  }
}
