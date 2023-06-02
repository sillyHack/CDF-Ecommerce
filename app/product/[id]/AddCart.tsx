"use client"

import { useCartStore } from "@/store"
import { AddCartType } from "@/types/AddCartType"

export default function AddCart({name, id, image, unit_amount, quantity}: AddCartType){
    const cartStore = useCartStore();

    return(
        <>
            <button onClick={() => cartStore.addProduct({id, image, name, unit_amount, quantity})} className="my-12 text-white py-2 px-6 font-medium rounded-md bg-pink-700 hover:bg-pink-500 transition">Ajouter au panier</button>
        </>
    )
}