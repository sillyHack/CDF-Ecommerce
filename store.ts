import { create } from "zustand";
import {persist} from "zustand/middleware";
import { AddCartType } from "./types/AddCartType";

type CartState = {
    isOpen: boolean,
    cart: AddCartType[],
    toggleCart: () => void,
    clearCart: () => void,
    addProduct: (item: AddCartType) => void,
    removeProduct: (item: AddCartType) => void,
    paymentIntent: string,
    setPaymentIntent: (val: string) => void,
    onCheckout: string, // used to display the cart, checkout or success page in the location(like a toggle effect)
    setOnCheckout: (val: string) => void
}

export const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            cart: [],
            isOpen: false,
            toggleCart: () => set((state) => ({isOpen: !state.isOpen})),
            clearCart: () => set((state) => ({cart: []})),
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
            }),
            paymentIntent: "",
            setPaymentIntent: (val) => set((state) => ({paymentIntent: val})),
            onCheckout: "cart",
            setOnCheckout: (val) => set((state) => ({onCheckout: val}))
        }),
        {name: "cart-store"}
    )
)