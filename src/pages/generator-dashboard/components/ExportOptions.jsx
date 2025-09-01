import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ExportOptions = ({ 
  processedImages = [], 
  onExport, 
  isExporting = false,
  userTier = 'free' 
}) => {
  const [exportSettings, setExportSettings] = useState({
    format: 'png',
    quality: 95,
    preserveMetadata: true,
    includeOriginal: false,
    batchDownload: false,
    secureDelete: true,
    watermark: false,
    compressionLevel: 'medium'
  });

  const formatOptions = [
    { value: 'png', label: 'PNG', description: 'Lossless, best for steganography' },
    { value: 'jpg', label: 'JPEG', description: 'Smaller file size, slight quality loss' },
    { value: 'webp', label: 'WebP', description: 'Modern format, excellent compression' },
    ...(userTier === 'enterprise' ? [
      { value: 'tiff', label: 'TIFF', description: 'Professional, uncompressed' }
    ] : [])
  ];

  const compressionOptions = [
    { value: 'none', label: 'No Compression', description: 'Largest file, fastest export' },
    { value: 'low', label: 'Low Compression', description: 'Slight size reduction' },
    { value: 'medium', label: 'Medium Compression', description: 'Balanced size/quality' },
    { value: 'high', label: 'High Compression', description: 'Smallest file size' }
  ];

  const handleSettingChange = (key, value) => {
    setExportSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleExport = (type = 'single') => {
    onExport({
      type,
      settings: exportSettings,
      images: processedImages
    });
  };

  const getTotalFileSize = () => {
    // Mock calculation
    const baseSize = processedImages?.length * 2.4; // MB
    const compressionFactor = {
      'none': 1,
      'low': 0.9,
      'medium': 0.7,
      'high': 0.5
    }?.[exportSettings?.compressionLevel];
    
    return (baseSize * compressionFactor)?.toFixed(1);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-primary flex items-center">
          <Icon name="Download" size={20} className="mr-2 text-accent" />
          Export Options
        </h3>
        
        {processedImages?.length > 0 && (
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span className="text-success">{processedImages?.length} ready</span>
          </div>
        )}
      </div>
      {processedImages?.length === 0 ? (
        // Empty State
        (<div className="text-center py-12">
          <div className="w-16 h-16 mx-auto bg-muted/30 rounded-full flex items-center justify-center mb-4">
            <Icon name="FileX" size={32} className="text-muted-foreground" />
          </div>
          <p className="text-muted-foreground mb-2">No processed images</p>
          <p className="text-sm text-muted-foreground">Complete image processing to enable export options</p>
        </div>)
      ) : (
        <div className="space-y-6">
          {/* Format Selection */}
          <div>
            <Select
              label="Export Format"
              options={formatOptions}
              value={exportSettings?.format}
              onChange={(value) => handleSettingChange('format', value)}
              description="Choose the output format for your steganographic images"
            />
          </div>

          {/* Quality Settings */}
          {exportSettings?.format === 'jpg' && (
            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                JPEG Quality: {exportSettings?.quality}%
              </label>
              <input
                type="range"
                min="60"
                max="100"
                value={exportSettings?.quality}
                onChange={(e) => handleSettingChange('quality', parseInt(e?.target?.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Smaller</span>
                <span>Balanced</span>
                <span>Best Quality</span>
              </div>
            </div>
          )}

          {/* Compression Level */}
          <div>
            <Select
              label="Compression Level"
              options={compressionOptions}
              value={exportSettings?.compressionLevel}
              onChange={(value) => handleSettingChange('compressionLevel', value)}
              description="Affects file size and processing time"
            />
          </div>

          {/* Export Options */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-primary">Export Settings</h4>
            
            <div className="space-y-3">
              <Checkbox
                label="Preserve Original Metadata"
                checked={exportSettings?.preserveMetadata}
                onChange={(e) => handleSettingChange('preserveMetadata', e?.target?.checked)}
                description="Keep EXIF data, creation date, and camera information"
              />
              
              <Checkbox
                label="Include Original Images"
                checked={exportSettings?.includeOriginal}
                onChange={(e) => handleSettingChange('includeOriginal', e?.target?.checked)}
                description="Download both original and processed versions"
              />
              
              <Checkbox
                label="Batch Download (ZIP)"
                checked={exportSettings?.batchDownload}
                onChange={(e) => handleSettingChange('batchDownload', e?.target?.checked)}
                description="Package all images into a single ZIP file"
                disabled={processedImages?.length === 1}
              />
              
              <Checkbox
                label="Secure Auto-Delete"
                checked={exportSettings?.secureDelete}
                onChange={(e) => handleSettingChange('secureDelete', e?.target?.checked)}
                description="Automatically delete temporary files after download"
              />
              
              {userTier !== 'free' && (
                <Checkbox
                  label="Add Watermark"
                  checked={exportSettings?.watermark}
                  onChange={(e) => handleSettingChange('watermark', e?.target?.checked)}
                  description="Add invisible SteganQR watermark for verification"
                />
              )}
            </div>
          </div>

          {/* File Size Estimation */}
          <div className="bg-muted/20 rounded-lg p-4">
            <h5 className="text-sm font-medium text-primary mb-3 flex items-center">
              <Icon name="HardDrive" size={16} className="mr-2 text-accent" />
              Export Summary
            </h5>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Files to Export:</span>
                <span className="ml-2 font-medium text-primary">
                  {processedImages?.length} {exportSettings?.includeOriginal ? `(+${processedImages?.length} originals)` : ''}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Estimated Size:</span>
                <span className="ml-2 font-medium text-primary">{getTotalFileSize()} MB</span>
              </div>
              <div>
                <span className="text-muted-foreground">Format:</span>
                <span className="ml-2 font-medium text-primary uppercase">{exportSettings?.format}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Compression:</span>
                <span className="ml-2 font-medium text-primary capitalize">{exportSettings?.compressionLevel}</span>
              </div>
            </div>
          </div>

          {/* Export Buttons */}
          <div className="space-y-3">
            {processedImages?.length === 1 ? (
              <Button
                variant="default"
                size="lg"
                fullWidth
                onClick={() => handleExport('single')}
                loading={isExporting}
                iconName="Download"
                iconPosition="left"
                className="bg-accent hover:bg-accent/90"
              >
                {isExporting ? 'Preparing Download...' : 'Download Image'}
              </Button>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => handleExport('individual')}
                  loading={isExporting}
                  iconName="Files"
                  iconPosition="left"
                >
                  Download Individual
                </Button>
                <Button
                  variant="default"
                  size="lg"
                  onClick={() => handleExport('batch')}
                  loading={isExporting}
                  iconName="Package"
                  iconPosition="left"
                  className="bg-accent hover:bg-accent/90"
                >
                  Download as ZIP
                </Button>
              </div>
            )}
            
            {/* Quick Actions */}
            <div className="flex items-center justify-center space-x-4 pt-2">
              <button
                onClick={() => handleExport('preview')}
                className="flex items-center text-sm text-muted-foreground hover:text-accent transition-colors duration-200"
              >
                <Icon name="Eye" size={16} className="mr-1" />
                Preview All
              </button>
              
              <button
                onClick={() => {/* Share functionality */}}
                className="flex items-center text-sm text-muted-foreground hover:text-accent transition-colors duration-200"
                disabled={userTier === 'free'}
              >
                <Icon name="Share2" size={16} className="mr-1" />
                Share Link {userTier === 'free' && '(Pro)'}
              </button>
              
              <button
                onClick={() => {/* Cloud save functionality */}}
                className="flex items-center text-sm text-muted-foreground hover:text-accent transition-colors duration-200"
                disabled={userTier === 'free'}
              >
                <Icon name="Cloud" size={16} className="mr-1" />
                Save to Cloud {userTier === 'free' && '(Pro)'}
              </button>
            </div>
          </div>

          {/* Security Notice */}
          <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <Icon name="Shield" size={16} className="text-accent mt-0.5" />
              <div className="text-xs text-accent">
                <p className="font-medium mb-1">Security Notice</p>
                <p>All processing happens locally in your browser. Images are automatically deleted from our servers after download. Enable "Secure Auto-Delete" for additional protection.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExportOptions;