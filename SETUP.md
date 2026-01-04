# Setup Guide

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set Up Environment Variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and configure:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `AUTH_SECRET`: Generate with `openssl rand -base64 32`
   - Email settings for authentication

3. **Set Up Database**
   ```bash
   # Generate Prisma Client
   npm run db:generate
   
   # Push schema to database (for development)
   npm run db:push
   
   # Or create migrations (for production)
   npm run db:migrate
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

5. **Open Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Database Setup Options

### Option 1: Local PostgreSQL
1. Install PostgreSQL locally
2. Create a database:
   ```sql
   CREATE DATABASE community_platform;
   ```
3. Update `DATABASE_URL` in `.env`:
   ```
   DATABASE_URL="postgresql://user:password@localhost:5432/community_platform?schema=public"
   ```

### Option 2: Cloud Database (Recommended for Production)
- **Vercel Postgres**: Free tier available
- **Supabase**: Free tier with PostgreSQL
- **Railway**: Easy PostgreSQL setup
- **Neon**: Serverless PostgreSQL

## Email Configuration

For email authentication (magic links), you need to configure SMTP:

### Option 1: Gmail (Development)
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
EMAIL_FROM=noreply@yourdomain.com
```

### Option 2: SendGrid, Mailgun, or other services
Configure according to your provider's SMTP settings.

### Option 3: Development Mode
For local development without email, you can use a service like [Mailtrap](https://mailtrap.io/) or [MailHog](https://github.com/mailhog/MailHog).

## Creating Your First Admin User

After setting up the database, you can create an admin user via Prisma Studio:

```bash
npm run db:studio
```

1. Open Prisma Studio
2. Go to the `User` table
3. Create a new user or edit an existing one
4. Set `role` to `ADMIN`

Alternatively, you can use a database client to run:
```sql
UPDATE "User" SET role = 'ADMIN' WHERE email = 'your-email@example.com';
```

## Next Steps

1. **Customize Branding**: Update colors and text in `app/globals.css` and components
2. **Configure Email**: Set up proper email service for production
3. **Add More Skills**: Customize skill categories in the database
4. **Set Up Monitoring**: Add error tracking (e.g., Sentry)
5. **Deploy**: Follow deployment instructions in README.md

## Troubleshooting

### Prisma Client Not Found
```bash
npm run db:generate
```

### Database Connection Issues
- Check your `DATABASE_URL` is correct
- Ensure PostgreSQL is running
- Verify network/firewall settings for cloud databases

### Authentication Not Working
- Verify `AUTH_SECRET` is set
- Check email configuration
- Ensure NextAuth route is accessible at `/api/auth/[...nextauth]`

### Build Errors
- Run `npm run db:generate` before building
- Check all environment variables are set
- Clear `.next` folder and rebuild

