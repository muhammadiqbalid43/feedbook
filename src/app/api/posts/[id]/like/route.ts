import { dataStore } from "@/server/data/store";
import { NextResponse } from "next/server";

export async function POST({ params }: { params: { id: string } }) {
  const { id } = params;

  if (Math.random() < 0.1) {
    return NextResponse.json(
      { error: "Like failed: server simulation error" },
      { status: 500 }
    );
  }

  const updatedPost = dataStore.likePost(id);

  if (!updatedPost) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  return NextResponse.json(updatedPost);
}
