"use client";

import { Post } from "@/types/post";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getFeedPosts } from "../api/post";

type UseFeedPostsOptions = {
  initialData?: Post[];
  page?: number;
} & Partial<UseQueryOptions<Post[]>>;

export function useFeedPosts({
  initialData,
  page = 1,
  ...queryOptions
}: UseFeedPostsOptions = {}) {
  return useQuery<Post[]>({
    queryKey: ["posts", "feed", page],
    queryFn: () => getFeedPosts(page),
    initialData,
    ...queryOptions,
  });
}
