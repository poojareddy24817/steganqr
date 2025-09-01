import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ScanHistory = ({ onLoadHistory, onClearHistory }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const statusOptions = [
    { value: 'all', label: 'All Results' },
    { value: 'success', label: 'Successful Scans' },
    { value: 'partial', label: 'Partial Results' },
    { value: 'failed', label: 'Failed Scans' }
  ];

  const sortOptions = [
    { value: 'date', label: 'Date (Newest First)' },
    { value: 'filename', label: 'Filename (A-Z)' },
    { value: 'size', label: 'File Size' },
    { value: 'status', label: 'Status' }
  ];

  const mockHistory = [
    {
      id: 1,
      filename: 'corporate_logo.png',
      scanDate: '2025-09-01 12:45:23',
      status: 'success',
      algorithm: 'LSB Steganography',
      dataSize: '2.4 KB',
      fileSize: '847 KB',
      extractedType: 'text',
      autoCleanup: '2025-09-08 12:45:23'
    },
    {
      id: 2,
      filename: 'product_image.jpg',
      scanDate: '2025-09-01 12:46:18',
      status: 'success',
      algorithm: 'DCT Transform',
      dataSize: '1.8 KB',
      fileSize: '1.2 MB',
      extractedType: 'json',
      autoCleanup: '2025-09-08 12:46:18'
    },
    {
      id: 3,
      filename: 'team_photo.png',
      scanDate: '2025-09-01 12:47:05',
      status: 'partial',
      algorithm: 'Spread Spectrum',
      dataSize: '4.7 KB',
      fileSize: '2.8 MB',
      extractedType: 'encrypted',
      autoCleanup: '2025-09-08 12:47:05'
    },
    {
      id: 4,
      filename: 'marketing_banner.jpg',
      scanDate: '2025-08-31 16:22:14',
      status: 'failed',
      algorithm: 'Auto-Detect',
      dataSize: '0 KB',
      fileSize: '654 KB',
      extractedType: 'none',
      autoCleanup: '2025-09-07 16:22:14'
    },
    {
      id: 5,
      filename: 'security_diagram.png',
      scanDate: '2025-08-31 14:18:37',
      status: 'success',
      algorithm: 'DWT Wavelet',
      dataSize: '3.2 KB',
      fileSize: '1.5 MB',
      extractedType: 'text',
      autoCleanup: '2025-09-07 14:18:37'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'text-success bg-success/10';
      case 'partial': return 'text-warning bg-warning/10';
      case 'failed': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
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

  const getTypeIcon = (type) => {
    switch (type) {
      case 'text': return 'FileText';
      case 'json': return 'Code';
      case 'encrypted': return 'Lock';
      case 'none': return 'File';
      default: return 'File';
    }
  };

  const filteredHistory = mockHistory?.filter(item => {
    const matchesSearch = item?.filename?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         item?.algorithm?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesStatus = filterStatus === 'all' || item?.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const sortedHistory = [...filteredHistory]?.sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.scanDate) - new Date(a.scanDate);
      case 'filename':
        return a?.filename?.localeCompare(b?.filename);
      case 'size':
        return parseFloat(b?.fileSize) - parseFloat(a?.fileSize);
      case 'status':
        return a?.status?.localeCompare(b?.status);
      default:
        return 0;
    }
  });

  const handleReload = (historyItem) => {
    onLoadHistory(historyItem);
  };

  const handleDelete = (id) => {
    // In a real app, this would delete the specific item
    console.log('Delete history item:', id);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString() + ' ' + date?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getDaysUntilCleanup = (cleanupDate) => {
    const days = Math.ceil((new Date(cleanupDate) - new Date()) / (1000 * 60 * 60 * 24));
    return Math.max(0, days);
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-brand-card">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="History" size={20} className="text-accent" />
          <h3 className="text-lg font-semibold text-primary">Scan History</h3>
          <span className="px-2 py-1 bg-muted text-muted-foreground text-xs font-medium rounded-full">
            {mockHistory?.length} scans
          </span>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearHistory}
          iconName="Trash2"
          iconPosition="left"
        >
          Clear All
        </Button>
      </div>
      {/* Search and Filter Controls */}
      <div className="p-4 border-b border-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            type="search"
            placeholder="Search by filename or algorithm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
            className="md:col-span-1"
          />
          
          <Select
            placeholder="Filter by status"
            options={statusOptions}
            value={filterStatus}
            onChange={setFilterStatus}
          />
          
          <Select
            placeholder="Sort by"
            options={sortOptions}
            value={sortBy}
            onChange={setSortBy}
          />
        </div>
      </div>
      {/* History List */}
      <div className="max-h-96 overflow-y-auto">
        {sortedHistory?.length === 0 ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center mb-4">
              <Icon name="History" size={24} className="text-muted-foreground" />
            </div>
            <h4 className="text-lg font-semibold text-primary mb-2">No History Found</h4>
            <p className="text-sm text-muted-foreground">
              {searchTerm || filterStatus !== 'all' ?'No scans match your current filters' :'Your scan history will appear here'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {sortedHistory?.map((item) => (
              <div key={item?.id} className="p-4 hover:bg-muted/30 transition-colors duration-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <Icon name={getTypeIcon(item?.extractedType)} size={16} className="text-accent" />
                      <h4 className="text-sm font-medium text-primary truncate">
                        {item?.filename}
                      </h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(item?.status)}`}>
                        <Icon name={getStatusIcon(item?.status)} size={12} className="inline mr-1" />
                        {item?.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-muted-foreground">
                      <div>
                        <span className="font-medium">Scanned:</span>
                        <div>{formatDate(item?.scanDate)}</div>
                      </div>
                      <div>
                        <span className="font-medium">Algorithm:</span>
                        <div>{item?.algorithm}</div>
                      </div>
                      <div>
                        <span className="font-medium">Data Found:</span>
                        <div>{item?.dataSize}</div>
                      </div>
                      <div>
                        <span className="font-medium">File Size:</span>
                        <div>{item?.fileSize}</div>
                      </div>
                    </div>
                    
                    {/* Auto-cleanup notice */}
                    <div className="mt-2 flex items-center space-x-2 text-xs">
                      <Icon name="Clock" size={12} className="text-muted-foreground" />
                      <span className="text-muted-foreground">
                        Auto-cleanup in {getDaysUntilCleanup(item?.autoCleanup)} days
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleReload(item)}
                      iconName="RotateCcw"
                      disabled={item?.status === 'failed'}
                    >
                      Reload
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(item?.id)}
                      iconName="Trash2"
                      className="text-error hover:text-error"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Privacy Notice */}
      <div className="p-4 border-t border-border bg-muted/20">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={16} className="text-accent mt-0.5" />
          <div className="text-sm">
            <div className="font-medium text-primary mb-1">Privacy Protection</div>
            <div className="text-muted-foreground">
              Scan history is stored locally on your device and automatically cleaned up after 7 days. 
              No data is transmitted to external servers.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScanHistory;