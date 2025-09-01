import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const IntegrationExamples = () => {
  const [selectedExample, setSelectedExample] = useState('ecommerce');

  const examples = [
    {
      id: 'ecommerce',
      title: 'E-commerce Product Authentication',
      description: 'Embed authentication data in product images to prevent counterfeiting',
      icon: 'ShoppingCart',
      color: 'text-green-600'
    },
    {
      id: 'social',
      title: 'Social Media Content Protection',
      description: 'Protect digital content with invisible watermarks and ownership data',
      icon: 'Share2',
      color: 'text-blue-600'
    },
    {
      id: 'document',
      title: 'Document Verification System',
      description: 'Secure document authentication with embedded verification codes',
      icon: 'FileCheck',
      color: 'text-purple-600'
    },
    {
      id: 'marketing',
      title: 'Interactive Marketing Campaigns',
      description: 'Create engaging campaigns with hidden messages and exclusive content',
      icon: 'Megaphone',
      color: 'text-orange-600'
    }
  ];

  const codeExamples = {
    ecommerce: {
      title: 'Product Authentication Flow',
      description: 'Complete implementation for e-commerce product verification',
      code: `// Product Authentication Service
class ProductAuthService {
  constructor(apiKey) {
    this.client = new SteganQR({ apiKey });
  }

  // Generate authenticated product image
  async authenticateProduct(productData, originalImage) {
    const authData = {
      productId: productData.id,
      manufacturerId: productData.manufacturerId,
      timestamp: Date.now(),
      batchNumber: productData.batch,
      authenticity: this.generateAuthHash(productData)
    };

    try {
      const result = await this.client.generate({
        data: JSON.stringify(authData),
        coverImage: originalImage,
        algorithm: 'dct-spread', // More robust for product images
        stegoOptions: {
          strength: 0.9,
          distribution: 'uniform',
          encryption: true
        }
      });

      return {
        authenticatedImage: result.stegoImage,
        qrCode: result.qrCode,
        authenticationId: result.requestId
      };
    } catch (error) {
      throw new Error(\`Authentication failed: \${error.message}\`);
    }
  }

  // Verify product authenticity
  async verifyProduct(productImage) {
    try {
      const result = await this.client.decode({
        image: productImage,
        algorithm: 'dct-spread'
      });

      const authData = JSON.parse(result.extractedData);
      
      // Verify authentication hash
      const isValid = this.verifyAuthHash(authData);
      
      return {
        isAuthentic: isValid && result.confidence > 0.85,
        productInfo: authData,
        confidence: result.confidence,
        verificationTime: new Date().toISOString()
      };
    } catch (error) {
      return {
        isAuthentic: false,
        error: error.message
      };
    }
  }

  generateAuthHash(productData) {
    // Implementation of secure hash generation
    return crypto.createHash('sha256')
      .update(\`\${productData.id}-\${productData.manufacturerId}-\${productData.batch}\`)
      .digest('hex');
  }

  verifyAuthHash(authData) {
    const expectedHash = this.generateAuthHash({
      id: authData.productId,
      manufacturerId: authData.manufacturerId,
      batch: authData.batchNumber
    });
    return expectedHash === authData.authenticity;
  }
}

// Usage Example
const authService = new ProductAuthService('your-api-key');

// Authenticate a product
const authenticatedProduct = await authService.authenticateProduct({
  id: 'PROD-12345',
  manufacturerId: 'MFG-001',
  batch: 'BATCH-2024-001'
}, productImageBase64);

// Verify a product
const verification = await authService.verifyProduct(suspiciousImageBase64);
console.log('Product is authentic:', verification.isAuthentic);`
    },
    social: {
      title: 'Social Media Content Protection',
      description: 'Protect digital content with invisible watermarks',
      code: `// Social Media Content Protection
class ContentProtectionService {
  constructor(apiKey, creatorId) {
    this.client = new SteganQR({ apiKey });
    this.creatorId = creatorId;
  }

  // Protect content with invisible watermark
  async protectContent(originalImage, contentMetadata) {
    const protectionData = {
      creatorId: this.creatorId,
      contentId: contentMetadata.id,
      creationDate: new Date().toISOString(),
      license: contentMetadata.license || 'all-rights-reserved',
      usage: contentMetadata.allowedUsage || 'personal-only',
      signature: this.generateContentSignature(contentMetadata)
    };

    try {
      const result = await this.client.generate({
        data: JSON.stringify(protectionData),
        coverImage: originalImage,
        algorithm: 'wavelet-transform', // Best for photos
        stegoOptions: {
          strength: 0.7, // Subtle for social media
          distribution: 'random',
          encryption: true
        }
      });

      return {
        protectedImage: result.stegoImage,
        protectionId: result.requestId,
        metadata: protectionData
      };
    } catch (error) {
      throw new Error(\`Content protection failed: \${error.message}\`);
    }
  }

  // Detect and extract protection data
  async checkContentProtection(suspiciousImage) {
    try {
      const result = await this.client.decode({
        image: suspiciousImage,
        algorithm: 'wavelet-transform'
      });

      const protectionData = JSON.parse(result.extractedData);
      
      return {
        isProtected: true,
        owner: protectionData.creatorId,
        contentInfo: protectionData,
        confidence: result.confidence,
        detectionTime: new Date().toISOString()
      };
    } catch (error) {
      return {
        isProtected: false,
        message: 'No protection data found'
      };
    }
  }

  // Batch process for social media monitoring
  async monitorPlatform(imageUrls) {
    const results = [];
    
    for (const imageUrl of imageUrls) {
      try {
        const imageData = await this.fetchImageAsBase64(imageUrl);
        const protection = await this.checkContentProtection(imageData);
        
        results.push({
          url: imageUrl,
          ...protection
        });
      } catch (error) {
        results.push({
          url: imageUrl,
          error: error.message
        });
      }
    }
    
    return results;
  }

  generateContentSignature(metadata) {
    return crypto.createHash('sha256')
      .update(\`\${this.creatorId}-\${metadata.id}-\${metadata.title}\`)
      .digest('hex');
  }

  async fetchImageAsBase64(url) {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    return btoa(String.fromCharCode(...new Uint8Array(buffer)));
  }
}

// Usage Example
const protectionService = new ContentProtectionService('your-api-key', 'creator-123');

// Protect original content
const protected = await protectionService.protectContent(originalImage, {
  id: 'content-456',
  title: 'My Artwork',
  license: 'creative-commons',
  allowedUsage: 'non-commercial'
});

// Monitor for unauthorized usage
const suspiciousUrls = [
  'https://example.com/suspicious-image1.jpg',
  'https://example.com/suspicious-image2.jpg'
];

const monitoringResults = await protectionService.monitorPlatform(suspiciousUrls);
monitoringResults.forEach(result => {
  if (result.isProtected) {
    console.log(\`Protected content found: \${result.url}\`);
    console.log(\`Original owner: \${result.owner}\`);
  }
});`
    },
    document: {
      title: 'Document Verification System',
      description: 'Secure document authentication with embedded verification codes',
      code: `// Document Verification System
class DocumentVerificationService {
  constructor(apiKey, organizationId) {
    this.client = new SteganQR({ apiKey });
    this.organizationId = organizationId;
  }

  // Issue verified document
  async issueDocument(documentImage, documentData) {
    const verificationData = {
      organizationId: this.organizationId,
      documentId: documentData.id,
      documentType: documentData.type,
      issuedTo: documentData.recipient,
      issueDate: new Date().toISOString(),
      expiryDate: documentData.expiryDate,
      verificationLevel: documentData.level || 'standard',
      digitalSignature: await this.generateDigitalSignature(documentData)
    };

    try {
      const result = await this.client.generate({
        data: JSON.stringify(verificationData),
        coverImage: documentImage,
        algorithm: 'lsb-enhanced', // Good for documents
        stegoOptions: {
          strength: 0.95, // High strength for security
          distribution: 'structured',
          encryption: true
        }
      });

      // Store verification record
      await this.storeVerificationRecord(result.requestId, verificationData);

      return {
        verifiedDocument: result.stegoImage,
        verificationQR: result.qrCode,
        verificationId: result.requestId,
        verificationData
      };
    } catch (error) {
      throw new Error(\`Document verification failed: \${error.message}\`);
    }
  }

  // Verify document authenticity
  async verifyDocument(documentImage) {
    try {
      const result = await this.client.decode({
        image: documentImage,
        algorithm: 'lsb-enhanced'
      });

      const verificationData = JSON.parse(result.extractedData);
      
      // Cross-reference with stored records
      const storedRecord = await this.getVerificationRecord(verificationData.documentId);
      
      const isValid = this.validateDocument(verificationData, storedRecord);
      const isExpired = new Date() > new Date(verificationData.expiryDate);

      return {
        isValid: isValid && !isExpired,
        isExpired,
        documentInfo: verificationData,
        confidence: result.confidence,
        verificationTime: new Date().toISOString(),
        issuer: verificationData.organizationId
      };
    } catch (error) {
      return {
        isValid: false,
        error: 'Document verification failed',
        details: error.message
      };
    }
  }

  // Batch verification for multiple documents
  async batchVerifyDocuments(documentImages) {
    const batchRequest = {
      operations: documentImages.map((image, index) => ({
        type: 'decode',
        image: image,
        algorithm: 'lsb-enhanced',
        operationId: index
      })),
      options: {
        parallel: true,
        maxConcurrency: 5
      }
    };

    try {
      const result = await this.client.batch(batchRequest);
      
      const verificationResults = await Promise.all(
        result.data.results.map(async (opResult, index) => {
          if (opResult.success) {
            const verificationData = JSON.parse(opResult.data.extractedData);
            const storedRecord = await this.getVerificationRecord(verificationData.documentId);
            const isValid = this.validateDocument(verificationData, storedRecord);
            
            return {
              documentIndex: index,
              isValid,
              documentInfo: verificationData,
              confidence: opResult.data.confidence
            };
          } else {
            return {
              documentIndex: index,
              isValid: false,
              error: opResult.error
            };
          }
        })
      );

      return {
        totalDocuments: documentImages.length,
        validDocuments: verificationResults.filter(r => r.isValid).length,
        results: verificationResults
      };
    } catch (error) {
      throw new Error(\`Batch verification failed: \${error.message}\`);
    }
  }

  async generateDigitalSignature(documentData) {
    // Implementation would use proper cryptographic signing
    const dataString = \`\${documentData.id}-\${documentData.type}-\${documentData.recipient}\`;
    return crypto.createHash('sha256').update(dataString).digest('hex');
  }

  validateDocument(verificationData, storedRecord) {
    return storedRecord && 
           storedRecord.documentId === verificationData.documentId &&
           storedRecord.digitalSignature === verificationData.digitalSignature;
  }

  async storeVerificationRecord(verificationId, data) {
    // Implementation would store in secure database
    console.log(\`Storing verification record: \${verificationId}\`);
  }

  async getVerificationRecord(documentId) {
    // Implementation would retrieve from secure database
    return { documentId, digitalSignature: 'stored-signature' };
  }
}

// Usage Example
const docService = new DocumentVerificationService('your-api-key', 'org-123');

// Issue a verified certificate
const verifiedCertificate = await docService.issueDocument(certificateImage, {
  id: 'CERT-2024-001',
  type: 'completion-certificate',
  recipient: 'John Doe',
  expiryDate: '2025-12-31T23:59:59Z',
  level: 'premium'
});

// Verify a document
const verification = await docService.verifyDocument(suspiciousDocument);
if (verification.isValid) {
  console.log('Document is authentic');
  console.log('Issued by:', verification.issuer);
} else {
  console.log('Document verification failed');
}`
    },
    marketing: {
      title: 'Interactive Marketing Campaigns',
      description: 'Create engaging campaigns with hidden messages and exclusive content',
      code: `// Interactive Marketing Campaign System
class MarketingCampaignService {
  constructor(apiKey, brandId) {
    this.client = new SteganQR({ apiKey });
    this.brandId = brandId;
  }

  // Create campaign with hidden content
  async createCampaignAsset(campaignImage, campaignData) {
    const hiddenContent = {
      brandId: this.brandId,
      campaignId: campaignData.id,
      campaignName: campaignData.name,
      secretMessage: campaignData.hiddenMessage,
      exclusiveOffer: campaignData.offer,
      unlockCode: this.generateUnlockCode(),
      validUntil: campaignData.endDate,
      targetAudience: campaignData.audience,
      engagementLevel: campaignData.level || 'standard'
    };

    try {
      const result = await this.client.generate({
        data: JSON.stringify(hiddenContent),
        coverImage: campaignImage,
        algorithm: 'dct-spread', // Good for marketing images
        stegoOptions: {
          strength: 0.8,
          distribution: 'artistic', // Maintains visual appeal
          encryption: true
        }
      });

      // Track campaign asset creation
      await this.trackCampaignAsset(result.requestId, hiddenContent);

      return {
        campaignImage: result.stegoImage,
        discoveryQR: result.qrCode,
        assetId: result.requestId,
        unlockCode: hiddenContent.unlockCode
      };
    } catch (error) {
      throw new Error(\`Campaign creation failed: \${error.message}\`);
    }
  }

  // Discover hidden campaign content
  async discoverCampaign(campaignImage, userContext = {}) {
    try {
      const result = await this.client.decode({
        image: campaignImage,
        algorithm: 'dct-spread'
      });

      const campaignContent = JSON.parse(result.extractedData);
      
      // Check if campaign is still valid
      const isValid = new Date() < new Date(campaignContent.validUntil);
      
      if (!isValid) {
        return {
          discovered: false,
          message: 'Campaign has expired'
        };
      }

      // Log engagement
      await this.logEngagement(campaignContent.campaignId, userContext);

      return {
        discovered: true,
        campaignInfo: {
          name: campaignContent.campaignName,
          message: campaignContent.secretMessage,
          offer: campaignContent.exclusiveOffer,
          unlockCode: campaignContent.unlockCode
        },
        confidence: result.confidence,
        discoveryTime: new Date().toISOString()
      };
    } catch (error) {
      return {
        discovered: false,
        message: 'No hidden campaign found'
      };
    }
  }

  // Create multi-level campaign (treasure hunt style)
  async createMultiLevelCampaign(campaignLevels) {
    const levelAssets = [];

    for (let i = 0; i < campaignLevels.length; i++) {
      const level = campaignLevels[i];
      const nextLevelHint = i < campaignLevels.length - 1 ? 
        campaignLevels[i + 1].hint : 'Congratulations! Campaign completed!';

      const levelData = {
        ...level,
        levelNumber: i + 1,
        totalLevels: campaignLevels.length,
        nextHint: nextLevelHint,
        completionReward: i === campaignLevels.length - 1 ? level.finalReward : null
      };

      const asset = await this.createCampaignAsset(level.image, levelData);
      levelAssets.push({
        level: i + 1,
        ...asset
      });
    }

    return {
      campaignId: campaignLevels[0].id,
      totalLevels: campaignLevels.length,
      levelAssets
    };
  }

  // Analytics for campaign performance
  async getCampaignAnalytics(campaignId) {
    try {
      // This would typically query your analytics database
      const analytics = await this.fetchCampaignMetrics(campaignId);
      
      return {
        campaignId,
        totalDiscoveries: analytics.discoveries,
        uniqueUsers: analytics.uniqueUsers,
        engagementRate: analytics.engagementRate,
        conversionRate: analytics.conversionRate,
        topDiscoveryLocations: analytics.locations,
        timeToDiscover: analytics.averageDiscoveryTime,
        deviceBreakdown: analytics.devices,
        generatedAt: new Date().toISOString()
      };
    } catch (error) {
      throw new Error(\`Analytics retrieval failed: \${error.message}\`);
    }
  }

  generateUnlockCode() {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
  }

  async trackCampaignAsset(assetId, content) {
    // Implementation would store in analytics database
    console.log(\`Tracking campaign asset: \${assetId}\`);
  }

  async logEngagement(campaignId, userContext) {
    // Implementation would log user engagement
    console.log(\`Engagement logged for campaign: \${campaignId}\`);
  }

  async fetchCampaignMetrics(campaignId) {
    // Mock analytics data - would come from real analytics service
    return {
      discoveries: 1250,
      uniqueUsers: 980,
      engagementRate: 0.78,
      conversionRate: 0.23,
      locations: ['New York', 'Los Angeles', 'Chicago'],
      averageDiscoveryTime: 45, // seconds
      devices: { mobile: 0.65, desktop: 0.25, tablet: 0.10 }
    };
  }
}

// Usage Example
const marketingService = new MarketingCampaignService('your-api-key', 'brand-456');

// Create a single-level campaign
const campaignAsset = await marketingService.createCampaignAsset(posterImage, {
  id: 'SUMMER-2024',
  name: 'Summer Discovery Campaign',
  hiddenMessage: 'You found our secret summer sale!',
  offer: '30% off all summer items with code HIDDEN30',
  endDate: '2024-08-31T23:59:59Z',
  audience: 'premium-customers'
});

// Create multi-level treasure hunt campaign
const treasureHunt = await marketingService.createMultiLevelCampaign([
  {
    id: 'HUNT-LEVEL-1',
    image: level1Image,
    hint: 'Look for the golden gate in our store window',
    reward: '10% discount code'
  },
  {
    id: 'HUNT-LEVEL-2', 
    image: level2Image,
    hint: 'The final treasure awaits in our VIP section',
    reward: '25% discount code'
  },
  {
    id: 'HUNT-LEVEL-3',
    image: level3Image,
    finalReward: 'Exclusive VIP membership + 50% off'
  }
]);

// Discover campaign content
const discovery = await marketingService.discoverCampaign(mysteriousImage, {
  userId: 'user-789',
  location: 'New York',
  device: 'mobile'
});

if (discovery.discovered) {
  console.log('Hidden message:', discovery.campaignInfo.message);
  console.log('Exclusive offer:', discovery.campaignInfo.offer);
  console.log('Unlock code:', discovery.campaignInfo.unlockCode);
}

// Get campaign performance
const analytics = await marketingService.getCampaignAnalytics('SUMMER-2024');
console.log(\`Campaign discovered by \${analytics.uniqueUsers} users\`);
console.log(\`Conversion rate: \${(analytics.conversionRate * 100).toFixed(1)}%\`);`
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
          <Icon name="Code2" size={20} className="text-accent" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Integration Examples</h3>
          <p className="text-sm text-muted-foreground">Real-world implementation patterns and use cases</p>
        </div>
      </div>
      {/* Example Selector */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {examples?.map((example) => (
          <button
            key={example?.id}
            onClick={() => setSelectedExample(example?.id)}
            className={`p-4 rounded-lg border text-left transition-all duration-200 ${
              selectedExample === example?.id
                ? 'border-accent bg-accent/5' :'border-border hover:border-accent/50 hover:bg-accent/5'
            }`}
          >
            <div className="flex items-center space-x-2 mb-3">
              <Icon name={example?.icon} size={20} className={example?.color} />
              <h4 className="font-medium text-foreground">{example?.title}</h4>
            </div>
            <p className="text-sm text-muted-foreground">{example?.description}</p>
          </button>
        ))}
      </div>
      {/* Code Example */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-foreground">{codeExamples?.[selectedExample]?.title}</h4>
            <p className="text-sm text-muted-foreground">{codeExamples?.[selectedExample]?.description}</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigator.clipboard?.writeText(codeExamples?.[selectedExample]?.code)}
            iconName="Copy"
            iconSize={14}
          >
            Copy Code
          </Button>
        </div>

        <div className="bg-slate-900 rounded-lg overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <span className="text-sm text-slate-300 font-mono">JavaScript Implementation</span>
          </div>
          <div className="max-h-96 overflow-auto">
            <pre className="p-4 text-sm text-slate-100">
              <code>{codeExamples?.[selectedExample]?.code}</code>
            </pre>
          </div>
        </div>
      </div>
      {/* Implementation Notes */}
      <div className="mt-6 p-4 bg-accent/5 border border-accent/20 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={20} className="text-accent mt-0.5" />
          <div>
            <h4 className="font-medium text-foreground mb-2">Implementation Notes</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• All examples include proper error handling and validation</li>
              <li>• Replace 'your-api-key' with your actual API key from the dashboard</li>
              <li>• Consider implementing rate limiting and caching for production use</li>
              <li>• Use appropriate algorithms based on your image types and requirements</li>
              <li>• Store sensitive data securely and follow data protection regulations</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationExamples;