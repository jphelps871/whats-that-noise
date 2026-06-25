/*
  Warnings:

  - Added the required column `description` to the `Noise` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Noise" ADD COLUMN     "description" TEXT NOT NULL;
