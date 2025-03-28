
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Database, 
  BarChart3, 
  Clock, 
  Tag, 
  Upload, 
  Book, 
  Calendar 
} from 'lucide-react';

const FeatureCards = () => {
  const features = [
    {
      title: "Grant Submission",
      description: "Submit new grant proposals",
      icon: <FileText className="h-5 w-5 text-white" />,
      link: "/dashboard/grants/new",
      color: "bg-grant-blue"
    },
    {
      title: "Track Progress",
      description: "Monitor project milestones",
      icon: <Clock className="h-5 w-5 text-white" />,
      link: "/dashboard/reports",
      color: "bg-grant-green"
    },
    {
      title: "Financial Management",
      description: "Manage budgets and expenses",
      icon: <BarChart3 className="h-5 w-5 text-white" />,
      link: "/dashboard/finances",
      color: "bg-grant-purple"
    },
    {
      title: "Upload Documents",
      description: "Store project documentation",
      icon: <Upload className="h-5 w-5 text-white" />,
      link: "/dashboard/documents",
      color: "bg-grant-red"
    },
    {
      title: "IP Management",
      description: "Track patents and copyrights",
      icon: <Tag className="h-5 w-5 text-white" />,
      link: "/dashboard/ip",
      color: "bg-grant-teal"
    },
    {
      title: "Student Participation",
      description: "Record student involvement",
      icon: <Book className="h-5 w-5 text-white" />,
      link: "/dashboard/students",
      color: "bg-grant-orange"
    },
    {
      title: "Publications",
      description: "Manage research outputs",
      icon: <Database className="h-5 w-5 text-white" />,
      link: "/dashboard/publications",
      color: "bg-grant-indigo"
    },
    {
      title: "Important Dates",
      description: "Track deadlines and events",
      icon: <Calendar className="h-5 w-5 text-white" />,
      link: "/dashboard/calendar",
      color: "bg-grant-pink"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {features.map((feature, index) => (
        <Link
          key={index}
          to={feature.link}
          className="block p-4 rounded-lg border border-border bg-card hover:bg-secondary/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className={`h-10 w-10 rounded-full ${feature.color} flex items-center justify-center`}>
              {feature.icon}
            </div>
            <div>
              <h3 className="font-medium">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default FeatureCards;
