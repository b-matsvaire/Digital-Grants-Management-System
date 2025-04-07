import { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthContext";
import { IntellectualProperty, Grant } from "@/types/grants";

interface IPManagementFormProps {
  grantId?: string;
  ipData?: IntellectualProperty;
  onComplete?: () => void;
}

interface GrantOption {
  id: string;
  title: string;
}

const IPManagementForm = ({ grantId, ipData, onComplete }: IPManagementFormProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [grants, setGrants] = useState<GrantOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState<Partial<IntellectualProperty>>({
    title: "",
    type: "patent",
    status: "pending",
    grant_id: grantId || "",
    description: "",
    filing_date: "",
    approval_date: "",
    reference_number: ""
  });
  
  useEffect(() => {
    if (ipData) {
      setFormData({
        title: ipData.title,
        type: ipData.type,
        status: ipData.status,
        grant_id: ipData.grant_id,
        description: ipData.description,
        filing_date: ipData.filing_date,
        approval_date: ipData.approval_date,
        reference_number: ipData.reference_number
      });
    }
    
    if (!grantId) {
      fetchUserGrants();
    }
  }, [ipData, grantId]);
  
  const fetchUserGrants = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      let query = supabase
        .from('grants')
        .select('id, title')
        .eq('status', 'approved');
      
      if (user.role === 'researcher') {
        query = query.eq('submitter_id', user.id);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      setGrants(data as GrantOption[] || []);
    } catch (error) {
      console.error('Error fetching grants:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };
  
  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  
  const handleSubmit = async () => {
    if (!user?.id) {
      toast({
        title: "Authentication Error",
        description: "You must be logged in to manage intellectual property.",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.title || !formData.type || !formData.grant_id) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    setSubmitting(true);
    
    try {
      if (ipData?.id) {
        const { error } = await supabase
          .from('intellectual_property')
          .update({
            title: formData.title,
            type: formData.type,
            status: formData.status,
            description: formData.description,
            filing_date: formData.filing_date || null,
            approval_date: formData.approval_date || null,
            reference_number: formData.reference_number || null,
            updated_at: new Date().toISOString()
          })
          .eq('id', ipData.id);
        
        if (error) throw error;
        
        toast({
          title: "IP Updated",
          description: "Intellectual property record has been updated successfully.",
        });
      } else {
        const { error } = await supabase
          .from('intellectual_property')
          .insert({
            title: formData.title,
            type: formData.type,
            status: formData.status,
            grant_id: formData.grant_id,
            description: formData.description,
            filing_date: formData.filing_date || null,
            approval_date: formData.approval_date || null,
            reference_number: formData.reference_number || null
          });
        
        if (error) throw error;
        
        toast({
          title: "IP Registered",
          description: "Intellectual property has been registered successfully.",
        });
      }
      
      if (onComplete) {
        onComplete();
      } else {
        setFormData({
          title: "",
          type: "patent",
          status: "pending",
          grant_id: grantId || "",
          description: "",
          filing_date: "",
          approval_date: "",
          reference_number: ""
        });
      }
    } catch (error: any) {
      console.error('Error managing intellectual property:', error);
      toast({
        title: "Submission Error",
        description: error.message || "Failed to manage intellectual property. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{ipData ? "Edit" : "Register"} Intellectual Property</CardTitle>
        <CardDescription>
          {ipData
            ? "Update the information for this intellectual property item."
            : "Register a new intellectual property item related to your grant."
          }
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Title *</Label>
          <Input 
            id="title" 
            placeholder="Enter IP title" 
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>
        
        {!grantId && (
          <div className="space-y-2">
            <Label htmlFor="grant_id">Related Grant *</Label>
            <Select 
              value={formData.grant_id} 
              onValueChange={(value) => handleSelectChange('grant_id', value)}
              disabled={loading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select grant" />
              </SelectTrigger>
              <SelectContent>
                {grants.map((grant) => (
                  <SelectItem key={grant.id} value={grant.id}>
                    {grant.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {loading && <p className="text-xs text-muted-foreground mt-1">Loading grants...</p>}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="type">IP Type *</Label>
            <Select 
              value={formData.type} 
              onValueChange={(value: "patent" | "copyright" | "trademark" | "trade_secret") => handleSelectChange('type', value)}
            >
              <SelectTrigger id="type">
                <SelectValue placeholder="Select IP type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="patent">Patent</SelectItem>
                <SelectItem value="copyright">Copyright</SelectItem>
                <SelectItem value="trademark">Trademark</SelectItem>
                <SelectItem value="trade_secret">Trade Secret</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="status">Status *</Label>
            <Select 
              value={formData.status} 
              onValueChange={(value: "pending" | "approved" | "registered") => handleSelectChange('status', value)}
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="registered">Registered</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea 
            id="description"
            placeholder="Describe the intellectual property" 
            rows={3}
            value={formData.description || ''}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="filing_date">Filing Date</Label>
            <Input 
              id="filing_date" 
              type="date"
              value={formData.filing_date || ''}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="approval_date">Approval/Registration Date</Label>
            <Input 
              id="approval_date" 
              type="date"
              value={formData.approval_date || ''}
              onChange={handleInputChange}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="reference_number">Reference/Registration Number</Label>
          <Input 
            id="reference_number" 
            placeholder="Official reference or registration number" 
            value={formData.reference_number || ''}
            onChange={handleInputChange}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit} disabled={submitting}>
          {submitting ? "Submitting..." : ipData ? "Update IP" : "Register IP"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default IPManagementForm;
