import { ThemeProvider } from "../components/ThemeProvider";
import Sidebar from "../components/admin/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </div>
    </div>
  );
}
