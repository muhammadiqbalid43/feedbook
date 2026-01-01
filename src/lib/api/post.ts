import { PostPage } from "@/components/feed/feed-list";
import { QueryFunctionContext } from "@tanstack/react-query";

export type PageParam = number;

export async function getFeedPosts(page = 1) {
  const res = await fetch(`/api/posts?page=${page}&limit=15`);
  if (!res.ok) throw new Error("Gagal fetch");
  return res.json();
}

export async function fetchPosts(
  context: QueryFunctionContext<readonly unknown[], PageParam>
): Promise<PostPage> {
  const pageParam = context.pageParam ?? 1; // safe default

  const res = await fetch(`/api/posts?page=${pageParam}&limit=10`);

  if (!res.ok) {
    throw new Error(`Gagal memuat halaman ${pageParam}`);
  }

  return res.json();
}
