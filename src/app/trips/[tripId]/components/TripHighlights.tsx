import Image from "next/image";
import React from "react";

interface TripHighlights {
    highlights: string[]
}
const TripHighlights = ({ highlights }: TripHighlights) => {
    return (
        <div className="flex flex-col p-5">
            <h2 className='font-medium text-secondary mb-2'>highlights</h2>
            <div className="flex flex-wrap gap-y-3">
                {
                    highlights.map((highlights, index) => {
                        return (
                            <div className="flex items-center gap-2 w-1/2" key={index}>
                                <Image src="/check-icon.png" width={15} height={15} alt="highlights" />
                                <p className="text-grayPrimary text-xs">{highlights}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default TripHighlights;
