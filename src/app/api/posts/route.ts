import { createPostSchema } from "@/lib/validations/post-schema";
import { dataStore } from "@/server/data/store";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

// GET /api/posts - List posts with pagination
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");

    // Validation
    if (page < 1 || limit < 1 || limit > 100) {
      return NextResponse.json(
        {
          error: "Invalid parameters",
          message: "Page must be >= 1, limit must be between 1 and 100",
          code: "VALIDATION_ERROR",
        },
        { status: 400 }
      );
    }

    const result = dataStore.getPosts(page, limit);

    return NextResponse.json({
      posts: result.posts,
      pagination: {
        page,
        limit,
        total: result.pagination.total,
        hasMore: result.pagination.hasMore,
      },
    });
  } catch (error) {
    console.error("GET /api/posts error:", error);
    return NextResponse.json(
      {
        error: "Server error",
        message: "Failed to fetch posts",
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

    const validatedData = createPostSchema.parse(body);

    const newPost = dataStore.createPost(validatedData);

    return NextResponse.json({ post: newPost }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Validation error",
          message: error.issues[0]?.message || "Invalid input",
          code: "VALIDATION_ERROR",
        },
        { status: 400 }
      );
    }

    console.error("POST /api/posts error:", error);
    return NextResponse.json(
      {
        error: "Server error",
        message: "Failed to create post",
        code: "SERVER_ERROR",
      },
      { status: 500 }
    );
  }
}
