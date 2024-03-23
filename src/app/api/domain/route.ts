import verifyRoute from "@/utils/api/middlewares/verifyRoute";
import { ResponseManager, serviceHandler } from "@/utils/api/serviceHandler";
import { sql } from "@vercel/postgres";
import { NextRequest } from "next/server";

export async function GET() {
  const { rows } = await sql`SELECT * FROM domains ORDER BY id DESC`;

  return Response.json(rows);
}

export const POST = serviceHandler(
  verifyRoute,
  async (request: NextRequest) => {
    const { domain, id } = await request.json();

    if (!domain) {
      return ResponseManager.json(
        { error: "Missing domain" },
        {
          status: 400,
        }
      );
    }

    if (id) {
      await sql`UPDATE domains SET domain = ${domain} WHERE id = ${id}`;

      return ResponseManager.json({
        success: true,
        id: id,
      });
    } else {
      const { rows } =
        await sql`INSERT INTO domains (domain) VALUES (${domain}) RETURNING id`;

      return ResponseManager.json({
        success: true,
        created: true,
        id: rows[0].id,
      });
    }
  }
);

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");

  if (!id) {
    return Response.json({ error: "Missing id" });
  }

  await sql`DELETE FROM domains WHERE id = ${id}`;

  return Response.json({
    success: true,
    deleted: true,
  });
}
