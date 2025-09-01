import React, { useState, useEffect } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const ROICalculator = () => {
  const [inputs, setInputs] = useState({
    employees: 100,
    securityIncidents: 2,
    incidentCost: 50000,
    currentSolution: 'basic',
    processingVolume: 1000
  });

  const [results, setResults] = useState({
    currentCost: 0,
    steganQRCost: 0,
    savings: 0,
    roi: 0,
    paybackMonths: 0
  });

  const currentSolutionOptions = [
    { value: 'basic', label: 'Basic QR Codes' },
    { value: 'competitor', label: 'Competitor Solution' },
    { value: 'inhouse', label: 'In-house Development' },
    { value: 'none', label: 'No Current Solution' }
  ];

  const calculateROI = () => {
    const { employees, securityIncidents, incidentCost, currentSolution, processingVolume } = inputs;

    // Current solution costs
    let currentMonthlyCost = 0;
    switch (currentSolution) {
      case 'basic':
        currentMonthlyCost = employees * 5; // Basic tools
        break;
      case 'competitor':
        currentMonthlyCost = employees * 15; // Competitor pricing
        break;
      case 'inhouse':
        currentMonthlyCost = employees * 25; // Development costs
        break;
      default:
        currentMonthlyCost = 0;
    }

    // Security incident costs (annual)
    const annualIncidentCost = securityIncidents * incidentCost;

    // SteganQR costs based on volume
    let steganQRMonthlyCost = 0;
    if (processingVolume <= 1000) {
      steganQRMonthlyCost = 49; // Professional plan
    } else if (processingVolume <= 10000) {
      steganQRMonthlyCost = 199; // Enterprise starter
    } else {
      steganQRMonthlyCost = 499; // Enterprise premium
    }

    // Calculate annual costs
    const currentAnnualCost = (currentMonthlyCost * 12) + annualIncidentCost;
    const steganQRAnnualCost = steganQRMonthlyCost * 12;

    // Assume 60% reduction in security incidents with SteganQR
    const reducedIncidentCost = annualIncidentCost * 0.4;
    const totalSteganQRCost = steganQRAnnualCost + reducedIncidentCost;

    const annualSavings = currentAnnualCost - totalSteganQRCost;
    const roi = ((annualSavings / steganQRAnnualCost) * 100);
    const paybackMonths = steganQRAnnualCost / (annualSavings / 12);

    setResults({
      currentCost: currentAnnualCost,
      steganQRCost: totalSteganQRCost,
      savings: annualSavings,
      roi: roi,
      paybackMonths: Math.max(0, paybackMonths)
    });
  };

  useEffect(() => {
    calculateROI();
  }, [inputs]);

  const handleInputChange = (field, value) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(amount);
  };

  return (
    <div className="bg-card rounded-xl border border-border p-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-primary mb-2">ROI Calculator</h3>
        <p className="text-muted-foreground">
          Calculate your potential return on investment with SteganQR
        </p>
      </div>
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <h4 className="text-lg font-semibold text-primary mb-4">Your Current Situation</h4>
          
          <Input
            label="Number of Employees"
            type="number"
            value={inputs?.employees}
            onChange={(e) => handleInputChange('employees', parseInt(e?.target?.value) || 0)}
            placeholder="100"
          />

          <Input
            label="Security Incidents per Year"
            type="number"
            value={inputs?.securityIncidents}
            onChange={(e) => handleInputChange('securityIncidents', parseInt(e?.target?.value) || 0)}
            placeholder="2"
            description="Average number of data breaches or security incidents"
          />

          <Input
            label="Average Cost per Incident"
            type="number"
            value={inputs?.incidentCost}
            onChange={(e) => handleInputChange('incidentCost', parseInt(e?.target?.value) || 0)}
            placeholder="50000"
            description="Including downtime, recovery, and compliance costs"
          />

          <Select
            label="Current Security Solution"
            options={currentSolutionOptions}
            value={inputs?.currentSolution}
            onChange={(value) => handleInputChange('currentSolution', value)}
          />

          <Input
            label="Monthly Processing Volume"
            type="number"
            value={inputs?.processingVolume}
            onChange={(e) => handleInputChange('processingVolume', parseInt(e?.target?.value) || 0)}
            placeholder="1000"
            description="Number of QR codes or secure communications per month"
          />
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          <h4 className="text-lg font-semibold text-primary mb-4">Projected Results</h4>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-error mb-1">
                {formatCurrency(results?.currentCost)}
              </div>
              <div className="text-sm text-muted-foreground">Current Annual Cost</div>
            </div>

            <div className="bg-muted rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-accent mb-1">
                {formatCurrency(results?.steganQRCost)}
              </div>
              <div className="text-sm text-muted-foreground">SteganQR Annual Cost</div>
            </div>
          </div>

          <div className="bg-success/10 rounded-lg p-6 text-center border border-success/20">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Icon name="TrendingUp" size={20} className="text-success" />
              <span className="text-lg font-semibold text-success">Annual Savings</span>
            </div>
            <div className="text-3xl font-bold text-success mb-1">
              {formatCurrency(Math.max(0, results?.savings))}
            </div>
            <div className="text-sm text-success/80">
              {results?.roi > 0 ? `${results?.roi?.toFixed(0)}% ROI` : 'Investment Required'}
            </div>
          </div>

          {results?.paybackMonths > 0 && results?.paybackMonths < 24 && (
            <div className="bg-accent/10 rounded-lg p-4 text-center border border-accent/20">
              <div className="text-lg font-semibold text-accent mb-1">
                Payback Period
              </div>
              <div className="text-2xl font-bold text-accent">
                {results?.paybackMonths?.toFixed(1)} months
              </div>
            </div>
          )}

          <div className="space-y-3 pt-4 border-t border-border">
            <div className="flex items-center space-x-3">
              <Icon name="Shield" size={16} className="text-success" />
              <span className="text-sm text-foreground">60% reduction in security incidents</span>
            </div>
            <div className="flex items-center space-x-3">
              <Icon name="Zap" size={16} className="text-success" />
              <span className="text-sm text-foreground">50% faster secure communication setup</span>
            </div>
            <div className="flex items-center space-x-3">
              <Icon name="Users" size={16} className="text-success" />
              <span className="text-sm text-foreground">Improved team productivity</span>
            </div>
            <div className="flex items-center space-x-3">
              <Icon name="Award" size={16} className="text-success" />
              <span className="text-sm text-foreground">Enhanced compliance posture</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ROICalculator;