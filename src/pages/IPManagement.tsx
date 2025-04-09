import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { useAuth } from "@/components/auth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import IPManagementForm from "@/components/ip/IPManagementForm";
import { IntellectualProperty } from "@/types/grants";

const IPManagement = () => {
  const { user } = useAuth();
  const [ipItems, setIpItems] = useState<IntellectualProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchIPItems = async () => {
      try {
        setError(null);
        setLoading(true);
        
        if (!user?.id) return;
        
        const { data, error } = await supabase
          .from('intellectual_property')
          .select('*');
        
        if (error) throw error;
        
        setIpItems(data || []);
      } catch (error: any) {
        console.error("Error fetching IP:", error);
        setError("Failed to load intellectual property. Please try again.");
        toast({
          title: "Error",
          description: "Failed to load intellectual property. Please try again.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchIPItems();
  }, [user, toast]);
  
  const handleAddIP = () => {
    toast({
      title: "Feature Coming Soon",
      description: "Adding intellectual property will be available in a future update.",
    });
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Intellectual Property</h1>
          <Button onClick={handleAddIP}>Add IP</Button>
        </div>
        
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <Card>
          <CardHeader>
            <CardTitle>Registered Intellectual Property</CardTitle>
            <CardDescription>View and manage your registered intellectual property</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center p-6">
                <p>Loading intellectual property...</p>
              </div>
            ) : ipItems.length === 0 ? (
              <div className="text-center p-8">
                <p className="text-muted-foreground mb-4">
                  No intellectual property found. Add your first IP to get started.
                </p>
                <IPManagementForm />
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ipItems.map((ip) => (
                    <TableRow key={ip.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          {ip.title}
                        </div>
                      </TableCell>
                      <TableCell>{ip.type}</TableCell>
                      <TableCell>{ip.status}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Edit</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default IPManagement;
