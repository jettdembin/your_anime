-- CreateTable
CREATE TABLE "DroppedList" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "rating" DOUBLE PRECISION DEFAULT 0,
    "animeId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "listId" TEXT,

    CONSTRAINT "DroppedList_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DroppedList" ADD CONSTRAINT "DroppedList_listId_fkey" FOREIGN KEY ("listId") REFERENCES "List"("id") ON DELETE SET NULL ON UPDATE CASCADE;
