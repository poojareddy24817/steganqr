import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const TutorialSidebar = ({ currentStep = 0, onStepChange, isVisible = true, onToggle }) => {
  const [expandedSection, setExpandedSection] = useState(0);

  const tutorialSteps = [
    {
      id: 0,
      title: "Upload Your Images",
      description: "Start by uploading the carrier images that will hide your secret data",
      icon: "Upload",
      tips: [
        "Use high-resolution images for better capacity",
        "PNG format preserves quality best",
        "Avoid heavily compressed images",
        "Multiple images can be processed in batch"
      ],
      videoUrl: "/tutorials/upload-demo.mp4"
    },
    {
      id: 1,
      title: "Configure Steganography",
      description: "Set up encryption and embedding parameters for your hidden data",
      icon: "Settings",
      tips: [
        "Stronger encryption takes longer to process",
        "LSB algorithm works well for most images",
        "Use random keys for maximum security",
        "Higher redundancy improves error correction"
      ],
      videoUrl: "/tutorials/config-demo.mp4"
    },
    {
      id: 2,
      title: "Preview & Verify",
      description: "Review the processed images and verify embedding quality",
      icon: "Eye",
      tips: [
        "Use split view to compare quality",
        "Toggle overlay to see embedding regions",
        "Zoom in to inspect pixel changes",
        "Check capacity utilization"
      ],
      videoUrl: "/tutorials/preview-demo.mp4"
    },
    {
      id: 3,
      title: "Export Results",
      description: "Download your steganographic images with custom settings",
      icon: "Download",
      tips: [
        "PNG maintains steganographic integrity",
        "Preserve metadata for authenticity",
        "Use batch download for multiple files",
        "Enable secure auto-delete for privacy"
      ],
      videoUrl: "/tutorials/export-demo.mp4"
    }
  ];

  const advancedTips = [
    {
      title: "Security Best Practices",
      icon: "Shield",
      content: [
        "Always use strong, unique encryption keys",
        "Test extraction before sharing images",
        "Consider using multiple carrier images",
        "Keep backup of original encryption keys"
      ]
    },
    {
      title: "Quality Optimization",
      icon: "Zap",
      content: [
        "Choose appropriate algorithm for image type",
        "Balance payload size with image quality",
        "Use error correction for critical data",
        "Test with different compression levels"
      ]
    },
    {
      title: "Troubleshooting",
      icon: "AlertCircle",
      content: [
        "Large payloads may affect image quality",
        "Some formats don't support all algorithms",
        "Processing time increases with file size",
        "Browser memory limits affect batch size"
      ]
    }
  ];

  if (!isVisible) {
    return (
      <button
        onClick={onToggle}
        className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50 p-3 bg-accent text-accent-foreground rounded-l-lg shadow-lg hover:bg-accent/90 transition-all duration-200"
        title="Show Tutorial"
      >
        <Icon name="HelpCircle" size={20} />
      </button>
    );
  }

  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-card border-l border-border shadow-xl z-40 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-card border-b border-border p-4 z-10">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-primary flex items-center">
            <Icon name="BookOpen" size={20} className="mr-2 text-accent" />
            Tutorial Guide
          </h3>
          <button
            onClick={onToggle}
            className="p-2 text-muted-foreground hover:text-primary transition-colors duration-200"
            title="Hide Tutorial"
          >
            <Icon name="X" size={18} />
          </button>
        </div>
      </div>
      {/* Progress Indicator */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-primary">Progress</span>
          <span className="text-sm text-muted-foreground">
            {currentStep + 1} of {tutorialSteps?.length}
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-accent h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / tutorialSteps?.length) * 100}%` }}
          ></div>
        </div>
      </div>
      {/* Tutorial Steps */}
      <div className="p-4 space-y-4">
        {tutorialSteps?.map((step, index) => (
          <div
            key={step?.id}
            className={`border rounded-lg transition-all duration-200 ${
              index === currentStep
                ? 'border-accent bg-accent/5'
                : index < currentStep
                ? 'border-success bg-success/5' :'border-border'
            }`}
          >
            <button
              onClick={() => {
                onStepChange(index);
                setExpandedSection(expandedSection === index ? -1 : index);
              }}
              className="w-full p-4 text-left flex items-center justify-between hover:bg-muted/30 transition-colors duration-200"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  index === currentStep
                    ? 'bg-accent text-accent-foreground'
                    : index < currentStep
                    ? 'bg-success text-success-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {index < currentStep ? (
                    <Icon name="Check" size={16} />
                  ) : (
                    <Icon name={step?.icon} size={16} />
                  )}
                </div>
                <div>
                  <h4 className="font-medium text-primary">{step?.title}</h4>
                  <p className="text-sm text-muted-foreground">{step?.description}</p>
                </div>
              </div>
              <Icon 
                name={expandedSection === index ? "ChevronUp" : "ChevronDown"} 
                size={16} 
                className="text-muted-foreground" 
              />
            </button>

            {expandedSection === index && (
              <div className="px-4 pb-4 space-y-3">
                {/* Tips */}
                <div>
                  <h5 className="text-sm font-medium text-primary mb-2 flex items-center">
                    <Icon name="Lightbulb" size={14} className="mr-1 text-warning" />
                    Tips
                  </h5>
                  <ul className="space-y-1">
                    {step?.tips?.map((tip, tipIndex) => (
                      <li key={tipIndex} className="text-xs text-muted-foreground flex items-start">
                        <div className="w-1 h-1 bg-accent rounded-full mt-2 mr-2 flex-shrink-0"></div>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Video Demo */}
                <div className="bg-muted/20 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-primary">Video Demo</span>
                    <Icon name="Play" size={14} className="text-accent" />
                  </div>
                  <div className="w-full h-20 bg-muted rounded flex items-center justify-center">
                    <Icon name="Video" size={24} className="text-muted-foreground" />
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Advanced Tips */}
      <div className="p-4 border-t border-border">
        <h4 className="text-sm font-medium text-primary mb-3 flex items-center">
          <Icon name="Zap" size={16} className="mr-2 text-accent" />
          Advanced Tips
        </h4>
        
        <div className="space-y-3">
          {advancedTips?.map((tip, index) => (
            <div key={index} className="bg-muted/20 rounded-lg p-3">
              <h5 className="text-sm font-medium text-primary mb-2 flex items-center">
                <Icon name={tip?.icon} size={14} className="mr-2 text-accent" />
                {tip?.title}
              </h5>
              <ul className="space-y-1">
                {tip?.content?.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-xs text-muted-foreground flex items-start">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full mt-2 mr-2 flex-shrink-0"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      {/* Help Links */}
      <div className="p-4 border-t border-border">
        <h4 className="text-sm font-medium text-primary mb-3">Need More Help?</h4>
        <div className="space-y-2">
          <a
            href="/documentation"
            className="flex items-center text-sm text-accent hover:text-accent/80 transition-colors duration-200"
          >
            <Icon name="FileText" size={14} className="mr-2" />
            Full Documentation
          </a>
          <a
            href="/community"
            className="flex items-center text-sm text-accent hover:text-accent/80 transition-colors duration-200"
          >
            <Icon name="Users" size={14} className="mr-2" />
            Community Forum
          </a>
          <a
            href="/support"
            className="flex items-center text-sm text-accent hover:text-accent/80 transition-colors duration-200"
          >
            <Icon name="MessageCircle" size={14} className="mr-2" />
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default TutorialSidebar;