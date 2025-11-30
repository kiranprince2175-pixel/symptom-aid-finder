import { Heart, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center shadow-soft group-hover:shadow-glow transition-shadow duration-300">
              <Heart className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl text-foreground">
              MediHelp
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-foreground font-medium hover:text-primary transition-colors">
              Symptom Checker
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Common Conditions
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              First Aid
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-accent transition-colors"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Nav */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300",
            isMenuOpen ? "max-h-64 pb-4" : "max-h-0"
          )}
        >
          <nav className="flex flex-col gap-2">
            <a href="#" className="px-4 py-2 rounded-lg text-foreground font-medium bg-accent">
              Symptom Checker
            </a>
            <a href="#" className="px-4 py-2 rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
              Common Conditions
            </a>
            <a href="#" className="px-4 py-2 rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
              First Aid
            </a>
            <a href="#" className="px-4 py-2 rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
              About
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
