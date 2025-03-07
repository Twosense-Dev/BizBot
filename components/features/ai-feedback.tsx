"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RefreshCw, Sparkles } from "lucide-react"

export function AIFeedback() {
  const [businessText, setBusinessText] = useState<string>("")
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false)
  const [feedback, setFeedback] = useState<any>(null)

  const analyzeFeedback = () => {
    if (!businessText.trim()) return

    setIsAnalyzing(true)
    // Simulate API call to analyze text
    setTimeout(() => {
      setFeedback({
        weakPoints: [
          {
            original: "We offer the best service in the industry.",
            suggestion: "We deliver industry-leading results with a 98% client satisfaction rate.",
            reason: "Vague claim without evidence",
          },
          {
            original: "Our team is good at solving problems.",
            suggestion: "Our certified experts have resolved over 500 complex challenges for clients in your industry.",
            reason: "Lacks specificity and credibility",
          },
          {
            original: "We can help you grow your business.",
            suggestion: "Our clients typically see a 27% revenue increase within the first 6 months of implementation.",
            reason: "Missing measurable outcomes",
          },
        ],
        strengths: [
          "Clear introduction of your core service offering",
          "Good explanation of your process",
          "Effective closing with a call to action",
        ],
        improvedVersion:
          "I've analyzed your text and created an enhanced version that maintains your message while improving clarity and persuasiveness.",
      })
      setIsAnalyzing(false)
    }, 2000)
  }

  const resetAnalysis = () => {
    setBusinessText("")
    setFeedback(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">AI Feedback</h1>
        <p className="text-muted-foreground">
          Get AI analysis and suggestions to improve your business communications.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Your Business Communication</CardTitle>
            <CardDescription>Paste your business pitch, email, or response for AI analysis.</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Enter your business text here..."
              className="min-h-[300px]"
              value={businessText}
              onChange={(e) => setBusinessText(e.target.value)}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={resetAnalysis}>
              Clear
            </Button>
            <Button onClick={analyzeFeedback} disabled={!businessText.trim() || isAnalyzing}>
              {isAnalyzing ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Analyze Text
                </>
              )}
            </Button>
          </CardFooter>
        </Card>

        {feedback ? (
          <Card>
            <CardHeader>
              <CardTitle>AI Analysis Results</CardTitle>
              <CardDescription>Review the feedback and suggestions to improve your communication.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Tabs defaultValue="weakPoints">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="weakPoints">Weak Points</TabsTrigger>
                  <TabsTrigger value="strengths">Strengths</TabsTrigger>
                  <TabsTrigger value="improved">Improved Version</TabsTrigger>
                </TabsList>
                <TabsContent value="weakPoints" className="space-y-4 pt-4">
                  {feedback.weakPoints.map((point: any, index: number) => (
                    <div key={index} className="space-y-2 p-4 border rounded-lg">
                      <div className="space-y-1">
                        <div className="flex items-start">
                          <div className="bg-destructive/10 text-destructive rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                            !
                          </div>
                          <div>
                            <p className="text-sm font-medium">Original Text</p>
                            <p className="text-sm text-muted-foreground">"{point.original}"</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-start">
                          <div className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                            ✓
                          </div>
                          <div>
                            <p className="text-sm font-medium">Suggested Improvement</p>
                            <p className="text-sm text-muted-foreground">"{point.suggestion}"</p>
                          </div>
                        </div>
                      </div>
                      <div className="pt-2 text-xs text-muted-foreground border-t">
                        <span className="font-medium">Reason for change:</span> {point.reason}
                      </div>
                    </div>
                  ))}
                </TabsContent>
                <TabsContent value="strengths" className="pt-4">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">What You're Doing Well</h3>
                    <ul className="space-y-2">
                      {feedback.strengths.map((strength: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <div className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                            ✓
                          </div>
                          <span className="text-sm">{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>
                <TabsContent value="improved" className="pt-4">
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">{feedback.improvedVersion}</p>
                    <div className="bg-muted p-4 rounded-lg">
                      <p className="text-sm italic">
                        "Our certified experts have resolved over 500 complex challenges for clients in your industry.
                        With our proven three-step process, we identify opportunities, implement tailored solutions, and
                        provide ongoing optimization. Our clients typically see a 27% revenue increase within the first
                        6 months of implementation. Let's schedule a 30-minute consultation to discuss how we can
                        achieve similar results for your business."
                      </p>
                    </div>
                    <Button className="w-full">Copy Improved Version</Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <div className="flex flex-col items-center justify-center h-[400px] text-center p-6">
              <Sparkles className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-medium mb-2">AI Communication Analysis</h3>
              <p className="text-muted-foreground mb-6">
                Enter your business text on the left and click "Analyze Text" to receive AI-powered feedback and
                suggestions for improvement.
              </p>
              <div className="text-sm text-muted-foreground">
                <p>The AI will identify:</p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-left">
                  <li>Weak points in your communication</li>
                  <li>Areas where you're already strong</li>
                  <li>Suggestions for more persuasive language</li>
                </ul>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}

