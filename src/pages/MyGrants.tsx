
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import { CheckCircle2, Clock, XCircle, Eye, Calendar, User, FileText, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthContext";
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

const MyGrants = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [grants, setGrants] = useState<Grant[]>([]);
  const [filteredGrants, setFilteredGrants] = useState<Grant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setcategoryFilter] = useState<string>("all");

  useEffect(() => {
    const fetchGrants = async () => {
      try {
        if (!user) return;
        setError(null);

        let query = supabase.from('grants').select('*');
        
        // If user is a researcher, only fetch their grants
        if (user.role === 'researcher') {
          query = query.eq('submitter_id', user.id);
        }
        
        const { data, error } = await query.order('created_at', { ascending: false });
        
        if (error) throw error;
        
        setGrants(data || []);
        setFilteredGrants(data || []);
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
  }, [user, toast]);

  useEffect(() => {
    // Apply filters
    let result = grants;
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(grant => 
        grant.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
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

  // Get unique categories for the filter
  const categories = grants.length > 0 
    ? ['all', ...Array.from(new Set(grants.map(grant => grant.category)))]
    : ['all'];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">My Grants</h1>
          <Button onClick={() => navigate('/submit-grant')}>
            Submit New Grant
          </Button>
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
              placeholder="Search by title, funder or description..."
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
            <Select value={categoryFilter} onValueChange={setcategoryFilter}>
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
            <CardTitle>Grant Applications</CardTitle>
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
                {grants.length === 0 && (
                  <Button onClick={() => navigate('/submit-grant')}>Submit Your First Grant</Button>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Funder</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Timeline</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredGrants.map((grant) => (
                      <TableRow key={grant.id}>
                        <TableCell className="font-medium max-w-[250px] truncate">
                          {grant.title}
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
                        <TableCell className="text-sm text-muted-foreground">
                          {grant.duration} months
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" onClick={() => viewGrant(grant.id)}>
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
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

export default MyGrants;
