"use-client"

import Image from "next/image"
import { useCartStore } from "@/store"
import formatPrice from "@/util/PriceFormat"
import {IoAddCircle, IoRemoveCircle} from "react-icons/io5"
import basket from "@/public/basket.png"
import {motion, AnimatePresence} from "framer-motion"
import Checkout from "./Checkout"
import OrderConfirmed from "./OrderConfirmed"

export default function Cart(){
    const cartStore = useCartStore()

    // total price (here 'acc' is an accumulating variable initialized by default to 0 here)
    const totalPrice = cartStore.cart.reduce((acc, item) => {
        return acc + item.unit_amount! * item.quantity
    }, 0)
    return(
        // Background
        <motion.div 
            animate={{opacity: 1, x: -5}}
            initial={{opacity: 0, x: 0}}
            exit={{opacity: 0, x: 0}}
            onClick={() => {
                cartStore.toggleCart();
                // we put the state on 'cart' when we close the cart in order to avoid the automatic lottie play when we return
                cartStore.setOnCheckout("cart");
            }}
            className="fixed w-full h-screen left-0 top-0 bg-black/25"
        >
            {/* Our cart */}
            {/* if we click on this div, the cart will be toggled as well the parent propagate the onclick to the children */}
            {/* To stop that, we the stopPropagation() method on the children to not toggle when we click on them */}
            <motion.div layout onClick={(e) => e.stopPropagation()} className="bg-white absolute right-0 top-0 h-screen p-12 overflow-y-auto text-gray-700 w-full lg:w-2/5">
                
                {cartStore.onCheckout === "cart" && (
                    <button className="text-lg font-bold" onClick={cartStore.toggleCart}>Continuer mes achats 🏃‍♂️</button>
                )}

                {cartStore.onCheckout === "checkout" && (
                    <button className="text-lg font-bold" onClick={() => cartStore.setOnCheckout("cart")}>Voir le panier 🛒</button>
                )}

                {/* Cart items */}
                {cartStore.onCheckout === "cart" && (
                    <>
                        {cartStore.cart.map((item) => (
                            // 'layout' property allows us to nicely remove any children from the list
                            <motion.div layout key={item.id} className="flex py-4 gap-4">
                                <Image className="rounded-md h-24 object-cover" src={item.image} alt={item.name} width={100} height={100}/>
                                <motion.div layout>
                                    <h2>{item.name}</h2>

                                    {/* update the product quantity */}
                                    <div className="flex gap-2 items-center justify-center">
                                        <h2>Quantité: {item.quantity}</h2>
                                        <IoRemoveCircle className="cursor-pointer" onClick={() => cartStore.removeProduct(item)}/>
                                        <IoAddCircle className="cursor-pointer" onClick={() => cartStore.addProduct(item)}/>
                                    </div>

                                    <p className="text-sm">{item.unit_amount && formatPrice(item.unit_amount)}</p>
                                </motion.div>
                            </motion.div>
                        ))}
                    </>
                )}
                {/* Not empty cart */}
                {/* On n'affiche pas le bouton lorsque l'on dans la page de paiement */}
                {   cartStore.cart.length > 0 && cartStore.onCheckout === "cart" ? (  
                        <div>
                            {/* total price and checkout */}
                            <p>Total: {formatPrice(totalPrice)}</p>
                            <button onClick={() => cartStore.setOnCheckout("checkout")} className="py-2 mt-4 w-full bg-pink-700 rounded-md text-white hover:bg-pink-500 transition">Procéder au paiement</button>
                        </div>)
                        : 
                        null
                }

                {/* checkout form */}
                {cartStore.onCheckout === "checkout" && <Checkout />}
                {cartStore.onCheckout === "success" && <OrderConfirmed />}

                {/* Empty cart */}
                <AnimatePresence>
                    {
                        !cartStore.cart.length && cartStore.onCheckout === "checkout" &&
                        <motion.div 
                            animate={{scale: 1, rotateZ: 0, opacity: 0.75}}
                            initial={{scale: 0, rotateZ: -10, opacity: 0.5}}
                            exit={{scale: 0, rotateZ: -10, opacity: 0.5}}
                            className="flex flex-col items-center gap-12 text-2xl font-medium pt-56 opacity-75"
                        >
                            <h1>Votre panier est vide.. 😥</h1>
                            <Image src={basket} alt="panier vide" width={200} height={200}/>
                        </motion.div>
                    }
                </AnimatePresence>
            </motion.div>
        </motion.div>
    )
}