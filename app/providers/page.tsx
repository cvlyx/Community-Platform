import { prisma } from "@/lib/prisma"
import { EmptyState } from "@/components/empty-state"
import { ProvidersList } from "@/components/providers-list"
import { PageHeader } from "@/components/page-header"

export default async function ProvidersPage() {
  const providers = await prisma.user.findMany({
    where: {
      role: "SERVICE_PROVIDER",
      profile: {
        isNot: null,
      },
    },
    include: {
      profile: {
        include: {
          skills: true,
        },
      },
      _count: {
        select: {
          reviewsReceived: true,
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
        title="Service Providers"
        description="Find skilled professionals in your community"
      />

      {providers.length === 0 ? (
        <EmptyState
          icon="Users"
          title="No providers yet"
          description="Service providers will appear here once they create profiles. Be the first to join!"
        />
      ) : (
        <ProvidersList providers={providers as any} />
      )}
    </div>
  )
}
