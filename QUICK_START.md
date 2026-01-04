# Quick Start Guide

## Step 1: Set Up Database (Choose One)

### Easiest: Supabase (5 minutes)

1. Visit [supabase.com](https://supabase.com) → Sign up → New Project
2. Go to **Settings** → **Database**
3. Copy the **Connection string** (URI format)
4. Paste it into your `.env` file as `DATABASE_URL`

### Alternative: Local PostgreSQL

If you have PostgreSQL installed:
```
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/community_platform?schema=public"
```

## Step 2: Push Database Schema

```powershell
# Navigate to project
cd C:\Users\CALYX\Documents\PERSONAL\community-platform

# Push schema (using cmd to bypass PowerShell issues)
cmd /c "npx prisma db push"
```

## Step 3: Set Up Authentication

Add to your `.env` file:
```
AUTH_SECRET="your-secret-key-here"
AUTH_URL="http://localhost:3000"
```

Generate a secret:
```powershell
cmd /c "node -e \"console.log(require('crypto').randomBytes(32).toString('base64'))\""
```

## Step 4: Start Development Server

```powershell
cmd /c "npx next dev"
```

Visit: http://localhost:3000

## Step 5: Create Admin User

After signing up, use Prisma Studio to make yourself admin:

```powershell
cmd /c "npx prisma studio"
```

1. Open http://localhost:5555
2. Go to `User` table
3. Find your user
4. Change `role` to `ADMIN`

## Troubleshooting PowerShell Issues

If you get "scripts are disabled" errors, use:

```powershell
cmd /c "your-command-here"
```

Or open **Command Prompt** (cmd.exe) instead of PowerShell.

