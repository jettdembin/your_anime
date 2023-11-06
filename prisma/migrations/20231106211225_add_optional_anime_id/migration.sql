/*
  Warnings:

  - You are about to drop the column `likeId` on the `Like` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[animeId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_likeId_fkey";

-- AlterTable
ALTER TABLE "Like" DROP COLUMN "likeId",
ADD COLUMN     "userId" TEXT,
ALTER COLUMN "animeId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Like_animeId_key" ON "Like"("animeId");

-- CreateIndex
CREATE UNIQUE INDEX "Like_userId_key" ON "Like"("userId");

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
