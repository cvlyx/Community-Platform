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

    const job = await prisma.job.create({
      data: {
        title: data.title,
        description: data.description,
        location: data.location,
        district: data.district,
        city: data.city,
        postedById: session.user.id,
      },
    })

    return NextResponse.json({ success: true, job })
  } catch (error) {
    console.error("Job creation error:", error)
    return NextResponse.json(
      { error: "Failed to create job" },
      { status: 500 }
    )
  }
}

