import React, { useEffect } from 'react';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import TechnologyPreview from './components/TechnologyPreview';
import TrustSignals from './components/TrustSignals';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';

const Homepage = () => {
  useEffect(() => {
    // Set page title
    document.title = 'SteganQR - Security Hidden in Plain Sight';
    
    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription?.setAttribute('content', 'Revolutionary steganographic QR codes that embed invisible data within ordinary images. Advanced cryptography meets elegant simplicity for covert communications.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Revolutionary steganographic QR codes that embed invisible data within ordinary images. Advanced cryptography meets elegant simplicity for covert communications.';
      document.getElementsByTagName('head')?.[0]?.appendChild(meta);
    }

    // Scroll to top on component mount
    window.scrollTo(0, 0);

    // Add smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header Navigation */}
      <Header />
      
      {/* Main Content */}
      <main className="relative">
        {/* Hero Section with Interactive Demo */}
        <HeroSection />
        
        {/* Technology Preview with Morphing Animations */}
        <TechnologyPreview />
        
        {/* Trust Signals with Real-time Stats */}
        <TrustSignals />
        
        {/* Call to Action with Feature Showcase */}
        <CallToAction />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Homepage;