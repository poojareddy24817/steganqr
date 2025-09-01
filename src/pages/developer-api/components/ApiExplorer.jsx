import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const ApiExplorer = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState('generate');
  const [requestData, setRequestData] = useState('');
  const [responseData, setResponseData] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const endpoints = [
    {
      id: 'generate',
      method: 'POST',
      path: '/api/v1/generate',
      name: 'Generate QR',
      description: 'Create steganographic QR codes with hidden data',
      color: 'text-green-600'
    },
    {
      id: 'decode',
      method: 'POST',
      path: '/api/v1/decode',
      name: 'Decode QR',
      description: 'Extract hidden data from steganographic images',
      color: 'text-blue-600'
    },
    {
      id: 'validate',
      method: 'POST',
      path: '/api/v1/validate',
      name: 'Validate Image',
      description: 'Check if image contains steganographic data',
      color: 'text-purple-600'
    },
    {
      id: 'batch',
      method: 'POST',
      path: '/api/v1/batch',
      name: 'Batch Process',
      description: 'Process multiple images in a single request',
      color: 'text-orange-600'
    }
  ];

  const sampleRequests = {
    generate: `{
  "data": "Secret message to hide",
  "coverImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
  "algorithm": "lsb-enhanced",
  "qrOptions": {
    "errorCorrectionLevel": "M",
    "type": "png",
    "quality": 0.92,
    "margin": 1,
    "color": {
      "dark": "#000000",
      "light": "#FFFFFF"
    }
  },
  "stegoOptions": {
    "strength": 0.8,
    "distribution": "random",
    "encryption": true
  }
}`,
    decode: `{
  "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
  "algorithm": "lsb-enhanced",
  "decryptionKey": "optional-key-for-encrypted-data"
}`,
    validate: `{
  "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
  "algorithms": ["lsb-enhanced", "dct-spread", "wavelet-transform"]
}`,
    batch: `{
  "operations": [
    {
      "type": "generate",
      "data": "Message 1",
      "coverImage": "base64-image-1"
    },
    {
      "type": "decode",
      "image": "base64-image-2"
    },
    {
      "type": "validate",
      "image": "base64-image-3"
    }
  ],
  "options": {
    "parallel": true,
    "maxConcurrency": 5
  }
}`
  };

  const sampleResponses = {
    generate: `{
  "success": true,
  "data": {
    "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
    "stegoImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
    "metadata": {
      "algorithm": "lsb-enhanced",
      "dataSize": 256,
      "compressionRatio": 0.85,
      "processingTime": 1.2,
      "stegoStrength": 0.8
    }
  },
  "requestId": "req_1234567890abcdef"
}`,
    decode: `{
  "success": true,
  "data": {
    "extractedData": "Secret message to hide",
    "confidence": 0.95,
    "algorithm": "lsb-enhanced",
    "metadata": {
      "originalSize": 256,
      "extractionTime": 0.8,
      "dataIntegrity": "verified"
    }
  },
  "requestId": "req_abcdef1234567890"
}`,
    validate: `{
  "success": true,
  "data": {
    "containsSteganography": true,
    "detectedAlgorithms": ["lsb-enhanced"],
    "confidence": 0.92,
    "estimatedDataSize": 256,
    "analysisDetails": {
      "pixelAnalysis": "anomalies_detected",
      "frequencyAnalysis": "patterns_found",
      "statisticalTests": "passed"
    }
  },
  "requestId": "req_fedcba0987654321"
}`,
    batch: `{
  "success": true,
  "data": {
    "results": [
      {
        "operationId": 0,
        "success": true,
        "data": { "qrCode": "...", "stegoImage": "..." }
      },
      {
        "operationId": 1,
        "success": true,
        "data": { "extractedData": "Message from image 2" }
      },
      {
        "operationId": 2,
        "success": true,
        "data": { "containsSteganography": false }
      }
    ],
    "summary": {
      "totalOperations": 3,
      "successful": 3,
      "failed": 0,
      "processingTime": 2.1
    }
  },
  "requestId": "req_batch_1234567890"
}`
  };

  const handleTestEndpoint = async () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setResponseData(sampleResponses?.[selectedEndpoint]);
      setIsLoading(false);
    }, 1500);
  };

  const handleEndpointChange = (endpointId) => {
    setSelectedEndpoint(endpointId);
    setRequestData(sampleRequests?.[endpointId]);
    setResponseData('');
  };

  React.useEffect(() => {
    setRequestData(sampleRequests?.[selectedEndpoint]);
  }, [selectedEndpoint]);

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
          <Icon name="Play" size={20} className="text-accent" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Interactive API Explorer</h3>
          <p className="text-sm text-muted-foreground">Test API endpoints with real-time responses</p>
        </div>
      </div>
      {/* Endpoint Selector */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {endpoints?.map((endpoint) => (
          <button
            key={endpoint?.id}
            onClick={() => handleEndpointChange(endpoint?.id)}
            className={`p-4 rounded-lg border text-left transition-all duration-200 ${
              selectedEndpoint === endpoint?.id
                ? 'border-accent bg-accent/5' :'border-border hover:border-accent/50 hover:bg-accent/5'
            }`}
          >
            <div className="flex items-center space-x-2 mb-2">
              <span className={`text-xs font-mono px-2 py-1 rounded ${endpoint?.color} bg-current/10`}>
                {endpoint?.method}
              </span>
            </div>
            <h4 className="font-medium text-foreground mb-1">{endpoint?.name}</h4>
            <p className="text-xs text-muted-foreground">{endpoint?.description}</p>
            <code className="text-xs text-muted-foreground mt-1 block">{endpoint?.path}</code>
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Request Panel */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-foreground">Request</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigator.clipboard?.writeText(requestData)}
              iconName="Copy"
              iconSize={14}
            >
              Copy
            </Button>
          </div>
          <div className="bg-slate-900 rounded-lg overflow-hidden">
            <div className="px-4 py-2 bg-slate-800 border-b border-slate-700">
              <span className="text-sm text-slate-300 font-mono">JSON Request Body</span>
            </div>
            <textarea
              value={requestData}
              onChange={(e) => setRequestData(e?.target?.value)}
              className="w-full h-64 p-4 bg-transparent text-slate-100 text-sm font-mono resize-none focus:outline-none"
              placeholder="Enter your request data..."
            />
          </div>
        </div>

        {/* Response Panel */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-foreground">Response</h4>
            <Button
              variant="default"
              size="sm"
              onClick={handleTestEndpoint}
              loading={isLoading}
              iconName="Send"
              iconSize={14}
            >
              Test Endpoint
            </Button>
          </div>
          <div className="bg-slate-900 rounded-lg overflow-hidden">
            <div className="px-4 py-2 bg-slate-800 border-b border-slate-700">
              <span className="text-sm text-slate-300 font-mono">JSON Response</span>
            </div>
            <div className="h-64 p-4 overflow-auto">
              {responseData ? (
                <pre className="text-slate-100 text-sm font-mono whitespace-pre-wrap">
                  {responseData}
                </pre>
              ) : (
                <div className="flex items-center justify-center h-full text-slate-400">
                  <div className="text-center">
                    <Icon name="Code" size={32} className="mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Click "Test Endpoint" to see response</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* API Information */}
      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-accent mt-0.5" />
          <div>
            <h4 className="font-medium text-foreground mb-1">API Information</h4>
            <div className="text-sm text-muted-foreground space-y-1">
              <p><strong>Base URL:</strong> https://api.steganqr.com</p>
              <p><strong>Authentication:</strong> Bearer token in Authorization header</p>
              <p><strong>Rate Limit:</strong> 1000 requests per hour (sandbox), 10,000 per hour (production)</p>
              <p><strong>Max File Size:</strong> 10MB per image, 50MB for batch operations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiExplorer;