"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Session, User } from "@supabase/supabase-js"

type AuthContextType = {
    user: User | null
    session: Session | null
    isLoading: boolean
    signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    session: null,
    isLoading: true,
    signOut: async () => { },
})

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [session, setSession] = useState<Session | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const supabase = createClient()

    useEffect(() => {
        let mounted = true

        async function getSession() {
            try {
                const { data: { session }, error } = await supabase.auth.getSession()
                if (error) throw error

                if (mounted) {
                    setSession(session)
                    setUser(session?.user ?? null)
                }
            } catch (error) {
                console.error("Error getting session:", error)
            } finally {
                if (mounted) {
                    setIsLoading(false)
                }
            }
        }

        getSession()

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                if (mounted) {
                    setSession(session)
                    setUser(session?.user ?? null)
                    setIsLoading(false)
                }
            }
        )

        return () => {
            mounted = false
            subscription.unsubscribe()
        }
    }, [supabase.auth])

    const signOut = async () => {
        try {
            await supabase.auth.signOut()
        } catch (error) {
            console.error("Error signing out:", error)
        }
    }

    const value = {
        user,
        session,
        isLoading,
        signOut,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
