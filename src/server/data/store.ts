import { Comment } from "@/types/comment";
import { Post } from "@/types/post";
import { generateMockComments, generateMockPosts } from "./seed";

function createDataStore() {
  let posts: Post[] = [];
  let comments: Comment[] = [];
  let initialized = false;

  function seedData() {
    console.log("🌱 Seeding initial data...");
    posts = generateMockPosts(500);

    posts.slice(0, 20).forEach((post) => {
      const commentCount = Math.floor(Math.random() * 10);
      const commentsList = generateMockComments(post.id, commentCount);
      comments.push(...commentsList);
    });

    console.log(
      `✅ Seeded ${posts.length} posts and ${comments.length} comments`
    );
  }

  // Initialize on creation
  if (!initialized) {
    seedData();
    initialized = true;
  }

  return {
    getPosts(page = 1, limit = 20) {
      const start = (page - 1) * limit;
      const end = start + limit;

      return {
        posts: posts.slice(start, end),
        pagination: {
          page,
          limit,
          total: posts.length,
          hasMore: end < posts.length,
        },
      };
    },

    getPostById(id: string): Post | null {
      return posts.find((p) => p.id === id) || null;
    },

    createPost(data: {
      content: string;
      image?: string;
      authorId: string;
    }): Post {
      const newPost: Post = {
        id: `post-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        author: {
          id: data.authorId,
          name: "Current User",
          avatar:
            "https://api.dicebear.com/7.x/avataaars/svg?seed=" + data.authorId,
        },
        content: data.content,
        image: data.image,
        likes: 0,
        comments: 0,
        shares: 0,
        createdAt: new Date().toISOString(),
        isLiked: false,
      };

      posts.unshift(newPost);
      return newPost;
    },

    deletePost(id: string): boolean {
      const index = posts.findIndex((p) => p.id === id);
      if (index === -1) return false;

      posts.splice(index, 1);
      comments = comments.filter((c) => c.postId !== id);
      return true;
    },

    likePost(postId: string): Post | null {
      const post = posts.find((p) => p.id === postId);
      if (!post) return null;

      if (Math.random() < 0.1) {
        throw new Error("Failed to like post");
      }

      post.likes += 1;
      post.isLiked = true;
      return post;
    },

    unlikePost(postId: string): Post | null {
      const post = posts.find((p) => p.id === postId);
      if (!post) return null;

      post.likes = Math.max(0, post.likes - 1);
      post.isLiked = false;
      return post;
    },

    getComments(postId: string): Comment[] {
      return comments
        .filter((c) => c.postId === postId)
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    },

    createComment(data: {
      postId: string;
      content: string;
      authorId: string;
    }): Comment {
      const post = posts.find((p) => p.id === data.postId);
      if (!post) throw new Error("Post not found");

      const newComment: Comment = {
        id: `comment-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        postId: data.postId,
        author: {
          id: data.authorId,
          name: "Current User",
          avatar:
            "https://api.dicebear.com/7.x/avataaars/svg?seed=" + data.authorId,
        },
        content: data.content,
        likes: 0,
        createdAt: new Date().toISOString(),
      };

      comments.unshift(newComment);
      post.comments += 1;

      return newComment;
    },

    getNewPostsCount(since: string): number {
      const sinceDate = new Date(since).getTime();
      return posts.filter((p) => new Date(p.createdAt).getTime() > sinceDate)
        .length;
    },

    reset() {
      posts = [];
      comments = [];
      initialized = false;
      seedData();
    },
  };
}

export const dataStore = createDataStore();
