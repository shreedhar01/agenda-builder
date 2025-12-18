import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent
} from "@repo/ui/components/accordion"
import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableCell
} from "@repo/ui/components/table"
import { ScrollArea } from "@repo/ui/components/scroll-area"

import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../state-management/store"
import { useEffect } from "react"
import axios from "axios"
import { getAllAgendaItemByMeetingIdSchema } from "@repo/shared-types"
import { addAgendaItem } from "../state-management/slice/agendaItemSlice"
import { addAgenda } from "../state-management/slice/agendaSlice"

export const AgendaForMeeting = ({ meeting_id }: { meeting_id: number }) => {
    const agendas = useSelector((state: RootState) => state.agendas.agendas)
    const agendasItem = useSelector((state: RootState) => state.agendaItem.agendaItem)
    const dispatch = useDispatch()

    useEffect(() => {
        const getAgendaItemByMeetingId = async () => {
            const validationResult = getAllAgendaItemByMeetingIdSchema.safeParse({ meeting_id })
            if (!validationResult.success) {
                return console.log("validation Error", validationResult.error.issues)
            }
            try {
                await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/agenda/meeting-id`, {meeting_id}, { withCredentials: true })
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

                await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/agendaItem/meeting-id`, validationResult.data, { withCredentials: true })
                    .then((res) => {
                        console.log(res)
                        res.data.data.forEach((agen: any) =>
                            dispatch(addAgendaItem({
                                id: agen.id,
                                title: agen.title,
                                agenda_id: agen.club_id,
                                start_time: agen.start_time,
                                end_time: agen.end_time
                            }))
                        )
                    })
            } catch (error) {
                console.log(error)
            }
        }

        getAgendaItemByMeetingId()
    }, [meeting_id])

    return (
        <div className="h-full">
            { agendas.length > 0 ?
                <ScrollArea className="h-full">
                    <Accordion
                        type="multiple"
                        // collapsible+
                        defaultValue={["first"]}
                    >
                        {
                            agendas
                                .filter(agenda => agenda.meeting_id === meeting_id)
                                .map(agenda =>
                                    <AccordionItem key={agenda.id} value={agenda.id?.toString() || "random"}>
                                        <AccordionTrigger>{agenda.title}</AccordionTrigger>
                                        <AccordionContent>
                                            {

                                                <Table>
                                                    <TableHeader>
                                                        <TableRow>
                                                            <TableHead>Title</TableHead>
                                                            <TableHead>Start Time</TableHead>
                                                            <TableHead>End Time</TableHead>
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody>
                                                        {
                                                            agendasItem
                                                                .filter(agendaItem => agendaItem.agenda_id === agenda.id)
                                                                .map(agendaItem =>
                                                                    <TableRow key={agendaItem.id}>
                                                                        <TableCell>{agendaItem.title}</TableCell>
                                                                        <TableCell>{agendaItem.start_time}</TableCell>
                                                                        <TableCell>{agendaItem.end_time}</TableCell>
                                                                    </TableRow>
                                                                )
                                                        }
                                                    </TableBody>
                                                </Table>
                                            }
                                        </AccordionContent>
                                    </AccordionItem>
                                )
                        }

                    </Accordion>
                </ScrollArea>
                : <div>
                    <p>Looks like you don't have agenda for this meeting create agenda and agenda item</p>
                </div>
            }
        </div>
    )
}