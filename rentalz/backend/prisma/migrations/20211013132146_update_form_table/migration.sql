/*
  Warnings:

  - You are about to drop the column `proppertyType` on the `Form` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Form" DROP COLUMN "proppertyType",
ADD COLUMN     "propertyType" TEXT;
