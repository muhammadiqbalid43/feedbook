import { Post, PostsResponse } from "@/types/post";

const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    // Client-side: use relative URL
    return "";
  }
  // Server-side: use full URL
  return process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
};

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

export async function likePost(postId: string): Promise<Post> {
  const response = await fetch(`/api/posts/${postId}/like`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to like post");
  }

  return response.json();
}

export async function unlikePost(postId: string): Promise<Post> {
  const response = await fetch(`/api/posts/${postId}/like`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to unlike post");
  }

  return response.json();
}

export async function getPost(postId: string): Promise<Post> {
  const baseUrl = getBaseUrl();
  const response = await fetch(`${baseUrl}/api/posts/${postId}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Post not found");
  }

  return response.json();
}

export async function createPost(data: {
  content: string;
  image?: string;
}): Promise<Post> {
  const response = await fetch("/api/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create post");
  }

  return response.json();
}

export async function getNewPostsCount(
  since: string
): Promise<{ count: number }> {
  const response = await fetch(`/api/posts/new-count?since=${since}`);

  if (!response.ok) {
    throw new Error("Failed to fetch new posts count");
  }

  return response.json();
}
