
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ProcessSection = () => {
  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">Streamlined Grant Management Process</h2>
          <p className="text-muted-foreground">
            From proposal submission to project completion, our platform handles every step
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="relative p-6 bg-white rounded-lg shadow-soft">
            <div className="absolute -top-4 -left-4 h-8 w-8 rounded-full bg-grant-red text-white flex items-center justify-center font-semibold">1</div>
            <h3 className="text-xl font-semibold mb-3 mt-2">Proposal Submission</h3>
            <p className="text-muted-foreground">Submit grant proposals online with guided forms that ensure all requirements are met.</p>
          </div>
          
          <div className="relative p-6 bg-white rounded-lg shadow-soft">
            <div className="absolute -top-4 -left-4 h-8 w-8 rounded-full bg-grant-red text-white flex items-center justify-center font-semibold">2</div>
            <h3 className="text-xl font-semibold mb-3 mt-2">Project Management</h3>
            <p className="text-muted-foreground">Track project progress, manage team members, and monitor financial activities.</p>
          </div>
          
          <div className="relative p-6 bg-white rounded-lg shadow-soft">
            <div className="absolute -top-4 -left-4 h-8 w-8 rounded-full bg-grant-red text-white flex items-center justify-center font-semibold">3</div>
            <h3 className="text-xl font-semibold mb-3 mt-2">Reporting & Compliance</h3>
            <p className="text-muted-foreground">Generate comprehensive reports and ensure compliance with funder requirements.</p>
          </div>
          
          <div className="relative p-6 bg-white rounded-lg shadow-soft">
            <div className="absolute -top-4 -left-4 h-8 w-8 rounded-full bg-grant-red text-white flex items-center justify-center font-semibold">4</div>
            <h3 className="text-xl font-semibold mb-3 mt-2">Research Outcomes</h3>
            <p className="text-muted-foreground">Document and showcase research outputs, from publications to patents and beyond.</p>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <Button size="lg" asChild>
            <Link to="/grants">View Available Grants</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
