import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlgorithmVisualization = () => {
  const [activeAlgorithm, setActiveAlgorithm] = useState('lsb');
  const [animationStep, setAnimationStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const algorithms = [
    {
      id: 'lsb',
      name: 'LSB Steganography',
      description: 'Least Significant Bit embedding in image pixels',
      steps: [
        'Select cover image pixels',
        'Extract LSB from each pixel',
        'Replace with secret data bits',
        'Reconstruct modified image'
      ],
      complexity: 'Low',
      security: 'Medium',
      capacity: 'High'
    },
    {
      id: 'dct',
      name: 'DCT Transform',
      description: 'Discrete Cosine Transform frequency domain embedding',
      steps: [
        'Apply DCT to image blocks',
        'Identify mid-frequency coefficients',
        'Embed data in selected coefficients',
        'Apply inverse DCT transformation'
      ],
      complexity: 'High',
      security: 'High',
      capacity: 'Medium'
    },
    {
      id: 'dwt',
      name: 'DWT Wavelet',
      description: 'Discrete Wavelet Transform multi-resolution embedding',
      steps: [
        'Decompose image using wavelets',
        'Select appropriate sub-bands',
        'Modify wavelet coefficients',
        'Reconstruct steganographic image'
      ],
      complexity: 'High',
      security: 'Very High',
      capacity: 'Low'
    }
  ];

  const currentAlgorithm = algorithms?.find(alg => alg?.id === activeAlgorithm);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setAnimationStep(prev => 
          prev >= currentAlgorithm?.steps?.length - 1 ? 0 : prev + 1
        );
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentAlgorithm]);

  const toggleAnimation = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      setAnimationStep(0);
    }
  };

  const getSecurityColor = (level) => {
    switch (level) {
      case 'Low': return 'text-warning bg-warning/10';
      case 'Medium': return 'text-accent bg-accent/10';
      case 'High': return 'text-success bg-success/10';
      case 'Very High': return 'text-green-600 bg-green-50';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getComplexityColor = (level) => {
    switch (level) {
      case 'Low': return 'text-success bg-success/10';
      case 'Medium': return 'text-accent bg-accent/10';
      case 'High': return 'text-warning bg-warning/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-brand-card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-primary mb-2">
            Algorithm Visualization
          </h3>
          <p className="text-muted-foreground">
            Interactive demonstrations of steganographic embedding processes
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={isPlaying ? "destructive" : "default"}
            size="sm"
            onClick={toggleAnimation}
            iconName={isPlaying ? "Pause" : "Play"}
            iconPosition="left"
            iconSize={16}
          >
            {isPlaying ? 'Pause' : 'Play'}
          </Button>
        </div>
      </div>
      {/* Algorithm Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {algorithms?.map((algorithm) => (
          <button
            key={algorithm?.id}
            onClick={() => {
              setActiveAlgorithm(algorithm?.id);
              setAnimationStep(0);
              setIsPlaying(false);
            }}
            className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
              activeAlgorithm === algorithm?.id
                ? 'border-accent bg-accent/5' :'border-border hover:border-accent/50 hover:bg-muted/50'
            }`}
          >
            <h4 className="font-semibold text-primary mb-2">{algorithm?.name}</h4>
            <p className="text-sm text-muted-foreground mb-3">
              {algorithm?.description}
            </p>
            <div className="flex flex-wrap gap-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getComplexityColor(algorithm?.complexity)}`}>
                {algorithm?.complexity} Complexity
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSecurityColor(algorithm?.security)}`}>
                {algorithm?.security} Security
              </span>
            </div>
          </button>
        ))}
      </div>
      {/* Visualization Area */}
      <div className="bg-muted/30 rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold text-primary">
            {currentAlgorithm?.name} Process
          </h4>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Clock" size={16} />
            <span>Step {animationStep + 1} of {currentAlgorithm?.steps?.length}</span>
          </div>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {currentAlgorithm?.steps?.map((step, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border-2 transition-all duration-500 ${
                index === animationStep && isPlaying
                  ? 'border-accent bg-accent/10 scale-105'
                  : index <= animationStep
                  ? 'border-success bg-success/5' :'border-border bg-background'
              }`}
            >
              <div className="flex items-center space-x-2 mb-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  index === animationStep && isPlaying
                    ? 'bg-accent text-accent-foreground'
                    : index <= animationStep
                    ? 'bg-success text-success-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {index + 1}
                </div>
                {index === animationStep && isPlaying && (
                  <Icon name="Zap" size={16} className="text-accent animate-pulse" />
                )}
              </div>
              <p className="text-sm font-medium text-primary">{step}</p>
            </div>
          ))}
        </div>

        {/* Visual Representation */}
        <div className="bg-background rounded-lg p-6 border border-border">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Original Image */}
            <div className="text-center">
              <h5 className="font-medium text-primary mb-3">Original Image</h5>
              <div className="w-full h-32 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center border border-border">
                <Icon name="Image" size={32} className="text-blue-500" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">Cover image data</p>
            </div>

            {/* Processing */}
            <div className="text-center">
              <h5 className="font-medium text-primary mb-3">Processing</h5>
              <div className="w-full h-32 bg-gradient-to-br from-accent/20 to-accent/40 rounded-lg flex items-center justify-center border border-accent/30 relative overflow-hidden">
                <Icon name="Cpu" size={32} className="text-accent" />
                {isPlaying && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {currentAlgorithm?.steps?.[animationStep]}
              </p>
            </div>

            {/* Steganographic Result */}
            <div className="text-center">
              <h5 className="font-medium text-primary mb-3">Steganographic Image</h5>
              <div className="w-full h-32 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center border border-border relative">
                <Icon name="Shield" size={32} className="text-green-600" />
                {animationStep === currentAlgorithm?.steps?.length - 1 && isPlaying && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full animate-pulse"></div>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-2">Hidden data embedded</p>
            </div>
          </div>
        </div>
      </div>
      {/* Algorithm Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-background rounded-lg p-4 border border-border">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Zap" size={16} className="text-warning" />
            <span className="font-medium text-primary">Complexity</span>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getComplexityColor(currentAlgorithm?.complexity)}`}>
            {currentAlgorithm?.complexity}
          </span>
        </div>

        <div className="bg-background rounded-lg p-4 border border-border">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Shield" size={16} className="text-success" />
            <span className="font-medium text-primary">Security Level</span>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSecurityColor(currentAlgorithm?.security)}`}>
            {currentAlgorithm?.security}
          </span>
        </div>

        <div className="bg-background rounded-lg p-4 border border-border">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Database" size={16} className="text-accent" />
            <span className="font-medium text-primary">Data Capacity</span>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            currentAlgorithm?.capacity === 'High' ? 'text-success bg-success/10' :
            currentAlgorithm?.capacity === 'Medium'? 'text-accent bg-accent/10' : 'text-warning bg-warning/10'
          }`}>
            {currentAlgorithm?.capacity}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmVisualization;