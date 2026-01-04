"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { VerificationStatus } from "@prisma/client"

interface AdminDashboardProps {
  stats: {
    totalUsers: number
    providers: number
    seekers: number
    jobs: number
    applications: number
    pendingVerifications: number
  }
}

export function AdminDashboard({ stats }: AdminDashboardProps) {
  const [pendingVerifications, setPendingVerifications] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const loadPendingVerifications = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/admin/verifications")
      const data = await response.json()
      setPendingVerifications(data.verifications || [])
    } catch (error) {
      console.error("Failed to load verifications:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleVerification = async (
    profileId: string,
    status: VerificationStatus
  ) => {
    try {
      const response = await fetch("/api/admin/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profileId, status }),
      })

      if (response.ok) {
        loadPendingVerifications()
      } else {
        alert("Failed to update verification status")
      }
    } catch (error) {
      alert("An error occurred")
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Pending Verifications</CardTitle>
              <CardDescription>
                Review and verify service provider profiles
              </CardDescription>
            </div>
            <Button onClick={loadPendingVerifications} disabled={loading}>
              {loading ? "Loading..." : "Load Pending"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {pendingVerifications.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              {stats.pendingVerifications === 0
                ? "No pending verifications"
                : "Click 'Load Pending' to see verification requests"}
            </p>
          ) : (
            <div className="space-y-4">
              {pendingVerifications.map((verification: any) => (
                <div
                  key={verification.id}
                  className="border rounded-lg p-4 space-y-3"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">
                        {verification.user.name || "Anonymous"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {verification.bio || "No bio"}
                      </p>
                    </div>
                    <Badge variant="outline">Pending</Badge>
                  </div>
                  {verification.skills && verification.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {verification.skills.map((skill: any) => (
                        <Badge key={skill.id} variant="secondary" className="text-xs">
                          {skill.name}
                        </Badge>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() =>
                        handleVerification(
                          verification.id,
                          VerificationStatus.COMMUNITY_VERIFIED
                        )
                      }
                    >
                      Verify
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        handleVerification(
                          verification.id,
                          VerificationStatus.SYSTEM_VERIFIED
                        )
                      }
                    >
                      System Verify
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

