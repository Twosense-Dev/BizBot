"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, Send, Mic, ThumbsUp, ThumbsDown, RotateCcw } from "lucide-react"

type Message = {
  role: "client" | "user" | "system"
  content: string
}

const objections = [
  "That's way more than I was expecting to pay.",
  "I've received quotes from other providers that are much lower.",
  "I don't think my budget can accommodate that price.",
  "What if we reduce the scope to lower the price?",
  "Can you offer any discounts if we sign a longer contract?",
]

export function PricingNegotiation() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "system",
      content:
        "Welcome to the Pricing Negotiation Trainer. I'll act as a client with pricing objections. Start by clicking 'Begin Negotiation' to practice handling pricing pushback.",
    },
  ])
  const [userInput, setUserInput] = useState<string>("")
  const [isThinking, setIsThinking] = useState<boolean>(false)
  const [negotiationStarted, setNegotiationStarted] = useState<boolean>(false)
  const [feedback, setFeedback] = useState<string | null>(null)

  const startNegotiation = () => {
    setNegotiationStarted(true)
    const randomObjection = objections[Math.floor(Math.random() * objections.length)]
    setMessages([
      ...messages,
      {
        role: "client",
        content: `Thanks for sharing your proposal. ${randomObjection}`,
      },
    ])
  }

  const sendMessage = () => {
    if (!userInput.trim()) return

    // Add user message
    const updatedMessages = [...messages, { role: "user", content: userInput }]
    setMessages(updatedMessages)
    setUserInput("")
    setIsThinking(true)

    // Simulate AI response
    setTimeout(() => {
      // Generate feedback
      const feedback = generateFeedback(userInput)
      setFeedback(feedback)

      // Generate client response
      setTimeout(() => {
        setMessages([
          ...updatedMessages,
          {
            role: "client",
            content:
              "I understand your perspective. But I still feel the price is higher than what I had in mind. Could you explain why your service is worth this investment compared to alternatives?",
          },
        ])
        setIsThinking(false)
      }, 1500)
    }, 2000)
  }

  const generateFeedback = (response: string) => {
    // This would be replaced with actual AI analysis
    const feedbacks = [
      "Good job addressing the value rather than just the price. Try adding specific examples of ROI to strengthen your case.",
      "You're on the right track with explaining your expertise, but consider acknowledging the client's budget concerns more directly.",
      "Excellent use of social proof! Mentioning other satisfied clients builds credibility. Consider also explaining your unique process.",
      "Your response focuses too much on defending the price rather than highlighting value. Try reframing around outcomes the client will achieve.",
      "Great job offering options without reducing your core price. This gives the client choice while maintaining your value.",
    ]

    return feedbacks[Math.floor(Math.random() * feedbacks.length)]
  }

  const resetNegotiation = () => {
    setMessages([
      {
        role: "system",
        content:
          "Welcome to the Pricing Negotiation Trainer. I'll act as a client with pricing objections. Start by clicking 'Begin Negotiation' to practice handling pricing pushback.",
      },
    ])
    setNegotiationStarted(false)
    setFeedback(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Pricing Negotiation</h1>
        <p className="text-muted-foreground">
          Practice handling pricing objections and refine your negotiation skills.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Negotiation Simulation</CardTitle>
            <CardDescription>Practice responding to common pricing objections from clients.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 h-[400px] overflow-y-auto p-2">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  {message.role === "client" && (
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Client" />
                      <AvatarFallback>C</AvatarFallback>
                    </Avatar>
                  )}

                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : message.role === "client"
                          ? "bg-muted"
                          : "bg-muted/50 text-center w-full text-sm text-muted-foreground"
                    }`}
                  >
                    {message.content}
                  </div>

                  {message.role === "user" && (
                    <Avatar className="h-8 w-8 ml-2">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="You" />
                      <AvatarFallback>Y</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}

              {isThinking && (
                <div className="flex justify-start">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Client" />
                    <AvatarFallback>C</AvatarFallback>
                  </Avatar>
                  <div className="bg-muted rounded-lg p-3 flex items-center space-x-1">
                    <div
                      className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            {!negotiationStarted ? (
              <Button onClick={startNegotiation} className="w-full">
                Begin Negotiation
              </Button>
            ) : (
              <>
                <div className="flex w-full items-center space-x-2">
                  <Textarea
                    placeholder="Type your response to the client..."
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    className="flex-1"
                    disabled={isThinking}
                  />
                  <Button variant="outline" size="icon" disabled={isThinking}>
                    <Mic className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex justify-between w-full">
                  <Button variant="outline" onClick={resetNegotiation} disabled={isThinking}>
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Reset
                  </Button>
                  <Button onClick={sendMessage} disabled={!userInput.trim() || isThinking}>
                    {isThinking ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Response
                      </>
                    )}
                  </Button>
                </div>
              </>
            )}
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Feedback</CardTitle>
            <CardDescription>Analysis of your negotiation approach</CardDescription>
          </CardHeader>
          <CardContent>
            {feedback ? (
              <div className="space-y-6">
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm">{feedback}</p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Effective Pricing Defense Strategies</h3>
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <Badge variant="outline" className="mr-2 mt-0.5">
                        1
                      </Badge>
                      <p className="text-sm">Focus on value and outcomes, not just deliverables</p>
                    </div>
                    <div className="flex items-start">
                      <Badge variant="outline" className="mr-2 mt-0.5">
                        2
                      </Badge>
                      <p className="text-sm">Share specific ROI examples from previous clients</p>
                    </div>
                    <div className="flex items-start">
                      <Badge variant="outline" className="mr-2 mt-0.5">
                        3
                      </Badge>
                      <p className="text-sm">
                        Offer options at different price points without devaluing your core service
                      </p>
                    </div>
                    <div className="flex items-start">
                      <Badge variant="outline" className="mr-2 mt-0.5">
                        4
                      </Badge>
                      <p className="text-sm">
                        Acknowledge concerns but reframe the conversation around investment vs. cost
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" size="sm">
                    <ThumbsDown className="mr-2 h-4 w-4" />
                    Not Helpful
                  </Button>
                  <Button variant="outline" size="sm">
                    <ThumbsUp className="mr-2 h-4 w-4" />
                    Helpful
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[300px] text-center">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                  <DollarSign className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">Negotiation Coach</h3>
                <p className="text-sm text-muted-foreground">
                  {negotiationStarted
                    ? "Respond to the client's objection to receive AI feedback on your negotiation approach."
                    : "Begin the negotiation to practice handling pricing objections from clients."}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Missing import at the top
import { DollarSign } from "lucide-react"

