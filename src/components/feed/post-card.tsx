"use client";

import { Post } from "@/types/post";
import PostActions from "./post-actions";
import PostStats from "./post-stats";
import PostContent from "./post-content";
import PostHeader from "./post-header";

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
      <PostHeader author={post.author} createdAt={post.createdAt} />

      <PostContent content={post.content} image={post.image} />

      <PostStats
        likes={post.likes}
        comments={post.comments}
        shares={post.shares}
        isLiked={post.isLiked}
      />

      <PostActions postId={post.id} isLiked={post.isLiked} />
    </div>
  );
};

export default PostCard;
