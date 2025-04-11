import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardStats } from "@/components/dashboard/dashboard-stats";
import { ExploitOverview } from "@/components/dashboard/exploit-overview";
import { LiveTracker } from "@/components/dashboard/live-tracker";
import { ChartSection } from "@/components/dashboard/chart-section";

export default function Home() {
  return (
    <DashboardLayout>
      <div className="container py-6">
        <DashboardHeader />
        <div className="grid gap-6 md:grid-cols-4 lg:grid-cols-4 mt-6">
          <DashboardStats />
        </div>
        
        {/* Fix: Add proper margin and adjust grid layout to prevent overlap */}
        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2 mt-8">
          <div>
            <ExploitOverview />
          </div>
          <div>
            <LiveTracker />
          </div>
        </div>
        
        <div className="mt-8">
          <ChartSection />
        </div>
      </div>
    </DashboardLayout>
  )
}
