
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Moon, Sun, Languages, Type, TypeMinus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppContext, useTranslation } from "@/contexts/AppContext";

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { language, setLanguage, increaseFontSize, decreaseFontSize, theme, toggleTheme } = useAppContext();
  const { t } = useTranslation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleLanguage = () => {
    setLanguage(language === "pt" ? "en" : "pt");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        scrolled ? "glass py-3" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="font-semibold text-xl tracking-tight transition-opacity hover:opacity-80"
          >
            {t("header", "pt")}
          </Link>
          
          {/* Desktop controls */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleLanguage}
              aria-label="Toggle language"
              title={language === "pt" ? "Mudar para Inglês" : "Switch to Portuguese"}
            >
              <Languages size={20} />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon"
              onClick={decreaseFontSize}
              aria-label="Decrease font size"
              title={language === "pt" ? "Diminuir texto" : "Decrease text size"}
            >
              <TypeMinus size={20} />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon"
              onClick={increaseFontSize}
              aria-label="Increase font size"
              title={language === "pt" ? "Aumentar texto" : "Increase text size"}
            >
              <Type size={20} />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              title={language === "pt" ? "Alternar tema" : "Toggle theme"}
            >
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <Button 
            variant="ghost" 
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass mt-3 animate-fade-in p-4">
          <div className="flex justify-around">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleLanguage}
              aria-label="Toggle language"
            >
              <Languages size={20} />
              <span className="ml-2 text-sm">{language === "pt" ? "EN" : "PT"}</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon"
              onClick={decreaseFontSize}
              aria-label="Decrease font size"
            >
              <TypeMinus size={20} />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon"
              onClick={increaseFontSize}
              aria-label="Increase font size"
            >
              <Type size={20} />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
