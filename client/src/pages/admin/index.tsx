import DashboardLayout from "@/components/layouts/DashboardLayout";
import Dashboard from "@/components/views/Admin/Dashboard";

const AdminPage = () => {
  return (
    <DashboardLayout title="Admin Area" description="Admin Area" type="admin">
      <Dashboard />
    </DashboardLayout>
  );
};

export default AdminPage;
