import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import all components
import QuickStartGuide from './components/QuickStartGuide';
import ApiExplorer from './components/ApiExplorer';
import TechnicalSpecs from './components/TechnicalSpecs';
import IntegrationExamples from './components/IntegrationExamples';
import SandboxEnvironment from './components/SandboxEnvironment';
import SecurityDocumentation from './components/SecurityDocumentation';
import CommunityResources from './components/CommunityResources';

const DeveloperApiPage = () => {
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
    { id: 'quick-start', name: 'Quick Start', icon: 'Zap' },
    { id: 'api-explorer', name: 'API Explorer', icon: 'Play' },
    { id: 'technical-specs', name: 'Technical Specs', icon: 'Settings' },
    { id: 'integration-examples', name: 'Integration Examples', icon: 'Code2' },
    { id: 'sandbox', name: 'Sandbox', icon: 'TestTube' },
    { id: 'security', name: 'Security', icon: 'ShieldCheck' },
    { id: 'community', name: 'Community', icon: 'Users' }
  ];

  const apiStats = [
    { label: 'API Endpoints', value: '12+', icon: 'Zap' },
    { label: 'Supported Languages', value: '8', icon: 'Code' },
    { label: 'Monthly API Calls', value: '50M+', icon: 'Activity' },
    { label: 'Developer Community', value: '10K+', icon: 'Users' }
  ];

  const keyFeatures = [
    {
      title: 'RESTful API Design',
      description: 'Clean, intuitive endpoints following REST principles with comprehensive documentation',
      icon: 'Globe',
      color: 'text-blue-600'
    },
    {
      title: 'Multiple SDKs',
      description: 'Official SDKs for JavaScript, Python, Java, C#, and more with active maintenance',
      icon: 'Package',
      color: 'text-green-600'
    },
    {
      title: 'Real-time Processing',
      description: 'WebSocket support for live processing updates and batch operation monitoring',
      icon: 'Zap',
      color: 'text-yellow-600'
    },
    {
      title: 'Enterprise Security',
      description: 'SOC 2 certified with end-to-end encryption and comprehensive audit trails',
      icon: 'Shield',
      color: 'text-red-600'
    },
    {
      title: 'Scalable Infrastructure',
      description: 'Auto-scaling architecture handling millions of requests with 99.9% uptime SLA',
      icon: 'Server',
      color: 'text-purple-600'
    },
    {
      title: 'Developer Experience',
      description: 'Interactive documentation, sandbox environment, and comprehensive code examples',
      icon: 'Heart',
      color: 'text-pink-600'
    }
  ];

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const renderOverviewSection = () => (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium">
          <Icon name="Code" size={16} />
          <span>Developer API Documentation</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
          Build with
          <span className="text-accent"> SteganQR</span>
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Comprehensive technical integration resources for developers building steganographic 
          capabilities into existing platforms. From quick-start guides to advanced security 
          documentation, everything you need to integrate invisible data embedding technology.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg"
            onClick={() => scrollToSection('quick-start')}
            iconName="Zap"
            iconSize={20}
          >
            Get Started
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => scrollToSection('api-explorer')}
            iconName="Play"
            iconSize={20}
          >
            Try API Explorer
          </Button>
        </div>
      </div>

      {/* API Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {apiStats?.map((stat, index) => (
          <div key={index} className="text-center p-6 bg-card border border-border rounded-lg">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Icon name={stat?.icon} size={24} className="text-accent" />
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">{stat?.value}</div>
            <div className="text-sm text-muted-foreground">{stat?.label}</div>
          </div>
        ))}
      </div>

      {/* Key Features */}
      <div>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Everything You Need to Build
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our API provides powerful steganographic capabilities with enterprise-grade 
            security and developer-friendly tools.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {keyFeatures?.map((feature, index) => (
            <div key={index} className="p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-muted/50 rounded-lg flex items-center justify-center mb-4">
                <Icon name={feature?.icon} size={24} className={feature?.color} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{feature?.title}</h3>
              <p className="text-muted-foreground">{feature?.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Getting Started CTA */}
      <div className="bg-gradient-to-r from-accent/10 to-primary/10 rounded-2xl p-8 text-center">
        <h3 className="text-2xl font-bold text-foreground mb-4">
          Ready to Start Building?
        </h3>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Join thousands of developers who are already using SteganQR to build 
          innovative applications with invisible data embedding technology.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg"
            onClick={() => scrollToSection('quick-start')}
            iconName="ArrowRight"
            iconSize={20}
          >
            View Quick Start Guide
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => scrollToSection('sandbox')}
            iconName="TestTube"
            iconSize={20}
          >
            Try Sandbox Environment
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Developer API - SteganQR | Comprehensive Integration Resources</title>
        <meta name="description" content="Complete developer documentation for SteganQR API. Quick-start guides, interactive explorer, SDKs, and security documentation for steganographic integration." />
        <meta name="keywords" content="steganography API, developer documentation, QR code API, image processing SDK, security integration" />
      </Helmet>
      <Header />
      <div className="pt-16">
        <div className="flex">
          {/* Sidebar Navigation */}
          <div className={`fixed left-0 top-16 h-full w-64 bg-card border-r border-border z-40 transition-transform duration-300 ${
            isScrolled ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}>
            <div className="p-6">
              <h3 className="font-semibold text-foreground mb-4">Documentation</h3>
              <nav className="space-y-1">
                {navigationSections?.map((section) => (
                  <button
                    key={section?.id}
                    onClick={() => scrollToSection(section?.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 text-sm rounded-lg transition-colors ${
                      activeSection === section?.id
                        ? 'bg-accent text-accent-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon name={section?.icon} size={16} />
                    <span>{section?.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 lg:ml-64">
            <div className="max-w-4xl mx-auto px-6 py-12 space-y-16">
              
              {/* Overview Section */}
              <section id="overview">
                {renderOverviewSection()}
              </section>

              {/* Quick Start Guide */}
              <section id="quick-start">
                <QuickStartGuide />
              </section>

              {/* API Explorer */}
              <section id="api-explorer">
                <ApiExplorer />
              </section>

              {/* Technical Specifications */}
              <section id="technical-specs">
                <TechnicalSpecs />
              </section>

              {/* Integration Examples */}
              <section id="integration-examples">
                <IntegrationExamples />
              </section>

              {/* Sandbox Environment */}
              <section id="sandbox">
                <SandboxEnvironment />
              </section>

              {/* Security Documentation */}
              <section id="security">
                <SecurityDocumentation />
              </section>

              {/* Community Resources */}
              <section id="community">
                <CommunityResources />
              </section>

            </div>
          </div>
        </div>
      </div>
      {/* Floating Action Button for Mobile Navigation */}
      <button
        onClick={() => setIsScrolled(!isScrolled)}
        className={`fixed bottom-6 left-6 w-12 h-12 bg-accent text-accent-foreground rounded-full shadow-lg flex items-center justify-center lg:hidden transition-transform ${
          isScrolled ? 'scale-100' : 'scale-0'
        }`}
      >
        <Icon name="Menu" size={20} />
      </button>
      {/* Footer */}
      <footer className="lg:ml-64 bg-card border-t border-border">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold text-foreground mb-4">Developer Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">API Reference</a></li>
                <li><a href="#" className="hover:text-foreground">SDK Downloads</a></li>
                <li><a href="#" className="hover:text-foreground">Code Examples</a></li>
                <li><a href="#" className="hover:text-foreground">Tutorials</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Community</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Developer Forum</a></li>
                <li><a href="#" className="hover:text-foreground">GitHub Repository</a></li>
                <li><a href="#" className="hover:text-foreground">Discord Server</a></li>
                <li><a href="#" className="hover:text-foreground">Stack Overflow</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Contact Support</a></li>
                <li><a href="#" className="hover:text-foreground">Status Page</a></li>
                <li><a href="#" className="hover:text-foreground">Service Level Agreement</a></li>
                <li><a href="#" className="hover:text-foreground">Security Reports</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <Icon name="Shield" size={16} color="white" />
              </div>
              <span className="font-semibold text-foreground">SteganQR Developer API</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date()?.getFullYear()} SteganQR. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DeveloperApiPage;