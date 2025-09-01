import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import AlgorithmVisualization from './components/AlgorithmVisualization';
import ResearchPapers from './components/ResearchPapers';
import DeveloperResources from './components/DeveloperResources';
import TechnicalBlog from './components/TechnicalBlog';
import InnovationLab from './components/InnovationLab';
import PerformanceBenchmarks from './components/PerformanceBenchmarks';

const TechnologyHub = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationSections = [
    { id: 'overview', name: 'Overview', icon: 'Home' },
    { id: 'algorithms', name: 'Algorithm Visualization', icon: 'Cpu' },
    { id: 'research', name: 'Research Papers', icon: 'FileText' },
    { id: 'developer', name: 'Developer Resources', icon: 'Code' },
    { id: 'blog', name: 'Technical Blog', icon: 'BookOpen' },
    { id: 'innovation', name: 'Innovation Lab', icon: 'Beaker' },
    { id: 'benchmarks', name: 'Performance Benchmarks', icon: 'BarChart3' }
  ];

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const technicalStats = [
    { label: 'Algorithms Supported', value: '12+', icon: 'Cpu' },
    { label: 'Research Papers', value: '24', icon: 'FileText' },
    { label: 'SDK Languages', value: '6', icon: 'Code' },
    { label: 'Beta Features', value: '4', icon: 'Beaker' }
  ];

  const algorithmOverview = [
    {
      name: 'LSB Steganography',
      description: 'Traditional least significant bit embedding with adaptive pixel selection',
      security: 'Medium',
      performance: 'High',
      complexity: 'Low'
    },
    {
      name: 'DCT Transform',
      description: 'Frequency domain embedding using discrete cosine transform',
      security: 'High',
      performance: 'Medium',
      complexity: 'High'
    },
    {
      name: 'DWT Wavelet',
      description: 'Multi-resolution wavelet-based steganographic embedding',
      security: 'Very High',
      performance: 'Low',
      complexity: 'High'
    },
    {
      name: 'AI-Adaptive',
      description: 'Machine learning optimized embedding with dynamic parameters',
      security: 'Very High',
      performance: 'Medium',
      complexity: 'Very High'
    }
  ];

  const getMetricColor = (level) => {
    switch (level) {
      case 'Low': return 'text-success bg-success/10';
      case 'Medium': return 'text-accent bg-accent/10';
      case 'High': return 'text-warning bg-warning/10';
      case 'Very High': return 'text-destructive bg-destructive/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <Icon name="Shield" size={24} color="white" />
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-primary">
                Technology Hub
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Deep dive into the cutting-edge algorithms, research, and innovations that power SteganQR's 
              advanced steganographic platform. Explore our technical documentation, research papers, 
              and experimental features.
            </p>
          </div>

          {/* Technical Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {technicalStats?.map((stat, index) => (
              <div key={index} className="bg-card rounded-lg border border-border p-6 text-center hover:shadow-brand-card transition-all duration-200">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Icon name={stat?.icon} size={24} className="text-accent" />
                </div>
                <div className="text-2xl font-bold text-primary mb-1">{stat?.value}</div>
                <div className="text-sm text-muted-foreground">{stat?.label}</div>
              </div>
            ))}
          </div>

          {/* Quick Navigation */}
          <div className="bg-card rounded-lg border border-border p-6 shadow-brand-card">
            <h3 className="text-lg font-semibold text-primary mb-4 text-center">
              Explore Technology Sections
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-3">
              {navigationSections?.map((section) => (
                <button
                  key={section?.id}
                  onClick={() => scrollToSection(section?.id)}
                  className={`flex flex-col items-center space-y-2 p-3 rounded-lg transition-all duration-200 ${
                    activeSection === section?.id
                      ? 'bg-accent text-accent-foreground shadow-brand-card'
                      : 'text-muted-foreground hover:text-primary hover:bg-muted/50'
                  }`}
                >
                  <Icon name={section?.icon} size={20} />
                  <span className="text-xs font-medium text-center leading-tight">
                    {section?.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Floating Navigation */}
      {isScrolled && (
        <div className="fixed top-20 right-6 z-40 bg-card border border-border rounded-lg shadow-brand-modal p-2 hidden lg:block">
          <div className="space-y-1">
            {navigationSections?.map((section) => (
              <button
                key={section?.id}
                onClick={() => scrollToSection(section?.id)}
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 ${
                  activeSection === section?.id
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground hover:text-primary hover:bg-muted/50'
                }`}
                title={section?.name}
              >
                <Icon name={section?.icon} size={16} />
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 space-y-16">
        
        {/* Overview Section */}
        <section id="overview" className="scroll-mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Steganographic Algorithm Overview
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform supports multiple steganographic algorithms, each optimized for different 
              use cases and security requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {algorithmOverview?.map((algorithm, index) => (
              <div key={index} className="bg-card rounded-lg border border-border p-6 hover:shadow-brand-card transition-all duration-200">
                <h3 className="text-xl font-semibold text-primary mb-3">
                  {algorithm?.name}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {algorithm?.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getMetricColor(algorithm?.security)}`}>
                    {algorithm?.security} Security
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getMetricColor(algorithm?.performance)}`}>
                    {algorithm?.performance} Performance
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getMetricColor(algorithm?.complexity)}`}>
                    {algorithm?.complexity} Complexity
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Algorithm Visualization Section */}
        <section id="algorithms" className="scroll-mt-24">
          <AlgorithmVisualization />
        </section>

        {/* Research Papers Section */}
        <section id="research" className="scroll-mt-24">
          <ResearchPapers />
        </section>

        {/* Developer Resources Section */}
        <section id="developer" className="scroll-mt-24">
          <DeveloperResources />
        </section>

        {/* Technical Blog Section */}
        <section id="blog" className="scroll-mt-24">
          <TechnicalBlog />
        </section>

        {/* Innovation Lab Section */}
        <section id="innovation" className="scroll-mt-24">
          <InnovationLab />
        </section>

        {/* Performance Benchmarks Section */}
        <section id="benchmarks" className="scroll-mt-24">
          <PerformanceBenchmarks />
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-to-r from-primary to-accent rounded-lg p-8 lg:p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Integrate Our Technology?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Start building with our comprehensive SDKs and APIs. Join thousands of developers 
            who trust SteganQR for their steganographic needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="secondary" 
              size="lg"
              iconName="Code" 
              iconPosition="left" 
              iconSize={20}
              className="bg-white text-primary hover:bg-white/90"
            >
              View API Documentation
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              iconName="Download" 
              iconPosition="left" 
              iconSize={20}
              className="border-white text-white hover:bg-white hover:text-primary"
            >
              Download SDK
            </Button>
          </div>
        </section>
      </div>
      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                  <Icon name="Shield" size={16} color="white" />
                </div>
                <span className="text-lg font-bold">SteganQR</span>
              </div>
              <p className="text-primary-foreground/80 text-sm">
                Advanced steganographic technology for secure, invisible data transmission.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Technology</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li><a href="#algorithms" className="hover:text-primary-foreground transition-colors">Algorithms</a></li>
                <li><a href="#research" className="hover:text-primary-foreground transition-colors">Research</a></li>
                <li><a href="#benchmarks" className="hover:text-primary-foreground transition-colors">Benchmarks</a></li>
                <li><a href="#innovation" className="hover:text-primary-foreground transition-colors">Innovation Lab</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Developers</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li><a href="#developer" className="hover:text-primary-foreground transition-colors">SDK Documentation</a></li>
                <li><a href="#developer" className="hover:text-primary-foreground transition-colors">API Reference</a></li>
                <li><a href="#developer" className="hover:text-primary-foreground transition-colors">Code Examples</a></li>
                <li><a href="#blog" className="hover:text-primary-foreground transition-colors">Technical Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Connect</h4>
              <div className="flex space-x-3">
                <a href="#" className="w-8 h-8 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
                  <Icon name="Github" size={16} />
                </a>
                <a href="#" className="w-8 h-8 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
                  <Icon name="Twitter" size={16} />
                </a>
                <a href="#" className="w-8 h-8 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
                  <Icon name="Linkedin" size={16} />
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm text-primary-foreground/60">
            <p>&copy; {new Date()?.getFullYear()} SteganQR. All rights reserved. Security hidden in plain sight.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TechnologyHub;