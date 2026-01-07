import { dataStore } from "@/server/data/store";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params; // await di sini
    const { id } = params;

    // Simulate 10% failure rate untuk demo error handling
    if (Math.random() < 0.1) {
      return NextResponse.json(
        { error: "Failed to like post", message: "Something went wrong" },
        { status: 500 }
      );
    }

    await new Promise((resolve) =>
      setTimeout(resolve, Math.random() * 300 + 200)
    );

    const post = dataStore.likePost(id);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ post });
  } catch (error) {
    console.error("Like post error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    // Simulate failure rate
    if (Math.random() < 0.1) {
      return NextResponse.json(
        { error: "Failed to unlike post" },
        { status: 500 }
      );
    }

    await new Promise((resolve) =>
      setTimeout(resolve, Math.random() * 300 + 200)
    );

    const post = dataStore.unlikePost(id);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ post });
  } catch (error) {
    console.error("Unlike post error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
