"use client"

import { authClient } from "@/lib/auth-client"
import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
    id: string
    name: string
    email: string
    image: string
    role: string
    completed: boolean
}

interface AuthContextType {
    user: User | null
    // login: (email: string, password: string) => Promise<void>
    // signup: (userData: any) => Promise<void>
    logout: () => void
    isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)


    async function getSession() {
        try {
            const { data: session } = await authClient.getSession();
            if (session) {
                const { user: sessionUser } = session;
                setUser(sessionUser);
            }

        } catch (error) {
            console.error('Error fetching session:', error);
            return null;
        }
    }
    useEffect(() => {
        getSession()
        setIsLoading(false)
    }, [])


    const logout = async () => {
        authClient.signOut();
        setUser(null)
    }

    return <AuthContext.Provider value={{ user, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
