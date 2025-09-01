import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TechnicalSpecs = () => {
  const [activeTab, setActiveTab] = useState('rate-limits');

  const tabs = [
    { id: 'rate-limits', name: 'Rate Limits', icon: 'Clock' },
    { id: 'error-handling', name: 'Error Handling', icon: 'AlertTriangle' },
    { id: 'webhooks', name: 'Webhooks', icon: 'Webhook' },
    { id: 'sdks', name: 'SDKs', icon: 'Package' }
  ];

  const rateLimitData = [
    {
      tier: 'Free Tier',
      requests: '100/hour',
      burst: '10/minute',
      fileSize: '5MB',
      features: ['Basic generation', 'Standard decoding', 'Community support']
    },
    {
      tier: 'Developer',
      requests: '1,000/hour',
      burst: '50/minute',
      fileSize: '10MB',
      features: ['Advanced algorithms', 'Batch processing', 'Email support']
    },
    {
      tier: 'Professional',
      requests: '10,000/hour',
      burst: '200/minute',
      fileSize: '25MB',
      features: ['Custom algorithms', 'Webhooks', 'Priority support']
    },
    {
      tier: 'Enterprise',
      requests: 'Unlimited',
      burst: 'Unlimited',
      fileSize: '100MB',
      features: ['Dedicated infrastructure', 'SLA guarantee', '24/7 support']
    }
  ];

  const errorCodes = [
    {
      code: '400',
      name: 'Bad Request',
      description: 'Invalid request format or missing required parameters',
      example: `{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Missing required parameter: data",
    "details": {
      "parameter": "data",
      "expected": "string",
      "received": "null"
    }
  }
}`
    },
    {
      code: '401',
      name: 'Unauthorized',
      description: 'Invalid or missing API key',
      example: `{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid API key provided",
    "details": {
      "hint": "Check your API key in the dashboard"
    }
  }
}`
    },
    {
      code: '429',
      name: 'Rate Limited',
      description: 'Too many requests, rate limit exceeded',
      example: `{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Rate limit exceeded",
    "details": {
      "limit": 1000,
      "remaining": 0,
      "resetTime": "2024-01-01T13:00:00Z"
    }
  }
}`
    },
    {
      code: '422',
      name: 'Processing Error',
      description: 'Image processing failed or unsupported format',
      example: `{
  "error": {
    "code": "PROCESSING_FAILED",
    "message": "Unable to process image",
    "details": {
      "reason": "Unsupported image format",
      "supportedFormats": ["PNG", "JPEG", "BMP"]
    }
  }
}`
    }
  ];

  const webhookEvents = [
    {
      event: 'generation.completed',
      description: 'Fired when QR generation is completed',
      payload: `{
  "event": "generation.completed",
  "data": {
    "requestId": "req_1234567890",
    "status": "success",
    "qrCode": "base64-encoded-qr",
    "stegoImage": "base64-encoded-image",
    "processingTime": 1.2
  },
  "timestamp": "2024-01-01T12:00:00Z"
}`
    },
    {
      event: 'batch.completed',
      description: 'Fired when batch processing is completed',
      payload: `{
  "event": "batch.completed",
  "data": {
    "batchId": "batch_abcdef123456",
    "totalOperations": 10,
    "successful": 9,
    "failed": 1,
    "results": [...],
    "processingTime": 15.3
  },
  "timestamp": "2024-01-01T12:05:00Z"
}`
    },
    {
      event: 'quota.warning',
      description: 'Fired when approaching rate limit (80% usage)',
      payload: `{
  "event": "quota.warning",
  "data": {
    "currentUsage": 800,
    "limit": 1000,
    "resetTime": "2024-01-01T13:00:00Z",
    "warningThreshold": 0.8
  },
  "timestamp": "2024-01-01T12:30:00Z"
}`
    }
  ];

  const sdks = [
    {
      language: 'JavaScript/Node.js',
      package: 'steganqr-sdk',
      version: '2.1.0',
      install: 'npm install steganqr-sdk',
      docs: 'https://docs.steganqr.com/sdk/javascript',
      features: ['TypeScript support', 'Promise-based API', 'Browser compatible']
    },
    {
      language: 'Python',
      package: 'steganqr-python',
      version: '1.8.2',
      install: 'pip install steganqr-python',
      docs: 'https://docs.steganqr.com/sdk/python',
      features: ['Async/await support', 'PIL integration', 'NumPy compatibility']
    },
    {
      language: 'Java',
      package: 'steganqr-java-sdk',
      version: '1.5.1',
      install: 'Maven/Gradle dependency',
      docs: 'https://docs.steganqr.com/sdk/java',
      features: ['Spring Boot integration', 'BufferedImage support', 'Thread-safe']
    },
    {
      language: 'C#/.NET',
      package: 'SteganQR.SDK',
      version: '1.3.0',
      install: 'Install-Package SteganQR.SDK',
      docs: 'https://docs.steganqr.com/sdk/dotnet',
      features: ['.NET Core support', 'Async methods', 'System.Drawing integration']
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'rate-limits':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {rateLimitData?.map((tier, index) => (
                <div key={index} className="p-4 border border-border rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">{tier?.tier}</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Requests:</span>
                      <span className="font-medium">{tier?.requests}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Burst:</span>
                      <span className="font-medium">{tier?.burst}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">File Size:</span>
                      <span className="font-medium">{tier?.fileSize}</span>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-border">
                    <p className="text-xs text-muted-foreground mb-2">Features:</p>
                    <ul className="text-xs space-y-1">
                      {tier?.features?.map((feature, idx) => (
                        <li key={idx} className="flex items-center space-x-1">
                          <Icon name="Check" size={12} className="text-success" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 bg-accent/5 border border-accent/20 rounded-lg">
              <h4 className="font-medium text-foreground mb-2">Rate Limit Headers</h4>
              <div className="text-sm font-mono space-y-1">
                <p><span className="text-accent">X-RateLimit-Limit:</span> 1000</p>
                <p><span className="text-accent">X-RateLimit-Remaining:</span> 999</p>
                <p><span className="text-accent">X-RateLimit-Reset:</span> 1640995200</p>
                <p><span className="text-accent">X-RateLimit-Retry-After:</span> 3600</p>
              </div>
            </div>
          </div>
        );

      case 'error-handling':
        return (
          <div className="space-y-6">
            {errorCodes?.map((error, index) => (
              <div key={index} className="border border-border rounded-lg overflow-hidden">
                <div className="p-4 bg-muted/50">
                  <div className="flex items-center space-x-3">
                    <span className="px-2 py-1 bg-destructive text-destructive-foreground text-sm font-mono rounded">
                      {error?.code}
                    </span>
                    <h4 className="font-semibold text-foreground">{error?.name}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{error?.description}</p>
                </div>
                <div className="bg-slate-900">
                  <div className="px-4 py-2 bg-slate-800 border-b border-slate-700">
                    <span className="text-sm text-slate-300 font-mono">Example Response</span>
                  </div>
                  <pre className="p-4 text-slate-100 text-sm overflow-x-auto">
                    <code>{error?.example}</code>
                  </pre>
                </div>
              </div>
            ))}
          </div>
        );

      case 'webhooks':
        return (
          <div className="space-y-6">
            <div className="p-4 bg-accent/5 border border-accent/20 rounded-lg">
              <h4 className="font-medium text-foreground mb-2">Webhook Configuration</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Configure webhook endpoints in your dashboard to receive real-time notifications.
              </p>
              <div className="text-sm space-y-1">
                <p><strong>Endpoint URL:</strong> Must be HTTPS and return 200 status</p>
                <p><strong>Timeout:</strong> 30 seconds maximum response time</p>
                <p><strong>Retries:</strong> 3 attempts with exponential backoff</p>
                <p><strong>Signature:</strong> HMAC-SHA256 verification available</p>
              </div>
            </div>
            {webhookEvents?.map((webhook, index) => (
              <div key={index} className="border border-border rounded-lg overflow-hidden">
                <div className="p-4 bg-muted/50">
                  <h4 className="font-semibold text-foreground">{webhook?.event}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{webhook?.description}</p>
                </div>
                <div className="bg-slate-900">
                  <div className="px-4 py-2 bg-slate-800 border-b border-slate-700">
                    <span className="text-sm text-slate-300 font-mono">Payload Example</span>
                  </div>
                  <pre className="p-4 text-slate-100 text-sm overflow-x-auto">
                    <code>{webhook?.payload}</code>
                  </pre>
                </div>
              </div>
            ))}
          </div>
        );

      case 'sdks':
        return (
          <div className="space-y-6">
            {sdks?.map((sdk, index) => (
              <div key={index} className="p-6 border border-border rounded-lg">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-foreground text-lg">{sdk?.language}</h4>
                    <p className="text-sm text-muted-foreground">Package: {sdk?.package}</p>
                  </div>
                  <span className="px-3 py-1 bg-accent/10 text-accent text-sm font-mono rounded">
                    v{sdk?.version}
                  </span>
                </div>
                
                <div className="bg-slate-900 rounded-lg p-4 mb-4">
                  <code className="text-slate-100 text-sm">{sdk?.install}</code>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {sdk?.features?.map((feature, idx) => (
                    <span key={idx} className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">
                      {feature}
                    </span>
                  ))}
                </div>
                
                <div className="flex space-x-3">
                  <Button variant="outline" size="sm" iconName="ExternalLink" iconSize={14}>
                    Documentation
                  </Button>
                  <Button variant="ghost" size="sm" iconName="Download" iconSize={14}>
                    Download
                  </Button>
                </div>
              </div>
            ))}
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
          <Icon name="Settings" size={20} className="text-accent" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Technical Specifications</h3>
          <p className="text-sm text-muted-foreground">Detailed API configuration and integration guides</p>
        </div>
      </div>
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-border">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium transition-all duration-200 border-b-2 ${
              activeTab === tab?.id
                ? 'border-accent text-accent' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
            }`}
          >
            <Icon name={tab?.icon} size={16} />
            <span>{tab?.name}</span>
          </button>
        ))}
      </div>
      {/* Tab Content */}
      {renderContent()}
    </div>
  );
};

export default TechnicalSpecs;