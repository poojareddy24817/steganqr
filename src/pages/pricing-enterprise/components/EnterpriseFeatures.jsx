import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EnterpriseFeatures = () => {
  const features = [
    {
      icon: 'Settings',
      title: 'Custom Algorithm Development',
      description: 'Proprietary steganographic algorithms tailored to your specific security requirements and use cases.',
      benefits: ['Unique security signatures', 'Industry-specific optimization', 'Competitive advantage']
    },
    {
      icon: 'Server',
      title: 'On-Premise Deployment',
      description: 'Complete control over your data with on-premise or private cloud deployment options.',
      benefits: ['Data sovereignty', 'Custom security policies', 'Air-gapped environments']
    },
    {
      icon: 'BarChart3',
      title: 'Advanced Analytics & Reporting',
      description: 'Comprehensive insights into usage patterns, security metrics, and operational efficiency.',
      benefits: ['Real-time dashboards', 'Custom reports', 'Predictive analytics']
    },
    {
      icon: 'Headphones',
      title: 'Priority Support & SLA',
      description: 'Dedicated support team with guaranteed response times and proactive monitoring.',
      benefits: ['1-hour response time', 'Dedicated account manager', '99.9% uptime SLA']
    },
    {
      icon: 'Shield',
      title: 'Compliance & Certifications',
      description: 'Meet regulatory requirements with comprehensive compliance tools and certifications.',
      benefits: ['SOC 2 Type II', 'ISO 27001', 'HIPAA compliance']
    },
    {
      icon: 'Users',
      title: 'Team Management & SSO',
      description: 'Enterprise-grade user management with single sign-on and role-based access controls.',
      benefits: ['SAML/OIDC integration', 'Role-based permissions', 'Audit logging']
    }
  ];

  const complianceLogos = [
    { name: 'SOC 2 Type II', icon: 'Shield' },
    { name: 'ISO 27001', icon: 'Award' },
    { name: 'HIPAA', icon: 'FileText' },
    { name: 'GDPR', icon: 'Globe' }
  ];

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-primary mb-4">Enterprise Features</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Advanced capabilities designed for large organizations with complex security requirements
        </p>
      </div>
      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features?.map((feature, index) => (
          <div 
            key={index}
            className="bg-card rounded-xl border border-border p-6 hover:shadow-brand-modal transition-all duration-300 group"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                <Icon name={feature?.icon} size={24} className="text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-primary">{feature?.title}</h3>
            </div>
            
            <p className="text-muted-foreground mb-4">{feature?.description}</p>
            
            <ul className="space-y-2">
              {feature?.benefits?.map((benefit, benefitIndex) => (
                <li key={benefitIndex} className="flex items-center space-x-2">
                  <Icon name="Check" size={14} className="text-success flex-shrink-0" />
                  <span className="text-sm text-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {/* Compliance Section */}
      <div className="bg-muted/30 rounded-xl p-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-primary mb-2">Compliance & Certifications</h3>
          <p className="text-muted-foreground">
            Meet the highest security and compliance standards
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {complianceLogos?.map((cert, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-card rounded-lg border border-border flex items-center justify-center mx-auto mb-3 shadow-brand-card">
                <Icon name={cert?.icon} size={24} className="text-accent" />
              </div>
              <span className="text-sm font-medium text-foreground">{cert?.name}</span>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" iconName="Download" iconPosition="left">
            Download Compliance Documentation
          </Button>
        </div>
      </div>
      {/* Custom Solutions CTA */}
      <div className="bg-gradient-to-r from-primary to-accent rounded-xl p-8 text-center text-white">
        <h3 className="text-2xl font-bold mb-4">Need Custom Solutions?</h3>
        <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
          Our enterprise team specializes in creating tailored steganographic solutions for unique security challenges and industry-specific requirements.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="secondary" 
            size="lg"
            iconName="Calendar"
            iconPosition="left"
          >
            Schedule Consultation
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-white text-white hover:bg-white hover:text-primary"
            iconName="FileText"
            iconPosition="left"
          >
            Request Custom Quote
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EnterpriseFeatures;