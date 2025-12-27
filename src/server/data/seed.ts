import { Post } from "@/types/post";
import { User } from "@/types/user";
import { faker } from "@faker-js/faker";

const generateUser = (): User => ({
  id: crypto.randomUUID(),
  name: faker.person.fullName(),
  username: faker.internet.username(),
  avatarUrl: faker.image.avatar(),
  bio: faker.lorem.sentence({ min: 8, max: 20 }),
  createdAt: faker.date.past({ years: 2 }),
  updatedAt: faker.date.recent({ days: 30 }),
});

const usersCache: User[] = Array.from({ length: 50 }, generateUser);

const getRandomUser = () => faker.helpers.arrayElement(usersCache);

export const posts: Post[] = Array.from({ length: 1000 }, (_, index) => {
  const createdAt = faker.date.recent({ days: 7 }); // Last week
  const hasImage = faker.datatype.boolean({ probability: 0.65 }); // ~65% has image

  return {
    id: crypto.randomUUID(),
    author: getRandomUser(),
    content: faker.lorem.paragraphs({ min: 1, max: 4 }),
    imageUrl: hasImage
      ? `https://picsum.photos/seed/post-${index + 1}/600/800`
      : undefined,
    likesCount: faker.number.int({ min: 10, max: 500 }),
    commentsCount: faker.number.int({ min: 0, max: 120 }),
    createdAt,
    updatedAt: faker.date.between({ from: createdAt, to: new Date() }),
  };
});

// export function generatePosts(count: number = 1000): Post[] {
//   return Array.from({ length: count }, (_, index) => {
//     // ... sama seperti di atass

//   });
// }
