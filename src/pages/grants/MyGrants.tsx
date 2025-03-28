
import React from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

// Sample data for demonstration
const activeGrants = [
  {
    id: "1",
    title: "Novel Biomarkers for Early Cancer Detection",
    fundingAgency: "National Cancer Institute",
    amount: "$750,000",
    startDate: "2023-01-15",
    endDate: "2026-01-14",
    status: "active",
    progress: "On Track",
  },
  {
    id: "2",
    title: "Immunotherapy Response in Pediatric Patients",
    fundingAgency: "Children's Research Foundation",
    amount: "$425,000",
    startDate: "2023-03-01",
    endDate: "2025-02-28",
    status: "active",
    progress: "Ahead",
  },
  {
    id: "3",
    title: "Machine Learning in Precision Medicine",
    fundingAgency: "Technology Innovation Fund",
    amount: "$380,000",
    startDate: "2022-11-01",
    endDate: "2024-10-31",
    status: "active",
    progress: "Delayed",
  },
];

const pendingGrants = [
  {
    id: "4",
    title: "Genomic Analysis of Rare Diseases",
    fundingAgency: "Medical Research Council",
    amount: "$520,000",
    submittedDate: "2023-09-15",
    status: "under review",
  },
  {
    id: "5",
    title: "Clinical Trial for New Diabetes Treatment",
    fundingAgency: "Diabetes Research Institute",
    amount: "$890,000",
    submittedDate: "2023-10-22",
    status: "under review",
  },
];

const completedGrants = [
  {
    id: "6",
    title: "Cardiovascular Health in Urban Populations",
    fundingAgency: "Heart and Health Foundation",
    amount: "$320,000",
    startDate: "2020-05-01",
    endDate: "2023-04-30",
    status: "completed",
    outcome: "Published",
  },
  {
    id: "7",
    title: "Neurological Impacts of COVID-19",
    fundingAgency: "Emergency Research Fund",
    amount: "$215,000",
    startDate: "2021-01-10",
    endDate: "2023-01-09",
    status: "completed",
    outcome: "Final Report Submitted",
  },
];

const MyGrants = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  
  const filteredActiveGrants = activeGrants.filter(grant => 
    grant.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    grant.fundingAgency.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredPendingGrants = pendingGrants.filter(grant => 
    grant.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    grant.fundingAgency.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredCompletedGrants = completedGrants.filter(grant => 
    grant.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    grant.fundingAgency.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Grants</h1>
          <Button asChild>
            <Link to="/dashboard/grants/new">
              <Plus className="mr-2 h-4 w-4" /> New Grant Proposal
            </Link>
          </Button>
        </div>
        
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search grants by title or funding agency..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <Tabs defaultValue="active" className="space-y-4">
          <TabsList>
            <TabsTrigger value="active">Active Grants</TabsTrigger>
            <TabsTrigger value="pending">Pending Proposals</TabsTrigger>
            <TabsTrigger value="completed">Completed Grants</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active">
            <Card>
              <CardHeader>
                <CardTitle>Active Grants</CardTitle>
                <CardDescription>
                  Currently funded research projects that are in progress.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Project Title</TableHead>
                      <TableHead>Funding Agency</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Timeline</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredActiveGrants.length > 0 ? (
                      filteredActiveGrants.map((grant) => (
                        <TableRow key={grant.id}>
                          <TableCell className="font-medium">{grant.title}</TableCell>
                          <TableCell>{grant.fundingAgency}</TableCell>
                          <TableCell>{grant.amount}</TableCell>
                          <TableCell>
                            {new Date(grant.startDate).toLocaleDateString()} - {new Date(grant.endDate).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <Badge variant={
                              grant.progress === "On Track" ? "outline" :
                              grant.progress === "Ahead" ? "success" : "destructive"
                            }>
                              {grant.progress}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" asChild>
                              <Link to={`/dashboard/grants/${grant.id}`}>
                                <FileText className="h-4 w-4 mr-2" /> View
                              </Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-4">
                          No active grants found matching your search.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="pending">
            <Card>
              <CardHeader>
                <CardTitle>Pending Proposals</CardTitle>
                <CardDescription>
                  Grant proposals that have been submitted and are awaiting decision.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Project Title</TableHead>
                      <TableHead>Funding Agency</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Submitted Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPendingGrants.length > 0 ? (
                      filteredPendingGrants.map((grant) => (
                        <TableRow key={grant.id}>
                          <TableCell className="font-medium">{grant.title}</TableCell>
                          <TableCell>{grant.fundingAgency}</TableCell>
                          <TableCell>{grant.amount}</TableCell>
                          <TableCell>{new Date(grant.submittedDate).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Badge variant="secondary">Under Review</Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" asChild>
                              <Link to={`/dashboard/grants/${grant.id}`}>
                                <FileText className="h-4 w-4 mr-2" /> View
                              </Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-4">
                          No pending proposals found matching your search.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="completed">
            <Card>
              <CardHeader>
                <CardTitle>Completed Grants</CardTitle>
                <CardDescription>
                  Past research projects that have been completed.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Project Title</TableHead>
                      <TableHead>Funding Agency</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Timeline</TableHead>
                      <TableHead>Outcome</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCompletedGrants.length > 0 ? (
                      filteredCompletedGrants.map((grant) => (
                        <TableRow key={grant.id}>
                          <TableCell className="font-medium">{grant.title}</TableCell>
                          <TableCell>{grant.fundingAgency}</TableCell>
                          <TableCell>{grant.amount}</TableCell>
                          <TableCell>
                            {new Date(grant.startDate).toLocaleDateString()} - {new Date(grant.endDate).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{grant.outcome}</Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" asChild>
                              <Link to={`/dashboard/grants/${grant.id}`}>
                                <FileText className="h-4 w-4 mr-2" /> View
                              </Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-4">
                          No completed grants found matching your search.
                        </TableCell>
                      </TableRow>
                    )}
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

export default MyGrants;
