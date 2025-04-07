
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Briefcase, Award, Copyright } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthContext";

interface IPItem {
  id: string;
  title: string;
  type: "patent" | "copyright" | "trademark";
  status: "pending" | "approved" | "registered";
  grant_id: string;
  grant_title: string;
}

const IPTracker = () => {
  const [ipItems, setIpItems] = useState<IPItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  
  useEffect(() => {
    // This is a placeholder for future IP tracking functionality
    // In a real implementation, we would fetch IP data from the database
    setLoading(false);
    
    // Mock data for display purposes
    setIpItems([
      {
        id: "1",
        title: "Novel Treatment Method",
        type: "patent",
        status: "pending",
        grant_id: "123",
        grant_title: "Clinical Research on XYZ Treatment"
      },
      {
        id: "2",
        title: "Research Protocol Documentation",
        type: "copyright",
        status: "registered",
        grant_id: "456",
        grant_title: "Protocol Development for ABC Research"
      },
      {
        id: "3",
        title: "HealthTrack Platform",
        type: "trademark",
        status: "approved",
        grant_id: "789",
        grant_title: "Digital Health Monitoring System"
      }
    ]);
  }, []);

  const typeIcons = {
    patent: <Award className="h-4 w-4 mr-2" />,
    copyright: <Copyright className="h-4 w-4 mr-2" />,
    trademark: <Briefcase className="h-4 w-4 mr-2" />
  };
  
  const statusColors = {
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
    registered: "bg-blue-50 text-blue-700 border-blue-200"
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Intellectual Property</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">Loading IP data...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Intellectual Property</CardTitle>
        <Button variant="outline" size="sm">
          <FileText className="h-4 w-4 mr-2" />
          Manage IP
        </Button>
      </CardHeader>
      <CardContent>
        {ipItems.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-muted-foreground mb-2">No intellectual property registered</p>
            <Button variant="secondary" size="sm">Register New IP</Button>
          </div>
        ) : (
          <div className="space-y-4">
            {ipItems.map((item) => (
              <div key={item.id} className="border p-3 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {typeIcons[item.type]}
                    <span className="font-medium">{item.title}</span>
                  </div>
                  <Badge variant="outline" className={statusColors[item.status]}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </Badge>
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  Related to grant: {item.grant_title}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default IPTracker;
