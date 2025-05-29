# 🏆 Recovered Treasures TX

An AI-powered collectibles management platform designed to streamline the organization, authentication, and presentation of vintage and rare collectibles.

## ✨ Key Features

### 🤖 AI-Powered Tools
- **Smart Categorization** - Automatic item identification and sorting
- **Image Enhancement** - Professional photo cleanup and optimization
- **Description Generation** - Detailed, accurate product descriptions
- **Authentication Assist** - AI-powered authenticity verification
- **Batch Processing** - Handle hundreds of items simultaneously

### 📦 Supported Collections
- **Vintage Books** & Comics
- **Trading Cards** (Pokemon, MTG, Sports)
- **Star Wars Memorabilia**
- **Fast Food Collectibles**
- **Classic Gaming** (Atari, etc.)
- **Coca-Cola Items**
- **Photography Equipment**
- **Stamps & Ephemera**

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm/pnpm
- SQLite (development) or PostgreSQL (production)

### Setup

1. **Clone & Install**
   ```bash
   git clone https://github.com/940smiley/RecoveredTreasuresTX.git
   cd RecoveredTreasuresTX
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env.local
   ```
   See [SETUP.md](SETUP.md) for detailed configuration options.

3. **Database Setup**
   ```bash
   npm run db:generate
   npm run db:push
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```
   Visit [http://localhost:3000](http://localhost:3000)

## 🛠️ Tech Stack

- **Framework**: Next.js 14, React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Database**: Prisma with SQLite/PostgreSQL
- **AI Services**: 
  - OpenAI GPT-4 Vision
  - Google Cloud Vision
  - Cloudinary AI

## 📁 Project Structure

```
app/                # Next.js app router pages
├── api/           # API routes
├── browse/        # Collection browsing
├── management/    # Admin interface
└── upload/        # Item upload system
components/
├── admin/         # Admin components
├── store/         # Store components
├── ui/            # Shared UI components
└── upload/        # Upload components
lib/               # Utilities & config
prisma/            # Database schema
```

## 🎯 Core Features

### Upload & Processing
- Drag-and-drop batch uploads
- AI-powered image enhancement
- Automatic categorization
- Smart description generation

### Collection Management
- Detailed item tracking
- Condition monitoring
- Authentication records
- Inventory insights

### Browse & Search
- Category-based navigation
- Advanced filtering
- Smart search capabilities
- Featured items showcase

## 🔒 Security

- Input validation & sanitization
- Role-based access control
- Rate limiting & DOS protection
- Secure image processing

See [SECURITY.md](SECURITY.md) for details.

## 🚀 Deployment

Detailed deployment instructions available in [DEPLOYMENT.md](DEPLOYMENT.md).

Recommended platforms:
- **Vercel** (Frontend)
- **Railway** (Database)
- **Cloudinary** (Image Storage)

## 🤝 Contributing

Contributions welcome! Please read our contributing guidelines before submitting PRs.

## 📝 License

[MIT License](LICENSE)

---

Built with ❤️ for collectors and enthusiasts
