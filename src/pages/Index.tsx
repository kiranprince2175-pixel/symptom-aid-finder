import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SymptomChecker from "@/components/SymptomChecker";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>MediHelp - Symptom Checker & Medication Guide</title>
        <meta name="description" content="Get instant health recommendations based on your symptoms. Find medication suggestions, home remedies, and know when to seek professional care." />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1">
          <HeroSection />
          <SymptomChecker />
          <div className="h-16" />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
