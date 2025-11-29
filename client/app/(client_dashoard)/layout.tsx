import Sidebar from "./components/Sidebar";

export default function ClientDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen bg-background flex">
      <Sidebar />
      <main className="flex-1 overflow-y-auto star">
        {children}
      </main>
    </div>
  );
}