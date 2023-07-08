import React from "react";
import { prisma } from "../lib/prisma";
import { Trip } from "@prisma/client";
import TripItem from "./TripItem";

async function getTrips() {
    const trips = await prisma.trip.findMany({});

    return trips;
}

const RecommendedTrips = async () => {
    const data = await getTrips();
    return (
        <div className="container mt-auto p-5">
            <div className="flex items-center">
                <div className="w-full h-[1px] bg-grayLighter"></div>
                <h2 className="font-medium text-grayLibg-grayLighter whitespace-nowrap px-5">
                    recommended destinations
                </h2>
                <div className="w-full h-[2px] bg-grayPrimary"></div>
            </div>

            <div className="flex flex-col items-center mt-5 lg:mt-12 gap-5 lg:flex-row gap lg:flex-wrap lg:justify-center lg:gap-10">
                {data.map((trip: Trip) => (
                    <TripItem key={trip.id} trip={trip} />
                ))}
            </div>
        </div>
    )
}

export default RecommendedTrips