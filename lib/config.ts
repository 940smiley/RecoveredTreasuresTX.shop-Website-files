import { z } from 'zod';

// Define a schema for environment variables
const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  
  // Authentication
  ADMIN_PASSWORD: z.string().min(8, "ADMIN_PASSWORD must be at least 8 characters"),
  JWT_SECRET: z.string().min(32, "JWT_SECRET must be at least 32 characters for security"),
  
  // Next.js
  NEXTAUTH_SECRET: z.string().min(1, "NEXTAUTH_SECRET is required"),
  NEXTAUTH_URL: z.string().url("NEXTAUTH_URL must be a valid URL"),
  
  // Optional variables with defaults
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  NEXT_PUBLIC_USE_STATIC_DATA: z.enum(['true', 'false']).optional().default('false'),
});

export type EnvVariables = z.infer<typeof envSchema>;

// Function to validate environment variables
export function validateEnv(): EnvVariables {
  // Extract environment variables
  const env = {
    DATABASE_URL: process.env.DATABASE_URL,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    JWT_SECRET: process.env.JWT_SECRET,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_USE_STATIC_DATA: process.env.NEXT_PUBLIC_USE_STATIC_DATA,
  };

  try {
    // Validate against schema
    const validatedEnv = envSchema.parse(env);
    return validatedEnv;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.issues.map(issue => 
        `${issue.path.join('.')}: ${issue.message}`
      ).join('\n');
      
      console.error(`❌ Invalid environment variables:\n${missingVars}`);
      
      // In production, we should exit the process
      if (process.env.NODE_ENV === 'production') {
        console.error('❌ Environment validation failed. Shutting down.');
        process.exit(1);
      }
    }
    
    throw new Error('Environment validation failed. Check server logs for details.');
  }
}

// Required environment variables
export const env = validateEnv();

// Export specific variables for use in the application
export const isDevelopment = env.NODE_ENV === 'development';
export const isProduction = env.NODE_ENV === 'production';
export const useStaticData = env.NEXT_PUBLIC_USE_STATIC_DATA === 'true' || env.NODE_ENV === 'production';

