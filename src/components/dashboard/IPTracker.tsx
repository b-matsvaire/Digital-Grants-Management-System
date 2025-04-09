
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Briefcase, Award, Copyright, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth";
import { IntellectualProperty } from "@/types/grants";
import { useNavigate } from "react-router-dom";

const IPTracker = () => {
  const [ipItems, setIpItems] = useState<IntellectualProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchIPData = async () => {
      if (!user) return;
      
      try {
        // Use our grants table to join and get grant titles
        const { data, error } = await supabase
          .from('intellectual_property')
          .select(`
            *,
            grants(title)
          `)
          .limit(3);
        
        if (error) {
          console.error("Error fetching IP data:", error);
          return;
        }
        
        // Process the data to match the expected format
        const processedData = data.map(item => ({
          ...item,
          grant_title: item.grants?.title || "Unknown Grant"
        }));
        
        setIpItems(processedData);
      } catch (err) {
        console.error("Failed to fetch IP data:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchIPData();
  }, [user]);

  const typeIcons = {
    patent: <Award className="h-4 w-4 mr-2" />,
    copyright: <Copyright className="h-4 w-4 mr-2" />,
    trademark: <Briefcase className="h-4 w-4 mr-2" />,
    trade_secret: <FileText className="h-4 w-4 mr-2" />
  };
  
  const statusColors = {
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
    registered: "bg-blue-50 text-blue-700 border-blue-200"
  };

  const handleManageIP = () => {
    navigate('/ip-management');
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Intellectual Property</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center py-6">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <p className="ml-2 text-muted-foreground">Loading IP data...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Intellectual Property</CardTitle>
        <Button variant="outline" size="sm" onClick={handleManageIP}>
          <FileText className="h-4 w-4 mr-2" />
          Manage IP
        </Button>
      </CardHeader>
      <CardContent>
        {ipItems.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-muted-foreground mb-2">No intellectual property registered</p>
            <Button variant="secondary" size="sm" onClick={handleManageIP}>Register New IP</Button>
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
