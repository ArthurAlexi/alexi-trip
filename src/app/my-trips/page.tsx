'use client'

import { TripReservation } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, {useEffect,useState} from 'react'

const MyTrips =  ()=>{

    const router = useRouter()
    const {status, data} = useSession()
    const [reservations, setReservations] = useState<TripReservation[]>([])

    useEffect(()=>{
        if(status === "authenticated")
            router.push('/')

        const fetchReservations =async () => {
            const response = await fetch(`http://localhost:3000/api/user/${(data?.user as any).id}/trips`)
            const json = await response.json()
            setReservations(json)
        }
        fetchReservations()


    }, [status])

    return(
        <div className='container mg'>
        </div>
    )
}

export default MyTrips;