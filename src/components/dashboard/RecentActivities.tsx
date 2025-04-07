
import { 
  FileText, 
  CheckCircle, 
  Clock, 
  MessageSquare, 
  FilePlus, 
  Edit
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

type ActivityType = "submission" | "approval" | "comment" | "update" | "document" | "edit";

type Activity = {
  id: string;
  type: ActivityType;
  message: string;
  user: {
    name: string;
    avatar?: string;
    initials: string;
  };
  timestamp: Date;
};

const activities: Activity[] = [
  {
    id: "1",
    type: "submission",
    message: "New grant proposal submitted",
    user: {
      name: "Dr. Jane Smith",
      initials: "JS",
    },
    timestamp: new Date(2025, 3, 28, 14, 30), // April 28, 2025, 2:30 PM
  },
  {
    id: "2",
    type: "approval",
    message: "HIV Treatment grant approved",
    user: {
      name: "Dr. Michael Wong",
      initials: "MW",
    },
    timestamp: new Date(2025, 3, 27, 10, 15), // April 27, 2025, 10:15 AM
  },
  {
    id: "3",
    type: "comment",
    message: "Comment added to Malaria Prevention report",
    user: {
      name: "Prof. Sarah Johnson",
      initials: "SJ",
    },
    timestamp: new Date(2025, 3, 26, 16, 45), // April 26, 2025, 4:45 PM
  },
  {
    id: "4",
    type: "document",
    message: "Final report uploaded for COVID-19 study",
    user: {
      name: "Dr. Robert Chen",
      initials: "RC",
    },
    timestamp: new Date(2025, 3, 25, 9, 0), // April 25, 2025, 9:00 AM
  },
  {
    id: "5",
    type: "edit",
    message: "Budget revised for Maternal Health project",
    user: {
      name: "Dr. Elizabeth Osei",
      initials: "EO",
    },
    timestamp: new Date(2025, 3, 24, 11, 30), // April 24, 2025, 11:30 AM
  }
];

const getActivityIcon = (type: ActivityType) => {
  switch (type) {
    case "submission":
      return <FileText className="h-4 w-4 text-blue-500" />;
    case "approval":
      return <CheckCircle className="h-4 w-4 text-emerald-500" />;
    case "comment":
      return <MessageSquare className="h-4 w-4 text-amber-500" />;
    case "document":
      return <FilePlus className="h-4 w-4 text-purple-500" />;
    case "edit":
      return <Edit className="h-4 w-4 text-gray-500" />;
    default:
      return <Clock className="h-4 w-4 text-gray-500" />;
  }
};

const RecentActivities = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {activities.map((activity) => (
          <div key={activity.id} className="flex gap-3">
            <div className="relative mt-1">
              <Avatar className="h-8 w-8">
                <AvatarImage src={activity.user.avatar} />
                <AvatarFallback className="bg-secondary text-secondary-foreground">
                  {activity.user.initials}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 rounded-full bg-white p-0.5">
                <div className="rounded-full bg-white p-0.5">
                  {getActivityIcon(activity.type)}
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-0">
              <span className="text-sm font-medium">{activity.message}</span>
              <div className="flex items-center gap-1">
                <span className="text-xs text-muted-foreground">{activity.user.name}</span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                </span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RecentActivities;
