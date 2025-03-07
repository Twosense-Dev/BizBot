"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, ArrowLeft, CreditCard } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function PricingPlans() {
  const router = useRouter()
  const [isPaymentOpen, setIsPaymentOpen] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSubscribe = () => {
    setIsPaymentOpen(true)
  }

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setIsPaymentOpen(false)
      router.push("/dashboard")
    }, 2000)
  }

  return (
    <>
      <header className="border-b bg-background">
        <div className="container flex h-16 items-center px-4 sm:px-6">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
              B
            </div>
            <span className="font-bold text-lg">BizBot</span>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <div className="container max-w-6xl py-10 px-4 sm:px-6 lg:py-16">
          <div className="mb-10">
            <Link
              href="/"
              className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to home
            </Link>
          </div>

          <div className="text-center mb-16">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Choose Your Plan</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Select the plan that best fits your needs. All plans include access to our core features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <Card>
              <CardHeader>
                <CardTitle>Demo</CardTitle>
                <CardDescription>Try before you subscribe</CardDescription>
                <div className="mt-4 text-4xl font-bold">Free</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                    <span>Limited to 2 responses per feature</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                    <span>Access to all features</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                    <span>No credit card required</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link href="/demo" className="w-full">
                  <Button variant="outline" className="w-full">
                    Try Demo
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Premium Plan */}
            <Card className="border-primary">
              <CardHeader>
                <div className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full w-fit mb-2">
                  RECOMMENDED
                </div>
                <CardTitle>Premium</CardTitle>
                <CardDescription>Full access to all features</CardDescription>
                <div className="mt-4 text-4xl font-bold">
                  $10<span className="text-lg text-muted-foreground font-normal">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                    <span>Unlimited responses</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                    <span>Save and organize responses</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                    <span>Priority support</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                    <span>Cancel anytime</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={handleSubscribe}>
                  Subscribe Now
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto text-left">
              <div>
                <h3 className="font-medium mb-2">Can I cancel my subscription?</h3>
                <p className="text-muted-foreground text-sm">
                  Yes, you can cancel your subscription at any time. You'll continue to have access until the end of
                  your billing period.
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Is there a free trial?</h3>
                <p className="text-muted-foreground text-sm">
                  We offer a demo version that lets you try all features with a limit of 2 responses per feature.
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">How does billing work?</h3>
                <p className="text-muted-foreground text-sm">
                  You'll be billed monthly on the date you subscribed. We accept all major credit cards.
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Do you offer refunds?</h3>
                <p className="text-muted-foreground text-sm">
                  If you're not satisfied with BizBot, contact us within 14 days of your purchase for a full refund.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Dialog open={isPaymentOpen} onOpenChange={setIsPaymentOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Payment Information</DialogTitle>
            <DialogDescription>Enter your payment details to subscribe to the Premium plan.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handlePaymentSubmit}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="card-name">Name on Card</Label>
                <Input id="card-name" placeholder="John Doe" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="card-number">Card Number</Label>
                <Input id="card-number" placeholder="4242 4242 4242 4242" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input id="expiry" placeholder="MM/YY" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" placeholder="123" required />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isProcessing} className="w-full">
                {isProcessing ? (
                  <>Processing...</>
                ) : (
                  <>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Pay $10.00
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

