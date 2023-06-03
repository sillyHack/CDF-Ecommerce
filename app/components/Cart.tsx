"use-client"

import Image from "next/image"
import { useCartStore } from "@/store"
import formatPrice from "@/util/PriceFormat"
import {IoAddCircle, IoRemoveCircle} from "react-icons/io5"
import basket from "@/public/basket.png"

export default function Cart(){
    const cartStore = useCartStore()

    // total price (here 'acc' is an accumulating variable initialized by default to 0 here)
    const totalPrice = cartStore.cart.reduce((acc, item) => {
        return acc + item.unit_amount! * item.quantity
    }, 0)
    return(
        <div onClick={cartStore.toggleCart} className="fixed w-full h-screen left-0 top-0 bg-black/25">
            {/* if we click on this div, the cart will be toggled as well the parent propagate the onclick to the children */}
            {/* To stop that, we the stopPropagation() method on the children to not toggle when we click on them */}
            <div onClick={(e) => e.stopPropagation()} className="bg-white absolute right-0 top-0 w-1/4 h-screen p-12 overflow-y-auto text-gray-700">
                <h1 className="text-lg font-bold">Panier</h1>
                {cartStore.cart.map((item) => (
                    <div key={item.id} className="flex py-4 gap-4">
                        <Image className="rounded-md h-24 object-cover" src={item.image} alt={item.name} width={100} height={100}/>
                        <div>
                            <h2>{item.name}</h2>

                            {/* update the product quantity */}
                            <div className="flex gap-2 items-center justify-center">
                                <h2>Quantité: {item.quantity}</h2>
                                <IoRemoveCircle className="cursor-pointer" onClick={() => cartStore.removeProduct(item)}/>
                                <IoAddCircle className="cursor-pointer" onClick={() => cartStore.addProduct(item)}/>
                            </div>

                            <p className="text-sm">{item.unit_amount && formatPrice(item.unit_amount)}</p>
                        </div>
                    </div>
                ))}
                {   cartStore.cart.length > 0 && 
                    <div>
                        {/* total price */}
                        <p>Total: {formatPrice(totalPrice)}</p>
                        <button className="py-2 mt-4 w-full bg-pink-700 rounded-md text-white hover:bg-pink-500 transition">Valider et payer</button>
                    </div>
                }
                {
                    !cartStore.cart.length && 
                    <div className="flex flex-col items-center gap-12 text-2xl font-medium pt-56 opacity-75">
                        <h1>Votre panier est vide.. 😥</h1>
                        <Image src={basket} alt="panier vide" width={200} height={200}/>
                    </div>
                }
            </div>
        </div>
    )
}