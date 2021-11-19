-- CreateTable
CREATE TABLE "Form" (
    "id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "proppertyType" TEXT,
    "bedroom" TEXT,
    "date" TIMESTAMP(3),
    "price" INTEGER,
    "furniture" TEXT,
    "note" TEXT,
    "reporter" TEXT,

    CONSTRAINT "Form_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Form_address_key" ON "Form"("address");
