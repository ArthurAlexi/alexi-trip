import Button from "@/components/Button";
import Image from "next/image";
import React from "react";

interface TripLocationPros {
    location : string
}
const TripLocation = ({ location }: TripLocationPros) =>{
    return (
        <div className="flex flex-col p-5">
            <h2 className='font-medium text-secondary mb-5'>Location</h2>
            <div className="relative w-full h-[280]">
                <Image src="/map-mobile.png" alt={location} className="rounded-lg shadow-md" style={{
                    objectFit: "cover"
                }} fill/>
            </div>
            <h3 className="text-dark text-sm font-semibold mt-3">{location}</h3>
            <p className="text-xs text-secondary leading-5 mt-2">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti consequuntur, nemo animi ab eum sit et earum ipsum, quae recusandae provident enim neque architecto sed voluptatem expedita, voluptate tempora illum!</p>
            <Button variant="outlined" className="w-full mt-5"> See in Google Maps</Button>
        </div>
    )

}

export default TripLocation;