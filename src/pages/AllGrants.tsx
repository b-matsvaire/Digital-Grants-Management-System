
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
import { CheckCircle2, Clock, XCircle, Eye, Edit, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth";
import { Grant } from "@/types/grants";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Alert,
  AlertDescription
} from "@/components/ui/alert";
import { useNavigate } from "react-router-dom";

const AllGrants = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [grants, setGrants] = useState<Grant[]>([]);
  const [filteredGrants, setFilteredGrants] = useState<Grant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  useEffect(() => {
    // Only admins and institutional admins should access this page
    if (user && (user.role !== 'admin' && user.role !== 'institutional_admin')) {
      navigate('/');
      return;
    }

    const fetchAllGrants = async () => {
      try {
        if (!user) return;
        setError(null);

        // Fetch all grants regardless of submitter
        const { data, error } = await supabase
          .from('grants')
          .select('*, profiles(full_name)')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        // Enrich the grants data with submitter name
        const enrichedGrants = data?.map(grant => ({
          ...grant,
          submitter_name: grant.profiles?.full_name || "Unknown User"
        })) || [];
        
        setGrants(enrichedGrants);
        setFilteredGrants(enrichedGrants);
      } catch (error: any) {
        console.error('Error fetching grants:', error);
        setError("Failed to load grants. Please try again.");
        toast({
          title: "Error",
          description: "Failed to load all grants. Please try again.",
          variant: "destructive",
          duration: 5000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAllGrants();
  }, [user, navigate, toast]);

  useEffect(() => {
    // Apply filters
    let result = grants;
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(grant => 
        grant.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (grant.submitter_name && grant.submitter_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (grant.funder && grant.funder.toLowerCase().includes(searchTerm.toLowerCase())) ||
        grant.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter(grant => grant.status === statusFilter);
    }
    
    // Apply category filter
    if (categoryFilter !== "all") {
      result = result.filter(grant => grant.category === categoryFilter);
    }
    
    setFilteredGrants(result);
  }, [searchTerm, statusFilter, categoryFilter, grants]);

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
  
  const updateGrantStatus = async (grantId: string, newStatus: Grant['status']) => {
    try {
      const { error } = await supabase
        .from('grants')
        .update({ status: newStatus, updated_at: new Date() })
        .eq('id', grantId);
        
      if (error) throw error;
      
      // Update local state
      const updatedGrants = grants.map(grant => 
        grant.id === grantId ? { ...grant, status: newStatus } : grant
      );
      
      setGrants(updatedGrants);
      
      // Also update filtered grants
      const updatedFilteredGrants = filteredGrants.map(grant => 
        grant.id === grantId ? { ...grant, status: newStatus } : grant
      );
      
      setFilteredGrants(updatedFilteredGrants);
      
      toast({
        title: "Status Updated",
        description: `Grant status successfully updated to ${newStatus}.`,
      });
    } catch (error: any) {
      console.error("Error updating grant status:", error);
      toast({
        title: "Update Failed",
        description: "Failed to update grant status. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Get unique categories for the filter
  const categories = grants.length > 0 
    ? ['all', ...Array.from(new Set(grants.map(grant => grant.category)))]
    : ['all'];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">All Grants</h1>
        </div>
        
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-2/4">
            <Input
              placeholder="Search by title, researcher, or funder..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="w-full sm:w-1/4">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="submitted">Submitted</SelectItem>
                <SelectItem value="under_review">Under Review</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full sm:w-1/4">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.filter(cat => cat !== 'all').map(category => (
                  <SelectItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>All Grant Applications</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center p-6">
                <p>Loading grants...</p>
              </div>
            ) : filteredGrants.length === 0 ? (
              <div className="text-center p-8">
                <p className="text-muted-foreground mb-4">
                  {grants.length === 0 ? "No grant applications found" : "No grants match your filters"}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Researcher</TableHead>
                      <TableHead>Funder</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredGrants.map((grant) => (
                      <TableRow key={grant.id}>
                        <TableCell className="font-medium max-w-[200px] truncate">
                          {grant.title}
                        </TableCell>
                        <TableCell>
                          {grant.submitter_name || "Unknown"}
                        </TableCell>
                        <TableCell className="text-sm">
                          {grant.funder || 'N/A'}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {grant.category}
                        </TableCell>
                        <TableCell className="text-right">
                          ${grant.funding_amount.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={grant.status} />
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm" onClick={() => viewGrant(grant.id)}>
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            
                            {grant.status === 'submitted' && (
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => updateGrantStatus(grant.id, 'under_review')}
                              >
                                <Clock className="h-4 w-4 mr-1" />
                                Review
                              </Button>
                            )}
                            
                            {grant.status === 'under_review' && (
                              <>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  className="text-green-600"
                                  onClick={() => updateGrantStatus(grant.id, 'approved')}
                                >
                                  <CheckCircle2 className="h-4 w-4 mr-1" />
                                  Approve
                                </Button>
                                
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  className="text-red-600"
                                  onClick={() => updateGrantStatus(grant.id, 'rejected')}
                                >
                                  <XCircle className="h-4 w-4 mr-1" />
                                  Reject
                                </Button>
                              </>
                            )}
                          </div>
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

export default AllGrants;
