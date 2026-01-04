"use client";

import { PostsResponse } from "@/types/post";
import ErrorPosts from "./error-posts";
import EmptyPosts from "./empty-posts";
import FeedListContent from "./feed-list-content";
import { usePostsInfiniteQuery } from "@/lib/hooks/use-posts-infinite-query";

interface FeedListProps {
  initialData?: PostsResponse;
}

const FeedList = ({ initialData }: FeedListProps) => {
  const {
    allPosts,
    isPending,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
  } = usePostsInfiniteQuery({ initialData });

  if (error) {
    return <ErrorPosts error={error} />;
  }

  if (!allPosts?.length) {
    return <EmptyPosts />;
  }
  return (
    <FeedListContent
      posts={allPosts}
      isPending={isPending}
      fetchNextPage={fetchNextPage}
      isFetchingNextPage={isFetchingNextPage}
      hasNextPage={!!hasNextPage}
    />
  );
};

export default FeedList;
