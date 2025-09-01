import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const TechnicalBlog = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Posts', count: 18 },
    { id: 'algorithms', name: 'Algorithms', count: 6 },
    { id: 'security', name: 'Security', count: 5 },
    { id: 'industry', name: 'Industry Trends', count: 4 },
    { id: 'tutorials', name: 'Tutorials', count: 3 }
  ];

  const blogPosts = [
    {
      id: 1,
      title: "The Evolution of Steganographic Algorithms: From LSB to AI-Powered Embedding",
      excerpt: "Explore how steganographic techniques have evolved from simple LSB methods to sophisticated AI-driven approaches that adapt to image characteristics in real-time.",
      author: {
        name: "Dr. Sarah Chen",
        role: "Lead Research Scientist",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
      },
      category: "algorithms",
      publishDate: "2024-08-28",
      readTime: "8 min",
      tags: ["AI", "Machine Learning", "LSB", "Algorithms"],
      featured: true,
      views: 2847,
      likes: 156,
      comments: 23,
      coverImage: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop"
    },
    {
      id: 2,
      title: "Quantum Computing Threats to Modern Steganography: Preparing for the Future",
      excerpt: "As quantum computers become reality, we examine their potential impact on current steganographic methods and explore quantum-resistant approaches.",
      author: {
        name: "Prof. Michael Rodriguez",
        role: "Quantum Security Expert",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      },
      category: "security",
      publishDate: "2024-08-25",
      readTime: "12 min",
      tags: ["Quantum Computing", "Security", "Future Tech"],
      featured: false,
      views: 1923,
      likes: 89,
      comments: 31,
      coverImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=400&fit=crop"
    },
    {
      id: 3,
      title: "Building Your First Steganographic Application: A Complete Tutorial",
      excerpt: "Step-by-step guide to creating a steganographic application using our SDK, from basic embedding to advanced security features.",
      author: {
        name: "Alex Thompson",
        role: "Developer Advocate",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      },
      category: "tutorials",
      publishDate: "2024-08-22",
      readTime: "15 min",
      tags: ["Tutorial", "SDK", "Development", "Beginner"],
      featured: false,
      views: 3456,
      likes: 234,
      comments: 67,
      coverImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop"
    },
    {
      id: 4,
      title: "Market Analysis: The Growing Demand for Covert Communication Solutions",
      excerpt: "Industry report on the expanding market for steganographic solutions across sectors including cybersecurity, digital forensics, and privacy protection.",
      author: {
        name: "Dr. Jennifer Wu",
        role: "Market Research Analyst",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
      },
      category: "industry",
      publishDate: "2024-08-20",
      readTime: "10 min",
      tags: ["Market Analysis", "Industry", "Business"],
      featured: false,
      views: 1567,
      likes: 78,
      comments: 19,
      coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop"
    },
    {
      id: 5,
      title: "Advanced Detection Resistance: Techniques to Evade Steganalysis",
      excerpt: "Deep dive into methods for making steganographic content more resistant to detection by modern steganalysis tools and machine learning systems.",
      author: {
        name: "Dr. Carlos Martinez",
        role: "Security Researcher",
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face"
      },
      category: "security",
      publishDate: "2024-08-18",
      readTime: "14 min",
      tags: ["Detection Resistance", "Steganalysis", "Advanced"],
      featured: true,
      views: 2134,
      likes: 145,
      comments: 42,
      coverImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=400&fit=crop"
    },
    {
      id: 6,
      title: "Performance Optimization in Real-Time Steganographic Systems",
      excerpt: "Techniques for optimizing steganographic algorithms for real-time applications, including parallel processing and hardware acceleration.",
      author: {
        name: "Emily Johnson",
        role: "Performance Engineer",
        avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face"
      },
      category: "algorithms",
      publishDate: "2024-08-15",
      readTime: "11 min",
      tags: ["Performance", "Optimization", "Real-time"],
      featured: false,
      views: 1789,
      likes: 92,
      comments: 28,
      coverImage: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=800&h=400&fit=crop"
    }
  ];

  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts?.filter(post => post?.category === selectedCategory);

  const featuredPosts = blogPosts?.filter(post => post?.featured);

  const getCategoryColor = (category) => {
    switch (category) {
      case 'algorithms': return 'text-accent bg-accent/10';
      case 'security': return 'text-success bg-success/10';
      case 'industry': return 'text-warning bg-warning/10';
      case 'tutorials': return 'text-purple-600 bg-purple-50';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-brand-card">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-primary mb-2">
            Technical Blog
          </h3>
          <p className="text-muted-foreground">
            Latest insights, research, and industry trends from our team
          </p>
        </div>
        <div className="flex items-center space-x-3 mt-4 lg:mt-0">
          <Button variant="outline" size="sm" iconName="Rss" iconPosition="left" iconSize={16}>
            Subscribe
          </Button>
          <Button variant="default" size="sm" iconName="PenTool" iconPosition="left" iconSize={16}>
            Write Article
          </Button>
        </div>
      </div>
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
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
      {/* Featured Posts */}
      {selectedCategory === 'all' && featuredPosts?.length > 0 && (
        <div className="mb-8">
          <h4 className="text-lg font-semibold text-primary mb-4 flex items-center">
            <Icon name="Star" size={20} className="text-warning mr-2" />
            Featured Articles
          </h4>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {featuredPosts?.map((post) => (
              <div key={post?.id} className="bg-background rounded-lg border border-border overflow-hidden hover:shadow-brand-card transition-all duration-200 group">
                <div className="relative">
                  <Image
                    src={post?.coverImage}
                    alt={post?.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(post?.category)}`}>
                      {post?.category?.charAt(0)?.toUpperCase() + post?.category?.slice(1)}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="bg-warning text-warning-foreground px-2 py-1 rounded-full text-xs font-bold flex items-center">
                      <Icon name="Star" size={12} className="mr-1" />
                      Featured
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h5 className="text-lg font-semibold text-primary mb-3 group-hover:text-accent transition-colors duration-200 line-clamp-2">
                    {post?.title}
                  </h5>
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {post?.excerpt}
                  </p>
                  
                  <div className="flex items-center space-x-3 mb-4">
                    <Image
                      src={post?.author?.avatar}
                      alt={post?.author?.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-medium text-primary">{post?.author?.name}</p>
                      <p className="text-xs text-muted-foreground">{post?.author?.role}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-4">
                      <span>{new Date(post.publishDate)?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      <span className="flex items-center">
                        <Icon name="Clock" size={14} className="mr-1" />
                        {post?.readTime}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center">
                        <Icon name="Eye" size={14} className="mr-1" />
                        {post?.views?.toLocaleString()}
                      </span>
                      <span className="flex items-center">
                        <Icon name="Heart" size={14} className="mr-1" />
                        {post?.likes}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* All Posts */}
      <div className="space-y-6">
        <h4 className="text-lg font-semibold text-primary">
          {selectedCategory === 'all' ? 'Latest Articles' : `${categories?.find(c => c?.id === selectedCategory)?.name} Articles`}
        </h4>
        
        {filteredPosts?.map((post) => (
          <div key={post?.id} className="bg-background rounded-lg border border-border p-6 hover:shadow-brand-card transition-all duration-200 group">
            <div className="flex flex-col lg:flex-row lg:items-start space-y-4 lg:space-y-0 lg:space-x-6">
              <div className="lg:w-48 flex-shrink-0">
                <Image
                  src={post?.coverImage}
                  alt={post?.title}
                  className="w-full h-32 lg:h-24 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(post?.category)}`}>
                      {post?.category?.charAt(0)?.toUpperCase() + post?.category?.slice(1)}
                    </span>
                    {post?.featured && (
                      <div className="bg-warning text-warning-foreground px-2 py-1 rounded-full text-xs font-bold flex items-center">
                        <Icon name="Star" size={12} className="mr-1" />
                        Featured
                      </div>
                    )}
                  </div>
                </div>
                
                <h5 className="text-lg font-semibold text-primary mb-2 group-hover:text-accent transition-colors duration-200">
                  {post?.title}
                </h5>
                
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {post?.excerpt}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {post?.tags?.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs">
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Image
                      src={post?.author?.avatar}
                      alt={post?.author?.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-medium text-primary">{post?.author?.name}</p>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <span>{new Date(post.publishDate)?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                        <span>•</span>
                        <span className="flex items-center">
                          <Icon name="Clock" size={12} className="mr-1" />
                          {post?.readTime}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span className="flex items-center">
                      <Icon name="Eye" size={14} className="mr-1" />
                      {post?.views?.toLocaleString()}
                    </span>
                    <span className="flex items-center">
                      <Icon name="Heart" size={14} className="mr-1" />
                      {post?.likes}
                    </span>
                    <span className="flex items-center">
                      <Icon name="MessageCircle" size={14} className="mr-1" />
                      {post?.comments}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Load More */}
      <div className="text-center mt-8">
        <Button variant="outline" iconName="Plus" iconPosition="left" iconSize={16}>
          Load More Articles
        </Button>
      </div>
    </div>
  );
};

export default TechnicalBlog;