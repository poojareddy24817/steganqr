import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentDemo, setCurrentDemo] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentDemo(prev => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const demoSteps = [
    {
      title: "Upload Your Image",
      description: "Select any image file to begin the steganographic process",
      icon: "Upload",
      color: "text-accent"
    },
    {
      title: "Embed Hidden Data",
      description: "Advanced algorithms invisibly encode your secret information",
      icon: "Shield",
      color: "text-success"
    },
    {
      title: "Generate Secure QR",
      description: "Create QR codes that look ordinary but contain hidden layers",
      icon: "QrCode",
      color: "text-primary"
    }
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-primary via-secondary to-primary overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 crypto-pattern opacity-30"></div>
      {/* Floating Security Indicators */}
      <div className="absolute top-8 right-8 hidden lg:flex flex-col space-y-2">
        <div className="flex items-center space-x-2 px-3 py-2 bg-card/90 backdrop-blur-sm rounded-full shadow-brand-card">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span className="text-xs font-medium text-success">ISO 27001 Certified</span>
        </div>
        <div className="flex items-center space-x-2 px-3 py-2 bg-card/90 backdrop-blur-sm rounded-full shadow-brand-card">
          <Icon name="Shield" size={12} className="text-accent" />
          <span className="text-xs font-medium text-accent">SOC 2 Compliant</span>
        </div>
      </div>
      <div className="relative z-10 container mx-auto px-6 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className={`space-y-8 ${isVisible ? 'animate-reveal' : 'opacity-0'}`}>
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-accent/10 rounded-full">
                <Icon name="Sparkles" size={16} className="text-accent" />
                <span className="text-sm font-medium text-accent">Advanced Steganography Platform</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                Security Hidden in
                <span className="block text-transparent bg-gradient-to-r from-accent to-success bg-clip-text">
                  Plain Sight
                </span>
              </h1>
              
              <p className="text-xl text-slate-300 leading-relaxed max-w-2xl">
                Revolutionary steganographic QR codes that embed invisible data within ordinary images. 
                Advanced cryptography meets elegant simplicity for covert communications.
              </p>
            </div>

            {/* User Path Buttons */}
            <div className="grid sm:grid-cols-3 gap-4">
              <Link 
                to="/technology-hub"
                className="group p-6 bg-card/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-card/20 transition-all duration-300 stego-reveal"
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center group-hover:bg-accent/30 transition-colors">
                    <Icon name="Building" size={24} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Enterprise Security</h3>
                    <p className="text-sm text-slate-400 mt-1">Compliance & Documentation</p>
                  </div>
                </div>
              </Link>

              <Link 
                to="/generator-dashboard"
                className="group p-6 bg-card/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-card/20 transition-all duration-300 stego-reveal"
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="w-12 h-12 bg-success/20 rounded-xl flex items-center justify-center group-hover:bg-success/30 transition-colors">
                    <Icon name="Palette" size={24} className="text-success" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Creative Marketing</h3>
                    <p className="text-sm text-slate-400 mt-1">Brand Protection Examples</p>
                  </div>
                </div>
              </Link>

              <Link 
                to="/scanner-interface"
                className="group p-6 bg-card/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-card/20 transition-all duration-300 stego-reveal"
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="w-12 h-12 bg-warning/20 rounded-xl flex items-center justify-center group-hover:bg-warning/30 transition-colors">
                    <Icon name="UserCheck" size={24} className="text-warning" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Personal Privacy</h3>
                    <p className="text-sm text-slate-400 mt-1">Discrete Communication</p>
                  </div>
                </div>
              </Link>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="default"
                size="lg"
                className="bg-accent hover:bg-accent/90 text-white shadow-brand-card hover:shadow-brand-hover"
                iconName="Play"
                iconPosition="left"
                iconSize={20}
              >
                Try Interactive Demo
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10"
                iconName="BookOpen"
                iconPosition="left"
                iconSize={20}
              >
                View Documentation
              </Button>
            </div>
          </div>

          {/* Right Interactive Demo */}
          <div className={`${isVisible ? 'animate-reveal' : 'opacity-0'} lg:pl-8`} style={{ animationDelay: '200ms' }}>
            <div className="relative">
              {/* Demo Container */}
              <div className="bg-card/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-brand-modal">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Live Steganography Demo</h3>
                  <p className="text-slate-300">Watch invisible data embedding in real-time</p>
                </div>

                {/* Demo Steps */}
                <div className="space-y-6">
                  {demoSteps?.map((step, index) => (
                    <div 
                      key={index}
                      className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-500 ${
                        currentDemo === index 
                          ? 'bg-white/10 border border-white/20 scale-105' :'bg-white/5 border border-transparent'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        currentDemo === index ? 'bg-accent/30' : 'bg-white/10'
                      }`}>
                        <Icon 
                          name={step?.icon} 
                          size={24} 
                          className={currentDemo === index ? 'text-accent' : 'text-white/70'} 
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-semibold transition-colors ${
                          currentDemo === index ? 'text-white' : 'text-white/70'
                        }`}>
                          {step?.title}
                        </h4>
                        <p className={`text-sm transition-colors ${
                          currentDemo === index ? 'text-slate-300' : 'text-slate-400'
                        }`}>
                          {step?.description}
                        </p>
                      </div>
                      {currentDemo === index && (
                        <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Visual Demo Area */}
                <div className="mt-8 p-6 bg-white/5 rounded-xl border border-white/10">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="w-full h-32 bg-gradient-to-br from-slate-600 to-slate-700 rounded-lg mb-3 flex items-center justify-center">
                        <Icon name="Image" size={32} className="text-white/50" />
                      </div>
                      <p className="text-sm text-slate-400">Original Image</p>
                    </div>
                    <div className="text-center">
                      <div className="w-full h-32 bg-gradient-to-br from-accent/20 to-success/20 rounded-lg mb-3 flex items-center justify-center relative overflow-hidden">
                        <Icon name="QrCode" size={32} className="text-white/70" />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
                      </div>
                      <p className="text-sm text-slate-400">Steganographic QR</p>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <p className="text-xs text-slate-500">Visually identical • Cryptographically enhanced</p>
                  </div>
                </div>
              </div>

              {/* Floating Stats */}
              <div className="absolute -bottom-6 -right-6 bg-success/90 backdrop-blur-sm text-white px-4 py-2 rounded-full shadow-brand-card">
                <div className="flex items-center space-x-2">
                  <Icon name="Shield" size={16} />
                  <span className="text-sm font-medium">2M+ Secure Embeddings</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;