-- CreateTable
CREATE TABLE "Note" (
    "id" SERIAL NOT NULL,
    "typeNote" TEXT,
    "roomType" TEXT,
    "dateNote" TEXT,
    "priceNote" TEXT,
    "furnitureNote" TEXT,
    "formId" INTEGER,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE SET NULL ON UPDATE CASCADE;
