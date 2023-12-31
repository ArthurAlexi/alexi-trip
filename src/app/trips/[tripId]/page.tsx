import { prisma } from "@/app/lib/prisma";
import { Trip } from "@prisma/client";
import Image from "next/image";
import React from "react";
import ReactCountryFlag from "react-country-flag";
import TripHeader from "./components/TripHeader";
import TripReservation from "./components/TripReservation";
import TripDescription from "./components/tripDescription";
import TripHighlights from "./components/TripHighlights";
import TripLocation from "./components/TripLocation";

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
            <TripReservation  
                tripId={trip.id} 
                tripStartDate={trip.startDate} 
                tripEndDate={trip.endDate} 
                maxGuests={trip.maxGuests} 
                pricePerDay={trip.pricePerDay.toNumber()}
            />
            <TripDescription description={trip.description}/>
            <TripHighlights highlights={trip.highlights}/>
            <TripLocation location={trip.location}/>
        </div>
    )
}

export default TripDetails;