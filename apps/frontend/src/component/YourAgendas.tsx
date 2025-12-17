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
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addAgenda } from "../state-management/slice/agendaSlice"
import { RootState } from "../state-management/store"
import { getAllAgendaItemSchema, joinClubSchema } from "@repo/shared-types"
import toast from "react-hot-toast"
import { addAgendaItem } from "../state-management/slice/agendaItemSlice"

export const YourAgendas = ({ club_id }: { club_id?: number }) => {
    const dispatch = useDispatch()
    const agendas = useSelector((state: RootState) => state.agendas.agendas)
    const agendaItems = useSelector((state: RootState) => state.agendaItem.agendaItem)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchAgendas = async () => {
            if (isLoading) return
            setIsLoading(true)

            try {
                if (club_id) {
                    // Fetch agendas for specific club
                    const validateResult = joinClubSchema.safeParse({ club_id })
                    if (!validateResult.success) {
                        toast.error("Validation failed while fetching agendas")
                        return
                    }
                    const res = await axios.post(
                        `${process.env.NEXT_PUBLIC_API_URL}/agenda`,
                        validateResult.data,
                        { withCredentials: true }
                    )
                    res.data.data.forEach((agen: any) =>
                        dispatch(addAgenda({
                            id: agen.agenda_id,
                            title: agen.agenda_title,
                            club_id: agen.club_id,
                            meeting_id: agen.meeting_id
                        }))
                    )
                } else {
                    // Fetch all agendas
                    const res = await axios.get(
                        `${process.env.NEXT_PUBLIC_API_URL}/agenda`,
                        { withCredentials: true }
                    )
                    res.data.data.forEach((agen: any) =>
                        dispatch(addAgenda({
                            id: agen.agenda_id,
                            title: agen.agenda_title,
                            club_id: agen.club_id,
                            meeting_id: agen.meeting_id
                        }))
                    )
                }
            } catch (error) {
                console.error("Error fetching agendas:", error)
                toast.error("Failed to fetch agendas")
            } finally {
                setIsLoading(false)
            }
        }

        fetchAgendas()
    }, [club_id, dispatch]) 

    useEffect(() => {
        const fetchAgendaItems = async () => {
            if (agendas.length === 0) return

            try {
                // Fetch all agenda items in parallel
                const promises = agendas.map(async (agenda) => {
                    const validateResult = getAllAgendaItemSchema.safeParse({ agenda_id: agenda.id })
                    if (!validateResult?.success) {
                        console.error("Agenda id validation failed:", validateResult.error)
                        toast.error("Invalid agenda id")
                        return
                    }

                    try {
                        const res = await axios.post(
                            `${process.env.NEXT_PUBLIC_API_URL}/agendaItem`,
                            validateResult.data,
                            { withCredentials: true }
                        )
                        return res.data.data
                    } catch (error) {
                        console.error(`Error fetching items for agenda ${agenda.id}:`, error)
                        return []
                    }
                })

                const results = await Promise.all(promises)
                
                // Dispatch all items after fetching
                results.flat().forEach((item: any) => {
                    if (item) {
                        dispatch(addAgendaItem({
                            id: item.id,
                            title: item.title,
                            agenda_id: item.agenda_id,
                            start_time: item.start_time,
                            end_time: item.end_time
                        }))
                    }
                })
            } catch (error) {
                console.error("Error fetching agenda items:", error)
                toast.error("Failed to fetch agenda items")
            }
        }

        fetchAgendaItems()
    }, [agendas.length, dispatch])

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
                {filteredAgendas.map((agenda) => (
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
                ))}
            </Accordion>
        </ScrollArea>
    )
}