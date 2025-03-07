"use client"

import { useState } from "react"
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/mode-toggle"
import { UserNav } from "@/components/user-nav"
import BusinessQATrainer from "@/components/ai-modules/BusinessQATrainer"
import PricingStrategyEngine from "@/components/pricing/PricingStrategyEngine"
import NegotiationTrainer from "@/components/negotiation/NegotiationTrainer"
import { SavedResponses } from "@/components/features/saved-responses"
import { Brain, Calculator, MessageSquare, Save, DollarSign, HelpCircle, MessageCircle, Zap, Target } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface DashboardProps {
  isPremium: boolean
}

export default function Dashboard({ isPremium = false }: DashboardProps) {
  const [activeFeature, setActiveFeature] = useState<string>("business-qa-trainer")
  const [usageCounts, setUsageCounts] = useState<Record<string, number>>({
    "business-qa-trainer": 0,
    "pricing-strategy": 0,
    "negotiation-trainer": 0,
    "saved-responses": 0,
  })

  const features = [
    {
      id: "business-qa-trainer",
      name: "AI Business Q&A Trainer",
      description: "Practice answering business questions with dynamic difficulty levels",
      icon: Brain,
      component: BusinessQATrainer,
    },
    {
      id: "pricing-strategy",
      name: "Pricing Strategy Engine",
      description: "Get personalized pricing recommendations and scripts",
      icon: Calculator,
      component: PricingStrategyEngine,
    },
    {
      id: "negotiation-trainer",
      name: "Negotiation Trainer",
      description: "Practice handling real-world pricing objections",
      icon: Target,
      component: NegotiationTrainer,
    },
    {
      id: "saved-responses",
      name: "Saved Responses",
      description: "Access and manage your saved responses",
      icon: Save,
      component: SavedResponses,
    },
  ]

  const incrementUsage = (featureId: string) => {
    if (!isPremium) {
      setUsageCounts((prev) => ({
        ...prev,
        [featureId]: prev[featureId] + 1,
      }))
    }
  }

  const isFeatureLimited = (featureId: string) => {
    return !isPremium && usageCounts[featureId] >= 2
  }

  const ActiveComponent = features.find((f) => f.id === activeFeature)?.component || features[0].component

  return (
    <div className="h-screen flex flex-col">
      <SidebarProvider>
        <div className="flex h-full">
          <Sidebar>
            <SidebarHeader className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                  B
                </div>
                <span className="font-bold text-lg">BizBot</span>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarMenu>
                {features.map((feature) => (
                  <SidebarMenuItem key={feature.id}>
                    <SidebarMenuButton
                      isActive={activeFeature === feature.id}
                      onClick={() => setActiveFeature(feature.id)}
                    >
                      <feature.icon className="h-5 w-5" />
                      <span>{feature.name}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarContent>
            <SidebarFooter className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Help</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MessageCircle className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Feedback</span>
                </div>
              </div>
            </SidebarFooter>
          </Sidebar>

          <div className="flex-1 flex flex-col overflow-hidden">
            <header className="border-b bg-background">
              <div className="flex h-16 items-center px-4 sm:px-6">
                {!isPremium && (
                  <div className="mr-auto">
                    <Link href="/pricing">
                      <Button size="sm" variant="outline">
                        Upgrade to Premium
                      </Button>
                    </Link>
                  </div>
                )}
                <div className="ml-auto flex items-center space-x-4">
                  <ModeToggle />
                  <UserNav isPremium={isPremium} />
                </div>
              </div>
            </header>

            <main className="flex-1 overflow-auto p-4 sm:p-6 md:p-8">
              {!isPremium && isFeatureLimited(activeFeature) ? (
                <div className="h-full flex flex-col items-center justify-center">
                  <Alert className="max-w-xl">
                    <AlertTitle>Usage limit reached</AlertTitle>
                    <AlertDescription>
                      You've reached the limit of 2 responses for this feature in the demo version. Upgrade to Premium
                      for unlimited access to all features.
                    </AlertDescription>
                    <div className="mt-4">
                      <Link href="/pricing">
                        <Button>Upgrade to Premium</Button>
                      </Link>
                    </div>
                  </Alert>
                </div>
              ) : (
                <ActiveComponent
                  isPremium={isPremium}
                  onUse={() => incrementUsage(activeFeature)}
                  usageCount={usageCounts[activeFeature]}
                />
              )}
            </main>

            <footer className="border-t py-4 px-6 text-center text-sm text-muted-foreground">
              <div className="flex justify-center space-x-4">
                <span>Help</span>
                <span>|</span>
                <span>Feedback</span>
                <span>|</span>
                <span>Contact Support</span>
              </div>
            </footer>
          </div>
        </div>
      </SidebarProvider>
    </div>
  )
}

