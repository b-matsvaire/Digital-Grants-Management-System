
import { useState } from "react";
import { Calendar, Clock, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";

const WelcomeBanner = () => {
  const [visible, setVisible] = useState(true);
  
  if (!visible) return null;
  
  const now = new Date();
  const nextDeadline = new Date(now.getFullYear(), now.getMonth() + 1, 15);
  const timeToDeadline = formatDistanceToNow(nextDeadline, { addSuffix: true });

  return (
    <div className="relative bg-gradient-to-r from-secondary to-primary rounded-lg p-6 text-white mb-6 overflow-hidden">
      <div className="absolute right-2 top-2">
        <Button 
          variant="ghost" 
          size="icon"
          className="text-white/70 hover:text-white hover:bg-white/10"
          onClick={() => setVisible(false)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between">
        <div>
          <h2 className="text-xl md:text-2xl font-bold mb-2">Welcome back, Dr. Smith!</h2>
          <p className="text-white/80 max-w-xl">
            Track your grant applications, manage your research projects, and stay
            updated with deadlines all in one place.
          </p>
        </div>
        
        <div className="mt-4 md:mt-0 flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-accent" />
            <div>
              <div className="text-sm text-white/70">Next Deadline</div>
              <div className="font-medium">May 15, 2025</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-accent" />
            <div>
              <div className="text-sm text-white/70">Time Remaining</div>
              <div className="font-medium">{timeToDeadline}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;
