'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Brain,
  MessageCircle,
  DollarSign,
  Shield,
  Target,
  Zap,
  RefreshCw,
  Sparkles,
  LightbulbIcon,
} from "lucide-react";

type Objection = {
  id: number;
  text: string;
  category: 'price' | 'value' | 'competitor';
  difficulty: 'easy' | 'medium' | 'hard';
};

const COMMON_OBJECTIONS: Objection[] = [
  { id: 1, text: "Your price is too high compared to others.", category: 'price', difficulty: 'easy' },
  { id: 2, text: "We don't see enough value in your solution.", category: 'value', difficulty: 'medium' },
  { id: 3, text: "Your competitor offers more features.", category: 'competitor', difficulty: 'hard' },
  // Add more objections as needed
];

const categoryIcons = {
  price: <DollarSign className="h-5 w-5" />,
  value: <Target className="h-5 w-5" />,
  competitor: <Shield className="h-5 w-5" />,
};

const difficultyIcons = {
  easy: <Zap className="h-4 w-4 text-yellow-500" />,
  medium: <Zap className="h-5 w-5 text-blue-500" />,
  hard: <Zap className="h-6 w-6 text-purple-500" />,
};

export default function NegotiationTrainer() {
  const [currentObjection, setCurrentObjection] = useState<Objection>(COMMON_OBJECTIONS[0]);
  const [userResponse, setUserResponse] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const generateNewObjection = () => {
    const randomIndex = Math.floor(Math.random() * COMMON_OBJECTIONS.length);
    setCurrentObjection(COMMON_OBJECTIONS[randomIndex]);
    setUserResponse('');
    setFeedback('');
  };

  const analyzeResponse = () => {
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      const hints = {
        price: "Consider emphasizing the long-term ROI and unique value proposition.",
        value: "Focus on specific outcomes and success stories that demonstrate clear benefits.",
        competitor: "Highlight your unique strengths and areas where you excel beyond feature comparison.",
      };
      setFeedback(hints[currentObjection.category]);
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
            <MessageCircle className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Negotiation Trainer</h2>
            <p className="text-muted-foreground">Practice handling client objections with AI feedback</p>
          </div>
        </div>
        <Button
          onClick={generateNewObjection}
          variant="outline"
          size="icon"
          className="relative overflow-hidden group"
        >
          <span className="relative z-10">
            <RefreshCw className="h-5 w-5 group-hover:rotate-180 transition-transform duration-500" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-background via-muted to-background opacity-0 group-hover:opacity-100 transition-opacity" />
        </Button>
      </div>

      <Card className="p-6 bg-card/50 backdrop-blur-sm card-hover">
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 animate-float">
              {categoryIcons[currentObjection.category]}
            </div>
            <div className="space-y-4 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">
                  Difficulty:
                </span>
                <div className="animate-pulse-slow">
                  {difficultyIcons[currentObjection.difficulty]}
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent animate-pulse-slow" />
                <p className="bg-primary/5 p-4 rounded-md border border-primary/10 text-primary relative z-10">
                  {currentObjection.text}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Your Response:</h3>
            <Textarea
              value={userResponse}
              onChange={(e) => setUserResponse(e.target.value)}
              placeholder="Type your response to the objection..."
              className="min-h-[150px] text-base bg-background/50 backdrop-blur-sm"
            />
            <Button
              onClick={analyzeResponse}
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
              <h3 className="text-xl font-semibold">AI Feedback</h3>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent animate-pulse-slow" />
              <div className="bg-muted/50 backdrop-blur-sm p-4 rounded-lg relative z-10">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mt-1 animate-float">
                    <LightbulbIcon className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-muted-foreground">{feedback}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
} 