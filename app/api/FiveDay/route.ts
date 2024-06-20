import axios from "axios";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const apiKey = process.env.OPEN_WEATHERMAP_API;
        const searchParams = req.nextUrl.searchParams;
        // const lat = searchParams.get("lat");
        // const lon = searchParams.get("lon");
        const lat = 40.4165;
        const lon = -3.7026;
        const dailyUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

        const dailyRes = await fetch(dailyUrl, {
            next: { revalidate: 3600 }
        })
        const dailyData = await dailyRes.json();

        return NextResponse.json(dailyData);
        // const res = await axios.get(dailyUrl);
    } catch {
        console.log("Error in getting daily data");
        return new Response("Error In getting daily data", { status: 500 });
    }
}
