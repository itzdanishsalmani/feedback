/*
  Warnings:

  - Added the required column `profileImage` to the `Userspace` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Userspace" ADD COLUMN     "profileImage" TEXT NOT NULL;
