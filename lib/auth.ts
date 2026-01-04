import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import EmailProvider from "next-auth/providers/email"
import { UserRole } from "@prisma/client"

if (!process.env.AUTH_SECRET) {
  throw new Error("AUTH_SECRET is required. Please set it in your .env file.")
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma) as any,
  secret: process.env.AUTH_SECRET,
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER || {
        host: process.env.SMTP_HOST || "localhost",
        port: Number(process.env.SMTP_PORT) || 587,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM || "noreply@community-platform.local",
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async session({ session, user }) {
      if (session.user && user) {
        session.user.id = user.id
        try {
          const dbUser = await prisma.user.findUnique({
            where: { id: user.id },
            select: { role: true }
          })
          session.user.role = dbUser?.role || UserRole.SERVICE_SEEKER
        } catch (error) {
          console.error("Error fetching user role:", error)
          session.user.role = UserRole.SERVICE_SEEKER
        }
      }
      return session
    },
  },
  session: {
    strategy: "database",
  },
  debug: process.env.NODE_ENV === "development",
})
