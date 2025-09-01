import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const ResultsViewer = ({ results, onDownload, onForward, onClear }) => {
  const [selectedResult, setSelectedResult] = useState(null);
  const [viewMode, setViewMode] = useState('preview');

  if (!results || results?.length === 0) {
    return (
      <div className="bg-card rounded-lg border border-border shadow-brand-card">
        <div className="p-8 text-center">
          <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center mb-4">
            <Icon name="Search" size={24} className="text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-primary mb-2">No Results Yet</h3>
          <p className="text-sm text-muted-foreground">
            Upload or capture an image to begin scanning for hidden data
          </p>
        </div>
      </div>
    );
  }

  const mockResults = [
    {
      id: 1,
      filename: 'corporate_logo.png',
      status: 'success',
      dataFound: true,
      algorithm: 'LSB Steganography',
      extractedData: {
        type: 'text',
        content: `Confidential Marketing Strategy Q4 2025\n\nTarget Demographics:\n- Tech professionals aged 25-45\n- Security-conscious organizations\n- Creative agencies seeking innovation\n\nKey Messaging:\n"Security hidden in plain sight - making the invisible visible when you need it most."\n\nBudget Allocation:\n- Digital advertising: 40%\n- Content marketing: 30%\n- Partnership development: 20%\n- Events and conferences: 10%`,
        size: '2.4 KB',
        encoding: 'UTF-8'
      },
      metadata: {
        dimensions: '1920x1080',
        fileSize: '847 KB',
        format: 'PNG',
        created: '2025-08-28 14:32:15',
        camera: 'iPhone 15 Pro',
        location: 'San Francisco, CA'
      },
      integrity: {
        verified: true,
        signature: 'SHA-256: a7b9c2d4e5f6...',
        timestamp: '2025-09-01 12:45:23'
      },
      forensics: {
        chainOfCustody: true,
        evidenceId: 'EVD-2025-0901-001',
        analyst: 'Security Team Alpha'
      }
    },
    {
      id: 2,
      filename: 'product_image.jpg',
      status: 'success',
      dataFound: true,
      algorithm: 'DCT Transform',
      extractedData: {
        type: 'json',
        content: `{\n  "product_id": "STQR-PRO-2025",\n  "authentication_key": "sk_live_a1b2c3d4e5f6g7h8",\n  "batch_number": "BT-20250901-001",\n  "quality_check": {\n    "passed": true,\n    "inspector": "QA-Team-Beta",\n    "date": "2025-09-01",\n    "notes": "All security protocols verified"\n  },\n  "distribution": {\n    "region": "North America",\n    "channels": ["enterprise", "retail", "partner"],\n    "launch_date": "2025-10-15"\n  }\n}`,
        size: '1.8 KB',
        encoding: 'JSON'
      },
      metadata: {
        dimensions: '2048x1536',
        fileSize: '1.2 MB',
        format: 'JPEG',
        created: '2025-08-30 09:15:42'
      },
      integrity: {
        verified: true,
        signature: 'SHA-256: b8c9d3e4f5g6...',
        timestamp: '2025-09-01 12:46:18'
      }
    },
    {
      id: 3,
      filename: 'team_photo.png',
      status: 'partial',
      dataFound: true,
      algorithm: 'Spread Spectrum',
      extractedData: {
        type: 'encrypted',
        content: 'Encrypted data detected but decryption key required',
        size: '4.7 KB',
        encoding: 'AES-256'
      },
      metadata: {
        dimensions: '3840x2160',
        fileSize: '2.8 MB',
        format: 'PNG',
        created: '2025-08-29 16:20:33'
      },
      integrity: {
        verified: false,
        signature: 'Signature verification failed',
        timestamp: '2025-09-01 12:47:05'
      }
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'text-success';
      case 'partial': return 'text-warning';
      case 'failed': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success': return 'CheckCircle';
      case 'partial': return 'AlertCircle';
      case 'failed': return 'XCircle';
      default: return 'Circle';
    }
  };

  const handleDownload = (result) => {
    const blob = new Blob([result.extractedData.content], { 
      type: result.extractedData.type === 'json' ? 'application/json' : 'text/plain' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `extracted_${result?.filename?.split('.')?.[0]}.${result?.extractedData?.type === 'json' ? 'json' : 'txt'}`;
    document.body?.appendChild(a);
    a?.click();
    document.body?.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-brand-card">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Eye" size={20} className="text-accent" />
          <h3 className="text-lg font-semibold text-primary">Scan Results</h3>
          <span className="px-2 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full">
            {mockResults?.length} files processed
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex bg-muted rounded-lg p-1">
            <button
              onClick={() => setViewMode('preview')}
              className={`px-3 py-1 text-xs font-medium rounded transition-all duration-200 ${
                viewMode === 'preview' ?'bg-accent text-accent-foreground' :'text-muted-foreground hover:text-primary'
              }`}
            >
              Preview
            </button>
            <button
              onClick={() => setViewMode('detailed')}
              className={`px-3 py-1 text-xs font-medium rounded transition-all duration-200 ${
                viewMode === 'detailed' ?'bg-accent text-accent-foreground' :'text-muted-foreground hover:text-primary'
              }`}
            >
              Detailed
            </button>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            iconName="Trash2"
            iconPosition="left"
          >
            Clear All
          </Button>
        </div>
      </div>
      <div className="p-4">
        {viewMode === 'preview' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockResults?.map((result) => (
              <div
                key={result?.id}
                className="border border-border rounded-lg p-4 hover:shadow-brand-card transition-all duration-200 cursor-pointer"
                onClick={() => setSelectedResult(result)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-primary truncate">
                      {result?.filename}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {result?.algorithm}
                    </p>
                  </div>
                  <Icon 
                    name={getStatusIcon(result?.status)} 
                    size={16} 
                    className={getStatusColor(result?.status)}
                  />
                </div>

                {result?.dataFound && (
                  <div className="space-y-2">
                    <div className="bg-muted/50 rounded p-2">
                      <div className="text-xs font-medium text-primary mb-1">
                        Extracted Data ({result?.extractedData?.size})
                      </div>
                      <div className="text-xs text-muted-foreground line-clamp-3">
                        {result?.extractedData?.content?.substring(0, 100)}...
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="xs"
                        onClick={(e) => {
                          e?.stopPropagation();
                          handleDownload(result);
                        }}
                        iconName="Download"
                        iconPosition="left"
                      >
                        Download
                      </Button>
                      <Button
                        variant="ghost"
                        size="xs"
                        onClick={(e) => {
                          e?.stopPropagation();
                          setSelectedResult(result);
                        }}
                        iconName="Eye"
                        iconPosition="left"
                      >
                        View
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {mockResults?.map((result) => (
              <div
                key={result?.id}
                className="border border-border rounded-lg p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-semibold text-primary mb-1">
                      {result?.filename}
                    </h4>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span className="flex items-center space-x-1">
                        <Icon name="Cpu" size={14} />
                        <span>{result?.algorithm}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Icon name="Calendar" size={14} />
                        <span>{result?.metadata?.created}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Icon name="HardDrive" size={14} />
                        <span>{result?.metadata?.fileSize}</span>
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className={`flex items-center space-x-1 ${getStatusColor(result?.status)}`}>
                      <Icon name={getStatusIcon(result?.status)} size={16} />
                      <span className="text-sm font-medium capitalize">{result?.status}</span>
                    </div>
                  </div>
                </div>

                {result?.dataFound && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h5 className="text-sm font-semibold text-primary mb-2">Extracted Data</h5>
                      <div className="bg-muted/50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium text-muted-foreground">
                            {result?.extractedData?.type?.toUpperCase()} • {result?.extractedData?.size}
                          </span>
                          <Button
                            variant="ghost"
                            size="xs"
                            onClick={() => handleDownload(result)}
                            iconName="Download"
                          >
                            Download
                          </Button>
                        </div>
                        <pre className="text-xs text-primary whitespace-pre-wrap max-h-32 overflow-y-auto">
                          {result?.extractedData?.content}
                        </pre>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h5 className="text-sm font-semibold text-primary mb-2">Metadata</h5>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Dimensions:</span>
                            <span className="text-primary">{result?.metadata?.dimensions}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Format:</span>
                            <span className="text-primary">{result?.metadata?.format}</span>
                          </div>
                          {result?.metadata?.camera && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Camera:</span>
                              <span className="text-primary">{result?.metadata?.camera}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <h5 className="text-sm font-semibold text-primary mb-2">Verification</h5>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Integrity:</span>
                            <div className={`flex items-center space-x-1 ${
                              result?.integrity?.verified ? 'text-success' : 'text-error'
                            }`}>
                              <Icon 
                                name={result?.integrity?.verified ? 'Shield' : 'ShieldAlert'} 
                                size={14} 
                              />
                              <span>{result?.integrity?.verified ? 'Verified' : 'Failed'}</span>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Timestamp:</span>
                            <span className="text-primary">{result?.integrity?.timestamp}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Detailed Result Modal */}
      {selectedResult && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg border border-border shadow-brand-modal max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="text-lg font-semibold text-primary">
                {selectedResult?.filename} - Detailed Analysis
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedResult(null)}
                iconName="X"
              />
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-primary mb-2">Extracted Content</h4>
                    <div className="bg-muted/50 rounded-lg p-4">
                      <pre className="text-sm text-primary whitespace-pre-wrap">
                        {selectedResult?.extractedData?.content}
                      </pre>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <Button
                      variant="default"
                      onClick={() => handleDownload(selectedResult)}
                      iconName="Download"
                      iconPosition="left"
                    >
                      Download Data
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => navigator.clipboard?.writeText(selectedResult?.extractedData?.content)}
                      iconName="Copy"
                      iconPosition="left"
                    >
                      Copy to Clipboard
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-primary mb-2">Technical Details</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Algorithm:</span>
                        <span className="text-primary">{selectedResult?.algorithm}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Data Size:</span>
                        <span className="text-primary">{selectedResult?.extractedData?.size}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Encoding:</span>
                        <span className="text-primary">{selectedResult?.extractedData?.encoding}</span>
                      </div>
                    </div>
                  </div>
                  
                  {selectedResult?.forensics && (
                    <div>
                      <h4 className="text-sm font-semibold text-primary mb-2">Forensic Data</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Evidence ID:</span>
                          <span className="text-primary font-mono">{selectedResult?.forensics?.evidenceId}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Analyst:</span>
                          <span className="text-primary">{selectedResult?.forensics?.analyst}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsViewer;