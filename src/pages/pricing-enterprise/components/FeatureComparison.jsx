import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const FeatureComparison = () => {
  const [activeCategory, setActiveCategory] = useState('core');

  const categories = [
    { id: 'core', name: 'Core Features', icon: 'Shield' },
    { id: 'security', name: 'Security & Compliance', icon: 'Lock' },
    { id: 'integration', name: 'Integration & API', icon: 'Code' },
    { id: 'support', name: 'Support & SLA', icon: 'Headphones' }
  ];

  const features = {
    core: [
      {
        name: 'QR Code Generation',
        free: 'Basic templates',
        professional: 'Advanced customization',
        enterprise: 'Custom algorithms'
      },
      {
        name: 'Steganographic Embedding',
        free: '1 algorithm',
        professional: '5 algorithms',
        enterprise: 'Unlimited + custom'
      },
      {
        name: 'Batch Processing',
        free: '10 codes/day',
        professional: '1,000 codes/day',
        enterprise: 'Unlimited'
      },
      {
        name: 'File Formats',
        free: 'PNG, JPG',
        professional: 'PNG, JPG, SVG, PDF',
        enterprise: 'All formats + custom'
      },
      {
        name: 'Analytics Dashboard',
        free: false,
        professional: 'Basic metrics',
        enterprise: 'Advanced analytics'
      }
    ],
    security: [
      {
        name: 'Encryption Standards',
        free: 'AES-128',
        professional: 'AES-256',
        enterprise: 'Custom encryption'
      },
      {
        name: 'Access Controls',
        free: 'Basic user auth',
        professional: 'Role-based access',
        enterprise: 'Enterprise SSO'
      },
      {
        name: 'Audit Logging',
        free: false,
        professional: 'Basic logs',
        enterprise: 'Comprehensive audit'
      },
      {
        name: 'Compliance Certifications',
        free: false,
        professional: 'SOC 2 Type II',
        enterprise: 'SOC 2, ISO 27001, HIPAA'
      },
      {
        name: 'Data Residency',
        free: 'US only',
        professional: 'Multi-region',
        enterprise: 'On-premise option'
      }
    ],
    integration: [
      {
        name: 'API Rate Limits',
        free: '100 calls/hour',
        professional: '10,000 calls/hour',
        enterprise: 'Unlimited'
      },
      {
        name: 'Webhook Support',
        free: false,
        professional: 'Basic webhooks',
        enterprise: 'Advanced webhooks'
      },
      {
        name: 'SDK Availability',
        free: 'JavaScript only',
        professional: 'JS, Python, PHP',
        enterprise: 'All languages + custom'
      },
      {
        name: 'White-label Options',
        free: false,
        professional: false,
        enterprise: 'Full white-label'
      },
      {
        name: 'Custom Integrations',
        free: false,
        professional: false,
        enterprise: 'Dedicated integration team'
      }
    ],
    support: [
      {
        name: 'Support Channels',
        free: 'Community forum',
        professional: 'Email + chat',
        enterprise: 'Phone + dedicated manager'
      },
      {
        name: 'Response Time SLA',
        free: 'Best effort',
        professional: '24 hours',
        enterprise: '1 hour (critical issues)'
      },
      {
        name: 'Technical Consultation',
        free: false,
        professional: '2 hours/month',
        enterprise: 'Unlimited'
      },
      {
        name: 'Implementation Support',
        free: false,
        professional: 'Self-service guides',
        enterprise: 'Dedicated implementation'
      },
      {
        name: 'Training & Onboarding',
        free: 'Documentation only',
        professional: 'Video tutorials',
        enterprise: 'Live training sessions'
      }
    ]
  };

  const renderFeatureValue = (value) => {
    if (value === false) {
      return <Icon name="X" size={16} className="text-muted-foreground" />;
    }
    if (value === true) {
      return <Icon name="Check" size={16} className="text-success" />;
    }
    return <span className="text-sm text-foreground">{value}</span>;
  };

  return (
    <div className="bg-card rounded-xl border border-border p-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-primary mb-2">Feature Comparison</h3>
        <p className="text-muted-foreground">
          Compare features across all plans to find the perfect fit
        </p>
      </div>
      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories?.map((category) => (
          <button
            key={category?.id}
            onClick={() => setActiveCategory(category?.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeCategory === category?.id
                ? 'bg-accent text-accent-foreground shadow-brand-card'
                : 'bg-muted text-muted-foreground hover:bg-accent/10 hover:text-accent'
            }`}
          >
            <Icon name={category?.icon} size={16} />
            <span>{category?.name}</span>
          </button>
        ))}
      </div>
      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-4 px-4 font-semibold text-primary">Feature</th>
              <th className="text-center py-4 px-4 font-semibold text-primary">Free</th>
              <th className="text-center py-4 px-4 font-semibold text-primary">Professional</th>
              <th className="text-center py-4 px-4 font-semibold text-primary">Enterprise</th>
            </tr>
          </thead>
          <tbody>
            {features?.[activeCategory]?.map((feature, index) => (
              <tr key={index} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                <td className="py-4 px-4 font-medium text-foreground">{feature?.name}</td>
                <td className="py-4 px-4 text-center">{renderFeatureValue(feature?.free)}</td>
                <td className="py-4 px-4 text-center">{renderFeatureValue(feature?.professional)}</td>
                <td className="py-4 px-4 text-center">{renderFeatureValue(feature?.enterprise)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeatureComparison;