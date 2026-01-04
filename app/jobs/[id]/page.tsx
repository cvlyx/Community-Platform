import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, User } from "lucide-react"
import { ApplicationForm } from "@/components/application-form"
import { JobStatus } from "@prisma/client"

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const session = await auth()

  const job = await prisma.job.findUnique({
    where: { id },
    include: {
      postedBy: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      applications: session?.user
        ? {
            where: {
              applicantId: session.user.id,
            },
          }
        : false,
    },
  })

  if (!job) {
    notFound()
  }

  const hasApplied = job.applications && job.applications.length > 0
  const canApply = session?.user && session.user.role === "SERVICE_PROVIDER" && !hasApplied && job.status === JobStatus.OPEN

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Badge variant="outline" className="mb-4">
            {job.status}
          </Badge>
          <h1 className="text-4xl font-bold mb-4">{job.title}</h1>
          <div className="flex flex-wrap gap-4 text-muted-foreground">
            {job.location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {job.district && job.city
                  ? `${job.city}, ${job.district}`
                  : job.location}
              </div>
            )}
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              Posted {new Date(job.createdAt).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              {job.postedBy.name || "Anonymous"}
            </div>
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap">{job.description}</p>
          </CardContent>
        </Card>

        {canApply && (
          <Card>
            <CardHeader>
              <CardTitle>Apply for this Job</CardTitle>
              <CardDescription>
                Send a message to the job poster
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ApplicationForm jobId={job.id} />
            </CardContent>
          </Card>
        )}

        {hasApplied && (
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground">
                You have already applied for this job.
              </p>
            </CardContent>
          </Card>
        )}

        {!session && (
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground mb-4">
                Sign in as a service provider to apply for this job.
              </p>
              <Button asChild>
                <a href="/auth/signin">Sign In</a>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

