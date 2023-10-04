import {headers} from "next/headers";

/*
 * TODO : Refactor to remove duplicated logic with `request/route.js`
 */
export async function POST(request) {
    const body = await request.json();
    //Get and log request header infos
    const headersList = headers()
    const host = headersList.get('Host');
    const userAgent = headersList.get('User-Agent');
    console.info(`Inquiry Request : ${JSON.stringify(body)} by host: ${host}, user-agent: ${userAgent}`);


    return new Response(JSON.stringify({message: "OK"}), {
        status: 200,
    })
}