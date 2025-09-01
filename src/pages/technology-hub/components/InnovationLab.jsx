import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InnovationLab = () => {
  const [selectedFeature, setSelectedFeature] = useState('ai-optimization');

  const experimentalFeatures = [
    {
      id: 'ai-optimization',
      name: 'AI-Powered Embedding Optimization',
      status: 'beta',
      description: 'Machine learning algorithms that automatically select optimal embedding parameters based on image characteristics',
      progress: 85,
      estimatedRelease: '2024-12-15',
      benefits: [
        '40% better detection resistance',
        'Automatic parameter tuning',
        'Adaptive capacity optimization',
        'Real-time quality assessment'
      ],
      technicalDetails: `Our AI optimization system uses a deep neural network trained on over 100,000 images to predict the best embedding parameters for any given cover image. The system analyzes texture complexity, color distribution, and edge density to determine optimal bit allocation and embedding locations.`,
      participants: 1247,
      feedback: 4.6
    },
    {
      id: 'quantum-encryption',
      name: 'Quantum-Resistant Encryption',
      status: 'alpha',
      description: 'Post-quantum cryptographic methods integrated with steganographic embedding for future-proof security',
      progress: 60,
      estimatedRelease: '2025-06-30',
      benefits: [
        'Quantum computer resistance',
        'NIST-approved algorithms',
        'Hybrid encryption schemes',
        'Forward secrecy protection'
      ],
      technicalDetails: `Implementation of lattice-based cryptography and hash-based signatures within steganographic workflows. Our approach combines CRYSTALS-Kyber for key encapsulation with CRYSTALS-Dilithium for digital signatures, ensuring long-term security against quantum attacks.`,
      participants: 892,
      feedback: 4.3
    },
    {
      id: 'blockchain-verification',
      name: 'Blockchain Integrity Verification',
      status: 'research',
      description: 'Decentralized verification system for steganographic content authenticity using blockchain technology',
      progress: 35,
      estimatedRelease: '2025-09-15',
      benefits: [
        'Tamper-proof verification',
        'Decentralized trust model',
        'Immutable audit trails',
        'Smart contract automation'
      ],
      technicalDetails: `A distributed ledger system that records cryptographic hashes of steganographic content, enabling verification of authenticity and integrity without revealing the hidden data. Smart contracts automate verification processes and maintain provenance records.`,
      participants: 456,
      feedback: 4.1
    },
    {
      id: 'neural-steganalysis',
      name: 'Neural Steganalysis Defense',
      status: 'concept',
      description: 'Advanced neural networks designed to create steganographic content that evades AI-based detection systems',
      progress: 20,
      estimatedRelease: '2026-03-01',
      benefits: [
        'AI detection evasion',
        'Adversarial training methods',
        'Dynamic adaptation',
        'Multi-layer defense'
      ],
      technicalDetails: `Generative adversarial networks (GANs) that create steganographic content specifically designed to fool modern steganalysis tools. The system continuously adapts to new detection methods through adversarial training and reinforcement learning.`,
      participants: 234,
      feedback: 4.0
    }
  ];

  const currentFeature = experimentalFeatures?.find(f => f?.id === selectedFeature);

  const getStatusColor = (status) => {
    switch (status) {
      case 'beta': return 'text-success bg-success/10';
      case 'alpha': return 'text-accent bg-accent/10';
      case 'research': return 'text-warning bg-warning/10';
      case 'concept': return 'text-purple-600 bg-purple-50';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-success';
    if (progress >= 60) return 'bg-accent';
    if (progress >= 40) return 'bg-warning';
    return 'bg-muted-foreground';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-brand-card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-primary mb-2 flex items-center">
            <Icon name="Beaker" size={24} className="text-accent mr-2" />
            Innovation Lab
          </h3>
          <p className="text-muted-foreground">
            Experimental features and cutting-edge research in development
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" iconName="Users" iconPosition="left" iconSize={16}>
            Join Beta
          </Button>
          <Button variant="default" size="sm" iconName="Lightbulb" iconPosition="left" iconSize={16}>
            Submit Idea
          </Button>
        </div>
      </div>
      {/* Feature Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {experimentalFeatures?.map((feature) => (
          <button
            key={feature?.id}
            onClick={() => setSelectedFeature(feature?.id)}
            className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
              selectedFeature === feature?.id
                ? 'border-accent bg-accent/5' :'border-border hover:border-accent/50 hover:bg-muted/50'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(feature?.status)}`}>
                {feature?.status?.toUpperCase()}
              </span>
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <Icon name="Star" size={12} />
                <span>{feature?.feedback}</span>
              </div>
            </div>
            <h4 className="font-semibold text-primary mb-2 text-sm">{feature?.name}</h4>
            <div className="mb-3">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                <span>Progress</span>
                <span>{feature?.progress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(feature?.progress)}`}
                  style={{ width: `${feature?.progress}%` }}
                ></div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground line-clamp-2">
              {feature?.description}
            </p>
          </button>
        ))}
      </div>
      {/* Feature Details */}
      <div className="bg-background rounded-lg border border-border p-6">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-3">
              <h4 className="text-xl font-semibold text-primary">
                {currentFeature?.name}
              </h4>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(currentFeature?.status)}`}>
                {currentFeature?.status?.toUpperCase()}
              </span>
            </div>
            <p className="text-muted-foreground mb-4">
              {currentFeature?.description}
            </p>
          </div>
          
          <div className="flex flex-col items-end space-y-2 mt-4 lg:mt-0">
            <div className="text-right">
              <p className="text-sm font-medium text-primary">Estimated Release</p>
              <p className="text-sm text-muted-foreground">
                {new Date(currentFeature.estimatedRelease)?.toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span className="flex items-center">
                <Icon name="Users" size={16} className="mr-1" />
                {currentFeature?.participants?.toLocaleString()} participants
              </span>
              <span className="flex items-center">
                <Icon name="Star" size={16} className="mr-1" />
                {currentFeature?.feedback}/5.0
              </span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <span>Development Progress</span>
            <span>{currentFeature?.progress}% Complete</span>
          </div>
          <div className="w-full bg-muted rounded-full h-3">
            <div 
              className={`h-3 rounded-full transition-all duration-500 ${getProgressColor(currentFeature?.progress)}`}
              style={{ width: `${currentFeature?.progress}%` }}
            ></div>
          </div>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div>
            <h5 className="text-lg font-semibold text-primary mb-4">Key Benefits</h5>
            <div className="space-y-3">
              {currentFeature?.benefits?.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-success rounded-full flex-shrink-0"></div>
                  <span className="text-muted-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h5 className="text-lg font-semibold text-primary mb-4">Technical Overview</h5>
            <p className="text-muted-foreground leading-relaxed">
              {currentFeature?.technicalDetails}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-border">
          <Button 
            variant="default" 
            iconName="TestTube" 
            iconPosition="left" 
            iconSize={16}
            className="flex-1 sm:flex-none"
          >
            Join Beta Testing
          </Button>
          <Button 
            variant="outline" 
            iconName="MessageCircle" 
            iconPosition="left" 
            iconSize={16}
            className="flex-1 sm:flex-none"
          >
            Provide Feedback
          </Button>
          <Button 
            variant="ghost" 
            iconName="FileText" 
            iconPosition="left" 
            iconSize={16}
            className="flex-1 sm:flex-none"
          >
            Technical Specs
          </Button>
          <Button 
            variant="ghost" 
            iconName="Share" 
            iconPosition="left" 
            iconSize={16}
            className="flex-1 sm:flex-none"
          >
            Share
          </Button>
        </div>
      </div>
      {/* Beta Program Info */}
      <div className="mt-6 bg-accent/5 border border-accent/20 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-accent flex-shrink-0 mt-0.5" />
          <div>
            <h5 className="font-semibold text-primary mb-2">Join Our Beta Program</h5>
            <p className="text-muted-foreground mb-4">
              Get early access to experimental features and help shape the future of steganographic technology. 
              Beta participants receive priority support, exclusive documentation, and direct communication with our research team.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium">
                Early Access
              </span>
              <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium">
                Priority Support
              </span>
              <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium">
                Research Collaboration
              </span>
              <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium">
                Exclusive Updates
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InnovationLab;