
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Define the form validation schema
const grantFormSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  category: z.string().min(1, { message: "Please select a category" }),
  fundingAmount: z.string().min(1, { message: "Please enter funding amount" }),
  duration: z.string().min(1, { message: "Please enter duration" }),
  summary: z.string().optional(),
  description: z.string().optional(),
  funder: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  department: z.string().optional(),
  collaborators: z.string().optional(),
  studentInvolvement: z.string().default("0"),
  hasMidTermReport: z.boolean().default(false),
  hasCloseoutReport: z.boolean().default(false),
  agreementUploaded: z.boolean().default(false)
});

type GrantFormValues = z.infer<typeof grantFormSchema>;

const SubmitGrant = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const [error, setError] = useState<string | null>(null);
  
  const [files, setFiles] = useState<FileList | null>(null);
  const [agreementFile, setAgreementFile] = useState<File | null>(null);
  
  // Initialize the form with react-hook-form and zod validation
  const form = useForm<GrantFormValues>({
    resolver: zodResolver(grantFormSchema),
    defaultValues: {
      title: "",
      category: "",
      fundingAmount: "",
      duration: "",
      summary: "",
      description: "",
      funder: "",
      startDate: "",
      endDate: "",
      department: "",
      collaborators: "",
      studentInvolvement: "0",
      hasMidTermReport: false,
      hasCloseoutReport: false,
      agreementUploaded: false
    }
  });
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(e.target.files);
    }
  };

  const handleAgreementFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAgreementFile(e.target.files[0]);
    }
  };

  const uploadDocuments = async (grantId: string): Promise<void> => {
    if (!files || files.length === 0) return;
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileExt = file.name.split('.').pop();
      const filePath = `${grantId}/${Date.now()}.${fileExt}`;

      // Upload file to Supabase storage
      const { error: uploadError } = await supabase.storage
        .from('grant_documents')
        .upload(filePath, file);
        
      if (uploadError) {
        console.error('Error uploading file:', uploadError);
        throw uploadError;
      }

      // Add document record in the database
      const { error: dbError } = await supabase.from('documents').insert({
        grant_id: grantId,
        name: file.name,
        file_path: filePath,
        file_type: file.type,
        file_size: file.size,
        uploaded_by: user?.id,
        document_type: 'supporting'
      });

      if (dbError) {
        console.error('Error recording document in database:', dbError);
        throw dbError;
      }
    }
    
    // Upload agreement file if exists
    if (agreementFile && form.getValues('agreementUploaded')) {
      const fileExt = agreementFile.name.split('.').pop();
      const filePath = `${grantId}/agreement_${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('grant_documents')
        .upload(filePath, agreementFile);
        
      if (uploadError) {
        console.error('Error uploading agreement file:', uploadError);
        throw uploadError;
      }
      
      const { error: dbError } = await supabase.from('documents').insert({
        grant_id: grantId,
        name: agreementFile.name,
        file_path: filePath,
        file_type: agreementFile.type,
        file_size: agreementFile.size,
        uploaded_by: user?.id,
        document_type: 'agreement'
      });
      
      if (dbError) {
        console.error('Error recording agreement document in database:', dbError);
        throw dbError;
      }
    }
  };
  
  const onSubmit = async (data: GrantFormValues) => {
    if (!user?.id) {
      toast({
        title: "Authentication Error",
        description: "You must be logged in to submit a grant application.",
        variant: "destructive",
        duration: 5000,
      });
      return;
    }

    setError(null);
    setIsSubmitting(true);
    
    try {
      // Parse collaborators from comma-separated string
      const collaboratorsArray = data.collaborators 
        ? data.collaborators.split(',').map(item => item.trim()) 
        : null;
      
      // Insert grant into database
      const { data: grantData, error } = await supabase.from('grants').insert({
        title: data.title,
        category: data.category,
        funding_amount: parseFloat(data.fundingAmount),
        duration: parseInt(data.duration, 10),
        summary: data.summary || "",
        description: data.description || "",
        funder: data.funder || "",
        start_date: data.startDate || null,
        end_date: data.endDate || null,
        department: data.department || null,
        collaborators: collaboratorsArray,
        student_involvement: parseInt(data.studentInvolvement, 10),
        has_mid_term_report: data.hasMidTermReport,
        has_closeout_report: data.hasCloseoutReport,
        agreement_uploaded: data.agreementUploaded,
        submitter_id: user.id
      }).select('id').single();
      
      if (error) throw error;

      // If files were selected, upload them
      if ((files && files.length > 0) || agreementFile) {
        if (grantData) {
          await uploadDocuments(grantData.id);
        }
      }

      toast({
        title: "Grant Submitted",
        description: "Your grant application has been successfully submitted.",
        duration: 5000,
      });

      // Redirect to the grants list page
      navigate('/my-grants');

    } catch (error: any) {
      console.error('Error submitting grant:', error);
      setError(error.message || "Failed to submit grant application. Please try again.");
      toast({
        title: "Submission Error",
        description: error.message || "Failed to submit grant application. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Submit Grant Application</h1>
        
        <Card>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardHeader>
                <CardTitle>Grant Proposal Details</CardTitle>
                <CardDescription>
                  Complete the form below to submit your grant proposal for review.
                </CardDescription>
              </CardHeader>
              
              {error && (
                <div className="px-6 pb-2">
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                </div>
              )}
              
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <div className="px-6">
                  <TabsList className="grid grid-cols-3">
                    <TabsTrigger value="basic">Basic Information</TabsTrigger>
                    <TabsTrigger value="details">Additional Details</TabsTrigger>
                    <TabsTrigger value="documents">Documents & Reports</TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="basic">
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Title *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter project title" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Grant Category *</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="medical">Medical Research</SelectItem>
                              <SelectItem value="public-health">Public Health</SelectItem>
                              <SelectItem value="community">Community Development</SelectItem>
                              <SelectItem value="education">Education</SelectItem>
                              <SelectItem value="technology">Technology</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="fundingAmount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Funding Amount (USD) *</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="Enter amount" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="duration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Duration (months) *</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="Enter duration in months" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="summary"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Summary</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Provide a brief summary of your project"
                              className="resize-none"
                              rows={3}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Detailed Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe your project in detail"
                              className="resize-none"
                              rows={5}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </TabsContent>
                
                <TabsContent value="details">
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="funder"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Funding Organization</FormLabel>
                          <FormControl>
                            <Input placeholder="Name of funding organization" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="startDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Start Date</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="endDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>End Date</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="department"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Department</FormLabel>
                          <FormControl>
                            <Input placeholder="Your department or unit" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="collaborators"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Collaborators</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter collaborator names (comma-separated)" {...field} />
                          </FormControl>
                          <FormDescription>
                            Separate collaborator names with commas
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="studentInvolvement"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Number of AU Students Involved</FormLabel>
                          <FormControl>
                            <Input type="number" min="0" placeholder="Number of students" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </TabsContent>
                
                <TabsContent value="documents">
                  <CardContent className="space-y-6">
                    <div className="space-y-2 border p-4 rounded-md">
                      <FormField
                        control={form.control}
                        name="hasMidTermReport"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Mid-Term Report Required</FormLabel>
                              <FormDescription>
                                Check this if the grant requires a mid-term progress report
                              </FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="space-y-2 border p-4 rounded-md">
                      <FormField
                        control={form.control}
                        name="hasCloseoutReport"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Closeout Report Required</FormLabel>
                              <FormDescription>
                                Check this if the grant requires a final closeout report
                              </FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="space-y-2 border p-4 rounded-md">
                      <FormField
                        control={form.control}
                        name="agreementUploaded"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Upload Grant Agreement</FormLabel>
                              <FormDescription>
                                Check this if you want to upload a grant agreement document
                              </FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />
                      
                      {form.watch("agreementUploaded") && (
                        <div className="ml-6 mt-4">
                          <Input 
                            id="agreementFile" 
                            type="file"
                            onChange={handleAgreementFileChange}
                          />
                          <p className="text-sm text-muted-foreground mt-1">
                            Upload the signed grant agreement document
                          </p>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <FormLabel htmlFor="documents">Upload Supporting Documents</FormLabel>
                      <Input 
                        id="documents" 
                        type="file" 
                        multiple 
                        onChange={handleFileChange}
                      />
                      <p className="text-sm text-muted-foreground mt-1">
                        Upload any supporting documents (PDF, DOCX, XLSX)
                      </p>
                    </div>
                  </CardContent>
                </TabsContent>
              </Tabs>
              
              <CardFooter className="flex justify-between border-t p-6">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    const tabs = ["basic", "details", "documents"];
                    const currentIndex = tabs.indexOf(activeTab);
                    if (currentIndex > 0) {
                      setActiveTab(tabs[currentIndex - 1]);
                    }
                  }}
                  disabled={activeTab === "basic"}
                >
                  Previous
                </Button>
                
                {activeTab !== "documents" ? (
                  <Button 
                    type="button"
                    onClick={() => {
                      const tabs = ["basic", "details", "documents"];
                      const currentIndex = tabs.indexOf(activeTab);
                      if (currentIndex < tabs.length - 1) {
                        setActiveTab(tabs[currentIndex + 1]);
                      }
                    }}
                  >
                    Next
                  </Button>
                ) : (
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </Button>
                )}
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SubmitGrant;
