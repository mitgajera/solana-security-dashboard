import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { SubmitHackForm } from "@/components/submit/submit-hack-form"

export default function SubmitHackPage() {
  return (
    <DashboardLayout>
      <div className="container py-6">
        <h1 className="text-3xl font-bold tracking-tight mb-6">Report a Hack</h1>
        <div className="max-w-2xl mx-auto">
          <SubmitHackForm />
        </div>
      </div>
    </DashboardLayout>
  )
}
