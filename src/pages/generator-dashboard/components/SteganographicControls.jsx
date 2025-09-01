import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const SteganographicControls = ({ 
  settings, 
  onSettingsChange, 
  userTier = 'free',
  isProcessing 
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const encryptionOptions = [
    { value: '128', label: '128-bit AES (Fast)', description: 'Standard encryption for most use cases' },
    { value: '192', label: '192-bit AES (Balanced)', description: 'Enhanced security with good performance' },
    { value: '256', label: '256-bit AES (Maximum)', description: 'Military-grade encryption' }
  ];

  const algorithmOptions = userTier === 'enterprise' ? [
    { value: 'lsb', label: 'LSB (Least Significant Bit)', description: 'Fast, good for large payloads' },
    { value: 'dct', label: 'DCT (Discrete Cosine Transform)', description: 'Robust against compression' },
    { value: 'dwt', label: 'DWT (Discrete Wavelet Transform)', description: 'Advanced, compression resistant' },
    { value: 'custom', label: 'Custom Algorithm', description: 'Enterprise-only proprietary method' }
  ] : [
    { value: 'lsb', label: 'LSB (Least Significant Bit)', description: 'Standard steganographic method' },
    { value: 'dct', label: 'DCT (Discrete Cosine Transform)', description: 'Upgrade for advanced algorithms' }
  ];

  const compressionOptions = [
    { value: 'none', label: 'No Compression', description: 'Fastest processing' },
    { value: 'low', label: 'Low Compression', description: 'Slight size reduction' },
    { value: 'medium', label: 'Medium Compression', description: 'Balanced size/quality' },
    { value: 'high', label: 'High Compression', description: 'Maximum size reduction' }
  ];

  const handleInputChange = (field, value) => {
    onSettingsChange({
      ...settings,
      [field]: value
    });
  };

  const generateRandomKey = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let result = '';
    for (let i = 0; i < 32; i++) {
      result += chars?.charAt(Math.floor(Math.random() * chars?.length));
    }
    handleInputChange('encryptionKey', result);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-primary flex items-center">
          <Icon name="Settings" size={20} className="mr-2 text-accent" />
          Steganographic Controls
        </h3>
        {userTier !== 'enterprise' && (
          <div className="px-2 py-1 bg-warning/10 text-warning text-xs rounded-full">
            {userTier === 'free' ? 'Free Tier' : 'Pro Tier'}
          </div>
        )}
      </div>
      <div className="space-y-6">
        {/* Data Input */}
        <div>
          <Input
            label="Hidden Data"
            type="text"
            placeholder="Enter the data you want to hide..."
            value={settings?.hiddenData || ''}
            onChange={(e) => handleInputChange('hiddenData', e?.target?.value)}
            description={`${(settings?.hiddenData || '')?.length}/1000 characters`}
            disabled={isProcessing}
            className="font-mono"
          />
          <div className="mt-2 flex items-center text-xs text-muted-foreground">
            <Icon name="Info" size={14} className="mr-1" />
            Data will be encrypted before embedding
          </div>
        </div>

        {/* Encryption Strength */}
        <div>
          <Select
            label="Encryption Strength"
            options={encryptionOptions}
            value={settings?.encryptionStrength || '128'}
            onChange={(value) => handleInputChange('encryptionStrength', value)}
            disabled={isProcessing}
            description="Higher encryption provides better security but slower processing"
          />
        </div>

        {/* Encryption Key */}
        <div>
          <div className="flex items-center space-x-2">
            <div className="flex-1">
              <Input
                label="Encryption Key"
                type="password"
                placeholder="Enter custom key or generate random"
                value={settings?.encryptionKey || ''}
                onChange={(e) => handleInputChange('encryptionKey', e?.target?.value)}
                disabled={isProcessing}
                className="font-mono"
              />
            </div>
            <button
              onClick={generateRandomKey}
              disabled={isProcessing}
              className="mt-6 p-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors duration-200 disabled:opacity-50"
              title="Generate Random Key"
            >
              <Icon name="Shuffle" size={16} />
            </button>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Key strength: {settings?.encryptionKey?.length > 20 ? 'Strong' : settings?.encryptionKey?.length > 10 ? 'Medium' : 'Weak'}</span>
            <div className="flex items-center">
              <div className={`w-2 h-2 rounded-full mr-1 ${
                settings?.encryptionKey?.length > 20 ? 'bg-success' : 
                settings?.encryptionKey?.length > 10 ? 'bg-warning' : 'bg-error'
              }`}></div>
              <span className="text-muted-foreground">
                {settings?.encryptionKey?.length || 0}/32 chars
              </span>
            </div>
          </div>
        </div>

        {/* Algorithm Selection */}
        <div>
          <Select
            label="Steganographic Algorithm"
            options={algorithmOptions}
            value={settings?.algorithm || 'lsb'}
            onChange={(value) => handleInputChange('algorithm', value)}
            disabled={isProcessing}
            description={userTier !== 'enterprise' ? 'Upgrade to Enterprise for advanced algorithms' : 'Choose the embedding method'}
          />
          {userTier !== 'enterprise' && settings?.algorithm === 'custom' && (
            <div className="mt-2 p-3 bg-warning/10 border border-warning/20 rounded-lg">
              <div className="flex items-center text-warning text-sm">
                <Icon name="Lock" size={16} className="mr-2" />
                Custom algorithms require Enterprise subscription
              </div>
            </div>
          )}
        </div>

        {/* Advanced Options Toggle */}
        <div className="border-t border-border pt-4">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center text-sm font-medium text-primary hover:text-accent transition-colors duration-200"
          >
            <Icon 
              name={showAdvanced ? "ChevronDown" : "ChevronRight"} 
              size={16} 
              className="mr-2" 
            />
            Advanced Options
          </button>
        </div>

        {/* Advanced Options */}
        {showAdvanced && (
          <div className="space-y-4 pl-6 border-l-2 border-accent/20">
            {/* Payload Compression */}
            <Select
              label="Payload Compression"
              options={compressionOptions}
              value={settings?.compression || 'none'}
              onChange={(value) => handleInputChange('compression', value)}
              disabled={isProcessing}
              description="Compress data before embedding to save space"
            />

            {/* Redundancy Level */}
            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Error Correction Level: {settings?.redundancy || 1}x
              </label>
              <input
                type="range"
                min="1"
                max="5"
                value={settings?.redundancy || 1}
                onChange={(e) => handleInputChange('redundancy', parseInt(e?.target?.value))}
                disabled={isProcessing}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Fast</span>
                <span>Balanced</span>
                <span>Robust</span>
              </div>
            </div>

            {/* Additional Options */}
            <div className="space-y-3">
              <Checkbox
                label="Preserve Original Metadata"
                checked={settings?.preserveMetadata || false}
                onChange={(e) => handleInputChange('preserveMetadata', e?.target?.checked)}
                disabled={isProcessing}
                description="Keep EXIF data and other image metadata"
              />
              
              <Checkbox
                label="Add Verification Hash"
                checked={settings?.addHash || false}
                onChange={(e) => handleInputChange('addHash', e?.target?.checked)}
                disabled={isProcessing}
                description="Include integrity verification for embedded data"
              />
              
              {userTier === 'enterprise' && (
                <Checkbox
                  label="Use Custom Seed Pattern"
                  checked={settings?.customSeed || false}
                  onChange={(e) => handleInputChange('customSeed', e?.target?.checked)}
                  disabled={isProcessing}
                  description="Enterprise-only: Use proprietary embedding pattern"
                />
              )}
            </div>
          </div>
        )}

        {/* Capacity Estimation */}
        <div className="bg-muted/20 rounded-lg p-4">
          <h5 className="text-sm font-medium text-primary mb-2 flex items-center">
            <Icon name="BarChart3" size={16} className="mr-2 text-accent" />
            Capacity Estimation
          </h5>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-muted-foreground">Max Payload:</span>
              <span className="ml-2 font-mono text-primary">2.4 KB</span>
            </div>
            <div>
              <span className="text-muted-foreground">Current Usage:</span>
              <span className="ml-2 font-mono text-primary">
                {((settings?.hiddenData || '')?.length / 1024)?.toFixed(2)} KB
              </span>
            </div>
          </div>
          <div className="mt-2">
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-accent h-2 rounded-full transition-all duration-300"
                style={{ 
                  width: `${Math.min(((settings?.hiddenData || '')?.length / 2400) * 100, 100)}%` 
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SteganographicControls;