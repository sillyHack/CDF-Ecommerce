import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import Stripe from "stripe"

const prisma = new PrismaClient()

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string, // we use "as string" bcz TypeScript consider variables from .env file as potentially undefined and we to tell that it's fine, we are sure that the values are not undefined
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    events: {
        // everytime a new user signs up, we create a new customer on stripe
        createUser: async ({user} : {user: any}) => {
            const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
                apiVersion: "2022-11-15"
            })
            // create a new stripe customer
            if(user.name && user.email){
                const customer = await stripe.customers.create({
                    email: user.email,
                    name: user.name
                })

                // updating our prisma user with the stripeCustomerId 
                await prisma.user.update({
                    where: {id: user.id},
                    data: {stripeCustomerId: customer.id}
                })
            }
        },
    }
}

export default NextAuth(authOptions)