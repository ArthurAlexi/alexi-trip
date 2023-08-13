'use client'

import Button from "@/components/Button";
import DatePicker from "@/components/DatePicker";
import Input from "@/components/input";
import { differenceInDays } from "date-fns";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm, Controller } from "react-hook-form";


interface TripReservationForm {
    guests: number
    startDate: Date | null
    endDate: Date | null
}
interface TripReservationProps {
    tripId: string;
    tripStartDate: Date;
    tripEndDate: Date;
    maxGuests: number;
    pricePerDay: number;
}
const TripReservation = ({ tripId, maxGuests, tripStartDate, tripEndDate, pricePerDay }: TripReservationProps) => {
    const { register, handleSubmit, formState: { errors }, watch, control, setError } = useForm<TripReservationForm>()
    const router = useRouter();
    const onSubmit = async (data: any) => {
        // const response = await fetch("/api/trips/check", {
        //     method: "POST",
        //     body: Buffer.from(
        //         JSON.stringify({
        //             startDate: data.startDate,
        //             endDate: data.endDate,
        //             tripId,
        //         })
        //     ),
        // })
        //http://localhost:3000/trips/79798de5-9f04-4057-9030-16b2b4f75026
        const response = await fetch("http://localhost:3000/api/trips/check", { 
            method: "POST",
            body: Buffer.from(
                JSON.stringify({
                    startDate: data.startDate,
                    endDate: data.endDate,
                    tripId,
                })
            ),
        })
        const res = await response.json()
        if(res?.error?.code === 'TRIP_ALREADY_RESERVED'){
            setError("startDate", {
                type: "manual",
                message: "date already reserved"
            })

            return setError("endDate", {
                type: "manual",
                message: "date already reserved"
            })
        }
        if (res?.error?.code === "INVALID_START_DATE") {
            return setError("startDate", {
              type: "manual",
              message: "Invalid date.",
            });
          }
      
          if (res?.error?.code === "INVALID_END_DATE") {
            return setError("endDate", {
              type: "manual",
              message: "Invalid date.",
            });
        }
        router
        .push(`/trips/${tripId}/confirmation?startDate=${data.startDate?.toISOString()}&endDate=${data.endDate?.toISOString()}&maxGuests=${data.maxGuests}`)


    }
    const startDate = watch("startDate");
    const endDate = watch("endDate");
    return (
        <div className="flex flex-col px-5 ">
            <div className="flex gap-4">
                <Controller
                    name="startDate"
                    rules={{
                        required: {
                            value: true,
                            message: "Start date is required.",
                        },
                    }}
                    control={control}
                    render={({ field }) => (
                        <DatePicker
                            error={!!errors?.startDate}
                            errorMessage={errors?.startDate?.message}
                            onChange={field.onChange}
                            selected={field.value}
                            placeholderText="Data de Início"
                            className="w-full"
                            minDate={tripStartDate}
                        />
                    )}
                />

                <Controller
                    name="endDate"
                    rules={{
                        required: {
                            value: true,
                            message: "End date is required",
                        },
                    }}
                    control={control}
                    render={({ field }) => (
                        <DatePicker
                            error={!!errors?.endDate}
                            errorMessage={errors?.endDate?.message}
                            onChange={field.onChange}
                            selected={field.value}
                            placeholderText="Data Final"
                            className="w-full"
                            maxDate={tripEndDate}
                            minDate={startDate ?? tripStartDate}
                        />
                    )}
                />

            </div>
            <Input placeholder={`Number of Guests (max: ${maxGuests})`} className="mt-4" type="number"
                {...register('guests', { 
                    required: { value: true, message: "number of guests is required" },
                    max:{ value: maxGuests, message: `The number of guests cannot be greater than ${maxGuests}`} 
                })}
                error={!!errors?.guests} errorMessage={errors?.guests?.message} 
            />

            <div className="flex justify-between mt-3">
                <p className="font-medium text-sm text-dark">Total: </p>
                <p className="font-medium text-sm text-dark">
                    {startDate && endDate ? `R$ ${differenceInDays(endDate, startDate) * pricePerDay}` ?? 1 : "R$ 0"}
                </p>
            </div>
            <div className="pb-10 border-b border-grayLighter w-full">
                <Button className="mt-3 w-full" onClick={() => handleSubmit(onSubmit)()}>Book now</Button>
            </div>
        </div>
    )
}

export default TripReservation;