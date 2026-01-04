"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { UserRole } from "@/types/user"
import { User, LogOut, Home, Briefcase, Users, Shield } from "lucide-react"

export function Nav() {
  const { data: session } = useSession()

  return (
    <nav className="sticky top-0 z-50 glass-nav">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 font-semibold transition-opacity hover:opacity-80">
              <Home className="h-5 w-5" />
              <span className="hidden sm:inline">Community Platform</span>
            </Link>
            
            {session && (
              <div className="hidden md:flex items-center gap-4">
                <Link href="/jobs">
                  <Button variant="ghost" size="sm">
                    <Briefcase className="h-4 w-4 mr-2" />
                    Jobs
                  </Button>
                </Link>
                <Link href="/providers">
                  <Button variant="ghost" size="sm">
                    <Users className="h-4 w-4 mr-2" />
                    Providers
                  </Button>
                </Link>
                {session.user.role === UserRole.ADMIN && (
                  <Link href="/admin">
                    <Button variant="ghost" size="sm">
                      <Shield className="h-4 w-4 mr-2" />
                      Admin
                    </Button>
                  </Link>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            {session ? (
              <>
                <Link href="/profile">
                  <Button variant="ghost" size="sm">
                    <User className="h-4 w-4 mr-2" />
                    {session.user.name || "Profile"}
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => signOut()}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth/signin">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button size="sm">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

