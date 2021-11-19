/*
  Warnings:

  - You are about to drop the column `roomType` on the `Note` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Note" DROP COLUMN "roomType",
ADD COLUMN     "roomNote" TEXT;
