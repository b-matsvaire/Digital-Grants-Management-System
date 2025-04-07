
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="text-center max-w-md">
        <img 
          src="/lovable-uploads/bc38697b-c60f-4125-b646-3f1de5d4f43f.png" 
          alt="Africa University Logo" 
          className="mx-auto h-16 mb-6" 
        />
        <h1 className="text-5xl font-bold mb-4 au-text-gradient">404</h1>
        <p className="text-xl text-gray-700 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button asChild className="bg-primary hover:bg-primary/90">
          <a href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Dashboard
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
