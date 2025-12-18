"use client"
import axios from "axios";

import { Button } from "@repo/ui/components/button"
import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldSet,
} from "@repo/ui/components/field"
import { Input } from "@repo/ui/components/input"
import { loginUserSchema } from "@repo/shared-types"
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Header } from "../../../component/Header";
import { Spinner } from "@repo/ui/components/spinner";

export default function SignIn() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false)

    const handleLogIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        const validateResult = await loginUserSchema.safeParse({ email, password })
        if (!validateResult.success) {
            return toast.error(validateResult.error.issues[0]?.message || "Provided field are incorrect");
        }

        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth`, validateResult.data, { withCredentials: true })
            toast.success("Successfully logged in!")
            setLoading(false)
            router.push("/dashboard")
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const message = error.response.data.errors?.[0]?.message || error.response.data.message || "Login failed.";
                setLoading(false)
                toast.error(message);
            } else {
                console.log(error)
                setLoading(false)
                toast.error("An unexpected error occurred.");
            }
        }
    }
    return (
        <>
            <Header />
            <div className="flex flex-col items-center justify-center h-[80vh] w-full">
                <div className="flex flex-col justify-center items-center  w-full md:w-7xl">
                    <form
                        className=" w-75/100 md:w-25/100 border p-4 rounded-2xl"
                        onSubmit={handleLogIn}
                    >
                        <div className="flex items-center justify-center w-full">
                            <h1 className="text-2xl font-medium">Sign In</h1>
                        </div>
                        <FieldGroup>
                            <FieldSet>
                                <FieldGroup>
                                    <Field>
                                        <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                                            Email
                                        </FieldLabel>
                                        <Input
                                            id="checkout-7j9-card-name-43j"
                                            placeholder="ram@gmail.com"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="Area">
                                            Password
                                        </FieldLabel>
                                        <Input
                                            id="Area"
                                            type="password"
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </Field>
                                </FieldGroup>
                            </FieldSet>
                            <Field
                                orientation="horizontal"
                                className="flex flex-col items-center justify-center gap-1"
                            >
                                <Button type="submit" disabled={loading}>
                                    {
                                        loading ? <Spinner /> : <p>Sign In</p>
                                    }
                                </Button>
                                <div className="flex items-center w-full gap-3">
                                    <div className="flex-1 border-t" />
                                    <span className="text-sm">or</span>
                                    <div className="flex-1 border-t" />
                                </div>
                                <p
                                    className=" hover:text-blue-400 cursor-pointer underline"
                                    onClick={() => router.push("/signup")}
                                >Create Account</p>
                            </Field>
                        </FieldGroup>
                    </form>
                </div>
            </div>
        </>
    )
}