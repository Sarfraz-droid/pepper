import { NextRequest, NextResponse } from "next/server";

export const ResponseManager = {
    json: (data: any, options?: any) => {
        return [true,() => {
            return NextResponse.json(data, options);
        }] as [
            boolean,
            () => NextResponse
        ]
    },

    redirect: (url: string, options?: any) => {
        return [true,() => {
            return NextResponse.redirect(url, options);
        }] as [
            true,
            () => NextResponse
        ]
    },

    next: () => {
        return [false] as [
            false
        ]
    }
}

export const serviceHandler = (...args:  Array<(request: NextRequest) => any>) => {
    return async (request: NextRequest) => {
        for (const handler of args) {
            const res = await handler(request);

            if(res[0]) {
                return res[1]();
            }
        }
    }
}