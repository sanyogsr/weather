"use client"
import { useGlobalContext } from '@/app/context/GlobalContext'
import { sun } from '@/app/utils/Icons';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react'
import { text } from 'stream/consumers';
import { UvProgress } from '../UvProgress/UvProgress';


const UvIndex = () => {
    const { uvIndex } = useGlobalContext();

    if (!uvIndex || !uvIndex.daily) {
        return <Skeleton className='h-[12rem] w-full' />
    }

    const { daily } = uvIndex;
    const { uv_index_clear_sky_max, uv_index_max } = daily;

    const uvIndexMax = uv_index_max[0].toFixed(0);

    const uvIndexCategory = (uvIndex: number) => {
        if (uvIndex <= 2) {
            return {
                text: "low",
                protection: "No protection required"
            }
        }
        else if (uvIndex <= 5) {
            return {
                text: "Moderate",
                protection: "Stay in shade near midday.",
            };
        } else if (uvIndex <= 7) {
            return {
                text: "High",
                protection: "Wear a hat and sunglasses.",
            };
        } else if (uvIndex <= 10) {
            return {
                text: "Very High",
                protection: "Apply sunscreen SPF 30+ every 2 hours.",
            };
        } else if (uvIndex > 10) {
            return {
                text: "Extreme",
                protection: "Avoid being outside.",
            };
        } else {
            return {
                text: "Extreme",
                protection: "Avoid being outside.",
            };
        }

    }

    const marginLeftPercentage = (uvIndexMax / 14) * 100;
    return (
        <div className='py-5 px-5 border rounded-lg flex flex-col gap-5 dark:bg-dark-gray shadow-sm dark:shadow-none '>


            <div className='top'>
                <h2 className='flex items-center gap-2 font-medium'>{sun} Uv Index</h2>
                <div className='pt-4 flex flex-col gap-1'>
                    <p className='text-2xl flex items-center gap-1'>
                        {uvIndexMax}
                        <span className='text-sm'>
                            {(uvIndexCategory(uvIndexMax).text)}
                        </span>
                    </p>


                    <UvProgress className='progress' max={14} value={marginLeftPercentage} />


                </div>
            </div>
            <p className='text-sm'> {uvIndexCategory(uvIndexMax).protection}</p>
        </div>
    )
}

export default UvIndex