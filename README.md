# Recovered Treasures TX - AI-Powered Collectibles Store

A modern, AI-enhanced e-commerce platform specifically designed for collectibles, featuring automatic categorization, photo enhancement, and intelligent product descriptions.

## 🌟 Features

### Core Store Functionality
- **Modern E-commerce Interface** - Fast, responsive design built with Next.js 14 and Tailwind CSS
- **Category Management** - Pre-configured for specific collectible types
- **Product Listings** - Detailed product pages with condition tracking, pricing, and metadata
- **Inventory Management** - Track quantities, conditions, and authenticity

### AI-Powered Features
- **Smart Product Descriptions** - AI-generated detailed descriptions using computer vision
- **Photo Enhancement** - Automatic cleanup, color correction, and optimization
- **Batch Categorization** - Upload hundreds of photos and let AI sort them automatically
- **OCR Text Recognition** - Extract text from images for better categorization
- **Object Detection** - Identify specific collectible types and conditions
- **Authentication Assistance** - AI-powered authenticity verification

### Supported Categories
- **Vintage Books** - Edgar Rice Burroughs, early Tarzan editions (1910s-1920s)
- **Comic Books** - Rare and vintage comic collections
- **Fast Food Toys** - McDonald's, Burger King promotional items
- **Star Wars Memorabilia** - Theater promos, popcorn buckets, magazines, bobbleheads
- **Trading Cards** - Pokemon, Buddyfight, and other TCGs
- **Collectible Cards** - DBZ, Magic: The Gathering, premium cards
- **Sports Cards** - Baseball, football, basketball (some autographed)
- **Photography Equipment** - Vintage cameras and accessories
- **Stamps** - Worldwide stamp collections
- **Ephemera** - Newspapers, magazines, Hit Parader from the 80s
- **Coca Cola Collectibles** - Village sets, mini fridges, radios, bottles
- **Atari Games** - Classic gaming systems and cartridges

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL database
- OpenAI API key (for AI descriptions)
- Google Vision API key (for OCR and object detection)
- Cloudinary account (for image processing)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/940smiley/recoveredTreasuresTX.git
   cd recoveredTreasuresTX
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your configuration:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/recovered_treasures?schema=public"
   OPENAI_API_KEY="your_openai_api_key_here"
   GOOGLE_VISION_API_KEY="your_google_vision_api_key_here"
   CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"
   CLOUDINARY_API_KEY="your_cloudinary_api_key"
   CLOUDINARY_API_SECRET="your_cloudinary_api_secret"
   NEXTAUTH_SECRET="your_nextauth_secret_here"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Set up the database**
   ```bash
   npm run db:generate
   npm run db:push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Radix UI components
- **Database**: PostgreSQL with Prisma ORM
- **File Upload**: React Dropzone
- **AI Services**: 
  - OpenAI GPT-4 Vision for descriptions
  - Google Vision API for OCR and object detection
- **Image Processing**: Cloudinary
- **Authentication**: NextAuth.js (ready for future implementation)

## 📁 Project Structure

```
├── app/                    # Next.js 14 app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx          # Homepage
│   └── upload/           # Upload pages
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── layout/           # Layout components
│   ├── store/            # Store-specific components
│   └── upload/           # Upload functionality
├── lib/                  # Utility functions
├── prisma/               # Database schema and migrations
│   └── schema.prisma     # Prisma schema
└── public/               # Static assets
```

## 🤖 AI Features

### Automatic Categorization
The system uses computer vision and OCR to automatically categorize uploaded items:
- **Image Analysis**: Identifies objects, colors, text, and visual features
- **Text Recognition**: Extracts readable text for context
- **Pattern Matching**: Compares against known collectible patterns
- **Confidence Scoring**: Provides accuracy ratings for categorizations

### Photo Enhancement
AI-powered image processing includes:
- **Auto-cropping**: Centers the main object
- **Color correction**: Enhances clarity and vibrancy
- **Background cleanup**: Removes distractions
- **Lighting adjustment**: Optimizes exposure and shadows

### Smart Descriptions
Generated descriptions include:
- **Item identification**: What the item is
- **Condition assessment**: Visual condition analysis
- **Historical context**: Relevant background information
- **Market insights**: Rarity and value indicators

## 🔧 Configuration

### Database Setup
The project uses PostgreSQL with Prisma. The schema includes:
- **Products**: Main product information
- **Categories**: Hierarchical category structure
- **Images**: Product photos with AI analysis data
- **Upload Batches**: Batch processing tracking

### AI Service Configuration
- **OpenAI**: Used for generating product descriptions
- **Google Vision**: Handles OCR and object detection
- **Cloudinary**: Manages image storage and transformations

## 🚀 Deployment

### Environment Setup
1. Set up a PostgreSQL database
2. Configure your environment variables
3. Run database migrations
4. Build and deploy the application

### Recommended Platforms
- **Vercel**: Optimal for Next.js applications
- **Railway**: Good for full-stack with database
- **DigitalOcean**: Flexible VPS option

## 📈 Future Enhancements

- **Authentication System**: User accounts and seller management
- **Payment Integration**: Stripe or PayPal integration
- **Advanced Search**: Elasticsearch for complex queries
- **Mobile App**: React Native companion app
- **Marketplace Features**: Multi-seller support
- **Analytics Dashboard**: Sales and inventory insights

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support, please open an issue on GitHub or contact the development team.
