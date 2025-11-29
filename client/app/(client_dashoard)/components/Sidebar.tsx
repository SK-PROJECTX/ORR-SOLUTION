'use client';

import { useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight, LayoutGrid } from "lucide-react";
import Link from "next/link";

type OpenState = {
  home: boolean;
  pages: boolean;
  applications: boolean;
  ecommerce: boolean;
  auth: boolean;
};

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState<OpenState>({
    home: true,
    pages: true,
    applications: false,
    ecommerce: false,
    auth: false,
  });
  const [subOpen, setSubOpen] = useState<{[key: string]: boolean}>({});

  const toggle = (key: keyof OpenState) => setOpen({ ...open, [key]: !open[key] });
  const toggleSub = (key: string) => setSubOpen({ ...subOpen, [key]: !subOpen[key] });

  return (
    <aside className="w-64 h-screen bg-card text-foreground flex flex-col justify-between p-4 flex-shrink-0 overflow-y-auto">
      <div>
        <div className="flex items-center px-2 mb-8">
          <img src="/images/logo.svg" alt="Logo" className="w-fit h-auto" />
        </div>

        <nav className="space-y-1">
          <SidebarGroup
            label="Home"
            open={open.home}
            onClick={() => toggle("home")}
            items={[
              { label: "Dashboard", href: "/dashboard" },
              { label: "Analytics", href: "/analytics" }
            ]}
            pathname={pathname}
            subOpen={subOpen}
            toggleSub={toggleSub}
          />

          <SidebarGroup
            label="Pages"
            open={open.pages}
            onClick={() => toggle("pages")}
            items={[
              { 
                label: "Profile", 
                href: "/profile",
                subItems: [
                  { label: "Profile Overview", href: "/profile/overview" },
                  { label: "Teams", href: "/profile/teams" },
                  { label: "All Projects", href: "/profile/projects" }
                ]
              },
              { label: "Users", href: "/users" },
              {
                label: "Account",
                href: "/account",
                subItems: [
                  { label: "Settings", href: "/account/settings" },
                  { label: "Billing", href: "/account/billing" },
                  { label: "Invoice", href: "/account/invoice" },
                  { label: "Security", href: "/account/security" }
                ]
              },
              { label: "Projects", href: "/projects" },
              { label: "Pricing Page", href: "/pricing" },
               {
                label: "Pricing Page",
                href: "/pricing",
                subItems: [
                  { label: "Pricing", href: "/pricing" },
                  { label: "Payment Details", href: "/pricing/payment" },
                  { label: "Billing History", href: "/pricing/billing" },
                ]
              },
              { label: "Charts", href: "/charts" },
              { label: "Support History", href: "/support-history" },
              { label: "Meeting Request System", href: "/meeting-request" },
              { label: "Favorite /Saved Items", href: "/favourite" },
              { label: "Pre-meeting Forms & Question", href: "/pre-meeting" },
              { label: "Feedback Mechanisms", href: "/feedback" },
              { label: "Resources", href: "/resources" },
              { label: "Notification", href: "/notification" },
            ]}
            pathname={pathname}
            subOpen={subOpen}
            toggleSub={toggleSub}
          />

          <SidebarGroup
            label="Applications"
            open={open.applications}
            onClick={() => toggle("applications")}
            items={[
              { label: "Kanban", href: "/kanban" },
              { label: "Wizard", href: "/wizard" },
              { label: "Data Tables", href: "/data-tables" },
              { label: "Calendar", href: "/calendar" }
            ]}
            pathname={pathname}
            subOpen={subOpen}
            toggleSub={toggleSub}
          />
        </nav>
      </div>

      <div className="bg-primary text-background rounded-xl p-3 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground font-bold">AC</div>
        <div className="leading-tight text-sm font-medium">
          Anita Cruz
          <div className="text-xs opacity-80">anita@commerce.com</div>
        </div>
      </div>
    </aside>
  );
}

type NavItem = {
  label: string;
  href: string;
  subItems?: NavItem[];
};

function SidebarGroup({ 
  label, 
  open, 
  onClick, 
  items, 
  pathname,
  subOpen,
  toggleSub
}: { 
  label: string; 
  open: boolean; 
  onClick: () => void; 
  items: NavItem[]; 
  pathname: string;
  subOpen: {[key: string]: boolean};
  toggleSub: (key: string) => void;
}) {
  const isActive = items.some(item => pathname === item.href || item.subItems?.some(sub => pathname === sub.href));
  
  return (
    <div>
      <div
        className={`flex items-center justify-between gap-3 px-3 py-2 rounded-lg cursor-pointer text-sm transition ${
          isActive ? "bg-lemon text-black" : "hover:bg-primary hover:bg-opacity-20"
        }`}
        onClick={onClick}
      >
        <div className="flex items-center gap-3">
          <LayoutGrid size={16} />
          {label}
        </div>
        <ChevronDown size={16} className={`${open ? "rotate-180" : ""} transition`} />
      </div>

      {open && items.length > 0 && (
        <div className="ml-6 mt-1 space-y-1">
          {items.map((item) => (
            <div key={item.href}>
              {item.subItems ? (
                <div>
                  <div 
                    onClick={() => toggleSub(item.href)}
                    className={`flex items-center justify-between px-3 py-1 text-sm rounded cursor-pointer hover:bg-primary hover:bg-opacity-10 ${
                      pathname === item.href || item.subItems.some(sub => pathname === sub.href) ? "text-lemon" : "text-foreground"
                    }`}
                  >
                    <span>{item.label}</span>
                    {subOpen[item.href] ? 
                      <ChevronDown size={14} className="transition" /> : 
                      <ChevronRight size={14} className="transition" />
                    }
                  </div>
                  {subOpen[item.href] && (
                    <div className="ml-4 mt-1 space-y-1">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className={`block px-2 py-1 text-xs rounded cursor-pointer hover:bg-primary hover:bg-opacity-10 ${
                            pathname === subItem.href ? "text-lemon" : "text-foreground opacity-70"
                          }`}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link 
                  href={item.href}
                  className={`block px-3 py-1 text-sm rounded cursor-pointer hover:bg-primary hover:bg-opacity-10 ${
                    pathname === item.href ? "text-lemon" : "text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
