"use client"

import {ReactNode, useEffect, useState} from "react"

// Hydration is used to always get a state synchronized between server and client even if we refresh the page
export default function Hydrate({children}: {children: ReactNode}){
    const [isHydrated, setIsHydrated] = useState(false);

    // wait till nextJS rehydration completed
    useEffect(() => {
        setIsHydrated(true)
    }, []);

    return(
        <>
            {isHydrated ? <>{children}</> : <div>Loading...</div>}
        </>
    )   
}