
import { ReactNode, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { Loader2 } from "lucide-react";

interface AuthGuardProps {
  children: ReactNode;
  allowedRoles?: string[];
}

const AuthGuard = ({ children, allowedRoles }: AuthGuardProps) => {
  const { isAuthenticated, user } = useAuth();
  const [isChecking, setIsChecking] = useState(true);
  const location = useLocation();
  
  useEffect(() => {
    // Short timeout to ensure auth state is properly initialized
    const timer = setTimeout(() => {
      setIsChecking(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
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
  
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // Redirect to unauthorized or dashboard if user doesn't have the required role
    return <Navigate to="/" />;
  }
  
  return <>{children}</>;
};

export default AuthGuard;
