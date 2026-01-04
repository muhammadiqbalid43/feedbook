import { PostsResponse } from "@/types/post";

export async function getInitialPosts(): Promise<PostsResponse> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/posts?page=1&limit=20`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch initial posts:", error);
    return {
      posts: [],
      pagination: {
        page: 1,
        limit: 20,
        total: 0,
        hasMore: false,
      },
    };
  }
}

export async function fetchPosts(page: number = 1): Promise<PostsResponse> {
  const response = await fetch(`/api/posts?page=${page}&limit=20`);

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  const data = await response.json();
  return data;
}
