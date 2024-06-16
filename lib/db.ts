import {Prisma, User} from '@prisma/client';
import prisma from '@/lib/prisma'; // see https://www.prisma.io/docs/orm/prisma-client/type-safety

// see https://www.prisma.io/docs/orm/prisma-client/type-safety
type UserCreateBody = Prisma.Args<typeof prisma.user, 'create'>['data'];

export const insertUser = async (user: UserCreateBody) => {
  return prisma.user.create({ data: user });
};

export const findUserByEmail = async (email: string): Promise<User> => {
  return await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
};
