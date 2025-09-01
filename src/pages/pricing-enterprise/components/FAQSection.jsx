import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState(0);

  const faqs = [
    {
      category: "Pricing & Billing",
      questions: [
        {
          question: "Are there any hidden fees or setup costs?",
          answer: "No, our pricing is completely transparent. What you see is what you pay. There are no setup fees, hidden charges, or surprise costs. Enterprise plans include all features listed, and any additional services are clearly outlined in your custom quote."
        },
        {
          question: "Can I switch between plans at any time?",
          answer: "Yes, you can upgrade or downgrade your plan at any time. Upgrades take effect immediately, while downgrades take effect at the next billing cycle. We'll prorate any charges to ensure fair billing."
        },
        {
          question: "Do you offer annual discounts?",
          answer: "Yes, annual subscriptions receive a 20% discount compared to monthly billing. Enterprise customers can also negotiate custom terms for multi-year agreements with additional savings."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards, ACH transfers, and wire transfers. Enterprise customers can also pay via purchase orders and invoicing with NET 30 terms."
        }
      ]
    },
    {
      category: "Enterprise Features",
      questions: [
        {
          question: "What\'s included in custom algorithm development?",
          answer: "Our team works with you to develop proprietary steganographic algorithms tailored to your specific security requirements. This includes algorithm design, testing, implementation, documentation, and ongoing support. Development typically takes 4-8 weeks depending on complexity."
        },
        {
          question: "How does on-premise deployment work?",
          answer: "We provide complete on-premise deployment including installation, configuration, and training. Your data never leaves your infrastructure. We support various deployment options including Docker containers, Kubernetes, and traditional server installations."
        },
        {
          question: "What compliance certifications do you maintain?",
          answer: "We maintain SOC 2 Type II, ISO 27001, and HIPAA compliance. We also provide compliance assistance for GDPR, CCPA, and industry-specific regulations. All certifications are audited annually and documentation is available upon request."
        },
        {
          question: "What does the SLA guarantee cover?",
          answer: "Our Enterprise SLA guarantees 99.9% uptime, 1-hour response time for critical issues, and 4-hour response for standard issues. This includes 24/7 monitoring, proactive alerts, and dedicated support channels."
        }
      ]
    },
    {
      category: "Security & Integration",
      questions: [
        {
          question: "How secure is the steganographic embedding?",
          answer: "We use military-grade encryption (AES-256) combined with proprietary steganographic algorithms. Data is embedded using techniques that are virtually undetectable by standard analysis tools. Enterprise customers can also implement custom encryption keys."
        },
        {
          question: "Can SteganQR integrate with our existing systems?",
          answer: "Yes, we provide comprehensive APIs and SDKs for seamless integration. We support REST APIs, webhooks, and can develop custom integrations for enterprise customers. Our team provides full integration support."
        },
        {
          question: "What happens to our data?",
          answer: "Your data is encrypted at rest and in transit. We never store your embedded content - processing happens in real-time and data is immediately purged. Enterprise customers can opt for on-premise deployment for complete data control."
        },
        {
          question: "Do you provide audit logs?",
          answer: "Yes, comprehensive audit logging is included in Professional and Enterprise plans. Logs include user actions, API calls, processing events, and security events. Logs are tamper-proof and can be exported for compliance purposes."
        }
      ]
    }
  ];

  const toggleFAQ = (categoryIndex, questionIndex) => {
    const faqIndex = categoryIndex * 100 + questionIndex;
    setOpenFAQ(openFAQ === faqIndex ? -1 : faqIndex);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-primary mb-4">Frequently Asked Questions</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Get answers to common questions about pricing, features, and enterprise solutions
        </p>
      </div>
      {/* FAQ Categories */}
      <div className="space-y-8">
        {faqs?.map((category, categoryIndex) => (
          <div key={categoryIndex} className="bg-card rounded-xl border border-border p-6">
            <h3 className="text-xl font-semibold text-primary mb-6 flex items-center space-x-2">
              <Icon 
                name={categoryIndex === 0 ? "CreditCard" : categoryIndex === 1 ? "Shield" : "Settings"} 
                size={20} 
                className="text-accent" 
              />
              <span>{category?.category}</span>
            </h3>

            <div className="space-y-4">
              {category?.questions?.map((faq, questionIndex) => {
                const faqIndex = categoryIndex * 100 + questionIndex;
                const isOpen = openFAQ === faqIndex;

                return (
                  <div 
                    key={questionIndex}
                    className="border border-border rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFAQ(categoryIndex, questionIndex)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                    >
                      <span className="font-medium text-foreground pr-4">
                        {faq?.question}
                      </span>
                      <Icon
                        name={isOpen ? "ChevronUp" : "ChevronDown"}
                        size={20}
                        className="text-muted-foreground flex-shrink-0 transition-transform duration-200"
                      />
                    </button>
                    <div className={`transition-all duration-300 ease-in-out ${
                      isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    } overflow-hidden`}>
                      <div className="px-6 pb-4 text-muted-foreground leading-relaxed">
                        {faq?.answer}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      {/* Contact Support */}
      <div className="bg-muted/30 rounded-xl p-8 text-center">
        <Icon name="MessageCircle" size={48} className="text-accent mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-primary mb-2">Still have questions?</h3>
        <p className="text-muted-foreground mb-6">
          Our team is here to help you find the perfect solution for your needs
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="flex items-center justify-center space-x-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors">
            <Icon name="MessageCircle" size={16} />
            <span>Start Live Chat</span>
          </button>
          <button className="flex items-center justify-center space-x-2 px-6 py-3 border border-border rounded-lg hover:bg-muted transition-colors">
            <Icon name="Mail" size={16} />
            <span>Email Support</span>
          </button>
          <button className="flex items-center justify-center space-x-2 px-6 py-3 border border-border rounded-lg hover:bg-muted transition-colors">
            <Icon name="Phone" size={16} />
            <span>Schedule Call</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;