"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calculator, RefreshCw, Copy, DollarSign } from "lucide-react"

interface PricingCalculatorProps {
  isPremium?: boolean
  onUse?: () => void
  usageCount?: number
}

export function PricingCalculator({ isPremium = false, onUse, usageCount = 0 }: PricingCalculatorProps) {
  const [serviceType, setServiceType] = useState<string>("")
  const [experience, setExperience] = useState<number>(3)
  const [currentPrice, setCurrentPrice] = useState<string>("")
  const [targetMarket, setTargetMarket] = useState<string>("")
  const [isCalculating, setIsCalculating] = useState<boolean>(false)
  const [pricingResult, setPricingResult] = useState<any>(null)

  const calculatePrice = () => {
    if (!serviceType || !targetMarket || !currentPrice) return

    if (!isPremium && usageCount >= 2) {
      return
    }

    if (onUse) {
      onUse()
    }

    setIsCalculating(true)
    // Simulate API call to calculate pricing
    setTimeout(() => {
      setPricingResult({
        recommendedRange: {
          low: Number.parseInt(currentPrice) * 1.1,
          high: Number.parseInt(currentPrice) * 1.5,
        },
        marketRate: Number.parseInt(currentPrice) * 1.25,
        justifications: [
          "Your experience level justifies premium pricing",
          "Market demand for this service is currently high",
          "Similar service providers charge within this range",
          "Your specialized skills add additional value",
        ],
        clientStatements: [
          "Our pricing reflects the extensive experience and specialized expertise we bring to each project.",
          "We've benchmarked our rates against industry standards to ensure competitive yet fair pricing.",
          "The investment in our services typically yields a 3x return through improved efficiency and results.",
          "Our pricing includes ongoing support and optimization that many competitors charge extra for.",
        ],
      })
      setIsCalculating(false)
    }, 2000)
  }

  const resetCalculator = () => {
    setServiceType("")
    setExperience(3)
    setCurrentPrice("")
    setTargetMarket("")
    setPricingResult(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Pricing Calculator</h1>
        <p className="text-muted-foreground">
          Calculate optimal pricing for your services based on industry benchmarks and your experience.
        </p>
        {!isPremium && (
          <Badge variant="outline" className="w-fit">
            Demo: {2 - usageCount} calculations remaining
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Service Details</CardTitle>
            <CardDescription>Enter information about your service to calculate optimal pricing.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="serviceType">Service Type</Label>
              <Select value={serviceType} onValueChange={setServiceType}>
                <SelectTrigger id="serviceType">
                  <SelectValue placeholder="Select service type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="consulting">Consulting</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="development">Development</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="writing">Writing/Content</SelectItem>
                  <SelectItem value="coaching">Coaching</SelectItem>
                  <SelectItem value="media-production">Media Production</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Years of Experience</Label>
              <div className="flex items-center space-x-4">
                <Slider
                  value={[experience]}
                  min={0}
                  max={20}
                  step={1}
                  onValueChange={(value) => setExperience(value[0])}
                  className="flex-1"
                />
                <span className="w-12 text-center font-medium">{experience}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="currentPrice">Current Price ($)</Label>
              <Input
                id="currentPrice"
                type="number"
                placeholder="e.g., 100"
                value={currentPrice}
                onChange={(e) => setCurrentPrice(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="targetMarket">Target Market</Label>
              <Select value={targetMarket} onValueChange={setTargetMarket}>
                <SelectTrigger id="targetMarket">
                  <SelectValue placeholder="Select target market" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small Businesses</SelectItem>
                  <SelectItem value="medium">Medium Businesses</SelectItem>
                  <SelectItem value="enterprise">Enterprise</SelectItem>
                  <SelectItem value="startups">Startups</SelectItem>
                  <SelectItem value="individuals">Individuals</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={resetCalculator}>
              Reset
            </Button>
            <Button
              onClick={calculatePrice}
              disabled={
                !serviceType || !targetMarket || !currentPrice || isCalculating || (!isPremium && usageCount >= 2)
              }
            >
              {isCalculating ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Calculating...
                </>
              ) : (
                <>
                  <Calculator className="mr-2 h-4 w-4" />
                  Calculate Optimal Price
                </>
              )}
            </Button>
          </CardFooter>
        </Card>

        {pricingResult ? (
          <Card>
            <CardHeader>
              <CardTitle>Pricing Recommendation</CardTitle>
              <CardDescription>Based on your inputs and industry benchmarks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-primary/10 p-6 rounded-lg text-center">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Recommended Price Range</h3>
                <div className="flex items-center justify-center space-x-4">
                  <div className="text-2xl font-bold text-primary">
                    ${pricingResult.recommendedRange.low.toFixed(0)}
                  </div>
                  <div className="text-muted-foreground">to</div>
                  <div className="text-2xl font-bold text-primary">
                    ${pricingResult.recommendedRange.high.toFixed(0)}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Market average: ${pricingResult.marketRate.toFixed(0)}
                </p>
              </div>

              <Tabs defaultValue="justifications">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="justifications">Justifications</TabsTrigger>
                  <TabsTrigger value="clientStatements">Client Statements</TabsTrigger>
                </TabsList>
                <TabsContent value="justifications" className="pt-4">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Why This Price Range?</h3>
                    <ul className="space-y-2">
                      {pricingResult.justifications.map((justification: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <div className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                            {index + 1}
                          </div>
                          <span className="text-sm">{justification}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>
                <TabsContent value="clientStatements" className="pt-4">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">How to Explain Your Pricing</h3>
                    <div className="space-y-3">
                      {pricingResult.clientStatements.map((statement: string, index: number) => (
                        <div key={index} className="flex items-start group">
                          <div className="bg-muted p-3 rounded-lg text-sm flex-1">"{statement}"</div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <DollarSign className="mr-2 h-4 w-4" />
                Save This Pricing Strategy
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <Card>
            <div className="flex flex-col items-center justify-center h-[400px] text-center p-6">
              <DollarSign className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-medium mb-2">Pricing Calculator</h3>
              <p className="text-muted-foreground mb-6">
                Fill out the service details form and click "Calculate Optimal Price" to receive AI-powered pricing
                recommendations.
              </p>
              <div className="text-sm text-muted-foreground">
                <p>The calculator will provide:</p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-left">
                  <li>Recommended price range based on your experience</li>
                  <li>Market rate comparison</li>
                  <li>Justifications for your pricing</li>
                  <li>Client-ready statements to explain your rates</li>
                </ul>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}

