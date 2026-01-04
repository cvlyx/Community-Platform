import { auth } from "@/lib/auth"
import { UserRole } from "@prisma/client"
import { redirect } from "next/navigation"

/**
 * Check if the current user is an admin
 * Redirects to home page if not authenticated or not an admin
 */
export async function requireAdmin() {
  const session = await auth()
  
  if (!session || !session.user) {
    redirect("/auth/signin")
  }
  
  if (session.user.role !== UserRole.ADMIN) {
    redirect("/")
  }
  
  return session
}

/**
 * Check if the current user is an admin (without redirect)
 * Returns true if admin, false otherwise
 */
export async function isAdmin() {
  const session = await auth()
  return session?.user?.role === UserRole.ADMIN
}
