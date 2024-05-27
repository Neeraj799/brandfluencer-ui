import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export function chain(middlewares: any[]) {
  return async (request: NextRequest, event: NextFetchEvent, response: NextResponse) => {
    for (const middleware of middlewares) {
      const result = await middleware(request, event, response);
      if (result) {
        return result;
      }
    }
    return response;
  };
}