import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus } from "lucide-react"
import { JobStatus } from "@prisma/client"
import { EmptyState } from "@/components/empty-state"
import { JobsList } from "@/components/jobs-list"
import { PageHeader } from "@/components/page-header"

export default async function JobsPage() {
  const session = await auth()

  const jobs = await prisma.job.findMany({
    where: {
      status: JobStatus.OPEN,
    },
    include: {
      postedBy: {
        select: {
          name: true,
        },
      },
      _count: {
        select: {
          applications: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 50,
  })

  return (
    <div className="container mx-auto px-4 py-12">
      <PageHeader
        title="Available Jobs"
        description="Find work opportunities in your community"
        action={
          session?.user ? (
            <Link href="/jobs/new">
              <Button className="group">
                <Plus className="h-4 w-4 mr-2" />
                Post a Job
              </Button>
            </Link>
          ) : undefined
        }
      />

      {jobs.length === 0 ? (
        <EmptyState
          icon="Briefcase"
          title="No jobs available"
          description="There are no open jobs at the moment. Check back later or post a job to get started."
          action={
            session?.user
              ? {
                  label: "Post a Job",
                  href: "/jobs/new",
                }
              : undefined
          }
        />
      ) : (
        <JobsList jobs={jobs} />
      )}
    </div>
  )
}
