import { create } from "zustand";
import {persist} from "zustand/middleware";
import { AddCartType } from "./types/AddCartType";

type CartSate = {
    isOpen: boolean,
    cart: AddCartType[],
    toggleCart: () => void,
    addProduct: (item: AddCartType) => void,
    removeProduct: (item: AddCartType) => void
}

export const useCartStore = create<CartSate>()(
    persist(
        (set) => ({
            cart: [],
            isOpen: false,
            toggleCart: () => set((state) => ({isOpen: !state.isOpen})),
            addProduct: (item) => set((state) => {
                const existingItem = state.cart.find(cartItem => cartItem.id === item.id)
                // we check if the item exist and we add then 1 to the quantity
                if(existingItem){
                    const updatedCart = state.cart.map((cartItem) => {
                        if(cartItem.id === item.id){
                            return {...cartItem, quantity: cartItem.quantity + 1}
                        }
                        return cartItem
                    })
                    return {cart: updatedCart}
                }else{
                    return {cart: [...state.cart, {...item, quantity: 1}]}
                }
            }),
            removeProduct: (item) => set((state) => {
                const existingItem = state.cart.find(cartItem => cartItem.id === item.id)
                // we check if the item exist and we remove then 1 to the quantity
                if(existingItem && existingItem.quantity > 1){
                    const updatedCart = state.cart.map((cartItem) => {
                        if(cartItem.id === item.id){
                            return {...cartItem, quantity: cartItem.quantity - 1}
                        }
                        return cartItem
                    })
                    return {cart: updatedCart}
                }else{
                    // we remove item from cart
                    const filteredCart = state.cart.filter((cartItem) => cartItem.id !== item.id)
                    return {cart: filteredCart}
                }
            })
        }),
        {name: "cart-store"}
    )
)