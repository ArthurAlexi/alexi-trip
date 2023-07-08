import Image from "next/image";
import React from "react";

const QuickSearch = () =>{
    return (
        <div className="container mt-auto p-5">
            <div className="flex items-center">
                <div className="w-full h-[1px] bg-grayLighter"></div>
                <h2 className="font-medium text-grayLibg-grayLighter whitespace-nowrap px-5">
                    Tente pesquisar por
                </h2>
                <div className="w-full h-[2px] bg-grayPrimary"></div>
            </div>

            <div className="flex w-full justify-between mt-4">
                <div className="flex flex-col items-center gap-1 cursor-pointer">
                    <Image width={35} height={35} src={'/hotel-icon.png'}  alt="Hotel"/>
                    <p className="text-sm text-grayPrimary">Hotel</p>
                </div>
                <div className="flex flex-col items-center gap-1 cursor-pointer">
                    <Image width={35} height={35} src={'/farm-icon.png'}  alt="farm"/>
                    <p className="text-sm text-grayPrimary">Farm</p>
                </div>
                <div className="flex flex-col items-center gap-1 cursor-pointer">
                    <Image width={35} height={35} src={'/cottage-icon.png'}  alt="cottage"/>
                    <p className="text-sm text-grayPrimary">Cottage</p>
                </div>
                <div className="flex flex-col items-center gap-1 cursor-pointer">
                    <Image width={35} height={35} src={'/inn-icon.png'}  alt="inn"/>
                    <p className="text-sm text-grayPrimary">Inn</p>
                </div>
            </div>
        </div>
    )
}

export default QuickSearch