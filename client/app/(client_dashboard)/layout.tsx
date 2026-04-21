import Sidebar from "./components/Sidebar";
import ProtectedRoute from "../../components/ProtectedRoute";
import { LanguageToggle } from "../components/LanguageToggle";
import { ThemeToggle } from "../components/ThemeToggle";

export default function ClientDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="h-screen bg-background flex relative">
        <Sidebar />
        <main id="dashboard-main" className="flex-1 overflow-y-auto pt-16 lg:pt-0 print:overflow-visible print:h-auto print:static">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}