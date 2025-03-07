import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Objection {
  type: string;
  text: string;
  suggestedRebuttals: string[];
  psychologicalTactics: string[];
}

interface NegotiationTrainerProps {
  isPremium: boolean;
  onUse: () => void;
  usageCount: number;
}

const NegotiationTrainer: React.FC<NegotiationTrainerProps> = ({ isPremium, onUse, usageCount }) => {
  const [currentObjection, setCurrentObjection] = useState<Objection | null>(null);
  const [userResponse, setUserResponse] = useState('');
  const [feedback, setFeedback] = useState<string[]>([]);
  const [objectionType, setObjectionType] = useState('price');

  const objectionTypes = [
    { value: 'price', label: 'Price Objections' },
    { value: 'value', label: 'Value Objections' },
    { value: 'competitor', label: 'Competitor Comparisons' },
    { value: 'timing', label: 'Timing Objections' },
  ];

  const objectionDatabase: Record<string, Objection[]> = {
    price: [
      {
        type: 'price',
        text: "That's way too expensive for what you're offering.",
        suggestedRebuttals: [
          "Let's focus on the return on investment rather than the initial cost.",
          "What would be a comfortable investment range for you?",
          "Could you help me understand what price point you were expecting?",
        ],
        psychologicalTactics: [
          "Use value-based pricing discussion",
          "Break down cost into smaller daily/monthly amounts",
          "Compare to cost of not taking action",
        ],
      },
      {
        type: 'price',
        text: "I can find someone cheaper who offers the same thing.",
        suggestedRebuttals: [
          "What specific features are you comparing?",
          "While there may be cheaper options, our focus is on delivering premium value.",
          "Could you share what alternatives you're considering? I'd love to explain our unique advantages.",
        ],
        psychologicalTactics: [
          "Highlight unique differentiators",
          "Focus on long-term benefits",
          "Address quality vs. cost trade-off",
        ],
      },
    ],
    value: [
      {
        type: 'value',
        text: "I don't see how this will benefit our business.",
        suggestedRebuttals: [
          "Let me share some specific examples of how similar businesses have benefited.",
          "What specific outcomes would make this investment worthwhile for you?",
          "Could you tell me more about your current challenges?",
        ],
        psychologicalTactics: [
          "Use case studies and social proof",
          "Paint picture of before/after scenarios",
          "Focus on pain points and solutions",
        ],
      },
    ],
    competitor: [
      {
        type: 'competitor',
        text: "Your competitor offers more features for the same price.",
        suggestedRebuttals: [
          "Which specific features are you most interested in?",
          "Our focus is on delivering quality over quantity.",
          "Let me explain our unique approach and why it might be more valuable for you.",
        ],
        psychologicalTactics: [
          "Differentiate on quality and service",
          "Focus on specific client needs",
          "Highlight unique methodology",
        ],
      },
    ],
    timing: [
      {
        type: 'timing',
        text: "We're not ready to make this decision right now.",
        suggestedRebuttals: [
          "What would need to happen for you to feel ready?",
          "Could you share your concerns about timing?",
          "What if we created a phased approach?",
        ],
        psychologicalTactics: [
          "Create urgency without pressure",
          "Offer flexible timeline options",
          "Address underlying concerns",
        ],
      },
    ],
  };

  const generateObjection = () => {
    onUse();
    const objections = objectionDatabase[objectionType];
    const randomIndex = Math.floor(Math.random() * objections.length);
    setCurrentObjection(objections[randomIndex]);
    setUserResponse('');
    setFeedback([]);
  };

  const analyzeResponse = () => {
    if (!currentObjection || !userResponse) return;

    const newFeedback: string[] = [];
    
    // Length check
    if (userResponse.length < 50) {
      newFeedback.push("❌ Response is too brief. Elaborate more on your points.");
    } else {
      newFeedback.push("✅ Good response length.");
    }

    // Tone analysis
    if (userResponse.toLowerCase().includes('but')) {
      newFeedback.push("⚠️ Try avoiding defensive language ('but'). Use 'and' instead.");
    }

    // Value focus
    if (userResponse.toLowerCase().includes('value') || userResponse.toLowerCase().includes('benefit')) {
      newFeedback.push("✅ Good focus on value proposition.");
    } else {
      newFeedback.push("❌ Consider emphasizing the value more explicitly.");
    }

    // Question usage
    if (userResponse.includes('?')) {
      newFeedback.push("✅ Good use of questions to engage the client.");
    } else {
      newFeedback.push("⚠️ Consider asking questions to better understand the client's perspective.");
    }

    // Suggested improvements
    newFeedback.push("\nSuggested Tactics:");
    currentObjection.psychologicalTactics.forEach(tactic => {
      newFeedback.push(`📌 ${tactic}`);
    });

    setFeedback(newFeedback);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Negotiation Trainer</h2>
        <Select value={objectionType} onValueChange={setObjectionType}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select objection type" />
          </SelectTrigger>
          <SelectContent>
            {objectionTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          <Button onClick={generateObjection}>Generate New Objection</Button>
          
          {currentObjection && (
            <>
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Client Objection:</h3>
                <p className="text-lg">{currentObjection.text}</p>
              </div>

              <div className="mt-4">
                <h3 className="font-semibold mb-2">Your Response:</h3>
                <Textarea
                  value={userResponse}
                  onChange={(e) => setUserResponse(e.target.value)}
                  placeholder="Type your response to handle this objection..."
                  className="min-h-[150px]"
                />
              </div>

              <Button onClick={analyzeResponse} disabled={!userResponse}>
                Analyze Response
              </Button>

              {feedback.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-semibold mb-2">Feedback & Coaching:</h3>
                  <div className="space-y-2">
                    {feedback.map((item, index) => (
                      <p key={index}>{item}</p>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-6">
                <h3 className="font-semibold mb-2">Sample Rebuttals:</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {currentObjection.suggestedRebuttals.map((rebuttal, index) => (
                    <li key={index}>{rebuttal}</li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      </Card>
    </div>
  );
};

export default NegotiationTrainer; 