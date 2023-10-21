import { NextRequest } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET(request : NextRequest) {

    const path = request.nextUrl.pathname;

    const shortlink = path.split("/")[1];




    const { rows } = await sql`SELECT * FROM shortlinks WHERE shortlink = ${shortlink}`;


    if(rows.length === 0) {
        return Response.json({error: "Invalid shortlink"})
    }

    const { longlink } = rows[0];

    return Response.redirect(longlink);
}

export const revalidate = 3