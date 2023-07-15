"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import congrats from "@/public/congrats.gif"
import Link from "next/link"
import { useCartStore } from "@/store"
import {useEffect} from "react"

export default function OrderConfirmed(){
    const cartStore = useCartStore()

    // when this component loads, we set the payment intent to nothing and we clear the cart
    useEffect(() => {
        cartStore.setPaymentIntent("")
        cartStore.clearCart()
    }, [])

    // close the cart and go to cart part of the checkout process
    const checkoutOrder = () => {
        setTimeout(() => {
            cartStore.setOnCheckout("cart")
        }, 1000)
        cartStore.toggleCart()
    }

    return(
        <motion.div
            initial={{scale: 0.5, opacity: 0}}
            animate={{scale: 1, opacity: 1}}
            className="flex items-center justify-center my-12"
        >
            <div className="p-12 text-center">
                <h1 className="text-xl font-medium">Votre commande a été enregistré 🚀</h1>
                <h2 className="text-sm my-4">Vous recevrez un email de confirmation</h2>
                <Image src={congrats} alt="cheers" className="py-8"/>
                <div className="flex items-center justify-center gap-12">
                    <Link href={'/dashboard'}>
                        <button className="mt-4 w-full btn btn-primary text-white" onClick={checkoutOrder}>Vérifier la commande</button>
                    </Link>
                </div>
            </div>
            
        </motion.div>
    )
}