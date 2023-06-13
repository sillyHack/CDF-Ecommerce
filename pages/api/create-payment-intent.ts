import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { AddCartType } from "@/types/AddCartType";
import { PrismaClient } from "@prisma/client";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2022-11-15"
})

const prisma = new PrismaClient()

const calculateOrderAmount = (items: AddCartType[]) => {
    const totalPrice = items.reduce((acc, item) => {
        return acc + item.quantity * item.unit_amount!
    }, 0)
    return totalPrice
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // get user
    const userSession = await getServerSession(req, res, authOptions)
    // if we have no user
    if(!userSession?.user){
        res.status(403).json({message: "Utilisateur non connecté.."})
        return
    }

    // extract the data from the body(items -> the items in our cart, payment_intent_id -> empty pair of string)
    const {items, payment_intent_id} = req.body

    // create the order data
    const orderData = {
        user: {connect: {id: userSession.user?.id}},
        amount: calculateOrderAmount(items),
        currency: "eur",
        status: "pending",
        paymentIntentID: payment_intent_id,
        products: {
            create: items.map((item) => ({
                name: item.name,
                description: item.description || null,
                unit_amount: parseFloat(item.unit_amount),
                image: item.image,
                quantity: item.quantity
            }))
        }
    }

    // check if payment intent exists, if so just update the order
    if(payment_intent_id){
        const current_intent = await stripe.paymentIntents.retrieve(payment_intent_id)

        if(current_intent){
            const updated_intent = await stripe.paymentIntents.update(
                payment_intent_id,
                {amount: calculateOrderAmount(items)}
            )

            // fetch order with product IDs
            const existing_order =  await prisma.order.findFirst({
                where: {paymentIntentID: updated_intent.id},
                include: {products: true}
            })
            if(!existing_order){
                res.status(400).json({message: "Invalid payment intent"})
                return
            }

            // update existing order
            const updated_order = await prisma.order.update({
                where: {id: existing_order?.id},
                data: {
                    // we update the amount and the products
                    amount: calculateOrderAmount(items),
                    products: {
                        // here we wanna delete all the products and recreate them 
                        deleteMany: {},
                        create: items.map((item) => ({
                            name: item.name,
                            description: item.description || null,
                            unit_amount: parseFloat(item.unit_amount),
                            image: item.image,
                            quantity: item.quantity
                        }))
                    }
                }
            })
            res.status(200).json({paymentIntent: updated_intent})
            return
        }
    }else{
        // create a new order with prisma
        const paymentIntent = await stripe.paymentIntents.create({
            amount: calculateOrderAmount(items),
            currency: "eur",
            automatic_payment_methods: {enabled: true} // detect if we can use google pay or other staff like that
        })

        orderData.paymentIntentID = paymentIntent.id
        const newOrder = await prisma.order.create({
            data: orderData
        })

        res.status(200).json({paymentIntent})
        return
    }
    
}