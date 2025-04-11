export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { AdminPanel } from "@/components/admin/admin-panel"

export default function AdminPage() {
  return (
    <DashboardLayout>
      <div className="container py-6">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Admin Panel</h1>
        <p className="text-muted-foreground mb-6">
          Manage and verify submitted exploit reports
        </p>
        <AdminPanel />
      </div>
    </DashboardLayout>
  )
}
