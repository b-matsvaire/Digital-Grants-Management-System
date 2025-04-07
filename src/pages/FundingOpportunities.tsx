
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, ExternalLink, Search, FileText, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/components/auth/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { FundingCall } from "@/types/grants";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const FundingOpportunities = () => {
  const { user } = useAuth();
  const [fundingCalls, setFundingCalls] = useState<FundingCall[]>([]);
  const [filteredCalls, setFilteredCalls] = useState<FundingCall[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  
  const [newCall, setNewCall] = useState({
    title: "",
    funder: "",
    description: "",
    categories: [] as string[],
    deadline: "",
    eligibility: "",
    link: ""
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const categories = ["medical", "public-health", "community", "education", "technology"];
  
  useEffect(() => {
    const checkUserRole = async () => {
      if (!user) return;
      
      const { data } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();
      
      if (data) {
        setIsAdmin(data.role === 'admin' || data.role === 'institutional_admin');
      }
    };
    
    const fetchFundingCalls = async () => {
      try {
        const { data, error } = await supabase
          .from('funding_calls')
          .select('*')
          .order('deadline', { ascending: true });
        
        if (error) throw error;
        
        setFundingCalls(data || []);
        setFilteredCalls(data || []);
      } catch (error) {
        console.error('Error fetching funding calls:', error);
      } finally {
        setLoading(false);
      }
    };
    
    checkUserRole();
    fetchFundingCalls();
  }, [user]);
  
  useEffect(() => {
    let result = fundingCalls;
    
    if (searchTerm) {
      result = result.filter(call => 
        call.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        call.funder.toLowerCase().includes(searchTerm.toLowerCase()) ||
        call.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (categoryFilter !== "all") {
      result = result.filter(call => call.category.includes(categoryFilter));
    }
    
    setFilteredCalls(result);
  }, [searchTerm, categoryFilter, fundingCalls]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewCall(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCategoryToggle = (category: string) => {
    setNewCall(prev => {
      if (prev.categories.includes(category)) {
        return { ...prev, categories: prev.categories.filter(c => c !== category) };
      } else {
        return { ...prev, categories: [...prev.categories, category] };
      }
    });
  };
  
  const resetForm = () => {
    setNewCall({
      title: "",
      funder: "",
      description: "",
      categories: [],
      deadline: "",
      eligibility: "",
      link: ""
    });
  };
  
  const handleSubmit = async () => {
    try {
      const { error } = await supabase.from('funding_calls').insert({
        title: newCall.title,
        funder: newCall.funder,
        description: newCall.description,
        category: newCall.categories,
        deadline: newCall.deadline,
        eligibility: newCall.eligibility,
        link: newCall.link
      });
      
      if (error) throw error;
      
      // Refresh the funding calls list
      const { data, error: fetchError } = await supabase
        .from('funding_calls')
        .select('*')
        .order('deadline', { ascending: true });
      
      if (fetchError) throw fetchError;
      
      setFundingCalls(data || []);
      resetForm();
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error submitting funding call:', error);
    }
  };

  const getDaysUntilDeadline = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Funding Opportunities</h1>
          {isAdmin && (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>Add New Opportunity</Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Funding Opportunity</DialogTitle>
                  <DialogDescription>
                    Enter the details of the new funding opportunity below.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title</Label>
                      <Input 
                        id="title" 
                        name="title"
                        placeholder="Funding opportunity title" 
                        value={newCall.title}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="funder">Funder</Label>
                      <Input 
                        id="funder" 
                        name="funder"
                        placeholder="Funding organization" 
                        value={newCall.funder}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description" 
                      name="description"
                      placeholder="Describe the funding opportunity" 
                      rows={3}
                      value={newCall.description}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Categories</Label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {categories.map(category => (
                        <Badge 
                          key={category}
                          variant={newCall.categories.includes(category) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => handleCategoryToggle(category)}
                        >
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="deadline">Deadline</Label>
                      <Input 
                        id="deadline" 
                        name="deadline"
                        type="date" 
                        value={newCall.deadline}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="link">Website Link</Label>
                      <Input 
                        id="link" 
                        name="link"
                        placeholder="https://..." 
                        value={newCall.link}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="eligibility">Eligibility Criteria</Label>
                    <Textarea 
                      id="eligibility" 
                      name="eligibility"
                      placeholder="Who can apply?" 
                      rows={2}
                      value={newCall.eligibility}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                  <Button 
                    onClick={handleSubmit}
                    disabled={!newCall.title || !newCall.funder || !newCall.deadline || newCall.categories.length === 0}
                  >
                    Save
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-2/3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search funding opportunities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
          </div>
          <div className="w-full sm:w-1/3">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center p-12">
            <p>Loading funding opportunities...</p>
          </div>
        ) : filteredCalls.length === 0 ? (
          <div className="text-center p-12 border rounded-lg bg-gray-50">
            <p className="text-muted-foreground mb-1">No funding opportunities found</p>
            <p className="text-sm text-muted-foreground">
              {fundingCalls.length > 0 
                ? "Try adjusting your search or filter criteria"
                : isAdmin 
                  ? "Click the 'Add New Opportunity' button to create one" 
                  : "Check back later for new opportunities"
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredCalls.map(call => (
              <Card key={call.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{call.title}</CardTitle>
                    <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
                      {call.funder}
                    </Badge>
                  </div>
                  <div className="flex items-center mt-1">
                    <Calendar className="h-4 w-4 text-red-500 mr-1" />
                    <CardDescription>
                      Deadline: {new Date(call.deadline).toLocaleDateString()}
                      {getDaysUntilDeadline(call.deadline) > 0 && (
                        <Badge variant="outline" className="ml-2 text-amber-600 border-amber-200 bg-amber-50">
                          <Clock className="h-3 w-3 mr-1" />
                          {getDaysUntilDeadline(call.deadline)} days left
                        </Badge>
                      )}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" className="h-auto p-0 text-blue-600 hover:text-blue-800">
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>{call.title}</DialogTitle>
                        <Badge variant="outline" className="mt-2 bg-blue-50 text-blue-600 border-blue-200 w-fit">
                          {call.funder}
                        </Badge>
                      </DialogHeader>
                      <ScrollArea className="max-h-[60vh]">
                        <Tabs defaultValue="details" className="w-full">
                          <TabsList className="mb-4">
                            <TabsTrigger value="details">Details</TabsTrigger>
                            <TabsTrigger value="eligibility">Eligibility</TabsTrigger>
                            <TabsTrigger value="resources">Resources</TabsTrigger>
                          </TabsList>
                          <TabsContent value="details" className="space-y-4">
                            <div>
                              <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
                              <p className="mt-1 whitespace-pre-line">{call.description}</p>
                            </div>
                            <div>
                              <h3 className="text-sm font-medium text-muted-foreground">Categories</h3>
                              <div className="flex flex-wrap gap-2 mt-2">
                                {call.category.map((cat) => (
                                  <Badge key={cat} variant="secondary">{cat}</Badge>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h3 className="text-sm font-medium text-muted-foreground">Deadline</h3>
                              <p className="mt-1">
                                {new Date(call.deadline).toLocaleDateString()} 
                                ({getDaysUntilDeadline(call.deadline)} days remaining)
                              </p>
                            </div>
                          </TabsContent>
                          <TabsContent value="eligibility">
                            <div className="space-y-4">
                              <h3 className="text-sm font-medium text-muted-foreground">Eligibility Criteria</h3>
                              <p className="whitespace-pre-line">{call.eligibility}</p>
                            </div>
                          </TabsContent>
                          <TabsContent value="resources">
                            <div className="space-y-4">
                              <h3 className="text-sm font-medium text-muted-foreground">Official Website</h3>
                              <a 
                                href={call.link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center text-blue-600 hover:underline"
                              >
                                Visit Funding Page <ExternalLink className="h-3 w-3 ml-1" />
                              </a>
                              
                              <h3 className="text-sm font-medium text-muted-foreground mt-4">Proposal Templates</h3>
                              <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-blue-600" />
                                <a href="#" className="text-blue-600 hover:underline">
                                  Sample Proposal Template
                                </a>
                              </div>
                            </div>
                          </TabsContent>
                        </Tabs>
                      </ScrollArea>
                      <DialogFooter>
                        <a 
                          href={call.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          <Button>
                            Apply Now
                            <ExternalLink className="h-4 w-4 ml-2" />
                          </Button>
                        </a>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    {call.category.map((cat) => (
                      <Badge key={cat} variant="secondary">{cat}</Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <a 
                    href={call.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 text-sm hover:underline flex items-center"
                  >
                    Visit website <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default FundingOpportunities;
