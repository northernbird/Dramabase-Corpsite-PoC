import {headers} from "next/headers";
import FormRequestHandler from "@/app/api/FormRequestHandler";

/*
 * TODO : Refactor to remove duplicated logic with `request/route.js`
 * TODO : Better to implement CORS setup
 */
export async function POST(request) {
    const body = await request.json();
    //Get and log request header infos
    const headersList = headers()
    const host = headersList.get('Host');
    const userAgent = headersList.get('User-Agent');
    const reqInfo = `Inquiry Request : ${JSON.stringify(body)} by host: ${host}, user-agent: ${userAgent}`;

    // Save request information into S3
    return await FormRequestHandler('inquiry', reqInfo);

}