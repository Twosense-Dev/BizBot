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
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";

type DifficultyLevel = 'beginner' | 'skeptical' | 'aggressive';

interface Feedback {
  confidenceScore: number;
  tone: string;
  structure: string;
  improvements: string[];
}

interface BusinessQATrainerProps {
  isPremium: boolean;
  onUse: () => void;
  usageCount: number;
}

const BusinessQATrainer: React.FC<BusinessQATrainerProps> = ({ isPremium, onUse, usageCount }) => {
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('beginner');
  const [userResponse, setUserResponse] = useState('');
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [scenario, setScenario] = useState('');

  const difficultyScenarios = {
    beginner: [
      "I'm interested in your services, but I'd like to know more about what you offer.",
      "Could you tell me about your experience in this field?",
      "What makes your business unique?",
    ],
    skeptical: [
      "I've worked with similar providers before and wasn't impressed. Why should I choose you?",
      "Your competitors are offering lower prices. What's your justification?",
      "I need to see concrete evidence of your results. Can you provide case studies?",
    ],
    aggressive: [
      "Your prices are way too high. I can find someone cheaper easily.",
      "I don't see the value in what you're offering. Convince me.",
      "This seems like a waste of my time and money. What guarantees do you offer?",
    ],
  };

  const generateScenario = () => {
    const scenarios = difficultyScenarios[difficulty];
    const randomIndex = Math.floor(Math.random() * scenarios.length);
    setScenario(scenarios[randomIndex]);
    setFeedback(null);
    setUserResponse('');
    onUse();
  };

  const analyzeFeedback = () => {
    // This would be connected to your AI backend in production
    const mockFeedback: Feedback = {
      confidenceScore: Math.floor(Math.random() * 40) + 60, // 60-100
      tone: userResponse.length > 100 ? "Professional and thorough" : "Too brief, needs more detail",
      structure: userResponse.includes('because') ? "Good use of reasoning" : "Could use more explanation",
      improvements: [
        "Add specific examples to support your points",
        "Consider addressing potential concerns proactively",
        "Include a clear call to action",
      ],
    };
    setFeedback(mockFeedback);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">AI Business Q&A Trainer</h2>
        <Select value={difficulty} onValueChange={(value: DifficultyLevel) => setDifficulty(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="beginner">Beginner (Easy)</SelectItem>
            <SelectItem value="skeptical">Skeptical (Medium)</SelectItem>
            <SelectItem value="aggressive">Aggressive (Hard)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          <Button onClick={generateScenario}>Generate New Scenario</Button>
          
          {scenario && (
            <>
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Client Scenario:</h3>
                <p className="text-lg">{scenario}</p>
              </div>

              <div className="mt-4">
                <h3 className="font-semibold mb-2">Your Response:</h3>
                <Textarea
                  value={userResponse}
                  onChange={(e) => setUserResponse(e.target.value)}
                  placeholder="Type your response here..."
                  className="min-h-[150px]"
                />
              </div>

              <Button onClick={analyzeFeedback} disabled={!userResponse}>
                Analyze Response
              </Button>
            </>
          )}

          {feedback && (
            <div className="mt-6 space-y-4">
              <h3 className="font-semibold">Feedback Analysis:</h3>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span>Confidence Score:</span>
                  <span>{feedback.confidenceScore}%</span>
                </div>
                <Progress value={feedback.confidenceScore} className="h-2" />
              </div>

              <div>
                <h4 className="font-medium">Tone Analysis:</h4>
                <p>{feedback.tone}</p>
              </div>

              <div>
                <h4 className="font-medium">Structure Analysis:</h4>
                <p>{feedback.structure}</p>
              </div>

              <div>
                <h4 className="font-medium">Suggested Improvements:</h4>
                <ul className="list-disc pl-5">
                  {feedback.improvements.map((improvement, index) => (
                    <li key={index}>{improvement}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default BusinessQATrainer; 