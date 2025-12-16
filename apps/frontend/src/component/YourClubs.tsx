"use client"

import { ScrollArea } from "@repo/ui/components/scroll-area"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { joinClub, type Club } from "../state-management/slice/clubSlice"
import toast from "react-hot-toast"
import { RootState } from "../state-management/store"
import { useRouter } from "next/navigation"



export const YourClubs = () => {
    const dispatch = useDispatch()
    const clubs = useSelector((state: RootState) => state.clubs.clubs)
    const router = useRouter()

    useEffect(() => {
        const getClubs = async () => {
            await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/club`, { withCredentials: true })
                .then(res => {
                    // console.log(res)
                    res.data.data.forEach((data: any) =>
                        dispatch(joinClub({ id: data.club_id, name: data.club_name }))
                    )
                })
                .catch((error) => {
                    console.error('Axios error:', error)
                    toast.error(error.response?.data?.message || 'Something went wrong')
                })
        }
        getClubs()
    }, [])

    return (
        <ScrollArea className="flex flex-col gap-2 h-full">
            {clubs.map(club =>
                <div
                    key={club.id}
                    onClick={()=> router.push(`/dashboard/club/${club.id}`)}
                    className="w-full hover:bg-neutral-400 cursor-pointer border-b p-4 rounded-xl"
                >
                    <p>{club.name}</p>
                </div>
            )}
        </ScrollArea>

    )
}