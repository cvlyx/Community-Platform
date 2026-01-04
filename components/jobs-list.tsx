"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { MapPin, Calendar } from "lucide-react"

interface Job {
  id: string
  title: string
  description: string
  location: string | null
  district: string | null
  city: string | null
  status: string
  createdAt: Date
  postedBy: { name: string | null }
  _count: { applications: number }
}

interface JobsListProps {
  jobs: Job[]
}

export function JobsList({ jobs }: JobsListProps) {
  if (jobs.length === 0) {
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
      className="grid gap-6"
    >
      {jobs.map((job) => (
        <motion.div
          key={job.id}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          whileHover={{ y: -2 }}
        >
          <Card className="transition-all hover:shadow-xl border-l-4 border-l-primary hover:border-l-accent bg-gradient-to-r from-card to-primary/5">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="mb-2">
                    <Link
                      href={`/jobs/${job.id}`}
                      className="hover:underline hover:text-primary transition-colors"
                    >
                      {job.title}
                    </Link>
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {job.description}
                  </CardDescription>
                </div>
                <Badge variant="outline">{job.status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
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
                  {new Date(job.createdAt).toLocaleDateString()}
                </div>
                <div>
                  Posted by {job.postedBy.name || "Anonymous"}
                </div>
                <div>
                  {job._count.applications} application{job._count.applications !== 1 ? "s" : ""}
                </div>
              </div>
              <Link href={`/jobs/${job.id}`}>
                <Button variant="outline" size="sm" className="group">
                  View Details
                  <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block">→</span>
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}

