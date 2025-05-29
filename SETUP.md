# 🚀 Quick Setup Guide

## Option 1: SQLite (Recommended for Testing)

**Easiest way to get started quickly!**

### 1. Update Environment
Create or update your `.env.local`:
```env
DATABASE_URL="file:./dev.db"
```

### 2. Switch to SQLite Schema
```bash
# Backup current PostgreSQL schema
mv prisma/schema.prisma prisma/schema-postgresql.prisma

# Use SQLite schema  
mv prisma/schema-sqlite.prisma prisma/schema.prisma
```

### 3. Setup Database
```bash
npm run db:generate
npm run db:push
```

### 4. Start Development
```bash
npm run dev
```

Visit: http://localhost:3000

---

## Option 2: PostgreSQL (Production Setup)

### 1. Install PostgreSQL
- **Windows**: Download from postgresql.org
- **Mac**: `brew install postgresql`
- **Linux**: `sudo apt install postgresql`

### 2. Create Database
```bash
# Start PostgreSQL service
# Windows: Use pgAdmin or Services
# Mac/Linux: brew services start postgresql

# Create database
createdb Recovered_treasures
```

### 3. Update Environment
Update your `.env.local`:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/Recovered_treasures?schema=public"
```

### 4. Setup Database
```bash
npm run db:generate
npm run db:push
```

---

## 🔧 Complete Environment Variables

Add these to your `.env.local` for full functionality:

```env
# Database (choose one)
DATABASE_URL="file:./dev.db"  # SQLite (recommended for testing)
# DATABASE_URL="postgresql://user:pass@localhost:5432/Recovered_treasures"  # PostgreSQL

# AI Services (add when ready)
# OPENAI_API_KEY="your_openai_api_key_here"
# GOOGLE_VISION_API_KEY="your_google_vision_api_key_here"

# Image Processing (optional)
# CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"
# CLOUDINARY_API_KEY="your_cloudinary_api_key"
# CLOUDINARY_API_SECRET="your_cloudinary_api_secret"

# Next.js
NEXTAUTH_SECRET="your_nextauth_secret_here"
NEXTAUTH_URL="http://localhost:3000"
```

---

## 🛠️ Troubleshooting

### Database Connection Issues
- **Port 3000 error**: PostgreSQL uses port 5432, not 3000
- **Can't connect**: Make sure PostgreSQL service is running
- **Permission denied**: Check username/password in DATABASE_URL

### Next.js Issues
- **Port 3000 busy**: `npx kill-port 3000` or use different port
- **Build errors**: Try `rm -rf .next && npm run dev`

### Dependencies
- **Missing packages**: `rm -rf node_modules && npm install`
- **Version conflicts**: `npm audit fix`

---

## 📁 Project Structure

```
├── app/                    # Next.js 14 app directory
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── store/            # Store-specific components
│   └── upload/           # Upload functionality
├── lib/                  # Utilities and database
├── prisma/               # Database schema
└── public/               # Static assets
```

---

## 🎯 Next Steps

1. **Get the basics running** (SQLite recommended)
2. **Test upload functionality** 
3. **Add AI API keys** for full features
4. **Deploy to production** with PostgreSQL

Need help? Check the main README.md or ask for assistance!
