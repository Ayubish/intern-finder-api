"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUp } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const formSchema = z
    .object({
        email: z.string().email({ message: "Invalid email address" }),
        password: z.string().min(6, { message: "Password must be at least 6 characters" }),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Passwords do not match",
    });

type FormData = z.infer<typeof formSchema>;

export default function CompanySignUp() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data: FormData) => {

        await signUp.email({ ...data, name: data.email, role: "company" }, {
            onSuccess: () => {
                toast.success("Account created successfully!")
                router.push("/onboarding/company")
            },
            onError: (ctx) => {
                toast.error("Sign Up failed, Please try again!")

            }
        })


    };

    return (
        <div className="flex min-h-screen">
            <div className="w-1/2 max-md:w-full items-center p-10 min-h-full flex flex-col">
                <div className="w-full md:max-w-8/10">
                    <h2 className="text-3xl font-bold">Create an account</h2>
                    <p>Fill out the information to create an account</p>
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
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input type="password" id="confirmPassword" {...register("confirmPassword")} placeholder="Re-enter password" />
                            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
                        </div>

                        <div className="flex gap-3 items-center text-gray-400">
                            By creating an account you agree to our privacy policy and terms.
                        </div>

                        <Button type="submit" className="w-full shadow-sm py-1 text-base">
                            {isSubmitting ? "Signning Up..." : "Sign Up"}
                        </Button>
                    </form>

                    <div className="relative flex justify-center py-5">
                        <span className="absolute -z-10 left-0 right-0 top-1/2 h-[1px] border-b bg-gray-600"></span>
                        <p className="bg-white w-fit px-5">or</p>
                    </div>

                    <Button variant="outline" disabled={isSubmitting} className="w-full">
                        Continue with Google
                    </Button>

                    <p className="text-center py-3">
                        Already have an account?{" "}
                        <Link href="/signin" className="text-primary underline">
                            Log In
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
