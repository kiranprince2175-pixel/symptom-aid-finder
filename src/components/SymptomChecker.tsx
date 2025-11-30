import { useState } from "react";
import { Button } from "@/components/ui/button";
import { symptoms, symptomCategories, analyzeSymptoms, type SymptomResult } from "@/data/symptomsData";
import { Check, Search, ArrowRight, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import ResultsPanel from "./ResultsPanel";

const SymptomChecker = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [result, setResult] = useState<SymptomResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const filteredSymptoms = symptoms.filter(symptom => {
    const matchesSearch = symptom.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !activeCategory || symptom.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleSymptom = (symptomId: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptomId)
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId]
    );
  };

  const handleAnalyze = async () => {
    if (selectedSymptoms.length === 0) return;
    
    setIsAnalyzing(true);
    // Simulate analysis delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1500));
    const analysisResult = analyzeSymptoms(selectedSymptoms);
    setResult(analysisResult);
    setIsAnalyzing(false);
  };

  const handleReset = () => {
    setSelectedSymptoms([]);
    setSearchQuery("");
    setActiveCategory(null);
    setResult(null);
  };

  if (result) {
    return <ResultsPanel result={result} onReset={handleReset} />;
  }

  return (
    <section className="w-full max-w-5xl mx-auto px-4">
      <div className="text-center mb-8 animate-fade-in">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          What symptoms are you experiencing?
        </h2>
        <p className="text-muted-foreground">
          Select all that apply. We'll suggest remedies and medications.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search symptoms..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-12 pl-12 pr-4 rounded-xl border border-input bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300"
        />
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 mb-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
        <button
          onClick={() => setActiveCategory(null)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
            !activeCategory
              ? "bg-primary text-primary-foreground shadow-soft"
              : "bg-secondary text-secondary-foreground hover:bg-accent"
          )}
        >
          All
        </button>
        {symptomCategories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(activeCategory === category ? null : category)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
              activeCategory === category
                ? "bg-primary text-primary-foreground shadow-soft"
                : "bg-secondary text-secondary-foreground hover:bg-accent"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Symptoms Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-8 animate-slide-up" style={{ animationDelay: "0.3s" }}>
        {filteredSymptoms.map((symptom, index) => {
          const isSelected = selectedSymptoms.includes(symptom.id);
          return (
            <button
              key={symptom.id}
              onClick={() => toggleSymptom(symptom.id)}
              className={cn(
                "relative flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-300 min-h-[100px]",
                isSelected
                  ? "border-primary bg-primary/5 shadow-soft"
                  : "border-border bg-card hover:border-primary/50 hover:bg-accent/50"
              )}
              style={{ animationDelay: `${0.3 + index * 0.02}s` }}
            >
              {isSelected && (
                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                  <Check className="w-3 h-3 text-primary-foreground" />
                </div>
              )}
              <span className="text-2xl mb-2">{symptom.icon}</span>
              <span className={cn(
                "text-sm font-medium text-center",
                isSelected ? "text-primary" : "text-foreground"
              )}>
                {symptom.name}
              </span>
              <span className={cn(
                "text-xs mt-1",
                symptom.severity === "severe" ? "text-emergency" :
                symptom.severity === "moderate" ? "text-warning" : "text-muted-foreground"
              )}>
                {symptom.severity}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Count & Analyze Button */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-card border border-border shadow-soft animate-slide-up" style={{ animationDelay: "0.4s" }}>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">
            Selected: <span className="font-semibold text-foreground">{selectedSymptoms.length}</span> symptom{selectedSymptoms.length !== 1 ? "s" : ""}
          </span>
          {selectedSymptoms.length > 0 && (
            <button
              onClick={handleReset}
              className="text-sm text-muted-foreground hover:text-foreground underline"
            >
              Clear all
            </button>
          )}
        </div>
        <Button
          variant="hero"
          size="lg"
          onClick={handleAnalyze}
          disabled={selectedSymptoms.length === 0 || isAnalyzing}
          className="w-full sm:w-auto"
        >
          {isAnalyzing ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              Get Recommendations
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </Button>
      </div>
    </section>
  );
};

export default SymptomChecker;
