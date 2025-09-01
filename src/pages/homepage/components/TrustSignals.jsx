import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';


const TrustSignals = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStat, setCurrentStat] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('trust-signals');
    if (element) observer?.observe(element);

    return () => observer?.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setCurrentStat(prev => (prev + 1) % 4);
      }, 2500);
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  const processingStats = [
    {
      value: '2,847,392',
      label: 'Secure Embeddings Created',
      change: '+12.5%',
      icon: 'Shield',
      color: 'text-success'
    },
    {
      value: '99.97%',
      label: 'Uptime Reliability',
      change: 'Last 30 days',
      icon: 'Activity',
      color: 'text-accent'
    },
    {
      value: '156ms',
      label: 'Average Processing Time',
      change: '-8.2%',
      icon: 'Zap',
      color: 'text-warning'
    },
    {
      value: '847',
      label: 'Enterprise Clients',
      change: '+23.1%',
      icon: 'Building',
      color: 'text-primary'
    }
  ];

  const certifications = [
    {
      name: 'ISO 27001',
      description: 'Information Security Management',
      status: 'Certified',
      validUntil: 'Valid until Dec 2025',
      icon: 'Shield',
      color: 'bg-success/10 text-success border-success/20'
    },
    {
      name: 'SOC 2 Type II',
      description: 'Security & Availability Controls',
      status: 'Compliant',
      validUntil: 'Audited Sep 2024',
      icon: 'CheckCircle',
      color: 'bg-accent/10 text-accent border-accent/20'
    },
    {
      name: 'GDPR',
      description: 'Data Protection Regulation',
      status: 'Compliant',
      validUntil: 'Continuously monitored',
      icon: 'Lock',
      color: 'bg-primary/10 text-primary border-primary/20'
    },
    {
      name: 'CCPA',
      description: 'California Consumer Privacy Act',
      status: 'Compliant',
      validUntil: 'Verified 2024',
      icon: 'UserCheck',
      color: 'bg-success/10 text-success border-success/20'
    }
  ];

  const enterpriseLogos = [
    { name: 'TechCorp', width: 120 },
    { name: 'SecureBank', width: 100 },
    { name: 'DataFlow Inc', width: 140 },
    { name: 'CyberShield', width: 110 },
    { name: 'InfoGuard', width: 130 },
    { name: 'PrivacyFirst', width: 115 }
  ];

  return (
    <section id="trust-signals" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-reveal' : 'opacity-0'}`}>
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-success/10 rounded-full mb-6">
            <Icon name="Award" size={16} className="text-success" />
            <span className="text-sm font-medium text-success">Trusted by Industry Leaders</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-6">
            Enterprise-Grade Security & Compliance
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Built with the highest security standards and trusted by organizations worldwide 
            for mission-critical steganographic operations.
          </p>
        </div>

        {/* Real-time Processing Stats */}
        <div className={`mb-20 ${isVisible ? 'animate-reveal' : 'opacity-0'}`} style={{ animationDelay: '200ms' }}>
          <div className="bg-card rounded-2xl shadow-brand-card p-8 border border-border">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold text-primary mb-2">Live Processing Statistics</h3>
                <p className="text-muted-foreground">Real-time data from our global infrastructure</p>
              </div>
              <div className="flex items-center space-x-2 px-3 py-2 bg-success/10 rounded-full">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-success">Live Data</span>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {processingStats?.map((stat, index) => (
                <div 
                  key={index}
                  className={`p-6 rounded-xl border transition-all duration-500 ${
                    currentStat === index 
                      ? 'bg-accent/5 border-accent/20 scale-105 shadow-brand-card' 
                      : 'bg-background border-border'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <Icon 
                      name={stat?.icon} 
                      size={24} 
                      className={currentStat === index ? 'text-accent' : 'text-muted-foreground'} 
                    />
                    {currentStat === index && (
                      <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                    )}
                  </div>
                  <div className="text-3xl font-bold text-primary mb-1">{stat?.value}</div>
                  <div className="text-sm text-muted-foreground mb-2">{stat?.label}</div>
                  <div className={`text-xs font-medium ${stat?.color}`}>{stat?.change}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Security Certifications */}
        <div className={`mb-20 ${isVisible ? 'animate-reveal' : 'opacity-0'}`} style={{ animationDelay: '400ms' }}>
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-primary mb-4">Security Certifications & Compliance</h3>
            <p className="text-lg text-muted-foreground">
              Independently verified security standards and regulatory compliance
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications?.map((cert, index) => (
              <div 
                key={index}
                className={`p-6 rounded-xl border-2 ${cert?.color} stego-reveal`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <Icon name={cert?.icon} size={24} />
                  <div className="px-2 py-1 bg-current/10 rounded-full">
                    <span className="text-xs font-medium">{cert?.status}</span>
                  </div>
                </div>
                <h4 className="text-lg font-bold mb-2">{cert?.name}</h4>
                <p className="text-sm opacity-80 mb-3">{cert?.description}</p>
                <p className="text-xs opacity-60">{cert?.validUntil}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Enterprise Client Logos */}
        <div className={`mb-20 ${isVisible ? 'animate-reveal' : 'opacity-0'}`} style={{ animationDelay: '600ms' }}>
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-primary mb-4">Trusted by Leading Organizations</h3>
            <p className="text-lg text-muted-foreground">
              Join hundreds of enterprises securing their communications with SteganQR
            </p>
          </div>

          <div className="bg-card rounded-2xl shadow-brand-card p-8 border border-border">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
              {enterpriseLogos?.map((logo, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-center p-4 rounded-lg hover:bg-muted/50 transition-colors duration-300"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div 
                    className="bg-muted-foreground/20 rounded-lg flex items-center justify-center text-muted-foreground font-semibold text-sm"
                    style={{ width: `${logo?.width}px`, height: '60px' }}
                  >
                    {logo?.name}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground mb-4">
                * Client logos shown with permission. Many enterprise clients prefer confidential partnerships.
              </p>
              <Link 
                to="/pricing-enterprise"
                className="inline-flex items-center space-x-2 text-accent hover:text-accent/80 font-medium transition-colors"
              >
                <span>View Enterprise Solutions</span>
                <Icon name="ArrowRight" size={16} />
              </Link>
            </div>
          </div>
        </div>

        {/* Security Status Dashboard */}
        <div className={`${isVisible ? 'animate-reveal' : 'opacity-0'}`} style={{ animationDelay: '800ms' }}>
          <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl shadow-brand-modal p-8 text-white">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-4">Real-Time Security Status</h3>
                <p className="text-slate-300 mb-6">
                  Our security infrastructure is continuously monitored and updated to maintain 
                  the highest levels of protection for your steganographic operations.
                </p>
                
                <div className="space-y-4">
                  {[
                    { label: 'System Status', value: 'All Systems Operational', icon: 'CheckCircle', color: 'text-success' },
                    { label: 'Last Security Audit', value: 'September 2024', icon: 'Shield', color: 'text-accent' },
                    { label: 'Encryption Standard', value: 'AES-256 + Custom Algorithms', icon: 'Lock', color: 'text-warning' },
                    { label: 'Data Centers', value: '12 Global Locations', icon: 'Globe', color: 'text-success' }
                  ]?.map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Icon name={item?.icon} size={20} className={item?.color} />
                      <span className="text-slate-300">{item?.label}:</span>
                      <span className="font-semibold">{item?.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-xl font-bold">Security Score</h4>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                    <span className="text-sm">Excellent</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {[
                    { metric: 'Encryption Strength', score: 98 },
                    { metric: 'Access Controls', score: 96 },
                    { metric: 'Data Integrity', score: 99 },
                    { metric: 'Audit Compliance', score: 97 }
                  ]?.map((metric, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-2">
                        <span>{metric?.metric}</span>
                        <span className="font-semibold">{metric?.score}%</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-success to-accent h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${metric?.score}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSignals;