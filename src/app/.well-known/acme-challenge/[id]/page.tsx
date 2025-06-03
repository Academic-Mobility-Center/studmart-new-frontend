"use client"
import React from "react"
import { useParams } from "next/navigation";

export default function WellKnownPage () {
    const params = useParams();
    const id = params?.id as string;
    return (<div>{id}</div>)
}