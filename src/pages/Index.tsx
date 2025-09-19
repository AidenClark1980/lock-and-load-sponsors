import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import LEDFooter from "@/components/LEDFooter";
import { ContractInteraction } from "@/components/ContractInteraction";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <div className="container mx-auto px-4 py-8">
        <ContractInteraction />
      </div>
      <LEDFooter />
    </div>
  );
};

export default Index;
