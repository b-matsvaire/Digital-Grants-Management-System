
import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import RecentActivity from "@/components/dashboard/RecentActivity";
import FeatureCards from "@/components/dashboard/FeatureCards";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  FileText, 
  BarChart3, 
  CheckCircle2, 
  AlertCircle, 
  Calendar,
  ChevronRight
} from "lucide-react";

const Dashboard = () => {
  // Sample data
  const stats = [
    {
      title: "Active Grants",
      value: 8,
      change: "+2",
      changeType: "increase",
      icon: <FileText className="h-5 w-5" />,
      iconBg: "bg-grant-blue/10",
      iconColor: "text-grant-blue",
    },
    {
      title: "Available Funds",
      value: "$1.45M",
      change: "+$350K",
      changeType: "increase",
      icon: <BarChart3 className="h-5 w-5" />,
      iconBg: "bg-grant-green/10",
      iconColor: "text-grant-green",
    },
    {
      title: "Proposals Approved",
      value: 12,
      change: "+3",
      changeType: "increase",
      icon: <CheckCircle2 className="h-5 w-5" />,
      iconBg: "bg-grant-purple/10",
      iconColor: "text-grant-purple",
    },
    {
      title: "Pending Reviews",
      value: 4,
      change: "-2",
      changeType: "decrease",
      icon: <AlertCircle className="h-5 w-5" />,
      iconBg: "bg-grant-red/10",
      iconColor: "text-grant-red",
    },
  ];

  // Sample upcoming deadlines
  const upcomingDeadlines = [
    {
      id: "1",
      title: "Q2 Financial Report",
      date: "June 30, 2023",
      project: "Novel Biomarkers for Early Cancer Detection",
      priority: "high"
    },
    {
      id: "2",
      title: "Mid-term Progress Report",
      date: "July 15, 2023",
      project: "Immunotherapy Response in Pediatric Patients",
      priority: "medium"
    },
    {
      id: "3",
      title: "Annual Review Meeting",
      date: "August 5, 2023",
      project: "Machine Learning in Precision Medicine",
      priority: "medium"
    }
  ];

  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome Back, Researcher</h1>
          <p className="text-muted-foreground">
            Here's an overview of your research grants and activities
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <StatCard key={i} {...stat} />
          ))}
        </div>

        {/* Features Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Quick Actions</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/resources">
                View Resources <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <FeatureCards />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <RecentActivity />
            </div>
          </div>

          {/* Upcoming Deadlines */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Upcoming Deadlines</h2>
                <Calendar className="h-5 w-5 text-muted-foreground" />
              </div>
              
              <div className="space-y-4">
                {upcomingDeadlines.map(deadline => (
                  <div key={deadline.id} className="border-l-4 pl-4 py-1" 
                    style={{ 
                      borderColor: deadline.priority === 'high' 
                        ? 'var(--grant-red)' 
                        : deadline.priority === 'medium'
                          ? 'var(--grant-orange)' 
                          : 'var(--grant-blue)' 
                    }}
                  >
                    <p className="font-medium">{deadline.title}</p>
                    <p className="text-sm text-muted-foreground">{deadline.date}</p>
                    <p className="text-xs text-muted-foreground truncate">{deadline.project}</p>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full mt-2" asChild>
                  <Link to="/dashboard/calendar">View Calendar</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
