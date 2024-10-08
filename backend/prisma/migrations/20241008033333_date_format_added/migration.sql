/*
  Warnings:

  - Changed the type of `date` on the `Review` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Review" DROP COLUMN "date",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;
