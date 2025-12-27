import { Post } from "@/types/post";
import { posts as initialPosts } from "./seed";

let posts: Post[] = [...initialPosts];

export const dataStore = {
  getPosts(page: number = 1, limit: number = 20) {
    const start = (page - 1) * limit;
    const sorted = posts
      .slice()
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    const paginated = sorted.slice(start, start + limit);

    console.log(
      `[DataStore getPosts] page=${page}, limit=${limit}, returned=${paginated.length}, total=${posts.length}`
    );

    return {
      posts: paginated,
      total: posts.length,
      hasMore: start + limit < posts.length,
    };
  },

  getPostById(id: string) {
    return posts.find((p) => p.id === id);
  },

  createPost(
    data: Omit<
      Post,
      "id" | "likesCount" | "commentsCount" | "createdAt" | "updatedAt"
    >
  ) {
    const now = new Date();
    const newPost: Post = {
      id: crypto.randomUUID(),
      likesCount: 0,
      commentsCount: 0,
      createdAt: now,
      updatedAt: now,
      ...data,
    };

    posts.unshift(newPost);
    return newPost;
  },

  likePost(id: string) {
    const post = posts.find((p) => p.id === id);
    if (!post) return null;

    post.likesCount += 1;
    post.updatedAt = new Date();
    return post;
  },

  reset() {
    posts = [...initialPosts];
  },
};
