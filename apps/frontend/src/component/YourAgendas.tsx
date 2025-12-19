"use client"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@repo/ui/components/accordion"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@repo/ui/components/table"

import { ScrollArea } from "@repo/ui/components/scroll-area"
import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addAgenda } from "../state-management/slice/agendaSlice"
import { RootState } from "../state-management/store"
import { getAllAgendaItemByAgendaIdSchema, joinClubSchema } from "@repo/shared-types"
import toast from "react-hot-toast"
import { addAgendaItem } from "../state-management/slice/agendaItemSlice"

export const YourAgendas = ({ club_id }: { club_id?: number }) => {
    const dispatch = useDispatch()
    const agendas = useSelector((state: RootState) => state.agendas.agendas)
    const agendaItems = useSelector((state: RootState) => state.agendaItem.agendaItem)
    const [isLoading, setIsLoading] = useState(false)
    const hasFetchedAgendas = useRef(false)

    useEffect(() => {
        const fetchAgendas = async () => {
            if (hasFetchedAgendas.current || isLoading) return
            hasFetchedAgendas.current = true
            setIsLoading(true)

            try {
                if (club_id) {
                    const validateResult = joinClubSchema.safeParse({ club_id })
                    if (!validateResult.success) {
                        toast.error("Validation failed while fetching agendas")
                        return
                    }
                    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/agenda`, validateResult.data, { withCredentials: true })
                        .then((res) => {
                            // console.log(res)
                            res.data.data.forEach((agen: any) =>
                                dispatch(addAgenda({
                                    id: agen.agenda_id,
                                    title: agen.agenda_title,
                                    club_id: agen.club_id,
                                    meeting_id: agen.meeting_id
                                }))
                            )
                        })
                    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/agendaItem/club-id`, { club_id:club_id }, { withCredentials: true })
                        .then((res) => {
                            // console.log("Error while fetching agenda Item by club id",res)
                            res.data.data.forEach((agen: any) =>
                                dispatch(addAgendaItem({
                                    id: agen.id,
                                    title: agen.title,
                                    agenda_id: agen.agenda_id,
                                    start_time: agen.start_time,
                                    end_time: agen.end_time
                                }))
                            )
                        })
                } else {
                    await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/agenda`, { withCredentials: true })
                        .then((res) => {
                            console.log(res)
                            res.data.data.forEach((agen: any) =>
                                dispatch(addAgenda({
                                    id: agen.agenda_id,
                                    title: agen.agenda_title,
                                    club_id: agen.club_id,
                                    meeting_id: agen.meeting_id
                                }))
                            )
                        })

                    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/agendaItem`, {  }, { withCredentials: true })
                        .then((res) => {
                            console.log(res)
                            res.data.data.forEach((agen: any) =>
                                dispatch(addAgendaItem({
                                    id: agen.id,
                                    title: agen.title,
                                    agenda_id: agen.agenda_id,
                                    start_time: agen.start_time,
                                    end_time: agen.end_time
                                }))
                            )
                        })
                }
            } catch (error) {
                console.error("Error fetching agendas:", error)
                // toast.error("Failed to fetch agendas")
            } finally {
                setIsLoading(false)
            }
        }

        fetchAgendas()
    }, [club_id, dispatch])

    const filteredAgendas = club_id
        ? agendas.filter(agen => agen.club_id === club_id)
        : agendas

    return (
        <ScrollArea className="flex flex-col gap-2 h-full">
            <Accordion
                type="single"
                collapsible
                className="w-full"
                defaultValue="item-1"
            >
                {filteredAgendas.length > 0 ? filteredAgendas.map((agenda) => (
                    <AccordionItem
                        key={agenda.id}
                        value={agenda.id?.toString() || "one"}
                    >
                        <AccordionTrigger>{agenda.title}</AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-4 text-balance">
                            <Table>
                                <TableCaption>A list of your agenda items.</TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Start Time(min)</TableHead>
                                        <TableHead>End Time(min)</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {agendaItems
                                        .filter((item) => item.agenda_id === agenda.id)
                                        .map((item) => (
                                            <TableRow key={item.id}>
                                                <TableCell>{item.title}</TableCell>
                                                <TableCell>{item.start_time}</TableCell>
                                                <TableCell>{item.end_time}</TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </AccordionContent>
                    </AccordionItem>
                )) : <p className="text-neutral-500">Its look like you don't have any agenda to see join club to see agenda or create yourself</p>
                }
            </Accordion>
        </ScrollArea>
    )
}