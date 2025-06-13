# NEW PROJECT ARCHITECTURE RECOMMENDATIONS
*Kiến trúc tối ưu cho crowdfunding platform dựa trên lessons learned từ Giveth*

## 🏗️ SYSTEM ARCHITECTURE OVERVIEW

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   FRONTEND      │    │    BACKEND       │    │   BLOCKCHAIN    │
│                 │    │                  │    │                 │
│ Next.js 14      │◄──►│ NestJS + Prisma  │◄──►│ Ethereum/Polygon│
│ Tailwind CSS    │    │ GraphQL + REST   │    │ Smart Contracts │
│ Zustand         │    │ PostgreSQL       │    │ Web3 Integration│
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   CDN/ASSETS    │    │    CACHING       │    │   MONITORING    │
│                 │    │                  │    │                 │
│ Cloudinary      │    │ Redis + Memory   │    │ Sentry + Logs   │
│ File Storage    │    │ Query Caching    │    │ Performance     │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## 🎯 CORE TECHNOLOGY STACK

### Backend Stack
```yaml
Framework: NestJS
Language: TypeScript
Database: PostgreSQL 15+
Cache: Redis 7+
ORM: Prisma 5+
API: GraphQL (Apollo Server) + REST
Queue: Bull/BullMQ
Validation: Zod + Class-validator
Authentication: JWT + Passport
File Upload: Multer + Cloudinary
Payment: Stripe + Blockchain wallets
```

### Frontend Stack  
```yaml
Framework: Next.js 14 (App Router)
Language: TypeScript
Styling: Tailwind CSS + Shadcn/ui
State Management: Zustand
Forms: React Hook Form + Zod
API Client: Apollo Client (GraphQL) + Axios (REST)
Wallet Integration: Wagmi + Viem
UI Components: Radix UI + Headless UI
Icons: Lucide React
```

### Infrastructure
```yaml
Containerization: Docker + Docker Compose
Database: PostgreSQL (primary) + Redis (cache)
File Storage: Cloudinary / AWS S3
Deployment: Vercel (frontend) + Railway/Render (backend)
Monitoring: Sentry + Uptime Robot
CI/CD: GitHub Actions
```

## 📊 DATABASE SCHEMA DESIGN

### Core Entities
```typescript
// User Management
User {
  id: string (UUID)
  email: string (unique)
  username: string (unique)
  fullName: string
  avatar: string?
  bio: string?
  walletAddress: string? (unique)
  role: UserRole (USER, ADMIN, MODERATOR)
  isVerified: boolean
  createdAt: DateTime
  updatedAt: DateTime
  
  // Relations
  projects: Project[]
  donations: Donation[]
  comments: Comment[]
}

// Project Management
Project {
  id: string (UUID)
  title: string
  description: string
  shortDescription: string
  slug: string (unique)
  coverImage: string
  gallery: string[]
  category: Category
  tags: string[]
  targetAmount: decimal
  raisedAmount: decimal
  status: ProjectStatus (DRAFT, ACTIVE, COMPLETED, CANCELLED)
  endDate: DateTime?
  userId: string (Foreign Key)
  
  // SEO & Discovery
  seoTitle: string?
  seoDescription: string?
  featured: boolean
  trending: boolean
  
  // Timestamps
  createdAt: DateTime
  updatedAt: DateTime
  
  // Relations
  user: User
  donations: Donation[]
  comments: Comment[]
  updates: ProjectUpdate[]
}

// Donation System
Donation {
  id: string (UUID)
  amount: decimal
  currency: string (USD, ETH, etc.)
  projectId: string (Foreign Key)
  userId: string? (Foreign Key - anonymous allowed)
  donorName: string? (for anonymous)
  message: string?
  isAnonymous: boolean
  
  // Payment Details
  paymentMethod: PaymentMethod (STRIPE, CRYPTO)
  paymentId: string (Stripe/Blockchain transaction)
  paymentStatus: PaymentStatus (PENDING, COMPLETED, FAILED)
  
  // Timestamps
  createdAt: DateTime
  updatedAt: DateTime
  
  // Relations
  project: Project
  user: User?
}

// Category System
Category {
  id: string (UUID)
  name: string
  slug: string (unique)
  description: string
  icon: string?
  color: string?
  parentId: string? (Foreign Key - for subcategories)
  
  // Relations
  parent: Category?
  children: Category[]
  projects: Project[]
}
```

### Indexes & Performance
```sql
-- Critical indexes for performance
CREATE INDEX idx_projects_status_featured ON projects (status, featured);
CREATE INDEX idx_projects_category_status ON projects (category_id, status);
CREATE INDEX idx_donations_project_created ON donations (project_id, created_at DESC);
CREATE INDEX idx_users_email ON users (email);
CREATE INDEX idx_projects_slug ON projects (slug);
CREATE INDEX idx_projects_user_status ON projects (user_id, status);

-- Full-text search
CREATE INDEX idx_projects_search ON projects USING gin(to_tsvector('english', title || ' ' || description));
```

