"use client";

import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { likePost, unlikePost } from "../api/post";
import { Post, PostsResponse } from "@/types/post";
import { toast } from "sonner";

type PostsInfiniteData = InfiniteData<PostsResponse>;

export function usePostLikeToggle() {
  const queryClient = useQueryClient();

  const likeMutation = useMutation({
    mutationFn: (postId: string) => likePost(postId),

    // 🚀 onMutate: Update UI IMMEDIATELY (before API call)
    onMutate: async (postId) => {
      console.log("🔵 onMutate: Starting optimistic like", postId);

      // Step 1: Cancel outgoing refetches (prevent race conditions)
      await queryClient.cancelQueries({ queryKey: ["posts"] });

      // Step 2: Snapshot current data (for rollback if error)
      const previousData = queryClient.getQueryData<PostsInfiniteData>([
        "posts",
      ]);
      console.log("📸 Snapshot saved");

      // Step 3: OPTIMISTIC UPDATE - Modify cache immediately
      queryClient.setQueryData<PostsInfiniteData>(["posts"], (old) => {
        if (!old) return old;

        // Immutable update pattern (deep clone)
        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            posts: page.posts.map((p: Post) =>
              p.id === postId
                ? {
                    ...p,
                    likes: p.likes + 1, // Increment immediately
                    isLiked: true, // Mark as liked
                  }
                : p
            ),
          })),
        };
      });

      console.log("✨ Optimistic update applied (UI updated instantly)");

      // Step 4: Return context with snapshot for error handler
      return { previousData };
    },

    // ✅ onSuccess: API confirmed the like
    onSuccess: () => {
      console.log("✅ onSuccess: API confirmed like");

      // Invalidate to refetch and confirm server state
      queryClient.invalidateQueries({ queryKey: ["posts"] });

      // Optional: Show success toast
      // toast.success('Post liked!')
    },

    // ❌ onError: API failed, ROLLBACK optimistic update
    onError: (error, postId, context) => {
      console.error("❌ onError: API failed, rolling back", error.message);

      // ROLLBACK: Restore previous data from snapshot
      if (context?.previousData) {
        queryClient.setQueryData(["posts"], context.previousData);
        console.log("🔄 Rollback completed");
      }

      // Show error toast to user
      toast.error("Failed to like post", {
        description: "Please try again",
      });
    },

    // 🏁 onSettled: Always runs (success or error)
    onSettled: () => {
      console.log("🏁 onSettled: Mutation completed");

      // Optional: Force refetch to ensure cache consistency
      // queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  });

  const unlikeMutation = useMutation({
    mutationFn: (postId: string) => unlikePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error: Error) => {
      console.error("Failed to unlike post:", error.message);
    },
  });

  const toggleLike = (postId: string, currentIsLiked?: boolean) => {
    if (currentIsLiked) {
      unlikeMutation.mutate(postId);
    } else {
      likeMutation.mutate(postId);
    }
  };

  const isLoading = likeMutation.isPending || unlikeMutation.isPending;

  return {
    toggleLike,
    isLoading,
    isLiking: likeMutation.isPending,
    isUnliking: unlikeMutation.isPending,
  };
}
