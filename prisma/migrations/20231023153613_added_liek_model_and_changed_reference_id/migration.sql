/*
  Warnings:

  - You are about to drop the column `userId` on the `Comment` table. All the data in the column will be lost.
  - Added the required column `commentId` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_userId_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "userId",
ADD COLUMN     "commentId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Like" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "likeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_likeId_fkey" FOREIGN KEY ("likeId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
