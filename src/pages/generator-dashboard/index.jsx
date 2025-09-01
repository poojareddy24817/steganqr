import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import all components
import UploadZone from './components/UploadZone';
import SteganographicControls from './components/SteganographicControls';
import LivePreview from './components/LivePreview';
import ProcessingQueue from './components/ProcessingQueue';
import ExportOptions from './components/ExportOptions';
import TutorialSidebar from './components/TutorialSidebar';

const GeneratorDashboard = () => {
  // State management
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [steganographicSettings, setSteganographicSettings] = useState({
    hiddenData: '',
    encryptionStrength: '128',
    encryptionKey: '',
    algorithm: 'lsb',
    compression: 'none',
    redundancy: 1,
    preserveMetadata: false,
    addHash: false,
    customSeed: false
  });
  const [previewSettings, setPreviewSettings] = useState({
    showOverlay: false,
    originalImage: null,
    processedImage: null
  });
  const [queueItems, setQueueItems] = useState([]);
  const [processedImages, setProcessedImages] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [currentTutorialStep, setCurrentTutorialStep] = useState(0);
  const [showTutorial, setShowTutorial] = useState(true);
  const [userTier] = useState('free'); // Mock user tier

  // Mock data for demonstration
  const mockQueueItems = [
    {
      id: 1,
      fileName: "landscape_photo.png",
      fileSize: "2.4 MB",
      algorithm: "LSB",
      encryption: "128-bit AES",
      status: "completed",
      progress: 100,
      processingTime: 23,
      completedAt: new Date(),
      downloadUrl: "https://picsum.photos/800/600?random=1"
    },
    {
      id: 2,
      fileName: "portrait_image.jpg",
      fileSize: "1.8 MB",
      algorithm: "DCT",
      encryption: "256-bit AES",
      status: "processing",
      progress: 67,
      estimatedTime: 15
    },
    {
      id: 3,
      fileName: "abstract_art.png",
      fileSize: "3.2 MB",
      algorithm: "LSB",
      encryption: "192-bit AES",
      status: "error",
      error: "Payload too large for carrier image"
    }
  ];

  // Initialize with mock data on component mount
  useEffect(() => {
    setQueueItems(mockQueueItems);
    setProcessedImages([
      {
        id: 1,
        name: "landscape_photo.png",
        originalUrl: "https://picsum.photos/800/600?random=1",
        processedUrl: "https://picsum.photos/800/600?random=2",
        size: "2.4 MB"
      }
    ]);
  }, []);

  // File upload handler
  const handleFileUpload = (files) => {
    const newFiles = files?.map((file, index) => ({
      ...file,
      id: Date.now() + index,
      preview: URL.createObjectURL(file)
    }));
    setUploadedFiles(prev => [...prev, ...newFiles]);
    
    // Set first uploaded image as preview
    if (newFiles?.length > 0 && !previewSettings?.originalImage) {
      setPreviewSettings(prev => ({
        ...prev,
        originalImage: newFiles?.[0]?.preview
      }));
    }
  };

  // Settings change handler
  const handleSettingsChange = (newSettings) => {
    setSteganographicSettings(newSettings);
  };

  // Preview toggle handler
  const handleToggleOverlay = () => {
    setPreviewSettings(prev => ({
      ...prev,
      showOverlay: !prev?.showOverlay
    }));
  };

  // Processing handlers
  const handleStartProcessing = () => {
    if (uploadedFiles?.length === 0 || !steganographicSettings?.hiddenData) {
      alert('Please upload images and enter hidden data before processing.');
      return;
    }

    setIsProcessing(true);
    setProcessingProgress(0);
    
    // Simulate processing with progress updates
    const progressInterval = setInterval(() => {
      setProcessingProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsProcessing(false);
          // Mock processed image
          setPreviewSettings(prev => ({
            ...prev,
            processedImage: "https://picsum.photos/800/600?random=3"
          }));
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  // Queue management handlers
  const handleRemoveQueueItem = (id) => {
    setQueueItems(prev => prev?.filter(item => item?.id !== id));
  };

  const handleRetryQueueItem = (id) => {
    setQueueItems(prev => prev?.map(item => 
      item?.id === id ? { ...item, status: 'pending', error: null } : item
    ));
  };

  const handleClearCompleted = () => {
    setQueueItems(prev => prev?.filter(item => item?.status !== 'completed'));
  };

  // Export handler
  const handleExport = (exportConfig) => {
    setIsExporting(true);
    
    // Simulate export process
    setTimeout(() => {
      setIsExporting(false);
      console.log('Export completed:', exportConfig);
      // In real implementation, trigger download here
    }, 2000);
  };

  // Tutorial handlers
  const handleTutorialStepChange = (step) => {
    setCurrentTutorialStep(step);
  };

  const handleToggleTutorial = () => {
    setShowTutorial(!showTutorial);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Main Content */}
      <main className="pt-16">
        <div className="w-full px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-primary mb-2">
                  Steganographic Generator
                </h1>
                <p className="text-muted-foreground">
                  Create invisible QR codes and hidden data within your images using advanced steganographic techniques
                </p>
              </div>
              
              {/* Quick Actions */}
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="HelpCircle"
                  iconPosition="left"
                  onClick={handleToggleTutorial}
                >
                  {showTutorial ? 'Hide' : 'Show'} Tutorial
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  iconName="Play"
                  iconPosition="left"
                  onClick={handleStartProcessing}
                  disabled={isProcessing || uploadedFiles?.length === 0}
                  loading={isProcessing}
                  className="bg-accent hover:bg-accent/90"
                >
                  {isProcessing ? 'Processing...' : 'Start Processing'}
                </Button>
              </div>
            </div>
            
            {/* Status Bar */}
            <div className="mt-4 flex items-center space-x-6 text-sm">
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-2 ${
                  uploadedFiles?.length > 0 ? 'bg-success' : 'bg-muted-foreground'
                }`}></div>
                <span className="text-muted-foreground">
                  {uploadedFiles?.length} images uploaded
                </span>
              </div>
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-2 ${
                  steganographicSettings?.hiddenData ? 'bg-success' : 'bg-muted-foreground'
                }`}></div>
                <span className="text-muted-foreground">
                  {steganographicSettings?.hiddenData ? 'Data configured' : 'No data set'}
                </span>
              </div>
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-2 ${
                  processedImages?.length > 0 ? 'bg-success' : 'bg-muted-foreground'
                }`}></div>
                <span className="text-muted-foreground">
                  {processedImages?.length} ready for export
                </span>
              </div>
            </div>
          </div>

          {/* Main Layout */}
          <div className={`grid grid-cols-1 ${showTutorial ? 'lg:grid-cols-2' : 'lg:grid-cols-3'} gap-8`}>
            {/* Left Column - Upload & Controls */}
            <div className="space-y-8">
              <UploadZone
                onFileUpload={handleFileUpload}
                uploadedFiles={uploadedFiles}
                isProcessing={isProcessing}
              />
              
              <SteganographicControls
                settings={steganographicSettings}
                onSettingsChange={handleSettingsChange}
                userTier={userTier}
                isProcessing={isProcessing}
              />
            </div>

            {/* Middle Column - Preview & Queue */}
            <div className="space-y-8">
              <LivePreview
                originalImage={previewSettings?.originalImage}
                processedImage={previewSettings?.processedImage}
                showOverlay={previewSettings?.showOverlay}
                onToggleOverlay={handleToggleOverlay}
                isProcessing={isProcessing}
                processingProgress={processingProgress}
              />
              
              {!showTutorial && (
                <ProcessingQueue
                  queueItems={queueItems}
                  onRemoveItem={handleRemoveQueueItem}
                  onRetryItem={handleRetryQueueItem}
                  onClearCompleted={handleClearCompleted}
                />
              )}
            </div>

            {/* Right Column - Export Options (when tutorial is hidden) */}
            {!showTutorial && (
              <div className="space-y-8">
                <ExportOptions
                  processedImages={processedImages}
                  onExport={handleExport}
                  isExporting={isExporting}
                  userTier={userTier}
                />
              </div>
            )}
          </div>

          {/* Mobile Layout - Processing Queue & Export (when tutorial is hidden) */}
          {!showTutorial && (
            <div className="lg:hidden mt-8 space-y-8">
              <ProcessingQueue
                queueItems={queueItems}
                onRemoveItem={handleRemoveQueueItem}
                onRetryItem={handleRetryQueueItem}
                onClearCompleted={handleClearCompleted}
              />
              
              <ExportOptions
                processedImages={processedImages}
                onExport={handleExport}
                isExporting={isExporting}
                userTier={userTier}
              />
            </div>
          )}

          {/* Tier Upgrade Banner */}
          {userTier === 'free' && (
            <div className="mt-8 bg-gradient-to-r from-accent/10 to-success/10 border border-accent/20 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                    <Icon name="Zap" size={24} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary">
                      Unlock Advanced Features
                    </h3>
                    <p className="text-muted-foreground">
                      Upgrade to Pro or Enterprise for custom algorithms, batch processing, and priority support
                    </p>
                  </div>
                </div>
                <Button
                  variant="default"
                  size="lg"
                  iconName="ArrowRight"
                  iconPosition="right"
                  className="bg-accent hover:bg-accent/90"
                >
                  Upgrade Now
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      {/* Tutorial Sidebar */}
      <TutorialSidebar
        currentStep={currentTutorialStep}
        onStepChange={handleTutorialStepChange}
        isVisible={showTutorial}
        onToggle={handleToggleTutorial}
      />
      {/* Processing Overlay */}
      {isProcessing && (
        <div className="fixed inset-0 bg-background/50 backdrop-blur-sm z-30 flex items-center justify-center">
          <div className="bg-card rounded-lg border border-border p-8 max-w-md w-full mx-4 shadow-xl">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4">
                <div className="w-full h-full border-4 border-accent/20 border-t-accent rounded-full animate-spin"></div>
              </div>
              <h3 className="text-lg font-semibold text-primary mb-2">
                Processing Images
              </h3>
              <p className="text-muted-foreground mb-4">
                Embedding steganographic data using advanced algorithms
              </p>
              <div className="w-full bg-muted rounded-full h-3 mb-2">
                <div 
                  className="bg-accent h-3 rounded-full transition-all duration-300"
                  style={{ width: `${processingProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-muted-foreground">
                {processingProgress}% Complete
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeneratorDashboard;