import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const PerformanceBenchmarks = () => {
  const [activeMetric, setActiveMetric] = useState('processing-speed');
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('all');

  const metrics = [
    { id: 'processing-speed', name: 'Processing Speed', icon: 'Zap' },
    { id: 'capacity', name: 'Data Capacity', icon: 'Database' },
    { id: 'detection-resistance', name: 'Detection Resistance', icon: 'Shield' },
    { id: 'image-quality', name: 'Image Quality', icon: 'Image' }
  ];

  const algorithms = [
    { id: 'all', name: 'All Algorithms' },
    { id: 'lsb', name: 'LSB Steganography' },
    { id: 'dct', name: 'DCT Transform' },
    { id: 'dwt', name: 'DWT Wavelet' },
    { id: 'ai-adaptive', name: 'AI-Adaptive' }
  ];

  const processingSpeedData = [
    { algorithm: 'LSB', small: 0.12, medium: 0.45, large: 1.23, xlarge: 3.45 },
    { algorithm: 'DCT', small: 0.34, medium: 1.12, large: 3.67, xlarge: 9.23 },
    { algorithm: 'DWT', small: 0.56, medium: 1.89, large: 5.12, xlarge: 14.67 },
    { algorithm: 'AI-Adaptive', small: 0.89, medium: 2.34, large: 6.78, xlarge: 18.45 }
  ];

  const capacityData = [
    { algorithm: 'LSB', capacity: 25, quality: 98 },
    { algorithm: 'DCT', capacity: 15, quality: 94 },
    { algorithm: 'DWT', capacity: 8, quality: 96 },
    { algorithm: 'AI-Adaptive', capacity: 20, quality: 97 }
  ];

  const detectionResistanceData = [
    { algorithm: 'LSB', chi_square: 65, rs_analysis: 58, dctr: 72, cnn_detector: 45 },
    { algorithm: 'DCT', chi_square: 85, rs_analysis: 82, dctr: 88, cnn_detector: 78 },
    { algorithm: 'DWT', chi_square: 92, rs_analysis: 89, dctr: 94, cnn_detector: 85 },
    { algorithm: 'AI-Adaptive', chi_square: 96, rs_analysis: 94, dctr: 97, cnn_detector: 92 }
  ];

  const imageQualityData = [
    { size: '512x512', lsb: 48.2, dct: 42.1, dwt: 45.8, ai: 47.9 },
    { size: '1024x1024', lsb: 46.8, dct: 40.7, dwt: 44.2, ai: 46.5 },
    { size: '2048x2048', lsb: 45.3, dct: 39.2, dwt: 42.6, ai: 45.1 },
    { size: '4096x4096', lsb: 44.1, dct: 38.1, dwt: 41.3, ai: 44.2 }
  ];

  const radarData = [
    { metric: 'Speed', lsb: 95, dct: 75, dwt: 60, ai: 50 },
    { metric: 'Capacity', lsb: 90, dct: 60, dwt: 35, ai: 75 },
    { metric: 'Security', lsb: 40, dct: 75, dwt: 85, ai: 95 },
    { metric: 'Quality', lsb: 85, dct: 70, dwt: 80, ai: 90 },
    { metric: 'Robustness', lsb: 30, dct: 80, dwt: 90, ai: 85 },
    { metric: 'Complexity', lsb: 95, dct: 60, dwt: 45, ai: 25 }
  ];

  const benchmarkResults = [
    {
      testName: "Standard Image Set (1000 images)",
      date: "2024-08-28",
      environment: "Intel i9-12900K, 32GB RAM, RTX 4080",
      results: {
        lsb: { speed: "0.45s avg", capacity: "25%", detection: "65%", quality: "48.2 PSNR" },
        dct: { speed: "1.12s avg", capacity: "15%", detection: "85%", quality: "42.1 PSNR" },
        dwt: { speed: "1.89s avg", capacity: "8%", detection: "92%", quality: "45.8 PSNR" },
        ai: { speed: "2.34s avg", capacity: "20%", detection: "96%", quality: "47.9 PSNR" }
      }
    },
    {
      testName: "High-Resolution Dataset (500 images)",
      date: "2024-08-25",
      environment: "AMD Ryzen 9 7950X, 64GB RAM, RTX 4090",
      results: {
        lsb: { speed: "1.23s avg", capacity: "25%", detection: "62%", quality: "46.8 PSNR" },
        dct: { speed: "3.67s avg", capacity: "15%", detection: "88%", quality: "40.7 PSNR" },
        dwt: { speed: "5.12s avg", capacity: "8%", detection: "94%", quality: "44.2 PSNR" },
        ai: { speed: "6.78s avg", capacity: "20%", detection: "97%", quality: "46.5 PSNR" }
      }
    }
  ];

  const renderChart = () => {
    switch (activeMetric) {
      case 'processing-speed':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={processingSpeedData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="algorithm" stroke="#64748B" />
              <YAxis stroke="#64748B" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="small" fill="#10B981" name="Small (512x512)" />
              <Bar dataKey="medium" fill="#3B82F6" name="Medium (1024x1024)" />
              <Bar dataKey="large" fill="#F59E0B" name="Large (2048x2048)" />
              <Bar dataKey="xlarge" fill="#EF4444" name="XLarge (4096x4096)" />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'capacity':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={capacityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="algorithm" stroke="#64748B" />
              <YAxis stroke="#64748B" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="capacity" fill="#3B82F6" name="Capacity %" />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'detection-resistance':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={detectionResistanceData}>
              <PolarGrid stroke="#E2E8F0" />
              <PolarAngleAxis dataKey="algorithm" stroke="#64748B" />
              <PolarRadiusAxis stroke="#64748B" />
              <Radar name="Chi-Square" dataKey="chi_square" stroke="#10B981" fill="#10B981" fillOpacity={0.1} />
              <Radar name="RS Analysis" dataKey="rs_analysis" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.1} />
              <Radar name="DCTR" dataKey="dctr" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.1} />
              <Radar name="CNN Detector" dataKey="cnn_detector" stroke="#EF4444" fill="#EF4444" fillOpacity={0.1} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        );
      
      case 'image-quality':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={imageQualityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="size" stroke="#64748B" />
              <YAxis stroke="#64748B" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px'
                }}
              />
              <Line type="monotone" dataKey="lsb" stroke="#10B981" strokeWidth={2} name="LSB" />
              <Line type="monotone" dataKey="dct" stroke="#3B82F6" strokeWidth={2} name="DCT" />
              <Line type="monotone" dataKey="dwt" stroke="#F59E0B" strokeWidth={2} name="DWT" />
              <Line type="monotone" dataKey="ai" stroke="#EF4444" strokeWidth={2} name="AI-Adaptive" />
            </LineChart>
          </ResponsiveContainer>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-brand-card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-primary mb-2">
            Performance Benchmarks
          </h3>
          <p className="text-muted-foreground">
            Comprehensive performance analysis across different algorithms and metrics
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" iconName="Download" iconPosition="left" iconSize={16}>
            Export Data
          </Button>
          <Button variant="default" size="sm" iconName="RefreshCw" iconPosition="left" iconSize={16}>
            Run New Test
          </Button>
        </div>
      </div>
      {/* Metric Selection */}
      <div className="flex flex-wrap gap-2 mb-6">
        {metrics?.map((metric) => (
          <button
            key={metric?.id}
            onClick={() => setActiveMetric(metric?.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeMetric === metric?.id
                ? 'bg-accent text-accent-foreground shadow-brand-card'
                : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-primary'
            }`}
          >
            <Icon name={metric?.icon} size={16} />
            <span>{metric?.name}</span>
          </button>
        ))}
      </div>
      {/* Chart Display */}
      <div className="bg-background rounded-lg border border-border p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold text-primary">
            {metrics?.find(m => m?.id === activeMetric)?.name} Comparison
          </h4>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Calendar" size={16} />
            <span>Last updated: August 28, 2024</span>
          </div>
        </div>
        
        {renderChart()}
        
        <div className="mt-4 text-xs text-muted-foreground">
          {activeMetric === 'processing-speed' && "Processing time in seconds (lower is better)"}
          {activeMetric === 'capacity' && "Maximum data capacity as percentage of image size"}
          {activeMetric === 'detection-resistance' && "Resistance percentage against various steganalysis methods"}
          {activeMetric === 'image-quality' && "Peak Signal-to-Noise Ratio in dB (higher is better)"}
        </div>
      </div>
      {/* Algorithm Comparison Radar */}
      <div className="bg-background rounded-lg border border-border p-6 mb-6">
        <h4 className="text-lg font-semibold text-primary mb-4">
          Overall Algorithm Comparison
        </h4>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={radarData}>
            <PolarGrid stroke="#E2E8F0" />
            <PolarAngleAxis dataKey="metric" stroke="#64748B" />
            <PolarRadiusAxis stroke="#64748B" />
            <Radar name="LSB" dataKey="lsb" stroke="#10B981" fill="#10B981" fillOpacity={0.1} />
            <Radar name="DCT" dataKey="dct" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.1} />
            <Radar name="DWT" dataKey="dwt" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.1} />
            <Radar name="AI-Adaptive" dataKey="ai" stroke="#EF4444" fill="#EF4444" fillOpacity={0.1} />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      {/* Detailed Benchmark Results */}
      <div className="space-y-6">
        <h4 className="text-lg font-semibold text-primary">Detailed Benchmark Results</h4>
        
        {benchmarkResults?.map((benchmark, index) => (
          <div key={index} className="bg-background rounded-lg border border-border p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
              <div>
                <h5 className="text-lg font-semibold text-primary mb-1">
                  {benchmark?.testName}
                </h5>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span className="flex items-center">
                    <Icon name="Calendar" size={14} className="mr-1" />
                    {new Date(benchmark.date)?.toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                  <span className="flex items-center">
                    <Icon name="Cpu" size={14} className="mr-1" />
                    {benchmark?.environment}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(benchmark?.results)?.map(([algorithm, results]) => (
                <div key={algorithm} className="bg-muted/30 rounded-lg p-4">
                  <h6 className="font-semibold text-primary mb-3 capitalize">
                    {algorithm === 'ai' ? 'AI-Adaptive' : algorithm?.toUpperCase()}
                  </h6>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Speed:</span>
                      <span className="font-medium text-primary">{results?.speed}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Capacity:</span>
                      <span className="font-medium text-primary">{results?.capacity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Detection:</span>
                      <span className="font-medium text-primary">{results?.detection}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Quality:</span>
                      <span className="font-medium text-primary">{results?.quality}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* Performance Tips */}
      <div className="mt-6 bg-accent/5 border border-accent/20 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={20} className="text-accent flex-shrink-0 mt-0.5" />
          <div>
            <h5 className="font-semibold text-primary mb-2">Performance Optimization Tips</h5>
            <ul className="text-muted-foreground space-y-1 text-sm">
              <li>• Use LSB for maximum speed when detection resistance is not critical</li>
              <li>• Choose DCT for balanced performance across all metrics</li>
              <li>• Select DWT for highest security requirements despite slower processing</li>
              <li>• AI-Adaptive provides the best overall security with reasonable performance</li>
              <li>• Consider batch processing for multiple images to improve throughput</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceBenchmarks;