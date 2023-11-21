-- DropForeignKey
ALTER TABLE "ToWatchList" DROP CONSTRAINT "ToWatchList_userId_fkey";

-- DropForeignKey
ALTER TABLE "WatchedList" DROP CONSTRAINT "WatchedList_userId_fkey";

-- DropForeignKey
ALTER TABLE "WatchingList" DROP CONSTRAINT "WatchingList_userId_fkey";

-- AlterTable
ALTER TABLE "ToWatchList" ALTER COLUMN "rating" DROP NOT NULL;

-- AlterTable
ALTER TABLE "WatchedList" ALTER COLUMN "rating" DROP NOT NULL;

-- AlterTable
ALTER TABLE "WatchingList" ALTER COLUMN "rating" DROP NOT NULL;
