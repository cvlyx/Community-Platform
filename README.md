# Community Services & Skills Exchange Platform

A trust-based platform connecting local service providers with people who need their services, built for communities in Malawi.

## Features

- **User Authentication**: Email-based authentication with NextAuth
- **Service Provider Profiles**: Create profiles with skills, location, and experience
- **Job Posting**: Service seekers can post jobs
- **Job Discovery**: Providers can browse and apply to jobs
- **Trust & Verification**: Three-tier verification system (Unverified, Community Verified, System Verified)
- **Reviews & Ratings**: Rate and review service providers
- **Admin Dashboard**: Manage verifications and maintain platform integrity

## Tech Stack

- **Frontend**: Next.js 16 (App Router), TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: NextAuth.js v5

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and configure:
- `DATABASE_URL`: Your PostgreSQL connection string
- `AUTH_SECRET`: Generate a secret key (e.g., `openssl rand -base64 32`)
- Email configuration for authentication

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
community-platform/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── jobs/              # Job pages
│   ├── providers/         # Provider pages
│   ├── profile/           # User profile
│   └── admin/             # Admin dashboard
├── components/            # React components
│   ├── ui/                # shadcn/ui components
│   └── ...                # Custom components
├── lib/                   # Utilities
│   ├── auth.ts            # NextAuth configuration
│   └── prisma.ts          # Prisma client
├── prisma/                # Database schema
│   └── schema.prisma      # Prisma schema
└── types/                 # TypeScript types
```

## Key Features

### User Roles

- **Service Provider**: Can create profiles, apply to jobs, receive reviews
- **Service Seeker**: Can post jobs, browse providers, leave reviews
- **Admin**: Can verify providers, moderate content, manage platform

### Verification System

1. **Unverified**: New providers start here
2. **Community Verified**: Verified by community leaders or references
3. **System Verified**: Verified by platform administrators

### Data Models

- **User**: Authentication and basic info
- **Profile**: Extended provider information
- **Skill**: Provider skills and categories
- **Job**: Job postings by seekers
- **Application**: Provider applications to jobs
- **Review**: Ratings and feedback
- **Verification**: Trust and verification records
- **AdminAction**: Audit trail for admin actions

## Development

### Database Migrations

```bash
# Create a migration
npx prisma migrate dev --name migration_name

# Apply migrations
npx prisma migrate deploy

# View database in Prisma Studio
npx prisma studio
```

### Adding UI Components

This project uses shadcn/ui. To add components:

```bash
npx shadcn@latest add [component-name]
```

## Production Deployment

1. Set up a PostgreSQL database (e.g., on Vercel Postgres, Supabase, or Railway)
2. Update `DATABASE_URL` in production environment
3. Set `AUTH_SECRET` and `AUTH_URL` for production
4. Configure email service for authentication
5. Build and deploy:

```bash
npm run build
npm start
```

## Principles

This platform is built on:

- **Trust**: Every feature prioritizes trust and transparency
- **Simplicity**: No unnecessary features or overengineering
- **Accessibility**: Mobile-first, low bandwidth friendly
- **Local Relevance**: Designed for Malawian communities
- **Scalability**: API-first architecture ready for future expansion

## License

MIT
