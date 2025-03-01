-- CreateTable
CREATE TABLE "Youtuber" (
    "name" TEXT,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" SERIAL NOT NULL,

    CONSTRAINT "Youtuber_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Youtuber_email_key" ON "Youtuber"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Youtuber_username_key" ON "Youtuber"("username");
