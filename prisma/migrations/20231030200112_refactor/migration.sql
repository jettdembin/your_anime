/*
  Warnings:

  - Made the column `animeId` on table `Like` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Like" ALTER COLUMN "animeId" SET NOT NULL;
