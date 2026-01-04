# Database Setup Guide

## Quick Setup Options

### Option 1: Supabase (Recommended - Free & Easy)

1. Go to [supabase.com](https://supabase.com) and sign up
2. Create a new project
3. Go to Project Settings → Database
4. Copy the "Connection string" (URI format)
5. Update your `.env` file:
   ```
   DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
   ```
   Replace `[YOUR-PASSWORD]` and `[PROJECT-REF]` with your actual values

### Option 2: Neon (Serverless PostgreSQL - Free Tier)

1. Go to [neon.tech](https://neon.tech) and sign up
2. Create a new project
3. Copy the connection string
4. Update your `.env` file with the connection string

### Option 3: Local PostgreSQL

1. **Install PostgreSQL:**
   - Download from [postgresql.org/download/windows](https://www.postgresql.org/download/windows/)
   - Or use [Postgres.app](https://postgresapp.com/) for Mac
   - Or use Docker: `docker run --name postgres -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres`

2. **Create Database:**
   ```sql
   CREATE DATABASE community_platform;
   ```

3. **Update `.env`:**
   ```
   DATABASE_URL="postgresql://postgres:password@localhost:5432/community_platform?schema=public"
   ```

## After Setting Up Database

Once you have a valid `DATABASE_URL` in your `.env` file, run:

```powershell
# Using cmd to bypass PowerShell execution policy
cmd /c "npx prisma db push"
```

This will create all the tables in your database.

## Verify Connection

You can test your connection with:

```powershell
cmd /c "npx prisma studio"
```

This opens a visual database browser at http://localhost:5555

## Troubleshooting

### "Can't reach database server"
- Check your `DATABASE_URL` is correct
- For cloud databases: Check firewall/network settings
- For local: Ensure PostgreSQL is running

### "Authentication failed"
- Verify username and password in `DATABASE_URL`
- For Supabase: Use the password from project settings, not your account password

### PowerShell Execution Policy Issues
- Use `cmd /c` prefix: `cmd /c "npx prisma db push"`
- Or use Git Bash if installed
- Or run commands from Command Prompt (cmd.exe) directly

