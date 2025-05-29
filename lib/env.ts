// This file is deprecated - use config.ts instead
// Keeping for backward compatibility
import { isDevelopment, isProduction, useStaticData } from './config';

// Export for backward compatibility
export { isDevelopment, isProduction, useStaticData };

// Base path for assets
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

// Helper function for resolving paths (empty implementation for custom domain)
export const getFullPath = (path: string): string => path;

// Add deprecation warning in development
if (process.env.NODE_ENV === 'development') {
  console.warn('lib/env.ts is deprecated. Use lib/config.ts instead.');
}
