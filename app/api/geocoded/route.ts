import axios from "axios";
import { NextResponse, NextRequest } from "next/server";


export async function name(req: NextRequest) {
    try {
        const apiKey = process.env.OPEN_WEATHERMAP_API
        const searchParams = req.nextUrl.searchParams;

        // const city = searchParams.get("search")
        const city = "atlanta";
        const url = "http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}"


        const res = await axios.get(url);
        return NextResponse.json(res.data);

    } catch (error) {
        console.log("Error fetching geocoded data")
        return new Response("Error fetching geocoded data", { status: 500 })
    }

}