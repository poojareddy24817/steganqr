import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DeveloperResources = () => {
  const [activeTab, setActiveTab] = useState('sdk');
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');

  const tabs = [
    { id: 'sdk', name: 'SDK Documentation', icon: 'Package' },
    { id: 'api', name: 'API Reference', icon: 'Code' },
    { id: 'examples', name: 'Code Examples', icon: 'FileCode' },
    { id: 'testing', name: 'Testing Environment', icon: 'TestTube' }
  ];

  const languages = [
    { id: 'javascript', name: 'JavaScript', icon: 'FileText' },
    { id: 'python', name: 'Python', icon: 'FileText' },
    { id: 'java', name: 'Java', icon: 'FileText' },
    { id: 'csharp', name: 'C#', icon: 'FileText' },
    { id: 'php', name: 'PHP', icon: 'FileText' },
    { id: 'go', name: 'Go', icon: 'FileText' }
  ];

  const sdkFeatures = [
    {
      title: "Image Processing",
      description: "Advanced steganographic embedding and extraction methods",
      methods: ["embed()", "extract()", "analyze()"],
      complexity: "Medium"
    },
    {
      title: "QR Code Generation",
      description: "Create steganographic QR codes with custom data",
      methods: ["generateQR()", "embedInQR()", "validateQR()"],
      complexity: "Low"
    },
    {
      title: "Security Protocols",
      description: "Encryption and authentication for secure embedding",
      methods: ["encrypt()", "authenticate()", "verify()"],
      complexity: "High"
    },
    {
      title: "Batch Processing",
      description: "Handle multiple images and bulk operations",
      methods: ["processBatch()", "queueJob()", "getStatus()"],
      complexity: "Medium"
    }
  ];

  const apiEndpoints = [
    {
      method: "POST",
      endpoint: "/api/v1/embed",
      description: "Embed secret data into an image",
      parameters: ["image", "data", "algorithm", "key"],
      response: "Steganographic image with embedded data"
    },
    {
      method: "POST",
      endpoint: "/api/v1/extract",
      description: "Extract hidden data from steganographic image",
      parameters: ["image", "algorithm", "key"],
      response: "Extracted secret data and metadata"
    },
    {
      method: "GET",
      endpoint: "/api/v1/analyze",
      description: "Analyze image for steganographic content",
      parameters: ["image", "detection_level"],
      response: "Analysis results and confidence scores"
    },
    {
      method: "POST",
      endpoint: "/api/v1/qr/generate",
      description: "Generate steganographic QR code",
      parameters: ["data", "cover_image", "options"],
      response: "QR code with embedded steganographic data"
    }
  ];

  const codeExamples = {
    javascript: `// SteganQR JavaScript SDK Example
import { SteganQR } from '@steganqr/sdk';

const client = new SteganQR({
  apiKey: 'your-api-key',
  environment: 'production'
});

// Embed secret data in image
async function embedData() {
  try {
    const result = await client.embed({
      image: 'path/to/cover-image.jpg',
      data: 'Secret message to hide',
      algorithm: 'lsb-adaptive',
      encryption: true
    });
    
    console.log('Embedding successful:', result.imageUrl);
    return result;
  } catch (error) {
    console.error('Embedding failed:', error);
  }
}

// Extract hidden data
async function extractData() {
  try {
    const result = await client.extract({
      image: 'path/to/stego-image.jpg',
      algorithm: 'lsb-adaptive',
      decryption: true
    });
    
    console.log('Extracted data:', result.data);
    return result;
  } catch (error) {
    console.error('Extraction failed:', error);
  }
}`,
    python: `# SteganQR Python SDK Example
from steganqr import SteganQR
import asyncio

client = SteganQR(
    api_key='your-api-key',
    environment='production'
)

async def embed_data():
    """Embed secret data in image"""
    try:
        result = await client.embed(
            image='path/to/cover-image.jpg',
            data='Secret message to hide',
            algorithm='lsb-adaptive',
            encryption=True
        )
        
        print(f'Embedding successful: {result.image_url}')
        return result
    except Exception as error:
        print(f'Embedding failed: {error}')

async def extract_data():
    """Extract hidden data"""
    try:
        result = await client.extract(
            image='path/to/stego-image.jpg',
            algorithm='lsb-adaptive',
            decryption=True
        )
        
        print(f'Extracted data: {result.data}')
        return result
    except Exception as error:
        print(f'Extraction failed: {error}')

# Run the functions
asyncio.run(embed_data())
asyncio.run(extract_data())`,
    java: `// SteganQR Java SDK Example
import com.steganqr.SteganQR;
import com.steganqr.models.*;

public class SteganQRExample {
    private SteganQR client;
    
    public SteganQRExample() {
        this.client = new SteganQR.Builder()
            .apiKey("your-api-key")
            .environment("production")
            .build();
    }
    
    public EmbedResult embedData() {
        try {
            EmbedRequest request = new EmbedRequest.Builder()
                .image("path/to/cover-image.jpg")
                .data("Secret message to hide")
                .algorithm("lsb-adaptive")
                .encryption(true)
                .build();
                
            EmbedResult result = client.embed(request);
            System.out.println("Embedding successful: " + result.getImageUrl());
            return result;
        } catch (SteganQRException e) {
            System.err.println("Embedding failed: " + e.getMessage());
            return null;
        }
    }
    
    public ExtractResult extractData() {
        try {
            ExtractRequest request = new ExtractRequest.Builder()
                .image("path/to/stego-image.jpg")
                .algorithm("lsb-adaptive")
                .decryption(true)
                .build();
                
            ExtractResult result = client.extract(request);
            System.out.println("Extracted data: " + result.getData());
            return result;
        } catch (SteganQRException e) {
            System.err.println("Extraction failed: " + e.getMessage());
            return null;
        }
    }
}`
  };

  const getMethodColor = (method) => {
    switch (method) {
      case 'GET': return 'text-success bg-success/10';
      case 'POST': return 'text-accent bg-accent/10';
      case 'PUT': return 'text-warning bg-warning/10';
      case 'DELETE': return 'text-destructive bg-destructive/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getComplexityColor = (complexity) => {
    switch (complexity) {
      case 'Low': return 'text-success bg-success/10';
      case 'Medium': return 'text-accent bg-accent/10';
      case 'High': return 'text-warning bg-warning/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-brand-card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-primary mb-2">
            Developer Resources
          </h3>
          <p className="text-muted-foreground">
            SDKs, APIs, and integration guides for developers
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" iconName="Github" iconPosition="left" iconSize={16}>
            GitHub
          </Button>
          <Button variant="default" size="sm" iconName="ExternalLink" iconPosition="right" iconSize={16}>
            Full Documentation
          </Button>
        </div>
      </div>
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-border">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-t-lg text-sm font-medium transition-all duration-200 ${
              activeTab === tab?.id
                ? 'bg-accent text-accent-foreground border-b-2 border-accent'
                : 'text-muted-foreground hover:text-primary hover:bg-muted/50'
            }`}
          >
            <Icon name={tab?.icon} size={16} />
            <span>{tab?.name}</span>
          </button>
        ))}
      </div>
      {/* SDK Documentation */}
      {activeTab === 'sdk' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {sdkFeatures?.map((feature, index) => (
              <div key={index} className="bg-background rounded-lg border border-border p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-semibold text-primary mb-2">
                      {feature?.title}
                    </h4>
                    <p className="text-muted-foreground mb-3">
                      {feature?.description}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getComplexityColor(feature?.complexity)}`}>
                    {feature?.complexity}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <h5 className="text-sm font-medium text-primary">Key Methods:</h5>
                  <div className="flex flex-wrap gap-2">
                    {feature?.methods?.map((method, methodIndex) => (
                      <code key={methodIndex} className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs font-mono">
                        {method}
                      </code>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-background rounded-lg border border-border p-6">
            <h4 className="text-lg font-semibold text-primary mb-4">Installation</h4>
            <div className="space-y-4">
              <div>
                <h5 className="text-sm font-medium text-primary mb-2">npm (JavaScript)</h5>
                <code className="block bg-muted p-3 rounded text-sm font-mono text-muted-foreground">
                  npm install @steganqr/sdk
                </code>
              </div>
              <div>
                <h5 className="text-sm font-medium text-primary mb-2">pip (Python)</h5>
                <code className="block bg-muted p-3 rounded text-sm font-mono text-muted-foreground">
                  pip install steganqr-python
                </code>
              </div>
              <div>
                <h5 className="text-sm font-medium text-primary mb-2">Maven (Java)</h5>
                <code className="block bg-muted p-3 rounded text-sm font-mono text-muted-foreground">
                  &lt;dependency&gt;\n  &lt;groupId&gt;com.steganqr&lt;/groupId&gt;\n  &lt;artifactId&gt;steganqr-java&lt;/artifactId&gt;\n  &lt;version&gt;1.0.0&lt;/version&gt;\n&lt;/dependency&gt;
                </code>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* API Reference */}
      {activeTab === 'api' && (
        <div className="space-y-6">
          <div className="bg-background rounded-lg border border-border p-6">
            <h4 className="text-lg font-semibold text-primary mb-4">Base URL</h4>
            <code className="block bg-muted p-3 rounded text-sm font-mono text-muted-foreground">
              https://api.steganqr.com/v1
            </code>
          </div>

          <div className="space-y-4">
            {apiEndpoints?.map((endpoint, index) => (
              <div key={index} className="bg-background rounded-lg border border-border p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${getMethodColor(endpoint?.method)}`}>
                      {endpoint?.method}
                    </span>
                    <code className="text-sm font-mono text-primary">
                      {endpoint?.endpoint}
                    </code>
                  </div>
                  <Button variant="ghost" size="sm" iconName="Copy" iconSize={16}>
                    Copy
                  </Button>
                </div>
                
                <p className="text-muted-foreground mb-4">
                  {endpoint?.description}
                </p>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-sm font-medium text-primary mb-2">Parameters:</h5>
                    <div className="space-y-1">
                      {endpoint?.parameters?.map((param, paramIndex) => (
                        <code key={paramIndex} className="block px-2 py-1 bg-muted text-muted-foreground rounded text-xs font-mono">
                          {param}
                        </code>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-primary mb-2">Response:</h5>
                    <p className="text-sm text-muted-foreground">
                      {endpoint?.response}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Code Examples */}
      {activeTab === 'examples' && (
        <div className="space-y-6">
          {/* Language Selection */}
          <div className="flex flex-wrap gap-2">
            {languages?.map((language) => (
              <button
                key={language?.id}
                onClick={() => setSelectedLanguage(language?.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedLanguage === language?.id
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-primary'
                }`}
              >
                <Icon name={language?.icon} size={16} />
                <span>{language?.name}</span>
              </button>
            ))}
          </div>

          {/* Code Display */}
          <div className="bg-background rounded-lg border border-border overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 bg-muted border-b border-border">
              <div className="flex items-center space-x-2">
                <Icon name="FileCode" size={16} className="text-muted-foreground" />
                <span className="text-sm font-medium text-primary">
                  {languages?.find(l => l?.id === selectedLanguage)?.name} Example
                </span>
              </div>
              <Button variant="ghost" size="sm" iconName="Copy" iconSize={16}>
                Copy Code
              </Button>
            </div>
            <pre className="p-4 overflow-x-auto text-sm">
              <code className="text-muted-foreground font-mono whitespace-pre">
                {codeExamples?.[selectedLanguage]}
              </code>
            </pre>
          </div>
        </div>
      )}
      {/* Testing Environment */}
      {activeTab === 'testing' && (
        <div className="space-y-6">
          <div className="bg-background rounded-lg border border-border p-6">
            <h4 className="text-lg font-semibold text-primary mb-4">API Testing Console</h4>
            <p className="text-muted-foreground mb-6">
              Test API endpoints directly from your browser with live data
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h5 className="text-sm font-medium text-primary mb-3">Request Configuration</h5>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-primary mb-1">Endpoint</label>
                    <select className="w-full px-3 py-2 border border-border rounded-lg bg-background text-primary">
                      <option>/api/v1/embed</option>
                      <option>/api/v1/extract</option>
                      <option>/api/v1/analyze</option>
                      <option>/api/v1/qr/generate</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary mb-1">Method</label>
                    <select className="w-full px-3 py-2 border border-border rounded-lg bg-background text-primary">
                      <option>POST</option>
                      <option>GET</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary mb-1">API Key</label>
                    <input
                      type="password"
                      placeholder="Enter your API key"
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-primary placeholder-muted-foreground"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h5 className="text-sm font-medium text-primary mb-3">Request Body</h5>
                <textarea
                  rows={8}
                  placeholder="Enter JSON request body..."
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-primary placeholder-muted-foreground font-mono text-sm"
                  defaultValue={`{
  "image": "base64_encoded_image",
  "data": "Secret message",
  "algorithm": "lsb-adaptive",
  "encryption": true
}`}
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-3 mt-6">
              <Button variant="default" iconName="Play" iconPosition="left" iconSize={16}>
                Send Request
              </Button>
              <Button variant="outline" iconName="RotateCcw" iconPosition="left" iconSize={16}>
                Reset
              </Button>
            </div>
          </div>

          <div className="bg-background rounded-lg border border-border p-6">
            <h4 className="text-lg font-semibold text-primary mb-4">Response</h4>
            <div className="bg-muted rounded-lg p-4">
              <p className="text-muted-foreground text-sm">
                Response will appear here after sending a request...
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeveloperResources;