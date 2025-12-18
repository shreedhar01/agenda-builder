import { Button } from "@repo/ui/components/button"
import {
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@repo/ui/components/dialog"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@repo/ui/components/popover"
import { Input } from "@repo/ui/components/input"
import { Label } from "@repo/ui/components/label"
import { Calendar } from "@repo/ui/components/calendar"
import { ChevronDownIcon } from "lucide-react"
import React, { useState } from "react"
import toast from "react-hot-toast"
import { createMeetingSchema } from "@repo/shared-types"
import axios from "axios"
import { useDispatch } from "react-redux"
import { addMeeting } from "../state-management/slice/meetingSlice"
// import { RootState } from "../state-management/store"

export const CreateMeeting = ({ club_id }: { club_id: number }) => {
    const [open, setOpen] = useState(false)
    const [date, setDate] = useState<Date | undefined>(undefined)

    const [theme, setTheme] = useState("")
    const [meetingTitle, setMeetingTitle] = useState("")
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const dispatch = useDispatch()
    // const meetings = useSelector((state:RootState)=> state.meetings.meetings)

    const combineDateAndTime = (date: Date, time: string): string => {
        const [hoursStr = '0', minutesStr = '0'] = time.split(':')
        const hours = parseInt(hoursStr, 10)
        const minutes = parseInt(minutesStr, 10)

        const combined = new Date(date)
        combined.setUTCHours(hours, minutes, 0, 0)
        return combined.toISOString()
    }

    const handleMeetingCreation = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // console.log({ date, theme, startTime, meetingTitle, endTime })
        if (!date || !startTime || !endTime) {
            toast.error("Please fill all required fields")
            return
        }

        const validationResult = createMeetingSchema.safeParse({
            club_id,
            theme,
            meeting_title: meetingTitle,
            start_time: combineDateAndTime(date, startTime),
            end_time: combineDateAndTime(date, endTime)
        })
        if (!validationResult.success) {
            return toast.error("Provided field are incorrect")
        }

        await axios
            .post(`${process.env.NEXT_PUBLIC_API_URL}/user/meeting`, validationResult.data, { withCredentials: true })
            .then((res) => {
                const meetingData = res.data.data?.[0]
                if (meetingData && meetingData.id) {
                    dispatch(addMeeting(meetingData))
                    toast.success(res.data.message)
                    setDate(undefined);
                    setEndTime("");
                    setStartTime("");
                    setMeetingTitle("");
                    setTheme("");
                } else {
                    console.error('Invalid club data:', meetingData)
                    toast.error('Failed to create meeting - invalid data')
                }
            })
            .catch((error) => {
                console.error('Axios error:', error)
                toast.error(error.response?.data?.message || 'Something went wrong')
            })

    }

    return (
        <DialogContent>
            <form className="flex flex-col gap-3" onSubmit={handleMeetingCreation}>
                <DialogHeader className="flex flex-col gap-2">
                    <DialogTitle>Create Meeting</DialogTitle>
                    <DialogDescription>
                        Enter a detail meeting you want to create.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="name-1">Theme</Label>
                    <Input
                        id="name-1"
                        name="name"
                        placeholder="e.g Empowerment"
                        value={theme}
                        onChange={(e) => setTheme(e.target.value)}
                    />
                    <Label htmlFor="name-2">Title</Label>
                    <Input
                        id="name-2"
                        name="name"
                        placeholder="e.g Let's Empower Youth"
                        value={meetingTitle}
                        onChange={(e) => setMeetingTitle(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2 justify-between w-full">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="start-date">
                            Start Date
                        </Label>
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    id="date"
                                    className="w-48 justify-between font-normal"
                                >
                                    {date ? date.toLocaleDateString() : "Select date"}
                                    <ChevronDownIcon />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    captionLayout="dropdown"
                                    onSelect={(date) => {
                                        setDate(date)
                                        setOpen(false)
                                    }}
                                />
                            </PopoverContent>
                        </Popover>
                    </div >
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="name-1">Start Time</Label>
                        <Input
                            id="name-1"
                            name="name"
                            placeholder="eg 20:10"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="name-2">End Time</Label>
                        <Input
                            id="name-2"
                            name="name"
                            placeholder="e.g 21:00"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">Create</Button>
                </DialogFooter>
            </form>
        </DialogContent>
    )
}