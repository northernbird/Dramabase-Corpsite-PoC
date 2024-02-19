import {NextResponse} from "next/server";

export async function GET(request) {

    console.log("Enter HealthCheck Request : " + JSON.stringify(request));

    return NextResponse.json({ message: 'Health check is working!' }, { status: 200 })
}