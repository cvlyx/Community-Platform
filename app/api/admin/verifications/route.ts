import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { UserRole } from "@prisma/client"

export async function GET() {
  try {
    const session = await auth()

    if (!session?.user || session.user.role !== UserRole.ADMIN) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const profiles = await prisma.profile.findMany({
      where: {
        verificationStatus: "UNVERIFIED",
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        skills: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json({ verifications: profiles })
  } catch (error) {
    console.error("Error fetching verifications:", error)
    return NextResponse.json(
      { error: "Failed to fetch verifications" },
      { status: 500 }
    )
  }
}

