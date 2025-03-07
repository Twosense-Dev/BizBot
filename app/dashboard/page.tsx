'use client';

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AIBusinessTrainer from "@/components/ai-business-trainer";
import PricingStrategy from "@/components/pricing-strategy";
import NegotiationTrainer from "@/components/negotiation-trainer";
import {
  Brain,
  DollarSign,
  MessageSquare,
  Save,
  Sparkles,
} from "lucide-react";
import '@/styles/animations.css';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState("ai-trainer");

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse-slow">
          <Sparkles className="h-8 w-8 text-primary" />
        </div>
      </div>
    );
  }

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto py-10">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent blur-3xl -z-10" />
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <TabsList className="grid grid-cols-4 w-[600px] p-1 bg-background/50 backdrop-blur-sm border">
                <TabsTrigger 
                  value="ai-trainer" 
                  className="flex items-center gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary transition-all duration-300"
                >
                  <Brain className="h-4 w-4" />
                  AI Trainer
                </TabsTrigger>
                <TabsTrigger 
                  value="pricing" 
                  className="flex items-center gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary transition-all duration-300"
                >
                  <DollarSign className="h-4 w-4" />
                  Pricing
                </TabsTrigger>
                <TabsTrigger 
                  value="negotiation" 
                  className="flex items-center gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary transition-all duration-300"
                >
                  <MessageSquare className="h-4 w-4" />
                  Negotiation
                </TabsTrigger>
                <TabsTrigger 
                  value="saved" 
                  className="flex items-center gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary transition-all duration-300"
                >
                  <Save className="h-4 w-4" />
                  Saved
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent blur-3xl -z-10" />
              
              <TabsContent value="ai-trainer" className="space-y-4">
                <AIBusinessTrainer />
              </TabsContent>

              <TabsContent value="pricing" className="space-y-4">
                <PricingStrategy />
              </TabsContent>

              <TabsContent value="negotiation" className="space-y-4">
                <NegotiationTrainer />
              </TabsContent>

              <TabsContent value="saved" className="space-y-4">
                <div className="rounded-lg border p-8 text-center bg-card/50 backdrop-blur-sm">
                  <div className="animate-float">
                    <Save className="h-12 w-12 text-primary/50 mx-auto mb-4" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">Saved Responses</h3>
                  <p className="text-muted-foreground">
                    Your saved responses and templates will appear here.
                  </p>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

