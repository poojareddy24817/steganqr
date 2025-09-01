import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { name: 'Generator', path: '/generator-dashboard', icon: 'QrCode' },
    { name: 'Scanner', path: '/scanner-interface', icon: 'ScanLine' },
    { name: 'Technology', path: '/technology-hub', icon: 'Shield' },
    { name: 'Pricing', path: '/pricing-enterprise', icon: 'CreditCard' },
    { name: 'API', path: '/developer-api', icon: 'Code' }
  ];

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-brand border-b border-border shadow-brand-card' 
          : 'bg-transparent'
      }`}
    >
      <div className="w-full">
        <div className="flex items-center justify-between h-16 px-6 lg:px-8">
          {/* Logo Section */}
          <Link 
            to="/homepage" 
            className="flex items-center space-x-3 group transition-all duration-300 hover:scale-105"
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-brand flex items-center justify-center shadow-brand-card group-hover:shadow-brand-hover transition-all duration-300">
                <Icon 
                  name="Shield" 
                  size={20} 
                  color="white" 
                  className="group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full animate-pulse"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-brand-headline text-lg font-bold text-primary group-hover:text-accent transition-colors duration-300">
                SteganQR
              </span>
              <span className="text-xs text-muted-foreground font-medium tracking-wide">
                Security Hidden in Plain Sight
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-brand text-sm font-medium transition-all duration-200 group ${
                  isActivePath(item?.path)
                    ? 'bg-accent text-accent-foreground shadow-brand-card'
                    : 'text-muted-foreground hover:text-primary hover:bg-muted'
                }`}
              >
                <Icon 
                  name={item?.icon} 
                  size={16} 
                  className={`transition-all duration-200 ${
                    isActivePath(item?.path) 
                      ? 'text-accent-foreground' 
                      : 'text-muted-foreground group-hover:text-primary'
                  }`}
                />
                <span>{item?.name}</span>
                {isActivePath(item?.path) && (
                  <div className="w-1 h-1 bg-accent-foreground rounded-full animate-pulse"></div>
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-muted-foreground hover:text-primary"
            >
              Sign In
            </Button>
            <Button 
              variant="default" 
              size="sm"
              className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-brand-card hover:shadow-brand-hover transition-all duration-300"
              iconName="ArrowRight"
              iconPosition="right"
              iconSize={14}
            >
              Start Free Trial
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-brand text-muted-foreground hover:text-primary hover:bg-muted transition-all duration-200"
            aria-label="Toggle menu"
          >
            <Icon 
              name={isMenuOpen ? "X" : "Menu"} 
              size={24} 
              className="transition-transform duration-300"
            />
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div 
          className={`lg:hidden transition-all duration-300 ease-brand ${
            isMenuOpen 
              ? 'max-h-96 opacity-100' :'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <div className="px-6 py-4 bg-card border-t border-border shadow-brand-modal">
            <nav className="space-y-2">
              {navigationItems?.map((item, index) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-brand text-sm font-medium transition-all duration-200 ${
                    isActivePath(item?.path)
                      ? 'bg-accent text-accent-foreground shadow-brand-card'
                      : 'text-muted-foreground hover:text-primary hover:bg-muted'
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <Icon 
                    name={item?.icon} 
                    size={18} 
                    className={
                      isActivePath(item?.path) 
                        ? 'text-accent-foreground' 
                        : 'text-muted-foreground'
                    }
                  />
                  <span>{item?.name}</span>
                  {isActivePath(item?.path) && (
                    <div className="ml-auto w-2 h-2 bg-accent-foreground rounded-full animate-pulse"></div>
                  )}
                </Link>
              ))}
            </nav>
            
            {/* Mobile CTA Buttons */}
            <div className="mt-6 pt-4 border-t border-border space-y-3">
              <Button 
                variant="outline" 
                size="sm"
                fullWidth
                className="justify-center"
              >
                Sign In
              </Button>
              <Button 
                variant="default" 
                size="sm"
                fullWidth
                className="justify-center bg-accent hover:bg-accent/90 text-accent-foreground shadow-brand-card"
                iconName="ArrowRight"
                iconPosition="right"
                iconSize={14}
              >
                Start Free Trial
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Security Trust Indicators */}
      <div className="hidden lg:block absolute top-4 right-8">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 px-2 py-1 bg-success/10 rounded-full">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-success">Secure</span>
          </div>
          <div className="flex items-center space-x-1 px-2 py-1 bg-accent/10 rounded-full">
            <Icon name="Shield" size={12} className="text-accent" />
            <span className="text-xs font-medium text-accent">Encrypted</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;