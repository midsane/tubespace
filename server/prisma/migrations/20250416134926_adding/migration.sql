-- CreateTable
CREATE TABLE "_chatPersonList" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_chatPersonList_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_chatPersonList_B_index" ON "_chatPersonList"("B");

-- AddForeignKey
ALTER TABLE "_chatPersonList" ADD CONSTRAINT "_chatPersonList_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_chatPersonList" ADD CONSTRAINT "_chatPersonList_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
