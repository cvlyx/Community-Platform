import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const data = await request.json()
    const { skills, ...profileData } = data

    // Upsert profile
    const profile = await prisma.profile.upsert({
      where: { userId: session.user.id },
      update: profileData,
      create: {
        userId: session.user.id,
        ...profileData,
      },
    })

    // Update skills
    if (skills && Array.isArray(skills)) {
      // Delete existing skills
      await prisma.skill.deleteMany({
        where: { profileId: profile.id },
      })

      // Create new skills
      await prisma.skill.createMany({
        data: skills.map((skillName: string) => ({
          name: skillName,
          profileId: profile.id,
        })),
      })
    }

    return NextResponse.json({ success: true, profile })
  } catch (error) {
    console.error("Profile update error:", error)
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    )
  }
}

