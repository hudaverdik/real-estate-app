import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

export const createUser = async (data: Omit<User, 'id'>): Promise<User> => {
  return prisma.user.create({
    data,
  });
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  return prisma.user.findUnique({
    where: { email },
  });
};
