import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { UserRole } from "@prisma/client"

export async function POST(request: Request) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    if (session.user.role !== UserRole.SERVICE_PROVIDER) {
      return NextResponse.json(
        { error: "Only service providers can apply for jobs" },
        { status: 403 }
      )
    }

    const data = await request.json()
    const { jobId, message } = data

    // Check if already applied
    const existing = await prisma.application.findUnique({
      where: {
        jobId_applicantId: {
          jobId,
          applicantId: session.user.id,
        },
      },
    })

    if (existing) {
      return NextResponse.json(
        { error: "You have already applied for this job" },
        { status: 400 }
      )
    }

    const application = await prisma.application.create({
      data: {
        jobId,
        applicantId: session.user.id,
        message,
      },
    })

    return NextResponse.json({ success: true, application })
  } catch (error) {
    console.error("Application error:", error)
    return NextResponse.json(
      { error: "Failed to submit application" },
      { status: 500 }
    )
  }
}

