"use client"

import QuickSearch from "./components/QuickSearch"
import TripSeach from "./components/TripSearch"

export default function Home() {

  return (
    <div>
      <TripSeach />
      <QuickSearch />
    </div>
  )
}
