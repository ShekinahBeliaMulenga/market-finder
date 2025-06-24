const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Example: Create a new user
  const user = await prisma.user.create({
    data: {
      email: 'test@example.com',
      password: 'password123',
      role: 'CONSUMER', // or 'TRADER'
    },
  });
  console.log(user);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
