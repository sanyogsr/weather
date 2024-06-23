"use client"
import React from 'react'
import Navbar from "@/app/components/Navbar"
import Temperature from './components/temperature/Temperature'
import AirPollution from './components/AirPollution/AirPollution'
import Sunset from './components/sunset/Sunset'
import Wind from './components/Wind/Wind'

const page = () => {
  return (
    <main className='max-[1rem] lg:max-[2rem] xl:mx-[6rem] 2xl:mx-[16rem] m-auto'>
      <Navbar />
      <div className="flex flex-col pb-4 md:flex-row gap-4">
        <div className="flex flex-col gap-4 w-full min-w-[18rem] md:w-[35rem]">
          <Temperature />
        </div>
        <div className="flex flex-col w-full">
          <div className="instruments flex justify-between px-5">
            <AirPollution />
            <Sunset />
            <Wind />
          </div>
        </div>
      </div>
    </main>
  )
}

export default page;