"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { signIn, signUp } from "@/lib/auth-client"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface AuthDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function AuthDialog({ open, onOpenChange }: AuthDialogProps) {
    const router = useRouter()
    const [signInData, setSignInData] = useState({ email: "", password: "", })
    const [signUpData, setSignUpData] = useState({ email: "", password: "", confirmPassword: "", })
    const [loading, setLoading] = useState(false)
    const [signInError, setSignInError] = useState("")
    const [signUpError, setSignUpError] = useState("")

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        console.log("Sign in:", signInData)
        await signIn.email(signUpData, {
            onSuccess: () => {
                toast.success("Logged in successfully!")
                setLoading(false)
                router.push("/internships")
            },
            onError: (ctx) => {
                setSignInError(ctx.error.message)
                toast.error("Log in failed, Please try again!")

            }
        })
    }

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault()

        setLoading(true)
        if (signUpData.password !== signUpData.confirmPassword) {
            setSignUpError("Passwords don't match!")
            setLoading(false)
            return
        }
        console.log("Sign up:", signUpData)

        await signUp.email({ ...signUpData, name: signUpData.email, role: "intern" }, {
            onSuccess: () => {
                toast.success("Account created successfully!")
                setLoading(false)
                router.push("/onboarding/intern")
            },
            onError: (ctx) => {
                setSignUpError(ctx.error.message)
                toast.error("Sign Up failed, Please try again!")

            }
        })
    }

    const handleGoogleAuth = () => {
        signIn.social({
            provider: 'google',

        })
        console.log("Continue with Google")
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-center text-2xl font-semibold">Welcome</DialogTitle>
                    <DialogDescription className="text-center">You need to log in to perform an action.</DialogDescription>
                </DialogHeader>

                <Tabs defaultValue="signin" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="signin">Sign In</TabsTrigger>
                        <TabsTrigger value="signup">Sign Up</TabsTrigger>
                    </TabsList>

                    <TabsContent value="signin" className="space-y-4 mt-6">
                        <form onSubmit={handleSignIn} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="signin-email">Email</Label>
                                <Input
                                    id="signin-email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={signInData.email}
                                    onChange={(e) => {
                                        setSignInData((prev) => ({ ...prev, email: e.target.value }))
                                        setSignInError("")
                                    }}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="signin-password">Password</Label>
                                <Input
                                    id="signin-password"
                                    type="password"
                                    placeholder="Enter your password"
                                    value={signInData.password}
                                    onChange={(e) => {
                                        setSignInData((prev) => ({ ...prev, password: e.target.value }))
                                        setSignInError("")

                                    }}
                                    required
                                />
                            </div>

                            {signInError && <p className="text-red-500">{signInError}</p>}

                            <Button type="submit" disabled={loading} className="w-full">
                                {loading ? "Signing in..." : "Sign In"}
                            </Button>
                        </form>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <Separator className="w-full" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                            </div>
                        </div>

                        <Button variant="outline" className="w-full gap-2" disabled={loading} onClick={handleGoogleAuth} >
                            <svg xmlns="http://www.w3.org/2000/svg" width="0.98em" height="1em" viewBox="0 0 256 262">
                                <path
                                    fill="#4285F4"
                                    d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                                ></path>
                                <path
                                    fill="#34A853"
                                    d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                                ></path>
                                <path
                                    fill="#FBBC05"
                                    d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
                                ></path>
                                <path
                                    fill="#EB4335"
                                    d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                                ></path>
                            </svg>
                            Continue with Google
                        </Button>
                    </TabsContent>

                    <TabsContent value="signup" className="space-y-4 mt-6">
                        <form onSubmit={handleSignUp} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="signup-email">Email</Label>
                                <Input
                                    id="signup-email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={signUpData.email}
                                    onChange={(e) => {
                                        setSignUpData((prev) => ({ ...prev, email: e.target.value }))
                                        setSignUpError("")

                                    }}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="signup-password">Password</Label>
                                <Input
                                    id="signup-password"
                                    type="password"
                                    placeholder="Create a password"
                                    value={signUpData.password}
                                    onChange={(e) => {
                                        setSignUpData((prev) => ({ ...prev, password: e.target.value }))
                                        setSignUpError("")
                                    }}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirm-password">Confirm Password</Label>
                                <Input
                                    id="confirm-password"
                                    type="password"
                                    placeholder="Confirm your password"
                                    value={signUpData.confirmPassword}
                                    onChange={(e) => {
                                        setSignUpData((prev) => ({ ...prev, confirmPassword: e.target.value }))
                                        setSignUpError("")
                                    }}
                                    required
                                />
                            </div>

                            {signUpError && <p className="text-red-500">{signUpError}</p>}


                            <Button type="submit" disabled={false} className="w-full">
                                {loading ? "Signing Up..." : "Sign Up"}
                            </Button>
                        </form>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <Separator className="w-full" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                            </div>
                        </div>

                        <Button
                            variant="outline"
                            className="w-full gap-2"
                            disabled={loading}
                            onClick={handleGoogleAuth}

                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="0.98em"
                                height="1em"
                                viewBox="0 0 256 262"
                            >
                                <path
                                    fill="#4285F4"
                                    d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                                ></path>
                                <path
                                    fill="#34A853"
                                    d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                                ></path>
                                <path
                                    fill="#FBBC05"
                                    d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
                                ></path>
                                <path
                                    fill="#EB4335"
                                    d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                                ></path>
                            </svg>
                            Continue with Google
                        </Button>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}
