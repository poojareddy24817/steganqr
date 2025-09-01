import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickStartGuide = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [copiedCode, setCopiedCode] = useState('');

  const languages = [
    { id: 'javascript', name: 'JavaScript', icon: 'Code' },
    { id: 'python', name: 'Python', icon: 'FileCode' },
    { id: 'java', name: 'Java', icon: 'Coffee' },
    { id: 'csharp', name: 'C#', icon: 'Hash' }
  ];

  const codeExamples = {
    javascript: `// Install the SteganQR SDK
npm install steganqr-sdk

// Initialize the client
import { SteganQR } from 'steganqr-sdk';

const client = new SteganQR({
  apiKey: 'your-api-key-here',
  environment: 'sandbox' // or 'production'
});

// Generate a steganographic QR code
async function generateQR() {
  try {
    const result = await client.generate({
      data: 'Hidden message here',
      coverImage: 'base64-image-data',
      algorithm: 'lsb-enhanced'
    });
    
    console.log('Generated QR:', result.qrCode);
    console.log('Steganographic Image:', result.stegoImage);
  } catch (error) {
    console.error('Generation failed:', error);
  }
}`,
    python: `# Install the SteganQR Python SDK
pip install steganqr-python

# Import and initialize
from steganqr import SteganQR

client = SteganQR(
    api_key='your-api-key-here',
    environment='sandbox'  # or 'production'
)

# Generate steganographic QR code
def generate_qr():
    try:
        result = client.generate(
            data='Hidden message here',
            cover_image='base64-image-data',
            algorithm='lsb-enhanced'
        )
        
        print(f"Generated QR: {result['qr_code']}")
        print(f"Steganographic Image: {result['stego_image']}")
    except Exception as error:
        print(f"Generation failed: {error}")`,
    java: `// Add dependency to pom.xml
<dependency>
    <groupId>com.steganqr</groupId>
    <artifactId>steganqr-java-sdk</artifactId>
    <version>1.0.0</version>
</dependency>

// Initialize the client
import com.steganqr.SteganQR;
import com.steganqr.models.GenerateRequest;

SteganQR client = new SteganQR.Builder()
    .apiKey("your-api-key-here")
    .environment("sandbox") // or "production"
    .build();

// Generate steganographic QR code
public void generateQR() {
    try {
        GenerateRequest request = new GenerateRequest()
            .setData("Hidden message here")
            .setCoverImage("base64-image-data")
            .setAlgorithm("lsb-enhanced");
            
        GenerateResponse result = client.generate(request);
        
        System.out.println("Generated QR: " + result.getQrCode());
        System.out.println("Steganographic Image: " + result.getStegoImage());
    } catch (Exception error) {
        System.err.println("Generation failed: " + error.getMessage());
    }
}`,
    csharp: `// Install via NuGet Package Manager
Install-Package SteganQR.SDK

// Using statements
using SteganQR;
using SteganQR.Models;

// Initialize the client
var client = new SteganQRClient(new SteganQRConfig
{
    ApiKey = "your-api-key-here",
    Environment = "sandbox" // or "production"
});

// Generate steganographic QR code
public async Task GenerateQR()
{
    try
    {
        var request = new GenerateRequest
        {
            Data = "Hidden message here",
            CoverImage = "base64-image-data",
            Algorithm = "lsb-enhanced"
        };
        
        var result = await client.GenerateAsync(request);
        
        Console.WriteLine($"Generated QR: {result.QrCode}");
        Console.WriteLine($"Steganographic Image: {result.StegoImage}");
    }
    catch (Exception error)
    {
        Console.WriteLine($"Generation failed: {error.Message}");
    }
}`
  };

  const handleCopyCode = (code) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
          <Icon name="Zap" size={20} className="text-accent" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Quick Start Guide</h3>
          <p className="text-sm text-muted-foreground">Get started with SteganQR API in minutes</p>
        </div>
      </div>
      {/* Language Selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {languages?.map((lang) => (
          <button
            key={lang?.id}
            onClick={() => setSelectedLanguage(lang?.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              selectedLanguage === lang?.id
                ? 'bg-accent text-accent-foreground shadow-sm'
                : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
            }`}
          >
            <Icon name={lang?.icon} size={16} />
            <span>{lang?.name}</span>
          </button>
        ))}
      </div>
      {/* Code Block */}
      <div className="relative">
        <div className="bg-slate-900 rounded-lg overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleCopyCode(codeExamples?.[selectedLanguage])}
              className="text-slate-300 hover:text-white hover:bg-slate-700"
              iconName={copiedCode === codeExamples?.[selectedLanguage] ? "Check" : "Copy"}
              iconSize={14}
            >
              {copiedCode === codeExamples?.[selectedLanguage] ? 'Copied!' : 'Copy'}
            </Button>
          </div>
          <pre className="p-4 text-sm text-slate-100 overflow-x-auto">
            <code>{codeExamples?.[selectedLanguage]}</code>
          </pre>
        </div>
      </div>
      {/* Authentication Setup */}
      <div className="mt-6 p-4 bg-accent/5 border border-accent/20 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Key" size={20} className="text-accent mt-0.5" />
          <div>
            <h4 className="font-medium text-foreground mb-1">Authentication Setup</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Get your API key from the dashboard and replace 'your-api-key-here' in the code above.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" iconName="ExternalLink" iconSize={14}>
                Get API Key
              </Button>
              <Button variant="ghost" size="sm" iconName="Book" iconSize={14}>
                View Docs
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickStartGuide;