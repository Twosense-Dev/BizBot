'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import {
  AlertCircle,
  CheckCircle2,
  BarChart2,
  Brain,
  Star,
  Shield,
  Zap,
  Sparkles,
} from "lucide-react";

type Difficulty = 'beginner' | 'skeptical' | 'aggressive';
type FeedbackScore = {
  clarity: number;
  confidence: number;
  persuasiveness: number;
  total: number;
};

export default function AIBusinessTrainer() {
  const [difficulty, setDifficulty] = useState<Difficulty>('beginner');
  const [userResponse, setUserResponse] = useState('');
  const [feedback, setFeedback] = useState<FeedbackScore | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const difficultyScenarios = {
    beginner: {
      prompt: "I'm interested in your services. Can you tell me more about your rates?",
      context: "Friendly potential client, open to discussion",
      icon: <Star className="h-5 w-5 text-yellow-500" />
    },
    skeptical: {
      prompt: "Your rates seem high compared to others I've talked to. What makes you different?",
      context: "Cautious client seeking justification",
      icon: <Shield className="h-5 w-5 text-blue-500" />
    },
    aggressive: {
      prompt: "I can find someone cheaper on Fiverr. Why should I pay your premium rates?",
      context: "Price-focused client, comparing with competitors",
      icon: <Zap className="h-5 w-5 text-purple-500" />
    }
  };

  const analyzeFeedback = async () => {
    setIsAnalyzing(true);
    // TODO: Integrate with actual AI analysis
    setTimeout(() => {
      setFeedback({
        clarity: Math.random() * 100,
        confidence: Math.random() * 100,
        persuasiveness: Math.random() * 100,
        total: Math.random() * 100
      });
      setIsAnalyzing(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-card/50 backdrop-blur-sm p-6 rounded-lg border shadow-sm relative overflow-hidden card-hover">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-background to-transparent opacity-50" />
        <div className="absolute inset-0 shimmer" />
        <div className="flex items-center gap-3 relative">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center animate-float">
            <Brain className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">AI Business Q&A Trainer</h2>
            <p className="text-muted-foreground">Practice handling client inquiries with AI feedback</p>
          </div>
        </div>
        <Select value={difficulty} onValueChange={(value: Difficulty) => setDifficulty(value)}>
          <SelectTrigger className="w-[180px] bg-background/50 backdrop-blur-sm">
            <SelectValue placeholder="Select difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="beginner" className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500 animate-pulse-slow" />
              Beginner (Easy)
            </SelectItem>
            <SelectItem value="skeptical" className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-blue-500 animate-pulse-slow" />
              Skeptical (Medium)
            </SelectItem>
            <SelectItem value="aggressive" className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-purple-500 animate-pulse-slow" />
              Aggressive (Hard)
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="p-6 bg-card/50 backdrop-blur-sm card-hover">
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 animate-float">
              {difficultyScenarios[difficulty].icon}
            </div>
            <div className="space-y-4 flex-1">
              <div>
                <h3 className="font-semibold text-lg mb-2">Scenario:</h3>
                <p className="text-muted-foreground bg-muted/50 backdrop-blur-sm p-3 rounded-md">
                  {difficultyScenarios[difficulty].context}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Client Question:</h3>
                <p className="text-primary bg-primary/5 p-4 rounded-md border border-primary/10 relative overflow-hidden">
                  <span className="relative z-10">{difficultyScenarios[difficulty].prompt}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent animate-pulse-slow" />
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Your Response:</h3>
            <Textarea
              value={userResponse}
              onChange={(e) => setUserResponse(e.target.value)}
              placeholder="Type your response here..."
              className="min-h-[150px] text-base bg-background/50 backdrop-blur-sm"
            />
            <Button
              onClick={analyzeFeedback}
              disabled={!userResponse || isAnalyzing}
              className="w-full h-12 text-base relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center gap-2">
                {isAnalyzing ? (
                  <>
                    <Brain className="h-5 w-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Brain className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                    Analyze Response
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Button>
          </div>
        </div>
      </Card>

      {feedback && (
        <Card className="p-6 bg-card/50 backdrop-blur-sm card-hover">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center animate-float">
                <Sparkles className="h-5 w-5 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold">AI Feedback Analysis</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-4 border-2 border-blue-500/20 bg-blue-500/5 card-hover">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center animate-pulse-slow">
                    <AlertCircle className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Clarity</p>
                    <p className="text-2xl font-bold">{feedback.clarity.toFixed(1)}%</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4 border-2 border-green-500/20 bg-green-500/5 card-hover">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center animate-pulse-slow">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Confidence</p>
                    <p className="text-2xl font-bold">{feedback.confidence.toFixed(1)}%</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4 border-2 border-purple-500/20 bg-purple-500/5 card-hover">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-purple-500/10 flex items-center justify-center animate-pulse-slow">
                    <BarChart2 className="h-5 w-5 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Persuasiveness</p>
                    <p className="text-2xl font-bold">{feedback.persuasiveness.toFixed(1)}%</p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="mt-6 space-y-4">
              <h4 className="text-lg font-semibold">Suggested Improvements:</h4>
              <div className="grid gap-4">
                <Card className="p-4 bg-muted/50 backdrop-blur-sm hover:bg-muted/70 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mt-1 animate-float">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-muted-foreground">Add more specific examples to support your value proposition</p>
                  </div>
                </Card>
                <Card className="p-4 bg-muted/50 backdrop-blur-sm hover:bg-muted/70 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mt-1 animate-float">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-muted-foreground">Use more confident language by removing hesitant phrases</p>
                  </div>
                </Card>
                <Card className="p-4 bg-muted/50 backdrop-blur-sm hover:bg-muted/70 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mt-1 animate-float">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-muted-foreground">Include a clear call to action at the end</p>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
} 