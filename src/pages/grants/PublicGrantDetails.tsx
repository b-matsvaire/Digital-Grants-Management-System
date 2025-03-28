
import React from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
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
import { ArrowLeft, Calendar, Users, DollarSign, FileText, Clock } from "lucide-react";

// Sample data for demonstration - this would typically come from an API
const grantsData = {
  "1": {
    id: "1",
    title: "Clinical Research Innovation Grant",
    category: "Healthcare",
    deadline: "June 15, 2023",
    amount: "$50,000 - $150,000",
    description: "Supporting innovative approaches to clinical research methodologies.",
    eligibility: "Researchers with a Ph.D. or equivalent in relevant fields with at least 3 years of post-doctoral research experience.",
    requirements: [
      "Detailed research proposal (max 10 pages)",
      "Budget justification",
      "CV of principal investigator and key team members",
      "Letter of support from host institution",
      "Timeline with clear milestones"
    ],
    contactPerson: "Dr. Sarah Johnson",
    contactEmail: "grants@clinicalresearch.org",
    submissionProcess: "All applications must be submitted through our online portal by the deadline. Late submissions will not be considered.",
    reviewCriteria: [
      "Scientific merit and innovation (40%)",
      "Feasibility and methodology (30%)",
      "Investigator qualifications (15%)",
      "Potential impact (15%)"
    ],
    faqs: [
      {
        question: "Can international researchers apply?",
        answer: "Yes, but the research must be conducted at an accredited institution in Africa."
      },
      {
        question: "Is there a limit to the number of co-investigators?",
        answer: "No, but the roles of all team members should be clearly justified in the proposal."
      },
      {
        question: "Can I submit multiple applications?",
        answer: "Researchers can be the principal investigator on only one application per funding cycle, but may be co-investigators on other applications."
      }
    ]
  },
  "2": {
    id: "2",
    title: "Emerging Infectious Disease Research",
    category: "Public Health",
    deadline: "July 30, 2023",
    amount: "$75,000 - $250,000",
    description: "Research focused on prevention, diagnosis, and treatment of emerging infectious diseases.",
    eligibility: "Open to researchers at accredited institutions with expertise in infectious diseases, epidemiology, or related fields.",
    requirements: [
      "Research proposal (max 12 pages)",
      "Detailed budget",
      "Biosafety protocol",
      "CVs of all investigators",
      "Institutional approval letters"
    ],
    contactPerson: "Dr. Michael Chen",
    contactEmail: "infectious.grants@healthorg.org",
    submissionProcess: "Two-stage application process: initial concept note followed by full proposal for shortlisted applicants.",
    reviewCriteria: [
      "Public health significance (35%)",
      "Scientific approach (30%)",
      "Innovation (20%)",
      "Investigator experience (15%)"
    ],
    faqs: [
      {
        question: "Is preliminary data required?",
        answer: "Preliminary data is strongly encouraged but not mandatory for novel approaches."
      },
      {
        question: "What biosafety level is required?",
        answer: "Depends on the pathogen being studied. All applicable biosafety regulations must be followed."
      },
      {
        question: "Are collaborations with industry partners allowed?",
        answer: "Yes, but any conflicts of interest must be disclosed and managed appropriately."
      }
    ]
  },
  "3": {
    id: "3",
    title: "Healthcare Technology Development",
    category: "Technology",
    deadline: "August 22, 2023",
    amount: "$100,000 - $300,000",
    description: "Development of new technologies for healthcare delivery and patient care.",
    eligibility: "Open to multidisciplinary teams with expertise in both technology development and healthcare.",
    requirements: [
      "Technical proposal with proof-of-concept data",
      "Market analysis",
      "Development timeline",
      "IP strategy",
      "Team qualifications"
    ],
    contactPerson: "Dr. Emily Williams",
    contactEmail: "tech.grants@healthinnovation.org",
    submissionProcess: "Online submission with required attachments. Shortlisted applicants will be invited for a pitch presentation.",
    reviewCriteria: [
      "Technical innovation (30%)",
      "Clinical relevance (25%)",
      "Feasibility (20%)",
      "Team expertise (15%)",
      "Commercialization potential (10%)"
    ],
    faqs: [
      {
        question: "Is a working prototype required?",
        answer: "A proof-of-concept is required, but a fully working prototype is not necessary at the application stage."
      },
      {
        question: "Who will own the intellectual property?",
        answer: "IP ownership will remain with the grantee institution, subject to certain rights reserved by the funding organization."
      },
      {
        question: "Are follow-on funding opportunities available?",
        answer: "Successful projects may be eligible for phase II funding for commercialization activities."
      }
    ]
  },
  "4": {
    id: "4",
    title: "Community Health Initiatives",
    category: "Public Health",
    deadline: "September 10, 2023",
    amount: "$25,000 - $100,000",
    description: "Programs addressing health disparities and improving community health outcomes.",
    eligibility: "Community-based organizations, healthcare providers, and academic institutions with strong community partnerships.",
    requirements: [
      "Project proposal with clear objectives",
      "Community engagement plan",
      "Evaluation methodology",
      "Budget and timeline",
      "Letters of support from community partners"
    ],
    contactPerson: "Dr. Robert Taylor",
    contactEmail: "community.health@healthfoundation.org",
    submissionProcess: "Single-stage application process with all materials due by the deadline.",
    reviewCriteria: [
      "Community need and engagement (35%)",
      "Intervention approach (25%)",
      "Evaluation plan (20%)",
      "Sustainability (15%)",
      "Budget reasonableness (5%)"
    ],
    faqs: [
      {
        question: "Can funds be used for existing programs?",
        answer: "Yes, but the application should clearly explain how the funding will enhance or expand the existing program."
      },
      {
        question: "Is there a geographic focus?",
        answer: "Priority will be given to projects serving underserved communities in Africa."
      },
      {
        question: "Can multiple organizations apply together?",
        answer: "Yes, collaborative applications are encouraged, but one organization must be designated as the lead applicant."
      }
    ]
  }
};

