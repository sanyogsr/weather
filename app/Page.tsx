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
import defaultStates from './utils/DefaultStates'
import  {useGlobalContext}  from './context/GlobalContext'
import Image from 'next/image'
import FiveDayForecast from './components/FiveDayForecast/FiveDayForecast'

const Page = () => {
  const { setActiveCityCoords } = useGlobalContext();
  //hiii
  const onClickCityCoords = (lat: number, lon: number) => {
    setActiveCityCoords([lat, lon]);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  return (
    <main className='max-[1rem] lg:max-[2rem] xl:mx-[6rem] 2xl:mx-[16rem] m-auto'>
      <Navbar />
      <div className="flex flex-col pb-4 md:flex-row gap-4">
        <div className="flex flex-col gap-4 w-full min-w-[18rem] md:w-[35rem]">
          <Temperature />
          <FiveDayForecast />
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

            <div className='states flex flex-col gap-3 flex-1'>
              <h2 className="flex items-center gap-2 font-medium">

                Top Large Cities

              </h2>
              <div className='flex flex-col gap-4'>
                {defaultStates.map((state, index) => {
                  return (
                    <div
                      key={index}
                      className='border rounder-lg cursor-pointer dark:bg-dark-gray shadow-sm dark:shadow-none'
                      onClick={() => {
                        onClickCityCoords(state.lat, state.lon);
                      }}
                    >

                      <p className='py-4 px-4'>{state.name}</p>

                    </div>
                  )
                })}

              </div>

            </div>
          </div>

        </div>
      </div>


      <footer className='py-4 flex justify-center pb-8'>
        <p className='footer-text text-sm flex items-center gap-1'>
          Made by
          <Image src={"/logo-white.svg"} alt='Logo' width={20} height={20} className='mx-2' />

          <a href="https://x.com/sanyogsr/" target='_blank' className='text-green-300 font-bold'>Sanyog</a>
        </p>


      </footer>

    </main>
  )
}

export default Page;