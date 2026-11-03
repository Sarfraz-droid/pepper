import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { normalizeDomain } from "@/utils/shared/links";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const host = (request.headers.get("host") ?? "").toLowerCase();
  const hostname = host.split(":")[0];
  const shortlink = decodeURIComponent(params.id);

  const { rows } = await sql`
    SELECT s.longlink, s.domain_id, d.domain FROM shortlinks s
    LEFT JOIN domains d ON d.id = s.domain_id
    WHERE s.shortlink = ${shortlink}`;

  // A link bound to the requesting domain wins; links without a domain
  // work on every domain.
  const match =
    rows.find((row) => {
      if (row.domain_id == null || !row.domain) return false;
      const domain = normalizeDomain(row.domain);
      return domain === host || domain === hostname;
    }) ?? rows.find((row) => row.domain_id == null);

  if (!match) {
    return NextResponse.redirect(new URL("/invalid-link", request.url));
  }

  try {
    return NextResponse.redirect(new URL(match.longlink));
  } catch {
    return NextResponse.redirect(new URL("/invalid-link", request.url));
  }
}
