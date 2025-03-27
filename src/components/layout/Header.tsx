
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

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
            Issue Blogger
          </Link>
          
          {/* Desktop menu */}
          <nav className="hidden md:flex space-x-8 items-center">
            <NavLinks />
          </nav>
          
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
        <div className="md:hidden glass mt-3 animate-fade-in">
          <nav className="flex flex-col space-y-4 p-4">
            <NavLinks />
          </nav>
        </div>
      )}
    </header>
  );
};

const NavLinks: React.FC = () => {
  return (
    <>
      <Link 
        to="/" 
        className="text-foreground/80 transition-colors hover:text-foreground font-medium"
      >
        Home
      </Link>
      <Link 
        to="/about" 
        className="text-foreground/80 transition-colors hover:text-foreground font-medium"
      >
        About
      </Link>
      <a 
        href="https://github.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-foreground/80 transition-colors hover:text-foreground font-medium"
      >
        <span>GitHub</span>
      </a>
    </>
  );
};

export default Header;
