import { Comment } from "@/types/comment";
import { Post } from "@/types/post";
import { faker } from "@faker-js/faker";

export function generateMockPosts(count: number): Post[] {
  const posts: Post[] = [];

  for (let i = 0; i < count; i++) {
    const hasImage = Math.random() > 0.3;

    posts.push({
      id: `post-${i + 1}`,
      author: {
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        avatar: faker.image.avatar(),
      },
      content: faker.lorem.paragraph({ min: 1, max: 5 }),
      image: hasImage
        ? faker.image.url({ width: 1200, height: 800 })
        : undefined,
      likes: faker.number.int({ min: 0, max: 1000 }),
      comments: faker.number.int({ min: 0, max: 100 }),
      shares: faker.number.int({ min: 0, max: 50 }),
      createdAt: faker.date.recent({ days: 30 }).toISOString(),
      isLiked: false,
    });
  }

  return posts.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function generateMockComments(postId: string, count: number): Comment[] {
  const comments: Comment[] = [];

  for (let i = 0; i < count; i++) {
    comments.push({
      id: `comment-${postId}-${i + 1}`,
      postId,
      author: {
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        avatar: faker.image.avatar(),
      },
      content: faker.lorem.sentence({ min: 3, max: 15 }),
      likes: faker.number.int({ min: 0, max: 50 }),
      createdAt: faker.date.recent({ days: 7 }).toISOString(),
    });
  }

  return comments.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}
