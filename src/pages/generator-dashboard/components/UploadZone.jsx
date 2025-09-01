import React, { useState, useCallback } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const UploadZone = ({ onFileUpload, uploadedFiles, isProcessing }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e) => {
    e?.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e?.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e?.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e?.dataTransfer?.files);
    const validFiles = files?.filter(file => 
      file?.type?.startsWith('image/') && file?.size <= 10 * 1024 * 1024
    );
    if (validFiles?.length > 0) {
      onFileUpload(validFiles);
    }
  }, [onFileUpload]);

  const handleFileSelect = useCallback((e) => {
    const files = Array.from(e?.target?.files);
    const validFiles = files?.filter(file => 
      file?.type?.startsWith('image/') && file?.size <= 10 * 1024 * 1024
    );
    if (validFiles?.length > 0) {
      onFileUpload(validFiles);
    }
  }, [onFileUpload]);

  const removeFile = useCallback((index) => {
    const updatedFiles = uploadedFiles?.filter((_, i) => i !== index);
    onFileUpload(updatedFiles);
  }, [uploadedFiles, onFileUpload]);

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h3 className="text-lg font-semibold text-primary mb-4 flex items-center">
        <Icon name="Upload" size={20} className="mr-2 text-accent" />
        Upload Carrier Images
      </h3>
      {/* Upload Zone */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
          isDragOver
            ? 'border-accent bg-accent/5 scale-105' :'border-border hover:border-accent/50 hover:bg-muted/30'
        } ${isProcessing ? 'opacity-50 pointer-events-none' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={isProcessing}
        />
        
        <div className="space-y-4">
          <div className="w-16 h-16 mx-auto bg-accent/10 rounded-full flex items-center justify-center">
            <Icon name="ImagePlus" size={32} className="text-accent" />
          </div>
          
          <div>
            <p className="text-lg font-medium text-primary mb-2">
              Drop images here or click to browse
            </p>
            <p className="text-sm text-muted-foreground">
              Supports PNG, JPG, JPEG, WebP • Max 10MB per file
            </p>
          </div>
          
          <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
            <div className="flex items-center">
              <Icon name="Shield" size={14} className="mr-1 text-success" />
              Secure Processing
            </div>
            <div className="flex items-center">
              <Icon name="Zap" size={14} className="mr-1 text-warning" />
              Real-time Preview
            </div>
            <div className="flex items-center">
              <Icon name="Lock" size={14} className="mr-1 text-accent" />
              Auto-delete After Export
            </div>
          </div>
        </div>
      </div>
      {/* Uploaded Files */}
      {uploadedFiles?.length > 0 && (
        <div className="mt-6">
          <h4 className="text-sm font-medium text-primary mb-3 flex items-center">
            <Icon name="Files" size={16} className="mr-2 text-muted-foreground" />
            Uploaded Files ({uploadedFiles?.length})
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {uploadedFiles?.map((file, index) => (
              <div
                key={index}
                className="relative bg-muted/30 rounded-lg p-3 border border-border hover:border-accent/50 transition-all duration-200"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    {file?.preview ? (
                      <Image
                        src={file?.preview}
                        alt={file?.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <Icon name="Image" size={20} className="text-accent" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-primary truncate">
                      {file?.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {(file?.size / 1024 / 1024)?.toFixed(2)} MB
                    </p>
                    <div className="flex items-center mt-1">
                      <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
                      <span className="text-xs text-success">Ready</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => removeFile(index)}
                    className="p-1 text-muted-foreground hover:text-error transition-colors duration-200"
                    disabled={isProcessing}
                  >
                    <Icon name="X" size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* File Format Support */}
      <div className="mt-6 p-4 bg-muted/20 rounded-lg">
        <h5 className="text-sm font-medium text-primary mb-2">Supported Formats</h5>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          {['PNG', 'JPEG', 'JPG', 'WebP']?.map((format) => (
            <div key={format} className="flex items-center">
              <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
              <span className="text-muted-foreground">{format}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UploadZone;