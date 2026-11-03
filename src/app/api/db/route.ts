import { jsonError, withAuth } from "@/utils/api/auth";
import { normalizeUrl, validateSlug } from "@/utils/shared/links";
import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = withAuth(async () => {
  const { rows } = await sql`SELECT * FROM shortlinks ORDER BY id DESC`;
  return NextResponse.json(rows);
});

export const POST = withAuth(async (request: NextRequest) => {
  const body = await request.json().catch(() => ({}));
  const id = body.id ?? null;
  const shortlink = String(body.shortlink ?? "").trim();
  const domainId =
    body.domain_id === undefined || body.domain_id === "" ? null : body.domain_id;

  const slugError = validateSlug(shortlink);
  if (slugError) return jsonError(slugError);

  const longlink = normalizeUrl(String(body.longlink ?? ""));
  if (!longlink) return jsonError("Enter a valid destination URL");

  if (domainId !== null) {
    const { rowCount } = await sql`SELECT 1 FROM domains WHERE id::text = ${String(domainId)}`;
    if (!rowCount) return jsonError("That domain no longer exists");
  }

  const { rowCount: taken } = await sql`
    SELECT 1 FROM shortlinks
    WHERE shortlink = ${shortlink}
      AND COALESCE(domain_id::text, '') = ${domainId === null ? "" : String(domainId)}
      AND id::text <> ${id === null ? "" : String(id)}`;
  if (taken) return jsonError(`"${shortlink}" is already used on this domain`, 409);

  if (id !== null) {
    const { rowCount } =
      await sql`UPDATE shortlinks SET longlink = ${longlink}, shortlink = ${shortlink}, domain_id = ${domainId} WHERE id = ${id}`;
    if (!rowCount) return jsonError("Shortlink not found", 404);
    return NextResponse.json({ success: true, id });
  }

  const { rows } =
    await sql`INSERT INTO shortlinks (shortlink, longlink, domain_id) VALUES (${shortlink}, ${longlink}, ${domainId}) RETURNING id`;

  return NextResponse.json({ success: true, created: true, id: rows[0].id });
});

export const DELETE = withAuth(async (request: NextRequest) => {
  const id = request.nextUrl.searchParams.get("id");
  if (!id) return jsonError("Missing id");

  await sql`DELETE FROM shortlinks WHERE id = ${id}`;
  return NextResponse.json({ success: true, deleted: true });
});
