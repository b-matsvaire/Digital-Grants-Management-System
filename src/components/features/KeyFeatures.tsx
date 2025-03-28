
import React from "react";
import { 
  FileText, 
  Database, 
  Clock, 
  Tag, 
  Calendar, 
  BarChart3, 
  Upload, 
  Book
} from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

const FeatureCard = ({ icon, title, description, color }: FeatureCardProps) => {
  return (
    <div className="p-6 rounded-xl bg-secondary/50 border border-border shadow-soft hover:shadow-medium transition-shadow">
      <div className={`h-12 w-12 rounded-full bg-${color}/10 flex items-center justify-center mb-4`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">
        {description}
      </p>
    </div>
  );
};

const KeyFeatures = () => {
  const features = [
    {
      icon: <FileText className="h-6 w-6 text-grant-blue" />,
      title: "Grant Submission",
      description: "Submit grant proposals online with an intuitive form that ensures all requirements are met.",
      color: "grant-blue"
    },
    {
      icon: <Database className="h-6 w-6 text-grant-purple" />,
      title: "Information Management",
      description: "Track proposals, awards, and facilitate team collaboration across research projects.",
      color: "grant-purple"
    },
    {
      icon: <Clock className="h-6 w-6 text-grant-orange" />,
      title: "Progress Tracking",
      description: "Generate weekly, monthly, mid-term, and close-out reports to monitor project progress.",
      color: "grant-orange"
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-grant-green" />,
      title: "Financial Management",
      description: "Monitor project budgets, procurement processes, and link finances to specific awards.",
      color: "grant-green"
    },
    {
      icon: <Tag className="h-6 w-6 text-grant-teal" />,
      title: "Research Output",
      description: "Track copyrights, patents, trademarks, publications, and conference participation.",
      color: "grant-teal"
    },
    {
      icon: <Upload className="h-6 w-6 text-grant-red" />,
      title: "Document Upload",
      description: "Upload critical documents such as agreements, mid-term reports, and closeout reports.",
      color: "grant-red"
    },
    {
      icon: <Calendar className="h-6 w-6 text-grant-blue" />,
      title: "Deadline Tracking",
      description: "Receive automatic reminders for submission deadlines and important milestones.",
      color: "grant-blue"
    },
    {
      icon: <Book className="h-6 w-6 text-grant-purple" />,
      title: "Student Participation",
      description: "Record and manage student involvement throughout research projects.",
      color: "grant-purple"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">Comprehensive Grant Management</h2>
          <p className="text-muted-foreground">
            Our platform streamlines the entire grant lifecycle from submission to completion
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              color={feature.color}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;
