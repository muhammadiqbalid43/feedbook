import { Post } from "@/types/post";
import PostCard from "./post-card";
import EmptyPosts from "./empty-posts";
import InfiniteScrollTrigger from "./infinite-scroll-trigger";

interface FeedListContentProps {
  posts: Post[];
  isPending: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  hasNextPage: boolean;
}

const FeedListContent = ({
  posts,
  isPending,
  isFetchingNextPage,
  fetchNextPage,
  hasNextPage = false,
}: FeedListContentProps) => {
  if (isPending) {
    return (
      <div className="space-y-6 py-8">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-52 w-full bg-muted/60 animate-pulse rounded-xl"
            aria-hidden="true"
          />
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return <EmptyPosts />;
  }
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      {/* Infinite Scroll Trigger */}
      {hasNextPage && (
        <InfiniteScrollTrigger
          onIntersect={fetchNextPage}
          isFetching={isFetchingNextPage}
        />
      )}

      {isFetchingNextPage && (
        <div className="flex items-center justify-center py-10">
          <div className="flex items-center gap-3 text-muted-foreground">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
            <span className="text-sm">Loading the next post...</span>
          </div>
        </div>
      )}

      {/* End of feed */}
      {!hasNextPage && posts.length > 0 && !isFetchingNextPage && (
        <div className="py-10 text-center text-sm text-muted-foreground">
          You have seen all posts
        </div>
      )}
    </div>
  );
};

export default FeedListContent;
