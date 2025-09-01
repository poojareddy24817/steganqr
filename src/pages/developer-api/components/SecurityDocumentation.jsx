import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SecurityDocumentation = () => {
  const [activeSection, setActiveSection] = useState('authentication');

  const sections = [
    { id: 'authentication', name: 'Authentication', icon: 'Key' },
    { id: 'encryption', name: 'Encryption', icon: 'Lock' },
    { id: 'best-practices', name: 'Best Practices', icon: 'Shield' },
    { id: 'compliance', name: 'Compliance', icon: 'FileCheck' }
  ];

  const authMethods = [
    {
      method: 'API Key',
      security: 'High',
      description: 'Bearer token authentication with API keys',
      implementation: `// API Key Authentication
const client = new SteganQR({
  apiKey: 'sk_live_your_api_key_here',
  environment: 'production'
});

// All requests automatically include authentication
const result = await client.generate({
  data: 'secret message',
  coverImage: imageData
});`,
      features: ['Simple implementation', 'Automatic token refresh', 'Rate limiting included']
    },
    {
      method: 'OAuth 2.0',
      security: 'Very High',
      description: 'Industry-standard OAuth 2.0 with PKCE for enhanced security',
      implementation: `// OAuth 2.0 Flow
const oauth = new SteganQROAuth({
  clientId: 'your_client_id',
  redirectUri: 'https://yourapp.com/callback',
  scopes: ['generate', 'decode', 'validate']
});

// Initiate OAuth flow
const authUrl = oauth.getAuthorizationUrl();
window.location.href = authUrl;

// Handle callback
const tokens = await oauth.exchangeCodeForTokens(authCode);
const client = new SteganQR({
  accessToken: tokens.accessToken,
  refreshToken: tokens.refreshToken
});`,
      features: ['User consent flow', 'Granular permissions', 'Token refresh handling']
    },
    {
      method: 'JWT Tokens',
      security: 'Very High',
      description: 'JSON Web Tokens with RS256 signing for enterprise applications',
      implementation: `// JWT Authentication
const jwt = require('jsonwebtoken');

// Generate JWT (server-side)
const payload = {
  sub: 'user_id',
  iss: 'your_application',
  aud: 'steganqr_api',
  exp: Math.floor(Date.now() / 1000) + (60 * 60), // 1 hour
  scopes: ['generate', 'decode']
};

const token = jwt.sign(payload, privateKey, { algorithm: 'RS256' });

// Use JWT with API
const client = new SteganQR({
  jwt: token,
  environment: 'production'
});`,
      features: ['Stateless authentication', 'Custom claims support', 'Enterprise SSO integration']
    }
  ];

  const encryptionStandards = [
    {
      standard: 'AES-256-GCM',
      usage: 'Data Encryption',
      description: 'All sensitive data encrypted with AES-256 in GCM mode',
      details: [
        'Industry-standard symmetric encryption',
        'Authenticated encryption with integrity protection',
        'Unique initialization vectors for each operation',
        'Key rotation every 90 days'
      ]
    },
    {
      standard: 'RSA-4096',
      usage: 'Key Exchange',
      description: 'Asymmetric encryption for secure key exchange',
      details: [
        'Public-private key pairs for secure communication',
        'OAEP padding for enhanced security',
        'Hardware security module (HSM) key storage',
        'Certificate-based key validation'
      ]
    },
    {
      standard: 'ECDSA P-384',
      usage: 'Digital Signatures',
      description: 'Elliptic curve digital signatures for data integrity',
      details: [
        'Cryptographically secure signature generation',
        'Non-repudiation guarantees',
        'Compact signature size',
        'FIPS 186-4 compliant implementation'
      ]
    },
    {
      standard: 'PBKDF2',
      usage: 'Key Derivation',
      description: 'Password-based key derivation with salt',
      details: [
        'Minimum 100,000 iterations',
        'Cryptographically random salt generation',
        'SHA-256 hash function',
        'Protection against rainbow table attacks'
      ]
    }
  ];

  const bestPractices = [
    {
      category: 'API Key Management',
      icon: 'Key',
      practices: [
        'Store API keys in environment variables, never in code',
        'Use different keys for development, staging, and production',
        'Rotate API keys regularly (recommended: every 90 days)',
        'Implement key rotation without service interruption',
        'Monitor API key usage for anomalous activity',
        'Revoke compromised keys immediately'
      ]
    },
    {
      category: 'Data Handling',
      icon: 'Database',
      practices: [
        'Encrypt sensitive data before sending to API',
        'Use HTTPS for all API communications',
        'Implement request signing for critical operations',
        'Validate all input data before processing',
        'Sanitize file uploads and check file types',
        'Implement proper error handling without data leakage'
      ]
    },
    {
      category: 'Network Security',
      icon: 'Globe',
      practices: [
        'Use TLS 1.3 for all communications',
        'Implement certificate pinning in mobile apps',
        'Validate SSL certificates properly',
        'Use secure DNS resolution (DoH/DoT)',
        'Implement request rate limiting',
        'Monitor for suspicious traffic patterns'
      ]
    },
    {
      category: 'Application Security',
      icon: 'Shield',
      practices: [
        'Implement proper session management',
        'Use secure random number generation',
        'Validate and sanitize all user inputs',
        'Implement proper logging without sensitive data',
        'Use secure coding practices and code reviews',
        'Regular security testing and vulnerability assessments'
      ]
    }
  ];

  const complianceStandards = [
    {
      standard: 'SOC 2 Type II',
      description: 'Service Organization Control 2 certification for security, availability, and confidentiality',
      status: 'Certified',
      details: [
        'Annual third-party security audits',
        'Comprehensive security controls framework',
        'Continuous monitoring and reporting',
        'Customer data protection guarantees'
      ]
    },
    {
      standard: 'ISO 27001',
      description: 'International standard for information security management systems',
      status: 'Certified',
      details: [
        'Risk-based security management approach',
        'Regular security assessments and improvements',
        'Employee security training and awareness',
        'Incident response and business continuity planning'
      ]
    },
    {
      standard: 'GDPR',
      description: 'General Data Protection Regulation compliance for EU data protection',
      status: 'Compliant',
      details: [
        'Data minimization and purpose limitation',
        'User consent and right to erasure',
        'Data portability and access rights',
        'Privacy by design implementation'
      ]
    },
    {
      standard: 'CCPA',
      description: 'California Consumer Privacy Act compliance for US data protection',
      status: 'Compliant',
      details: [
        'Consumer rights to know and delete personal information',
        'Opt-out mechanisms for data sales',
        'Non-discrimination for privacy rights exercise',
        'Transparent privacy practices disclosure'
      ]
    }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'authentication':
        return (
          <div className="space-y-6">
            {authMethods?.map((method, index) => (
              <div key={index} className="border border-border rounded-lg overflow-hidden">
                <div className="p-4 bg-muted/50">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-foreground">{method?.method}</h4>
                    <span className={`px-2 py-1 text-xs rounded ${
                      method?.security === 'Very High' ? 'bg-success/10 text-success' :
                      method?.security === 'High'? 'bg-accent/10 text-accent' : 'bg-warning/10 text-warning'
                    }`}>
                      {method?.security} Security
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{method?.description}</p>
                </div>
                
                <div className="bg-slate-900">
                  <div className="px-4 py-2 bg-slate-800 border-b border-slate-700">
                    <span className="text-sm text-slate-300 font-mono">Implementation Example</span>
                  </div>
                  <pre className="p-4 text-slate-100 text-sm overflow-x-auto">
                    <code>{method?.implementation}</code>
                  </pre>
                </div>
                
                <div className="p-4">
                  <h5 className="font-medium text-foreground mb-2">Key Features</h5>
                  <ul className="space-y-1">
                    {method?.features?.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-sm">
                        <Icon name="Check" size={14} className="text-success" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        );

      case 'encryption':
        return (
          <div className="space-y-6">
            {encryptionStandards?.map((standard, index) => (
              <div key={index} className="p-6 border border-border rounded-lg">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-foreground text-lg">{standard?.standard}</h4>
                    <p className="text-sm text-muted-foreground">{standard?.usage}</p>
                  </div>
                  <Icon name="Lock" size={24} className="text-accent" />
                </div>
                
                <p className="text-foreground mb-4">{standard?.description}</p>
                
                <div className="space-y-2">
                  {standard?.details?.map((detail, idx) => (
                    <div key={idx} className="flex items-start space-x-2">
                      <Icon name="Shield" size={14} className="text-success mt-0.5" />
                      <span className="text-sm text-muted-foreground">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div className="p-4 bg-accent/5 border border-accent/20 rounded-lg">
              <h4 className="font-medium text-foreground mb-2">Encryption in Transit & at Rest</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 className="font-medium text-foreground mb-1">In Transit</h5>
                  <ul className="text-muted-foreground space-y-1">
                    <li>• TLS 1.3 with perfect forward secrecy</li>
                    <li>• Certificate transparency monitoring</li>
                    <li>• HSTS with preload directive</li>
                    <li>• Secure cipher suite selection</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-foreground mb-1">At Rest</h5>
                  <ul className="text-muted-foreground space-y-1">
                    <li>• AES-256 database encryption</li>
                    <li>• Encrypted file system storage</li>
                    <li>• Hardware security modules (HSM)</li>
                    <li>• Regular key rotation policies</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 'best-practices':
        return (
          <div className="space-y-6">
            {bestPractices?.map((category, index) => (
              <div key={index} className="p-6 border border-border rounded-lg">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Icon name={category?.icon} size={20} className="text-accent" />
                  </div>
                  <h4 className="font-semibold text-foreground text-lg">{category?.category}</h4>
                </div>
                
                <div className="space-y-3">
                  {category?.practices?.map((practice, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <Icon name="CheckCircle" size={16} className="text-success mt-0.5" />
                      <span className="text-sm text-foreground">{practice}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      case 'compliance':
        return (
          <div className="space-y-6">
            {complianceStandards?.map((compliance, index) => (
              <div key={index} className="p-6 border border-border rounded-lg">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-foreground text-lg">{compliance?.standard}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{compliance?.description}</p>
                  </div>
                  <span className={`px-3 py-1 text-sm rounded ${
                    compliance?.status === 'Certified' ? 'bg-success/10 text-success' :
                    compliance?.status === 'Compliant'? 'bg-accent/10 text-accent' : 'bg-warning/10 text-warning'
                  }`}>
                    {compliance?.status}
                  </span>
                </div>
                
                <div className="space-y-2">
                  {compliance?.details?.map((detail, idx) => (
                    <div key={idx} className="flex items-start space-x-2">
                      <Icon name="FileCheck" size={14} className="text-accent mt-0.5" />
                      <span className="text-sm text-muted-foreground">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div className="p-4 bg-success/5 border border-success/20 rounded-lg">
              <div className="flex items-start space-x-3">
                <Icon name="Award" size={20} className="text-success mt-0.5" />
                <div>
                  <h4 className="font-medium text-foreground mb-1">Security Certifications</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Our security practices are regularly audited and certified by independent third parties.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" iconName="ExternalLink" iconSize={14}>
                      View SOC 2 Report
                    </Button>
                    <Button variant="outline" size="sm" iconName="ExternalLink" iconSize={14}>
                      ISO 27001 Certificate
                    </Button>
                    <Button variant="outline" size="sm" iconName="ExternalLink" iconSize={14}>
                      Security Whitepaper
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
          <Icon name="ShieldCheck" size={20} className="text-accent" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Security Documentation</h3>
          <p className="text-sm text-muted-foreground">Comprehensive security standards and implementation guides</p>
        </div>
      </div>
      {/* Section Navigation */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-border">
        {sections?.map((section) => (
          <button
            key={section?.id}
            onClick={() => setActiveSection(section?.id)}
            className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium transition-all duration-200 border-b-2 ${
              activeSection === section?.id
                ? 'border-accent text-accent' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
            }`}
          >
            <Icon name={section?.icon} size={16} />
            <span>{section?.name}</span>
          </button>
        ))}
      </div>
      {/* Section Content */}
      {renderContent()}
    </div>
  );
};

export default SecurityDocumentation;