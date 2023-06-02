"use client" // that's bcz we wanna implement interactivity with the UI like onclicklisteners...

import { Session } from "next-auth"
import { signIn } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import Cart from "./Cart"
import { useCartStore } from "@/store"
import {AiFillShopping} from "react-icons/ai"

export default function Nav({user} : Session) { // we are saying the user here has a type of Session
    const cartStore = useCartStore()

    return (
        <nav className="flex justify-between items-center py-12">
            <Link href={"/"}><h1>CDF</h1></Link>
            <ul className="flex items-center gap-12">
                <li onClick={cartStore.toggleCart} className="flex items-center text-3xl relative cursor-pointer">
                    <AiFillShopping />
                    <span className="bg-red-700 text-white text-sm w-5 h-5 rounded-full absolute left-4 bottom-4 flex justify-center">
                        {cartStore.cart.length}
                    </span>
                </li>
                {/* If the user isn't signed in */}
                {!user && (
                    <li>
                        <button className="bg-pink-700 text-white py-2 px-4 rounded-md" onClick={() => signIn()}>Se connecter</button>
                    </li>
                )}
                {/* If the use is signed in */}
                {user && (
                    <li>
                        <Image 
                            src={user?.image as string} 
                            alt={user?.name as string} 
                            width={35} 
                            height={35}
                            className="rounded-full"/>
                    </li>
                )}
            </ul>
            {cartStore.isOpen && <Cart />}
        </nav>
    )
}