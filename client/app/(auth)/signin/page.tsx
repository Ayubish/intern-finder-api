"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient, signIn } from "@/lib/auth-client";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";

const formSchema = z
    .object({
        email: z.string().email({ message: "Invalid email address" }),
        password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    })

type FormData = z.infer<typeof formSchema>;

export default function CompanySignUp() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data: FormData) => {
        setLoading(true)
        await signIn.email({ ...data }, {
            onSuccess: async () => {
                toast.success("Logged in successfully!")
                const { data } = await authClient.getSession()
                if (data?.user.completed) {
                    router.push("/")
                } else {
                    router.push(`/onboarding/${data?.user.role}`)
                }

            },
            onError: (ctx) => {
                setError(ctx.error.message)

            }
        })
        setLoading(false)

    };

    return (
        <div className="flex min-h-screen">
            <div className="w-1/2 max-md:hidden min-h-full flex flex-col justify-center items-center bg-primary/10 text-center pt-10">
                <p className="py-5 text-4xl font-semibold">
                    Find your dream internship with top companies worldwide. Launch your career today!
                </p>
                <Image src="/meeting.png" alt="meeting" width={500} height={500} className="w-lg px-10 object-contain" />
            </div>
            <div className="w-1/2 max-md:w-full items-center p-10 min-h-full flex flex-col">
                <div className="w-full md:max-w-8/10">
                    <h2 className="text-4xl font-semibold">Welcome back!</h2>
                    <p>Fill out the information to log in to your account</p>
                </div>
                <div className="w-full md:max-w-8/10">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 pt-10">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input type="email" id="email" {...register("email")} placeholder="Enter email" onChange={() => setError("")} />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input type="password" id="password" {...register("password")} placeholder="Enter password" onChange={() => setError("")} />
                            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}


                        <Button type="submit" disabled={loading} className="w-full shadow-sm py-1 text-base">
                            {loading ? "Loading..." : "Sign In"}
                        </Button>
                    </form>

                    <div className="relative flex justify-center py-5">
                        <span className="absolute -z-10 left-0 right-0 top-1/2 h-[1px] border-b bg-gray-600"></span>
                        <p className="bg-white w-fit px-5">or</p>
                    </div>

                    <Button variant="outline" className="w-full flex gap-2">
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


                    <p className="text-center py-3">
                        Don't have an account?{" "}
                        <Link href="/signup" className="text-primary underline">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>


        </div>
    );
}
