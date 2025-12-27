import { CreatePostSchema } from "@/lib/schema";
import { dataStore } from "@/server/data/store";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 20;

  if (page < 1 || limit < 1 || limit > 100) {
    // limit max 100 untuk performa
    return NextResponse.json(
      { error: "Invalid page or limit" },
      { status: 400 }
    );
  }

  const { posts, total, hasMore } = dataStore.getPosts(page, limit);

  return NextResponse.json({
    posts,
    pagination: { page, limit, total, hasMore },
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = CreatePostSchema.parse(body);

    const mockAuthor = {
      id: "mock-user-id",
      name: "Test User",
      avatarUrl: "https://picsum.photos/seed/user/40",
      createdAt: new Date(),
    };

    const newPost = dataStore.createPost({
      author: mockAuthor,
      content: validated.content,
      imageUrl: validated.image,
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
