
import { 
  CalendarIcon, 
  ChevronRight, 
  PlusIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";

type Deadline = {
  id: string;
  title: string;
  date: Date;
  type: "submission" | "report" | "review";
};

const deadlines: Deadline[] = [
  {
    id: "1",
    title: "NIH Grant Submission",
    date: new Date(2025, 4, 15), // May 15, 2025
    type: "submission"
  },
  {
    id: "2",
    title: "Annual Progress Report",
    date: new Date(2025, 3, 30), // April 30, 2025
    type: "report"
  },
  {
    id: "3",
    title: "Peer Review Submission",
    date: new Date(2025, 4, 5), // May 5, 2025
    type: "review"
  },
  {
    id: "4",
    title: "Budget Justification",
    date: new Date(2025, 4, 20), // May 20, 2025
    type: "submission"
  }
];

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
  const sortedDeadlines = [...deadlines].sort((a, b) => a.date.getTime() - b.date.getTime());

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
        {sortedDeadlines.map((deadline) => {
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
        })}
        
        <Button variant="outline" className="w-full mt-2" size="sm">
          View All Deadlines
        </Button>
      </CardContent>
    </Card>
  );
};

export default UpcomingDeadlines;
