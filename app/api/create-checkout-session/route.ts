import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
});

const PLANS = {
  basic: {
    price: 'price_1QzpSpLE4SNcqRNLcdLCQ1Er',
    name: 'Basic Plan'
  },
  pro: {
    price: 'price_1QzpV0LE4SNcqRNLBN5CjmGP',
    name: 'Pro Plan'
  }
};

export async function POST(req: Request) {
  try {
    const { plan, successUrl, cancelUrl } = await req.json();
    
    if (!plan || !PLANS[plan as keyof typeof PLANS]) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: PLANS[plan as keyof typeof PLANS].price,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: successUrl || `${process.env.NEXT_PUBLIC_URL}/dashboard?success=true`,
      cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_URL}/pricing?canceled=true`,
      allow_promotion_codes: true,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Error creating checkout session' },
      { status: 500 }
    );
  }
} 