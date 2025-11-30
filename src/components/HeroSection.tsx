import { Stethoscope, Shield, Clock } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-12 md:py-20">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-success/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      </div>

      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 animate-fade-in">
          <Stethoscope className="w-4 h-4" />
          <span className="text-sm font-medium">AI-Powered Health Assistant</span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-slide-up">
          Get Instant Health
          <span className="block mt-2 bg-gradient-to-r from-primary via-primary/80 to-success bg-clip-text text-transparent">
            Recommendations
          </span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          Describe your symptoms and receive personalized medication suggestions, 
          home remedies, and guidance on when to seek professional care.
        </p>

        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-10 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Shield className="w-5 h-5 text-success" />
            <span className="text-sm">Privacy Protected</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-5 h-5 text-primary" />
            <span className="text-sm">Instant Results</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Stethoscope className="w-5 h-5 text-info" />
            <span className="text-sm">Medical Database</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
