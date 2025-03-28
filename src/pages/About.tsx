
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="bg-secondary py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-6">About Africa University Grants Portal</h1>
              <p className="text-lg text-muted-foreground">
                Empowering research excellence through streamlined grant management
              </p>
            </div>
          </div>
        </section>
        
        {/* Mission Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-muted-foreground mb-4">
                  The AU Clinical Research Centre is dedicated to advancing healthcare through innovative research. 
                  Our Grants Portal serves as a comprehensive platform to streamline the entire grant lifecycle, 
                  from submission to completion.
                </p>
                <p className="text-muted-foreground mb-4">
                  We aim to reduce administrative burden, enhance transparency, and improve efficiency for
                  researchers and administrators alike, allowing them to focus more on what truly matters - 
                  breakthrough research that transforms lives.
                </p>
              </div>
              <div className="bg-[#DC2626] text-white p-8 rounded-lg">
                <h3 className="text-2xl font-semibold mb-4">Our Vision</h3>
                <p className="mb-4">
                  To become the leading grants management platform that empowers researchers to achieve their 
                  full potential and contribute to meaningful advancements in clinical research.
                </p>
                <h3 className="text-2xl font-semibold mb-4 mt-8">Our Values</h3>
                <ul className="space-y-2">
                  <li>Excellence in research support</li>
                  <li>Transparency in grant processes</li>
                  <li>Efficiency in administration</li>
                  <li>Innovation in healthcare outcomes</li>
                  <li>Integrity in all operations</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-10 text-center">Our Leadership Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Team Member 1 */}
              <div className="bg-white p-6 rounded-lg shadow-soft text-center">
                <div className="h-24 w-24 bg-[#DC2626] rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">JD</span>
                </div>
                <h3 className="text-xl font-semibold">Dr. Jane Doe</h3>
                <p className="text-muted-foreground mb-2">Director, AU Clinical Research Centre</p>
                <p className="text-sm text-muted-foreground">
                  Leading our research initiatives with over 15 years of experience in clinical research and grant management.
                </p>
              </div>
              
              {/* Team Member 2 */}
              <div className="bg-white p-6 rounded-lg shadow-soft text-center">
                <div className="h-24 w-24 bg-[#DC2626] rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">JS</span>
                </div>
                <h3 className="text-xl font-semibold">Prof. John Smith</h3>
                <p className="text-muted-foreground mb-2">Head of Grants Administration</p>
                <p className="text-sm text-muted-foreground">
                  Specializing in research funding and grant compliance with extensive experience in international funding mechanisms.
                </p>
              </div>
              
              {/* Team Member 3 */}
              <div className="bg-white p-6 rounded-lg shadow-soft text-center">
                <div className="h-24 w-24 bg-[#DC2626] rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">MJ</span>
                </div>
                <h3 className="text-xl font-semibold">Dr. Mary Johnson</h3>
                <p className="text-muted-foreground mb-2">Research Excellence Lead</p>
                <p className="text-sm text-muted-foreground">
                  Focusing on research quality and impact assessment to ensure maximum value from grant funding.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
