import { prisma } from "@/app/lib/prisma";
import { Trip } from "@prisma/client";
import Image from "next/image";
import React from "react";
import ReactCountryFlag from "react-country-flag";
import TripHeader from "./components/TripHeader";
import TripReservarion from "./components/TripReservarion";
import TripDescription from "./components/tripDescription";

const getTripDetails = async (tripId: string) => {
    const trip = await prisma.trip.findUnique({
        where: {
            id: tripId
        }
    })
    return trip;
}

const TripDetails = async ({ params }: { params: { tripId: string } }) => {
    const trip = await getTripDetails(params.tripId)
    if(!trip) return null

    return (
        <div className="container mt-auto">
            <TripHeader trip={trip}/>
            <TripReservarion trip={trip}/>
            <TripDescription description={trip.description}/>
        </div>
    )
}