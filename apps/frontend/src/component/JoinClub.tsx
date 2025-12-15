"use client"

import { joinClubSchema } from "@repo/shared-types"
import { Button } from "@repo/ui/components/button"
import {
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@repo/ui/components/dialog"
import { Input } from "@repo/ui/components/input"
import { Label } from "@repo/ui/components/label"
import axios from "axios"
import React, { useState } from "react"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
import { joinClub } from "../state-management/slice/clubSlice"

export function JoinClub() {
    const [clubId, setClubId] = useState("");
    const dispatch = useDispatch()

    const handleJoin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Reach here")
        const validateResult = joinClubSchema.safeParse({ club_id: Number(clubId) })
        if (!validateResult.success) {
            if (validateResult.error.issues[0]?.message) {
                return toast.error(validateResult.error.issues[0]?.message)
            } else {
                return toast.error("Club id don't match")
            }
        }
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/club`, validateResult.data, { withCredentials: true })
            .then(res => {
                res.data.data.forEach((club: any) =>
                    dispatch(joinClub({ id: club.club_id, name: club.club_name }))
                )
                toast.success("Successfully join club")
                setClubId("")
            })
            .catch(error => {
                console.error('Axios error:', error)
                toast.error(error.response?.data?.message || 'Something went wrong')
            })
    }

    return (
        <DialogContent className="sm:max-w-[425px]">
            <form className="flex flex-col gap-3" onSubmit={handleJoin}>
                <DialogHeader className="flex flex-col gap-2">
                    <DialogTitle>Join Club</DialogTitle>
                    <DialogDescription>
                        Enter a club id want to join.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="name-1">Club Id</Label>
                    <Input
                        id="name-1"
                        name="name"
                        placeholder="1"
                        value={clubId}
                        onChange={(e) => setClubId(e.target.value)}
                    />
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">Join</Button>
                </DialogFooter>
            </form>
        </DialogContent>
    )
}
