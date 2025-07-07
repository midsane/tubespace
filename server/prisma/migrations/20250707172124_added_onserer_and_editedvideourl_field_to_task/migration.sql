-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "editedVideoUrl" TEXT,
ADD COLUMN     "onServer" BOOLEAN NOT NULL DEFAULT false;
