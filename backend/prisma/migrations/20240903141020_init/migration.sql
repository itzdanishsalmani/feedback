/*
  Warnings:

  - You are about to drop the column `email` on the `UserSpace` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `UserSpace` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserSpace" DROP COLUMN "email",
DROP COLUMN "name";
