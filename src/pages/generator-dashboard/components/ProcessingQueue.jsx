import React from 'react';
import Icon from '../../../components/AppIcon';

const ProcessingQueue = ({ 
  queueItems = [], 
  onRemoveItem, 
  onRetryItem, 
  onClearCompleted 
}) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return { name: 'Clock', color: 'text-muted-foreground' };
      case 'processing':
        return { name: 'Loader2', color: 'text-accent animate-spin' };
      case 'completed':
        return { name: 'CheckCircle', color: 'text-success' };
      case 'error':
        return { name: 'XCircle', color: 'text-error' };
      default:
        return { name: 'Circle', color: 'text-muted-foreground' };
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-muted';
      case 'processing':
        return 'bg-accent';
      case 'completed':
        return 'bg-success';
      case 'error':
        return 'bg-error';
      default:
        return 'bg-muted';
    }
  };

  const formatTime = (seconds) => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const completedCount = queueItems?.filter(item => item?.status === 'completed')?.length;
  const processingCount = queueItems?.filter(item => item?.status === 'processing')?.length;
  const errorCount = queueItems?.filter(item => item?.status === 'error')?.length;

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-primary flex items-center">
          <Icon name="List" size={20} className="mr-2 text-accent" />
          Processing Queue
        </h3>
        
        <div className="flex items-center space-x-2">
          {/* Queue Stats */}
          <div className="flex items-center space-x-3 text-xs">
            {processingCount > 0 && (
              <div className="flex items-center">
                <div className="w-2 h-2 bg-accent rounded-full mr-1 animate-pulse"></div>
                <span className="text-accent">{processingCount} processing</span>
              </div>
            )}
            {completedCount > 0 && (
              <div className="flex items-center">
                <div className="w-2 h-2 bg-success rounded-full mr-1"></div>
                <span className="text-success">{completedCount} completed</span>
              </div>
            )}
            {errorCount > 0 && (
              <div className="flex items-center">
                <div className="w-2 h-2 bg-error rounded-full mr-1"></div>
                <span className="text-error">{errorCount} failed</span>
              </div>
            )}
          </div>

          {/* Clear Completed Button */}
          {completedCount > 0 && (
            <button
              onClick={onClearCompleted}
              className="px-3 py-1 bg-muted text-muted-foreground hover:text-primary text-xs rounded-lg transition-colors duration-200"
            >
              Clear Completed
            </button>
          )}
        </div>
      </div>
      {queueItems?.length === 0 ? (
        // Empty State
        (<div className="text-center py-12">
          <div className="w-16 h-16 mx-auto bg-muted/30 rounded-full flex items-center justify-center mb-4">
            <Icon name="ListX" size={32} className="text-muted-foreground" />
          </div>
          <p className="text-muted-foreground mb-2">No items in queue</p>
          <p className="text-sm text-muted-foreground">Upload images and start processing to see them here</p>
        </div>)
      ) : (
        // Queue Items
        (<div className="space-y-3">
          {queueItems?.map((item) => {
            const statusIcon = getStatusIcon(item?.status);
            
            return (
              <div
                key={item?.id}
                className="flex items-center space-x-4 p-4 bg-muted/20 rounded-lg border border-border hover:border-accent/30 transition-all duration-200"
              >
                {/* Status Icon */}
                <div className="flex-shrink-0">
                  <Icon 
                    name={statusIcon?.name} 
                    size={20} 
                    className={statusIcon?.color} 
                  />
                </div>
                {/* File Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <p className="text-sm font-medium text-primary truncate">
                      {item?.fileName}
                    </p>
                    <span className={`px-2 py-0.5 text-xs rounded-full ${
                      item?.status === 'completed' ? 'bg-success/10 text-success' :
                      item?.status === 'processing' ? 'bg-accent/10 text-accent' :
                      item?.status === 'error'? 'bg-error/10 text-error' : 'bg-muted text-muted-foreground'
                    }`}>
                      {item?.status?.charAt(0)?.toUpperCase() + item?.status?.slice(1)}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span>{item?.fileSize}</span>
                    <span>{item?.algorithm}</span>
                    <span>{item?.encryption}</span>
                    {item?.estimatedTime && (
                      <span>ETA: {formatTime(item?.estimatedTime)}</span>
                    )}
                  </div>
                </div>
                {/* Progress Bar */}
                {item?.status === 'processing' && (
                  <div className="flex-shrink-0 w-24">
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${getStatusColor(item?.status)}`}
                        style={{ width: `${item?.progress || 0}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-center text-muted-foreground mt-1">
                      {item?.progress || 0}%
                    </p>
                  </div>
                )}
                {/* Completion Time */}
                {item?.status === 'completed' && item?.completedAt && (
                  <div className="flex-shrink-0 text-xs text-success">
                    Completed in {formatTime(item?.processingTime)}
                  </div>
                )}
                {/* Error Message */}
                {item?.status === 'error' && item?.error && (
                  <div className="flex-shrink-0 max-w-32">
                    <p className="text-xs text-error truncate" title={item?.error}>
                      {item?.error}
                    </p>
                  </div>
                )}
                {/* Actions */}
                <div className="flex-shrink-0 flex items-center space-x-2">
                  {item?.status === 'error' && (
                    <button
                      onClick={() => onRetryItem(item?.id)}
                      className="p-1 text-muted-foreground hover:text-accent transition-colors duration-200"
                      title="Retry processing"
                    >
                      <Icon name="RotateCcw" size={16} />
                    </button>
                  )}
                  
                  {item?.status === 'completed' && (
                    <button
                      onClick={() => window.open(item?.downloadUrl, '_blank')}
                      className="p-1 text-muted-foreground hover:text-success transition-colors duration-200"
                      title="Download result"
                    >
                      <Icon name="Download" size={16} />
                    </button>
                  )}
                  
                  <button
                    onClick={() => onRemoveItem(item?.id)}
                    className="p-1 text-muted-foreground hover:text-error transition-colors duration-200"
                    title="Remove from queue"
                  >
                    <Icon name="X" size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>)
      )}
      {/* Queue Summary */}
      {queueItems?.length > 0 && (
        <div className="mt-6 pt-4 border-t border-border">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-primary">{queueItems?.length}</p>
              <p className="text-xs text-muted-foreground">Total Items</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-accent">{processingCount}</p>
              <p className="text-xs text-muted-foreground">Processing</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-success">{completedCount}</p>
              <p className="text-xs text-muted-foreground">Completed</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-error">{errorCount}</p>
              <p className="text-xs text-muted-foreground">Failed</p>
            </div>
          </div>
        </div>
      )}
      {/* Processing Tips */}
      {processingCount > 0 && (
        <div className="mt-4 p-3 bg-accent/5 border border-accent/20 rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="Info" size={16} className="text-accent mt-0.5" />
            <div className="text-xs text-accent">
              <p className="font-medium mb-1">Processing in progress</p>
              <p>Images are processed using web workers to maintain UI responsiveness. You can continue working while processing completes in the background.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProcessingQueue;