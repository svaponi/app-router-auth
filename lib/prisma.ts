import { PrismaClient } from '@prisma/client';

function createClient() {
  // const connectionString = `${process.env.DATABASE_URL}`;
  // const pool = new Pool({ connectionString });
  // const adapter = new PrismaPg(pool);
  // return new PrismaClient({ adapter });
  return new PrismaClient();
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = createClient();
} else {
  // @ts-ignore
  prisma = global.prisma || (global.prisma = createClient());
}

export default prisma;
