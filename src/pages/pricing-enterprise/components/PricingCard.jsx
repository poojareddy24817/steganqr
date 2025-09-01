import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const PricingCard = ({ plan, isPopular = false, onSelectPlan }) => {
  const {
    name,
    price,
    period,
    description,
    features,
    limitations,
    buttonText,
    buttonVariant = 'default'
  } = plan;

  return (
    <div className={`relative bg-card rounded-xl border-2 transition-all duration-300 hover:shadow-brand-modal ${
      isPopular 
        ? 'border-accent shadow-brand-card scale-105' 
        : 'border-border hover:border-accent/50'
    }`}>
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-medium shadow-brand-card">
            Most Popular
          </div>
        </div>
      )}
      <div className="p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-primary mb-2">{name}</h3>
          <p className="text-muted-foreground mb-6">{description}</p>
          
          <div className="flex items-baseline justify-center">
            <span className="text-4xl font-bold text-primary">${price}</span>
            {period && <span className="text-muted-foreground ml-2">/{period}</span>}
          </div>
        </div>

        {/* Features */}
        <div className="space-y-4 mb-8">
          {features?.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <Icon 
                name="Check" 
                size={16} 
                className="text-success mt-1 flex-shrink-0" 
              />
              <span className="text-sm text-foreground">{feature}</span>
            </div>
          ))}
          
          {limitations && limitations?.map((limitation, index) => (
            <div key={index} className="flex items-start space-x-3">
              <Icon 
                name="X" 
                size={16} 
                className="text-muted-foreground mt-1 flex-shrink-0" 
              />
              <span className="text-sm text-muted-foreground">{limitation}</span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <Button
          variant={buttonVariant}
          size="lg"
          fullWidth
          onClick={() => onSelectPlan(plan)}
          className={isPopular ? 'bg-accent hover:bg-accent/90' : ''}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default PricingCard;