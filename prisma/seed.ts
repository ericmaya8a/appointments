import { PrismaClient, Prisma } from '../src/generated/prisma';

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'Alice',
    email: 'alice@prisma.io',
  },
  {
    name: 'Ron',
    email: 'ron@prisma.io',
  },
];

export async function main() {
  for (const u of userData) {
    await prisma.user.create({ data: u });
  }
}

main();
