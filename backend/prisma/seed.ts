import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt'

const prisma = new PrismaClient();

async function main() {
  await prisma.review.deleteMany();
  await prisma.userspace.deleteMany();
  await prisma.user.deleteMany();

  // Create Users
  const user1 = await prisma.user.create({
    data: {
      username: 'john_doe',
      email: 'john@example.com',
      password: '123456', 
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: 'jane_smith',
      email: 'jane@example.com',
      password: '123456',
    },
  });

  // Create Userspaces
  const userspace1 = await prisma.userspace.create({
    data: {
      spacename: 'John',
      title: 'John\'s Awesome Space',
      description: 'A description of John\'s space.',
      questions: ['What is your favorite color?', 'How did you hear about us?'],
      userId: user1.id,
    },
  });

  const userspace2 = await prisma.userspace.create({
    data: {
      spacename: 'Jane',
      title: 'Jane\'s Creative Space',
      description: 'A description of Jane\'s space.',
      questions: ['What motivates you?', 'What projects are you working on?'],
      userId: user2.id,
    },
  });

  // Create Reviews
  await prisma.review.createMany({
    data: [
      {
        review: 'Great space!',
        name: 'Alice',
        email: 'alice@example.com',
        stars: 5,
        userId: user1.id,
      },
      {
        review: 'Very useful and well-maintained.',
        name: 'Bob',
        email: 'bob@example.com',
        stars: 4,
        userId: user2.id,
      },
    ],
  });

  console.log('Database has been seeded. 🌱');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
