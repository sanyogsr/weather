// import axios from "axios";
// import { NextResponse, NextRequest } from "next/server";

// export async function GET(req: NextRequest) {
//     try {
//         const apiKey = process.env.OPEN_WEATHERMAP_API;
//         const searchParams = req.nextUrl.searchParams;
//         // const lat = searchParams.get("lat");
//         // const lon = searchParams.get("lon");
//         const lat = 29.41595155641117;
//         const lon = 76.98609355487254;
//         const dailyUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

//         const dailyRes = await fetch(dailyUrl, {
//             next: { revalidate: 3600 }
//         })
//         const dailyData = await dailyRes.json();

//         return NextResponse.json(dailyData);
//         // const res = await axios.get(dailyUrl);
//     } catch {
//         console.log("Error in getting daily data");
//         return new Response("Error In getting daily data", { status: 500 });
//     }
// }
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const apiKey = process.env.OPEN_WEATHERMAP_API;
        if (!apiKey) {
            throw new Error("API key is missing");
        }

        const searchParams = req.nextUrl.searchParams;

        // const lat = 29.41595155641117;
        // const lon = 76.98609355487254;
        const lat = searchParams.get("lat");
        const lon = searchParams.get("lon");

        if (!lat || !lon) {
            return new Response("Latitude and Longitude are required", { status: 300 });
        }

        const dailyUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

        const dailyRes = await fetch(dailyUrl, {
            next: { revalidate: 3600 }
        });

        if (!dailyRes.ok) {
            throw new Error(`Failed to fetch data: ${dailyRes.statusText}`);
        }

        const dailyData = await dailyRes.json();

        return NextResponse.json(dailyData);
    } catch (error) {
        console.error("Error in getting daily data:", error);
        return new Response("Error in getting daily data", { status: 500 });
    }
}
