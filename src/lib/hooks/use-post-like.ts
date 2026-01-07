"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likePost, unlikePost } from "../api/post";

export function usePostLikeToggle() {
  const queryClient = useQueryClient();

  const likeMutation = useMutation({
    mutationFn: (postId: string) => likePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error: Error) => {
      console.error("Failed to like post:", error.message);
      // TODO: Show toast notification
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
