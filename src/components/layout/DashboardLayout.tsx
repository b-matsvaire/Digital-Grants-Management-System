
import { ReactNode } from "react";
import SideNav from "./SideNav";
import Header from "./Header";
import { useAuth } from "@/components/auth";

type DashboardLayoutProps = {
  children: ReactNode;
  userRole?: string; // This is now optional and only used as a fallback
};

const DashboardLayout = ({ 
  children, 
  userRole = "researcher" 
}: DashboardLayoutProps) => {
  const { user } = useAuth();
  
  // Use the user role from auth context if available
  const currentRole = user?.role || userRole;
  
  return (
    <div className="h-screen flex flex-col md:flex-row overflow-hidden">
      <SideNav userRole={currentRole} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 bg-slate-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
