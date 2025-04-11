// Set dynamic = 'force-dynamic' to ensure this page isn't statically generated
export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { AdminPanel } from "@/components/admin/admin-panel";
import { DashboardLayout } from "@/components/layout/dashboard-layout";

export default function AdminPage() {
  return (
    <DashboardLayout>
      <div className="container py-6">
        <AdminPanel />
      </div>
    </DashboardLayout>
  );
}
