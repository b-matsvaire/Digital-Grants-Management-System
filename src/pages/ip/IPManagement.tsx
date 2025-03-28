import React from "react";
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
import { Plus, Search, Copyright, FileText, BookMarked } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const patents = [
  {
    id: "1",
    title: "Method for Early Detection of Cancer Using Novel Biomarkers",
    inventors: "Johnson S, Chen M, Williams E",
    filingDate: "2023-05-15",
    status: "Pending",
    applicationNumber: "US2023/012345",
    project: "Novel Biomarkers for Early Cancer Detection",
  },
  {
    id: "2",
    title: "Immunotherapy Delivery System for Pediatric Patients",
    inventors: "Smith A, Brown B",
    filingDate: "2022-11-30",
    status: "Granted",
    applicationNumber: "US2022/098765",
    project: "Immunotherapy Response in Pediatric Patients",
  },
  {
    id: "3",
    title: "AI-Based Predictive Algorithm for Treatment Response",
    inventors: "Williams E, Taylor R",
    filingDate: "2023-02-10",
    status: "Provisional",
    applicationNumber: "US2023/054321",
    project: "Machine Learning in Precision Medicine",
  },
];

const copyrights = [
  {
    id: "1",
    title: "Cancer Biomarker Database Software",
    authors: "Taylor R, Lopez J",
    registrationDate: "2023-04-20",
    registrationNumber: "TXu-2-345-678",
    project: "Novel Biomarkers for Early Cancer Detection",
  },
  {
    id: "2",
    title: "Clinical Data Analysis Toolkit",
    authors: "Williams E, Davis K",
    registrationDate: "2022-10-05",
    registrationNumber: "TXu-2-123-456",
    project: "Machine Learning in Precision Medicine",
  },
];

const trademarks = [
  {
    id: "1",
    mark: "BioDetect",
    registrationDate: "2023-03-10",
    registrationNumber: "5,987,654",
    class: "Class 42: Scientific and technological services",
    project: "Novel Biomarkers for Early Cancer Detection",
  },
  {
    id: "2",
    mark: "ImmunoKid",
    registrationDate: "2022-08-15",
    registrationNumber: "5,876,543",
    class: "Class 5: Pharmaceuticals",
    project: "Immunotherapy Response in Pediatric Patients",
  },
];

const IPManagement = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  
  const filteredPatents = patents.filter(patent => 
    patent.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patent.inventors.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patent.project.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredCopyrights = copyrights.filter(copyright => 
    copyright.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    copyright.authors.toLowerCase().includes(searchTerm.toLowerCase()) ||
    copyright.project.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredTrademarks = trademarks.filter(trademark => 
    trademark.mark.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trademark.project.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
        <div className="mb-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Intellectual Property</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Intellectual Property Management</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Register New IP
          </Button>
        </div>
        
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search IP by title, inventor, mark, or project..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <FileText className="mr-2 h-4 w-4" /> Export
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="patents" className="space-y-6">
          <TabsList>
            <TabsTrigger value="patents">Patents</TabsTrigger>
            <TabsTrigger value="copyrights">Copyrights</TabsTrigger>
            <TabsTrigger value="trademarks">Trademarks</TabsTrigger>
          </TabsList>
          
          <TabsContent value="patents">
            <Card>
              <CardHeader>
                <CardTitle>Patents</CardTitle>
                <CardDescription>
                  Patent applications and granted patents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Inventors</TableHead>
                      <TableHead>Filing Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Application #</TableHead>
                      <TableHead>Project</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPatents.length > 0 ? (
                      filteredPatents.map((patent) => (
                        <TableRow key={patent.id}>
                          <TableCell className="font-medium">{patent.title}</TableCell>
                          <TableCell>{patent.inventors}</TableCell>
                          <TableCell>{new Date(patent.filingDate).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Badge variant={
                              patent.status === "Granted" ? "success" :
                              patent.status === "Pending" ? "outline" : "secondary"
                            }>
                              {patent.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{patent.applicationNumber}</TableCell>
                          <TableCell className="max-w-[200px] truncate" title={patent.project}>
                            {patent.project}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-6">
                          No patents found matching your search.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="copyrights">
            <Card>
              <CardHeader>
                <CardTitle>Copyrights</CardTitle>
                <CardDescription>
                  Registered copyrights for software, publications, and other works
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Authors</TableHead>
                      <TableHead>Registration Date</TableHead>
                      <TableHead>Registration #</TableHead>
                      <TableHead>Project</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCopyrights.length > 0 ? (
                      filteredCopyrights.map((copyright) => (
                        <TableRow key={copyright.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center">
                              <Copyright className="h-4 w-4 mr-2 text-muted-foreground" />
                              {copyright.title}
                            </div>
                          </TableCell>
                          <TableCell>{copyright.authors}</TableCell>
                          <TableCell>{new Date(copyright.registrationDate).toLocaleDateString()}</TableCell>
                          <TableCell>{copyright.registrationNumber}</TableCell>
                          <TableCell className="max-w-[200px] truncate" title={copyright.project}>
                            {copyright.project}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-6">
                          No copyrights found matching your search.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="trademarks">
            <Card>
              <CardHeader>
                <CardTitle>Trademarks</CardTitle>
                <CardDescription>
                  Registered trademarks and service marks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Mark</TableHead>
                      <TableHead>Registration Date</TableHead>
                      <TableHead>Registration #</TableHead>
                      <TableHead>Class</TableHead>
                      <TableHead>Project</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTrademarks.length > 0 ? (
                      filteredTrademarks.map((trademark) => (
                        <TableRow key={trademark.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center">
                              <BookMarked className="h-4 w-4 mr-2 text-muted-foreground" />
                              {trademark.mark}
                            </div>
                          </TableCell>
                          <TableCell>{new Date(trademark.registrationDate).toLocaleDateString()}</TableCell>
                          <TableCell>{trademark.registrationNumber}</TableCell>
                          <TableCell>{trademark.class}</TableCell>
                          <TableCell className="max-w-[200px] truncate" title={trademark.project}>
                            {trademark.project}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-6">
                          No trademarks found matching your search.
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

export default IPManagement;
