"use client";

import { Post } from "@/types/post";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  return (
    <article className="border border-border rounded-xl bg-card">
      {/* Header: Avatar + Nama + Timestamp */}
      <div className="flex items-start gap-3 p-4 pb-2">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="relative h-10 w-10 rounded-full overflow-hidden border border-border">
            {post.imageUrl && (
              <div className="px-4 pb-4">
                <div className="relative rounded-lg overflow-hidden border border-border aspect-[4/5] sm:aspect-[16/10] bg-muted">
                  <Image
                    src={post.imageUrl} // TypeScript tahu ini string di sini
                    alt="Gambar dalam postingan"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 800px"
                    loading="lazy"
                    quality={75}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Info author */}
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2">
            <span className="font-semibold text-base leading-none truncate">
              {post.author.name}
            </span>
            <span className="text-sm text-muted-foreground truncate">
              @{post.author.username}
            </span>
          </div>
          <time
            dateTime={post.createdAt}
            className="text-sm text-muted-foreground"
          >
            {formatDistanceToNow(new Date(post.createdAt), {
              addSuffix: true,
            })}
          </time>
        </div>
      </div>

      {/* Konten utama */}
      <div className="px-4 pb-3">
        <p className="whitespace-pre-wrap leading-relaxed text-base">
          {post.content}
        </p>
      </div>

      {/* Gambar post (opsional) */}
      {post.imageUrl && (
        <div className="px-4 pb-4">
          <div className="relative rounded-lg overflow-hidden border border-border aspect-[4/5] sm:aspect-[16/10] bg-muted">
            <Image
              src={post.imageUrl}
              alt="Gambar dalam postingan"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 800px"
              loading="lazy"
              quality={75}
            />
          </div>
        </div>
      )}

      {/* Actions bar (dummy) */}
      <div className="flex items-center justify-around px-4 py-3 border-t border-border text-muted-foreground">
        <button
          type="button"
          className="flex items-center gap-2 hover:text-foreground transition-colors"
          aria-label="Like post"
        >
          <span className="text-lg">❤️</span>
          <span>{post.likesCount}</span>
        </button>

        <button
          type="button"
          className="flex items-center gap-2 hover:text-foreground transition-colors"
          aria-label="Comment on post"
        >
          <span className="text-lg">💬</span>
          <span>{post.commentsCount}</span>
        </button>

        <button
          type="button"
          className="flex items-center gap-2 hover:text-foreground transition-colors"
          aria-label="Share post"
        >
          <span className="text-lg">🔗</span>
          <span>Share</span>
        </button>
      </div>
    </article>
  );
};

export default PostCard;
