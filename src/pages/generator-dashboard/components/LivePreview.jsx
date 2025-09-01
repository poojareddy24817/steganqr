import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const LivePreview = ({ 
  originalImage, 
  processedImage, 
  showOverlay = false, 
  onToggleOverlay,
  isProcessing = false,
  processingProgress = 0 
}) => {
  const [viewMode, setViewMode] = useState('split'); // 'original', 'processed', 'split'
  const [zoomLevel, setZoomLevel] = useState(100);

  const viewModes = [
    { value: 'original', label: 'Original', icon: 'Image' },
    { value: 'processed', label: 'Processed', icon: 'Zap' },
    { value: 'split', label: 'Split View', icon: 'SplitSquareHorizontal' }
  ];

  const zoomLevels = [50, 75, 100, 125, 150, 200];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-primary flex items-center">
          <Icon name="Eye" size={20} className="mr-2 text-accent" />
          Live Preview
        </h3>
        
        <div className="flex items-center space-x-2">
          {/* View Mode Selector */}
          <div className="flex bg-muted rounded-lg p-1">
            {viewModes?.map((mode) => (
              <button
                key={mode?.value}
                onClick={() => setViewMode(mode?.value)}
                className={`flex items-center px-3 py-1 rounded text-xs font-medium transition-all duration-200 ${
                  viewMode === mode?.value
                    ? 'bg-accent text-accent-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-primary'
                }`}
              >
                <Icon name={mode?.icon} size={14} className="mr-1" />
                {mode?.label}
              </button>
            ))}
          </div>

          {/* Overlay Toggle */}
          <button
            onClick={onToggleOverlay}
            className={`flex items-center px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
              showOverlay
                ? 'bg-warning text-warning-foreground'
                : 'bg-muted text-muted-foreground hover:text-primary'
            }`}
            title="Toggle embedding regions overlay"
          >
            <Icon name="Layers" size={14} className="mr-1" />
            Overlay
          </button>
        </div>
      </div>
      {/* Preview Area */}
      <div className="relative bg-muted/20 rounded-lg overflow-hidden" style={{ minHeight: '400px' }}>
        {!originalImage ? (
          // Empty State
          (<div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center mb-4">
                <Icon name="ImageOff" size={32} className="text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">Upload an image to see preview</p>
            </div>
          </div>)
        ) : (
          <>
            {/* Processing Overlay */}
            {isProcessing && (
              <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4">
                    <div className="w-full h-full border-4 border-accent/20 border-t-accent rounded-full animate-spin"></div>
                  </div>
                  <p className="text-sm font-medium text-primary mb-2">Processing Image</p>
                  <div className="w-48 bg-muted rounded-full h-2 mb-2">
                    <div 
                      className="bg-accent h-2 rounded-full transition-all duration-300"
                      style={{ width: `${processingProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-muted-foreground">{processingProgress}% Complete</p>
                </div>
              </div>
            )}

            {/* Image Display */}
            <div className="relative h-full">
              {viewMode === 'split' ? (
                <div className="flex h-full">
                  {/* Original Side */}
                  <div className="flex-1 relative border-r border-border">
                    <div className="absolute top-2 left-2 z-10">
                      <span className="px-2 py-1 bg-background/80 backdrop-blur-sm text-xs font-medium text-primary rounded">
                        Original
                      </span>
                    </div>
                    <div className="w-full h-full flex items-center justify-center p-4">
                      <Image
                        src={originalImage}
                        alt="Original image"
                        className="max-w-full max-h-full object-contain"
                        style={{ transform: `scale(${zoomLevel / 100})` }}
                      />
                    </div>
                  </div>

                  {/* Processed Side */}
                  <div className="flex-1 relative">
                    <div className="absolute top-2 left-2 z-10">
                      <span className="px-2 py-1 bg-background/80 backdrop-blur-sm text-xs font-medium text-primary rounded">
                        Processed
                      </span>
                    </div>
                    <div className="w-full h-full flex items-center justify-center p-4">
                      {processedImage ? (
                        <div className="relative">
                          <Image
                            src={processedImage}
                            alt="Processed image"
                            className="max-w-full max-h-full object-contain"
                            style={{ transform: `scale(${zoomLevel / 100})` }}
                          />
                          {showOverlay && (
                            <div className="absolute inset-0 bg-accent/10 border-2 border-accent/30 rounded">
                              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-center text-muted-foreground">
                          <Icon name="Clock" size={24} className="mx-auto mb-2" />
                          <p className="text-sm">Waiting for processing</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                // Single View
                (<div className="w-full h-full flex items-center justify-center p-4">
                  <div className="relative">
                    <Image
                      src={viewMode === 'original' ? originalImage : (processedImage || originalImage)}
                      alt={`${viewMode} image`}
                      className="max-w-full max-h-full object-contain"
                      style={{ transform: `scale(${zoomLevel / 100})` }}
                    />
                    {showOverlay && viewMode === 'processed' && processedImage && (
                      <div className="absolute inset-0">
                        {/* Simulated embedding regions */}
                        <div className="absolute top-1/4 left-1/4 w-8 h-8 border-2 border-accent/60 bg-accent/10 rounded"></div>
                        <div className="absolute top-1/2 right-1/3 w-6 h-6 border-2 border-accent/60 bg-accent/10 rounded"></div>
                        <div className="absolute bottom-1/3 left-1/2 w-10 h-6 border-2 border-accent/60 bg-accent/10 rounded"></div>
                      </div>
                    )}
                  </div>
                </div>)
              )}
            </div>
          </>
        )}
      </div>
      {/* Controls */}
      <div className="flex items-center justify-between mt-4">
        {/* Zoom Controls */}
        <div className="flex items-center space-x-2">
          <Icon name="ZoomIn" size={16} className="text-muted-foreground" />
          <select
            value={zoomLevel}
            onChange={(e) => setZoomLevel(parseInt(e?.target?.value))}
            className="bg-muted border border-border rounded px-2 py-1 text-sm text-primary"
          >
            {zoomLevels?.map((level) => (
              <option key={level} value={level}>{level}%</option>
            ))}
          </select>
        </div>

        {/* Image Info */}
        {originalImage && (
          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
            <div className="flex items-center">
              <Icon name="Image" size={14} className="mr-1" />
              1920×1080
            </div>
            <div className="flex items-center">
              <Icon name="HardDrive" size={14} className="mr-1" />
              2.4 MB
            </div>
            <div className="flex items-center">
              <Icon name="FileType" size={14} className="mr-1" />
              PNG
            </div>
          </div>
        )}

        {/* Quality Indicator */}
        {processedImage && (
          <div className="flex items-center space-x-2">
            <div className="flex items-center text-xs">
              <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
              <span className="text-success">Quality: 98.7%</span>
            </div>
            <div className="flex items-center text-xs">
              <div className="w-2 h-2 bg-accent rounded-full mr-2"></div>
              <span className="text-accent">Embedded: 1.2KB</span>
            </div>
          </div>
        )}
      </div>
      {/* Preview Tips */}
      <div className="mt-4 p-3 bg-muted/20 rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Lightbulb" size={16} className="text-warning mt-0.5" />
          <div className="text-xs text-muted-foreground">
            <p className="font-medium text-primary mb-1">Preview Tips:</p>
            <ul className="space-y-1">
              <li>• Use overlay mode to visualize embedding regions (for security testing only)</li>
              <li>• Split view helps compare original vs processed quality</li>
              <li>• Zoom in to inspect pixel-level changes</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LivePreview;