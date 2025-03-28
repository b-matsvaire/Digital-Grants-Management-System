
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
  UserPlus, 
  FileText, 
  GraduationCap, 
  Users
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

// Sample student data
const students = [
  {
    id: "1",
    name: "Emma Wilson",
    studentId: "ST20210034",
    level: "PhD",
    projectTitle: "Novel Biomarkers for Early Cancer Detection",
    role: "Research Assistant",
    supervisor: "Dr. Sarah Johnson",
    startDate: "2022-09-01",
    endDate: "2025-08-31",
    status: "active"
  },
  {
    id: "2",
    name: "Michael Lee",
    studentId: "ST20220015",
    level: "Masters",
    projectTitle: "Immunotherapy Response in Pediatric Patients",
    role: "Data Analyst",
    supervisor: "Dr. Michael Chen",
    startDate: "2022-01-15",
    endDate: "2023-12-31",
    status: "active"
  },
  {
    id: "3",
    name: "Jessica Kumar",
    studentId: "ST20190022",
    level: "PhD",
    projectTitle: "Machine Learning in Precision Medicine",
    role: "Co-Investigator",
    supervisor: "Dr. Emily Williams",
    startDate: "2019-09-01",
    endDate: "2023-08-31",
    status: "completed"
  },
  {
    id: "4",
    name: "Thomas Rodriguez",
    studentId: "ST20210056",
    level: "Undergraduate",
    projectTitle: "Cardiovascular Health in Urban Populations",
    role: "Research Intern",
    supervisor: "Dr. Kevin Davis",
    startDate: "2023-05-15",
    endDate: "2023-08-15",
    status: "completed"
  },
  {
    id: "5",
    name: "Sophia Wang",
    studentId: "ST20220078",
    level: "PhD",
    projectTitle: "Neurological Impacts of COVID-19",
    role: "Research Assistant",
    supervisor: "Dr. Robert Martinez",
    startDate: "2022-09-01",
    endDate: "2025-08-31",
    status: "active"
  }
];

const StudentParticipation = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [level, setLevel] = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const [role, setRole] = useState("");
  const [supervisor, setSupervisor] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { toast } = useToast();
  
  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.projectTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.supervisor.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || student.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here we would typically add the student to the database
    // For now, we'll just show a success message
    
    toast({
      title: "Student Added",
      description: `${studentName} has been successfully added to the project.`,
    });
    
    // Reset form fields
    setStudentName("");
    setStudentId("");
    setLevel("");
    setProjectTitle("");
    setRole("");
    setSupervisor("");
    setStartDate("");
    setEndDate("");
    setIsAddDialogOpen(false);
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
                <BreadcrumbPage>Student Participation</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Student Participation</h1>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" /> Add Student
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Add New Student</DialogTitle>
                <DialogDescription>
                  Add a student to a research project. Fill in the details below.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Student Name
                    </Label>
                    <Input
                      id="name"
                      className="col-span-3"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="studentId" className="text-right">
                      Student ID
                    </Label>
                    <Input
                      id="studentId"
                      className="col-span-3"
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="level" className="text-right">
                      Study Level
                    </Label>
                    <Select value={level} onValueChange={setLevel} required>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="undergraduate">Undergraduate</SelectItem>
                        <SelectItem value="masters">Masters</SelectItem>
                        <SelectItem value="phd">PhD</SelectItem>
                        <SelectItem value="postdoc">Post-Doctoral</SelectItem>
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
                      value={projectTitle}
                      onChange={(e) => setProjectTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="role" className="text-right">
                      Role
                    </Label>
                    <Input
                      id="role"
                      className="col-span-3"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="supervisor" className="text-right">
                      Supervisor
                    </Label>
                    <Input
                      id="supervisor"
                      className="col-span-3"
                      value={supervisor}
                      onChange={(e) => setSupervisor(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="startDate" className="text-right">
                      Start Date
                    </Label>
                    <Input
                      id="startDate"
                      type="date"
                      className="col-span-3"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="endDate" className="text-right">
                      End Date
                    </Label>
                    <Input
                      id="endDate"
                      type="date"
                      className="col-span-3"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    <Plus className="mr-2 h-4 w-4" /> Add Student
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
                  placeholder="Search students by name, ID, project, or supervisor..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Students</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Student Participants</CardTitle>
            <CardDescription>
              Students currently or previously involved in research projects
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Supervisor</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <GraduationCap className="h-4 w-4 text-primary" />
                          <span>{student.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{student.studentId}</TableCell>
                      <TableCell>{student.level}</TableCell>
                      <TableCell className="max-w-[200px] truncate" title={student.projectTitle}>
                        {student.projectTitle}
                      </TableCell>
                      <TableCell>{student.role}</TableCell>
                      <TableCell>{student.supervisor}</TableCell>
                      <TableCell>
                        {new Date(student.startDate).toLocaleDateString()} - 
                        {student.endDate ? new Date(student.endDate).toLocaleDateString() : "Present"}
                      </TableCell>
                      <TableCell>
                        <Badge variant={student.status === "active" ? "outline" : "secondary"}>
                          {student.status === "active" ? "Active" : "Completed"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4 mr-2" /> View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-6">
                      No students found matching your search.
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

export default StudentParticipation;
