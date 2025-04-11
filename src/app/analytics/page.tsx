import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { AnalyticsComponent } from "@/components/analytics/analytics-component"

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="container py-6">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Security Analytics</h1>
        <p className="text-muted-foreground mb-6">
          In-depth analysis of security incidents and trends in the Solana ecosystem
        </p>
        <AnalyticsComponent />
      </div>
    </DashboardLayout>
  )
}
