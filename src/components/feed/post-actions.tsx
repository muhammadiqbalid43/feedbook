"use client";

import { usePostLikeToggle } from "@/lib/hooks/use-post-like";

interface PostActionsProps {
  postId: string;
  isLiked?: boolean;
}

const PostActions = ({ postId, isLiked }: PostActionsProps) => {
  const { toggleLike, isLoading } = usePostLikeToggle();

  const handleClick = () => {
    toggleLike(postId, isLiked);
  };
  return (
    <div className="px-4 py-2 border-t border-gray-100 flex gap-2">
      <button
        onClick={handleClick}
        disabled={isLoading}
        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg transition-colors ${
          isLiked
            ? "text-blue-600 hover:bg-blue-50"
            : "text-gray-600 hover:bg-gray-50"
        } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <span className="text-xl">👍</span>
        <span className="font-medium">
          {isLoading ? "..." : isLiked ? "Liked" : "Like"}
        </span>
      </button>

      <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
        <span className="text-xl">💬</span>
        <span className="font-medium">Comment</span>
      </button>

      <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
        <span className="text-xl">🔗</span>
        <span className="font-medium">Share</span>
      </button>
    </div>
  );
};

export default PostActions;
