import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function seedUsers() {
  try {
    await prisma.user.upsert({
      where: {
        id: 1,
      },
      create: {
        id: 1,
        email: 'testuser@example.com',
        username: 'Test User 1',
        password:'password'
      },
      update: {},
    });

    await prisma.user.upsert({
      where: {
        id: 2,
      },
      create: {
        id: 2,
        email: 'testuser2@example.com',
        username: 'Test User 2',
        password: 'password',
      },
      update: {},
    });
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function seedDatabase() {
  try {
    
    await seedUsers();

  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

seedDatabase().catch((error) => {
  console.error('An unexpected error occurred during seeding:', error);
  process.exit(1);
});