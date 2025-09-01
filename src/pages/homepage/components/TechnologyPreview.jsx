import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const TechnologyPreview = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('technology-preview');
    if (element) observer?.observe(element);

    return () => observer?.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setActiveStep(prev => (prev + 1) % 4);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  const transformationSteps = [
    {
      id: 'input',
      title: 'Original Data',
      description: 'Your secret message or sensitive information',
      visual: 'text',
      content: 'Confidential Meeting Notes:\nProject Alpha launch scheduled for Q2 2025\nBudget allocation: $2.5M\nTeam leads: Sarah, Mike, Chen',
      icon: 'FileText',
      color: 'from-slate-500 to-slate-600'
    },
    {
      id: 'encode',
      title: 'Cryptographic Encoding',
      description: 'Advanced algorithms transform data into pixel-level modifications',
      visual: 'binary',
      content: '01001000 01101001 01100100 01100100 01100101 01101110\n01000100 01100001 01110100 01100001 00100000\n01000101 01101110 01100011 01101111 01100100 01101001 01101110 01100111',
      icon: 'Binary',
      color: 'from-accent to-blue-600'
    },
    {
      id: 'embed',
      title: 'Steganographic Embedding',
      description: 'Invisible integration into image pixels without visual detection',
      visual: 'pixels',
      content: 'RGB(142,87,156) → RGB(142,87,157)\nRGB(203,145,98) → RGB(203,145,99)\nRGB(67,123,201) → RGB(67,123,200)',
      icon: 'Layers',
      color: 'from-success to-emerald-600'
    },
    {
      id: 'output',
      title: 'Steganographic QR Code',
      description: 'Ordinary-looking QR code containing hidden layers of information',
      visual: 'qr',
      content: 'QR Code Generated\nVisible: Standard QR data\nHidden: Encrypted payload\nIntegrity: Verified ✓',
      icon: 'QrCode',
      color: 'from-primary to-slate-800'
    }
  ];

  const renderVisual = (step) => {
    switch (step?.visual) {
      case 'text':
        return (
          <div className="w-full h-48 bg-slate-100 rounded-lg p-4 font-mono text-xs overflow-hidden">
            <div className="space-y-1">
              {step?.content?.split('\n')?.map((line, i) => (
                <div key={i} className="text-slate-700 animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                  {line}
                </div>
              ))}
            </div>
          </div>
        );
      case 'binary':
        return (
          <div className="w-full h-48 bg-slate-900 rounded-lg p-4 font-mono text-xs overflow-hidden">
            <div className="space-y-1">
              {step?.content?.split('\n')?.map((line, i) => (
                <div key={i} className="text-accent animate-fade-in" style={{ animationDelay: `${i * 150}ms` }}>
                  {line}
                </div>
              ))}
            </div>
          </div>
        );
      case 'pixels':
        return (
          <div className="w-full h-48 bg-slate-800 rounded-lg p-4 font-mono text-xs overflow-hidden">
            <div className="space-y-2">
              {step?.content?.split('\n')?.map((line, i) => (
                <div key={i} className="text-success animate-fade-in" style={{ animationDelay: `${i * 200}ms` }}>
                  {line}
                </div>
              ))}
            </div>
          </div>
        );
      case 'qr':
        return (
          <div className="w-full h-48 bg-white rounded-lg p-4 flex items-center justify-center relative overflow-hidden">
            <div className="w-32 h-32 bg-slate-900 rounded-lg flex items-center justify-center">
              <Icon name="QrCode" size={64} className="text-white" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-success/20 to-transparent animate-pulse"></div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="technology-preview" className="py-24 bg-background">
      <div className="container mx-auto px-6 lg:px-8">
        <div className={`text-center mb-16 ${isVisible ? 'animate-reveal' : 'opacity-0'}`}>
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-accent/10 rounded-full mb-6">
            <Icon name="Cpu" size={16} className="text-accent" />
            <span className="text-sm font-medium text-accent">Advanced Technology</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-6">
            Data Transformation Process
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Watch how ordinary data morphs through cryptographic layers to become invisible information 
            embedded within standard QR codes.
          </p>
        </div>

        {/* Process Flow */}
        <div className="max-w-6xl mx-auto">
          {/* Step Navigation */}
          <div className="flex justify-center mb-12">
            <div className="flex items-center space-x-4 p-2 bg-muted rounded-full">
              {transformationSteps?.map((step, index) => (
                <React.Fragment key={step?.id}>
                  <button
                    onClick={() => setActiveStep(index)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                      activeStep === index
                        ? 'bg-accent text-accent-foreground shadow-brand-card'
                        : 'text-muted-foreground hover:text-primary hover:bg-background'
                    }`}
                  >
                    <Icon 
                      name={step?.icon} 
                      size={16} 
                      className={activeStep === index ? 'text-accent-foreground' : 'text-muted-foreground'} 
                    />
                    <span className="text-sm font-medium hidden sm:inline">{step?.title}</span>
                  </button>
                  {index < transformationSteps?.length - 1 && (
                    <div className="w-8 h-px bg-border"></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Active Step Display */}
          <div className={`${isVisible ? 'animate-reveal' : 'opacity-0'}`} style={{ animationDelay: '300ms' }}>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Step Information */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gradient-to-r ${transformationSteps?.[activeStep]?.color} text-white`}>
                    <Icon name={transformationSteps?.[activeStep]?.icon} size={14} />
                    <span className="text-xs font-medium">Step {activeStep + 1}</span>
                  </div>
                  
                  <h3 className="text-3xl font-bold text-primary">
                    {transformationSteps?.[activeStep]?.title}
                  </h3>
                  
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {transformationSteps?.[activeStep]?.description}
                  </p>
                </div>

                {/* Technical Details */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-primary">Technical Implementation</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Icon name="Shield" size={16} className="text-success" />
                        <span className="text-sm font-medium text-primary">Security</span>
                      </div>
                      <p className="text-xs text-muted-foreground">AES-256 encryption with custom steganographic algorithms</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Icon name="Zap" size={16} className="text-accent" />
                        <span className="text-sm font-medium text-primary">Performance</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Real-time processing with optimized algorithms</p>
                    </div>
                  </div>
                </div>

                {/* Progress Indicator */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Process Progress</span>
                    <span className="text-primary font-medium">{Math.round(((activeStep + 1) / 4) * 100)}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-accent to-success h-2 rounded-full transition-all duration-500"
                      style={{ width: `${((activeStep + 1) / 4) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Visual Representation */}
              <div className="space-y-6">
                <div className="relative">
                  {renderVisual(transformationSteps?.[activeStep])}
                  
                  {/* Morphing Animation Overlay */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-2 right-2 flex items-center space-x-1 px-2 py-1 bg-card/90 backdrop-blur-sm rounded-full">
                      <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                      <span className="text-xs font-medium text-success">Live</span>
                    </div>
                  </div>
                </div>

                {/* Data Flow Visualization */}
                <div className="flex items-center justify-center space-x-4">
                  {[0, 1, 2, 3]?.map((index) => (
                    <React.Fragment key={index}>
                      <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index <= activeStep ? 'bg-accent' : 'bg-muted'
                      }`}></div>
                      {index < 3 && (
                        <div className={`w-8 h-px transition-all duration-300 ${
                          index < activeStep ? 'bg-accent' : 'bg-muted'
                        }`}></div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technology Stats */}
        <div className={`mt-20 ${isVisible ? 'animate-reveal' : 'opacity-0'}`} style={{ animationDelay: '600ms' }}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: 'Embedding Capacity', value: '2KB+', icon: 'Database' },
              { label: 'Processing Speed', value: '<100ms', icon: 'Zap' },
              { label: 'Visual Fidelity', value: '99.9%', icon: 'Eye' },
              { label: 'Detection Resistance', value: 'Military Grade', icon: 'Shield' }
            ]?.map((stat, index) => (
              <div key={index} className="text-center p-6 bg-card rounded-xl shadow-brand-card stego-reveal">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon name={stat?.icon} size={24} className="text-accent" />
                </div>
                <div className="text-2xl font-bold text-primary mb-1">{stat?.value}</div>
                <div className="text-sm text-muted-foreground">{stat?.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologyPreview;