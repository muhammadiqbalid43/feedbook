// GET /api/comments?postId=xxx - Get comments for a post

import { createCommentSchema } from "@/lib/validations/comment-schema";
import { dataStore } from "@/server/data/store";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const postId = searchParams.get("postId");

    if (!postId) {
      return NextResponse.json(
        {
          error: "Post ID is required",
          code: "VALIDATION_ERROR",
        },
        { status: 400 }
      );
    }

    const comments = dataStore.getComments(postId);

    return NextResponse.json(
      {
        comments,
        total: comments.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET /api/comments error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch comments",
        code: "SERVER_ERROR",
      },
      { status: 500 }
    );
  }
}

// POST /api/comments - Create new comment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validationResult = createCommentSchema.safeParse(body);

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

    const newComment = dataStore.createComment(validationResult.data);

    return NextResponse.json({ comment: newComment }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === "Post not found") {
      return NextResponse.json(
        {
          error: "Post not found",
          code: "NOT_FOUND",
        },
        { status: 404 }
      );
    }

    console.error("POST /api/comments error:", error);
    return NextResponse.json(
      {
        error: "Failed to create comment",
        code: "SERVER_ERROR",
      },
      { status: 500 }
    );
  }
}
