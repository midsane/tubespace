-- DropForeignKey
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_from_fkey";

-- DropForeignKey
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_to_fkey";

-- AlterTable
ALTER TABLE "Chat" ALTER COLUMN "from" SET DATA TYPE TEXT,
ALTER COLUMN "to" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_from_fkey" FOREIGN KEY ("from") REFERENCES "User"("username") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_to_fkey" FOREIGN KEY ("to") REFERENCES "User"("username") ON DELETE SET NULL ON UPDATE CASCADE;
