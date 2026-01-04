"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { UserRole, VerificationStatus } from "@prisma/client"
import { X } from "lucide-react"

interface ProfileFormProps {
  user: any
}

export function ProfileForm({ user }: ProfileFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [skills, setSkills] = useState<string[]>(
    user?.profile?.skills?.map((s: any) => s.name) || []
  )
  const [newSkill, setNewSkill] = useState("")
  const [formData, setFormData] = useState({
    bio: user?.profile?.bio || "",
    phoneNumber: user?.profile?.phoneNumber || "",
    location: user?.profile?.location || "",
    district: user?.profile?.district || "",
    city: user?.profile?.city || "",
    experience: user?.profile?.experience || "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          skills,
        }),
      })

      if (response.ok) {
        router.refresh()
        alert("Profile updated successfully!")
      } else {
        alert("Failed to update profile. Please try again.")
      }
    } catch (error) {
      alert("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()])
      setNewSkill("")
    }
  }

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill))
  }

  const isProvider = user?.role === UserRole.SERVICE_PROVIDER

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {isProvider && (
        <>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              placeholder="Tell people about yourself and your services..."
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="skills">Skills</Label>
            <div className="flex gap-2">
              <Input
                id="skills"
                placeholder="e.g., Electrical, Plumbing, Tutoring"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    addSkill()
                  }
                }}
              />
              <Button type="button" onClick={addSkill}>
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="text-sm">
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="ml-2 hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="experience">Experience</Label>
            <Textarea
              id="experience"
              placeholder="Describe your experience and past work..."
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              rows={3}
            />
          </div>
        </>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input
            id="phoneNumber"
            type="tel"
            placeholder="+265 XXX XXX XXX"
            value={formData.phoneNumber}
            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            placeholder="Area or neighborhood"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="district">District</Label>
          <Input
            id="district"
            placeholder="e.g., Lilongwe, Blantyre"
            value={formData.district}
            onChange={(e) => setFormData({ ...formData, district: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            placeholder="City name"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          />
        </div>
      </div>

      {isProvider && user?.profile && (
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm font-medium mb-2">Verification Status</p>
          <Badge
            variant={
              user.profile.verificationStatus === VerificationStatus.SYSTEM_VERIFIED
                ? "default"
                : user.profile.verificationStatus === VerificationStatus.COMMUNITY_VERIFIED
                ? "secondary"
                : "outline"
            }
          >
            {user.profile.verificationStatus.replace("_", " ")}
          </Badge>
        </div>
      )}

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Saving..." : "Save Profile"}
      </Button>
    </form>
  )
}

