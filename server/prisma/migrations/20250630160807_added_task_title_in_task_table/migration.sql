/*
  Warnings:

  - You are about to drop the column `attachment` on the `Task` table. All the data in the column will be lost.
  - Added the required column `taskTitle` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "attachment",
ADD COLUMN     "Files" TEXT[],
ADD COLUMN     "taskTitle" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_youtuberId_fkey" FOREIGN KEY ("youtuberId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_editorId_fkey" FOREIGN KEY ("editorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
