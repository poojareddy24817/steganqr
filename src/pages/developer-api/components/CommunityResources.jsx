import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CommunityResources = () => {
  const [activeTab, setActiveTab] = useState('forum');

  const tabs = [
    { id: 'forum', name: 'Developer Forum', icon: 'MessageSquare' },
    { id: 'repositories', name: 'Code Repositories', icon: 'Github' },
    { id: 'contributions', name: 'Contributions', icon: 'GitPullRequest' },
    { id: 'support', name: 'Support Channels', icon: 'HelpCircle' }
  ];

  const forumTopics = [
    {
      id: 1,
      title: 'Best practices for batch processing large image sets',
      author: 'alex_dev',
      replies: 23,
      views: 1247,
      lastActivity: '2 hours ago',
      tags: ['batch-processing', 'optimization', 'performance'],
      isAnswered: true,
      isPinned: false
    },
    {
      id: 2,
      title: 'Custom algorithm integration - seeking feedback',
      author: 'crypto_researcher',
      replies: 15,
      views: 892,
      lastActivity: '4 hours ago',
      tags: ['custom-algorithms', 'research', 'feedback'],
      isAnswered: false,
      isPinned: true
    },
    {
      id: 3,
      title: 'Mobile SDK performance optimization tips',
      author: 'mobile_expert',
      replies: 31,
      views: 2156,
      lastActivity: '6 hours ago',
      tags: ['mobile', 'sdk', 'performance', 'ios', 'android'],
      isAnswered: true,
      isPinned: false
    },
    {
      id: 4,
      title: 'Webhook implementation patterns and error handling',
      author: 'backend_ninja',
      replies: 18,
      views: 743,
      lastActivity: '1 day ago',
      tags: ['webhooks', 'error-handling', 'integration'],
      isAnswered: true,
      isPinned: false
    },
    {
      id: 5,
      title: 'Security considerations for client-side processing',
      author: 'security_pro',
      replies: 27,
      views: 1834,
      lastActivity: '2 days ago',
      tags: ['security', 'client-side', 'best-practices'],
      isAnswered: false,
      isPinned: true
    }
  ];

  const repositories = [
    {
      name: 'steganqr-javascript-sdk',
      description: 'Official JavaScript/Node.js SDK with TypeScript support',
      language: 'JavaScript',
      stars: 1247,
      forks: 89,
      lastUpdate: '3 days ago',
      license: 'MIT',
      topics: ['steganography', 'qr-codes', 'sdk', 'typescript']
    },
    {
      name: 'steganqr-python-sdk',
      description: 'Python SDK with NumPy and PIL integration',
      language: 'Python',
      stars: 892,
      forks: 67,
      lastUpdate: '1 week ago',
      license: 'MIT',
      topics: ['python', 'steganography', 'image-processing', 'numpy']
    },
    {
      name: 'steganqr-examples',
      description: 'Code examples and integration patterns for various platforms',
      language: 'Multiple',
      stars: 543,
      forks: 156,
      lastUpdate: '5 days ago',
      license: 'Apache-2.0',
      topics: ['examples', 'tutorials', 'integration', 'samples']
    },
    {
      name: 'steganqr-cli-tools',
      description: 'Command-line tools for batch processing and automation',
      language: 'Go',
      stars: 234,
      forks: 23,
      lastUpdate: '2 weeks ago',
      license: 'MIT',
      topics: ['cli', 'automation', 'batch-processing', 'tools']
    },
    {
      name: 'steganqr-mobile-demo',
      description: 'React Native demo app showcasing mobile integration',
      language: 'JavaScript',
      stars: 189,
      forks: 45,
      lastUpdate: '1 week ago',
      license: 'MIT',
      topics: ['react-native', 'mobile', 'demo', 'ios', 'android']
    }
  ];

  const contributionGuidelines = [
    {
      category: 'Code Contributions',
      icon: 'Code',
      guidelines: [
        'Fork the repository and create a feature branch',
        'Follow the existing code style and conventions',
        'Write comprehensive tests for new functionality',
        'Update documentation for API changes',
        'Submit pull requests with clear descriptions',
        'Respond to code review feedback promptly'
      ]
    },
    {
      category: 'Documentation',
      icon: 'FileText',
      guidelines: [
        'Improve existing documentation clarity',
        'Add missing code examples and tutorials',
        'Translate documentation to other languages',
        'Create video tutorials and guides',
        'Report and fix documentation errors',
        'Suggest new documentation topics'
      ]
    },
    {
      category: 'Community Support',
      icon: 'Users',
      guidelines: [
        'Answer questions in the developer forum',
        'Help newcomers get started with the API',
        'Share your integration experiences',
        'Report bugs and suggest improvements',
        'Participate in community discussions',
        'Mentor other developers'
      ]
    },
    {
      category: 'Research & Innovation',
      icon: 'Lightbulb',
      guidelines: [
        'Propose new steganographic algorithms',
        'Contribute to security research',
        'Share performance optimization techniques',
        'Develop new use case examples',
        'Participate in academic collaborations',
        'Present at conferences and meetups'
      ]
    }
  ];

  const supportChannels = [
    {
      channel: 'Developer Forum',
      description: 'Community-driven support with peer assistance',
      responseTime: '< 2 hours',
      availability: '24/7',
      bestFor: ['General questions', 'Best practices', 'Code examples', 'Community discussions'],
      icon: 'MessageSquare',
      color: 'text-blue-600'
    },
    {
      channel: 'GitHub Issues',
      description: 'Bug reports and feature requests',
      responseTime: '< 24 hours',
      availability: 'Business hours',
      bestFor: ['Bug reports', 'Feature requests', 'SDK issues', 'Documentation errors'],
      icon: 'Github',
      color: 'text-gray-600'
    },
    {
      channel: 'Email Support',
      description: 'Direct support for technical issues',
      responseTime: '< 4 hours',
      availability: 'Business hours',
      bestFor: ['Account issues', 'Billing questions', 'Technical problems', 'Integration help'],
      icon: 'Mail',
      color: 'text-green-600'
    },
    {
      channel: 'Discord Community',
      description: 'Real-time chat with developers and team',
      responseTime: '< 30 minutes',
      availability: '24/7',
      bestFor: ['Quick questions', 'Real-time help', 'Networking', 'Announcements'],
      icon: 'MessageCircle',
      color: 'text-purple-600'
    },
    {
      channel: 'Stack Overflow',
      description: 'Technical Q&A with the broader community',
      responseTime: 'Varies',
      availability: '24/7',
      bestFor: ['Complex problems', 'Code debugging', 'Algorithm questions', 'Public knowledge'],
      icon: 'HelpCircle',
      color: 'text-orange-600'
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'forum':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-foreground">Recent Discussions</h4>
                <p className="text-sm text-muted-foreground">Join the conversation with fellow developers</p>
              </div>
              <Button variant="default" size="sm" iconName="Plus" iconSize={14}>
                New Topic
              </Button>
            </div>
            {forumTopics?.map((topic) => (
              <div key={topic?.id} className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {topic?.isPinned && (
                      <Icon name="Pin" size={14} className="text-accent" />
                    )}
                    <h5 className="font-medium text-foreground hover:text-accent cursor-pointer">
                      {topic?.title}
                    </h5>
                    {topic?.isAnswered && (
                      <Icon name="CheckCircle" size={14} className="text-success" />
                    )}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {topic?.tags?.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-4">
                    <span>by {topic?.author}</span>
                    <span className="flex items-center space-x-1">
                      <Icon name="MessageSquare" size={14} />
                      <span>{topic?.replies} replies</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Icon name="Eye" size={14} />
                      <span>{topic?.views} views</span>
                    </span>
                  </div>
                  <span>{topic?.lastActivity}</span>
                </div>
              </div>
            ))}
            <div className="text-center pt-4">
              <Button variant="outline" iconName="ArrowRight" iconSize={14}>
                View All Topics
              </Button>
            </div>
          </div>
        );

      case 'repositories':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-foreground">Open Source Repositories</h4>
                <p className="text-sm text-muted-foreground">Explore our SDKs, tools, and examples</p>
              </div>
              <Button variant="outline" size="sm" iconName="ExternalLink" iconSize={14}>
                View on GitHub
              </Button>
            </div>
            {repositories?.map((repo, index) => (
              <div key={index} className="p-4 border border-border rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h5 className="font-medium text-foreground mb-1">{repo?.name}</h5>
                    <p className="text-sm text-muted-foreground">{repo?.description}</p>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={14} />
                      <span>{repo?.stars}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="GitFork" size={14} />
                      <span>{repo?.forks}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {repo?.topics?.map((topic, idx) => (
                    <span key={idx} className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">
                      {topic}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-4">
                    <span>{repo?.language}</span>
                    <span>{repo?.license}</span>
                    <span>Updated {repo?.lastUpdate}</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" iconName="Eye" iconSize={14}>
                      View
                    </Button>
                    <Button variant="ghost" size="sm" iconName="Download" iconSize={14}>
                      Clone
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'contributions':
        return (
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-foreground mb-2">Contribution Guidelines</h4>
              <p className="text-sm text-muted-foreground">
                We welcome contributions from the community. Here's how you can get involved:
              </p>
            </div>
            {contributionGuidelines?.map((category, index) => (
              <div key={index} className="p-4 border border-border rounded-lg">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Icon name={category?.icon} size={16} className="text-accent" />
                  </div>
                  <h5 className="font-medium text-foreground">{category?.category}</h5>
                </div>
                
                <div className="space-y-2">
                  {category?.guidelines?.map((guideline, idx) => (
                    <div key={idx} className="flex items-start space-x-2">
                      <Icon name="CheckCircle" size={14} className="text-success mt-0.5" />
                      <span className="text-sm text-muted-foreground">{guideline}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div className="p-4 bg-accent/5 border border-accent/20 rounded-lg">
              <h5 className="font-medium text-foreground mb-2">Recognition Program</h5>
              <p className="text-sm text-muted-foreground mb-3">
                We recognize and reward valuable contributions to the SteganQR ecosystem:
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Contributor badges and profile recognition</li>
                <li>• Early access to new features and APIs</li>
                <li>• Invitation to exclusive developer events</li>
                <li>• Potential collaboration opportunities</li>
                <li>• Swag and merchandise for top contributors</li>
              </ul>
            </div>
          </div>
        );

      case 'support':
        return (
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-foreground mb-2">Support Channels</h4>
              <p className="text-sm text-muted-foreground">
                Choose the best support channel for your needs:
              </p>
            </div>
            {supportChannels?.map((channel, index) => (
              <div key={index} className="p-4 border border-border rounded-lg">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-muted/50 rounded-lg flex items-center justify-center">
                    <Icon name={channel?.icon} size={20} className={channel?.color} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-foreground">{channel?.channel}</h5>
                      <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                        <span>Response: {channel?.responseTime}</span>
                        <span>Available: {channel?.availability}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">{channel?.description}</p>
                    
                    <div>
                      <p className="text-sm font-medium text-foreground mb-1">Best for:</p>
                      <div className="flex flex-wrap gap-1">
                        {channel?.bestFor?.map((item, idx) => (
                          <span key={idx} className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="p-4 bg-success/5 border border-success/20 rounded-lg">
              <div className="flex items-start space-x-3">
                <Icon name="Heart" size={20} className="text-success mt-0.5" />
                <div>
                  <h5 className="font-medium text-foreground mb-1">Community First</h5>
                  <p className="text-sm text-muted-foreground">
                    Our community is our greatest asset. We encourage developers to help each other, 
                    share knowledge, and build amazing things together. Join our Discord server to 
                    connect with fellow developers and the SteganQR team.
                  </p>
                  <div className="mt-3">
                    <Button variant="default" size="sm" iconName="ExternalLink" iconSize={14}>
                      Join Discord Community
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
          <Icon name="Users" size={20} className="text-accent" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Community Resources</h3>
          <p className="text-sm text-muted-foreground">Connect, contribute, and get support from the developer community</p>
        </div>
      </div>
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-border">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium transition-all duration-200 border-b-2 ${
              activeTab === tab?.id
                ? 'border-accent text-accent' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
            }`}
          >
            <Icon name={tab?.icon} size={16} />
            <span>{tab?.name}</span>
          </button>
        ))}
      </div>
      {/* Tab Content */}
      {renderContent()}
    </div>
  );
};

export default CommunityResources;