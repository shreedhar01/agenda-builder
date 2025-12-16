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
import { PlusIcon } from "lucide-react"
import React, { useState } from "react"
import { createAgendaItemSchema, createAgendaSchema } from "@repo/shared-types"
import toast from "react-hot-toast"
import axios from "axios"
import { addAgenda } from "../state-management/slice/agendaSlice"
import { useDispatch } from "react-redux"

// import { RootState } from "../state-management/store"

interface IAgendaItem {
    title: string,
    start_time: number,
    end_time: number
}

export const CreateAgenda = ({ meeting_id }: { meeting_id: number }) => {
    const dispatch = useDispatch()

    const [agendaItem, setAgendaItem] = useState<IAgendaItem>({
        title: '',
        start_time: 0,
        end_time: 0
    })
    const [agendaItems, setAgendaItems] = useState<IAgendaItem[]>([])
    const [title, setTitle] = useState("")

    const handleAgendaItemSubmit = async () => {
        if (!agendaItem.title) return;
        const validationResult = createAgendaItemSchema.safeParse(agendaItem)
        if (!validationResult.success) {
            return toast.error("Incorrect agenda item fields")
        }

        setAgendaItems(prevAgendas => [...prevAgendas, agendaItem])
        setAgendaItem({ title: '', start_time: 0, end_time: 0 })
    }

    const handleAgendaCreation = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const validationResult = createAgendaSchema.safeParse({
            meeting_id, agenda_title:title, agenda_items:agendaItems
        })

        if (!validationResult.success) {
            console.log('Validation errors:', validationResult.error)
            return toast.error("Provided field are incorrect")
        }

        console.log('Validated data:', validationResult.data)

        await axios
            .post(`${process.env.NEXT_PUBLIC_API_URL}/user/agenda`, validationResult.data, { withCredentials: true })
            .then((res) => {
                const agendaData = res.data.data?.[0]
                if (agendaData && agendaData.agenda_id) {
                    dispatch(addAgenda({
                        id: agendaData.agenda_id,
                        title: agendaData.agenda_title,
                        club_id: agendaData.club_id,
                        meeting_id: agendaData.meeting_id
                    }))
                    toast.success(res.data.message)
                    setAgendaItems([])
                } else {
                    console.error('Invalid club data:', agendaData)
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
            <form className="flex flex-col gap-3" onSubmit={handleAgendaCreation}>
                <DialogHeader className="flex flex-col gap-2">
                    <DialogTitle>Create Agenda</DialogTitle>
                    <DialogDescription>
                        Enter a detail of your agenda.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="name-1">Title</Label>
                    <Input
                        id="name-1"
                        name="name"
                        placeholder="e.g Empowerment"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="flex flex-col items-center gap-2 justify-between w-full">
                    <div className="flex flex-col w-full gap-2">
                        <Label htmlFor="start-date">
                            Add Agenda Item
                        </Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    id="date"
                                    className="font-normal"
                                >
                                    <p>Agenda Item</p>
                                    <PlusIcon />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-4" align="start">
                                <div className="space-y-4">
                                    <div className="space-y-3">
                                        <div className="space-y-2">
                                            <Label htmlFor="agenda-title">Title</Label>
                                            <Input
                                                id="agenda-title"
                                                type="text"
                                                placeholder="e.g., Opening Remarks"
                                                value={agendaItem.title}
                                                onChange={(e) => setAgendaItem(prev => ({ ...prev, title: e.target.value }))}
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="space-y-2">
                                                <Label htmlFor="start-time">Start</Label>
                                                <Input
                                                    id="start-time"
                                                    type="number"
                                                    placeholder="1"
                                                    value={agendaItem.start_time}
                                                    onChange={(e) => setAgendaItem(prev => ({ ...prev, start_time: Number(e.target.value) }))}
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="end-time">End</Label>
                                                <Input
                                                    id="end-time"
                                                    type="number"
                                                    placeholder="17"
                                                    value={agendaItem.end_time}
                                                    onChange={(e) => setAgendaItem(prev => ({ ...prev, end_time: Number(e.target.value) }))}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-2 pt-2">
                                        <Button
                                            onClick={handleAgendaItemSubmit}
                                            size="sm"
                                            className="flex-1"
                                        >
                                            Add Item
                                        </Button>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div >
                    <div className="flex flex-col gap-1 w-full">
                        {
                            agendaItems.length > 0 ?
                                <div >
                                    <div className="flex justify-between w-full border-b py-1">
                                        <p className="text-xs font-medium">Title</p>
                                        <p className="text-xs font-medium">Start Time</p>
                                        <p className="text-xs font-medium">End Time</p>
                                    </div>
                                    {agendaItems.map(item =>
                                        <div className="flex justify-between w-full border-b  py-2" key={item.title}>
                                            <p>{item.title}</p>
                                            <p>{item.start_time}</p>
                                            <p>{item.end_time}</p>
                                        </div>
                                    )}
                                </div>
                                : <p className="text-xs text-neutral-500">At least one agenda item required</p>
                        }
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