'use-client'

import TripItem from "@/app/components/TripItem";
import { Trip } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

interface GetTipsParams {
    text: string
    startDate?: Date
    budget?: string
}


const GetTips = () => {

    const searchParams = useSearchParams()
    const [trips, setTrips] = React.useState<Trip[]>([]);
    useEffect(() => {
        const fetchTrips = async () => {
            const response = await fetch(
                `/api/trips/search?text=${searchParams.get("text") ?? ""}&startDate=${searchParams.get("startDate")}&budget=${searchParams.get("budget")}`
            );

            const data = await response.json();

            setTrips(data);
        };

        fetchTrips();
    }, []);

    return (
        <div className="container mx-auto flex flex-col p-5 items-center gap-4">
            <h1 className="text-dark font-semibold text-xl">Trips found:</h1>
            {
                trips.map(trip => <TripItem key={trip.id} trip={trip} />)
            }
        </div>
    )
}

export default GetTips