
import React from "react";
import { useParams, Link } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Download, FileText, Users, DollarSign, Clock, ChevronRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Sample data for demonstration
const grantsData = {
  "1": {
    id: "1",
    title: "Novel Biomarkers for Early Cancer Detection",
    fundingAgency: "National Cancer Institute",
    amount: "$750,000",
    startDate: "2023-01-15",
    endDate: "2026-01-14",
    status: "active",
    progress: "On Track",
    summary: "This research project aims to identify and validate novel biomarkers for early detection of various cancer types. Using a combination of genomic, proteomic, and metabolomic approaches, we will develop a panel of biomarkers that can be used for non-invasive screening of high-risk individuals.",
    objectives: [
      "Identify candidate biomarkers through multi-omics analysis of patient samples",
      "Validate biomarkers in a large cohort of patients and controls",
      "Develop a clinical assay for biomarker detection in blood samples",
      "Evaluate the sensitivity and specificity of the biomarker panel",
    ],
    team: [
      { name: "Dr. Sarah Johnson", role: "Principal Investigator" },
      { name: "Dr. Michael Chen", role: "Co-Investigator" },
      { name: "Dr. Emily Williams", role: "Research Associate" },
      { name: "Robert Taylor", role: "PhD Student" },
      { name: "Jennifer Lopez", role: "Lab Technician" },
    ],
    timeline: [
      { milestone: "Patient recruitment", deadline: "2023-06-30", status: "Completed" },
      { milestone: "Sample collection", deadline: "2023-12-31", status: "In Progress" },
      { milestone: "Initial biomarker screening", deadline: "2024-06-30", status: "Not Started" },
      { milestone: "Validation studies", deadline: "2025-06-30", status: "Not Started" },
      { milestone: "Final report", deadline: "2025-12-31", status: "Not Started" },
    ],
    budget: [
      { category: "Personnel", allocated: "$450,000", spent: "$112,500" },
      { category: "Equipment", allocated: "$150,000", spent: "$75,000" },
      { category: "Supplies", allocated: "$100,000", spent: "$20,000" },
      { category: "Travel", allocated: "$25,000", spent: "$5,000" },
      { category: "Other", allocated: "$25,000", spent: "$2,500" },
    ],
    documents: [
      { name: "Original Proposal", type: "PDF", date: "2022-09-15", size: "2.4 MB" },
      { name: "Research Protocol", type: "DOCX", date: "2023-01-10", size: "1.8 MB" },
      { name: "IRB Approval", type: "PDF", date: "2022-12-20", size: "0.5 MB" },
      { name: "Q1 Progress Report", type: "PDF", date: "2023-04-05", size: "1.2 MB" },
      { name: "Q2 Progress Report", type: "PDF", date: "2023-07-10", size: "1.5 MB" },
    ],
  },
  // Add more grants as needed
};

const GrantDetails = () => {
  const { id } = useParams<{ id: string }>();
  const grant = grantsData[id as keyof typeof grantsData];
  
  if (!grant) {
    return (
      <DashboardLayout>
        <div className="container mx-auto py-6">
          <div className="text-center py-8">
            <h2 className="text-2xl font-bold mb-4">Grant Not Found</h2>
            <p className="mb-6">The grant you're looking for doesn't exist or you don't have access to it.</p>
            <Button asChild>
              <Link to="/dashboard/grants">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to My Grants
              </Link>
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
        <div className="mb-6">
          <Link to="/dashboard/grants" className="text-muted-foreground hover:text-foreground flex items-center text-sm mb-4">
            <ArrowLeft className="mr-1 h-4 w-4" /> Back to My Grants
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">{grant.title}</h1>
              <div className="flex items-center gap-3 mt-2">
                <Badge variant={
                  grant.status === "active" ? "outline" :
                  grant.status === "pending" ? "secondary" : "default"
                }>
                  {grant.status.charAt(0).toUpperCase() + grant.status.slice(1)}
                </Badge>
                <span className="text-muted-foreground">
                  {grant.fundingAgency}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="outline">
                <FileText className="mr-2 h-4 w-4" /> Generate Report
              </Button>
              <Button>
                <Clock className="mr-2 h-4 w-4" /> Update Progress
              </Button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-2">
                <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Timeline</p>
                  <p className="text-2xl font-bold mt-1">
                    {new Date(grant.startDate).toLocaleDateString()} - {new Date(grant.endDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-2">
                <DollarSign className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Total Budget</p>
                  <p className="text-2xl font-bold mt-1">{grant.amount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-2">
                <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Team Members</p>
                  <p className="text-2xl font-bold mt-1">{grant.team.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-2">
                <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Progress Status</p>
                  <p className="text-2xl font-bold mt-1">
                    <Badge variant={
                      grant.progress === "On Track" ? "outline" :
                      grant.progress === "Ahead" ? "success" : "destructive"
                    }>
                      {grant.progress}
                    </Badge>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="mb-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="budget">Budget</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>Project Overview</CardTitle>
                <CardDescription>
                  Summary and objectives of the research project
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Project Summary</h3>
                  <p className="text-muted-foreground">{grant.summary}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Research Objectives</h3>
                  <ul className="space-y-2 ml-6 list-disc text-muted-foreground">
                    {grant.objectives.map((objective, index) => (
                      <li key={index}>{objective}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="team">
            <Card>
              <CardHeader>
                <CardTitle>Research Team</CardTitle>
                <CardDescription>
                  Personnel involved in the research project
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Role</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {grant.team.map((member, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{member.name}</TableCell>
                        <TableCell>{member.role}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="timeline">
            <Card>
              <CardHeader>
                <CardTitle>Project Timeline</CardTitle>
                <CardDescription>
                  Key milestones and deadlines for the project
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Milestone</TableHead>
                      <TableHead>Deadline</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {grant.timeline.map((milestone, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{milestone.milestone}</TableCell>
                        <TableCell>{new Date(milestone.deadline).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge variant={
                            milestone.status === "Completed" ? "success" :
                            milestone.status === "In Progress" ? "outline" : "secondary"
                          }>
                            {milestone.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="budget">
            <Card>
              <CardHeader>
                <CardTitle>Budget Overview</CardTitle>
                <CardDescription>
                  Financial allocation and expenditure for the project
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Category</TableHead>
                      <TableHead>Allocated</TableHead>
                      <TableHead>Spent</TableHead>
                      <TableHead>Remaining</TableHead>
                      <TableHead>% Used</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {grant.budget.map((item, index) => {
                      const allocated = parseFloat(item.allocated.replace('$', '').replace(',', ''));
                      const spent = parseFloat(item.spent.replace('$', '').replace(',', ''));
                      const remaining = allocated - spent;
                      const percentUsed = ((spent / allocated) * 100).toFixed(1);
                      
                      return (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{item.category}</TableCell>
                          <TableCell>{item.allocated}</TableCell>
                          <TableCell>{item.spent}</TableCell>
                          <TableCell>${remaining.toLocaleString()}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <span className={
                                parseFloat(percentUsed) > 80 ? "text-destructive" :
                                parseFloat(percentUsed) > 60 ? "text-amber-500" : "text-green-500"
                              }>
                                {percentUsed}%
                              </span>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle>Project Documents</CardTitle>
                <CardDescription>
                  Documents related to the research project
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Document Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {grant.documents.map((doc, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{doc.name}</TableCell>
                        <TableCell>{doc.type}</TableCell>
                        <TableCell>{new Date(doc.date).toLocaleDateString()}</TableCell>
                        <TableCell>{doc.size}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4 mr-2" /> Download
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default GrantDetails;
