import { Button } from "@/components/ui/button";
import { type SymptomResult } from "@/data/symptomsData";
import { AlertTriangle, ArrowLeft, Pill, Leaf, Phone, Clock, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

interface ResultsPanelProps {
  result: SymptomResult;
  onReset: () => void;
}

const severityConfig = {
  low: {
    label: "Low Severity",
    color: "bg-success/10 text-success border-success/30",
    icon: Shield,
  },
  moderate: {
    label: "Moderate Severity",
    color: "bg-warning/10 text-warning-foreground border-warning/30",
    icon: Clock,
  },
  high: {
    label: "High Severity",
    color: "bg-emergency/10 text-emergency border-emergency/30",
    icon: AlertTriangle,
  },
  emergency: {
    label: "Emergency",
    color: "bg-emergency text-emergency-foreground border-emergency",
    icon: Phone,
  },
};

const ResultsPanel = ({ result, onReset }: ResultsPanelProps) => {
  const severity = severityConfig[result.severity];
  const SeverityIcon = severity.icon;

  return (
    <section className="w-full max-w-4xl mx-auto px-4 animate-fade-in">
      {/* Back Button */}
      <button
        onClick={onReset}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Check different symptoms
      </button>

      {/* Emergency Alert */}
      {result.severity === "emergency" && (
        <div className="gradient-emergency p-6 rounded-2xl mb-6 shadow-medium animate-pulse-soft">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-emergency-foreground/20 flex items-center justify-center flex-shrink-0">
              <Phone className="w-6 h-6 text-emergency-foreground" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-emergency-foreground mb-2">
                Seek Immediate Medical Attention
              </h2>
              <p className="text-emergency-foreground/90 mb-4">
                Your symptoms may indicate a serious condition. Please call emergency services immediately.
              </p>
              <a
                href="tel:911"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-emergency-foreground text-emergency font-semibold hover:opacity-90 transition-opacity"
              >
                <Phone className="w-5 h-5" />
                Call 911
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Condition Card */}
      <div className="bg-card rounded-2xl border border-border p-6 mb-6 shadow-soft animate-slide-up">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">{result.condition}</h2>
            <p className="text-muted-foreground">{result.description}</p>
          </div>
          <div className={cn("flex items-center gap-2 px-4 py-2 rounded-full border", severity.color)}>
            <SeverityIcon className="w-4 h-4" />
            <span className="text-sm font-medium">{severity.label}</span>
          </div>
        </div>
      </div>

      {/* Medications Section */}
      {result.medications.length > 0 && (
        <div className="mb-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center">
              <Pill className="w-5 h-5 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">Suggested Medications</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {result.medications.map((med, index) => (
              <div
                key={index}
                className="bg-card rounded-xl border border-border p-4 shadow-soft hover:shadow-medium transition-shadow"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-foreground">{med.name}</h4>
                  <span className={cn(
                    "text-xs px-2 py-1 rounded-full",
                    med.type === "OTC" 
                      ? "bg-success/10 text-success" 
                      : "bg-info/10 text-info"
                  )}>
                    {med.type}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  <span className="font-medium">Dosage:</span> {med.dosage}
                </p>
                {med.warnings.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {med.warnings.map((warning, wIndex) => (
                      <span
                        key={wIndex}
                        className="text-xs px-2 py-1 rounded-full bg-warning/10 text-warning-foreground"
                      >
                        ⚠️ {warning}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Home Remedies Section */}
      {result.remedies.length > 0 && (
        <div className="mb-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-success flex items-center justify-center">
              <Leaf className="w-5 h-5 text-success-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">Home Remedies</h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {result.remedies.map((remedy, index) => (
              <div
                key={index}
                className="bg-card rounded-xl border border-border p-4 shadow-soft hover:shadow-medium transition-shadow"
              >
                <div className="text-3xl mb-2">{remedy.icon}</div>
                <h4 className="font-semibold text-foreground mb-1">{remedy.title}</h4>
                <p className="text-sm text-muted-foreground">{remedy.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* When to Seek Help */}
      <div className="bg-card rounded-2xl border border-border p-6 mb-6 animate-slide-up" style={{ animationDelay: "0.3s" }}>
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-warning" />
          <h3 className="text-xl font-semibold text-foreground">When to Seek Medical Help</h3>
        </div>
        <ul className="space-y-2">
          {result.whenToSeekHelp.map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-warning mt-2 flex-shrink-0" />
              <span className="text-muted-foreground">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Disclaimer */}
      <div className="bg-muted/50 rounded-xl p-4 text-center animate-slide-up" style={{ animationDelay: "0.4s" }}>
        <p className="text-sm text-muted-foreground">
          <strong>Medical Disclaimer:</strong> This information is for educational purposes only and should not replace professional medical advice. 
          Always consult a healthcare provider for diagnosis and treatment.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8 animate-slide-up" style={{ animationDelay: "0.5s" }}>
        <Button variant="outline" size="lg" onClick={onReset}>
          <ArrowLeft className="w-4 h-4" />
          Check Different Symptoms
        </Button>
      </div>
    </section>
  );
};

export default ResultsPanel;
