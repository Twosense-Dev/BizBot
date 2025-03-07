"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RefreshCw, Zap, Copy, ThumbsUp, ThumbsDown } from "lucide-react"

interface ShotgunProps {
  isPremium?: boolean
  onUse?: () => void
  usageCount?: number
}

export function Shotgun({ isPremium = false, onUse, usageCount = 0 }: ShotgunProps) {
  const [clientQuestion, setClientQuestion] = useState<string>("")
  const [isGenerating, setIsGenerating] = useState<boolean>(false)
  const [responses, setResponses] = useState<any[] | null>(null)
  const [selectedResponseIndex, setSelectedResponseIndex] = useState<number | null>(null)

  const generateResponses = () => {
    if (!clientQuestion.trim()) return

    if (!isPremium && usageCount >= 2) {
      return
    }

    if (onUse) {
      onUse()
    }

    setIsGenerating(true)
    setSelectedResponseIndex(null)

    // Simulate API call to generate responses
    setTimeout(() => {
      setResponses([
        {
          style: "Professional",
          content:
            "Thank you for your inquiry. Based on the details you've provided, we can certainly help with this project. Our team has extensive experience in similar situations, and we'd be happy to discuss how our approach can meet your specific needs. Would you be available for a brief call to discuss the requirements in more detail?",
          tone: "Formal and confident",
        },
        {
          style: "Friendly",
          content:
            "Thanks so much for reaching out! This sounds like an exciting project, and it's right up our alley. We've worked on similar projects before and would love to bring that experience to your situation. I'd be happy to chat more about your specific needs and how we can help make this a success for you. When would be a good time to connect?",
          tone: "Warm and approachable",
        },
        {
          style: "Direct",
          content:
            "I appreciate your question. Here's what we can do: Based on our experience with similar projects, we can deliver what you need within your timeframe. Our process involves three steps that ensure quality results. Let's schedule a 15-minute call to discuss specifics and determine if we're the right fit for your needs.",
          tone: "Straightforward and efficient",
        },
        {
          style: "Value-focused",
          content:
            "Thank you for your inquiry. What sets us apart is our proven track record of delivering 30% better results than industry standards for projects like yours. Our clients typically see ROI within the first month. I'd like to understand your specific goals better so we can tailor our approach to maximize your investment. Would tomorrow at 2 PM work for a quick discussion?",
          tone: "Results-oriented and confident",
        },
      ])
      setIsGenerating(false)
    }, 2000)
  }

  const copyResponse = (index: number) => {
    if (!responses) return

    const textToCopy = responses[index].content
    navigator.clipboard.writeText(textToCopy)
    setSelectedResponseIndex(index)
  }

  const resetForm = () => {
    setClientQuestion("")
    setResponses(null)
    setSelectedResponseIndex(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Shotgun</h1>
        <p className="text-muted-foreground">
          Paste a client question and instantly receive multiple response options to choose from.
        </p>
        {!isPremium && (
          <Badge variant="outline" className="w-fit">
            Demo: {2 - usageCount} generations remaining
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Client Question</CardTitle>
            <CardDescription>
              Paste the client's question or inquiry to generate multiple response options.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Paste the client's question or inquiry here..."
              className="min-h-[150px]"
              value={clientQuestion}
              onChange={(e) => setClientQuestion(e.target.value)}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={resetForm} disabled={isGenerating}>
              Clear
            </Button>
            <Button
              onClick={generateResponses}
              disabled={!clientQuestion.trim() || isGenerating || (!isPremium && usageCount >= 2)}
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Generating Responses...
                </>
              ) : (
                <>
                  <Zap className="mr-2 h-4 w-4" />
                  Generate Response Options
                </>
              )}
            </Button>
          </CardFooter>
        </Card>

        {responses && (
          <Card>
            <CardHeader>
              <CardTitle>Response Options</CardTitle>
              <CardDescription>Choose the response style that best fits your communication needs.</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <TabsList className="grid grid-cols-5 mb-4">
                  <TabsTrigger value="all">All Styles</TabsTrigger>
                  <TabsTrigger value="professional">Professional</TabsTrigger>
                  <TabsTrigger value="friendly">Friendly</TabsTrigger>
                  <TabsTrigger value="direct">Direct</TabsTrigger>
                  <TabsTrigger value="value">Value-focused</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4">
                  {responses.map((response, index) => (
                    <Card key={index} className={`border ${selectedResponseIndex === index ? "border-primary" : ""}`}>
                      <CardHeader className="py-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <Badge variant="outline" className="mb-1">
                              {response.style}
                            </Badge>
                            <CardDescription className="text-xs">{response.tone}</CardDescription>
                          </div>
                          <div className="flex space-x-1">
                            <Button variant="ghost" size="sm">
                              <ThumbsDown className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <ThumbsUp className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="py-2">
                        <p className="text-sm">{response.content}</p>
                      </CardContent>
                      <CardFooter className="py-3 flex justify-end">
                        <Button
                          variant={selectedResponseIndex === index ? "default" : "outline"}
                          size="sm"
                          onClick={() => copyResponse(index)}
                        >
                          {selectedResponseIndex === index ? (
                            "Copied!"
                          ) : (
                            <>
                              <Copy className="mr-2 h-4 w-4" />
                              Copy Response
                            </>
                          )}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </TabsContent>

                {["professional", "friendly", "direct", "value"].map((style, styleIndex) => (
                  <TabsContent key={style} value={style}>
                    <Card>
                      <CardHeader className="py-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <Badge variant="outline" className="mb-1">
                              {responses[styleIndex].style}
                            </Badge>
                            <CardDescription className="text-xs">{responses[styleIndex].tone}</CardDescription>
                          </div>
                          <div className="flex space-x-1">
                            <Button variant="ghost" size="sm">
                              <ThumbsDown className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <ThumbsUp className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="py-2">
                        <p className="text-sm">{responses[styleIndex].content}</p>
                      </CardContent>
                      <CardFooter className="py-3 flex justify-end">
                        <Button
                          variant={selectedResponseIndex === styleIndex ? "default" : "outline"}
                          size="sm"
                          onClick={() => copyResponse(styleIndex)}
                        >
                          {selectedResponseIndex === styleIndex ? (
                            "Copied!"
                          ) : (
                            <>
                              <Copy className="mr-2 h-4 w-4" />
                              Copy Response
                            </>
                          )}
                        </Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        )}

        {!responses && !isGenerating && (
          <Card>
            <div className="flex flex-col items-center justify-center h-[300px] text-center p-6">
              <Zap className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-medium mb-2">Shotgun Response Generator</h3>
              <p className="text-muted-foreground mb-6">
                Paste a client question above and click "Generate Response Options" to receive multiple AI-generated
                responses in different styles.
              </p>
              <div className="text-sm text-muted-foreground">
                <p>You'll receive responses in these styles:</p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-left">
                  <li>Professional - Formal and confident</li>
                  <li>Friendly - Warm and approachable</li>
                  <li>Direct - Straightforward and efficient</li>
                  <li>Value-focused - Results-oriented</li>
                </ul>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}

