/*
  Warnings:

  - You are about to drop the `UserSpace` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserSpace" DROP CONSTRAINT "UserSpace_userId_fkey";

-- DropTable
DROP TABLE "UserSpace";

-- CreateTable
CREATE TABLE "Userspace" (
    "id" SERIAL NOT NULL,
    "spacename" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "questions" TEXT[],
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Userspace_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Userspace" ADD CONSTRAINT "Userspace_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
