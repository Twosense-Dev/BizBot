import { useState } from 'react';
import { getStripe } from '@/lib/stripe';

export function useStripeCheckout() {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async (plan: 'basic' | 'pro') => {
    try {
      setIsLoading(true);

      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan,
          successUrl: `${window.location.origin}/dashboard?success=true`,
          cancelUrl: `${window.location.origin}/pricing?canceled=true`,
        }),
      });

      const { sessionId, error } = await response.json();

      if (error) {
        throw new Error(error);
      }

      const stripe = await getStripe();
      if (!stripe) {
        throw new Error('Failed to load Stripe');
      }

      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (stripeError) {
        throw stripeError;
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error (e.g., show toast notification)
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handleCheckout,
  };
} 