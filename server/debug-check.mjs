import prisma from './prisma/client.js';

async function main() {
  const users = await prisma.user.findMany({ take: 20 });
  const transactions = await prisma.transaction.findMany({ take: 20, orderBy: { id: 'asc' } });
  console.log('USERS:', JSON.stringify(users, null, 2));
  console.log('TRANSACTIONS:', JSON.stringify(transactions, null, 2));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
