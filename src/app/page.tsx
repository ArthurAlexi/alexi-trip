"use client"

import QuickSearch from "./components/QuickSearch"
import RecommendedTrips from "./components/RecommendedTrips"
import TripSeach from "./components/TripSearch"

export default function Home() {

  return (
    <div>
      <TripSeach />
      <QuickSearch />
      <RecommendedTrips/>
    </div>
  )
}
