'use client'
import CurrencyInput from "@/components/CurrencyInput";
import DatePicker from "@/components/DatePicker";
import Button from "@/components/Button";
import Input from "@/components/input";
import React from "react";


const TripSeach = () => {
    return (
        <div className="container mx-auto flex bg-world-map bg-cover bg-no-repeat">
            <h1 className="font-semibold text-2xl text-center">
                Encontre a sua próxima <span className="text-primary">Viagem!</span>
            </h1>
            <div className="flex flex-col gap-4 mt-5">
                <Input placeholder="Onde você quer ir?" errorMessage="Error" />
                <div className="flex gap-4">
                    <DatePicker placeholderText="Data de Ida" onChange={() => { }} errorMessage="Error"
                        className="w-full" />
                    <CurrencyInput placeholder="Orçamento" />
                </div>
                <Button>Buscar</Button>
            </div>
        </div>
    )
}

export default TripSeach