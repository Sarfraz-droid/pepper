import { jsonError, withAuth } from "@/utils/api/auth";
import { normalizeDomain, validateDomain } from "@/utils/shared/links";
import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = withAuth(async () => {
  const { rows } = await sql`SELECT * FROM domains ORDER BY id DESC`;
  return NextResponse.json(rows);
});

export const POST = withAuth(async (request: NextRequest) => {
  const body = await request.json().catch(() => ({}));
  const id = body.id ?? null;
  const domain = normalizeDomain(String(body.domain ?? ""));

  const domainError = validateDomain(domain);
  if (domainError) return jsonError(domainError);

  const { rowCount: taken } = await sql`
    SELECT 1 FROM domains
    WHERE LOWER(domain) = ${domain} AND id::text <> ${id === null ? "" : String(id)}`;
  if (taken) return jsonError(`${domain} has already been added`, 409);

  if (id !== null) {
    const { rowCount } = await sql`UPDATE domains SET domain = ${domain} WHERE id = ${id}`;
    if (!rowCount) return jsonError("Domain not found", 404);
    return NextResponse.json({ success: true, id });
  }

  const { rows } =
    await sql`INSERT INTO domains (domain) VALUES (${domain}) RETURNING id`;

  return NextResponse.json({ success: true, created: true, id: rows[0].id });
});

export const DELETE = withAuth(async (request: NextRequest) => {
  const id = request.nextUrl.searchParams.get("id");
  if (!id) return jsonError("Missing id");

  // Links on a removed domain fall back to the default domain instead of
  // pointing at a domain that no longer exists.
  await sql`UPDATE shortlinks SET domain_id = NULL WHERE domain_id = ${id}`;
  await sql`DELETE FROM domains WHERE id = ${id}`;

  return NextResponse.json({ success: true, deleted: true });
});
