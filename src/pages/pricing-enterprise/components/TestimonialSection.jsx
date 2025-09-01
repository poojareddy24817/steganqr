import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TestimonialSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "CISO",
      company: "TechCorp Industries",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      content: `SteganQR transformed our secure communications. The custom algorithm development gave us a competitive edge while maintaining the highest security standards. ROI was achieved within 6 months.`,
      rating: 5,
      metrics: {
        implementation: "6 months",
        roi: "340%",
        incidents: "85% reduction"
      }
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      role: "Head of Security",
      company: "Global Finance Corp",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      content: `The compliance features and audit trails were exactly what we needed for our regulatory requirements. The dedicated support team made implementation seamless across our global offices.`,
      rating: 5,
      metrics: {
        compliance: "100%",
        deployment: "12 countries",
        support: "< 1 hour"
      }
    },
    {
      id: 3,
      name: "Dr. Emily Watson",
      role: "Research Director",
      company: "MedTech Solutions",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
      content: `HIPAA compliance was critical for our patient data protection. SteganQR's on-premise deployment and custom security protocols exceeded our expectations for healthcare data security.`,
      rating: 5,
      metrics: {
        security: "Zero breaches",
        compliance: "HIPAA certified",
        efficiency: "60% faster"
      }
    }
  ];

  const companyLogos = [
    { name: "TechCorp", width: "120px" },
    { name: "GlobalFinance", width: "140px" },
    { name: "MedTech", width: "110px" },
    { name: "SecureBank", width: "130px" },
    { name: "DataShield", width: "125px" },
    { name: "CyberGuard", width: "135px" }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={16}
        className={index < rating ? "text-warning fill-current" : "text-muted-foreground"}
      />
    ));
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-primary mb-4">Trusted by Enterprise Leaders</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          See how organizations worldwide are securing their communications with SteganQR
        </p>
      </div>
      {/* Company Logos */}
      <div className="bg-muted/30 rounded-xl p-8">
        <div className="text-center mb-6">
          <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            Trusted by 500+ Enterprise Customers
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
          {companyLogos?.map((logo, index) => (
            <div 
              key={index}
              className="bg-card rounded-lg px-6 py-3 border border-border shadow-sm"
              style={{ width: logo?.width }}
            >
              <div className="text-center font-semibold text-muted-foreground">
                {logo?.name}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Testimonials */}
      <div className="grid lg:grid-cols-3 gap-8">
        {testimonials?.map((testimonial) => (
          <div 
            key={testimonial?.id}
            className="bg-card rounded-xl border border-border p-6 hover:shadow-brand-modal transition-all duration-300"
          >
            {/* Rating */}
            <div className="flex items-center space-x-1 mb-4">
              {renderStars(testimonial?.rating)}
            </div>

            {/* Content */}
            <blockquote className="text-foreground mb-6 leading-relaxed">
              "{testimonial?.content}"
            </blockquote>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-muted/30 rounded-lg">
              {Object.entries(testimonial?.metrics)?.map(([key, value], index) => (
                <div key={index} className="text-center">
                  <div className="text-lg font-bold text-accent">{value}</div>
                  <div className="text-xs text-muted-foreground capitalize">{key}</div>
                </div>
              ))}
            </div>

            {/* Author */}
            <div className="flex items-center space-x-3">
              <Image
                src={testimonial?.avatar}
                alt={testimonial?.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <div className="font-semibold text-primary">{testimonial?.name}</div>
                <div className="text-sm text-muted-foreground">
                  {testimonial?.role}, {testimonial?.company}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Success Metrics */}
      <div className="bg-gradient-to-r from-accent/10 to-success/10 rounded-xl p-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-primary mb-2">Enterprise Success Metrics</h3>
          <p className="text-muted-foreground">
            Real results from our enterprise customers
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-accent mb-2">99.9%</div>
            <div className="text-sm text-muted-foreground">Uptime SLA</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-success mb-2">85%</div>
            <div className="text-sm text-muted-foreground">Incident Reduction</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent mb-2">6 months</div>
            <div className="text-sm text-muted-foreground">Average ROI</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-success mb-2">500+</div>
            <div className="text-sm text-muted-foreground">Enterprise Clients</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;