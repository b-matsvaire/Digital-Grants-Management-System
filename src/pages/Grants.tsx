
import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Search, Filter, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const Grants = () => {
  // Sample grants data
  const allGrants = [
    {
      id: "1",
      title: "Clinical Research Innovation Grant",
      category: "Healthcare",
      deadline: "June 15, 2023",
      amount: "$50,000 - $150,000",
      description: "Supporting innovative approaches to clinical research methodologies.",
    },
    {
      id: "2",
      title: "Emerging Infectious Disease Research",
      category: "Public Health",
      deadline: "July 30, 2023",
      amount: "$75,000 - $250,000",
      description: "Research focused on prevention, diagnosis, and treatment of emerging infectious diseases.",
    },
    {
      id: "3",
      title: "Healthcare Technology Development",
      category: "Technology",
      deadline: "August 22, 2023",
      amount: "$100,000 - $300,000",
      description: "Development of new technologies for healthcare delivery and patient care.",
    },
    {
      id: "4",
      title: "Community Health Initiatives",
      category: "Public Health",
      deadline: "September 10, 2023",
      amount: "$25,000 - $100,000",
      description: "Programs addressing health disparities and improving community health outcomes.",
    },
    {
      id: "5",
      title: "Medical Education Innovation",
      category: "Education",
      deadline: "October 5, 2023",
      amount: "$40,000 - $120,000",
      description: "Projects enhancing medical education methodologies and curriculum development.",
    },
    {
      id: "6",
      title: "Global Health Research",
      category: "Public Health",
      deadline: "November 15, 2023",
      amount: "$60,000 - $200,000",
      description: "Research addressing global health challenges and international collaboration.",
    },
  ];
  
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  
  // Filter grants based on search term and category
  const filteredGrants = allGrants.filter(grant => {
    const matchesSearch = grant.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          grant.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === "all" || grant.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });
  
  // Get unique categories for filter dropdown
  const categories = [...new Set(allGrants.map(grant => grant.category))];
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="bg-[#111827] py-16 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-6">Available Research Grants</h1>
              <p className="text-lg text-gray-300 mb-8">
                Discover funding opportunities to support your research initiatives at Africa University
              </p>
              <div className="flex items-center justify-center max-w-md mx-auto">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    className="pl-10 pr-4 py-2 w-full bg-[#1f2937] border-[#374151] text-white placeholder:text-gray-400"
                    placeholder="Search grants by keyword, category, or amount..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Filter Section */}
        <section className="py-6 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Filter size={20} className="text-muted-foreground" />
                <span className="font-medium">Filter By:</span>
              </div>
              
              <div className="flex flex-wrap items-center gap-4">
                <div className="w-48">
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="text-sm text-muted-foreground">
                Showing {filteredGrants.length} of {allGrants.length} grants
              </div>
            </div>
          </div>
        </section>
        
        {/* Grants Listing */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {filteredGrants.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {filteredGrants.map((grant) => (
                  <div 
                    key={grant.id} 
                    className="bg-white border border-border rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{grant.title}</h3>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge className="bg-[#DC2626]/10 text-[#DC2626] hover:bg-[#DC2626]/20 border-[#DC2626]/10">
                            {grant.category}
                          </Badge>
                          <Badge variant="outline">
                            Due: {grant.deadline}
                          </Badge>
                          <Badge variant="outline">
                            {grant.amount}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground">{grant.description}</p>
                      </div>
                      <div className="flex gap-3">
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/grants/${grant.id}`}>
                            <FileText className="mr-2 h-4 w-4" /> View Details
                          </Link>
                        </Button>
                        <Button size="sm" className="bg-[#DC2626] hover:bg-[#b91c1c] text-white" asChild>
                          <Link to="/sign-in">Apply Now</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No grants found</h3>
                <p className="text-muted-foreground mb-6">
                  No grants match your current search criteria. Try adjusting your filters.
                </p>
                <Button variant="outline" onClick={() => {
                  setSearchTerm("");
                  setCategoryFilter("all");
                }}>
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-[#DC2626] text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Looking for Support with Your Application?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Our team is ready to assist you throughout the grant application process, from initial concept to final submission.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="secondary" size="lg" asChild>
                <Link to="/resources">View Resources</Link>
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10" size="lg" asChild>
                <Link to="/contact">Contact Support</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Grants;
