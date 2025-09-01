import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SandboxEnvironment = () => {
  const [apiKey, setApiKey] = useState('sk_test_1234567890abcdef');
  const [selectedFile, setSelectedFile] = useState(null);
  const [hiddenMessage, setHiddenMessage] = useState('This is a test message hidden in the image');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [activeTab, setActiveTab] = useState('generate');

  const testImages = [
    {
      id: 'sample1',
      name: 'Business Card',
      url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      description: 'Professional business card template'
    },
    {
      id: 'sample2', 
      name: 'Product Photo',
      url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
      description: 'E-commerce product photography'
    },
    {
      id: 'sample3',
      name: 'Marketing Poster',
      url: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop',
      description: 'Event marketing poster design'
    },
    {
      id: 'sample4',
      name: 'Document Scan',
      url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop',
      description: 'Scanned document template'
    }
  ];

  const algorithms = [
    { id: 'lsb-enhanced', name: 'LSB Enhanced', description: 'Best for documents and simple images' },
    { id: 'dct-spread', name: 'DCT Spread', description: 'Robust for compressed images' },
    { id: 'wavelet-transform', name: 'Wavelet Transform', description: 'Optimal for photographs' },
    { id: 'frequency-domain', name: 'Frequency Domain', description: 'Advanced resistance to attacks' }
  ];

  const [selectedAlgorithm, setSelectedAlgorithm] = useState('lsb-enhanced');
  const [selectedTestImage, setSelectedTestImage] = useState(testImages?.[0]);

  const handleGenerate = async () => {
    setIsProcessing(true);
    
    // Simulate API processing
    setTimeout(() => {
      setResult({
        type: 'generate',
        success: true,
        data: {
          originalImage: selectedTestImage?.url,
          stegoImage: selectedTestImage?.url + '?stego=true',
          qrCode: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
          algorithm: selectedAlgorithm,
          hiddenMessage: hiddenMessage,
          metadata: {
            processingTime: 1.2,
            dataSize: hiddenMessage?.length,
            stegoStrength: 0.85,
            compressionRatio: 0.92
          }
        }
      });
      setIsProcessing(false);
    }, 2000);
  };

  const handleDecode = async () => {
    setIsProcessing(true);
    
    // Simulate API processing
    setTimeout(() => {
      setResult({
        type: 'decode',
        success: true,
        data: {
          extractedMessage: 'This is a test message hidden in the image',
          confidence: 0.94,
          algorithm: selectedAlgorithm,
          metadata: {
            extractionTime: 0.8,
            dataIntegrity: 'verified',
            originalSize: 256
          }
        }
      });
      setIsProcessing(false);
    }, 1500);
  };

  const handleValidate = async () => {
    setIsProcessing(true);
    
    // Simulate API processing
    setTimeout(() => {
      setResult({
        type: 'validate',
        success: true,
        data: {
          containsSteganography: true,
          detectedAlgorithms: ['lsb-enhanced', 'dct-spread'],
          confidence: 0.89,
          estimatedDataSize: 256,
          analysisDetails: {
            pixelAnalysis: 'anomalies_detected',
            frequencyAnalysis: 'patterns_found',
            statisticalTests: 'passed'
          }
        }
      });
      setIsProcessing(false);
    }, 1800);
  };

  const renderResult = () => {
    if (!result) return null;

    return (
      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="CheckCircle" size={20} className="text-success" />
          <h4 className="font-medium text-foreground">Processing Result</h4>
        </div>
        {result?.type === 'generate' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-foreground mb-2">Original Image</p>
                <img 
                  src={result?.data?.originalImage} 
                  alt="Original" 
                  className="w-full h-32 object-cover rounded border"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground mb-2">Steganographic Image</p>
                <img 
                  src={result?.data?.stegoImage} 
                  alt="Steganographic" 
                  className="w-full h-32 object-cover rounded border"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Processing Time</p>
                <p className="font-medium">{result?.data?.metadata?.processingTime}s</p>
              </div>
              <div>
                <p className="text-muted-foreground">Data Size</p>
                <p className="font-medium">{result?.data?.metadata?.dataSize} bytes</p>
              </div>
              <div>
                <p className="text-muted-foreground">Stego Strength</p>
                <p className="font-medium">{(result?.data?.metadata?.stegoStrength * 100)?.toFixed(1)}%</p>
              </div>
              <div>
                <p className="text-muted-foreground">Compression</p>
                <p className="font-medium">{(result?.data?.metadata?.compressionRatio * 100)?.toFixed(1)}%</p>
              </div>
            </div>
          </div>
        )}
        {result?.type === 'decode' && (
          <div className="space-y-4">
            <div className="p-3 bg-card rounded border">
              <p className="text-sm text-muted-foreground mb-1">Extracted Message</p>
              <p className="font-medium text-foreground">{result?.data?.extractedMessage}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Confidence</p>
                <p className="font-medium">{(result?.data?.confidence * 100)?.toFixed(1)}%</p>
              </div>
              <div>
                <p className="text-muted-foreground">Extraction Time</p>
                <p className="font-medium">{result?.data?.metadata?.extractionTime}s</p>
              </div>
              <div>
                <p className="text-muted-foreground">Data Integrity</p>
                <p className="font-medium capitalize">{result?.data?.metadata?.dataIntegrity}</p>
              </div>
            </div>
          </div>
        )}
        {result?.type === 'validate' && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Icon 
                name={result?.data?.containsSteganography ? "Shield" : "ShieldOff"} 
                size={16} 
                className={result?.data?.containsSteganography ? "text-success" : "text-muted-foreground"} 
              />
              <p className="font-medium">
                {result?.data?.containsSteganography ? 'Steganography Detected' : 'No Steganography Found'}
              </p>
            </div>
            {result?.data?.containsSteganography && (
              <>
                <div className="flex flex-wrap gap-2">
                  {result?.data?.detectedAlgorithms?.map((algo, index) => (
                    <span key={index} className="px-2 py-1 bg-accent/10 text-accent text-xs rounded">
                      {algo}
                    </span>
                  ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Confidence</p>
                    <p className="font-medium">{(result?.data?.confidence * 100)?.toFixed(1)}%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Estimated Size</p>
                    <p className="font-medium">{result?.data?.estimatedDataSize} bytes</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Analysis Status</p>
                    <p className="font-medium text-success">Complete</p>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
          <Icon name="TestTube" size={20} className="text-accent" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Sandbox Environment</h3>
          <p className="text-sm text-muted-foreground">Test API functionality with sample data</p>
        </div>
      </div>
      {/* API Key Configuration */}
      <div className="mb-6 p-4 bg-accent/5 border border-accent/20 rounded-lg">
        <h4 className="font-medium text-foreground mb-3">Sandbox Configuration</h4>
        <Input
          label="API Key"
          value={apiKey}
          onChange={(e) => setApiKey(e?.target?.value)}
          description="Using sandbox test key - no charges apply"
          className="font-mono text-sm"
        />
      </div>
      {/* Operation Tabs */}
      <div className="flex space-x-1 mb-6 border-b border-border">
        {[
          { id: 'generate', name: 'Generate', icon: 'Plus' },
          { id: 'decode', name: 'Decode', icon: 'Search' },
          { id: 'validate', name: 'Validate', icon: 'Shield' }
        ]?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium transition-all duration-200 border-b-2 ${
              activeTab === tab?.id
                ? 'border-accent text-accent' :'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name={tab?.icon} size={16} />
            <span>{tab?.name}</span>
          </button>
        ))}
      </div>
      {/* Test Image Selection */}
      <div className="mb-6">
        <h4 className="font-medium text-foreground mb-3">Select Test Image</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {testImages?.map((image) => (
            <button
              key={image?.id}
              onClick={() => setSelectedTestImage(image)}
              className={`p-3 rounded-lg border text-left transition-all duration-200 ${
                selectedTestImage?.id === image?.id
                  ? 'border-accent bg-accent/5' :'border-border hover:border-accent/50'
              }`}
            >
              <img 
                src={image?.url} 
                alt={image?.name}
                className="w-full h-20 object-cover rounded mb-2"
              />
              <p className="font-medium text-sm">{image?.name}</p>
              <p className="text-xs text-muted-foreground">{image?.description}</p>
            </button>
          ))}
        </div>
      </div>
      {/* Algorithm Selection */}
      <div className="mb-6">
        <h4 className="font-medium text-foreground mb-3">Steganographic Algorithm</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {algorithms?.map((algo) => (
            <button
              key={algo?.id}
              onClick={() => setSelectedAlgorithm(algo?.id)}
              className={`p-3 rounded-lg border text-left transition-all duration-200 ${
                selectedAlgorithm === algo?.id
                  ? 'border-accent bg-accent/5' :'border-border hover:border-accent/50'
              }`}
            >
              <p className="font-medium text-sm">{algo?.name}</p>
              <p className="text-xs text-muted-foreground">{algo?.description}</p>
            </button>
          ))}
        </div>
      </div>
      {/* Operation-specific Controls */}
      {activeTab === 'generate' && (
        <div className="mb-6">
          <Input
            label="Hidden Message"
            value={hiddenMessage}
            onChange={(e) => setHiddenMessage(e?.target?.value)}
            description="Enter the message to hide in the image"
            className="mb-4"
          />
          <Button
            onClick={handleGenerate}
            loading={isProcessing}
            iconName="Play"
            iconSize={16}
            className="w-full md:w-auto"
          >
            Generate Steganographic Image
          </Button>
        </div>
      )}
      {activeTab === 'decode' && (
        <div className="mb-6">
          <p className="text-sm text-muted-foreground mb-4">
            Extract hidden message from the selected test image
          </p>
          <Button
            onClick={handleDecode}
            loading={isProcessing}
            iconName="Search"
            iconSize={16}
            className="w-full md:w-auto"
          >
            Decode Hidden Message
          </Button>
        </div>
      )}
      {activeTab === 'validate' && (
        <div className="mb-6">
          <p className="text-sm text-muted-foreground mb-4">
            Analyze the selected image for steganographic content
          </p>
          <Button
            onClick={handleValidate}
            loading={isProcessing}
            iconName="Shield"
            iconSize={16}
            className="w-full md:w-auto"
          >
            Validate Image
          </Button>
        </div>
      )}
      {/* Results */}
      {renderResult()}
      {/* Sandbox Limitations */}
      <div className="mt-6 p-4 bg-warning/5 border border-warning/20 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="AlertTriangle" size={20} className="text-warning mt-0.5" />
          <div>
            <h4 className="font-medium text-foreground mb-1">Sandbox Limitations</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Limited to 100 requests per hour</li>
              <li>• Maximum file size: 5MB</li>
              <li>• Test data only - not suitable for production</li>
              <li>• Results may be simulated for demonstration</li>
              <li>• No data persistence between sessions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SandboxEnvironment;