import FeedList from "@/components/feed/feed-list";
import { getInitialPosts } from "@/lib/api/post";

export default async function Home() {
  const initialData = await getInitialPosts();
  return (
    <div className="container mx-auto max-w-2xl py-6 px-4 md:px-0">
      {" "}
      <FeedList initialData={initialData} />
    </div>
  );
}
