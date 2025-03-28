
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import KeyFeatures from "@/components/features/KeyFeatures";
import ProcessSection from "@/components/home/ProcessSection";
import CTASection from "@/components/home/CTASection";
import TestimonialsSection from "@/components/home/TestimonialsSection";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <HeroSection />
      <KeyFeatures />
      <ProcessSection />
      <CTASection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
};

export default Index;
