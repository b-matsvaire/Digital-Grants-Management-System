
import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FileText, BookOpen, Video, FileQuestion, Download, Calendar, Search, Tag, Clock, Book, Database } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

const Resources = () => {
  const { toast } = useToast();
  const [registeredWebinars, setRegisteredWebinars] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  const resourceCategories = [
    {
      icon: <FileText className="h-6 w-6 text-[#DC2626]" />,
      title: "Grant Application Guides",
      description: "Step-by-step guides to help you prepare successful grant applications",
      items: [
        { title: "How to Write a Compelling Research Proposal", link: "#", fileType: "PDF" },
        { title: "Budgeting for Research Projects", link: "#", fileType: "XLSX" },
        { title: "Crafting Effective Project Timelines", link: "#", fileType: "PDF" },
        { title: "Writing Clear Research Objectives", link: "#", fileType: "PDF" },
      ]
    },
    {
      icon: <BookOpen className="h-6 w-6 text-[#DC2626]" />,
      title: "Templates & Examples",
      description: "Download ready-to-use templates and sample documents",
      items: [
        { title: "Budget Template", link: "#", fileType: "XLSX" },
        { title: "Progress Report Template", link: "#", fileType: "DOCX" },
        { title: "Sample Grant Proposal", link: "#", fileType: "PDF" },
        { title: "Research Plan Template", link: "#", fileType: "DOCX" },
      ]
    },
    {
      icon: <Video className="h-6 w-6 text-[#DC2626]" />,
      title: "Video Tutorials",
      description: "Watch instructional videos on various aspects of grant management",
      items: [
        { title: "Navigating the Grants Portal", link: "#", fileType: "MP4" },
        { title: "Financial Reporting Tutorial", link: "#", fileType: "MP4" },
        { title: "Managing Research Teams", link: "#", fileType: "MP4" },
        { title: "IP Management Basics", link: "#", fileType: "MP4" },
      ]
    },
    {
      icon: <FileQuestion className="h-6 w-6 text-[#DC2626]" />,
      title: "FAQs & Knowledge Base",
      description: "Find answers to commonly asked questions about grants and research",
      items: [
        { title: "Eligibility Requirements", link: "#", fileType: "PDF" },
        { title: "Application Review Process", link: "#", fileType: "PDF" },
        { title: "Reporting Requirements", link: "#", fileType: "PDF" },
        { title: "Financial Guidelines", link: "#", fileType: "PDF" },
      ]
    },
    {
      icon: <Database className="h-6 w-6 text-[#DC2626]" />,
      title: "Financial Management",
      description: "Resources for managing project budgets and financial reporting",
      items: [
        { title: "Budget Tracking Template", link: "#", fileType: "XLSX" },
        { title: "Expense Report Form", link: "#", fileType: "XLSX" },
        { title: "Financial Compliance Guidelines", link: "#", fileType: "PDF" },
        { title: "Procurement Process Flowchart", link: "#", fileType: "PDF" },
      ]
    },
    {
      icon: <Tag className="h-6 w-6 text-[#DC2626]" />,
      title: "IP & Publication Resources",
      description: "Guides for managing intellectual property and publications",
      items: [
        { title: "Patent Application Process", link: "#", fileType: "PDF" },
        { title: "Copyright Registration Guide", link: "#", fileType: "PDF" },
        { title: "Journal Publication Checklist", link: "#", fileType: "PDF" },
        { title: "Conference Presentation Template", link: "#", fileType: "PPTX" },
      ]
    },
    {
      icon: <Clock className="h-6 w-6 text-[#DC2626]" />,
      title: "Project Management",
      description: "Tools to help track project progress and deadlines",
      items: [
        { title: "Project Timeline Template", link: "#", fileType: "XLSX" },
        { title: "Progress Report Template", link: "#", fileType: "DOCX" },
        { title: "Team Collaboration Guide", link: "#", fileType: "PDF" },
        { title: "Milestone Tracking Sheet", link: "#", fileType: "XLSX" },
      ]
    },
    {
      icon: <Book className="h-6 w-6 text-[#DC2626]" />,
      title: "Student Participation",
      description: "Guidelines and forms for student involvement in research",
      items: [
        { title: "Student Research Agreement", link: "#", fileType: "DOCX" },
        { title: "Student Progress Report Template", link: "#", fileType: "DOCX" },
        { title: "Research Student Mentoring Guide", link: "#", fileType: "PDF" },
        { title: "Student Publication Guidelines", link: "#", fileType: "PDF" },
      ]
    },
  ];

  const webinars = [
    {
      id: "1",
      date: "June 15, 2023",
      time: "2:00 PM",
      title: "Grant Writing Masterclass",
      description: "Learn the art of crafting compelling research proposals that stand out to reviewers."
    },
    {
      id: "2",
      date: "June 22, 2023",
      time: "10:00 AM",
      title: "Financial Management for Researchers",
      description: "Essential financial skills for managing research budgets and reporting requirements."
    },
    {
      id: "3",
      date: "July 5, 2023",
      time: "3:00 PM",
      title: "IP Rights in Research Projects",
      description: "Understanding intellectual property rights and protection in research outcomes."
    },
    {
      id: "4",
      date: "July 12, 2023",
      time: "1:00 PM",
      title: "Efficient Project Progress Tracking",
      description: "Learn how to track project milestones and generate comprehensive progress reports."
    },
    {
      id: "5",
      date: "July 19, 2023",
      time: "11:00 AM",
      title: "Student Research Mentorship",
      description: "Best practices for involving and mentoring students in research projects."
    },
    {
      id: "6",
      date: "July 26, 2023",
      time: "2:00 PM",
      title: "Research Publication Strategies",
      description: "Strategies for publishing research findings in high-impact journals."
    }
  ];
  
  const handleDownload = (item: { title: string, fileType: string }) => {
    toast({
      title: "Download Started",
      description: `${item.title} is being downloaded.`,
    });
  };
  
  const handleRegister = (webinarId: string, webinarTitle: string) => {
    if (registeredWebinars.includes(webinarId)) {
      setRegisteredWebinars(registeredWebinars.filter(id => id !== webinarId));
      toast({
        title: "Registration Cancelled",
        description: `You have cancelled your registration for "${webinarTitle}".`,
      });
    } else {
      setRegisteredWebinars([...registeredWebinars, webinarId]);
      toast({
        title: "Registration Successful",
        description: `You have been registered for "${webinarTitle}". Check your email for details.`,
      });
    }
  };

  const filteredResources = resourceCategories.filter(category => 
    category.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    category.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.items.some(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredWebinars = webinars.filter(webinar => 
    webinar.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    webinar.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="bg-secondary py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-6">Grant Resources & Tools</h1>
              <p className="text-lg text-muted-foreground">
                Access comprehensive guides, templates, and training materials to support your grant journey
              </p>
              <div className="mt-8 max-w-md mx-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input 
                    type="text" 
                    placeholder="Search resources..." 
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Tabs Navigation */}
        <section className="py-8 bg-background">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="resources" className="w-full">
              <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-2">
                <TabsTrigger value="resources">Resource Library</TabsTrigger>
                <TabsTrigger value="webinars">Upcoming Webinars</TabsTrigger>
              </TabsList>
              
              {/* Resources Tab Content */}
              <TabsContent value="resources" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredResources.length > 0 ? (
                    filteredResources.map((category, index) => (
                      <div key={index} className="bg-white border border-border rounded-lg shadow-soft p-6">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="h-12 w-12 rounded-full bg-[#DC2626]/10 flex items-center justify-center">
                            {category.icon}
                          </div>
                          <h3 className="text-xl font-semibold">{category.title}</h3>
                        </div>
                        <p className="text-muted-foreground mb-6">{category.description}</p>
                        <ul className="space-y-3">
                          {category.items.map((item, itemIndex) => (
                            <li key={itemIndex}>
                              <button 
                                onClick={() => handleDownload(item)}
                                className="w-full flex items-center justify-between p-3 border border-border rounded-md hover:bg-secondary/50 transition-colors"
                              >
                                <span>{item.title}</span>
                                <Download className="h-4 w-4 text-muted-foreground" />
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-16">
                      <FileQuestion className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-xl font-medium">No resources found matching your search.</p>
                      <p className="text-muted-foreground mt-2">Try adjusting your search terms or browse all resources.</p>
                      <Button className="mt-4" onClick={() => setSearchTerm("")}>View All Resources</Button>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              {/* Webinars Tab Content */}
              <TabsContent value="webinars" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredWebinars.length > 0 ? (
                    filteredWebinars.map((webinar) => (
                      <div key={webinar.id} className="bg-white p-6 rounded-lg shadow-soft">
                        <div className="text-[#DC2626] font-semibold mb-2">{webinar.date} • {webinar.time}</div>
                        <h3 className="text-xl font-semibold mb-3">{webinar.title}</h3>
                        <p className="text-muted-foreground mb-4">
                          {webinar.description}
                        </p>
                        <Button 
                          className={`w-full ${registeredWebinars.includes(webinar.id) 
                            ? 'bg-green-600 hover:bg-green-700' 
                            : 'bg-[#DC2626] hover:bg-[#b91c1c]'} text-white`}
                          onClick={() => handleRegister(webinar.id, webinar.title)}
                        >
                          {registeredWebinars.includes(webinar.id) ? 'Registered' : 'Register Now'}
                        </Button>
                        <div className="mt-3 text-sm text-center">
                          <Calendar className="inline-block h-4 w-4 mr-1" />
                          <span>Add to calendar</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-16">
                      <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-xl font-medium">No webinars found matching your search.</p>
                      <p className="text-muted-foreground mt-2">Try adjusting your search terms or browse all webinars.</p>
                      <Button className="mt-4" onClick={() => setSearchTerm("")}>View All Webinars</Button>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        {/* Feature Highlight Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Key Features of Our Grants Management System</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-primary-foreground/10 p-6 rounded-lg backdrop-blur-sm">
                <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Grant Submission</h3>
                <p className="text-primary-foreground/80">
                  Submit grant proposals online with intuitive forms that ensure all requirements are met.
                </p>
              </div>
              
              <div className="bg-primary-foreground/10 p-6 rounded-lg backdrop-blur-sm">
                <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center mb-4">
                  <Database className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Financial Management</h3>
                <p className="text-primary-foreground/80">
                  Monitor project budgets, track procurement, and link financial data to specific awards.
                </p>
              </div>
              
              <div className="bg-primary-foreground/10 p-6 rounded-lg backdrop-blur-sm">
                <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Project Tracking</h3>
                <p className="text-primary-foreground/80">
                  Track project progress, generate reports, and monitor milestones through an intuitive dashboard.
                </p>
              </div>
              
              <div className="bg-primary-foreground/10 p-6 rounded-lg backdrop-blur-sm">
                <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center mb-4">
                  <Tag className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">IP Tracking</h3>
                <p className="text-primary-foreground/80">
                  Maintain records of intellectual property including patents, copyrights, and trademarks.
                </p>
              </div>
              
              <div className="bg-primary-foreground/10 p-6 rounded-lg backdrop-blur-sm">
                <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center mb-4">
                  <Book className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Student Participation</h3>
                <p className="text-primary-foreground/80">
                  Record and manage student involvement in research projects, from recruitment to completion.
                </p>
              </div>
              
              <div className="bg-primary-foreground/10 p-6 rounded-lg backdrop-blur-sm">
                <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Deadline Tracking</h3>
                <p className="text-primary-foreground/80">
                  Receive automated reminders for important deadlines and project milestones.
                </p>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <Link to="/sign-up">
                <Button size="lg" variant="secondary">
                  Get Started Now
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Resources;
