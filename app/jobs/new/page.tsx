import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { JobForm } from "@/components/job-form"

export default async function NewJobPage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/auth/signin")
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Post a Job</h1>
        <JobForm />
      </div>
    </div>
  )
}

