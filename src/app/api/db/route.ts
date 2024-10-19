import { verifyToken } from "@/utils/api/getToken";
import verifyRoute from "@/utils/api/middlewares/verifyRoute";
import { ResponseManager, serviceHandler } from "@/utils/api/serviceHandler";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { rows } = await sql`SELECT * FROM shortlinks ORDER BY id DESC`;

  return Response.json(rows);
}

export const POST = serviceHandler(
  verifyRoute,
  async (request: NextRequest) => {
    const { shortlink, longlink, id, domain_id } = await request.json();

    if (!shortlink || !longlink) {
      return ResponseManager.json(
        { error: "Missing shortlink or longlink" },
        {
          status: 400,
        }
      );
    }

    const command = {
      longlink: longlink,
      shortlink: shortlink,
      domain_id: domain_id,
    } as {
      [key: string]: any;
    };

    let path = Object.keys(command).map((key) => {
      if (command[key]) return `${key} = ${command[key]}`;
      return undefined;
    });

    path = path.filter((value) => value);

    if (id) {
      await sql`UPDATE shortlinks SET longlink = ${longlink}, shortlink = ${shortlink}, domain_id = ${domain_id} WHERE id = ${id}`;

      console.log("Revalidating Path", `/${shortlink}`);

      revalidatePath(`/${shortlink}`);

      return ResponseManager.json({
        success: true,
        id: id,
      });
    } else {
      const { rows } =
        await sql`INSERT INTO shortlinks (shortlink, longlink, domain_id) VALUES (${shortlink}, ${longlink}, ${domain_id}) RETURNING id`;

      console.log("Revalidating Path");
      revalidatePath(`/${shortlink}`);
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

  await sql`DELETE FROM shortlinks WHERE id = ${id}`;

  return Response.json({
    success: true,
    deleted: true,
  });
}

export const revalidate = 3;
