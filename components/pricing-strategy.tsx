'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  Building2,
  Users,
  DollarSign,
  Calculator,
  Copy,
  CheckCircle2,
  Store,
  Factory,
  Coffee,
  Briefcase,
  ShoppingBag,
  Laptop,
  Sparkles,
} from "lucide-react";

type Industry = 'retail' | 'manufacturing' | 'services' | 'consulting' | 'technology' | 'hospitality';
type ClientType = 'small' | 'medium' | 'enterprise';

const industryIcons = {
  retail: <Store className="h-5 w-5" />,
  manufacturing: <Factory className="h-5 w-5" />,
  services: <Briefcase className="h-5 w-5" />,
  consulting: <Users className="h-5 w-5" />,
  technology: <Laptop className="h-5 w-5" />,
  hospitality: <Coffee className="h-5 w-5" />,
};

export default function PricingStrategy() {
  const [industry, setIndustry] = useState<Industry>('retail');
  const [clientType, setClientType] = useState<ClientType>('small');
  const [yearsExperience, setYearsExperience] = useState(5);
  const [competitorPrice, setCompetitorPrice] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const [copied, setCopied] = useState(false);

  const generateRecommendation = () => {
    // TODO: Integrate with actual AI pricing analysis
    const baseRates = {
      retail: { small: 50, medium: 100, enterprise: 200 },
      manufacturing: { small: 100, medium: 200, enterprise: 400 },
      services: { small: 75, medium: 150, enterprise: 300 },
      consulting: { small: 500, medium: 1000, enterprise: 2000 },
      technology: { small: 200, medium: 400, enterprise: 800 },
      hospitality: { small: 50, medium: 100, enterprise: 200 }
    };

    const experienceFactor = 1 + (yearsExperience / 100);
    const baseRate = baseRates[industry][clientType];
    const recommendedRate = Math.round(baseRate * experienceFactor);

    const justification = `Based on your profile as a ${industry} targeting ${clientType} clients, and considering your experience level, we recommend a rate of $${recommendedRate}/hour.

Key factors supporting this rate:
• Industry standard for your niche
• Your experience level and expertise
• Target market's spending capacity
• Competitive positioning

Value Proposition Script:
"My rate of $${recommendedRate}/hour reflects the premium value and results I deliver. Unlike lower-priced alternatives, I offer:
1. Specialized expertise in your industry
2. Proven track record of success
3. Dedicated support and communication
4. High-quality, reliable deliverables

This investment ensures you receive exceptional service that drives real business results."`;

    setRecommendation(justification);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(recommendation);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-card/50 backdrop-blur-sm p-6 rounded-lg border shadow-sm relative overflow-hidden card-hover">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-background to-transparent opacity-50" />
        <div className="absolute inset-0 shimmer" />
        <div className="flex items-center gap-3 relative">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center animate-float">
            <Calculator className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Pricing Strategy Engine</h2>
            <p className="text-muted-foreground">Generate personalized pricing recommendations</p>
          </div>
        </div>
      </div>

      <Card className="p-6 bg-card/50 backdrop-blur-sm card-hover">
        <form onSubmit={(e) => { e.preventDefault(); generateRecommendation(); }} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <label className="text-sm font-medium">Industry</label>
              <Select value={industry} onValueChange={(value: Industry) => setIndustry(value)}>
                <SelectTrigger className="bg-background/50 backdrop-blur-sm">
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(industryIcons).map(([key, icon]) => (
                    <SelectItem key={key} value={key} className="flex items-center gap-2">
                      <div className="animate-pulse-slow">{icon}</div>
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-medium">Client Type</label>
              <Select value={clientType} onValueChange={(value: ClientType) => setClientType(value)}>
                <SelectTrigger className="bg-background/50 backdrop-blur-sm">
                  <SelectValue placeholder="Select client type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small" className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-blue-500 animate-pulse-slow" />
                    Small Business
                  </SelectItem>
                  <SelectItem value="medium" className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-green-500 animate-pulse-slow" />
                    Medium Business
                  </SelectItem>
                  <SelectItem value="enterprise" className="flex items-center gap-2">
                    <Building2 className="h-6 w-6 text-purple-500 animate-pulse-slow" />
                    Enterprise
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-medium">Years of Experience</label>
              <div className="pt-2">
                <Slider
                  value={[yearsExperience]}
                  onValueChange={([value]) => setYearsExperience(value)}
                  min={0}
                  max={20}
                  step={1}
                  className="relative z-10"
                />
                <div className="mt-2 text-sm text-muted-foreground text-center">
                  {yearsExperience} years
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-medium">Average Competitor Price</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="number"
                  value={competitorPrice}
                  onChange={(e) => setCompetitorPrice(e.target.value)}
                  placeholder="0.00"
                  className="pl-8 bg-background/50 backdrop-blur-sm"
                />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-12 text-base relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Calculator className="h-5 w-5 group-hover:rotate-12 transition-transform" />
              Generate Recommendation
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Button>
        </form>
      </Card>

      {recommendation && (
        <Card className="p-6 bg-card/50 backdrop-blur-sm card-hover">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center animate-float">
                <Sparkles className="h-5 w-5 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold">Pricing Recommendation</h3>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent animate-pulse-slow" />
              <p className="bg-muted/50 backdrop-blur-sm p-4 rounded-lg text-muted-foreground relative">
                {recommendation}
              </p>
            </div>

            <Button
              onClick={copyToClipboard}
              variant="outline"
              className="w-full relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center gap-2">
                {copied ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 group-hover:rotate-12 transition-transform" />
                    Copy to Clipboard
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-background via-muted to-background opacity-0 group-hover:opacity-100 transition-opacity" />
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
} 