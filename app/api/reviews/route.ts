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

    const { revieweeId, rating, comment, jobId } = await request.json()

    if (!revieweeId || !rating || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Valid reviewee ID and rating (1-5) are required" },
        { status: 400 }
      )
    }

    // Check if user is reviewing themselves
    if (revieweeId === session.user.id) {
      return NextResponse.json(
        { error: "You cannot review yourself" },
        { status: 400 }
      )
    }

    const review = await prisma.review.create({
      data: {
        reviewerId: session.user.id,
        revieweeId,
        rating: parseInt(rating),
        comment: comment || null,
        jobId: jobId || null,
      },
    })

    return NextResponse.json({ success: true, review })
  } catch (error) {
    console.error("Review creation error:", error)
    return NextResponse.json(
      { error: "Failed to create review" },
      { status: 500 }
    )
  }
}

