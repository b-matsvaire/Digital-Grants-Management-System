
import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BarChart, Calendar, Download, FileText, Filter, PieChart } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell } from "recharts";

// Sample data for demonstration
const recentReports = [
  {
    id: "1",
    title: "Q3 2023 Progress Report - Cancer Biomarkers",
    type: "Quarterly",
    date: "2023-10-05",
    status: "Submitted",
    project: "Novel Biomarkers for Early Cancer Detection",
  },
  {
    id: "2",
    title: "Mid-Term Evaluation - Immunotherapy Study",
    type: "Mid-Term",
    date: "2023-09-15",
    status: "Draft",
    project: "Immunotherapy Response in Pediatric Patients",
  },
  {
    id: "3",
    title: "Financial Summary - Machine Learning Project",
    type: "Financial",
    date: "2023-08-22",
    status: "Submitted",
    project: "Machine Learning in Precision Medicine",
  },
  {
    id: "4",
    title: "Annual Report - Cardiovascular Health Study",
    type: "Annual",
    date: "2023-07-10",
    status: "Approved",
    project: "Cardiovascular Health in Urban Populations",
  },
  {
    id: "5",
    title: "Close-out Report - COVID-19 Neurological Study",
    type: "Close-out",
    date: "2023-01-30",
    status: "Approved",
    project: "Neurological Impacts of COVID-19",
  },
];

const fundingData = [
  { name: 'Q1 2023', amount: 420000 },
  { name: 'Q2 2023', amount: 630000 },
  { name: 'Q3 2023', amount: 510000 },
  { name: 'Q4 2023', amount: 780000 },
];

const projectDistributionData = [
  { name: 'Cancer Research', value: 45 },
  { name: 'Immunology', value: 25 },
  { name: 'Neuroscience', value: 15 },
  { name: 'Cardiology', value: 10 },
  { name: 'Other', value: 5 },
];

const COLORS = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c'];

const Reports = () => {
  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Reports</h1>
          <Button>
            <FileText className="mr-2 h-4 w-4" /> Generate New Report
          </Button>
        </div>
        
        <Tabs defaultValue="recent" className="space-y-6">
          <TabsList>
            <TabsTrigger value="recent">Recent Reports</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="recent">
            <Card>
              <CardHeader>
                <CardTitle>Recent Reports</CardTitle>
                <CardDescription>
                  View and manage reports for your research projects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[180px]">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Filter by type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                        <SelectItem value="midterm">Mid-Term</SelectItem>
                        <SelectItem value="annual">Annual</SelectItem>
                        <SelectItem value="closeout">Close-out</SelectItem>
                        <SelectItem value="financial">Financial</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[180px]">
                        <Calendar className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Filter by date" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Time</SelectItem>
                        <SelectItem value="30days">Last 30 Days</SelectItem>
                        <SelectItem value="90days">Last 90 Days</SelectItem>
                        <SelectItem value="year">This Year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Report Title</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Project</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">{report.title}</TableCell>
                        <TableCell>{report.type}</TableCell>
                        <TableCell>{new Date(report.date).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            report.status === "Approved" ? "bg-green-100 text-green-800" :
                            report.status === "Submitted" ? "bg-blue-100 text-blue-800" :
                            "bg-amber-100 text-amber-800"
                          }`}>
                            {report.status}
                          </span>
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate" title={report.project}>
                          {report.project}
                        </TableCell>
                        <TableCell className="space-x-2">
                          <Button variant="ghost" size="sm">
                            <FileText className="h-4 w-4 mr-2" /> View
                          </Button>
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
          
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Funding Distribution by Quarter</CardTitle>
                  <CardDescription>
                    Total grant funding received by quarter
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart
                      data={fundingData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value) => [`$${value.toLocaleString()}`, 'Amount']}
                      />
                      <Legend />
                      <Bar dataKey="amount" fill="#8884d8" name="Funding Amount ($)" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Project Distribution by Field</CardTitle>
                  <CardDescription>
                    Breakdown of research projects by field
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={projectDistributionData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {projectDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card className="md:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Reports Summary</CardTitle>
                    <CardDescription>
                      Overview of report submissions and status
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" /> Export CSV
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-6 flex flex-col items-center justify-center">
                        <span className="text-4xl font-bold text-green-500">12</span>
                        <span className="text-sm text-muted-foreground mt-2">Approved Reports</span>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-6 flex flex-col items-center justify-center">
                        <span className="text-4xl font-bold text-blue-500">8</span>
                        <span className="text-sm text-muted-foreground mt-2">Pending Review</span>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-6 flex flex-col items-center justify-center">
                        <span className="text-4xl font-bold text-amber-500">5</span>
                        <span className="text-sm text-muted-foreground mt-2">Due This Month</span>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
