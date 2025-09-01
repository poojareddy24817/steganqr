import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import PricingCard from './components/PricingCard';
import FeatureComparison from './components/FeatureComparison';
import ROICalculator from './components/ROICalculator';
import EnterpriseFeatures from './components/EnterpriseFeatures';
import TestimonialSection from './components/TestimonialSection';
import FAQSection from './components/FAQSection';

const PricingEnterprise = () => {
  const [billingPeriod, setBillingPeriod] = useState('monthly');
  const [selectedPlan, setSelectedPlan] = useState(null);

  const pricingPlans = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      period: billingPeriod === 'monthly' ? 'month' : 'year',
      description: 'Perfect for individuals and small projects',
      features: [
        'Up to 10 QR codes per day',
        'Basic steganographic algorithm',
        'PNG and JPG export formats',
        'Community forum support',
        'Standard encryption (AES-128)',
        'Basic QR code customization'
      ],
      limitations: [
        'No batch processing',
        'No advanced analytics',
        'No API access',
        'No priority support'
      ],
      buttonText: 'Get Started Free',
      buttonVariant: 'outline'
    },
    {
      id: 'professional',
      name: 'Professional',
      price: billingPeriod === 'monthly' ? 49 : 470,
      period: billingPeriod === 'monthly' ? 'month' : 'year',
      description: 'Advanced features for growing businesses',
      features: [
        'Up to 1,000 QR codes per day',
        '5 steganographic algorithms',
        'All export formats (PNG, JPG, SVG, PDF)',
        'Email and chat support',
        'Advanced encryption (AES-256)',
        'Batch processing capabilities',
        'Basic analytics dashboard',
        'API access (10,000 calls/hour)',
        'Custom branding options',
        'Team collaboration tools'
      ],
      buttonText: 'Start Professional Trial',
      buttonVariant: 'default'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: billingPeriod === 'monthly' ? 199 : 1990,
      period: billingPeriod === 'monthly' ? 'month' : 'year',
      description: 'Complete solution for large organizations',
      features: [
        'Unlimited QR code generation',
        'Custom algorithm development',
        'On-premise deployment option',
        'Dedicated account manager',
        'Priority phone support (1hr SLA)',
        'Advanced analytics & reporting',
        'Unlimited API calls',
        'White-label solutions',
        'SSO and enterprise integrations',
        'Compliance certifications',
        'Custom training & onboarding',
        'Advanced security features'
      ],
      buttonText: 'Contact Sales',
      buttonVariant: 'default'
    }
  ];

  const handlePlanSelection = (plan) => {
    setSelectedPlan(plan);
    if (plan?.id === 'enterprise') {
      // Scroll to enterprise contact section
      document.getElementById('enterprise-contact')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Handle other plan selections
      console.log('Selected plan:', plan);
    }
  };

  const trustIndicators = [
    { icon: 'Shield', text: 'SOC 2 Certified', color: 'text-success' },
    { icon: 'Lock', text: 'ISO 27001', color: 'text-accent' },
    { icon: 'Award', text: 'HIPAA Compliant', color: 'text-success' },
    { icon: 'Globe', text: 'GDPR Ready', color: 'text-accent' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-bold text-primary mb-6">
              Transparent Pricing for
              <span className="text-accent block">Every Security Need</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              From individual privacy to enterprise-grade security, choose the plan that fits your steganographic requirements. No hidden fees, no surprises.
            </p>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              {trustIndicators?.map((indicator, index) => (
                <div key={index} className="flex items-center space-x-2 px-4 py-2 bg-card rounded-full border border-border">
                  <Icon name={indicator?.icon} size={16} className={indicator?.color} />
                  <span className="text-sm font-medium text-foreground">{indicator?.text}</span>
                </div>
              ))}
            </div>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center space-x-4 mb-12">
              <span className={`text-sm font-medium ${billingPeriod === 'monthly' ? 'text-primary' : 'text-muted-foreground'}`}>
                Monthly
              </span>
              <button
                onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'annual' : 'monthly')}
                className={`relative w-14 h-7 rounded-full transition-colors duration-200 ${
                  billingPeriod === 'annual' ? 'bg-accent' : 'bg-muted'
                }`}
              >
                <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                  billingPeriod === 'annual' ? 'translate-x-8' : 'translate-x-1'
                }`} />
              </button>
              <span className={`text-sm font-medium ${billingPeriod === 'annual' ? 'text-primary' : 'text-muted-foreground'}`}>
                Annual
              </span>
              {billingPeriod === 'annual' && (
                <span className="bg-success text-success-foreground px-2 py-1 rounded-full text-xs font-medium">
                  Save 20%
                </span>
              )}
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {pricingPlans?.map((plan, index) => (
              <PricingCard
                key={plan?.id}
                plan={plan}
                isPopular={index === 1}
                onSelectPlan={handlePlanSelection}
              />
            ))}
          </div>

          {/* Money Back Guarantee */}
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 px-6 py-3 bg-success/10 rounded-full border border-success/20">
              <Icon name="Shield" size={20} className="text-success" />
              <span className="text-success font-medium">30-day money-back guarantee</span>
            </div>
          </div>
        </div>
      </section>
      {/* Feature Comparison */}
      <section className="py-16 px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <FeatureComparison />
        </div>
      </section>
      {/* ROI Calculator */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ROICalculator />
        </div>
      </section>
      {/* Enterprise Features */}
      <section className="py-16 px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <EnterpriseFeatures />
        </div>
      </section>
      {/* Testimonials */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <TestimonialSection />
        </div>
      </section>
      {/* Enterprise Contact Section */}
      <section id="enterprise-contact" className="py-16 px-6 lg:px-8 bg-gradient-to-r from-primary to-accent">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready for Enterprise-Grade Security?</h2>
          <p className="text-xl opacity-90 mb-8">
            Let's discuss your specific requirements and create a custom solution that fits your organization's needs.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <Icon name="Calendar" size={32} className="mx-auto mb-3 opacity-90" />
              <h3 className="font-semibold mb-2">Schedule Demo</h3>
              <p className="text-sm opacity-80">See SteganQR in action with your use cases</p>
            </div>
            <div className="text-center">
              <Icon name="Users" size={32} className="mx-auto mb-3 opacity-90" />
              <h3 className="font-semibold mb-2">Consultation</h3>
              <p className="text-sm opacity-80">Discuss requirements with security experts</p>
            </div>
            <div className="text-center">
              <Icon name="FileText" size={32} className="mx-auto mb-3 opacity-90" />
              <h3 className="font-semibold mb-2">Custom Quote</h3>
              <p className="text-sm opacity-80">Receive tailored pricing for your needs</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="secondary" 
              size="lg"
              iconName="Calendar"
              iconPosition="left"
            >
              Schedule Enterprise Demo
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white hover:text-primary"
              iconName="Phone"
              iconPosition="left"
            >
              Call Sales: +1 (555) 123-4567
            </Button>
          </div>
        </div>
      </section>
      {/* FAQ Section */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <FAQSection />
        </div>
      </section>
      {/* Final CTA */}
      <section className="py-16 px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-primary mb-4">Start Securing Your Communications Today</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of organizations already using SteganQR for secure, invisible data transmission.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="default" 
              size="lg"
              iconName="ArrowRight"
              iconPosition="right"
              className="bg-accent hover:bg-accent/90"
            >
              Start Free Trial
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              iconName="MessageCircle"
              iconPosition="left"
            >
              Talk to Sales
            </Button>
          </div>

          <p className="text-sm text-muted-foreground mt-4">
            No credit card required • 30-day money-back guarantee • Cancel anytime
          </p>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Icon name="Shield" size={24} className="text-accent" />
                <span className="text-xl font-bold">SteganQR</span>
              </div>
              <p className="text-sm opacity-80">
                Security hidden in plain sight. Advanced steganography made simple.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>QR Generator</li>
                <li>Scanner Interface</li>
                <li>API Documentation</li>
                <li>Security Features</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>About Us</li>
                <li>Security</li>
                <li>Compliance</li>
                <li>Careers</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>Help Center</li>
                <li>Contact Sales</li>
                <li>System Status</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-primary-foreground/20 pt-8 text-center">
            <p className="text-sm opacity-80">
              © {new Date()?.getFullYear()} SteganQR. All rights reserved. Built with security in mind.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PricingEnterprise;