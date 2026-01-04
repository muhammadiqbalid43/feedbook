"use client";

import { Post, PostsResponse } from "@/types/post";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPosts } from "../api/post";

interface UsePostsOptions {
  initialData?: PostsResponse;
}

export function usePostsInfiniteQuery({ initialData }: UsePostsOptions = {}) {
  const query = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam),
    initialPageParam: 1,

    // ✅ Proper initialData handling
    ...(initialData && {
      initialData: {
        pages: [initialData],
        pageParams: [1],
      },
    }),

    getNextPageParam: (lastPage) => {
      return lastPage?.pagination?.hasMore
        ? lastPage.pagination.page + 1
        : undefined;
    },

    staleTime: 30_000,
    gcTime: 300_000,
    refetchOnWindowFocus: false,
    retry: 2,
  });

  const allPosts = (query.data?.pages ?? [])
    .flatMap((page) => page?.posts ?? [])
    .filter((post): post is Post => {
      // Filter out undefined, null, or posts without id
      return Boolean(post && post.id);
    });

  return {
    ...query,
    allPosts,
    isPending: query.isPending,
  };
}
