"use client"

import { 
    Dialog, 
    DialogTrigger 
} from "@repo/ui/components/dialog"

import { useParams } from "next/navigation"
import { Header } from "../../../component/Header"

export default function club() {
    const params = useParams()
    const id = params.clubId
    return (
        <div className="flex flex-col items-center justify-center w-full">
            <Header/>
            <div>

            </div>
        </div>
    )
}