const PublicGrantDetails = () => {
  const { id } = useParams<{ id: string }>();
  const grant = grantsData[id as keyof typeof grantsData];
  
  if (!grant) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 pt-24">
          <div className="container mx-auto py-8">
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-4">Grant Not Found</h2>
              <p className="mb-6">The grant you're looking for doesn't exist or may have been removed.</p>
              <Button asChild>
                <Link to="/grants">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Grants
                </Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 pt-24">
        <div className="container mx-auto py-8">
          <div className="mb-6">
            <Link to="/grants" className="text-muted-foreground hover:text-foreground flex items-center text-sm mb-4">
              <ArrowLeft className="mr-1 h-4 w-4" /> Back to Available Grants
            </Link>
            
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold">{grant.title}</h1>
                <div className="flex items-center gap-3 mt-2">
                  <Badge variant="outline" className="bg-[#DC2626]/10 text-[#DC2626] border-[#DC2626]/20">
                    {grant.category}
                  </Badge>
                  <span className="text-muted-foreground">
                    Deadline: {grant.deadline}
                  </span>
                </div>
              </div>
              
              <Button className="bg-[#DC2626] hover:bg-[#b91c1c] text-white" asChild>
                <Link to="/sign-in">Apply Now</Link>
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-2">
                  <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Application Deadline</p>
                    <p className="text-lg font-bold mt-1">{grant.deadline}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-2">
                  <DollarSign className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Funding Amount</p>
                    <p className="text-lg font-bold mt-1">{grant.amount}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-2">
                  <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Contact</p>
                    <p className="text-lg font-bold mt-1">{grant.contactPerson}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="mb-2">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="eligibility">Eligibility & Requirements</TabsTrigger>
              <TabsTrigger value="process">Application Process</TabsTrigger>
              <TabsTrigger value="faq">FAQs</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <Card>
                <CardHeader>
                  <CardTitle>Grant Overview</CardTitle>
                  <CardDescription>
                    Detailed description of the grant opportunity
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Description</h3>
                    <p className="text-muted-foreground">{grant.description}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Review Criteria</h3>
                    <ul className="space-y-2 ml-6 list-disc text-muted-foreground">
                      {grant.reviewCriteria?.map((criterion, index) => (
                        <li key={index}>{criterion}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="eligibility">
              <Card>
                <CardHeader>
                  <CardTitle>Eligibility & Requirements</CardTitle>
                  <CardDescription>
                    Who can apply and what is needed for the application
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Eligibility</h3>
                    <p className="text-muted-foreground">{grant.eligibility}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Application Requirements</h3>
                    <ul className="space-y-2 ml-6 list-disc text-muted-foreground">
                      {grant.requirements?.map((requirement, index) => (
                        <li key={index}>{requirement}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="process">
              <Card>
                <CardHeader>
                  <CardTitle>Application Process</CardTitle>
                  <CardDescription>
                    How to apply for this grant opportunity
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Submission Process</h3>
                    <p className="text-muted-foreground">{grant.submissionProcess}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Key Dates</h3>
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="font-medium">Application Deadline:</span>
                        <span className="ml-2">{grant.deadline}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
                    <p className="text-muted-foreground">
                      For questions about this grant opportunity, please contact:<br />
                      {grant.contactPerson} at <a href={`mailto:${grant.contactEmail}`} className="text-[#DC2626] hover:underline">{grant.contactEmail}</a>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="faq">
              <Card>
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                  <CardDescription>
                    Common questions about this grant opportunity
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {grant.faqs?.map((faq, index) => (
                      <div key={index} className="border-b border-border pb-4 last:border-0 last:pb-0">
                        <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="mt-8 text-center">
            <Button className="bg-[#DC2626] hover:bg-[#b91c1c] text-white" size="lg" asChild>
              <Link to="/sign-in">
                <FileText className="mr-2 h-4 w-4" /> Apply for This Grant
              </Link>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PublicGrantDetails;
