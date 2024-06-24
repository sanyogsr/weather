"use client"
import { useGlobalContext } from '@/app/context/GlobalContext'
import { thermometer } from '@/app/utils/Icons';
import { kelvinToCelcius } from '@/app/utils/misc';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react'

const FeelsLike = () => {
    const { forecast } = useGlobalContext();



    if (!forecast || !forecast?.main || !forecast?.main?.feels_like) {
        return <Skeleton className='h-[12rem] w-full' />
    }
    const { feels_like, temp_min, temp_max } = forecast?.main;


    const feelsLikeText = (
        feelsLike: number,
        minTemp: number,
        maxTemp: number
    ) => {
        const avgTemp = (minTemp + maxTemp) / 2;

        if (feelsLike < avgTemp - 5) {
            return "Feels significantly colder than actual temperature.";
        }
        if (feelsLike > avgTemp - 5 && feelsLike <= avgTemp + 5) {
            return "Feels close to actual Temperature";
        }
        if (feelsLike > avgTemp + 5) {
            return "Feels Warmer than the actual temperature";
        }
        return "Temperature feeling is typical for this raange.";
    }

    const feelsLikeDescription = feelsLikeText(forecast?.main?.feels_like, forecast?.main?.temp_min, forecast?.main?.temp_max);



    return (
        <div
            className='py-5 px-5 border rounded-lg h-[12rem] flex flex-col gap-8 dark:bg-dark-gray shadow-sm dark:shadow-none'>

            <div className="top">
                <h2 className='flex items-center gap-2 font-medium'>{thermometer} FeelsLike</h2>
                <p className='pt-4 text-2xl'>{kelvinToCelcius(forecast?.main?.feels_like)}°</p>
            </div>

            <p className='text-sm'> {feelsLikeDescription}</p>

        </div>
    )
}

export default FeelsLike
