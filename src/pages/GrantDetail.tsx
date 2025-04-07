
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Download, 
  FileText,
  ThumbsUp,
  ThumbsDown,
  Award,
  User,
  Building,
  Calendar
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthContext";
import { Grant, Document, Review, IntellectualProperty } from "@/types/grants";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import IPManagementForm from "@/components/ip/IPManagementForm";

const GrantDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [grant, setGrant] = useState<Grant | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [ipItems, setIpItems] = useState<IntellectualProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isReviewer, setIsReviewer] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  
  const [reviewForm, setReviewForm] = useState({
    rating: 3,
    comments: "",
    recommendation: "approve" as "approve" | "reject" | "revise"
  });
  
  const [files, setFiles] = useState<FileList | null>(null);

  useEffect(() => {
    const checkUserRole = async () => {
      if (!user?.id) return;
      
      const { data } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();
      
      if (data) {
        setIsAdmin(data.role === 'admin' || data.role === 'institutional_admin');
        setIsReviewer(data.role === 'reviewer');
      }
    };
    
    checkUserRole();
  }, [user]);

  useEffect(() => {
    const fetchGrantDetails = async () => {
      if (!id) return;
      
      try {
        // Fetch grant details
        const { data: grantData, error: grantError } = await supabase
          .from('grants')
          .select('*')
          .eq('id', id)
          .single();
        
        if (grantError) throw grantError;
        setGrant(grantData);
        
        // Fetch documents
        const { data: documentsData, error: documentsError } = await supabase
          .from('documents')
          .select('*')
          .eq('grant_id', id);
        
        if (documentsError) throw documentsError;
        setDocuments(documentsData || []);
        
        // Fetch reviews
        const { data: reviewsData, error: reviewsError } = await supabase
          .from('reviews')
          .select('*')
          .eq('grant_id', id);
        
        if (reviewsError) throw reviewsError;
        setReviews(reviewsData || []);
        
        // Fetch IP items
        const { data: ipData, error: ipError } = await supabase
          .from('intellectual_property')
          .select('*')
          .eq('grant_id', id);
        
        if (ipError) throw ipError;
        setIpItems(ipData || []);
        
      } catch (error: any) {
        console.error('Error fetching grant details:', error);
        toast({
          title: "Error",
          description: "Failed to load grant details. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchGrantDetails();
  }, [id, toast]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(e.target.files);
    }
  };

  const handleDownload = async (documentFile: Document) => {
    try {
      const { data, error } = await supabase
        .storage
        .from('grant_documents')
        .download(documentFile.file_path);
      
      if (error) throw error;
      
      // Create download link
      const blob = new Blob([data]);
      const url = URL.createObjectURL(blob);
      const a = window.document.createElement('a');
      a.href = url;
      a.download = documentFile.name;
      window.document.body.appendChild(a);
      a.click();
      window.document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Error downloading document:', error);
      toast({
        title: "Download Error",
        description: "Failed to download the document. Please try again.",
        variant: "destructive",
      });
    }
  };

  const uploadDocuments = async (): Promise<void> => {
    if (!files || files.length === 0 || !grant || !user) return;
    
    setSubmitting(true);
    
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileExt = file.name.split('.').pop();
        const filePath = `${grant.id}/${Date.now()}.${fileExt}`;

        // Upload file to Supabase storage
        const { error: uploadError } = await supabase.storage
          .from('grant_documents')
          .upload(filePath, file);
          
        if (uploadError) throw uploadError;

        // Add document record in the database
        const { error: dbError } = await supabase.from('documents').insert({
          grant_id: grant.id,
          name: file.name,
          file_path: filePath,
          file_type: file.type,
          file_size: file.size,
          uploaded_by: user.id
        });

        if (dbError) throw dbError;
      }
      
      // Refresh documents list
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .eq('grant_id', grant.id);
        
      if (error) throw error;
      setDocuments(data);
      
      toast({
        title: "Success",
        description: "Documents uploaded successfully.",
      });
      
    } catch (error: any) {
      console.error('Error uploading documents:', error);
      toast({
        title: "Upload Error",
        description: error.message || "Failed to upload documents. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
      setFiles(null);
      // Clear the file input
      const fileInput = window.document.getElementById('document-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    }
  };

  const handleReviewSubmission = async () => {
    if (!grant || !user) return;
    
    setSubmitting(true);
    
    try {
      const { error } = await supabase.from('reviews').insert({
        grant_id: grant.id,
        reviewer_id: user.id,
        rating: reviewForm.rating,
        comments: reviewForm.comments,
        recommendation: reviewForm.recommendation
      });
      
      if (error) throw error;
      
      // Refresh reviews
      const { data: reviewsData, error: reviewsError } = await supabase
        .from('reviews')
        .select('*')
        .eq('grant_id', id);
      
      if (reviewsError) throw reviewsError;
      setReviews(reviewsData || []);
      
      // Reset form
      setReviewForm({
        rating: 3,
        comments: "",
        recommendation: "approve"
      });
      
      toast({
        title: "Review Submitted",
        description: "Your review has been successfully submitted.",
      });
      
    } catch (error: any) {
      console.error('Error submitting review:', error);
      toast({
        title: "Submission Error",
        description: error.message || "Failed to submit review. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const updateGrantStatus = async (status: 'under_review' | 'approved' | 'rejected') => {
    if (!grant || !isAdmin) return;
    
    try {
      const { error } = await supabase
        .from('grants')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', grant.id);
      
      if (error) throw error;
      
      // Update local state
      setGrant({
        ...grant,
        status,
        updated_at: new Date().toISOString()
      });
      
      toast({
        title: "Status Updated",
        description: `Grant status updated to ${status.replace('_', ' ')}.`,
      });
      
    } catch (error: any) {
      console.error('Error updating grant status:', error);
      toast({
        title: "Update Error",
        description: error.message || "Failed to update grant status. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleAddIP = async (newIP: IntellectualProperty) => {
    if (!id) return;
    
    try {
      // Refresh IP items
      const { data, error } = await supabase
        .from('intellectual_property')
        .select('*')
        .eq('grant_id', id);
      
      if (error) throw error;
      setIpItems(data || []);
      
      toast({
        title: "IP Added",
        description: "Intellectual property has been added successfully.",
      });
    } catch (error) {
      console.error('Error refreshing IP items:', error);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-64">
          <p>Loading grant details...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (!grant) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <p className="text-muted-foreground">Grant not found</p>
          <Button onClick={() => navigate('/my-grants')}>Back to Grants</Button>
        </div>
      </DashboardLayout>
    );
  }

  const renderStatusBadge = () => {
    const statusConfig = {
      submitted: {
        label: "Submitted",
        variant: "secondary" as const,
        icon: <Clock className="h-4 w-4 mr-1" />,
        bgColor: "bg-gray-100"
      },
      under_review: {
        label: "Under Review",
        variant: "warning" as const,
        icon: <Clock className="h-4 w-4 mr-1" />,
        bgColor: "bg-amber-50"
      },
      approved: {
        label: "Approved",
        variant: "success" as const,
        icon: <CheckCircle2 className="h-4 w-4 mr-1" />,
        bgColor: "bg-emerald-50"
      },
      rejected: {
        label: "Rejected",
        variant: "destructive" as const,
        icon: <XCircle className="h-4 w-4 mr-1" />,
        bgColor: "bg-red-50"
      },
    };

    const config = statusConfig[grant.status];

    return (
      <Badge
        variant={
          config.variant === "success"
            ? "outline"
            : config.variant === "warning" || config.variant === "secondary"
            ? "secondary"
            : "destructive"
        }
        className={`flex items-center text-sm py-1 px-3
          ${config.variant === "success" && "border-emerald-500 text-emerald-600 bg-emerald-50"}
          ${config.variant === "warning" && "border-amber-500 text-amber-600 bg-amber-50"}
        `}
      >
        {config.icon}
        {config.label}
      </Badge>
    );
  };

  const getIPTypeIcon = (type: string) => {
    switch (type) {
      case 'patent':
        return <Award className="h-4 w-4 text-blue-500" />;
      case 'copyright':
        return <FileText className="h-4 w-4 text-green-500" />;
      default:
        return <Award className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-bold">{grant.title}</h1>
              {renderStatusBadge()}
            </div>
            <p className="text-muted-foreground mt-1">
              Submitted on {new Date(grant.created_at).toLocaleDateString()}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate('/my-grants')}>
              Back to Grants
            </Button>
            {isAdmin && (
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => updateGrantStatus('under_review')}
                  disabled={grant.status === 'under_review'}
                >
                  <Clock className="h-4 w-4 mr-1" />
                  Mark as Under Review
                </Button>
                <Button 
                  variant="outline" 
                  className="bg-emerald-50 text-emerald-600 hover:bg-emerald-100 hover:text-emerald-700 border-emerald-200"
                  onClick={() => updateGrantStatus('approved')}
                  disabled={grant.status === 'approved'}
                >
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  Approve
                </Button>
                <Button 
                  variant="outline" 
                  className="bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 border-red-200"
                  onClick={() => updateGrantStatus('rejected')}
                  disabled={grant.status === 'rejected'}
                >
                  <ThumbsDown className="h-4 w-4 mr-1" />
                  Reject
                </Button>
              </div>
            )}
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="ip">Intellectual Property</TabsTrigger>
            <TabsTrigger value="students">Student Involvement</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Grant Details</CardTitle>
                <CardDescription>
                  Detailed information about the grant proposal
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Category</h3>
                    <p className="mt-1">{grant.category}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Funding Amount</h3>
                    <p className="mt-1">${grant.funding_amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Duration</h3>
                    <p className="mt-1">{grant.duration} months</p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <div className="flex items-center">
                      <Building className="h-4 w-4 mr-2 text-gray-500" />
                      <h3 className="text-sm font-medium text-muted-foreground">Funder</h3>
                    </div>
                    <p className="mt-1 ml-6">{grant.funder || "Not specified"}</p>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                      <h3 className="text-sm font-medium text-muted-foreground">Timeline</h3>
                    </div>
                    <p className="mt-1 ml-6">
                      {grant.start_date ? (
                        <>
                          {new Date(grant.start_date).toLocaleDateString()} - 
                          {grant.end_date ? new Date(grant.end_date).toLocaleDateString() : 'Ongoing'}
                        </>
                      ) : (
                        `${grant.duration} months`
                      )}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-gray-500" />
                      <h3 className="text-sm font-medium text-muted-foreground">Department</h3>
                    </div>
                    <p className="mt-1 ml-6">{grant.department || "Not specified"}</p>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Project Summary</h3>
                  <p>{grant.summary}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Detailed Description</h3>
                  <p className="whitespace-pre-line">{grant.description}</p>
                </div>
                
                {grant.collaborators && grant.collaborators.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Collaborators</h3>
                    <div className="flex flex-wrap gap-2">
                      {grant.collaborators.map((collaborator, index) => (
                        <Badge key={index} variant="secondary">{collaborator}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="documents" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Supporting Documents</CardTitle>
                <CardDescription>
                  Documents attached to this grant application
                </CardDescription>
              </CardHeader>
              <CardContent>
                {documents.length === 0 ? (
                  <p className="text-muted-foreground">No documents attached to this grant.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Size</TableHead>
                          <TableHead>Uploaded</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {documents.map((doc) => (
                          <TableRow key={doc.id}>
                            <TableCell className="font-medium">
                              <div className="flex items-center">
                                <FileText className="h-4 w-4 mr-2 text-blue-500" />
                                {doc.name}
                              </div>
                            </TableCell>
                            <TableCell>{doc.file_type}</TableCell>
                            <TableCell>{Math.round(doc.file_size / 1024)} KB</TableCell>
                            <TableCell>{new Date(doc.created_at).toLocaleDateString()}</TableCell>
                            <TableCell className="text-right">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleDownload(doc)}
                              >
                                <Download className="h-4 w-4 mr-1" />
                                Download
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
                
                <div className="mt-6 space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Required Reports</h3>
                    <div className="flex flex-wrap gap-4">
                      <Card className="w-full sm:w-[48%] md:w-[31%]">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Mid-term Report</CardTitle>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <Badge variant={grant.has_mid_term_report ? "outline" : "secondary"} className={grant.has_mid_term_report ? "bg-green-50 text-green-600" : ""}>
                            {grant.has_mid_term_report ? "Required" : "Not Required"}
                          </Badge>
                        </CardContent>
                      </Card>
                      
                      <Card className="w-full sm:w-[48%] md:w-[31%]">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Closeout Report</CardTitle>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <Badge variant={grant.has_closeout_report ? "outline" : "secondary"} className={grant.has_closeout_report ? "bg-green-50 text-green-600" : ""}>
                            {grant.has_closeout_report ? "Required" : "Not Required"}
                          </Badge>
                        </CardContent>
                      </Card>
                      
                      <Card className="w-full sm:w-[48%] md:w-[31%]">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Grant Agreement</CardTitle>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <Badge variant={grant.agreement_uploaded ? "outline" : "secondary"} className={grant.agreement_uploaded ? "bg-green-50 text-green-600" : ""}>
                            {grant.agreement_uploaded ? "Uploaded" : "Not Uploaded"}
                          </Badge>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
                
                {(user?.id === grant.submitter_id || isAdmin) && (
                  <div className="mt-6">
                    <p className="text-sm font-medium mb-2">Add Documents</p>
                    <div className="flex gap-4">
                      <Input 
                        id="document-upload" 
                        type="file" 
                        multiple 
                        onChange={handleFileChange}
                      />
                      <Button 
                        onClick={uploadDocuments} 
                        disabled={!files || files.length === 0 || submitting}
                      >
                        {submitting ? "Uploading..." : "Upload"}
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="ip" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Intellectual Property</CardTitle>
                <CardDescription>
                  Patents, copyrights, and trademarks associated with this grant
                </CardDescription>
              </CardHeader>
              <CardContent>
                {ipItems.length === 0 ? (
                  <div className="text-center p-6">
                    <p className="text-muted-foreground mb-4">No intellectual property items registered for this grant</p>
                    {(user?.id === grant.submitter_id || isAdmin) && grant.status === 'approved' && (
                      <div>
                        <IPManagementForm 
                          grantId={grant.id}
                          onComplete={() => handleAddIP}
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {ipItems.map((ip) => (
                        <Card key={ip.id} className="overflow-hidden">
                          <CardHeader className="pb-2">
                            <div className="flex items-center">
                              {getIPTypeIcon(ip.type)}
                              <CardTitle className="text-base ml-2">{ip.title}</CardTitle>
                            </div>
                          </CardHeader>
                          <CardContent className="pb-4">
                            <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Type:</span>
                                <span className="text-sm font-medium">
                                  {ip.type.charAt(0).toUpperCase() + ip.type.slice(1)}
                                </span>
                              </div>
                              
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Status:</span>
                                <Badge variant="outline" className={
                                  ip.status === 'pending' ? "bg-amber-50 text-amber-700 border-amber-200" :
                                  ip.status === 'approved' ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                                  "bg-blue-50 text-blue-700 border-blue-200"
                                }>
                                  {ip.status.charAt(0).toUpperCase() + ip.status.slice(1)}
                                </Badge>
                              </div>
                              
                              {ip.filing_date && (
                                <div className="flex justify-between items-center">
                                  <span className="text-sm text-muted-foreground">Filed:</span>
                                  <span className="text-sm">
                                    {new Date(ip.filing_date).toLocaleDateString()}
                                  </span>
                                </div>
                              )}
                              
                              {ip.reference_number && (
                                <div className="flex justify-between items-center">
                                  <span className="text-sm text-muted-foreground">Reference:</span>
                                  <span className="text-sm font-mono">{ip.reference_number}</span>
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    
                    {(user?.id === grant.submitter_id || isAdmin) && (
                      <div className="mt-6">
                        <h3 className="text-lg font-medium mb-4">Register New Intellectual Property</h3>
                        <IPManagementForm 
                          grantId={grant.id}
                          onComplete={() => handleAddIP}
                        />
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="students" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Student Involvement</CardTitle>
                <CardDescription>
                  Track student participation in this grant project
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium">Total Students Involved</h3>
                      <p className="text-muted-foreground">Number of students participating in this grant</p>
                    </div>
                    <div className="bg-blue-50 text-blue-700 p-4 rounded-full h-16 w-16 flex items-center justify-center">
                      <span className="text-xl font-bold">{grant.student_involvement || 0}</span>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {(user?.id === grant.submitter_id || isAdmin) && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Update Student Participation</h3>
                      <div className="flex items-end gap-4">
                        <div className="space-y-2 w-full max-w-xs">
                          <Label htmlFor="studentCount">Number of Students</Label>
                          <Input 
                            id="studentCount" 
                            type="number" 
                            placeholder="Enter count"
                            min="0"
                            defaultValue={grant.student_involvement?.toString() || "0"}
                          />
                        </div>
                        <Button>Update Count</Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-6">
            {/* Reviews Section - Only visible to admins, reviewers, and the grant submitter */}
            {(isAdmin || isReviewer || user?.id === grant.submitter_id) && (
              <Card>
                <CardHeader>
                  <CardTitle>Reviews</CardTitle>
                  <CardDescription>
                    Feedback from reviewers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {reviews.length === 0 ? (
                    <p className="text-muted-foreground">No reviews yet for this grant.</p>
                  ) : (
                    <div className="space-y-6">
                      {reviews.map((review) => (
                        <div key={review.id} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mr-2">
                                R
                              </div>
                              <div>
                                <p className="font-medium">Reviewer</p>
                                <p className="text-xs text-muted-foreground">
                                  {new Date(review.created_at).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <span className="text-sm font-medium mr-2">Rating:</span>
                              <Badge variant="outline" className="bg-amber-50 text-amber-700">
                                {review.rating}/5
                              </Badge>
                              <Badge 
                                variant="outline" 
                                className={`ml-2 ${
                                  review.recommendation === 'approve' 
                                    ? 'bg-emerald-50 text-emerald-600' 
                                    : review.recommendation === 'reject'
                                    ? 'bg-red-50 text-red-600'
                                    : 'bg-blue-50 text-blue-600'
                                }`}
                              >
                                {review.recommendation.charAt(0).toUpperCase() + review.recommendation.slice(1)}
                              </Badge>
                            </div>
                          </div>
                          <p className="mt-4">{review.comments}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Add review form for reviewers */}
                  {isReviewer && !reviews.some(r => r.reviewer_id === user?.id) && (
                    <div className="mt-6 border-t pt-6">
                      <h3 className="text-lg font-medium mb-4">Submit Review</h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="rating">Rating (1-5)</Label>
                          <Input 
                            id="rating" 
                            type="number" 
                            min="1" 
                            max="5"
                            value={reviewForm.rating}
                            onChange={(e) => setReviewForm(prev => ({ 
                              ...prev, 
                              rating: parseInt(e.target.value) 
                            }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="comments">Comments</Label>
                          <Textarea 
                            id="comments"
                            value={reviewForm.comments}
                            onChange={(e) => setReviewForm(prev => ({ 
                              ...prev, 
                              comments: e.target.value 
                            }))}
                            rows={4}
                          />
                        </div>
                        <div>
                          <Label htmlFor="recommendation">Recommendation</Label>
                          <Select 
                            value={reviewForm.recommendation}
                            onValueChange={(value: "approve" | "reject" | "revise") => 
                              setReviewForm(prev => ({ ...prev, recommendation: value }))
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="approve">Approve</SelectItem>
                              <SelectItem value="reject">Reject</SelectItem>
                              <SelectItem value="revise">Revise</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button 
                          onClick={handleReviewSubmission}
                          disabled={
                            !reviewForm.comments || 
                            reviewForm.rating < 1 || 
                            reviewForm.rating > 5 || 
                            submitting
                          }
                        >
                          {submitting ? "Submitting..." : "Submit Review"}
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default GrantDetail;
