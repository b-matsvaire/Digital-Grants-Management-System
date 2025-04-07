
import { 
  FileText, 
  FileUp, 
  Calendar, 
  Users, 
  FileCheck, 
  Settings 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Link } from "react-router-dom";

const quickActions = [
  {
    icon: <FileText className="h-5 w-5" />,
    title: "New Grant",
    description: "Create a new grant application",
    path: "/submit-grant",
  },
  {
    icon: <FileUp className="h-5 w-5" />,
    title: "Upload Report",
    description: "Submit a progress report",
    path: "/documents",
  },
  {
    icon: <Calendar className="h-5 w-5" />,
    title: "Schedule",
    description: "View upcoming deadlines",
    path: "/calendar",
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: "Team",
    description: "Manage team members",
    path: "/team",
  },
  {
    icon: <FileCheck className="h-5 w-5" />,
    title: "Review",
    description: "Pending reviews",
    path: "/my-grants",
  },
  {
    icon: <Settings className="h-5 w-5" />,
    title: "Settings",
    description: "Account preferences",
    path: "/settings",
  },
];

const QuickActions = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-auto py-6 flex flex-col items-center justify-center gap-3 text-center hover:bg-slate-50 hover:border-primary/20"
              asChild
            >
              <Link to={action.path}>
                <div className="rounded-full bg-primary/10 p-3">
                  {action.icon}
                </div>
                <div className="space-y-1">
                  <h3 className="font-medium">{action.title}</h3>
                  <p className="text-xs text-muted-foreground">
                    {action.description}
                  </p>
                </div>
              </Link>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
