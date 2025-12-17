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
    TableFooter,
    TableHead,
    TableRow,
    TableCell,
    TableCaption,
} from "@repo/ui/components/table"
import { ScrollArea } from "@repo/ui/components/scroll-area"

import { useSelector } from "react-redux"
import { RootState } from "../state-management/store"

export const AgendaForMeeting = ({ meeting_id }: { meeting_id: number }) => {
    const agendas = useSelector((state: RootState) => state.agendas.agendas)
    const agendasItem = useSelector((state: RootState) => state.agendaItem.agendaItem)

    return (
        <div className="h-full">
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
                                <AccordionItem value={agenda.id?.toString() || "random"}>
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
                                                                <TableRow>
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
        </div>
    )
}