"use client"

import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import { useCartStore } from "@/store"
import {useState, useEffect, useLayoutEffect} from "react"
import { useRouter } from "next/navigation"
import CheckoutForm from "./CheckoutForm"
import OrderAnimation from "./OrderAnimation"
import { useThemeStore } from "@/store"

// when we wanna fetch smth from the client with process.env, we have to prefix the variable with NEXT_PUBLIC
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function Checkout(){
    const cartStore = useCartStore()
    const router = useRouter()
    const [clientSecret, setClientSecret] = useState("") // the client secret is used to authorize a payment 

    useLayoutEffect(() => {
        // create a payment intent as soon as the page loads up
        fetch("/api/create-payment-intent", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                items: cartStore.cart,
                payment_intent_id: cartStore.paymentIntent
            })
        }).then((res) => {
            // if user not logged in
            if(res.status === 403){
                return router.push('/api/auth/signin')
            }
            return res.json()
        }).then((data) => {
            setClientSecret(data.paymentIntent.client_secret)
            cartStore.setPaymentIntent(data.paymentIntent.id)
        })
    }, [])

    // theme store
    const themeStore = useThemeStore()

    const options: StripeElementsOptions = {
        clientSecret,
        appearance: {
            theme: themeStore.mode === "dark" ? "night" : "stripe",
            labels: "floating"
        }
    }

    

    return(
        <div>
            {/* Animation during loading of client secret */}
            {!clientSecret && <OrderAnimation />}
            
            {clientSecret && (
                <div>
                    <Elements options={options} stripe={stripePromise}>
                        <CheckoutForm clientSecret={clientSecret}/>
                    </Elements>
                </div>
            )}
        </div>
    )
}