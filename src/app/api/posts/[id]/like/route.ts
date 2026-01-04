import { dataStore } from "@/server/data/store";
import { NextResponse } from "next/server";

export async function POST({ params }: { params: { id: string } }) {
  try {
    const postId = params.id;

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

    const post = dataStore.likePost(postId);

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

export async function DELETE({ params }: { params: { id: string } }) {
  try {
    const postId = params.id;

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

    const post = dataStore.unlikePost(postId);

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
