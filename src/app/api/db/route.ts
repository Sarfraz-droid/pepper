import { verifyToken } from "@/utils/api/getToken";
import verifyRoute from "@/utils/api/middlewares/verifyRoute";
import { ResponseManager, serviceHandler } from "@/utils/api/serviceHandler";
import { sql } from "@vercel/postgres";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { rows } = await sql`SELECT * FROM shortlinks ORDER BY id DESC`;

  return Response.json(rows);
}

export const POST = serviceHandler(
  verifyRoute,
  async (request: NextRequest) => {
    console.log("Updating shortlink");
    const { shortlink, longlink, id } = await request.json();

    if (!shortlink || !longlink) {
      return ResponseManager.json({ error: "Missing shortlink or longlink" }, {
        status: 400
      });
    }

    if (id) {
      await sql`UPDATE shortlinks SET longlink = ${longlink}, shortlink = ${shortlink} WHERE id = ${id}`;

      return ResponseManager.json({
        success: true,
        id: id,
      });
    } else {
      const { rows } =
        await sql`INSERT INTO shortlinks (shortlink, longlink) VALUES (${shortlink}, ${longlink}) RETURNING id`;

      return ResponseManager.json({
        success: true,
        created: true,
        id: rows[0].id,
      });
    }
  }
);

// export async function POST(request: NextRequest) {
//     console.log(request.cookies.getAll())
// }

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");

  if (!id) {
    return Response.json({ error: "Missing id" });
  }

  await sql`DELETE FROM shortlinks WHERE id = ${id}`;

  return Response.json({
    success: true,
    deleted: true,
  });
}

export const revalidate = 3;