## 🔐 AUTHENTICATION & AUTHORIZATION

### Authentication Methods
```typescript
// Multi-provider authentication
interface AuthProvider {
  EMAIL_PASSWORD: 'email/password with verification'
  GOOGLE: 'Google OAuth'
  GITHUB: 'GitHub OAuth'  
  WALLET: 'Ethereum wallet (MetaMask, WalletConnect)'
}

// JWT Payload
interface JWTPayload {
  userId: string
  email: string
  role: UserRole
  walletAddress?: string
  iat: number
  exp: number
}
```

### Authorization Levels
```typescript
enum UserRole {
  USER = 'USER',           // Basic user - create projects, donate
  VERIFIED = 'VERIFIED',   // Verified user - higher limits
  MODERATOR = 'MODERATOR', // Moderate content, suspend users
  ADMIN = 'ADMIN'          // Full system access
}

// Permission matrix
const permissions = {
  USER: ['read', 'create_project', 'donate', 'comment'],
  VERIFIED: ['read', 'create_project', 'donate', 'comment', 'featured_project'],
  MODERATOR: ['read', 'create_project', 'donate', 'comment', 'moderate_content'],
  ADMIN: ['*'] // All permissions
}
```

## 🚀 API DESIGN PATTERNS

### GraphQL Schema
```graphql
type Query {
  # Project queries
  projects(
    filter: ProjectFilter
    sort: ProjectSort
    pagination: PaginationInput
  ): ProjectConnection
  
  project(id: ID, slug: String): Project
  featuredProjects(limit: Int = 6): [Project!]!
  
  # User queries
  me: User
  user(id: ID, username: String): User
  
  # Category queries
  categories: [Category!]!
  category(id: ID, slug: String): Category
}

type Mutation {
  # Authentication
  register(input: RegisterInput!): AuthPayload
  login(input: LoginInput!): AuthPayload
  
  # Project management
  createProject(input: CreateProjectInput!): Project
  updateProject(id: ID!, input: UpdateProjectInput!): Project
  deleteProject(id: ID!): Boolean
  
  # Donations
  createDonation(input: CreateDonationInput!): Donation
  
  # Comments
  createComment(input: CreateCommentInput!): Comment
}

# Optimized for performance
type ProjectConnection {
  edges: [ProjectEdge!]!
  pageInfo: PageInfo!
  totalCount: Int!
}
```

### REST API Endpoints
```typescript
// Core REST endpoints for specific use cases
const restEndpoints = {
  // File uploads
  'POST /api/upload': 'Upload project images',
  'POST /api/upload/avatar': 'Upload user avatar',
  
  // Payment webhooks
  'POST /api/webhooks/stripe': 'Stripe webhook handler',
  'POST /api/webhooks/blockchain': 'Blockchain event handler',
  
  // Public data (SEO, feeds)
  'GET /api/sitemap.xml': 'Dynamic sitemap',
  'GET /api/feed.json': 'JSON feed for projects',
  
  // Health & monitoring
  'GET /api/health': 'Health check endpoint',
  'GET /api/metrics': 'Application metrics'
}
```

## 💰 PAYMENT INTEGRATION

### Stripe Integration
```typescript
// Stripe setup for fiat payments
interface StripeConfig {
  publishableKey: string
  secretKey: string
  webhookSecret: string
  currency: 'USD' | 'EUR' | 'GBP'
}

// Payment flow
class PaymentService {
  async createPaymentIntent(amount: number, projectId: string) {
    return await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency: 'usd',
      metadata: { projectId },
      payment_method_types: ['card']
    })
  }
  
  async handleWebhook(event: Stripe.Event) {
    // Handle payment success/failure
    // Update donation status
    // Notify project owner
  }
}
```

### Blockchain Integration
```typescript
// Modular blockchain integration
interface BlockchainConfig {
  network: 'ethereum' | 'polygon' | 'arbitrum'
  rpcUrl: string
  contractAddress: string
  tokenAddresses: Record<string, string>
}

class BlockchainService {
  async processDonation(
    amount: string,
    token: string,
    projectId: string,
    txHash: string
  ) {
    // Verify transaction
    // Update donation record
    // Handle confirmation
  }
}
```

## 🔍 SEARCH & FILTERING

### Search Implementation
```typescript
// Elasticsearch integration for advanced search
interface SearchConfig {
  index: 'projects'
  mapping: {
    title: { type: 'text', analyzer: 'standard' }
    description: { type: 'text', analyzer: 'standard' }
    category: { type: 'keyword' }
    tags: { type: 'keyword' }
    status: { type: 'keyword' }
    raisedAmount: { type: 'integer' }
    targetAmount: { type: 'integer' }
    createdAt: { type: 'date' }
  }
}

// Fallback: PostgreSQL full-text search
class SearchService {
  async searchProjects(query: string, filters: ProjectFilter) {
    return await prisma.project.findMany({
      where: {
        OR: [
          { title: { search: query } },
          { description: { search: query } }
        ],
        ...filters
      },
      orderBy: { _relevance: { fields: ['title', 'description'], search: query, sort: 'desc' } }
    })
  }
}
```

## 📱 RESPONSIVE DESIGN

### Mobile-First Approach
```typescript
// Tailwind responsive breakpoints
const breakpoints = {
  sm: '640px',   // Small devices
  md: '768px',   // Medium devices
  lg: '1024px',  // Large devices
  xl: '1280px',  // Extra large devices
  '2xl': '1536px' // 2X Extra large devices
}

// Component design patterns
const ResponsiveGrid = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {/* Project cards */}
  </div>
)
```

## 🔄 PERFORMANCE OPTIMIZATION

### Caching Strategy
```typescript
// Multi-layer caching
interface CacheConfig {
  // Redis for session and API responses
  redis: {
    host: string
    port: number
    keyPrefix: string
    ttl: number
  }
  
  // Next.js static generation
  revalidate: {
    projects: 60 * 5,      // 5 minutes
    categories: 60 * 60,   // 1 hour
    user_profiles: 60 * 10 // 10 minutes
  }
}

// Query optimization
class QueryOptimizer {
  async getFeaturedProjects() {
    return await this.cache.get('featured_projects', async () => {
      return await prisma.project.findMany({
        where: { featured: true, status: 'ACTIVE' },
        include: { user: true, _count: { select: { donations: true } } },
        take: 6
      })
    }, 300) // 5 minutes TTL
  }
}
```

### Database Optimization
```sql
-- Materialized views for heavy queries
CREATE MATERIALIZED VIEW project_stats AS
SELECT 
  p.id,
  p.title,
  p.target_amount,
  COALESCE(SUM(d.amount), 0) as raised_amount,
  COUNT(d.id) as donation_count,
  AVG(d.amount) as avg_donation
FROM projects p
LEFT JOIN donations d ON p.id = d.project_id 
WHERE d.payment_status = 'COMPLETED'
GROUP BY p.id, p.title, p.target_amount;

-- Refresh schedule
CREATE OR REPLACE FUNCTION refresh_project_stats()
RETURNS TRIGGER AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY project_stats;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;
```

## 🚀 DEPLOYMENT STRATEGY

### Development Environment
```yaml
# docker-compose.dev.yml
version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: crowdfunding_dev
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

  backend:
    build: 
      context: ./backend
      dockerfile: Dockerfile.dev
    ports:
      - "4000:4000"
    environment:
      DATABASE_URL: postgresql://postgres:password@postgres:5432/crowdfunding_dev
      REDIS_URL: redis://redis:6379
    depends_on:
      - postgres
      - redis
    volumes:
      - ./backend:/app
      - /app/node_modules

volumes:
  postgres_data:
  redis_data:
```

### Production Deployment
```yaml
# Vercel (Frontend)
vercel.json:
{
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ],
  "env": {
    "NEXT_PUBLIC_API_URL": "@api_url",
    "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY": "@stripe_key"
  }
}

# Railway (Backend)
railway.toml:
[build]
buildCommand = "yarn build"
startCommand = "yarn start:prod"

[variables]
DATABASE_URL = "${{ RAILWAY_POSTGRES_URL }}"
REDIS_URL = "${{ RAILWAY_REDIS_URL }}"
```

## 🎯 SUCCESS METRICS

### Key Performance Indicators
```typescript
interface KPIs {
  technical: {
    apiResponseTime: '< 200ms average'
    databaseQueryTime: '< 50ms average'
    frontendLoadTime: '< 2s first contentful paint'
    uptime: '> 99.9%'
    errorRate: '< 0.1%'
  }
  
  business: {
    userRegistrations: 'track monthly growth'
    projectCreations: 'track monthly growth'
    totalDonations: 'track volume and count'
    conversionRate: 'visitors to donors'
    averageDonationAmount: 'track trends'
  }
  
  user_experience: {
    pageLoadSpeed: 'Core Web Vitals compliance'
    mobileUsability: 'Mobile-first design'
    accessibility: 'WCAG 2.1 AA compliance'
    seoPerformance: 'Page speed and rankings'
  }
}
```

## 💡 IMPLEMENTATION PHASES

### Phase 1: Foundation (Weeks 1-2)
- Setup development environment
- Implement authentication system
- Create basic database schema
- Setup CI/CD pipelines

### Phase 2: Core Features (Weeks 3-6)
- Project CRUD operations
- User profiles and management
- Basic payment integration (Stripe)
- Admin dashboard essentials

### Phase 3: Advanced Features (Weeks 7-10)
- Blockchain integration
- Advanced search and filtering
- Notification system
- Analytics dashboard

### Phase 4: Polish & Launch (Weeks 11-12)
- Performance optimization
- Security audit
- Load testing
- Documentation and launch

---

*Kiến trúc này được thiết kế dựa trên lessons learned từ Giveth project, tối ưu cho performance, maintainability, và scalability. Mỗi component đều có thể phát triển độc lập và dễ dàng thay thế khi cần.* 