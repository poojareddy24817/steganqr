import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ResearchPapers = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'All Papers', count: 24 },
    { id: 'algorithms', name: 'Algorithms', count: 8 },
    { id: 'security', name: 'Security', count: 6 },
    { id: 'detection', name: 'Detection', count: 5 },
    { id: 'applications', name: 'Applications', count: 5 }
  ];

  const papers = [
    {
      id: 1,
      title: "Advanced LSB Steganography with Adaptive Pixel Selection",
      authors: ["Dr. Sarah Chen", "Prof. Michael Rodriguez"],
      category: "algorithms",
      publishDate: "2024-08-15",
      readTime: "12 min",
      abstract: `This paper presents a novel approach to LSB steganography that dynamically selects optimal pixels for data embedding based on local image characteristics. Our method achieves 40% better detection resistance compared to traditional sequential LSB embedding while maintaining visual quality.`,
      tags: ["LSB", "Adaptive", "Image Processing"],
      downloadCount: 1247,
      citations: 23,
      status: "peer-reviewed",
      difficulty: "Advanced"
    },
    {
      id: 2,
      title: "Quantum-Resistant Steganographic Protocols for Future Security",
      authors: ["Dr. Alex Thompson", "Dr. Maria Gonzalez", "Prof. David Kim"],
      category: "security",
      publishDate: "2024-07-28",
      readTime: "18 min",
      abstract: `As quantum computing threatens current cryptographic methods, this research explores steganographic techniques that remain secure against quantum attacks. We propose a hybrid approach combining classical steganography with quantum-resistant encryption.`,
      tags: ["Quantum", "Cryptography", "Future-Proof"],
      downloadCount: 892,
      citations: 15,
      status: "under-review",
      difficulty: "Expert"
    },
    {
      id: 3,
      title: "Machine Learning Detection of Modern Steganographic Techniques",
      authors: ["Dr. Jennifer Wu", "Prof. Robert Anderson"],
      category: "detection",
      publishDate: "2024-07-10",
      readTime: "15 min",
      abstract: `This study evaluates the effectiveness of various machine learning models in detecting contemporary steganographic methods. We present a comprehensive analysis of CNN, RNN, and transformer-based detection systems with accuracy rates exceeding 95%.`,
      tags: ["Machine Learning", "Detection", "CNN", "Analysis"],
      downloadCount: 1456,
      citations: 31,
      status: "published",
      difficulty: "Intermediate"
    },
    {
      id: 4,
      title: "Steganography in IoT Environments: Challenges and Solutions",
      authors: ["Dr. Ahmed Hassan", "Prof. Lisa Wang"],
      category: "applications",
      publishDate: "2024-06-22",
      readTime: "14 min",
      abstract: `Internet of Things devices present unique opportunities and challenges for steganographic communication. This paper addresses resource constraints, real-time processing requirements, and security considerations specific to IoT deployments.`,
      tags: ["IoT", "Real-time", "Resource Optimization"],
      downloadCount: 734,
      citations: 12,
      status: "published",
      difficulty: "Intermediate"
    },
    {
      id: 5,
      title: "Frequency Domain Steganography: DCT vs DWT Comparative Analysis",
      authors: ["Dr. Carlos Martinez", "Dr. Emily Johnson"],
      category: "algorithms",
      publishDate: "2024-06-05",
      readTime: "16 min",
      abstract: `A comprehensive comparison of Discrete Cosine Transform and Discrete Wavelet Transform approaches to frequency domain steganography. Our analysis covers capacity, robustness, and computational efficiency across various image types and compression scenarios.`,
      tags: ["DCT", "DWT", "Frequency Domain", "Comparison"],
      downloadCount: 1123,
      citations: 28,
      status: "published",
      difficulty: "Advanced"
    },
    {
      id: 6,
      title: "Blockchain-Based Steganographic Key Management Systems",
      authors: ["Dr. Kevin Park", "Prof. Anna Petrov", "Dr. James Wilson"],
      category: "security",
      publishDate: "2024-05-18",
      readTime: "20 min",
      abstract: `This research proposes a decentralized key management system for steganographic applications using blockchain technology. The system ensures key integrity, non-repudiation, and distributed trust without compromising steganographic security.`,
      tags: ["Blockchain", "Key Management", "Decentralized"],
      downloadCount: 567,
      citations: 8,
      status: "published",
      difficulty: "Expert"
    }
  ];

  const filteredPapers = papers?.filter(paper => {
    const matchesCategory = selectedCategory === 'all' || paper?.category === selectedCategory;
    const matchesSearch = paper?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         paper?.authors?.some(author => author?.toLowerCase()?.includes(searchTerm?.toLowerCase())) ||
                         paper?.tags?.some(tag => tag?.toLowerCase()?.includes(searchTerm?.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'published': return 'text-success bg-success/10';
      case 'peer-reviewed': return 'text-accent bg-accent/10';
      case 'under-review': return 'text-warning bg-warning/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'text-success bg-success/10';
      case 'Intermediate': return 'text-accent bg-accent/10';
      case 'Advanced': return 'text-warning bg-warning/10';
      case 'Expert': return 'text-destructive bg-destructive/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-brand-card">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-primary mb-2">
            Research Papers & Publications
          </h3>
          <p className="text-muted-foreground">
            Latest research in steganography, security, and covert communications
          </p>
        </div>
        <div className="flex items-center space-x-3 mt-4 lg:mt-0">
          <div className="relative">
            <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search papers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
              className="pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-primary placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            />
          </div>
          <Button variant="outline" size="sm" iconName="Download" iconPosition="left" iconSize={16}>
            Export List
          </Button>
        </div>
      </div>
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories?.map((category) => (
          <button
            key={category?.id}
            onClick={() => setSelectedCategory(category?.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              selectedCategory === category?.id
                ? 'bg-accent text-accent-foreground shadow-brand-card'
                : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-primary'
            }`}
          >
            {category?.name}
            <span className="ml-2 px-2 py-0.5 rounded-full text-xs bg-background/20">
              {category?.count}
            </span>
          </button>
        ))}
      </div>
      {/* Papers List */}
      <div className="space-y-6">
        {filteredPapers?.map((paper) => (
          <div key={paper?.id} className="bg-background rounded-lg border border-border p-6 hover:shadow-brand-card transition-all duration-200">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-start space-x-3 mb-3">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-primary mb-2 hover:text-accent cursor-pointer transition-colors duration-200">
                      {paper?.title}
                    </h4>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-sm text-muted-foreground">
                        By {paper?.authors?.join(', ')}
                      </span>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">
                        {new Date(paper.publishDate)?.toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </span>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground flex items-center">
                        <Icon name="Clock" size={14} className="mr-1" />
                        {paper?.readTime}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(paper?.status)}`}>
                        {paper?.status?.replace('-', ' ')?.replace(/\b\w/g, l => l?.toUpperCase())}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(paper?.difficulty)}`}>
                        {paper?.difficulty}
                      </span>
                    </div>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {paper?.abstract}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {paper?.tags?.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs font-medium">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-border">
              <div className="flex items-center space-x-6 mb-3 sm:mb-0">
                <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                  <Icon name="Download" size={16} />
                  <span>{paper?.downloadCount?.toLocaleString()} downloads</span>
                </div>
                <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                  <Icon name="Quote" size={16} />
                  <span>{paper?.citations} citations</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" iconName="Bookmark" iconPosition="left" iconSize={16}>
                  Save
                </Button>
                <Button variant="outline" size="sm" iconName="Share" iconPosition="left" iconSize={16}>
                  Share
                </Button>
                <Button variant="default" size="sm" iconName="ExternalLink" iconPosition="right" iconSize={16}>
                  Read Paper
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredPapers?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="FileText" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h4 className="text-lg font-medium text-primary mb-2">No papers found</h4>
          <p className="text-muted-foreground">
            Try adjusting your search terms or category filter
          </p>
        </div>
      )}
      {/* Load More */}
      {filteredPapers?.length > 0 && (
        <div className="text-center mt-8">
          <Button variant="outline" iconName="Plus" iconPosition="left" iconSize={16}>
            Load More Papers
          </Button>
        </div>
      )}
    </div>
  );
};

export default ResearchPapers;