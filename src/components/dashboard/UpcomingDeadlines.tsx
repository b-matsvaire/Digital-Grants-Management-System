
import { useState, useEffect } from "react";
import { 
  CalendarIcon, 
  ChevronRight, 
  PlusIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth";
import { useNavigate } from "react-router-dom";

type Deadline = {
  id: string;
  title: string;
  date: Date;
  type: "submission" | "report" | "review";
};

const getDeadlineColor = (type: Deadline["type"]) => {
  switch (type) {
    case "submission":
      return "bg-blue-100 text-blue-700";
    case "report":
      return "bg-purple-100 text-purple-700";
    case "review":
      return "bg-amber-100 text-amber-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const UpcomingDeadlines = () => {
  const [deadlines, setDeadlines] = useState<Deadline[]>([]);
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // In a real implementation, we would fetch deadlines from the database
    // For now, we just show an empty state
  }, [user]);

  return (
    <Card>
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle>Upcoming Deadlines</CardTitle>
        <Button variant="ghost" size="sm">
          <PlusIcon className="h-4 w-4 mr-1" />
          Add
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {deadlines.length > 0 ? (
          deadlines.map((deadline) => {
            const isPast = new Date() > deadline.date;
            const distance = formatDistanceToNow(deadline.date, { addSuffix: true });
            
            return (
              <div
                key={deadline.id}
                className="flex items-center justify-between p-3 rounded-md hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-md ${getDeadlineColor(deadline.type)}`}>
                    <CalendarIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">{deadline.title}</h4>
                    <p className={`text-xs ${isPast ? 'text-red-600' : 'text-gray-500'}`}>
                      {deadline.date.toLocaleDateString()} ({distance})
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            );
          })
        ) : (
          <div className="text-center py-6">
            <p className="text-sm text-muted-foreground">No upcoming deadlines</p>
          </div>
        )}
        
        {deadlines.length > 0 && (
          <Button variant="outline" className="w-full mt-2" size="sm">
            View All Deadlines
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default UpcomingDeadlines;
