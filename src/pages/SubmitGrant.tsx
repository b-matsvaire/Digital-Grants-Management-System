
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
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
import { useAuth } from "@/components/auth";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const SubmitGrant = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [title, setTitle] = useState("");
  const [funder, setFunder] = useState("");
  const [category, setCategory] = useState("");
  const [fundingAmount, setFundingAmount] = useState("");
  const [duration, setDuration] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [department, setDepartment] = useState("");
  const [studentInvolvement, setStudentInvolvement] = useState("");
  const [collaborators, setCollaborators] = useState("");
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!user?.id) {
        throw new Error("User not authenticated");
      }

      // Prepare the collaborators array
      const collaboratorsArray = collaborators.length > 0
        ? collaborators.split(',').map(s => s.trim())
        : null;

      const grantData = {
        submitter_id: user.id,
        title,
        funder: funder || null,
        category: category || null,
        funding_amount: parseFloat(fundingAmount) || 0,
        duration: parseInt(duration) || null,
        start_date: startDate || null,
        end_date: endDate || null,
        department: department || null,
        student_involvement: parseInt(studentInvolvement) || null,
        collaborators: collaboratorsArray,
        summary: summary || null,
        description: description || null,
        status: 'submitted',
        has_mid_term_report: false,
        has_closeout_report: false,
        agreement_uploaded: false
      };

      const { data, error } = await supabase
        .from('grants')
        .insert([grantData])
        .select();

      if (error) {
        console.error("Error submitting grant:", error);
        throw error;
      }

      console.log("Grant submitted successfully:", data);
      toast({
        title: "Grant Submitted",
        description: "Your grant application has been successfully submitted!",
      });
      navigate('/my-grants');

    } catch (error: any) {
      console.error("Grant submission failed:", error);
      toast({
        title: "Submission Error",
        description: error.message || "Failed to submit grant. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto py-10">
        <Card>
          <CardHeader>
            <CardTitle>Submit a Grant Application</CardTitle>
            <CardDescription>
              Fill in the details below to submit your grant proposal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  type="text"
                  id="title"
                  placeholder="Grant Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="funder">Funder</Label>
                <Input
                  type="text"
                  id="funder"
                  placeholder="Funding Organization"
                  value={funder}
                  onChange={(e) => setFunder(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select onValueChange={setCategory} value={category}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="medical">Medical</SelectItem>
                    <SelectItem value="public-health">Public Health</SelectItem>
                    <SelectItem value="community">Community</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fundingAmount">Funding Amount</Label>
                  <Input
                    type="number"
                    id="fundingAmount"
                    placeholder="Amount Requested"
                    value={fundingAmount}
                    onChange={(e) => setFundingAmount(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="duration">Duration (months)</Label>
                  <Input
                    type="number"
                    id="duration"
                    placeholder="Project Duration in Months"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    type="date"
                    id="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    type="date"
                    id="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="department">Department</Label>
                <Input
                  type="text"
                  id="department"
                  placeholder="Your Department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="studentInvolvement">Student Involvement</Label>
                <Input
                  type="number"
                  id="studentInvolvement"
                  placeholder="Number of Students Involved"
                  value={studentInvolvement}
                  onChange={(e) => setStudentInvolvement(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="collaborators">Collaborators (comma-separated)</Label>
                <Input
                  type="text"
                  id="collaborators"
                  placeholder="List of Collaborators"
                  value={collaborators}
                  onChange={(e) => setCollaborators(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="summary">Project Summary</Label>
                <Textarea
                  id="summary"
                  placeholder="Brief Summary of the Project"
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="description">Detailed Description</Label>
                <Textarea
                  id="description"
                  placeholder="Detailed Project Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={5}
                />
              </div>
              <Button disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Grant"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SubmitGrant;
