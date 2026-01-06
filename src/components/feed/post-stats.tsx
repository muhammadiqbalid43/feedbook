import { formatNumber } from "@/lib/utils/formatters";

interface PostStatsProps {
  likes: number;
  comments: number;
  shares: number;
  isLiked?: boolean;
}

const PostStats = ({ likes, comments, shares }: PostStatsProps) => {
  return (
    <div className="px-4 py-2 flex items-center justify-between text-sm text-gray-500 border-t border-gray-100">
      <span>{formatNumber(likes)} likes</span>
      <div className="flex gap-4">
        <span>{formatNumber(comments)} comments</span>
        <span>{formatNumber(shares)} shares</span>
      </div>
    </div>
  );
};

export default PostStats;
