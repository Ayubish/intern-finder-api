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
import { cn } from "@/lib/utils";

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

                    <Button
                        variant="outline"
                        className={cn("w-full gap-2")}
                        disabled={isSubmitting}

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
