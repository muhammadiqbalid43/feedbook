import z from "zod";

export const CreatePostSchema = z.object({
  content: z
    .string()
    .min(1, "Content wajib diisi")
    .max(5000, "Maksimal 5000 karakter"),
  image: z.string().url("URL gambar tidak valid").optional(),
});

export type CreatePostInput = z.infer<typeof CreatePostSchema>;
