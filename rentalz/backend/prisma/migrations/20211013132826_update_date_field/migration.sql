/*
  Warnings:

  - You are about to drop the column `date` on the `Form` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Form" DROP COLUMN "date",
ADD COLUMN     "myDate" TIMESTAMP(3);
