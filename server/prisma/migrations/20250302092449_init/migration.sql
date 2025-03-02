/*
  Warnings:

  - The primary key for the `Youtuber` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Youtuber` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Youtuber` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Youtuber` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Youtuber` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Youtuber` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `Youtuber` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Youtuber` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Youtuber` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "USER_ROLE" AS ENUM ('collaborator', 'youtuber');

-- CreateEnum
CREATE TYPE "ACCOUNTTYPE" AS ENUM ('private', 'public');

-- CreateEnum
CREATE TYPE "TASKSTATUS" AS ENUM ('pending', 'completed');

-- CreateEnum
CREATE TYPE "taskType" AS ENUM ('video', 'thumbnail', 'title', 'description');

-- CreateEnum
CREATE TYPE "starsValue" AS ENUM ('unrated', 'one', 'two', 'three', 'four', 'five');

-- DropIndex
DROP INDEX "Youtuber_email_key";

-- DropIndex
DROP INDEX "Youtuber_username_key";

-- AlterTable
ALTER TABLE "Youtuber" DROP CONSTRAINT "Youtuber_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "email",
DROP COLUMN "id",
DROP COLUMN "name",
DROP COLUMN "password",
DROP COLUMN "username",
ADD COLUMN     "accountType" "ACCOUNTTYPE" NOT NULL DEFAULT 'public',
ADD COLUMN     "assignedTasksCompleted" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "deactivated" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "emailNotifcation" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "pushNotifcation" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD COLUMN     "videosUploaded" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "whatsAppNotifcation" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "youtubeConnected" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "youtuberId" SERIAL NOT NULL,
ADD CONSTRAINT "Youtuber_pkey" PRIMARY KEY ("youtuberId");

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "profilepic" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" "USER_ROLE" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Collaborator" (
    "userId" INTEGER NOT NULL,
    "collaboratorId" SERIAL NOT NULL,
    "accountType" "ACCOUNTTYPE" NOT NULL DEFAULT 'public',
    "whatsAppNotifcation" BOOLEAN NOT NULL DEFAULT true,
    "emailNotifcation" BOOLEAN NOT NULL DEFAULT true,
    "pushNotifcation" BOOLEAN NOT NULL DEFAULT true,
    "deactivated" BOOLEAN NOT NULL DEFAULT false,
    "numberOfRatings" INTEGER NOT NULL DEFAULT 0,
    "starsAvg" "starsValue" NOT NULL DEFAULT 'unrated',

    CONSTRAINT "Collaborator_pkey" PRIMARY KEY ("collaboratorId")
);

-- CreateTable
CREATE TABLE "Workspace" (
    "workspacePic" TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "youtuberId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "workspaceid" SERIAL NOT NULL,

    CONSTRAINT "Workspace_pkey" PRIMARY KEY ("workspaceid")
);

-- CreateTable
CREATE TABLE "Tasks" (
    "taskId" SERIAL NOT NULL,
    "taskType" "taskType" NOT NULL,
    "description" TEXT,
    "status" "TASKSTATUS" NOT NULL DEFAULT 'pending',
    "workspaceId" INTEGER NOT NULL,
    "youtuberId" INTEGER NOT NULL,
    "deadline" TIMESTAMP(3) NOT NULL,
    "numberOfRevisions" INTEGER NOT NULL DEFAULT 0,
    "collaboratorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "draftVideoId" INTEGER NOT NULL,
    "permissionToViewTitle" BOOLEAN NOT NULL DEFAULT false,
    "permissionToViewDescription" BOOLEAN NOT NULL DEFAULT false,
    "permissionToViewThumbnail" BOOLEAN NOT NULL DEFAULT false,
    "permissionToViewVideo" BOOLEAN NOT NULL DEFAULT false,
    "starsRecived" "starsValue" NOT NULL DEFAULT 'unrated',

    CONSTRAINT "Tasks_pkey" PRIMARY KEY ("taskId")
);

-- CreateTable
CREATE TABLE "DraftVideos" (
    "draftVideoId" SERIAL NOT NULL,
    "DraftTitle" TEXT NOT NULL,
    "youtuberId" INTEGER NOT NULL,
    "workspaceId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ytTitle" TEXT,
    "ytDescription" TEXT,
    "ytThumbnailLink" TEXT,
    "ytVideoLink" TEXT,
    "publised" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" TIMESTAMP(3),
    "ytVideoId" TEXT,

    CONSTRAINT "DraftVideos_pkey" PRIMARY KEY ("draftVideoId")
);

-- CreateTable
CREATE TABLE "Chat" (
    "chatId" SERIAL NOT NULL,
    "from" INTEGER,
    "to" INTEGER,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("chatId")
);

-- CreateTable
CREATE TABLE "_CollaboratorToWorkspace" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CollaboratorToWorkspace_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_CollaboratorToDraftVideos" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CollaboratorToDraftVideos_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Collaborator_userId_key" ON "Collaborator"("userId");

-- CreateIndex
CREATE INDEX "_CollaboratorToWorkspace_B_index" ON "_CollaboratorToWorkspace"("B");

-- CreateIndex
CREATE INDEX "_CollaboratorToDraftVideos_B_index" ON "_CollaboratorToDraftVideos"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Youtuber_userId_key" ON "Youtuber"("userId");

-- AddForeignKey
ALTER TABLE "Collaborator" ADD CONSTRAINT "Collaborator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Youtuber" ADD CONSTRAINT "Youtuber_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workspace" ADD CONSTRAINT "Workspace_youtuberId_fkey" FOREIGN KEY ("youtuberId") REFERENCES "Youtuber"("youtuberId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("workspaceid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_youtuberId_fkey" FOREIGN KEY ("youtuberId") REFERENCES "Youtuber"("youtuberId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_collaboratorId_fkey" FOREIGN KEY ("collaboratorId") REFERENCES "Collaborator"("collaboratorId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_draftVideoId_fkey" FOREIGN KEY ("draftVideoId") REFERENCES "DraftVideos"("draftVideoId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DraftVideos" ADD CONSTRAINT "DraftVideos_youtuberId_fkey" FOREIGN KEY ("youtuberId") REFERENCES "Youtuber"("youtuberId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DraftVideos" ADD CONSTRAINT "DraftVideos_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("workspaceid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_from_fkey" FOREIGN KEY ("from") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_to_fkey" FOREIGN KEY ("to") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CollaboratorToWorkspace" ADD CONSTRAINT "_CollaboratorToWorkspace_A_fkey" FOREIGN KEY ("A") REFERENCES "Collaborator"("collaboratorId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CollaboratorToWorkspace" ADD CONSTRAINT "_CollaboratorToWorkspace_B_fkey" FOREIGN KEY ("B") REFERENCES "Workspace"("workspaceid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CollaboratorToDraftVideos" ADD CONSTRAINT "_CollaboratorToDraftVideos_A_fkey" FOREIGN KEY ("A") REFERENCES "Collaborator"("collaboratorId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CollaboratorToDraftVideos" ADD CONSTRAINT "_CollaboratorToDraftVideos_B_fkey" FOREIGN KEY ("B") REFERENCES "DraftVideos"("draftVideoId") ON DELETE CASCADE ON UPDATE CASCADE;
