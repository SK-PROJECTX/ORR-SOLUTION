import Sidebar from "./components/Sidebar";
import ProtectedRoute from "../../components/ProtectedRoute";

export default function ClientDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="h-screen bg-background flex">
        <Sidebar />
        <main className="flex-1 overflow-y-auto pt-16 lg:pt-0">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}