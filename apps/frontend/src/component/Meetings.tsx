"use client"

import { ScrollArea } from "@repo/ui/components/scroll-area"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../state-management/store"
import { useRouter } from "next/navigation"
import { addMeeting } from "../state-management/slice/meetingSlice"
import { joinClubSchema } from "@repo/shared-types"



export const YourMeetings = ({ club_id }: { club_id: number }) => {
    const dispatch = useDispatch()
    const meetings = useSelector((state: RootState) => state.meetings.meetings)
    const router = useRouter()

    useEffect(() => {
        const getMeeting = async () => {
            const validateResult = joinClubSchema.safeParse({ club_id });
            if (!validateResult.success) {
                return
            }
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/meeting`, validateResult.data, { withCredentials: true })
                .then(res => {
                    console.log(res)
                    res.data.data.forEach((data: any) =>
                        dispatch(addMeeting({
                            id: data.id,
                            theme: data.theme,
                            meeting_title: data.meeting_title,
                            club_id: data.club_id,
                            start_time: data.start_time,
                            end_time: data.end_time
                        }))
                    )
                })
                .catch((error) => {
                    console.error('Axios error:', error)
                    // toast.error(error.response?.data?.message || 'Something went wrong')
                })
        }
        getMeeting()
    }, [club_id])

    const fetchResult = club_id ? meetings.filter(meet => meet.club_id === club_id) : meetings

    return (
        <ScrollArea className="flex flex-col gap-2 h-full">
            {meetings.map(meeting =>
                <div
                    key={meeting.id}
                    onClick={() => router.push(
                        `/dashboard/meeting/${meeting.id}${club_id ? `?club-id=${club_id}` : ""}`
                    )}
                    className="flex justify-between w-full hover:bg-neutral-400 cursor-pointer border-b p-4 rounded-xl"
                >
                    <div>
                        <p className="text-xs text-neutral-700">Meeting theme</p>
                        <p>{meeting.theme}</p>
                    </div>
                    <div>
                        <p className="text-xs text-neutral-700">Meeting Start At:</p>
                        <p className="text-xs text-neutral-700">{meeting.start_time ? new Date(meeting.start_time).toLocaleString() : 'N/A'}</p>
                    </div>
                </div>
            )}
        </ScrollArea>

    )
}