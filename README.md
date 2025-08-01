# Recroot AI Dashboard

A full-stack Next.js application with authentication, user management, and AI-powered job description generation using Google's Gemini API.

## Features

- 🔐 **Authentication System**: JWT-based authentication with login/register
- 👥 **User Management**: User profiles, roles, and admin functionality
- 🤖 **AI-Powered JD Generation**: Uses Gemini API to create compelling job descriptions
- 💾 **Draft Management**: Save and manage job description drafts
- 🎨 **Modern UI**: Built with Tailwind CSS and shadcn/ui components
- 🌙 **Dark Mode**: Theme switching with system preference detection
- 📱 **Responsive Design**: Mobile-first responsive design
- 🔒 **Protected Routes**: Middleware-based route protection
- 🗄️ **Database**: MongoDB with Mongoose ODM
- 🔐 **Security**: Password hashing, JWT tokens, HTTP-only cookies

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT with bcryptjs
- **AI**: Google Gemini API for job description generation
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB (local or cloud)
- Google Gemini API key
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd recroot-ai-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Copy the example environment file:
   ```bash
   cp env.example .env.local
   ```
   
   Update `.env.local` with your configuration:
   ```env
   # Database
   MONGODB_URI=mongodb://localhost:27017/recroot-ai
   
   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRES_IN=7d
   
   # Server Configuration
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-nextauth-secret-key-change-this-in-production
   
   # AI/ML Services
   GEMINI_API_KEY=your-gemini-api-key-here
   ```

4. **Set up MongoDB**
   
   **Option A: Local MongoDB**
   - Install MongoDB locally
   - Start MongoDB service
   - Use `mongodb://localhost:27017/recroot-ai` as your MONGODB_URI
   
   **Option B: MongoDB Atlas (Cloud)**
   - Create a free MongoDB Atlas account
   - Create a new cluster
   - Get your connection string
   - Use the connection string as your MONGODB_URI

5. **Get Gemini API Key**
   
   - Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Add it to your `.env.local` file as `GEMINI_API_KEY`

6. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

7. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Job Description Generation
- `POST /api/generate-jd` - Generate job description using Gemini AI
- `POST /api/save-draft` - Save job description draft

### User Management (Admin Only)
- `GET /api/users` - Get all users
- `POST /api/users` - Create new user

## How to Use

1. **Register/Login**: Create an account or sign in
2. **Create Job Description**: 
   - Go to `/create` page
   - Fill in job details (title, tech stack, experience level, work mode)
   - Click "Generate JD" to create AI-powered job description
   - Save draft or copy to clipboard
3. **Manage Drafts**: View and manage saved job descriptions

## Project Structure

```
recroot-ai-dashboard/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── generate-jd/   # Job description generation
│   │   ├── save-draft/    # Save drafts
│   │   └── users/         # User management endpoints
│   ├── create/            # Job creation page
│   ├── login/             # Login page
│   ├── register/          # Register page
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── auth-provider.tsx # Authentication context
│   └── ...
├── lib/                  # Utility functions
│   ├── auth.ts           # JWT utilities
│   ├── db.ts             # Database connection
│   ├── gemini.ts         # Gemini API integration
│   ├── models/           # Mongoose models
│   └── middleware.ts     # Next.js middleware
├── public/               # Static assets
└── ...
```

## Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `MONGODB_URI` | MongoDB connection string | Yes | - |
| `JWT_SECRET` | Secret key for JWT tokens | Yes | - |
| `JWT_EXPIRES_IN` | JWT token expiration | No | `7d` |
| `NEXTAUTH_URL` | Application URL | No | `http://localhost:3000` |
| `NEXTAUTH_SECRET` | NextAuth secret | No | - |
| `GEMINI_API_KEY` | Google Gemini API key | Yes | - |

## Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Connect your GitHub repository to Vercel
   - Add environment variables in Vercel dashboard
   - Deploy automatically on push

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Development

### Adding New API Routes

1. Create a new file in `app/api/`
2. Export HTTP methods (GET, POST, PUT, DELETE)
3. Use the authentication middleware for protected routes

Example:
```typescript
// app/api/example/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const user = getCurrentUser(request);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  return NextResponse.json({ message: 'Hello World' });
}
```

### Adding New Models

1. Create a new file in `lib/models/`
2. Define the Mongoose schema
3. Export the model

Example:
```typescript
// lib/models/Example.ts
import mongoose from 'mongoose';

const exampleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
}, {
  timestamps: true,
});

export default mongoose.models.Example || mongoose.model('Example', exampleSchema);
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email support@recroot-ai.com or create an issue in the repository. 