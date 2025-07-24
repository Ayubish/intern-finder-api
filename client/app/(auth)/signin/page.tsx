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
            <div className="w-1/2 max-md:w-full items-center p-10 min-h-full flex flex-col">
                <div className="w-full md:max-w-8/10">
                    <h2 className="text-2xl font-semibold">Sign In to Interno</h2>
                    <p>Fill out the information to log in to your account</p>
                </div>
                <div className="w-full md:max-w-8/10">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 pt-10">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input type="email" id="email" {...register("email")} placeholder="Enter email" />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input type="password" id="password" {...register("password")} placeholder="Enter password" />
                            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}


                        <Button type="submit" disabled={loading} className="w-full shadow-sm py-1 text-base">
                            {loading ? "Loading" : "Sign In"}
                        </Button>
                    </form>

                    <div className="relative flex justify-center py-5">
                        <span className="absolute -z-10 left-0 right-0 top-1/2 h-[1px] border-b bg-gray-600"></span>
                        <p className="bg-white w-fit px-5">or</p>
                    </div>

                    <Button variant="outline" className="w-full">
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

            <div className="w-1/2 max-md:hidden min-h-full flex flex-col justify-center items-center bg-primary/10 text-center pt-10">
                <p className="py-5 text-4xl font-semibold">
                    Find your dream internship with top companies worldwide. Launch your career today!
                </p>
                <Image src="/meeting.png" alt="meeting" width={500} height={500} className="w-lg px-10 object-contain" />
            </div>
        </div>
    );
}
