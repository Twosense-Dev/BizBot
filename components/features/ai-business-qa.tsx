"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Mic, Send, RefreshCw, ImageIcon } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Label } from "@/components/ui/label"

const industries = [
  "Technology",
  "Marketing",
  "Design",
  "Consulting",
  "Finance",
  "Healthcare",
  "Education",
  "Retail",
  "Real Estate",
  "Media",
  "Entertainment",
  "Other",
]

const businessTypes = ["Freelancer", "Agency", "Startup", "Small Business", "Consultant", "Service Provider", "Other"]

const sampleQuestions = [
  "Why should I hire you instead of your competitors?",
  "How do you ensure quality in your work?",
  "What's your process for handling revisions or changes?",
  "How do you handle tight deadlines?",
  "Can you describe your experience with similar projects?",
]

interface AIBusinessQAProps {
  isPremium?: boolean
  onUse?: () => void
  usageCount?: number
}

export function AIBusinessQA({ isPremium = false, onUse, usageCount = 0 }: AIBusinessQAProps) {
  const [industry, setIndustry] = useState<string>("")
  const [customIndustry, setCustomIndustry] = useState<string>("")
  const [businessType, setBusinessType] = useState<string>("")
  const [questions, setQuestions] = useState<string[]>([])
  const [currentQuestion, setCurrentQuestion] = useState<string>("")
  const [userResponse, setUserResponse] = useState<string>("")
  const [feedback, setFeedback] = useState<any>(null)
  const [isGenerating, setIsGenerating] = useState<boolean>(false)
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false)
  const [showCustomIndustry, setShowCustomIndustry] = useState<boolean>(false)

  const handleIndustryChange = (value: string) => {
    setIndustry(value)
    setShowCustomIndustry(value === "other")
  }

  const generateQuestions = () => {
    setIsGenerating(true)
    // Simulate API call to generate questions
    setTimeout(() => {
      setQuestions(sampleQuestions)
      setCurrentQuestion(sampleQuestions[0])
      setIsGenerating(false)
    }, 1500)
  }

  const analyzeFeedback = () => {
    if (!userResponse.trim()) return

    if (!isPremium && usageCount >= 2) {
      return
    }

    if (onUse) {
      onUse()
    }

    setIsAnalyzing(true)
    // Simulate API call to analyze response
    setTimeout(() => {
      setFeedback({
        confidence: 75,
        clarity: 85,
        persuasiveness: 70,
        suggestions: [
          "Consider adding specific examples to strengthen your point.",
          "Your response could be more concise in the middle section.",
          "Adding a clear call to action at the end would improve persuasiveness.",
        ],
      })
      setIsAnalyzing(false)
    }, 2000)
  }

  const resetExercise = () => {
    setUserResponse("")
    setFeedback(null)
    setCurrentQuestion(questions[Math.floor(Math.random() * questions.length)])
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">AI Business Q&A</h1>
        <p className="text-muted-foreground">
          Practice answering common client questions and receive AI feedback on your responses.
        </p>
        {!isPremium && (
          <Badge variant="outline" className="w-fit">
            Demo: {2 - usageCount} responses remaining
          </Badge>
        )}
      </div>

      {!questions.length ? (
        <Card>
          <CardHeader>
            <CardTitle>Set Up Your Practice Session</CardTitle>
            <CardDescription>
              Select your industry and business type to generate relevant client questions.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="industry" className="text-sm font-medium">
                  Industry
                </Label>
                <Select value={industry} onValueChange={handleIndustryChange}>
                  <SelectTrigger id="industry">
                    <SelectValue placeholder="Select your industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((ind) => (
                      <SelectItem key={ind} value={ind.toLowerCase()}>
                        {ind}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {showCustomIndustry && (
                <div className="space-y-2">
                  <Label htmlFor="customIndustry" className="text-sm font-medium">
                    Custom Industry
                  </Label>
                  <Input
                    id="customIndustry"
                    placeholder="Enter your industry"
                    value={customIndustry}
                    onChange={(e) => setCustomIndustry(e.target.value)}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="businessType" className="text-sm font-medium">
                  Business Type
                </Label>
                <Select value={businessType} onValueChange={setBusinessType}>
                  <SelectTrigger id="businessType">
                    <SelectValue placeholder="Select your business type" />
                  </SelectTrigger>
                  <SelectContent>
                    {businessTypes.map((type) => (
                      <SelectItem key={type} value={type.toLowerCase()}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={generateQuestions}
              disabled={!industry || !businessType || isGenerating || (showCustomIndustry && !customIndustry)}
              className="w-full"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Generating Questions...
                </>
              ) : (
                "Generate Questions"
              )}
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Client Question</CardTitle>
              <CardDescription>Respond to this question as if you were speaking to a real client.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-lg mb-4">
                <p className="font-medium">{currentQuestion}</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="response" className="text-sm font-medium">
                    Your Response
                  </Label>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      <ImageIcon className="h-4 w-4 mr-2" />
                      Add Media
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Mic className="h-4 w-4 mr-2" />
                      Voice Input
                    </Button>
                  </div>
                </div>
                <Textarea
                  id="response"
                  placeholder="Type your response here..."
                  className="min-h-[150px]"
                  value={userResponse}
                  onChange={(e) => setUserResponse(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={resetExercise}>
                <RefreshCw className="mr-2 h-4 w-4" />
                New Question
              </Button>
              <Button
                onClick={analyzeFeedback}
                disabled={!userResponse.trim() || isAnalyzing || (!isPremium && usageCount >= 2)}
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Get Feedback
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>AI Feedback</CardTitle>
              <CardDescription>Analysis of your response effectiveness</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {feedback ? (
                <>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Confidence</span>
                        <span className="text-sm">{feedback.confidence}%</span>
                      </div>
                      <Progress value={feedback.confidence} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Clarity</span>
                        <span className="text-sm">{feedback.clarity}%</span>
                      </div>
                      <Progress value={feedback.clarity} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Persuasiveness</span>
                        <span className="text-sm">{feedback.persuasiveness}%</span>
                      </div>
                      <Progress value={feedback.persuasiveness} className="h-2" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Suggestions for Improvement</h3>
                    <ul className="space-y-2">
                      {feedback.suggestions.map((suggestion: string, index: number) => (
                        <li key={index} className="text-sm flex items-start">
                          <span className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                            {index + 1}
                          </span>
                          <span>{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-[300px] text-center text-muted-foreground">
                  <p>Submit your response to receive AI feedback on your communication effectiveness.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

