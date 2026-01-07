import { formatRelativeTime } from "@/lib/utils/formatters";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";

interface PostHeaderProps {
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  createdAt: string;
}

const PostHeader = ({ author, createdAt }: PostHeaderProps) => {
  return (
    <div className="p-4 flex items-start justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden relative">
          <Image
            src={author.avatar}
            alt={author.name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">{author.name}</h3>
          <p className="text-sm text-gray-500">
            {formatRelativeTime(createdAt)}
          </p>
        </div>
      </div>
      <button className="text-gray-400 hover:text-gray-600">
        <span className="text-2xl">
          <MoreHorizontal className="h-5 w-5 text-gray-600" />
        </span>
      </button>
    </div>
  );
};

export default PostHeader;
