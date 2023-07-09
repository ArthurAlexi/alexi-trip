'use client'
import CurrencyInput from "@/components/CurrencyInput";
import DatePicker from "@/components/DatePicker";
import Button from "@/components/Button";
import Input from "@/components/input";
import React from "react";


const TripSeach = () => {
    return (
        <div className="container mx-auto flex flex-col bg-world-map bg-cover bg-no-repeat p-2">
            <h1 className="font-semibold text-2xl text-center">
                Encontre a sua próxima <span className="text-primary">Viagem!</span>
            </h1>
            <div className="flex flex-col gap-4 mt-5">
                <Input placeholder="Where you want to go?" errorMessage="Error" />
                <div className="flex gap-4">
                    <DatePicker placeholderText="departure date" onChange={() => { }} errorMessage="Error"
                        className="w-full" />
                    <CurrencyInput placeholder="Budget" />
                </div>
                <Button>Buscar</Button>
            </div>
        </div>
    )
}

export default TripSeach