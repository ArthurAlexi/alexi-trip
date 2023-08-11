"use client";

import Button from "@/components/Button";
import { Trip } from "@prisma/client";
import { format } from "date-fns/esm";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { toast } from "react-toastify";

const TripConfimation = ({ params }: { params: { tripId: string } }) => {

    const searchParams = useSearchParams()
    const router = useRouter()
    const { status, data} = useSession()

    const [trip, setTrip] = useState<Trip | null>()
    const [totalPrice, setTotalPrice] = useState<number | null>()

    const startDate = new Date(searchParams.get("startDate") as string)
    const endDate = new Date(searchParams.get("endDate") as string)
    const guests = searchParams.get("guests")


    

    useEffect(() => {
        const fetchTrip = async () => {
            const response = await fetch("http://localhost:3000/api/trips/check", {
                method: "POST",
                body: JSON.stringify({
                    tripId: params.tripId,
                    startDate: searchParams.get("startDate"),
                    endDate: searchParams.get("endDate"),
                }),
            })
            const res = await response.json()
            if (res?.error) {
                return router.push("/")
            }

            const { trip, totalPrice } = res
            setTrip(trip)
            setTotalPrice(totalPrice)
        }
        if (status === 'unauthenticated') {
            router.push("/")
        }
        fetchTrip()
    }, [status, searchParams, params, router])

    
    if (!trip) return null
    const handleBuyClick = async () => {
      
        const res = await fetch("/api/payment", {
          method: "POST",
          body: Buffer.from(
            JSON.stringify({
              tripId: params.tripId,
              startDate: searchParams.get("startDate"),
              endDate: searchParams.get("endDate"),
              guests: Number(searchParams.get("guests")),
              userId: (data!.user as any)?.id,
              totalPrice,
              coverImage: trip.coverImage,
              name: trip.name,
              description: trip.description,
            })
          ),
        });
    
        if (!res.ok) {
          return toast.error("Ocorreu um erro ao realizar a reserva!", { position: "bottom-center" });
        }
    
        const { sessionId } = await res.json();
    
        // const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY as string);
    
        // await stripe?.redirectToCheckout({ sessionId });
        
        router.push('/')
        toast.success("Reserva realizada com sucesso!", { position: "bottom-center" });
      };

    return (
        <div className="container mx-auto">
            <h2 className="font-semibold text-xl text-dark"> Your Trip</h2>

            <div className="flex flex-col p-5 mt-5 border border-grayLighter border-solid shadow-lg rounded-lg">
                <div className="flex  items-center gap-3  pb-5 border-b border-grayLighter border-solid">
                    <div className="relative h-[106px] w-[124px]">
                        <Image src={trip.coverImage} fill style={{ objectFit: "cover" }} className="rounded-lg" alt={trip.name} />
                    </div>
                    <div className="flex flex-col">
                        <h2 className="text-xl text-dark font-semibold">{trip.name}</h2>
                        <div className="flex items-center gap-1">
                            <ReactCountryFlag countryCode={trip.countryCode} svg />
                            <p className="text-xs text-grayPrimary underline">{trip.location}</p>
                        </div>
                    </div>
                </div>
                <h3 className="font-semibold  text-lg text-dark mt-3">Informations about the Price:</h3>
                <div className="flex justify-between items-center mt-1">
                    <p className=" text-dark"> Total: </p>
                    <p className="font-medium text-dark">R$ {totalPrice} </p>
                </div>
            </div>

            <div className="flex flex-col mt-5 text-dark">
                <h3>Data</h3>
                <div className="flex gap-1 mt-1">
                    <p>{format(startDate, "dd 'de' MMM")}</p>
                    {" - "}
                    <p>{format(endDate, "dd 'de' MMM")}</p>
                </div>
            </div>

            <h3 className="mt-1">guests</h3>
            <p>{guests} guests</p>

            <Button className="mt-5" onClick={handleBuyClick}>checkout</Button>
        </div>
    )
}

export default TripConfimation;