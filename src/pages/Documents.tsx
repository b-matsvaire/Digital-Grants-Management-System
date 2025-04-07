
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  FilePlus, 
  FileSearch, 
  Download, 
  Trash2, 
  Share2 
} from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

const Documents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const documents = [
    {
      id: 1,
      name: "Grant Application - Malaria Prevention.pdf",
      type: "PDF",
      size: "2.4 MB",
      category: "Grant Applications",
      uploadDate: "2025-01-15",
      uploadedBy: "Dr. Jane Smith",
    },
    {
      id: 2,
      name: "Quarterly Progress Report - Q1 2025.docx",
      type: "DOCX",
      size: "1.8 MB",
      category: "Progress Reports",
      uploadDate: "2025-04-05",
      uploadedBy: "Dr. Jane Smith",
    },
    {
      id: 3,
      name: "Budget Forecast 2025-2026.xlsx",
      type: "XLSX",
      size: "756 KB",
      category: "Financial Documents",
      uploadDate: "2025-03-22",
      uploadedBy: "Peter Anderson",
    },
    {
      id: 4,
      name: "Research Protocol - HIV Treatment Study.pdf",
      type: "PDF",
      size: "3.2 MB",
      category: "Research Protocols",
      uploadDate: "2025-02-10",
      uploadedBy: "Dr. John Johnson",
    },
    {
      id: 5,
      name: "MOU - Partner Organization.pdf",
      type: "PDF",
      size: "1.5 MB",
      category: "Legal Documents",
      uploadDate: "2025-01-30",
      uploadedBy: "Dr. Sarah Williams",
    }
  ];
  
  const filteredDocuments = documents.filter(doc => 
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const getFileIcon = (type: string) => {
    switch (type) {
      case "PDF":
        return <FileText className="w-5 h-5 text-red-500" />;
      case "DOCX":
        return <FileText className="w-5 h-5 text-blue-500" />;
      case "XLSX":
        return <FileText className="w-5 h-5 text-green-500" />;
      default:
        return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <DashboardLayout userRole="researcher">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Documents</h1>
          <Button className="flex items-center">
            <FilePlus className="mr-2 h-5 w-5" />
            Upload Document
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Document Repository</CardTitle>
            <CardDescription>
              Access and manage all documents related to your grants and research projects
            </CardDescription>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <div className="relative flex-1">
                <FileSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search documents..." 
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="grant-applications">Grant Applications</SelectItem>
                  <SelectItem value="progress-reports">Progress Reports</SelectItem>
                  <SelectItem value="financial-documents">Financial Documents</SelectItem>
                  <SelectItem value="research-protocols">Research Protocols</SelectItem>
                  <SelectItem value="legal-documents">Legal Documents</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-hidden rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[400px]">Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Uploaded</TableHead>
                    <TableHead>By</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocuments.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          {getFileIcon(doc.type)}
                          <span className="ml-2">{doc.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-muted/50">
                          {doc.category}
                        </Badge>
                      </TableCell>
                      <TableCell>{doc.size}</TableCell>
                      <TableCell>{new Date(doc.uploadDate).toLocaleDateString()}</TableCell>
                      <TableCell>{doc.uploadedBy}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end">
                          <Button variant="ghost" size="icon" title="Download">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" title="Share">
                            <Share2 className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" title="Delete">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Documents;
