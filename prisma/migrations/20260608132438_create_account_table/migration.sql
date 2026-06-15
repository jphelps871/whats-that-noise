/*
  Warnings:

  - Added the required column `lat` to the `Noise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lng` to the `Noise` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Noise" ADD COLUMN     "lat" TEXT NOT NULL,
ADD COLUMN     "lng" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'user';

-- CreateTable
CREATE TABLE "Account" (
    "id" SERIAL NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
