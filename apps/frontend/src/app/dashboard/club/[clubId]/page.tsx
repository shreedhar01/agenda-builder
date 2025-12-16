"use client"

import {
    Dialog,
    DialogTrigger
} from "@repo/ui/components/dialog"

import { useParams, useRouter } from "next/navigation"
import { Header } from "../../../../component/Header"
import { Button } from "@repo/ui/components/button"
import { ArrowBigLeftIcon, PlusIcon } from "lucide-react"
import { CreateMeeting } from "../../../../component/CreateMeeting"
import { YourMeetings } from "../../../../component/Meetings"
import { YourAgendas } from "../../../../component/YourAgendas"

export default function club() {
    const router = useRouter()
    const params = useParams()
    const id = params.clubId
    return (
        <div className="flex flex-col items-center justify-center w-full">
            <Header />
            <div className="flex justify-between items-center w-full md:w-7xl px-2 md:px-0 py-2 md:py-4">
                <Button
                    size="sm"
                    onClick={() => router.push("/dashboard")}
                >
                    <ArrowBigLeftIcon />
                </Button>
                <Dialog>
                    <DialogTrigger>
                        <Button variant="outline">
                            Create Meeting
                            <PlusIcon></PlusIcon>
                        </Button>
                    </DialogTrigger>
                    <CreateMeeting club_id={Number(id)} />
                </Dialog>
            </div>
            <div className="flex flex-col-reverse md:flex-row md:justify-between md:h-[75vh] w-full md:w-7xl px-2 md:px-0 border">
                <div className="flex flex-col gap-2 h-1/2 md:h-full w-full md:w-70/100">
                    <h1 className="text-xl md:text-2xl font-medium ">Your Agendas :</h1>
                    <div className="flex-1 min-h-0">
                        <YourAgendas club_id={Number(id)} />
                    </div>
                </div>
                <div className="flex flex-col gap-2 h-1/2 md:h-full w-full md:w-25/100">
                    <h1 className="text-xl md:text-2xl font-medium ">Your Meetings :</h1>
                    <div className="flex-1 min-h-0 overflow-hidden">
                        <YourMeetings club_id={Number(id)} />
                    </div>
                </div>
            </div>
        </div>
    )
}