"use client"

import { Button } from "@repo/ui/components/button"
import { useRouter } from "next/navigation"
import { useDispatch } from 'react-redux'
import { logout } from '../state-management/slice/authSlice'
import React from "react"
import axios from "axios"



export const Header = ({ isAuthenticat }: {isAuthenticat?:boolean}) => {
    const router = useRouter()
    const dispatch = useDispatch()

    const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/auth`, { withCredentials: true })
        dispatch(logout())
        router.push("/")
    }

    return (
        <div className="flex  items-center justify-center h-12 border w-full">

            <nav className="flex items-center justify-between w-full md:w-7xl px-2 md:px-0">
                <h1 className="font-bold ">Agenda Builder</h1>
                {isAuthenticat ?
                    <Button onClick={handleLogout}>LogOut</Button>
                    :
                    <div className="flex gap-2">
                        <Button
                            onClick={() => router.push("/signup")}
                        >
                            Sign up
                        </Button>
                        <Button
                            onClick={() => router.push("/signin")}
                        >
                            Sign In
                        </Button>
                    </div>}
            </nav>
        </div>
    )
}