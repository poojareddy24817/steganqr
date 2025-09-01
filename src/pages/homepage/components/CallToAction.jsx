import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CallToAction = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('call-to-action');
    if (element) observer?.observe(element);

    return () => observer?.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setCurrentFeature(prev => (prev + 1) % 3);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  const features = [
    {
      title: 'Advanced Generator',
      description: 'Create steganographic QR codes with military-grade encryption',
      icon: 'QrCode',
      path: '/generator-dashboard',
      color: 'from-accent to-blue-600'
    },
    {
      title: 'Intelligent Scanner',
      description: 'Detect and decode hidden information with precision',
      icon: 'ScanLine',
      path: '/scanner-interface',
      color: 'from-success to-emerald-600'
    },
    {
      title: 'Developer API',
      description: 'Integrate steganographic capabilities into your platform',
      icon: 'Code',
      path: '/developer-api',
      color: 'from-primary to-slate-700'
    }
  ];

  const benefits = [
    {
      icon: 'Shield',
      title: 'Military-Grade Security',
      description: 'AES-256 encryption with custom steganographic algorithms'
    },
    {
      icon: 'Zap',
      title: 'Lightning Fast',
      description: 'Process images and generate QR codes in under 100ms'
    },
    {
      icon: 'Globe',
      title: 'Global Infrastructure',
      description: '12 data centers worldwide for optimal performance'
    },
    {
      icon: 'Users',
      title: 'Enterprise Ready',
      description: 'Trusted by 847+ organizations for secure communications'
    }
  ];

  return (
    <section id="call-to-action" className="py-24 bg-gradient-to-br from-primary via-secondary to-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 crypto-pattern opacity-20"></div>
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-accent/10 rounded-full animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-success/10 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Main CTA Section */}
        <div className={`text-center mb-20 ${isVisible ? 'animate-reveal' : 'opacity-0'}`}>
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6">
            <Icon name="Rocket" size={16} className="text-accent" />
            <span className="text-sm font-medium text-white">Start Your Secure Journey</span>
          </div>
          
          <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to Hide in
            <span className="block text-transparent bg-gradient-to-r from-accent to-success bg-clip-text">
              Plain Sight?
            </span>
          </h2>
          
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            Join thousands of security professionals, marketers, and privacy advocates who trust 
            SteganQR for their covert communication needs. Start with our free tier today.
          </p>

          {/* Primary CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button 
              variant="default"
              size="xl"
              className="bg-accent hover:bg-accent/90 text-white shadow-brand-modal hover:shadow-brand-hover transform hover:scale-105 transition-all duration-300"
              iconName="Play"
              iconPosition="left"
              iconSize={20}
            >
              Start Free Trial
            </Button>
            
            <Button 
              variant="outline"
              size="xl"
              className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
              iconName="Calendar"
              iconPosition="left"
              iconSize={20}
            >
              Schedule Demo
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-slate-400">
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={16} className="text-success" />
              <span className="text-sm">No Credit Card Required</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={16} className="text-accent" />
              <span className="text-sm">Enterprise Security</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} className="text-warning" />
              <span className="text-sm">Setup in 2 Minutes</span>
            </div>
          </div>
        </div>

        {/* Feature Showcase */}
        <div className={`mb-20 ${isVisible ? 'animate-reveal' : 'opacity-0'}`} style={{ animationDelay: '300ms' }}>
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Choose Your Starting Point</h3>
            <p className="text-slate-300 text-lg">
              Multiple entry points designed for different use cases and expertise levels
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {features?.map((feature, index) => (
              <Link
                key={index}
                to={feature?.path}
                className={`group p-8 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl hover:bg-white/15 transition-all duration-500 stego-reveal ${
                  currentFeature === index ? 'ring-2 ring-accent/50 scale-105' : ''
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="text-center space-y-6">
                  <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${feature?.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon name={feature?.icon} size={32} className="text-white" />
                  </div>
                  
                  <div>
                    <h4 className="text-2xl font-bold text-white mb-3">{feature?.title}</h4>
                    <p className="text-slate-300 leading-relaxed">{feature?.description}</p>
                  </div>
                  
                  <div className="flex items-center justify-center space-x-2 text-accent group-hover:text-white transition-colors">
                    <span className="font-medium">Get Started</span>
                    <Icon name="ArrowRight" size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
                
                {currentFeature === index && (
                  <div className="absolute top-4 right-4 w-3 h-3 bg-accent rounded-full animate-pulse"></div>
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* Benefits Grid */}
        <div className={`mb-20 ${isVisible ? 'animate-reveal' : 'opacity-0'}`} style={{ animationDelay: '600ms' }}>
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Why Choose SteganQR?</h3>
            <p className="text-slate-300 text-lg">
              Built for professionals who demand the highest standards of security and performance
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits?.map((benefit, index) => (
              <div 
                key={index}
                className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl stego-reveal"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4">
                  <Icon name={benefit?.icon} size={24} className="text-accent" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{benefit?.title}</h4>
                <p className="text-sm text-slate-400">{benefit?.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA with Urgency */}
        <div className={`text-center ${isVisible ? 'animate-reveal' : 'opacity-0'}`} style={{ animationDelay: '900ms' }}>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <Icon name="Clock" size={20} className="text-warning" />
              <span className="text-warning font-medium">Limited Time Offer</span>
            </div>
            
            <h3 className="text-3xl font-bold text-white mb-4">
              Get 3 Months Free on Annual Plans
            </h3>
            
            <p className="text-slate-300 mb-8 text-lg">
              Join our growing community of security professionals and start protecting your 
              communications with invisible steganographic technology.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="default"
                size="lg"
                className="bg-success hover:bg-success/90 text-white shadow-brand-card"
                iconName="Zap"
                iconPosition="left"
                iconSize={18}
              >
                Claim Free Months
              </Button>
              
              <Link 
                to="/pricing-enterprise"
                className="inline-flex items-center space-x-2 px-6 py-3 text-white hover:text-accent transition-colors"
              >
                <span>View All Plans</span>
                <Icon name="ExternalLink" size={16} />
              </Link>
            </div>
            
            <div className="mt-6 text-sm text-slate-400">
              * Offer valid for new customers only. Terms and conditions apply.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;