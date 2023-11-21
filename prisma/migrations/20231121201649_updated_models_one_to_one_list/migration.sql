/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `List` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[listId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "listId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "List_userId_key" ON "List"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_listId_key" ON "User"("listId");
