import { NextRequest } from "next/server";
import { sql } from "@vercel/postgres";

export const revalidate = 3600;
export const dynamic = "force-static";
export async function GET(request: NextRequest) {
  const host = request.nextUrl.host;
  const path = request.nextUrl.pathname;

  const shortlink = path.split("/")[1];

  const { rows } =
    await sql`SELECT s.shortlink, s.longlink, s.domain_id, d.domain FROM shortlinks s 
    INNER JOIN domains d
    ON (s.shortlink = ${shortlink}  
    AND d.id = s.domain_id)
    OR (s.domain_id is NULL and 
    s.shortlink = ${shortlink}) LIMIT 1`;

  console.log("Result", rows, host, path);

  if (rows.length === 0) {
    return Response.json({ error: "Invalid shortlink" });
  }

  const { longlink, domain_id, domain } = rows[0];

  if (domain_id == null || host?.includes(domain)) {
    return Response.redirect(longlink);
  }

  if (host === process.env.HOST_NAME) {
    return Response.redirect(`http://${process.env.HOST_NAME}/admin`);
  }

  return Response.redirect(`http://${process.env.HOST_NAME}/invalid-link`);
}
