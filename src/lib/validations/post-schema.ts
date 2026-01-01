import { z } from "zod";

export const createPostSchema = z.object({
  content: z
    .string()
    .min(1, "Content is required")
    .max(5000, "Content must be less than 5000 characters"),
  image: z
    .string()
    .regex(/^data:image\/(jpeg|jpg|png|webp);base64,/, "Invalid image format")
    .optional(),
  authorId: z.string().min(1, "Author ID is required"),
});

export const updatePostSchema = z.object({
  content: z
    .string()
    .min(1, "Content is required")
    .max(5000, "Content must be less than 5000 characters")
    .optional(),
  image: z
    .string()
    .regex(/^data:image\/(jpeg|jpg|png|webp);base64,/, "Invalid image format")
    .optional(),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;
export type UpdatePostInput = z.infer<typeof updatePostSchema>;
