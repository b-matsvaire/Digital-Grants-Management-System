import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { CheckCircle2, Clock, XCircle, Eye, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth";
import { Grant } from "@/types/grants";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  AlertDescription
} from "@/components/ui/alert";

const ReviewGrants = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [grants, setGrants] = useState<Grant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGrants = async () => {
      try {
        if (!user) return;
        setError(null);

        let query = supabase.from('grants').select('*');
        
        // Only reviewers and admins should see grants under review
        if (user.role === 'reviewer') {
          query = query.eq('status', 'under_review');
        } else if (user.role === 'admin' || user.role === 'institutional_admin') {
          // Admins can see all grants that need review
          query = query.or('status.in.(submitted,under_review)');
        } else {
          // Redirect unauthorized users
          navigate('/');
          return;
        }
        
        const { data, error } = await query.order('created_at', { ascending: false });
        
        if (error) throw error;

        console.log("ReviewGrants - Fetched grants:", data, "User role:", user.role);
        setGrants(data || []);
      } catch (error: any) {
        console.error('Error fetching grants:', error);
        setError("Failed to load grants. Please try again.");
        toast({
          title: "Error",
          description: "Failed to load grants. Please try again.",
          variant: "destructive",
          duration: 5000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchGrants();
  }, [user, navigate, toast]);

  const StatusBadge = ({ status }: { status: Grant['status'] }) => {
    const statusConfig = {
      submitted: {
        label: "Submitted",
        variant: "secondary" as const,
        icon: <Clock className="h-3 w-3 mr-1" />,
      },
      under_review: {
        label: "Under Review",
        variant: "warning" as const,
        icon: <Clock className="h-3 w-3 mr-1" />,
      },
      approved: {
        label: "Approved",
        variant: "success" as const,
        icon: <CheckCircle2 className="h-3 w-3 mr-1" />,
      },
      rejected: {
        label: "Rejected",
        variant: "destructive" as const,
        icon: <XCircle className="h-3 w-3 mr-1" />,
      },
    };

    const config = statusConfig[status];

    return (
      <Badge
        variant={
          config.variant === "success"
            ? "outline"
            : config.variant === "warning" || config.variant === "secondary"
            ? "secondary"
            : "destructive"
        }
        className={`flex items-center
          ${config.variant === "success" && "border-emerald-500 text-emerald-600 bg-emerald-50"}
          ${config.variant === "warning" && "border-amber-500 text-amber-600 bg-amber-50"}
        `}
      >
        {config.icon}
        {config.label}
      </Badge>
    );
  };

  const viewGrant = (id: string) => {
    navigate(`/grants/${id}`);
  };

  const updateGrantStatus = async (id: string, status: 'under_review' | 'approved' | 'rejected') => {
    try {
      const { error } = await supabase
        .from('grants')
        .update({ status })
        .eq('id', id);
      
      if (error) throw error;
      
      // Update the local state without refetching
      setGrants(prev => 
        prev.map(grant => 
          grant.id === id ? { ...grant, status } : grant
        )
      );
      
      toast({
        title: "Grant Updated",
        description: `The grant has been marked as ${status.replace('_', ' ')}.`,
      });
    } catch (error) {
      console.error('Error updating grant status:', error);
      toast({
        title: "Error",
        description: "Failed to update grant status. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Grants for Review</h1>
        </div>
        
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <Card>
          <CardHeader>
            <CardTitle>Grant Applications</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center p-6">
                <p>Loading grants...</p>
              </div>
            ) : grants.length === 0 ? (
              <div className="text-center p-8">
                <p className="text-muted-foreground mb-4">
                  No grant applications available for review
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Funder</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Timeline</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {grants.map((grant) => (
                      <TableRow key={grant.id}>
                        <TableCell className="font-medium max-w-[250px] truncate">
                          {grant.title}
                        </TableCell>
                        <TableCell className="text-sm">
                          {grant.funder || 'N/A'}
                        </TableCell>
                        <TableCell className="text-right">
                          ${grant.funding_amount.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={grant.status} />
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {grant.duration} months
                        </TableCell>
                        <TableCell className="text-right space-x-2 whitespace-nowrap">
                          <Button variant="ghost" size="sm" onClick={() => viewGrant(grant.id)}>
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          
                          {user?.role === 'admin' && grant.status === 'submitted' && (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => updateGrantStatus(grant.id, 'under_review')}
                            >
                              <Clock className="h-4 w-4 mr-1" />
                              Start Review
                            </Button>
                          )}
                          
                          {(user?.role === 'admin' || user?.role === 'reviewer') && 
                           (grant.status === 'submitted' || grant.status === 'under_review') && (
                            <>
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                                onClick={() => updateGrantStatus(grant.id, 'approved')}
                              >
                                <CheckCircle2 className="h-4 w-4 mr-1" />
                                Approve
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="bg-red-50 text-red-700 hover:bg-red-100"
                                onClick={() => updateGrantStatus(grant.id, 'rejected')}
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                            </>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ReviewGrants;
