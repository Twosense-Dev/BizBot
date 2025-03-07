import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PricingRecommendation {
  suggestedRange: { min: number; max: number };
  justification: string;
  competitorComparison: string;
  valueProposition: string;
  emailTemplate: string;
}

interface PricingStrategyEngineProps {
  isPremium: boolean;
  onUse: () => void;
  usageCount: number;
}

const PricingStrategyEngine: React.FC<PricingStrategyEngineProps> = ({ isPremium, onUse, usageCount }) => {
  const [industry, setIndustry] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [experience, setExperience] = useState('');
  const [recommendation, setRecommendation] = useState<PricingRecommendation | null>(null);

  const industries = [
    { value: 'freelancer', label: 'Freelancer' },
    { value: 'agency', label: 'Agency' },
    { value: 'coach', label: 'Business Coach' },
    { value: 'ecommerce', label: 'E-commerce' },
    { value: 'startup', label: 'Startup' },
  ];

  const audiences = [
    { value: 'luxury', label: 'Luxury/High-End' },
    { value: 'midmarket', label: 'Mid-Market' },
    { value: 'budget', label: 'Budget-Conscious' },
  ];

  const experienceLevels = [
    { value: 'beginner', label: '0-2 Years' },
    { value: 'intermediate', label: '3-5 Years' },
    { value: 'expert', label: '5+ Years' },
  ];

  const generateRecommendation = () => {
    onUse();
    const priceRange = {
      min: industry === 'agency' ? 5000 : 1000,
      max: industry === 'agency' ? 15000 : 5000,
    };

    const newRecommendation: PricingRecommendation = {
      suggestedRange: priceRange,
      justification: `Based on your profile as a ${experience} ${industry} targeting ${targetAudience} clients, this pricing aligns with market expectations while reflecting your value proposition.`,
      competitorComparison: "Your pricing positions you in the premium segment of the market, justified by your unique approach and proven results.",
      valueProposition: "Focus on ROI, customized solutions, and exceptional service quality to support this pricing tier.",
      emailTemplate: `Dear [Client Name],

Thank you for your interest in our services. Based on your requirements and our expertise as a ${industry} specializing in ${targetAudience} solutions, our investment range is $${new Intl.NumberFormat().format(priceRange.min)} - $${new Intl.NumberFormat().format(priceRange.max)}.

This investment reflects:
- Our proven track record in delivering results
- Customized solutions tailored to your needs
- Comprehensive support and expertise
- [Industry-specific value proposition]

I'd be happy to discuss how we can create specific value for your business.

Best regards,
[Your Name]`
    };
    setRecommendation(newRecommendation);
  };

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-2xl font-bold">Pricing Strategy Engine</h2>

      <Card className="p-6">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label>Industry</Label>
              <Select value={industry} onValueChange={setIndustry}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your industry" />
                </SelectTrigger>
                <SelectContent>
                  {industries.map((ind) => (
                    <SelectItem key={ind.value} value={ind.value}>
                      {ind.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Target Audience</Label>
              <Select value={targetAudience} onValueChange={setTargetAudience}>
                <SelectTrigger>
                  <SelectValue placeholder="Select target audience" />
                </SelectTrigger>
                <SelectContent>
                  {audiences.map((aud) => (
                    <SelectItem key={aud.value} value={aud.value}>
                      {aud.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Experience Level</Label>
              <Select value={experience} onValueChange={setExperience}>
                <SelectTrigger>
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  {experienceLevels.map((exp) => (
                    <SelectItem key={exp.value} value={exp.value}>
                      {exp.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            onClick={generateRecommendation}
            disabled={!industry || !targetAudience || !experience}
          >
            Generate Pricing Strategy
          </Button>

          {recommendation && (
            <div className="mt-6 space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Suggested Price Range:</h3>
                <p className="text-2xl font-bold">
                  ${new Intl.NumberFormat().format(recommendation.suggestedRange.min)} - ${new Intl.NumberFormat().format(recommendation.suggestedRange.max)}
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Justification:</h3>
                <p>{recommendation.justification}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Competitor Analysis:</h3>
                <p>{recommendation.competitorComparison}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Value Proposition:</h3>
                <p>{recommendation.valueProposition}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Email Template:</h3>
                <div className="bg-muted p-4 rounded-md whitespace-pre-wrap">
                  {recommendation.emailTemplate}
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default PricingStrategyEngine; 