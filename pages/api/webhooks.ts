/**
 * Here with stripe webhooks, we can run our own custom code when events happen
 */

import Stripe from "stripe";
import { PrismaClient } from "@prisma/client";
import { buffer } from "micro";
import { NextApiRequest, NextApiResponse } from "next";
import { type } from "os";

export const config = {
    api: {
        bodyParser: false
    }
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2022-11-15"
})

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // we use the buffer here because stripe webhooks send req body as a raw bytes
    // so we need to use the buffer function to read those bytes
    const buf = await buffer(req)
    const sig = req.headers["stripe-signature"]

    if(!sig){
        return res.status(400).send("Missing the stripe signature..")
    }

    // get stripe event
    let event: Stripe.Event
    try{
        event = stripe.webhooks.constructEvent(
            buf,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET!
        )
    } catch(err){
        return res.status(400).send("Webhook error.." + err)
    }

    
    // handle different type of stripe event
    switch(event?.type){
        case "payment_intent.created":
            const paymentIntent = event.data.object
            console.log("Payment intent created !")
            break

        case "charge.succeeded":
            const charge = event.data.object as Stripe.Charge
            if(typeof charge.payment_intent == "string"){
                const order = await prisma.order.update({
                    where: {paymentIntentID: charge.payment_intent},
                    data: {status: "complete"}
                })
            }
            break
        default:
            console.log("Unhandled event type " + event,type)
            break
    }
    res.json({received: true})
}
