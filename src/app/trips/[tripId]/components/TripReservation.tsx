'use client'

import Button from "@/components/Button";
import DatePicker from "@/components/DatePicker";
import Input from "@/components/input";
import { Trip } from "@prisma/client";
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
    const { register, handleSubmit, formState: { errors } , watch, control} = useForm<TripReservationForm>()
    const onSubmit = (data: any) => {

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
            <Input placeholder={`Number of Guests (max: ${maxGuests})`} className="mt-4"
                {...register('guests', { required: { value: true, message: "number of guests is required" }, })}
                error={!!errors?.guests} errorMessage={errors?.guests?.message} />

            <div className="flex justify-between mt-3">
                <p className="font-medium text-sm text-dark">Total: </p>
                <p className="font-medium text-sm text-dark">R$ </p>
            </div>
            <div className="pb-10 border-b border-grayLighter w-full">
                <Button className="mt-3 w-full" onClick={() => handleSubmit(onSubmit)()}>Book now</Button>
            </div>
        </div>
    )
}

export default TripReservation;