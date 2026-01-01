import { z } from "zod";

export const createCommentSchema = z.object({
  postId: z.string().min(1, "Post ID is required"),
  content: z
    .string()
    .min(1, "Comment content is required")
    .max(1000, "Comment must be less than 1000 characters"),
  authorId: z.string().min(1, "Author ID is required"),
});

export type CreateCommentInput = z.infer<typeof createCommentSchema>;
