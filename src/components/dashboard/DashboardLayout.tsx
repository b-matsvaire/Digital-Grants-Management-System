
import { 
  LayoutDashboard, 
  FileText, 
  ScrollText, 
  CreditCard, 
  BookOpen,
  Calendar, 
  Settings, 
  Bell,
  Search,
  User,
  GraduationCap,
  FolderOpen
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const navItems = [
    { 
      icon: <LayoutDashboard className="h-5 w-5" />, 
      label: "Dashboard", 
      href: "/dashboard",
      isActive: false 
    },
    { 
      icon: <FileText className="h-5 w-5" />, 
      label: "My Grants", 
      href: "/dashboard/grants",
      isActive: false 
    },
    { 
      icon: <ScrollText className="h-5 w-5" />, 
      label: "Reports", 
      href: "/dashboard/reports",
      isActive: false 
    },
    { 
      icon: <CreditCard className="h-5 w-5" />, 
      label: "Finances", 
      href: "/dashboard/finances",
      isActive: false 
    },
    { 
      icon: <BookOpen className="h-5 w-5" />, 
      label: "Publications", 
      href: "/dashboard/publications",
      isActive: false 
    },
    { 
      icon: <FolderOpen className="h-5 w-5" />, 
      label: "Documents", 
      href: "/dashboard/documents",
      isActive: false 
    },
    { 
      icon: <GraduationCap className="h-5 w-5" />, 
      label: "Students", 
      href: "/dashboard/students",
      isActive: false 
    },
    { 
      icon: <Calendar className="h-5 w-5" />, 
      label: "Calendar", 
      href: "/dashboard/calendar",
      isActive: false 
    },
  ];

  // Dynamically set active based on current path
  const currentPath = window.location.pathname;
  navItems.forEach(item => {
    item.isActive = currentPath === item.href || 
                   (item.href !== "/dashboard" && currentPath.startsWith(item.href));
  });

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col bg-black text-white">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <img src="/lovable-uploads/771bdf5c-f0d6-4457-9ddc-223bc1ad0fdf.png" alt="Africa University Logo" className="h-10 w-auto" />
            <h3 className="font-semibold text-white">Grants Portal</h3>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                item.isActive 
                  ? "bg-[#DC2626] text-white font-medium" 
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <Link
            to="/dashboard/settings"
            className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-white/70 hover:bg-white/10 hover:text-white transition-colors"
          >
            <Settings className="h-5 w-5" />
            Settings
          </Link>
          <Button
            variant="ghost"
            className="w-full justify-start text-white/70 hover:text-white hover:bg-white/10 mt-2"
            onClick={() => {
              // Sign out logic
              window.location.href = "/";
            }}
          >
            Sign out
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 border-b bg-white flex items-center justify-between px-6 shadow-sm">
          <div className="flex items-center gap-4 w-full max-w-md">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search grants, projects..." 
              className="border-none shadow-none" 
            />
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-[#DC2626] text-white text-[10px] flex items-center justify-center">
                3
              </span>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted">
                    <User className="h-5 w-5" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => window.location.href = "/"}>
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto bg-background p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
