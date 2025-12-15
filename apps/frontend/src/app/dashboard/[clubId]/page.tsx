"use client"

import { useParams } from "next/navigation"

export default function club() {
    const params = useParams()
    const id = params.clubId
    return (
        <div>
            <p>
                {id} you are in club id page
            </p>
        </div>
    )
}