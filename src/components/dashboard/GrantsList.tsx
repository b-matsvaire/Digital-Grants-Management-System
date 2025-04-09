
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, Clock, XCircle, Calendar, User, Loader2 } from "lucide-react";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth";
import { Grant } from "@/types/grants";
import { useToast } from "@/components/ui/use-toast";

const GrantsList = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [grants, setGrants] = useState<Grant[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchGrants = async () => {
      try {
        if (!user) return;
        
        let query = supabase.from('grants').select('*, profiles(full_name)');
        
        // If user is a researcher, only fetch their grants
        if (user.role === 'researcher') {
          query = query.eq('submitter_id', user.id);
        }
        // For admin roles, fetch all grants
        // No filtering needed for admin, they should see all grants

        // Limit to 5 most recent grants
        const { data, error } = await query
          .order('created_at', { ascending: false })
          .limit(5);
        
        if (error) {
          console.error('Error fetching grants:', error);
          throw error;
        }
        
        console.log("Fetched grants:", data, "User role:", user.role);
        
        // Process the data to include submitter name
        const processedData = data?.map(grant => ({
          ...grant,
          submitter_name: grant.profiles?.full_name || 'Unknown'
        })) || [];
        
        setGrants(processedData);
      } catch (error) {
        console.error('Error fetching grants:', error);
        toast({
          title: "Error",
          description: "Failed to fetch grants. Please try again.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchGrants();
  }, [user, toast]);

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
        className={cn(
          "flex items-center",
          config.variant === "success" && "border-emerald-500 text-emerald-600 bg-emerald-50",
          config.variant === "warning" && "border-amber-500 text-amber-600 bg-amber-50"
        )}
      >
        {config.icon}
        {config.label}
      </Badge>
    );
  };

  const viewGrant = (id: string) => {
    navigate(`/grants/${id}`);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Recent Grants</h2>
          <Button variant="outline" size="sm" onClick={() => navigate('/my-grants')}>
            View All
          </Button>
        </div>
        <div className="p-8 text-center">
          <div className="flex justify-center items-center">
            <Loader2 className="h-6 w-6 animate-spin text-primary mr-2" />
            <p className="text-muted-foreground">Loading grants...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">Recent Grants</h2>
        <Button variant="outline" size="sm" onClick={() => navigate('/my-grants')}>
          View All
        </Button>
      </div>
      {grants.length === 0 ? (
        <div className="p-8 text-center">
          <p className="text-muted-foreground mb-4">No grant applications found</p>
          <Button onClick={() => navigate('/submit-grant')}>Submit a Grant</Button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead className="hidden md:table-cell">Funder</TableHead>
                <TableHead className="text-right hidden md:table-cell">Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    Timeline
                  </div>
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  <div className="flex items-center">
                    <User className="h-3 w-3 mr-1" />
                    Students
                  </div>
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {grants.map((grant) => (
                <TableRow key={grant.id}>
                  <TableCell className="font-medium max-w-[250px] truncate">
                    {grant.title}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground hidden md:table-cell">
                    {grant.funder || 'N/A'}
                  </TableCell>
                  <TableCell className="text-right hidden md:table-cell">
                    ${grant.funding_amount.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={grant.status} />
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground hidden md:table-cell">
                    {grant.start_date ? (
                      <>
                        {new Date(grant.start_date).toLocaleDateString()} - 
                        {grant.end_date ? new Date(grant.end_date).toLocaleDateString() : 'Ongoing'}
                      </>
                    ) : (
                      `${grant.duration || 0} months`
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground hidden md:table-cell">
                    {grant.student_involvement || 0}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => viewGrant(grant.id)}>
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default GrantsList;
