import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ProcessingOptions = ({ onOptionsChange, isProcessing }) => {
  const [options, setOptions] = useState({
    sensitivity: 'medium',
    algorithm: 'auto',
    batchMode: false,
    forensicAnalysis: false,
    metadataExtraction: true,
    chainOfCustody: false,
    verifyIntegrity: true
  });

  const sensitivityOptions = [
    { value: 'low', label: 'Low Sensitivity', description: 'Detect strong embeddings only' },
    { value: 'medium', label: 'Medium Sensitivity', description: 'Balanced detection (recommended)' },
    { value: 'high', label: 'High Sensitivity', description: 'Detect weak embeddings' },
    { value: 'maximum', label: 'Maximum Sensitivity', description: 'Detect all possible embeddings' }
  ];

  const algorithmOptions = [
    { value: 'auto', label: 'Auto-Detect', description: 'Automatically identify method' },
    { value: 'lsb', label: 'LSB Steganography', description: 'Least Significant Bit method' },
    { value: 'dct', label: 'DCT Transform', description: 'Discrete Cosine Transform' },
    { value: 'dwt', label: 'DWT Wavelet', description: 'Discrete Wavelet Transform' },
    { value: 'spread', label: 'Spread Spectrum', description: 'Frequency domain hiding' },
    { value: 'custom', label: 'Custom Algorithm', description: 'User-defined detection' }
  ];

  const handleOptionChange = (key, value) => {
    const newOptions = { ...options, [key]: value };
    setOptions(newOptions);
    onOptionsChange(newOptions);
  };

  const resetToDefaults = () => {
    const defaultOptions = {
      sensitivity: 'medium',
      algorithm: 'auto',
      batchMode: false,
      forensicAnalysis: false,
      metadataExtraction: true,
      chainOfCustody: false,
      verifyIntegrity: true
    };
    setOptions(defaultOptions);
    onOptionsChange(defaultOptions);
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-brand-card">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Settings" size={20} className="text-accent" />
          <h3 className="text-lg font-semibold text-primary">Processing Options</h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={resetToDefaults}
          disabled={isProcessing}
          iconName="RotateCcw"
          iconPosition="left"
        >
          Reset
        </Button>
      </div>
      <div className="p-4 space-y-6">
        {/* Detection Settings */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-primary flex items-center space-x-2">
            <Icon name="Search" size={16} className="text-accent" />
            <span>Detection Settings</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Sensitivity Level"
              description="Higher sensitivity may produce false positives"
              options={sensitivityOptions}
              value={options?.sensitivity}
              onChange={(value) => handleOptionChange('sensitivity', value)}
              disabled={isProcessing}
            />

            <Select
              label="Algorithm Detection"
              description="Choose specific method or auto-detect"
              options={algorithmOptions}
              value={options?.algorithm}
              onChange={(value) => handleOptionChange('algorithm', value)}
              disabled={isProcessing}
            />
          </div>
        </div>

        {/* Processing Features */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-primary flex items-center space-x-2">
            <Icon name="Cpu" size={16} className="text-accent" />
            <span>Processing Features</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <Checkbox
                label="Batch Processing"
                description="Process multiple images simultaneously"
                checked={options?.batchMode}
                onChange={(e) => handleOptionChange('batchMode', e?.target?.checked)}
                disabled={isProcessing}
              />

              <Checkbox
                label="Metadata Extraction"
                description="Extract EXIF and technical metadata"
                checked={options?.metadataExtraction}
                onChange={(e) => handleOptionChange('metadataExtraction', e?.target?.checked)}
                disabled={isProcessing}
              />

              <Checkbox
                label="Verify Data Integrity"
                description="Cryptographic signature verification"
                checked={options?.verifyIntegrity}
                onChange={(e) => handleOptionChange('verifyIntegrity', e?.target?.checked)}
                disabled={isProcessing}
              />
            </div>

            <div className="space-y-3">
              <Checkbox
                label="Forensic Analysis"
                description="Advanced analysis for legal compliance"
                checked={options?.forensicAnalysis}
                onChange={(e) => handleOptionChange('forensicAnalysis', e?.target?.checked)}
                disabled={isProcessing}
              />

              <Checkbox
                label="Chain of Custody"
                description="Legal tracking and documentation"
                checked={options?.chainOfCustody}
                onChange={(e) => handleOptionChange('chainOfCustody', e?.target?.checked)}
                disabled={isProcessing}
              />
            </div>
          </div>
        </div>

        {/* Advanced Options */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-primary flex items-center space-x-2">
            <Icon name="Zap" size={16} className="text-accent" />
            <span>Advanced Options</span>
          </h4>

          <div className="bg-muted/50 rounded-lg p-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <div className="text-lg font-semibold text-primary">
                  {options?.sensitivity === 'low' ? '1-2' : 
                   options?.sensitivity === 'medium' ? '2-4' :
                   options?.sensitivity === 'high' ? '4-8' : '8-16'}
                </div>
                <div className="text-muted-foreground">Detection Layers</div>
              </div>
              
              <div className="text-center">
                <div className="text-lg font-semibold text-primary">
                  {options?.algorithm === 'auto' ? 'All' : '1'}
                </div>
                <div className="text-muted-foreground">Algorithms</div>
              </div>
              
              <div className="text-center">
                <div className="text-lg font-semibold text-primary">
                  {options?.batchMode ? '∞' : '1'}
                </div>
                <div className="text-muted-foreground">Max Files</div>
              </div>
              
              <div className="text-center">
                <div className="text-lg font-semibold text-primary">
                  {options?.forensicAnalysis ? 'Full' : 'Basic'}
                </div>
                <div className="text-muted-foreground">Analysis</div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Shield" size={16} className="text-accent mt-0.5" />
            <div className="text-sm">
              <div className="font-medium text-primary mb-1">Security Notice</div>
              <div className="text-muted-foreground">
                All processing is performed locally on your device. No data is transmitted to external servers during scanning operations.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessingOptions;