"use client"
import { SessionProvider } from "next-auth/react"

export function Provider({children}:any) {
    return (
        <div>
            <SessionProvider>
        {children}
        </SessionProvider>
        </div>
    )
}