/*
  Warnings:

  - You are about to drop the column `Description` on the `UserSpace` table. All the data in the column will be lost.
  - You are about to drop the column `Header` on the `UserSpace` table. All the data in the column will be lost.
  - You are about to drop the column `Questions` on the `UserSpace` table. All the data in the column will be lost.
  - You are about to drop the column `spaceName` on the `UserSpace` table. All the data in the column will be lost.
  - Added the required column `description` to the `UserSpace` table without a default value. This is not possible if the table is not empty.
  - Added the required column `questions` to the `UserSpace` table without a default value. This is not possible if the table is not empty.
  - Added the required column `spacename` to the `UserSpace` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `UserSpace` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserSpace" DROP COLUMN "Description",
DROP COLUMN "Header",
DROP COLUMN "Questions",
DROP COLUMN "spaceName",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "questions" TEXT NOT NULL,
ADD COLUMN     "spacename" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
