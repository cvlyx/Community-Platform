import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, CheckCircle, Star, Phone, Mail } from "lucide-react"
import { VerificationStatus } from "@prisma/client"
import Link from "next/link"

export default async function ProviderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const provider = await prisma.user.findUnique({
    where: { id },
    include: {
      profile: {
        include: {
          skills: true,
          verifications: {
            orderBy: {
              createdAt: "desc",
            },
            take: 1,
          },
        },
      },
      reviewsReceived: {
        include: {
          reviewer: {
            select: {
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 10,
      },
      _count: {
        select: {
          reviewsReceived: true,
        },
      },
    },
  })

  if (!provider || provider.role !== "SERVICE_PROVIDER" || !provider.profile) {
    notFound()
  }

  const avgRating =
    provider.reviewsReceived.length > 0
      ? provider.reviewsReceived.reduce((sum, r) => sum + r.rating, 0) /
        provider.reviewsReceived.length
      : 0

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                {provider.name || "Anonymous"}
              </h1>
              {provider.profile.verificationStatus && (
                <Badge
                  variant={
                    provider.profile.verificationStatus === VerificationStatus.SYSTEM_VERIFIED
                      ? "default"
                      : provider.profile.verificationStatus === VerificationStatus.COMMUNITY_VERIFIED
                      ? "secondary"
                      : "outline"
                  }
                  className="mb-2"
                >
                  {provider.profile.verificationStatus === VerificationStatus.SYSTEM_VERIFIED && (
                    <CheckCircle className="h-4 w-4 mr-1" />
                  )}
                  {provider.profile.verificationStatus.replace("_", " ")}
                </Badge>
              )}
            </div>
            {avgRating > 0 && (
              <div className="text-right">
                <div className="flex items-center gap-1 text-2xl font-bold">
                  <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                  {avgRating.toFixed(1)}
                </div>
                <p className="text-sm text-muted-foreground">
                  {provider._count.reviewsReceived} review{provider._count.reviewsReceived !== 1 ? "s" : ""}
                </p>
              </div>
            )}
          </div>

          {provider.profile.location && (
            <div className="flex items-center gap-1 text-muted-foreground mb-4">
              <MapPin className="h-4 w-4" />
              {provider.profile.district && provider.profile.city
                ? `${provider.profile.city}, ${provider.profile.district}`
                : provider.profile.location}
            </div>
          )}

          {provider.profile.phoneNumber && (
            <div className="flex items-center gap-2 mb-2">
              <Phone className="h-4 w-4" />
              <a href={`tel:${provider.profile.phoneNumber}`} className="hover:underline">
                {provider.profile.phoneNumber}
              </a>
            </div>
          )}
        </div>

        {provider.profile.bio && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{provider.profile.bio}</p>
            </CardContent>
          </Card>
        )}

        {provider.profile.skills && provider.profile.skills.length > 0 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {provider.profile.skills.map((skill) => (
                  <Badge key={skill.id} variant="secondary">
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {provider.profile.experience && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Experience</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{provider.profile.experience}</p>
            </CardContent>
          </Card>
        )}

        {provider.reviewsReceived.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {provider.reviewsReceived.map((review) => (
                  <div key={review.id} className="border-b last:border-0 pb-4 last:pb-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium">
                          {review.reviewer.name || "Anonymous"}
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-muted-foreground"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    {review.comment && (
                      <p className="text-sm text-muted-foreground mt-2">
                        {review.comment}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="mt-6">
          <Link href="/jobs">
            <Button>Find Jobs for This Provider</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

