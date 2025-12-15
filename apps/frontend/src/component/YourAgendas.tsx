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
    TableFooter,
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
import { getAllAgendaItemSchema } from "@repo/shared-types"
import toast from "react-hot-toast"
import { addAgendaItem } from "../state-management/slice/agendaItemSlice"

const invoices = [
    {
        invoice: "INV001",
        paymentStatus: "Paid",
        totalAmount: "$250.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV002",
        paymentStatus: "Pending",
        totalAmount: "$150.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV003",
        paymentStatus: "Unpaid",
        totalAmount: "$350.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "INV004",
        paymentStatus: "Paid",
        totalAmount: "$450.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV005",
        paymentStatus: "Paid",
        totalAmount: "$550.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV006",
        paymentStatus: "Pending",
        totalAmount: "$200.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "INV007",
        paymentStatus: "Unpaid",
        totalAmount: "$300.00",
        paymentMethod: "Credit Card",
    },
]

export const YourAgendas = () => {
    const dispatch = useDispatch()
    const agendas = useSelector((state: RootState) => state.agendas.agendas)
    const agendaItems = useSelector((state: RootState) => state.agendaItem.agendaItem)
    const [fetched, setFetched] = useState(false)

    useEffect(() => {
        const isAgendaExist = async () => {
            await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/agenda`, { withCredentials: true })
                .then((res) => {
                    // console.log(res)
                    res.data.data.forEach((agen: any) =>
                        dispatch(addAgenda({ id: agen.agenda_id, title: agen.agenda_title }))
                    )
                    setFetched(true)
                })
        }
        isAgendaExist();
    }, [])

    useEffect(() => {
        if (!fetched) return;
        const isAgendaExist = async () => {
            agendas.forEach(async (agenda) => {
                const validateResult = getAllAgendaItemSchema.safeParse({agenda_id:agenda.id})
                if (!validateResult?.success) {
                    console.log(validateResult.error)
                    return toast.error("Agenda id not valid")
                }
                await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/agendaItem`, validateResult.data, { withCredentials: true })
                    .then((res) => {
                        res.data.data.forEach((agen: any) =>
                            dispatch(addAgendaItem({
                                id:agen.id,
                                title:agen.title,
                                agenda_id:agen.agenda_id,
                                start_time:agen.start_time,
                                end_time: agen.end_time
                            }))
                        )
                    })
            })
        }
        isAgendaExist();
    }, [fetched])


    return (
        <ScrollArea className="flex flex-col gap-2 h-full">
            <Accordion
                type="single"
                collapsible
                className="w-full"
                defaultValue="item-1"
            >
                {agendas.map(agenda =>
                    <AccordionItem value={agenda.id?.toString() || "one"}>
                        <AccordionTrigger>{agenda.title}</AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-4 text-balance">
                            <Table>
                                <TableCaption>A list of your agenda items.</TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Start Time(min)</TableHead>
                                        <TableHead >End Time(min)</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {agendaItems
                                        .filter((item) => item.agenda_id === agenda.id)
                                        .map((item) => (
                                            <TableRow key={item.id}>
                                                <TableCell>{item.title}</TableCell>
                                                <TableCell>{item.start_time}</TableCell>
                                                <TableCell >{item.end_time}</TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </AccordionContent>
                    </AccordionItem>
                )}
            </Accordion>
            {/* {agendas.map(agenda =>
                <div
                    key={agenda.id}
                    // onClick={() => router.push(`/dashboard/${club.id}`)}
                    className="w-full hover:bg-neutral-400 cursor-pointer border-b p-4 rounded-xl"
                >
                    <p>{agenda.title}</p>
                </div>
            )} */}
        </ScrollArea>
    )
}