"use client" // that's bcz we wanna implement interactivity with the UI like onclicklisteners...

import { Session } from "next-auth"
import { signIn } from "next-auth/react"
import Image from "next/image"

export default function Nav({user} : Session) { // we are saying the user here has a type of Session
    return (
        <nav className="flex justify-between items-center py-8">
            <h1>CDF</h1>
            <ul className="flex items-center gap-12">
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
                            width={48} 
                            height={48}
                            className="rounded-full"/>
                    </li>
                )}
            </ul>
        </nav>
    )
}