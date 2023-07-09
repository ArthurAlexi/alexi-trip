'use client'

import Button from "@/components/Button";
import DatePicker from "@/components/DatePicker";
import Input from "@/components/input";
import { Trip } from "@prisma/client";
import React from "react";

interface TripReservarionProps {
    trip : Trip
}
const TripReservarion = ({trip} : TripReservarionProps)=>{
    return(
        <div className="flex flex-col px-5">
            <div className="flex gap-4">
                <DatePicker placeholderText="Start Date" onChange={()=>{}} className="w-fulll"/>
                <DatePicker placeholderText="End Date" onChange={()=>{}} className="w-fulll"/>
            </div>
            <Input placeholder={`Number of Guests (max: ${trip.maxGuests})`} className="mt-4"/>
            <div className="flex justify-between mt-3">
                <p className="text-medium text-sm text-dark">Total: </p>
                <p className="text-medium text-sm text-dark">R$ </p>
            </div>
            <Button className="mt-3">Book now</Button>
        </div>
    )
}

export default TripReservarion;