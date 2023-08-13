'use client'
import CurrencyInput from "@/components/CurrencyInput";
import DatePicker from "@/components/DatePicker";
import Button from "@/components/Button";
import Input from "@/components/input";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";


interface TripReservationForm {
    text: string
    budget?: string
    startDate?: Date | null

}

const TripSeach = () => {

    const { register, handleSubmit, formState: { errors }, control, setError } = useForm<TripReservationForm>()
    const router = useRouter()

    const onSubmit = (data: TripReservationForm) => {
        router.push(`/trips/search?text=${data.text}&startDate=${data.startDate?.toISOString()}&budget=${data.budget}`)
    }
    return (
        <div className="container mx-auto flex flex-col bg-world-map bg-cover bg-no-repeat p-2">
            <h1 className="font-semibold text-2xl text-center">
                Encontre a sua próxima <span className="text-primary">Viagem!</span>
            </h1>
            <div className="flex flex-col gap-4 mt-5">
                <Input placeholder="Where you want to go?"
                    {...register('text', {
                        required: { value: true, message: "text is required." }
                    }
                    )}
                    error={!!errors?.text} errorMessage={errors?.text?.message}
                />
                <div className="flex gap-4 lg:w-full">
                    <Controller
                        name="startDate"
                        rules={{
                            required: {
                                value: true,
                                message: "End date is required",
                            },
                        }}
                        control={control}
                        render={({ field }) => (
                            <DatePicker
                                error={!!errors?.startDate}
                                errorMessage={errors?.startDate?.message}
                                onChange={field.onChange}
                                selected={field.value}
                                placeholderText="departure date"
                                className="w-full"
                                minDate={new Date()}
                            />
                        )}
                    />
                    <Controller
                        name="budget"
                        control={control}
                        render={({ field }) => (
                            <CurrencyInput
                                allowDecimals={false}
                                placeholder="Budget"
                                onValueChange={field.onChange as any}
                                value={field.value}
                                onBlur={field.onBlur}
                            />
                        )}
                    />


                </div>
                <Button onClick={() => handleSubmit(onSubmit)()}>Search</Button>
            </div>
        </div>
    )
}

export default TripSeach