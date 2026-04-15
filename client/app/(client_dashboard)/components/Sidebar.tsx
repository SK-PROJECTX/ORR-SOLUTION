'use client';

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight, LayoutGrid, Menu, X, LogOut, Loader2, Lock } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { useProfileStore } from "@/store/profileStore";
import { useLanguage } from "../../components/LanguageProvider";
import { LanguageToggle } from "../../components/LanguageToggle";
import { ThemeToggle } from "../../components/ThemeToggle";

type OpenState = {
  home: boolean;
  pages: boolean;
  applications: boolean;
  ecommerce: boolean;
  auth: boolean;
};

export default function Sidebar() {
  const { t, interpolate } = useLanguage();
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
            label={interpolate(t.dashboard.sidebar.groups.home)}
            open={open.home}
            onClick={() => toggle("home")}
            items={[
              { label: interpolate(t.dashboard.sidebar.items.dashboard), href: "/dashboard" },
              { label: interpolate(t.dashboard.sidebar.items.analytics), href: "/analytics" }
            ]}
            pathname={pathname}
            subOpen={subOpen}
            toggleSub={toggleSub}
          />

          <SidebarGroup
            label={interpolate(t.dashboard.sidebar.groups.pages)}
            open={open.pages}
            onClick={() => toggle("pages")}
            items={[
              {
                label: interpolate(t.dashboard.sidebar.items.myProfile),
                href: "/account",
                subItems: [
                  { label: interpolate(t.dashboard.sidebar.items.personalInfo), href: "/account/settings" },
                  { label: interpolate(t.dashboard.sidebar.items.personalization), href: "/account/personalization" },
                  { label: interpolate(t.dashboard.sidebar.items.businessInfo), href: "/account/business-info" },
                  { label: interpolate(t.dashboard.sidebar.items.myWallet), href: "/account/wallet" },
                ]
              },
              {
                label: interpolate(t.dashboard.sidebar.groups.consultations), 
                href: "/consultations",
                subItems: [
                  { label: interpolate(t.dashboard.sidebar.items.bookMeeting), href: "/consultations/book" },
                  { label: interpolate(t.dashboard.sidebar.items.upcomingConsultations), href: "/consultations/upcoming-consultations" },
                  { label: interpolate(t.dashboard.sidebar.items.pastConsultations), href: "/consultations/past-consultations" },
                ]
              },
              { label: interpolate(t.dashboard.sidebar.groups.documentVault), 
                href: "/document",
                subItems: [
                    { label: interpolate(t.dashboard.sidebar.items.reports), href: "/document/reports", locked: true },
                    { label: interpolate(t.dashboard.sidebar.items.uploads), href: '/document/uploads', locked: true },
                    { label: interpolate(t.dashboard.sidebar.items.templates), href: "/document/templates", locked: true, lockTitle: interpolate(t.dashboard.sidebar.lock.premium), lockMessage: interpolate(t.dashboard.sidebar.lock.premiumMsg) },
                    { label: interpolate(t.dashboard.sidebar.items.contracts), href: "/document/contracts", locked: true },
                    { label: interpolate(t.dashboard.sidebar.items.catalogue), href: "/document/catalogue" }
                ]
              },

              { label: interpolate(t.dashboard.sidebar.items.messages), href: '/messages' },

              { label: interpolate(t.dashboard.sidebar.items.updates), href: "/updates" },

              { label: interpolate(t.dashboard.sidebar.groups.support), 
                href: "/support",
                subItems: [
                  { label: interpolate(t.dashboard.sidebar.items.faqs), href: "/faq" },
                  { label: interpolate(t.dashboard.sidebar.items.requestSupport), href: "/support" },
                  { label: interpolate(t.dashboard.sidebar.items.supportHistory), href: "/support-history" }
                ]
              }
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
      
      <div className="mt-auto space-y-4">
        {/* Settings Toggles */}
        <div className="px-2">
          <div className="flex items-center justify-between gap-4 p-3 bg-secondary/20 rounded-xl border border-secondary/30">
            <div className="flex flex-col gap-1.5 w-full">
              <span className="text-[10px] font-bold uppercase tracking-wider opacity-50 px-1">
                Display & Language
              </span>
              <div className="flex items-center justify-between w-full">
                <LanguageToggle />
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>

        {/* User Profile Card */}
        <div className="bg-primary text-background rounded-xl p-3 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground font-bold overflow-hidden border border-background/20 flex-shrink-0">
              {profile?.profile_pic ? (
                <img 
                  src={profile.profile_pic} 
                  alt="Profile" 
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <span className="text-sm">{profile?.first_name?.[0] || interpolate(t.dashboard.sidebar.items.user)[0]}{profile?.last_name?.[0] || ''}</span>
              )}
            </div>
            <div className="leading-tight text-[11px] font-medium overflow-hidden">
              <div className="font-bold truncate max-w-[100px]">{profile?.first_name} {profile?.last_name}</div>
              <div className="text-[9px] opacity-80 truncate max-w-[100px]">{user?.email}</div>
            </div>
          </div>
          <button 
            onClick={logout}
            className="p-2 hover:bg-background/20 rounded-lg transition-colors flex-shrink-0"
            title={interpolate(t.dashboard.sidebar.items.logout)}
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
    </>
  );
}

type NavItem = {
  label: string;
  href: string;
  subItems?: NavItem[];
  locked?: boolean;
  lockTitle?: string;
  lockMessage?: string;
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
  const { t, interpolate } = useLanguage();
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
                        subItem.locked ? (
                          <div
                            key={subItem.href}
                            className="relative group block hover:z-[100]"
                          >
                            <div className={`flex items-center justify-between px-2 py-1 text-xs rounded cursor-not-allowed  ${
                              pathname === subItem.href ? "text-lemon" : "text-foreground opacity-70"
                            }`}>
                              <span className="flex items-center gap-2">
                                {subItem.label}
                                <Lock className="w-3 h-3 text-foreground/50" />
                              </span>
                              
                              {/* High-visibility contrasting tooltip */}
                              <div className="absolute left-4 top-full mt-2 bg-foreground text-background rounded-xl p-3.5 text-xs opacity-0 group-hover:opacity-100 invisible group-hover:visible scale-95 group-hover:scale-100 transition-all duration-200 ease-out z-[100] w-56 shadow-[0_10px_40px_-5px_rgba(0,0,0,0.3)] pointer-events-none origin-top-left">
                                {/* Tooltip Arrow */}
                                <div className="absolute -top-1.5 left-4 w-3 h-3 bg-foreground rotate-45 rounded-sm"></div>
                                
                                <div className="relative z-10">
                                  <p className="font-bold mb-1.5 text-background flex items-center gap-1.5">
                                    <Lock className="w-3 h-3" />
                                    {subItem.lockTitle || interpolate(t.dashboard.sidebar.lock.locked)}
                                  </p>
                                  <p className="opacity-90 leading-relaxed font-medium text-[11px]">{subItem.lockMessage || interpolate(t.dashboard.sidebar.lock.lockedMsg)}</p>
                                </div>
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
