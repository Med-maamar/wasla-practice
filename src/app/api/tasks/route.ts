/**
 * Tasks BFF route.
 *
 * The route accepts POST requests with an action-based payload and dispatches
 * them to the appropriate mock handler.
 */
import { NextResponse } from "next/server";

import {
  createHandler,
  deleteHandler,
  getHandler,
  listHandler,
  updateHandler,
} from "@/app/api/tasks/handlers";
import { BffRequestSchema } from "@/lib/api/bff/BffRequest";

export const runtime = "nodejs";

/**
 * Dispatches task actions received through the mock BFF endpoint.
 *
 * @param request - Incoming POST request.
 * @returns The handler response serialized as JSON.
 */
export async function POST(request: Request) {
  const body = await request.json();
  const parsedRequest = BffRequestSchema.safeParse(body);

  if (!parsedRequest.success) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INVALID_REQUEST",
          message: "Request body is invalid.",
          details: parsedRequest.error.flatten(),
        },
      },
      { status: 400 },
    );
  }

  switch (parsedRequest.data.action) {
    case "list":
      return NextResponse.json(await listHandler(parsedRequest.data.params));
    case "get":
      return NextResponse.json(await getHandler(parsedRequest.data.params));
    case "create":
      return NextResponse.json(await createHandler(parsedRequest.data.data));
    case "update":
      return NextResponse.json(await updateHandler(parsedRequest.data.data));
    case "delete":
      return NextResponse.json(await deleteHandler(parsedRequest.data.params));
    default:
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "UNSUPPORTED_ACTION",
            message: "Unsupported task action.",
          },
        },
        { status: 400 },
      );
  }
}
