import { stripe } from "@/src/lib/stripe";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // API Routes //
    const priceIdList  = req.body

    if (req.method !== 'POST') {
        return res.status(500).json({ error: 'Method not allowed.' })
    }

    if (!priceIdList) {
        return res.status(400).json({ error: 'Price not found.' })
    }

    const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`
    const cancelUrl = `${process.env.NEXT_URL}/`

    const checkoutSession = await stripe.checkout.sessions.create({
        mode: 'payment',
        line_items: priceIdList,
        success_url: successUrl,
        cancel_url: cancelUrl
    })


    return res.status(201).json({
        checkoutUrl: checkoutSession.url
    })
}