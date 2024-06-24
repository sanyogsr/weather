"use client"
import { useGlobalContext } from '@/app/context/GlobalContext'
import { people } from '@/app/utils/Icons'
import { formatNumber } from '@/app/utils/misc';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react'

const Population = () => {
    const { fiveDayForecast } = useGlobalContext();
    const { city } = fiveDayForecast;

    if (!city || !fiveDayForecast) {
        return <Skeleton className='h-[12rem] w-full' />
    }

    return (
        <div
            className='py-6 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-gray shadow-sm dark:shadow-none'>

            <div className="top">
                <h2 className='flex gap-2 items-center font-medium'>{people} Population</h2>
                <p className='pt-4 text-2xl'>{formatNumber(city.population)}</p>
            </div>
            <p className='text-sm'>Last UN data for {city.name}</p>
        </div>
    )
}

export default Population