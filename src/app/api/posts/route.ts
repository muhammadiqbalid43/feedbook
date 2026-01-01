import { createPostSchema } from "@/lib/validations/post-schema";
import { dataStore } from "@/server/data/store";
import { NextRequest, NextResponse } from "next/server";

// GET /api/posts - List posts with pagination
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");

    if (page < 1 || limit < 1 || limit > 100) {
      return NextResponse.json(
        {
          error: "Invalid pagination parameters",
          code: "VALIDATION_ERROR",
        },
        { status: 400 }
      );
    }

    const result = dataStore.getPosts(page, limit);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("GET /api/posts error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch posts",
        code: "SERVER_ERROR",
      },
      { status: 500 }
    );
  }
}

// POST /api/posts - Create new post
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validationResult = createPostSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          message: validationResult.error.issues[0].message,
          code: "VALIDATION_ERROR",
        },
        { status: 400 }
      );
    }

    const newPost = dataStore.createPost(validationResult.data);

    return NextResponse.json({ post: newPost }, { status: 201 });
  } catch (error) {
    console.error("POST /api/posts error:", error);
    return NextResponse.json(
      {
        error: "Failed to create post",
        code: "SERVER_ERROR",
      },
      { status: 500 }
    );
  }
}
