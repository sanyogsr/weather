import { useGlobalContext } from '@/app/context/GlobalContext'
import { clearSky, cloudy, drizzleIcon, navigation, rain, snow } from '@/app/utils/Icons';
import { kelvinToCelcius } from '@/app/utils/misc';
import React, { useEffect, useState } from 'react'
import moment from "moment"

const Temperature = () => {
    const { forecast } = useGlobalContext();


    if (!forecast || !forecast?.weather) return <div>Loading...</div>
    const { main, timezone, name, weather } = forecast;


    const temp = kelvinToCelcius(main?.temp);
    const minTemp = kelvinToCelcius(main?.temp_min);
    const maxTemp = kelvinToCelcius(main?.temp_max);

    const [localTime, setLocalTime] = useState<String>("")
    const [currentDay, setCurrentDay] = useState<String>("")

    const { main: weatherMain, description } = weather[0];


    const getIcon = () => {
        switch (weatherMain) {
            case "drizzle":
                return drizzleIcon;
            case "Rain":
                return rain;
            case "Snow":
                return snow;
            case "Clear":
                return clearSky;
            case "Clouds":
                return cloudy;
            default:
                return clearSky;
        }
    }

    useEffect(
        () => {
            //update the time interval
            const interval = setInterval(() => {
                const localMoment = moment().utcOffset(timezone / 60);
                //  custom format 24 hrs. format
                const formattedTime = localMoment.format("HH:mm:ss");
                // day of the week
                const day = localMoment.format("dddd")

                setLocalTime(formattedTime);
                setCurrentDay(day);

            }, 1000);

            return () => clearInterval(interval);
        }, [timezone]);

    return (
        <>

            <div className="pb-5 pt-6 px-4 flex flex-col justify-between  rounded-lg border shadow-sm dark:shadow-none dark:bg-dark-grey">
                <p className='flex justify-between items-center'>
                    <span >{currentDay}</span>
                    <span>{localTime}</span>
                </p>
                <p className='flex gap-2 font-bold pt-4'>
                    <span>{name}</span>
                    <span>{navigation}</span>

                </p>
                <p className='py-10 text-9xl font-bold self-center'>{temp}°</p>
                <div>
                    <div>
                        <span>{getIcon()}</span>
                        <p className='pt-4 capitalize text-lg font-medium '>{description}</p>
                    </div>

                    <p className='flex gap-3 '>
                        <span>Low:{minTemp}°</span>
                        <span>High:{maxTemp}°</span>
                    </p>

                </div>
            </div>
        </>
    )
}

export default Temperature