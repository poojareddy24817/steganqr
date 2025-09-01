import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ScannerInput from './components/ScannerInput';
import ProcessingOptions from './components/ProcessingOptions';
import ResultsViewer from './components/ResultsViewer';
import ScanHistory from './components/ScanHistory';
import ProcessingStatus from './components/ProcessingStatus';

const ScannerInterface = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentFile, setCurrentFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState([]);
  const [processingOptions, setProcessingOptions] = useState({
    sensitivity: 'medium',
    algorithm: 'auto',
    batchMode: false,
    forensicAnalysis: false,
    metadataExtraction: true,
    chainOfCustody: false,
    verifyIntegrity: true
  });

  // Simulate processing progress
  useEffect(() => {
    let interval;
    if (isProcessing) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsProcessing(false);
            setCurrentFile(null);
            // Simulate successful scan results
            setResults([
              {
                id: Date.now(),
                filename: currentFile || 'scanned_image.jpg',
                status: 'success',
                dataFound: true,
                algorithm: processingOptions?.algorithm === 'auto' ? 'LSB Steganography' : processingOptions?.algorithm,
                extractedData: {
                  type: 'text',
                  content: `Hidden message extracted at ${new Date()?.toLocaleString()}\n\nThis is confidential data that was embedded using steganographic techniques.\n\nProcessing options used:\n- Sensitivity: ${processingOptions?.sensitivity}\n- Algorithm: ${processingOptions?.algorithm}\n- Metadata extraction: ${processingOptions?.metadataExtraction ? 'enabled' : 'disabled'}\n- Integrity verification: ${processingOptions?.verifyIntegrity ? 'enabled' : 'disabled'}`,
                  size: '1.2 KB',
                  encoding: 'UTF-8'
                }
              }
            ]);
            return 0;
          }
          return prev + Math.random() * 15;
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isProcessing, currentFile, processingOptions]);

  const handleFileSelect = (files) => {
    if (files?.length > 0) {
      setCurrentFile(files?.[0]?.name);
      setIsProcessing(true);
      setProgress(0);
      setResults([]);
    }
  };

  const handleCameraCapture = (files) => {
    if (files?.length > 0) {
      setCurrentFile(files?.[0]?.name);
      setIsProcessing(true);
      setProgress(0);
      setResults([]);
    }
  };

  const handleUrlImport = (url) => {
    const filename = url?.split('/')?.pop() || 'imported_image.jpg';
    setCurrentFile(filename);
    setIsProcessing(true);
    setProgress(0);
    setResults([]);
  };

  const handleOptionsChange = (options) => {
    setProcessingOptions(options);
  };

  const handleCancelProcessing = () => {
    setIsProcessing(false);
    setProgress(0);
    setCurrentFile(null);
  };

  const handleDownload = (result) => {
    console.log('Download result:', result);
  };

  const handleForward = (result) => {
    console.log('Forward result:', result);
  };

  const handleClearResults = () => {
    setResults([]);
  };

  const handleLoadHistory = (historyItem) => {
    console.log('Load from history:', historyItem);
  };

  const handleClearHistory = () => {
    console.log('Clear scan history');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-to-br from-primary/5 via-accent/5 to-success/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-accent to-success rounded-lg flex items-center justify-center">
                <Icon name="ScanLine" size={24} color="white" />
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-primary">
                Scanner Interface
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Advanced steganographic detection and decoding with real-time analysis, 
              forensic capabilities, and enterprise-grade security features.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Icon name="Zap" size={24} className="text-accent" />
              </div>
              <div className="text-2xl font-bold text-primary">6</div>
              <div className="text-sm text-muted-foreground">Detection Algorithms</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Icon name="Shield" size={24} className="text-success" />
              </div>
              <div className="text-2xl font-bold text-primary">99.7%</div>
              <div className="text-sm text-muted-foreground">Detection Accuracy</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Icon name="Clock" size={24} className="text-warning" />
              </div>
              <div className="text-2xl font-bold text-primary">&lt;30s</div>
              <div className="text-sm text-muted-foreground">Average Scan Time</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Icon name="Database" size={24} className="text-primary" />
              </div>
              <div className="text-2xl font-bold text-primary">10MB</div>
              <div className="text-sm text-muted-foreground">Max File Size</div>
            </div>
          </div>
        </div>
      </section>
      {/* Main Interface */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Input and Options */}
            <div className="lg:col-span-1 space-y-6">
              <ScannerInput
                onFileSelect={handleFileSelect}
                onCameraCapture={handleCameraCapture}
                onUrlImport={handleUrlImport}
                isProcessing={isProcessing}
              />
              
              <ProcessingOptions
                onOptionsChange={handleOptionsChange}
                isProcessing={isProcessing}
              />
            </div>

            {/* Right Column - Results and Status */}
            <div className="lg:col-span-2 space-y-6">
              {isProcessing && (
                <ProcessingStatus
                  isProcessing={isProcessing}
                  currentFile={currentFile}
                  progress={progress}
                  onCancel={handleCancelProcessing}
                />
              )}
              
              <ResultsViewer
                results={results}
                onDownload={handleDownload}
                onForward={handleForward}
                onClear={handleClearResults}
              />
            </div>
          </div>

          {/* History Section */}
          <div className="mt-12">
            <ScanHistory
              onLoadHistory={handleLoadHistory}
              onClearHistory={handleClearHistory}
            />
          </div>
        </div>
      </section>
      {/* Security Features */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Enterprise Security Features
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Advanced capabilities designed for security professionals and forensic analysis
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card rounded-lg border border-border p-6 shadow-brand-card">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Icon name="Search" size={24} className="text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-primary mb-2">Multi-Algorithm Detection</h3>
              <p className="text-sm text-muted-foreground">
                Supports LSB, DCT, DWT, Spread Spectrum, and custom steganographic methods with automatic algorithm identification.
              </p>
            </div>

            <div className="bg-card rounded-lg border border-border p-6 shadow-brand-card">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mb-4">
                <Icon name="Shield" size={24} className="text-success" />
              </div>
              <h3 className="text-lg font-semibold text-primary mb-2">Forensic Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Chain of custody logging, evidence tracking, and detailed technical reports for legal compliance.
              </p>
            </div>

            <div className="bg-card rounded-lg border border-border p-6 shadow-brand-card">
              <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center mb-4">
                <Icon name="Cpu" size={24} className="text-warning" />
              </div>
              <h3 className="text-lg font-semibold text-primary mb-2">Batch Processing</h3>
              <p className="text-sm text-muted-foreground">
                Process multiple images simultaneously with parallel processing and progress tracking.
              </p>
            </div>

            <div className="bg-card rounded-lg border border-border p-6 shadow-brand-card">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Icon name="Lock" size={24} className="text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-primary mb-2">Data Integrity</h3>
              <p className="text-sm text-muted-foreground">
                Cryptographic signature verification and authenticity checks for extracted data.
              </p>
            </div>

            <div className="bg-card rounded-lg border border-border p-6 shadow-brand-card">
              <div className="w-12 h-12 bg-error/10 rounded-lg flex items-center justify-center mb-4">
                <Icon name="Database" size={24} className="text-error" />
              </div>
              <h3 className="text-lg font-semibold text-primary mb-2">Metadata Extraction</h3>
              <p className="text-sm text-muted-foreground">
                Comprehensive EXIF data analysis, camera information, and technical metadata extraction.
              </p>
            </div>

            <div className="bg-card rounded-lg border border-border p-6 shadow-brand-card">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Icon name="Smartphone" size={24} className="text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-primary mb-2">Mobile Optimization</h3>
              <p className="text-sm text-muted-foreground">
                Camera integration, offline processing, and biometric protection for mobile devices.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-primary to-accent">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Uncover Hidden Data?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8">
            Start scanning images for hidden information with our advanced detection algorithms
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button
              variant="secondary"
              size="lg"
              iconName="Upload"
              iconPosition="left"
              onClick={() => document.querySelector('input[type="file"]')?.click()}
            >
              Upload Image to Scan
            </Button>
            <Button
              variant="outline"
              size="lg"
              iconName="Camera"
              iconPosition="left"
              className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              Use Camera
            </Button>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                  <Icon name="Shield" size={16} color="white" />
                </div>
                <span className="text-xl font-bold">SteganQR</span>
              </div>
              <p className="text-primary-foreground/80 mb-4">
                Advanced steganographic QR code platform for secure, invisible data transmission.
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Icon name="Shield" size={14} className="text-success" />
                  <span className="text-xs">Enterprise Security</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Lock" size={14} className="text-success" />
                  <span className="text-xs">End-to-End Encrypted</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Scanner Tools</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li>Multi-Algorithm Detection</li>
                <li>Batch Processing</li>
                <li>Forensic Analysis</li>
                <li>Mobile Scanning</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Security</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li>Local Processing</li>
                <li>Data Integrity</li>
                <li>Chain of Custody</li>
                <li>Privacy Protection</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm text-primary-foreground/60">
            <p>&copy; {new Date()?.getFullYear()} SteganQR. All rights reserved. Security hidden in plain sight.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ScannerInterface;