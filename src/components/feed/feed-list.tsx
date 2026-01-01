"use client";

import { Post } from "@/types/post";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import PostCard from "./post-card";
import { useInView } from "react-intersection-observer";
import { fetchPosts, PageParam } from "@/lib/api/post";
import { useEffect } from "react";

export type PostPage = {
  posts: Post[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
  };
};

interface FeedListProps {
  initialPosts: Post[];
  initialHasMore: boolean;
}

const FeedList = ({ initialPosts, initialHasMore }: FeedListProps) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin: "200px", // mulai load 200px sebelum trigger terlihat
  });
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    isError,
    error,
  } = useInfiniteQuery<
    PostPage,
    Error,
    InfiniteData<PostPage>,
    readonly ["feed", "posts"],
    PageParam
  >({
    queryKey: ["feed", "posts"],
    queryFn: fetchPosts,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.pagination.hasMore
        ? lastPage.pagination.page + 1
        : undefined;
    },
    initialData: {
      pages: [
        {
          posts: initialPosts,
          pagination: {
            page: 1,
            limit: 10,
            total: initialPosts.length,
            hasMore: initialHasMore,
          },
        },
      ],
      pageParams: [1],
    },
  });

  useEffect(() => {
    console.log("Intersection Observer:", {
      inView,
      hasNextPage,
      isFetchingNextPage,
    });

    if (inView && hasNextPage && !isFetchingNextPage) {
      console.log("🚀 Fetching next page...");
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const allPosts = data?.pages.flatMap((page) => page.posts) ?? initialPosts;

  console.log("Server side → initialHasMore:", initialHasMore);

  if (isError) {
    return (
      <div className="py-12 text-center text-destructive">
        <p>Gagal memuat feed</p>
        <p className="text-sm mt-2">{(error as Error)?.message}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-destructive text-destructive-foreground rounded-md"
        >
          Muat ulang
        </button>
      </div>
    );
  }

  const isInitialLoading =
    isFetching && !isFetchingNextPage && allPosts.length === 0;

  console.log("FeedList render - current state:", {
    allPostsLength: allPosts.length,
    pagesLoaded: data?.pages.length ?? 1,
    hasNextPage, // ← CEK INI
    isFetchingNextPage,
    lastHasMore: data?.pages.at(-1)?.pagination?.hasMore, // ← DAN INI
  });
  return (
    <div className="space-y-6">
      {isInitialLoading ? (
        <div className="py-12 text-center">Memuat feed...</div>
      ) : (
        <>
          {allPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}

          <div
            ref={ref}
            className="py-10 flex items-center justify-center min-h-[80px]"
          >
            {isFetchingNextPage ? (
              <p className="text-muted-foreground animate-pulse">
                Memuat lebih banyak...
              </p>
            ) : hasNextPage ? (
              <p className="text-muted-foreground">
                Scroll untuk memuat lebih banyak
              </p>
            ) : (
              <p className="text-muted-foreground">Sudah sampai akhir</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default FeedList;
