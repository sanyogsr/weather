import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const apiKey = process.env.OPEN_WEATHERMAP_API;
        const searchParams = req.nextUrl.searchParams;
        const lat = searchParams.get("lat");
        const lon = searchParams.get("lon");
        // const lat = 29.41595155641117;
        // const lon = 76.98609355487254;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
        const res = await axios.get(url);
        // console.log("res:", res.data)
        return NextResponse.json(res.data);

    } catch (error) {
        console.log("Error Fetching the ForeCast Data")
        return new Response("Error fetchin thee forcast data", { status: 500 })
    }
}