"use client";

import { useCartStore } from "@/store";
import { AddCartType } from "@/types/AddCartType";
import { useState } from "react";

/**
 * The button that will add a product to the cart
 * 
 * @param productObject the product to add
 * @returns the button component
 */
export default function AddCart({name, id, image, unit_amount, quantity}: AddCartType){
    const cartStore = useCartStore();
    const [added, setAdded] = useState(false);

    const handleAddToCart = () => {
        cartStore.addProduct({id, image, name, unit_amount, quantity})
        setAdded(true);
        setTimeout(() => {
            setAdded(false);
        }, 500);
    }

    return(
        <>
            <button onClick={handleAddToCart} disabled={added} className="my-4 w-full btn btn-primary text-white">
                {!added ? "Ajouter au panier" : "Ajout en cours.."}
            </button>
        </>
    )
}