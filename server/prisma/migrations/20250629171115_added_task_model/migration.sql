-- CreateEnum
CREATE TYPE "Rating_val" AS ENUM ('unrated', 'one', 'two', 'three', 'four', 'five');

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "youtuberId" INTEGER NOT NULL,
    "editorId" INTEGER NOT NULL,
    "deadline" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "attachment" TEXT[],
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "rating" "Rating_val" NOT NULL DEFAULT 'unrated',
    "review" TEXT,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);
