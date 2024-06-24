"use client"
import React from 'react'
import Navbar from "@/app/components/Navbar"
import Temperature from './components/temperature/Temperature'
import AirPollution from './components/AirPollution/AirPollution'
import Sunset from './components/sunset/Sunset'
import Wind from './components/Wind/Wind'
import DailyForecast from './components/DailyForecast/DailyForecast'
import UvIndex from './components/UvIndex/UvIndex'
import Population from './components/Population/Population'
import FeelsLike from './components/FeelsLike/FeelsLike'
import Humidity from './components/Humidity/Humidity'
import Visibility from './components/Visibility/Visibility'
import Pressure from './components/Pressure/Pressure'
import Mapbox from './components/Mapbox/Mapbox'

const page = () => {
  return (
    <main className='max-[1rem] lg:max-[2rem] xl:mx-[6rem] 2xl:mx-[16rem] m-auto'>
      <Navbar />
      <div className="flex flex-col pb-4 md:flex-row gap-4">
        <div className="flex flex-col gap-4 w-full min-w-[18rem] md:w-[35rem]">
          <Temperature />
        </div>
        <div className="flex flex-col w-full">
          <div className="instruments grid h-full gap-4 col-span-full sm-2:col-span-2 lg:grid-cols-3 xl:grid-cols-4">
            <AirPollution />
            <Sunset />
            <Wind />
            <DailyForecast />
            <UvIndex />
            <Population />
            <FeelsLike />
            <Humidity />
            <Visibility />
            <Pressure />
          </div>
          <div className="mapbox-con mt-4 flex gap-4">

            <Mapbox />
          </div>

        </div>
      </div>
    </main>
  )
}

export default page;