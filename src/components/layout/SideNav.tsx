
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  FileText, 
  BarChart3, 
  Calendar, 
  Users, 
  FileSpreadsheet, 
  Lightbulb,
  FileCheck,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/components/auth/AuthContext";
import { useNavigate } from "react-router-dom";

type NavItem = {
  title: string;
  icon: React.ReactNode;
  href: string;
  roles?: string[];
};

const navItems: NavItem[] = [
  { 
    title: "Dashboard", 
    icon: <LayoutDashboard className="w-5 h-5" />, 
    href: "/", 
    roles: ["researcher", "admin", "reviewer", "institutional_admin"] 
  },
  { 
    title: "My Grants", 
    icon: <FileText className="w-5 h-5" />, 
    href: "/my-grants", 
    roles: ["researcher", "admin"] 
  },
  { 
    title: "Submit Grant", 
    icon: <FileCheck className="w-5 h-5" />, 
    href: "/submit-grant", 
    roles: ["researcher"] 
  },
  { 
    title: "Review Grants", 
    icon: <FileCheck className="w-5 h-5" />, 
    href: "/review-grants", 
    roles: ["reviewer", "admin"] 
  },
  { 
    title: "Reports", 
    icon: <BarChart3 className="w-5 h-5" />, 
    href: "/reports", 
    roles: ["admin", "institutional_admin"] 
  },
  { 
    title: "Calendar", 
    icon: <Calendar className="w-5 h-5" />, 
    href: "/calendar", 
    roles: ["researcher", "admin", "reviewer"] 
  },
  { 
    title: "Team Members", 
    icon: <Users className="w-5 h-5" />, 
    href: "/team", 
    roles: ["researcher", "admin"] 
  },
  { 
    title: "Financial Management", 
    icon: <BarChart3 className="w-5 h-5" />, 
    href: "/finance", 
    roles: ["admin", "institutional_admin"] 
  },
  { 
    title: "IP Management", 
    icon: <Lightbulb className="w-5 h-5" />, 
    href: "/ip-management", 
    roles: ["researcher", "admin"] 
  },
  { 
    title: "Documents", 
    icon: <FileSpreadsheet className="w-5 h-5" />, 
    href: "/documents", 
    roles: ["researcher", "admin", "reviewer", "institutional_admin"] 
  },
  { 
    title: "Settings", 
    icon: <Settings className="w-5 h-5" />, 
    href: "/settings", 
    roles: ["researcher", "admin", "reviewer", "institutional_admin"] 
  }
];

type SideNavProps = {
  userRole?: string;
};

const SideNav = ({ userRole = "researcher" }: SideNavProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  let pathname = "/";
  try {
    const location = useLocation();
    pathname = location.pathname;
  } catch (error) {
    console.warn("Router not available, defaulting to '/' path");
    pathname = "/";
  }
  
  // Use the user role from auth context if available, otherwise use the prop
  const currentRole = user?.role || userRole;
  
  const filteredNavItems = navItems.filter(
    item => !item.roles || item.roles.includes(currentRole)
  );

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const renderLink = (item: NavItem, isActive: boolean, children: React.ReactNode) => {
    try {
      return (
        <Link
          to={item.href}
          className={cn(
            isActive
              ? "bg-sidebar-accent text-sidebar-accent-foreground"
              : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
          )}
        >
          {children}
        </Link>
      );
    } catch (error) {
      return (
        <a
          href={item.href}
          className={cn(
            isActive
              ? "bg-sidebar-accent text-sidebar-accent-foreground"
              : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
          )}
        >
          {children}
        </a>
      );
    }
  };

  // Get the display name for the user role
  const getRoleDisplayName = (role: string): string => {
    switch (role) {
      case "researcher": return "Researcher";
      case "admin": return "Grant Administrator";
      case "reviewer": return "Reviewer";
      case "institutional_admin": return "Institutional Admin";
      default: return "User";
    }
  };

  return (
    <div
      className={cn(
        "h-full transition-all duration-300 border-r bg-sidebar text-sidebar-foreground flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="p-4 flex items-center justify-center mb-4">
        {!collapsed ? (
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/bc38697b-c60f-4125-b646-3f1de5d4f43f.png" 
              alt="Africa University Logo" 
              className="w-10 h-10 mr-3" 
            />
            <div>
              <h2 className="text-lg font-bold text-white">E-Grant</h2>
              <p className="text-xs opacity-70">Africa University</p>
            </div>
          </div>
        ) : (
          <img 
            src="/lovable-uploads/bc38697b-c60f-4125-b646-3f1de5d4f43f.png" 
            alt="Africa University Logo" 
            className="w-10 h-10" 
          />
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        <nav className="space-y-1 px-3">
          {filteredNavItems.map((item) => {
            const isActive = pathname === item.href;
            
            if (collapsed) {
              return (
                <Tooltip key={item.title} delayDuration={0}>
                  <TooltipTrigger asChild>
                    <div className="flex items-center justify-center h-10 w-10 rounded-md my-2 mx-auto">
                      {renderLink(
                        item,
                        isActive,
                        <div className={cn(
                          "flex items-center justify-center h-10 w-10 rounded-md",
                          isActive
                            ? "bg-sidebar-accent text-sidebar-accent-foreground"
                            : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                        )}>
                          {item.icon}
                        </div>
                      )}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="right">{item.title}</TooltipContent>
                </Tooltip>
              );
            }

            return (
              <div key={item.title} className="flex">
                {renderLink(
                  item,
                  isActive,
                  <div className={cn(
                    "flex items-center h-10 px-3 py-2 rounded-md w-full",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                  )}>
                    <span className="mr-3">{item.icon}</span>
                    <span>{item.title}</span>
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      <div className={cn("p-4 border-t border-sidebar-border", collapsed ? "flex justify-center" : "")}>
        {!collapsed ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>{user?.name?.[0]?.toUpperCase() || "AU"}</AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <p className="text-sm font-medium">{user?.name || "Guest User"}</p>
                <p className="text-xs text-sidebar-foreground/70">
                  {user ? getRoleDisplayName(user.role) : "Not logged in"}
                </p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-sidebar-foreground hover:bg-sidebar-accent/50"
              onClick={() => setCollapsed(true)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-3 items-center">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>{user?.name?.[0]?.toUpperCase() || "AU"}</AvatarFallback>
            </Avatar>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-sidebar-foreground hover:bg-sidebar-accent/50"
              onClick={() => setCollapsed(false)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
      
      {!collapsed && (
        <div className="p-3">
          <Button 
            variant="ghost" 
            className="w-full flex items-center justify-start text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 mr-3" />
            <span>Logout</span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default SideNav;
