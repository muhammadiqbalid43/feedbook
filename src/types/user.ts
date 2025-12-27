export interface User {
  id: string;
  name: string;
  username?: string;
  avatarUrl?: string;
  bio?: string;
  createdAt: Date;
  updatedAt?: Date;
}
