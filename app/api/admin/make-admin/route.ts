import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { UserRole } from "@prisma/client"

/**
 * API endpoint to promote a user to admin
 * This should be used carefully - consider removing or protecting it in production
 */
export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      )
    }

    const { email } = await req.json()
    
    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      )
    }

    // Update user role to ADMIN
    const user = await prisma.user.update({
      where: { email },
      data: { role: UserRole.ADMIN },
      select: {
        id: true,
        email: true,
        role: true,
        name: true,
      },
    })

    return NextResponse.json({
      success: true,
      message: `User ${user.email} is now an admin`,
      user,
    })
  } catch (error: any) {
    console.error("Error making user admin:", error)
    
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }
    
    return NextResponse.json(
      { error: "Failed to update user role" },
      { status: 500 }
    )
  }
}
