"use client"

import { ScrollArea } from "@repo/ui/components/scroll-area"
import axios from "axios"
import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { joinClub, type Club } from "../state-management/slice/clubSlice"
import toast from "react-hot-toast"
import { RootState } from "../state-management/store"
import { useRouter } from "next/navigation"



export const YourClubs = () => {
    const dispatch = useDispatch()
    const clubs = useSelector((state: RootState) => state.clubs.clubs)
    const router = useRouter()
    const hasFetched = useRef(false)

    useEffect(() => {
        const getClubs = async () => {
            if (hasFetched.current) return
            hasFetched.current = true

            try {
                const res = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/club`,
                    { withCredentials: true }
                )
                res.data.data.forEach((data: any) =>
                    dispatch(joinClub({ id: data.club_id, name: data.club_name }))
                )
            } catch (error: any) {
                console.error('Error fetching clubs:', error)
                if (error.response?.status !== 400) {
                    toast.error(error.response?.data?.message || 'Failed to fetch clubs')
                }
            }
        }
        getClubs()
    }, [dispatch])

    return (
        <ScrollArea className="flex flex-col gap-2 h-full">
            {clubs.length > 0 ? clubs.map(club =>
                <div
                    key={club.id}
                    onClick={() => router.push(`/dashboard/club/${club.id}`)}
                    className="w-full hover:bg-neutral-400 cursor-pointer border-b p-4 rounded-xl"
                >
                    <p>{club.name}</p>
                </div>
            ) : <p className="text-neutral-500">Your club list is empty join club.</p>
            }
        </ScrollArea>

    )
}