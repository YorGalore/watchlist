import { User } from '@/generated/prisma/client';

export const UserFactory = {
  build: (overrides?: Partial<User>): User => {
    return {
      id: "u-" + Math.random().toString(36).substr(2, 9),
      email: "test@domain.com",
      password_hash: "$2b$10$dummyhashedpassword123456789",
      name: "Test User",
      createdAt: new Date(),
      updatedAt: new Date(),
      ...overrides,
    };
  },
  
  buildMany: (count: number, baseOverrides?: Partial<User>): User[] => {
    return Array.from({ length: count }, (_, index) => {
      return UserFactory.build({
        email: `test${index}@domain.com`,
        ...baseOverrides,
      });
    });
  }
};
