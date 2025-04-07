
import { 
  Award, 
  ClipboardCheck, 
  Clock, 
  FileText,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const stats = [
  {
    title: "Active Grants",
    value: 8,
    change: 2,
    changeText: "from last month",
    increasing: true,
    icon: <Award className="h-6 w-6 text-primary opacity-70" />,
    color: "primary"
  },
  {
    title: "Pending Applications",
    value: 3,
    change: -1,
    changeText: "from last month",
    increasing: false,
    icon: <ClipboardCheck className="h-6 w-6 text-secondary opacity-70" />,
    color: "secondary"
  },
  {
    title: "Upcoming Deadlines",
    value: 5,
    change: 0,
    changeText: "same as last month",
    increasing: null,
    icon: <Clock className="h-6 w-6 text-accent opacity-70" />,
    color: "accent"
  },
  {
    title: "Completed Reports",
    value: 12,
    change: 4,
    changeText: "from last month",
    increasing: true,
    icon: <FileText className="h-6 w-6 text-emerald-500 opacity-70" />,
    color: "success"
  }
];

const StatCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {stats.map((stat, index) => (
        <div key={index} className={`stat-card ${stat.color}`}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-600">{stat.title}</h3>
            <div className="p-2 rounded-full bg-gray-50">{stat.icon}</div>
          </div>
          
          <div className="flex items-end justify-between">
            <div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs text-gray-500 mt-1">
                {stat.increasing !== null && (
                  <>
                    {stat.increasing ? (
                      <ArrowUpRight className="h-3 w-3 text-emerald-500 mr-1" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 text-rose-500 mr-1" />
                    )}
                    <span className={cn(
                      stat.increasing ? "text-emerald-500" : "text-rose-500"
                    )}>
                      {Math.abs(stat.change)}
                    </span>
                  </>
                )}
                <span className="ml-1">{stat.changeText}</span>
              </div>
            </div>
            
            {stat.increasing !== null && (
              <div className="h-8 w-16">
                <TrendingUp className={cn(
                  "h-8 w-8",
                  stat.increasing ? "text-emerald-500" : "text-rose-500",
                  "opacity-60"
                )} />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatCards;
