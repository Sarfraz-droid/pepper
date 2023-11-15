import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "../getToken";
import { ResponseManager } from "../serviceHandler";

function verifyRoute(request: NextRequest) {
    const token = request.headers.get("Authorization")?.split(" ")[1];

    if(!token || !verifyToken(token)) {
        return ResponseManager.json({
            error: "Unauthorized"
        }, {
            status: 401
        })
    }

    return ResponseManager.next();
}

export default verifyRoute
