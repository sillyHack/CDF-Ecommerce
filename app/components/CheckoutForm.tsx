"use client"

import {useState, useEffect} from "react"
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"
import formatPrice from "@/util/PriceFormat"
import { useCartStore } from "@/store"

export default function CheckoutForm({clientSecret}: {clientSecret: string}){
    const stripe = useStripe()
    const elements = useElements()
    const [isLoading, setIsLoading] = useState(false)
    
    const cartStore = useCartStore()

    const totalPrice = cartStore.cart.reduce((acc, item) => {
        return acc + item.quantity * item.unit_amount!
    }, 0)
    const formattedPrice = formatPrice(totalPrice)

    // we are not gonna render the form if stripe isn't initialized or if there is no client secret
    useEffect(() => {
        if(!stripe) return
        if(!clientSecret) return
    }, [stripe])

    const handleSubmit = async (e: React.FormEvent) => {
        // block page refreshing
        e.preventDefault()

        // security check if everything is loaded up
        if(!stripe || !elements) return

        // loading(that gonna disable the submit button)
        setIsLoading(true)

        stripe.confirmPayment({
            elements, // here it will gonna check auto. the user card details if they are correct or not
            redirect: "if_required"
        }).then((result) => {
            if(!result.error){
                cartStore.setOnCheckout("success")
            }
            setIsLoading(false)
        })
    }

    return(
        <form onSubmit={handleSubmit} id="payment-form">
            <PaymentElement id="payment-element" options={{layout: "tabs"}}/>
            <h1 className="py-4 text-sm font-bold">Total: {formattedPrice}</h1>
            <button className="mt-4 w-full btn btn-primary text-white disabled:opacity-25" id="submit" disabled={isLoading || !stripe || !elements}>
                <span id="button-text">
                    {isLoading ? <span className="text-black text-opacity-75">Traitement 👀</span> : <span>Payer 🔥</span>}
                </span>
            </button>
        </form>
        
    )
}