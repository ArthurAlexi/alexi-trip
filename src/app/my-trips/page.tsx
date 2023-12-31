'use client'

import { Prisma, TripReservation } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import UserReservationItem from './components/UserReservationItem';
import Button from '@/components/Button';
import Link from 'next/link';

const MyTrips = () => {

    const router = useRouter()
    const { status, data } = useSession()
    const [reservations, setReservations] = useState<Prisma.TripReservationGetPayload<{
        include: { trip: true }
    }>[]>([])

    const fetchReservations = async () => {
        const response = await fetch(`http://localhost:3000/api/user/${(data?.user as any).id}/trips`)
        const json = await response.json()
        setReservations(json)
    }

    useEffect(() => {
        if (status === "authenticated")
            router.push('/')

        
        fetchReservations()


    }, [status])

    return (
        <div className='container mx-auto p-5'>
            <h1 className="font-semibold text-dark text-xl">My trips</h1>
            {
                reservations.length > 0 ? (
                    reservations?.map((reservation) => 
                    <UserReservationItem key={reservation.id} reservation={reservation} fetchReservations={fetchReservations}/>)
                ) 
                    : 
                <div className="flex flex-col">
                    <p className='font-medium text-dark mt-2'>you have no trips booked</p>
                    <Link href="/"><Button className='w-full mt-2'>Makereservation</Button></Link>
                </div>

            }
        </div>
    )
}

export default MyTrips;