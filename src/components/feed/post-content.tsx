import Image from "next/image";

interface PostContentProps {
  content: string;
  image?: string;
}

const PostContent = ({ content, image }: PostContentProps) => {
  return (
    <>
      <div className="px-4 pb-3">
        <p className="text-gray-900 whitespace-pre-wrap break-words">
          {content}
        </p>
      </div>

      {image && (
        <div className="relative w-full aspect-video bg-gray-100">
          <Image
            src={image}
            alt="Post image"
            width={600}
            height={400}
            className="w-full h-auto object-cover"
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
          />
          {/* pakai <img> biasa atau next/image tergantung kebutuhan optimasi */}
        </div>
      )}
    </>
  );
};

export default PostContent;
