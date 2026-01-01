export interface Comment {
  id: string;
  postId: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  likes: number;
  createdAt: string;
}

export interface CreateCommentInput {
  postId: string;
  content: string;
  authorId: string;
}

export interface CommentsResponse {
  comments: Comment[];
  total: number;
}
