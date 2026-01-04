import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UserRole } from "@prisma/client"
import { AdminDashboard } from "@/components/admin-dashboard"

export default async function AdminPage() {
  const session = await auth()

  if (!session?.user || session.user.role !== UserRole.ADMIN) {
    redirect("/")
  }

  const stats = {
    totalUsers: await prisma.user.count(),
    providers: await prisma.user.count({
      where: { role: UserRole.SERVICE_PROVIDER },
    }),
    seekers: await prisma.user.count({
      where: { role: UserRole.SERVICE_SEEKER },
    }),
    jobs: await prisma.job.count(),
    applications: await prisma.application.count(),
    pendingVerifications: await prisma.profile.count({
      where: {
        verificationStatus: "UNVERIFIED",
      },
    }),
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Manage the platform and maintain trust
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.totalUsers}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Service Providers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.providers}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Jobs Posted</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.jobs}</p>
          </CardContent>
        </Card>
      </div>

      <AdminDashboard stats={stats} />
    </div>
  )
}

