import React, { useState, useRef, useCallback, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const ScannerInput = ({ onFileSelect, onCameraCapture, onUrlImport, isProcessing }) => {
  const [activeTab, setActiveTab] = useState('upload');
  const [dragActive, setDragActive] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [cameraStream, setCameraStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);

  const inputMethods = [
    { id: 'upload', label: 'File Upload', icon: 'Upload' },
    { id: 'camera', label: 'Camera Capture', icon: 'Camera' },
    { id: 'url', label: 'URL Import', icon: 'Link' }
  ];

  const handleDrag = useCallback((e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === 'dragenter' || e?.type === 'dragover') {
      setDragActive(true);
    } else if (e?.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e?.dataTransfer?.files);
    const imageFiles = files?.filter(file => file?.type?.startsWith('image/'));
    
    if (imageFiles?.length > 0) {
      onFileSelect(imageFiles);
    }
  }, [onFileSelect]);

  const handleFileSelect = (e) => {
    const files = Array.from(e?.target?.files);
    if (files?.length > 0) {
      onFileSelect(files);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices?.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      setCameraStream(stream);
      if (videoRef?.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Camera access denied:', error);
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream?.getTracks()?.forEach(track => track?.stop());
      setCameraStream(null);
    }
  };

  const capturePhoto = () => {
    if (videoRef?.current) {
      const canvas = document.createElement('canvas');
      const context = canvas?.getContext('2d');
      canvas.width = videoRef?.current?.videoWidth;
      canvas.height = videoRef?.current?.videoHeight;
      context?.drawImage(videoRef?.current, 0, 0);
      
      canvas?.toBlob((blob) => {
        const file = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' });
        setCapturedImage(URL.createObjectURL(blob));
        onCameraCapture([file]);
        stopCamera();
      }, 'image/jpeg', 0.9);
    }
  };

  const handleUrlImport = () => {
    if (urlInput?.trim()) {
      onUrlImport(urlInput?.trim());
      setUrlInput('');
    }
  };

  React.useEffect(() => {
    if (activeTab === 'camera') {
      startCamera();
    } else {
      stopCamera();
    }
    
    return () => stopCamera();
  }, [activeTab]);

  return (
    <div className="bg-card rounded-lg border border-border shadow-brand-card">
      {/* Input Method Tabs */}
      <div className="flex border-b border-border">
        {inputMethods?.map((method) => (
          <button
            key={method?.id}
            onClick={() => setActiveTab(method?.id)}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 text-sm font-medium transition-all duration-200 ${
              activeTab === method?.id
                ? 'bg-accent text-accent-foreground border-b-2 border-accent'
                : 'text-muted-foreground hover:text-primary hover:bg-muted'
            }`}
          >
            <Icon name={method?.icon} size={16} />
            <span className="hidden sm:inline">{method?.label}</span>
          </button>
        ))}
      </div>
      <div className="p-6">
        {/* File Upload Tab */}
        {activeTab === 'upload' && (
          <div
            className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
              dragActive
                ? 'border-accent bg-accent/5' :'border-border hover:border-accent/50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={isProcessing}
            />
            
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-accent/10 rounded-full flex items-center justify-center">
                <Icon name="Upload" size={24} className="text-accent" />
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-primary mb-2">
                  Drop images here or click to browse
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Supports JPG, PNG, GIF, WebP formats. Multiple files allowed.
                </p>
                
                <Button
                  variant="outline"
                  onClick={() => fileInputRef?.current?.click()}
                  disabled={isProcessing}
                  iconName="FolderOpen"
                  iconPosition="left"
                >
                  Select Files
                </Button>
              </div>
              
              <div className="text-xs text-muted-foreground">
                Maximum file size: 10MB per image
              </div>
            </div>
          </div>
        )}

        {/* Camera Capture Tab */}
        {activeTab === 'camera' && (
          <div className="space-y-4">
            {!cameraStream && !capturedImage && (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto bg-accent/10 rounded-full flex items-center justify-center mb-4">
                  <Icon name="Camera" size={24} className="text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">
                  Camera Access Required
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Allow camera access to capture images for scanning
                </p>
                <Button
                  variant="default"
                  onClick={startCamera}
                  iconName="Camera"
                  iconPosition="left"
                >
                  Enable Camera
                </Button>
              </div>
            )}

            {cameraStream && (
              <div className="relative">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-64 bg-black rounded-lg object-cover"
                />
                
                {/* Viewfinder Overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-48 h-48 border-2 border-accent rounded-lg">
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-accent"></div>
                    <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-accent"></div>
                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-accent"></div>
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-accent"></div>
                  </div>
                </div>
                
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
                  <Button
                    variant="default"
                    onClick={capturePhoto}
                    disabled={isProcessing}
                    iconName="Camera"
                    className="bg-accent hover:bg-accent/90"
                  >
                    Capture
                  </Button>
                  <Button
                    variant="outline"
                    onClick={stopCamera}
                    iconName="X"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {capturedImage && (
              <div className="text-center">
                <div className="relative inline-block">
                  <Image
                    src={capturedImage}
                    alt="Captured image"
                    className="w-64 h-64 object-cover rounded-lg"
                  />
                  <div className="absolute top-2 right-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setCapturedImage(null);
                        startCamera();
                      }}
                      iconName="RotateCcw"
                    >
                      Retake
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* URL Import Tab */}
        {activeTab === 'url' && (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto bg-accent/10 rounded-full flex items-center justify-center mb-4">
                <Icon name="Link" size={24} className="text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-primary mb-2">
                Import from URL
              </h3>
              <p className="text-sm text-muted-foreground">
                Enter the URL of an image to scan for hidden data
              </p>
            </div>

            <div className="flex space-x-3">
              <div className="flex-1">
                <input
                  type="url"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e?.target?.value)}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  disabled={isProcessing}
                />
              </div>
              <Button
                variant="default"
                onClick={handleUrlImport}
                disabled={!urlInput?.trim() || isProcessing}
                iconName="Download"
                iconPosition="left"
              >
                Import
              </Button>
            </div>

            <div className="text-xs text-muted-foreground">
              <div className="flex items-center space-x-2 mb-1">
                <Icon name="Shield" size={12} className="text-success" />
                <span>Secure HTTPS URLs only</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="AlertCircle" size={12} className="text-warning" />
                <span>Large images may take longer to process</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScannerInput;