# ClearContracts - AI-Powered Contract Analysis Platform

ClearContracts is a production-ready contract analysis platform that uses AI to break down complex legal documents into clear, actionable insights. Built with React, TypeScript, Supabase, and modern web technologies.

## ✨ Features

### Core Functionality
- **Smart Contract Analysis**: AI-powered analysis with client summaries, lawyer summaries, and risk scoring
- **Multi-format Support**: Upload PDF, DOCX, TXT files or paste text directly
- **Risk Assessment**: Comprehensive risk scoring (0-100) with flagged clauses and explanations
- **Document Management**: Version control and side-by-side comparison views
- **Secure Storage**: Encrypted file storage with user-based access control

### User Management & Billing
- **Authentication**: Email/password authentication with verification
- **Subscription Plans**: Free (3 uploads/month), Pro (unlimited), Business (team features)
- **Stripe Integration**: Ready for payment processing and subscription management
- **Usage Tracking**: Monitor uploads and feature usage

### Professional Features
- **Lawyer Marketplace**: Connect users with qualified legal professionals
- **Admin Dashboard**: User management, analytics, and system oversight
- **Security & Compliance**: Row-level security, encrypted storage, rate limiting
- **Mobile Responsive**: Optimized for all device sizes

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Supabase account
- (Optional) Stripe account for payments
- (Optional) OpenAI/Anthropic API key for production LLM

### Environment Setup

1. **Clone and Install**
   ```bash
   git clone <your-repo>
   cd clearcontracts
   npm install
   ```

2. **Set up Supabase**
   - Create a new Supabase project
   - Run the database migration in `supabase/migrations/create_clearcontracts_schema.sql`
   - Create a storage bucket named `documents` with public access disabled
   - Enable Row Level Security on all tables

3. **Environment Variables**
   Copy `.env.example` to `.env` and fill in your values:
   ```env
   # Supabase Configuration
   VITE_SUPABASE_URL=your-supabase-url
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

   # LLM Configuration (Optional - uses mock by default)
   LLM_PROVIDER=openai
   LLM_API_KEY=your-llm-api-key

   # Stripe Configuration (Optional)
   VITE_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
   STRIPE_SECRET_KEY=your-stripe-secret-key
   ```

4. **Start Development**
   ```bash
   npm run dev
   ```

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── auth/            # Authentication components
│   └── ui/              # Base UI components (Button, Input, Card)
├── hooks/               # Custom React hooks
├── lib/                 # External service integrations
├── pages/               # Route components
├── types/               # TypeScript type definitions
└── App.tsx             # Main application component

supabase/
├── functions/           # Edge functions for server-side logic
└── migrations/          # Database schema migrations
```

## 🗄️ Database Schema

### Key Tables
- **user_profiles**: User information and subscription data
- **documents**: Document metadata and file references
- **document_analyses**: AI analysis results and risk assessments
- **lawyers**: Legal professional directory
- **referrals**: Lawyer connection tracking
- **usage_logs**: Activity and analytics tracking

### Security
- Row Level Security (RLS) enabled on all tables
- User-based access control
- Encrypted file storage
- API key protection for sensitive operations

## 🤖 LLM Integration

The platform supports multiple LLM providers through environment configuration:

### Supported Providers
- **OpenAI GPT**: Set `LLM_PROVIDER=openai`
- **Anthropic Claude**: Set `LLM_PROVIDER=anthropic` 
- **Google Gemini**: Set `LLM_PROVIDER=gemini`
- **Mock Provider**: Default for development/testing

### Analysis Pipeline
1. Document upload and text extraction
2. Content preprocessing and chunking
3. LLM analysis with structured prompts
4. Risk scoring and clause identification
5. Summary generation and storage

### Edge Function Integration
Located in `supabase/functions/analyze-document/index.ts`, this serverless function:
- Processes document content
- Calls the configured LLM provider
- Stores analysis results in the database
- Handles error cases and retries

## 💳 Billing & Subscriptions

### Stripe Integration
The platform is ready for Stripe integration with:
- Subscription plan management
- Usage-based billing
- Webhook handling for subscription updates
- Customer portal integration

### Plan Tiers
- **Free**: 3 uploads/month, basic analysis
- **Pro**: Unlimited uploads, detailed analysis, comparisons
- **Business**: Team features, admin dashboard, priority support

## 👥 Lawyer Marketplace

### Features
- Professional directory with specialties and ratings
- Issue-based matching algorithm
- Contact facilitation and referral tracking
- Commission tracking for future monetization

### Integration Points
- User issue description collection
- Automated lawyer matching based on specialties
- Email notification system
- Referral status tracking

## 🔒 Security Features

### Data Protection
- Encrypted file storage with Supabase Storage
- Row Level Security on all database tables
- API key protection and rate limiting
- User session management

### Compliance Ready
- GDPR-compliant data handling
- Audit logging for all user actions
- Secure file deletion and cleanup
- Privacy-first architecture

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy the `dist` folder to your hosting provider
```

### Backend (Supabase Edge Functions)
Edge functions are automatically deployed to Supabase. No manual deployment needed.

### Environment Variables for Production
Ensure all production environment variables are configured:
- Supabase credentials
- LLM API keys
- Stripe keys (if using billing)
- Application URLs

## 🧪 Testing

### Test Coverage
- Authentication flow testing
- File upload validation
- Analysis result processing
- Subscription plan enforcement
- Security policy verification

### Running Tests
```bash
npm run test
```

## 📚 API Documentation

### Edge Functions
- `POST /functions/v1/analyze-document`: Process and analyze uploaded documents
- Request format: `{ document_id: string, content: string }`
- Response: Analysis results with summaries and risk data

### Database Access
All database operations use Supabase client with automatic RLS enforcement.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Implement your changes with proper TypeScript types
4. Add tests for new functionality
5. Submit a pull request

## 📄 Legal Disclaimers

**Important**: This platform provides AI-powered analysis for informational purposes only. It does not constitute legal advice. Users should always consult qualified legal professionals for important contract matters.

## 📞 Support

For technical support or questions:
- Check the documentation
- Review common issues in the GitHub issues
- Contact support team

## 📝 License

This project is licensed under the MIT License. See LICENSE file for details.

---

**Built with ❤️ using React, TypeScript, Supabase, and modern web technologies.**