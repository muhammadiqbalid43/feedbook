"use client";

import { formatNumber, formatRelativeTime } from "@/lib/utils/formatters";
import { Post } from "@/types/post";
import { MessageCircle, MoreHorizontal, Share2, ThumbsUp } from "lucide-react";
import Image from "next/image";

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  return (
    <article className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
      {/* ========== POST HEADER ========== */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          {/* Left: Avatar + Author Info */}
          <div className="flex items-center space-x-3">
            {/* Avatar */}
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
              {post.author.name.charAt(0).toUpperCase()}
            </div>

            {/* Author Name + Timestamp */}
            <div className="min-w-0">
              <h3 className="font-semibold text-gray-900 hover:underline cursor-pointer truncate">
                {post.author.name}
              </h3>
              <p className="text-xs text-gray-500">
                {formatRelativeTime(post.createdAt)}
              </p>
            </div>
          </div>

          {/* Right: More Options Button */}
          <button
            className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
            aria-label="More options"
          >
            <MoreHorizontal className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* ========== POST CONTENT ========== */}
        <div className="mb-3">
          <p className="text-gray-900 whitespace-pre-wrap break-words text-[15px] leading-relaxed">
            {post.content}
          </p>
        </div>
      </div>

      {/* ========== POST IMAGE ========== */}
      {post.image && (
        <div className="relative w-full bg-gray-100">
          <Image
            src={post.image}
            alt="Post image"
            width={600}
            height={400}
            className="w-full h-auto object-cover"
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
          />
        </div>
      )}

      {/* ========== ENGAGEMENT STATS ========== */}
      <div className="px-4 py-2 flex items-center justify-between text-sm text-gray-600 border-t border-gray-100">
        {/* Likes Count */}
        <div className="flex items-center space-x-1">
          <div className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-500">
            <ThumbsUp className="h-3 w-3 text-white fill-white" />
          </div>
          <span className="hover:underline cursor-pointer">
            {formatNumber(post.likes)}
          </span>
        </div>

        {/* Comments + Shares Count */}
        <div className="flex items-center space-x-4">
          <span className="hover:underline cursor-pointer">
            {formatNumber(post.comments)}{" "}
            {post.comments === 1 ? "comment" : "comments"}
          </span>
          <span className="hover:underline cursor-pointer">
            {formatNumber(post.shares)} {post.shares === 1 ? "share" : "shares"}
          </span>
        </div>
      </div>

      {/* ========== ACTION BUTTONS ========== */}
      <div className="px-2 py-1 border-t border-gray-200 flex items-center">
        <button
          className="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg hover:bg-gray-100 transition-colors flex-1 group"
          aria-label="Like post"
        >
          <ThumbsUp className="h-5 w-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
          <span className="text-gray-700 font-medium group-hover:text-blue-600 transition-colors">
            Like
          </span>
        </button>

        <button
          className="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg hover:bg-gray-100 transition-colors flex-1 group"
          aria-label="Comment on post"
        >
          <MessageCircle className="h-5 w-5 text-gray-600 group-hover:text-green-600 transition-colors" />
          <span className="text-gray-700 font-medium group-hover:text-green-600 transition-colors">
            Comment
          </span>
        </button>

        <button
          className="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg hover:bg-gray-100 transition-colors flex-1 group"
          aria-label="Share post"
        >
          <Share2 className="h-5 w-5 text-gray-600 group-hover:text-orange-600 transition-colors" />
          <span className="text-gray-700 font-medium group-hover:text-orange-600 transition-colors">
            Share
          </span>
        </button>
      </div>
    </article>
  );
};

export default PostCard;
