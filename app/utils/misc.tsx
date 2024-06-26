import moment, { unix } from "moment";



export const unixToTime = (unix: number, timezone: number) => {
    return moment.unix(unix).utcOffset(timezone / 60).format("HH:mm")

}

export const unxiTODay = (unix: number) => {
    return moment.unix(unix).format("ddd");
}







export const kelvinToCelcius = (kelvin: number) => {
    return Math.round(kelvin - 273.15);

}

export const formatNumber = (num: number) => {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + "M";
    }
    else if (num >= 1000) {
        return (num / 1000).toFixed(1) + "M";
    }
    else {
        return num;
    }
}


export const airQualityIndexText = [
    {
        ratings: 10,
        desxriptions: "excellent"
    },
    {
        rating: 20,
        description: "good",
    },
    {
        rating: 30,
        description: "satisfactory",
    },
    {
        rating: 40,
        description: "fair",
    },
    {
        rating: 50,
        description: "moderate",
    },
    {
        rating: 60,
        description: "moderate",
    },
    {
        rating: 70,
        description: "poor",
    },
    {
        rating: 80,
        description: "poor",
    },
    {
        rating: 90,
        description: "very poor",
    },
    {
        rating: 100,
        description: "very poor",
    },
];
