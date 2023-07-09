'use client'

import Button from "@/components/Button";
import DatePicker from "@/components/DatePicker";
import Input from "@/components/input";
import { Trip } from "@prisma/client";
import React from "react";

interface TripReservationProps {
    trip : Trip
}
const TripReservation = ({trip} : TripReservationProps)=>{
    return(
        <div className="flex flex-col px-5 ">
            <div className="flex gap-4">
                <DatePicker placeholderText="Start Date" onChange={()=>{}} className="w-fulll"/>
                <DatePicker placeholderText="End Date" onChange={()=>{}} className="w-fulll"/>
            </div>
            <Input placeholder={`Number of Guests (max: ${trip.maxGuests})`} className="mt-4"/>
            <div className="flex justify-between mt-3">
                <p className="font-medium text-sm text-dark">Total: </p>
                <p className="font-medium text-sm text-dark">R$ </p>
            </div>
            <div className="pb-10 border-b border-grayLighter w-full">
                <Button className="mt-3 w-full">Book now</Button>
            </div>
        </div>
    )
}

export default TripReservation;