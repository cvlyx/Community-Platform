"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { MapPin, CheckCircle } from "lucide-react"
import { VerificationStatus } from "@prisma/client"

interface Provider {
  id: string
  name: string | null
  profile: {
    bio: string | null
    location: string | null
    district: string | null
    city: string | null
    verificationStatus: VerificationStatus
    skills: Array<{ id: string; name: string }>
  } | null
  _count: { reviewsReceived: number }
}

interface ProvidersListProps {
  providers: Provider[]
}

export function ProvidersList({ providers }: ProvidersListProps) {
  if (providers.length === 0) {
    return null
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.05,
          },
        },
      }}
      className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {providers.map((provider) => (
        <motion.div
          key={provider.id}
          variants={{
            hidden: { opacity: 0, scale: 0.95 },
            visible: { opacity: 1, scale: 1 },
          }}
          whileHover={{ y: -4, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Card className="h-full transition-all hover:shadow-xl bg-gradient-to-br from-card via-card to-accent/5 hover:to-accent/10">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="mb-1">
                    <Link
                      href={`/providers/${provider.id}`}
                      className="hover:underline hover:text-primary transition-colors"
                    >
                      {provider.name || "Anonymous"}
                    </Link>
                  </CardTitle>
                  {provider.profile?.verificationStatus && (
                    <div className="flex items-center gap-2 mt-2">
                      <Badge
                        variant={
                          provider.profile.verificationStatus === VerificationStatus.SYSTEM_VERIFIED
                            ? "default"
                            : provider.profile.verificationStatus === VerificationStatus.COMMUNITY_VERIFIED
                            ? "secondary"
                            : "outline"
                        }
                        className="text-xs"
                      >
                        {provider.profile.verificationStatus === VerificationStatus.SYSTEM_VERIFIED && (
                          <CheckCircle className="h-3 w-3 mr-1" />
                        )}
                        {provider.profile.verificationStatus.replace("_", " ")}
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
              {provider.profile?.bio && (
                <CardDescription className="line-clamp-2 mt-2">
                  {provider.profile.bio}
                </CardDescription>
              )}
            </CardHeader>
            <CardContent>
              {provider.profile?.skills && provider.profile.skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {provider.profile.skills.slice(0, 3).map((skill) => (
                    <Badge key={skill.id} variant="outline" className="text-xs">
                      {skill.name}
                    </Badge>
                  ))}
                  {provider.profile.skills.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{provider.profile.skills.length - 3} more
                    </Badge>
                  )}
                </div>
              )}
              {provider.profile?.location && (
                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                  <MapPin className="h-4 w-4" />
                  {provider.profile.district && provider.profile.city
                    ? `${provider.profile.city}, ${provider.profile.district}`
                    : provider.profile.location}
                </div>
              )}
              {provider._count.reviewsReceived > 0 && (
                <p className="text-sm text-muted-foreground mb-4">
                  {provider._count.reviewsReceived} review{provider._count.reviewsReceived !== 1 ? "s" : ""}
                </p>
              )}
              <Link href={`/providers/${provider.id}`}>
                <Badge
                  variant="secondary"
                  className="cursor-pointer hover:bg-secondary/80 transition-colors"
                >
                  View Profile
                </Badge>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}

