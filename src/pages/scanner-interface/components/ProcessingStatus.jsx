import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProcessingStatus = ({ isProcessing, currentFile, progress, onCancel }) => {
  const [processingStage, setProcessingStage] = useState('initializing');
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState(null);

  const processingStages = [
    { id: 'initializing', label: 'Initializing Scanner', icon: 'Settings' },
    { id: 'analyzing', label: 'Analyzing Image Structure', icon: 'Search' },
    { id: 'detecting', label: 'Detecting Steganographic Patterns', icon: 'Zap' },
    { id: 'extracting', label: 'Extracting Hidden Data', icon: 'Download' },
    { id: 'verifying', label: 'Verifying Data Integrity', icon: 'Shield' },
    { id: 'finalizing', label: 'Finalizing Results', icon: 'CheckCircle' }
  ];

  useEffect(() => {
    let interval;
    if (isProcessing) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
      
      // Simulate processing stages
      const stageInterval = setInterval(() => {
        setProcessingStage(prev => {
          const currentIndex = processingStages?.findIndex(stage => stage?.id === prev);
          if (currentIndex < processingStages?.length - 1) {
            return processingStages?.[currentIndex + 1]?.id;
          }
          return prev;
        });
      }, 2000);

      return () => {
        clearInterval(interval);
        clearInterval(stageInterval);
      };
    } else {
      setTimeElapsed(0);
      setProcessingStage('initializing');
    }
  }, [isProcessing]);

  useEffect(() => {
    if (progress > 0 && timeElapsed > 0) {
      const rate = progress / timeElapsed;
      const remaining = (100 - progress) / rate;
      setEstimatedTime(Math.ceil(remaining));
    }
  }, [progress, timeElapsed]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const getCurrentStage = () => {
    return processingStages?.find(stage => stage?.id === processingStage) || processingStages?.[0];
  };

  if (!isProcessing) {
    return null;
  }

  return (
    <div className="bg-card rounded-lg border border-border shadow-brand-card">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
              <Icon name="Cpu" size={20} className="text-accent animate-pulse" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-primary">Processing Scan</h3>
              <p className="text-sm text-muted-foreground">
                {currentFile ? `Analyzing ${currentFile}` : 'Preparing scan operation'}
              </p>
            </div>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onCancel}
            iconName="X"
            iconPosition="left"
          >
            Cancel
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-primary">Overall Progress</span>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-accent h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Current Stage */}
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
              <Icon name={getCurrentStage()?.icon} size={16} className="text-accent" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-primary">{getCurrentStage()?.label}</h4>
              <p className="text-xs text-muted-foreground">
                Step {processingStages?.findIndex(s => s?.id === processingStage) + 1} of {processingStages?.length}
              </p>
            </div>
          </div>

          {/* Stage Progress */}
          <div className="space-y-2">
            {processingStages?.map((stage, index) => {
              const currentIndex = processingStages?.findIndex(s => s?.id === processingStage);
              const isCompleted = index < currentIndex;
              const isCurrent = index === currentIndex;
              const isPending = index > currentIndex;

              return (
                <div key={stage?.id} className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isCompleted 
                      ? 'bg-success text-success-foreground' 
                      : isCurrent 
                        ? 'bg-accent text-accent-foreground animate-pulse' 
                        : 'bg-muted text-muted-foreground'
                  }`}>
                    {isCompleted ? (
                      <Icon name="Check" size={12} />
                    ) : (
                      <Icon name={stage?.icon} size={12} />
                    )}
                  </div>
                  <span className={`text-sm transition-colors duration-300 ${
                    isCompleted 
                      ? 'text-success font-medium' 
                      : isCurrent 
                        ? 'text-primary font-medium' :'text-muted-foreground'
                  }`}>
                    {stage?.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Processing Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted/30 rounded-lg">
          <div className="text-center">
            <div className="text-lg font-semibold text-primary">
              {formatTime(timeElapsed)}
            </div>
            <div className="text-xs text-muted-foreground">Elapsed</div>
          </div>
          
          <div className="text-center">
            <div className="text-lg font-semibold text-primary">
              {estimatedTime ? formatTime(estimatedTime) : '--:--'}
            </div>
            <div className="text-xs text-muted-foreground">Remaining</div>
          </div>
          
          <div className="text-center">
            <div className="text-lg font-semibold text-primary">
              {processingStage === 'detecting' ? 'LSB' : 
               processingStage === 'extracting' ? 'DCT' : 'Auto'}
            </div>
            <div className="text-xs text-muted-foreground">Algorithm</div>
          </div>
          
          <div className="text-center">
            <div className="text-lg font-semibold text-primary">
              {processingStage === 'extracting' ? '2.4 KB' : 
               processingStage === 'verifying' ? '2.4 KB' : '--'}
            </div>
            <div className="text-xs text-muted-foreground">Data Found</div>
          </div>
        </div>

        {/* Live Processing Indicators */}
        <div className="mt-4 flex items-center justify-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
            <span>Scanning pixels</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <span>Analyzing patterns</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-warning rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            <span>Extracting data</span>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 p-3 bg-accent/5 border border-accent/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={14} className="text-accent" />
            <span className="text-xs text-accent font-medium">
              All processing is performed locally on your device for maximum security
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessingStatus;