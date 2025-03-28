
import { cn } from "@/lib/utils";
import { FileText, FileCheck, Clock, Beaker, Award } from "lucide-react";

type Activity = {
  id: string;
  title: string;
  timestamp: string;
  type: "submission" | "review" | "deadline" | "report" | "award";
  status?: "pending" | "approved" | "rejected" | "completed";
};

const activities: Activity[] = [
  {
    id: "act-1",
    title: "COVID-19 Treatment Research Grant",
    timestamp: "2 hours ago",
    type: "submission",
    status: "pending",
  },
  {
    id: "act-2",
    title: "Cardiovascular Health Study",
    timestamp: "Yesterday",
    type: "review",
    status: "approved",
  },
  {
    id: "act-3",
    title: "Neural Network Development Grant",
    timestamp: "2 days ago",
    type: "deadline",
  },
  {
    id: "act-4",
    title: "Pediatric Cancer Research",
    timestamp: "3 days ago",
    type: "report",
    status: "completed",
  },
  {
    id: "act-5",
    title: "Mental Health Awareness Initiative",
    timestamp: "1 week ago",
    type: "award",
  },
];

type ActivityIconProps = {
  type: Activity["type"];
  status?: Activity["status"];
};

const ActivityIcon = ({ type, status }: ActivityIconProps) => {
  const iconClasses = cn(
    "h-5 w-5",
    {
      "text-grant-blue": type === "submission",
      "text-grant-purple": type === "review",
      "text-grant-orange": type === "deadline",
      "text-grant-teal": type === "report",
      "text-grant-green": type === "award",
    }
  );

  switch (type) {
    case "submission":
      return <FileText className={iconClasses} />;
    case "review":
      return <FileCheck className={iconClasses} />;
    case "deadline":
      return <Clock className={iconClasses} />;
    case "report":
      return <Beaker className={iconClasses} />;
    case "award":
      return <Award className={iconClasses} />;
    default:
      return null;
  }
};

const ActivityStatus = ({ status }: { status?: Activity["status"] }) => {
  if (!status) return null;

  return (
    <span
      className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium", {
        "bg-grant-blue/10 text-grant-blue": status === "pending",
        "bg-grant-green/10 text-grant-green": status === "approved" || status === "completed",
        "bg-grant-red/10 text-grant-red": status === "rejected",
      })}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const RecentActivity = () => {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-soft">
      <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
      <div className="space-y-5">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-4">
            <div className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
              {
                "bg-grant-blue/10": activity.type === "submission",
                "bg-grant-purple/10": activity.type === "review",
                "bg-grant-orange/10": activity.type === "deadline",
                "bg-grant-teal/10": activity.type === "report",
                "bg-grant-green/10": activity.type === "award",
              }
            )}>
              <ActivityIcon type={activity.type} status={activity.status} />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{activity.title}</p>
                <ActivityStatus status={activity.status} />
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <span>{activity.timestamp}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        <button className="text-sm text-primary hover:underline">View all activity</button>
      </div>
    </div>
  );
};

export default RecentActivity;
