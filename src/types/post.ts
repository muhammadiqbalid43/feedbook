import { User } from "./user";

export interface Post {
  id: string;
  author: User;
  content: string;
  imageUrl?: string;
  likesCount: number;
  commentsCount: number;
  createdAt: Date;
  updatedAt?: Date;
}
