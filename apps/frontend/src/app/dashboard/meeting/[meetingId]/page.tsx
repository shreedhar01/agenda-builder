"use client"

import {
    Dialog,
    DialogTrigger
} from "@repo/ui/components/dialog"

import { useParams, useRouter } from "next/navigation"

import { Button } from "@repo/ui/components/button"
import { ArrowBigLeftIcon, PlusIcon } from "lucide-react"
import { Header } from "../../../../component/Header"
import { CreateAgenda } from "../../../../component/CreateAgenda"
import { AgendaForMeeting } from "../../../../component/AgendaForMeeting"

export default function club() {
    const router = useRouter()
    const params = useParams()
    const id = params.meetingId
    return (
        <div className="flex flex-col items-center justify-center w-full">
            <Header />
            <div className="flex justify-between items-center w-full md:w-7xl px-2 md:px-0 py-2 md:py-4">
                <Button
                    size="sm"
                    onClick={() => id?router.push(`/dashboard/club/${id}`):router.push("/dashboard")}
                >
                    <ArrowBigLeftIcon />
                </Button>
                <Dialog>
                    <DialogTrigger>
                        <Button variant="outline">
                            Create Agenda
                            <PlusIcon></PlusIcon>
                        </Button>
                    </DialogTrigger>
                    <CreateAgenda meeting_id={Number(id)} />
                </Dialog>
            </div>
            <div className="flex flex-col-reverse md:flex-row md:justify-between w-full md:w-7xl px-2 md:px-0 border">
                <div className="flex flex-col gap-2 h-1/2 md:h-[80vh] w-full md:w-70/100">
                    <h1 className="text-xl md:text-2xl font-medium ">Your Agendas :</h1>
                    <div className="flex-1 min-h-0 overflow-hidden">
                        <AgendaForMeeting meeting_id={Number(id)}/>
                    </div>
                </div>
            </div>
        </div>
    )
}