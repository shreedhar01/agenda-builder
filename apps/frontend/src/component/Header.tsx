"use client"

import { Button } from "@repo/ui/components/button"
import { useRouter } from "next/navigation"
import type { RootState } from '../state-management/store'
import { useSelector, useDispatch } from 'react-redux'
import { login, logout } from '../state-management/slice/authSlice'
import { useEffect, useState } from "react"
import axios from "axios"

export const Header = () => {
    const router = useRouter()
    const user = useSelector((state: RootState) => state.auth.id)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkSession = async () => {
            try {
                await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth`, {
                    withCredentials: true
                }).then(res => {
                    // console.log('API Response:', res.data.data[0])
                    dispatch(login(res.data.data[0]))
                })

            } catch (error) {
                console.error('Session check failed:', error);
                dispatch(logout()) // Clear any stale state
            } finally {
                setLoading(false)
            }
        };

        checkSession();
    }, [dispatch])
    return (
        <div className="flex  items-center justify-center h-12 border w-full">

            <nav className="flex items-center justify-between w-full md:w-7xl px-2 md:px-0">
                <h1 className="font-bold ">Agenda Builder</h1>
                {
                    loading ? null : user ? <Button
                        onClick={async(e) => {
                            e.preventDefault()
                            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/auth`,{withCredentials:true})
                            dispatch(logout())
                            router.push("/")
                        }}
                    >
                        LogOut
                    </Button> :
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
                        </div>
                }
            </nav>
        </div>
    )
}