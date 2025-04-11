import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardStats } from "@/components/dashboard/dashboard-stats";
import { ExploitOverview } from "@/components/dashboard/exploit-overview";
import { LiveTracker } from "@/components/dashboard/live-tracker";
import { ChartSection } from "@/components/dashboard/chart-section";

export default function Home() {
  return (
    <DashboardLayout>
      <div className="container py-4 sm:py-6">
        <DashboardHeader />
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-4 sm:mt-6">
          <DashboardStats />
        </div>
        
        <div className="grid gap-6 sm:gap-8 grid-cols-1 lg:grid-cols-2 mt-6 sm:mt-8">
          <div>
            <ExploitOverview />
          </div>
          <div>
            <LiveTracker />
          </div>
        </div>
        
        <div className="mt-6 sm:mt-8">
          <ChartSection />
        </div>
      </div>
    </DashboardLayout>
  )
}
