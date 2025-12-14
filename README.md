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

### Installation & Setup (auto-detected)
- **Install**: `npm install` (Node 18+)
- **Environment**: copy `.env.example` to `.env.local` and fill secrets; set `NEXT_PUBLIC_USE_STATIC_DATA=true` for static/demo builds.
- **Database**: run `npm run db:generate` and `npm run db:push` when not in static mode.
- **Static export**: `NEXT_PUBLIC_USE_STATIC_DATA=true npm run build && npx next export` (outputs to `out/`).

## 🛠️ Tech Stack

- **Framework**: Next.js 14, React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Database**: Prisma with SQLite/PostgreSQL
- **AI Services**:
  - OpenAI GPT-4 Vision
  - Google Cloud Vision
  - Cloudinary AI

## 🧭 Auto-Generated Dependency Map

| Area | Dependency | Version | Notes |
| --- | --- | --- | --- |
| Core framework | Next.js | 15.4.7 | App Router with static export support via `NEXT_PUBLIC_USE_STATIC_DATA`. |
| UI runtime | React / React DOM | 18.x | Concurrent-ready; paired with Radix UI and Ant Design. |
| ORM | Prisma | 5.7.1 | SQLite/PostgreSQL support with mock-friendly static mode. |
| Styling | Tailwind CSS | 3.3.x | Uses `tailwindcss-animate` and shadcn/ui patterns. |
| UI kits | Radix UI, Ant Design, Lucide | latest pinned | For dialogs, dropdowns, and admin visuals. |

## 🧱 Component & Feature Summary

- **App routes** (`app/`): API endpoints, browse views, upload, and admin management flows.
- **UI components** (`components/ui/`): shared primitives, dialog/toast/select elements.
- **Admin components** (`components/admin/`): dashboard widgets, management tools, and auth gates.
- **Upload pipeline** (`components/upload/`, `app/upload/`): drag-and-drop intake with AI hooks.
- **Utilities** (`lib/`): env validation, Prisma client wiring, and static-data toggles.

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
- Additional playbooks: [Firebase Hosting](docs/FirebaseHosting.md) and [Google Vertex AI + Google Sites](docs/GoogleCloudIntegrations.md).

### GitHub Pages Demo
- Static preview lives in [`docs/index.html`](docs/index.html) for zero-backend demos.
- Actions workflow (`.github/workflows/deploy.yml`) builds with `NEXT_PUBLIC_USE_STATIC_DATA=true` and publishes to Pages.
- Custom domain: `recoveredtreasurestx.shop` (also used by the `CNAME` file).

## 🤝 Contributing

Contributions welcome! Please read our contributing guidelines before submitting PRs.

### Contribution Guidelines
1. Create a feature branch (`git checkout -b feature/my-change`).
2. Keep `NEXT_PUBLIC_USE_STATIC_DATA=true` for docs-only or demo PRs; disable for feature work that touches data.
3. Run `npm run lint` before opening a PR; include screenshots for UI changes when possible.
4. Describe deployment implications (Pages, Firebase, or Vercel) in your PR summary.

## 📝 License

[MIT License](LICENSE)

---

Built with ❤️ for collectors and enthusiasts

Last enhanced by Codex — 2025-05-09 00:00 UTC
