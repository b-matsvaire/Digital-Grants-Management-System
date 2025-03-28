
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AuthForm from "@/components/auth/AuthForm";
import { useToast } from "@/hooks/use-toast";
import heroBg from "@/assets/hero-bg.svg";

const HeroSection = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLearnMore = () => {
    navigate("/about");
    toast({
      title: "Welcome",
      description: "Learn more about our grants management system."
    });
  };

  return (
    <section className="pt-32 pb-20 relative overflow-hidden">
      <img 
        src={heroBg} 
        alt="" 
        className="absolute top-0 left-0 right-0 w-full h-full object-cover -z-10" 
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-grant-blue/10 text-grant-blue text-sm font-medium animate-fade-in">
              <span className="h-2 w-2 rounded-full bg-grant-blue"></span>
              Digital Grants Management System
            </div>
            
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
              Simplify Your Research Funding Journey
            </h1>
            
            <p className={`text-lg text-muted-foreground max-w-xl ${mounted ? 'animate-fade-in animate-delay-1' : 'opacity-0'}`}>
              Streamlining grant management, enhancing transparency, and improving efficiency for researchers and administrators.
            </p>
            
            <div className={`flex flex-wrap gap-4 pt-4 ${mounted ? 'animate-fade-in animate-delay-2' : 'opacity-0'}`}>
              <Button size="lg" asChild>
                <Link to="/sign-up">Get Started</Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={handleLearnMore}
              >
                Learn More
              </Button>
            </div>
          </div>
          
          <div className={`lg:w-1/2 ${mounted ? 'animate-fade-in animate-delay-3' : 'opacity-0'}`}>
            <AuthForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
