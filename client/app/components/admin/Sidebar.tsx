"use client";

import {
  Home,
  FileText,
  Image,
  BarChart3,
  Settings,
  LucideProps,
  Settings2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { ForwardRefExoticComponent, RefAttributes, useState } from "react";
type ItemType = {
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  label: string;
  active: boolean;
  value: string;
};
const navigationItems: ItemType[] = [
  { icon: Home, label: "Dashboard", active: true, value: "" },
  { icon: FileText, label: "Contents", active: false, value: "content-management" },
  { icon: Image, label: "Payments", active: false, value: "payment-management" },
  { icon: Settings, label: "Project Service", active: false, value: "project-service-management" },
  { icon: BarChart3, label: "SEO and Analytics", active: false, value: "seo-and-analytics" },
  { icon: Settings2, label: "Settings", active: false, value: "settings" },
];

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const router = useRouter();
  function handleNavigation(item: ItemType) {
    setActiveItem(item.label);
    router.push(`/admin/${item.value}`);
  }

  return (
    <div className="w-64 bg-card min-h-screen p-4">
      <div className="flex items-center gap-3 mb-8 text-foreground">
        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
          <div className="w-6 h-6 bg-background rounded-sm"></div>
        </div>
        <div>
          <div className="font-bold text-lg">ORR</div>
          <div className="text-sm text-foreground/70">Solutions</div>
          <div className="text-xs text-foreground/50">
            Listen. Solve. Optimise.
          </div>
        </div>
      </div>

      <nav className="space-y-2 text-white">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.label;

          return (
            <button
              key={item.label}
              onClick={() => handleNavigation(item)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors cursor-pointer ${
                isActive
                  ? "bg-primary text-white"
                  : "text-foreground/70 hover:bg-card hover:text-foreground"
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
