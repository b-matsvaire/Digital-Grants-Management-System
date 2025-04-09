
import { ReactNode, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/components/auth";
import { Loader2 } from "lucide-react";
import {
  Alert,
  AlertTitle,
  AlertDescription,
} from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { UserRole } from "@/components/auth/types";

interface AuthGuardProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
}

const AuthGuard = ({ children, allowedRoles }: AuthGuardProps) => {
  const { isAuthenticated, user } = useAuth();
  const [isChecking, setIsChecking] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    // Short timeout to ensure auth state is properly initialized
    const timer = setTimeout(() => {
      setIsChecking(false);
      
      // Check if user has access based on role
      if (isAuthenticated && allowedRoles && user) {
        setHasAccess(allowedRoles.includes(user.role as UserRole));
      } else if (isAuthenticated) {
        // If no specific roles required, any authenticated user has access
        setHasAccess(true);
      }
    }, 800);
    
    return () => clearTimeout(timer);
  }, [isAuthenticated, user, allowedRoles]);
  
  if (isChecking) {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <span className="text-lg">Authenticating...</span>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    // Redirect to login but save the current location to redirect back after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  if (allowedRoles && !hasAccess) {
    // Show access denied message when user doesn't have the required role
    return (
      <div className="h-screen flex flex-col items-center justify-center p-6">
        <Alert variant="destructive" className="max-w-md mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Access Denied</AlertTitle>
          <AlertDescription>
            You do not have permission to access this page. Please contact your administrator if you believe this is an error.
          </AlertDescription>
        </Alert>
        <Navigate to="/" replace />
      </div>
    );
  }
  
  return <>{children}</>;
};

export default AuthGuard;
