import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { UserRole, VerificationStatus } from "@prisma/client"

export async function POST(request: Request) {
  try {
    const session = await auth()

    if (!session?.user || session.user.role !== UserRole.ADMIN) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { profileId, status } = await request.json()

    if (!profileId || !status) {
      return NextResponse.json(
        { error: "Profile ID and status are required" },
        { status: 400 }
      )
    }

    // Update profile verification status
    const profile = await prisma.profile.update({
      where: { id: profileId },
      data: {
        verificationStatus: status as VerificationStatus,
      },
    })

    // Create verification record
    await prisma.verification.create({
      data: {
        profileId,
        verifiedBy: session.user.id,
        type: status as VerificationStatus,
        verifiedAt: new Date(),
      },
    })

    // Log admin action
    await prisma.adminAction.create({
      data: {
        adminId: session.user.id,
        actionType: "VERIFY_USER",
        targetUserId: profile.userId,
        description: `Verified profile with status: ${status}`,
      },
    })

    return NextResponse.json({ success: true, profile })
  } catch (error) {
    console.error("Verification error:", error)
    return NextResponse.json(
      { error: "Failed to verify profile" },
      { status: 500 }
    )
  }
}

