'use client';

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight, LayoutGrid, Menu, X, LogOut, Loader2, Lock } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { useProfileStore } from "@/store/profileStore";

type OpenState = {
  home: boolean;
  pages: boolean;
  applications: boolean;
  ecommerce: boolean;
  auth: boolean;
};

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const { profile, fetchProfile } = useProfileStore();
  const [open, setOpen] = useState<OpenState>({
    home: true,
    pages: true,
    applications: false,
    ecommerce: false,
    auth: false,
  });
  const [subOpen, setSubOpen] = useState<{[key: string]: boolean}>({});
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const toggle = (key: keyof OpenState) => setOpen({ ...open, [key]: !open[key] });
  const toggleSub = (key: string) => setSubOpen({ ...subOpen, [key]: !subOpen[key] });

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-card rounded-lg shadow-lg"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40" 
          onClick={() => setIsMobileMenuOpen(false)} 
        />
      )}

      {/* Sidebar */}
      <aside className={`w-64 h-screen bg-card text-foreground flex flex-col justify-between p-4 flex-shrink-0 overflow-y-auto transition-transform duration-300 ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 fixed lg:relative z-50 lg:z-auto`}>
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
              { label: "Home/Dashboard", href: "/dashboard" },
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
              // { 
              //   label: "Profile", 
              //   href: "/profile",
              //   subItems: [
              //     { label: "Profile Overview", href: "/profile/overview" },
              //     { label: "Teams", href: "/profile/teams" },
              //     { label: "All Projects", href: "/profile/projects" }
              //   ]
              // },
              // { label: "Users", href: "/users" },
              {
                label: "My Profile",
                href: "/account",
                subItems: [
                  { label: "Personal Info", href: "/account/settings" },
                  {label: "Personalization", href: "/account/personalization" },
                  { label: "Business Info", href: "/account/business-info" },
                  { label: "My Wallet", href: "/account/wallet" },
                ]
              },
              {
                label: "Consultations", 
                href: "/consultations",
                subItems: [
                  { label: "Book a Meeting", href: "/consultations/book" },
                  { label: "Upcoming Consultations", href: "/consultations/upcoming-consultations" },
                  { label: "Past Consultations", href: "/consultations/past-consultations" },
                ]
              },
              // { label: "Projects"// { label: "Projects"              // { label: "Projects", href: "/projects" },
              //  {
              //   label: "Pricing Page",
              //   href: "/pricing",
              //   subItems: [
              //     { label: "Pricing", href: "/pricing" },
              //     { label: "Payment Details", href: "/pricing/payment" },
              //     { label: "Billing History", href: "/pricing/billing" },
              //   ]
              // },
              // { label: "Charts", href: "/charts" },
              { label: "Document Vault", 
                href: "/document",
                subItems: [
                    { label: " Report & Summaries", href: "/document/reports" },
                    { label: "Uploaded Documents", href: '/document/uploads' },
                    { label: "Generated Reports", href: "/document/reports " },
                    { label: "ORR's Templates", href: "/document/templates" },
                    { label: "Contracts", href: "/document/contracts" },
                    { label: "Service Catalogue", href: "/document/catalogue" }
                ]
              },

              { label: "Messages & Notification", href: '/messages' },

              { label: "Updates & Announcement", href: "/updates" },

              { label: "Support", 
                href: "/support",
                subItems: [
                  { label: "FAQs", href: "/faq" },
                  { label: "Request Support", href: "/support" },
                  { label: "Support History", href: "/support-history" }
                ]
              }

              // { label: "Request Support", href: "/support" },
              // { label: "Support History", href: "/support-history" },
              // { label: "Meeting Request System", href: "/meeting-request" },
              // { label: "Favorite /Saved Items", href: "/favourite" },
              // { label: "Quick Action scheduling", href: "/scheduling" },
              // // { label: "Pre-meeting Forms & Question", href: "/pre-meeting" },
              // { label: "Feedback Mechanisms", href: "/feedback" },
              // { label: "Resources", href: "/resources" },
              // { label: "Frequently Asked Questions", href: "/faq" },
              // { label: "Notifications", href: "/notifications" },
            ]}
            pathname={pathname}
            subOpen={subOpen}
            toggleSub={toggleSub}
          />

          {/* <SidebarGroup
            label="Support"
            open={open.applications}
            onClick={() => toggle("applications")}
            items={[
              { label: "Request Support", href: "/support" },
              { label: "Support History", href: "/support-history" },
              // { label: "Wizard", href: "/wizard" },
              // { label: "Data Tables", href: "/data-tables" },
              // { label: "Calendar", href: "/calendar" }
            ]}
            pathname={pathname}
            subOpen={subOpen}
            toggleSub={toggleSub}
          /> */}
          {/* <SidebarGroup
            label="Applications"
            open={open.applications}
            onClick={() => toggle("applications")}
            items={[
              { label: "Kanban", href: "/kanban" },
              // { label: "Wizard", href: "/wizard" },
              // { label: "Data Tables", href: "/data-tables" },
              // { label: "Calendar", href: "/calendar" }
            ]}
            pathname={pathname}
            subOpen={subOpen}
            toggleSub={toggleSub}
          /> */}
        </nav>
      </div>

      <div className="bg-primary text-background rounded-xl p-3 mt-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-foreground font-bold overflow-hidden">
            {profile?.profile_pic ? (
              <img 
                src={profile.profile_pic} 
                alt="Profile" 
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <span>{user?.first_name?.[0] || 'U'}{user?.last_name?.[0] || ''}</span>
            )}
          </div>
          <div className="leading-tight text-[12px] font-medium">
            {user?.first_name} {user?.last_name}
            <div className="text-[10px] opacity-80 truncate max-w-[120px]">{user?.email}</div>
          </div>
        </div>
        <button 
          onClick={logout}
          className="p-2 hover:bg-background/20 rounded-lg transition-colors"
          title="Logout"
        >
          <LogOut size={16} />
        </button>
      </div>
    </aside>
    </>
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
                        subItem.label === "ORR's Templates" ? (
                          <div
                            key={subItem.href}
                            className="relative"
                          >
                            <div className={`group flex items-center justify-between px-2 py-1 text-xs rounded cursor-not-allowed opacity-60 ${
                              pathname === subItem.href ? "text-lemon" : "text-foreground opacity-70"
                            }`}>
                              <span className="flex items-center gap-2">
                                {subItem.label}
                                <Lock className="w-3 h-3" />
                              </span>
                              <div className="absolute left-0 top-full mt-1 bg-card border border-secondary rounded-lg p-3 text-xs text-foreground opacity-0 group-hover:opacity-100 transition-opacity z-50 w-48 shadow-lg">
                                <p className="font-medium mb-1">Premium Feature</p>
                                <p>Pay €45 upfront to unlock ORR's exclusive templates and resources.</p>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className={`block px-2 py-1 text-xs rounded cursor-pointer hover:bg-primary hover:bg-opacity-10 ${
                              pathname === subItem.href ? "text-lemon" : "text-foreground opacity-70"
                            }`}
                          >
                            {subItem.label}
                          </Link>
                        )
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
