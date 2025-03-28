import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  File, 
  FileText, 
  FileImage, 
  FileCode, 
  FileSpreadsheet,
  X,
  Upload
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";

const documents = [
  {
    id: "1",
    name: "Research Protocol - Cancer Biomarkers Study",
    type: "Protocol",
    format: "PDF",
    size: "2.4 MB",
    uploadDate: "2023-01-15",
    project: "Novel Biomarkers for Early Cancer Detection",
    uploader: "Dr. Sarah Johnson",
  },
  {
    id: "2",
    name: "IRB Approval - Immunotherapy Study",
    type: "Approval",
    format: "PDF",
    size: "0.8 MB",
    uploadDate: "2023-02-22",
    project: "Immunotherapy Response in Pediatric Patients",
    uploader: "Dr. Michael Chen",
  },
  {
    id: "3",
    name: "Q1 2023 Progress Report - Machine Learning Project",
    type: "Report",
    format: "DOCX",
    size: "1.5 MB",
    uploadDate: "2023-04-10",
    project: "Machine Learning in Precision Medicine",
    uploader: "Dr. Emily Williams",
  },
  {
    id: "4",
    name: "Budget Summary - Cardiovascular Health Study",
    type: "Financial",
    format: "XLSX",
    size: "0.7 MB",
    uploadDate: "2023-03-05",
    project: "Cardiovascular Health in Urban Populations",
    uploader: "Dr. Kevin Davis",
  },
  {
    id: "5",
    name: "Dataset - COVID-19 Neurological Study",
    type: "Data",
    format: "CSV",
    size: "5.2 MB",
    uploadDate: "2023-02-18",
    project: "Neurological Impacts of COVID-19",
    uploader: "Dr. Robert Martinez",
  },
  {
    id: "6",
    name: "Consent Forms - Cancer Biomarkers Study",
    type: "Legal",
    format: "PDF",
    size: "1.1 MB",
    uploadDate: "2023-01-10",
    project: "Novel Biomarkers for Early Cancer Detection",
    uploader: "Dr. Sarah Johnson",
  },
  {
    id: "7",
    name: "MRI Scans - COVID-19 Neurological Study",
    type: "Image",
    format: "ZIP",
    size: "120 MB",
    uploadDate: "2023-02-25",
    project: "Neurological Impacts of COVID-19",
    uploader: "Dr. Robert Martinez",
  },
];

const Documents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [documentName, setDocumentName] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();
  
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = 
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.uploader.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === "all" || doc.type.toLowerCase() === filterType.toLowerCase();
    
    return matchesSearch && matchesType;
  });
  
  const getFileIcon = (format: string) => {
    switch (format.toLowerCase()) {
      case 'pdf':
        return <FileCode className="h-4 w-4 text-red-500" />;
      case 'docx':
        return <FileText className="h-4 w-4 text-blue-500" />;
      case 'xlsx':
      case 'csv':
        return <FileSpreadsheet className="h-4 w-4 text-green-500" />;
      case 'zip':
      case 'jpg':
      case 'png':
        return <FileImage className="h-4 w-4 text-purple-500" />;
      default:
        return <File className="h-4 w-4 text-gray-500" />;
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Document Uploaded",
      description: `${documentName} has been successfully uploaded.`,
    });
    
    setDocumentName("");
    setDocumentType("");
    setProjectName("");
    setDescription("");
    setSelectedFile(null);
    setIsUploadDialogOpen(false);
  };
  
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
                <BreadcrumbPage>Documents</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Documents</h1>
          <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Upload Document
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Upload New Document</DialogTitle>
                <DialogDescription>
                  Upload a document to the research repository. Fill in the details below.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleUploadSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Document Name
                    </Label>
                    <Input
                      id="name"
                      className="col-span-3"
                      value={documentName}
                      onChange={(e) => setDocumentName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="type" className="text-right">
                      Document Type
                    </Label>
                    <Select value={documentType} onValueChange={setDocumentType} required>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="protocol">Protocol</SelectItem>
                        <SelectItem value="approval">Approval</SelectItem>
                        <SelectItem value="report">Report</SelectItem>
                        <SelectItem value="financial">Financial</SelectItem>
                        <SelectItem value="data">Data</SelectItem>
                        <SelectItem value="legal">Legal</SelectItem>
                        <SelectItem value="image">Image</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="project" className="text-right">
                      Project
                    </Label>
                    <Input
                      id="project"
                      className="col-span-3"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label htmlFor="description" className="text-right pt-2">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      className="col-span-3"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="file" className="text-right">
                      File
                    </Label>
                    <div className="col-span-3">
                      <Input
                        id="file"
                        type="file"
                        onChange={handleFileChange}
                        required
                      />
                      {selectedFile && (
                        <p className="text-sm mt-2 flex items-center">
                          <span className="truncate max-w-[250px]">
                            {selectedFile.name}
                          </span>
                          <span className="ml-2 text-gray-500">
                            ({Math.round(selectedFile.size / 1024)} KB)
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="ml-2 h-6 w-6 p-0"
                            onClick={() => setSelectedFile(null)}
                            type="button"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    <Upload className="mr-2 h-4 w-4" /> Upload
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search documents by name, project, or uploader..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="protocol">Protocols</SelectItem>
                  <SelectItem value="approval">Approvals</SelectItem>
                  <SelectItem value="report">Reports</SelectItem>
                  <SelectItem value="financial">Financial</SelectItem>
                  <SelectItem value="data">Data</SelectItem>
                  <SelectItem value="legal">Legal</SelectItem>
                  <SelectItem value="image">Images</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Document Repository</CardTitle>
            <CardDescription>
              Access and manage documents related to research projects
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Upload Date</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Uploader</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocuments.length > 0 ? (
                  filteredDocuments.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {getFileIcon(doc.format)}
                          <span className="max-w-[250px] truncate" title={doc.name}>
                            {doc.name}
                          </span>
                          <Badge variant="outline" className="ml-1">{doc.format}</Badge>
                        </div>
                      </TableCell>
                      <TableCell>{doc.type}</TableCell>
                      <TableCell>{doc.size}</TableCell>
                      <TableCell>{new Date(doc.uploadDate).toLocaleDateString()}</TableCell>
                      <TableCell className="max-w-[200px] truncate" title={doc.project}>
                        {doc.project}
                      </TableCell>
                      <TableCell>{doc.uploader}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4 mr-2" /> Download
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6">
                      No documents found matching your search.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Documents;
