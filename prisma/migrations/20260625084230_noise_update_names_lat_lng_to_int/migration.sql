/*
  Warnings:

  - You are about to drop the column `timeOfNoise` on the `Noise` table. All the data in the column will be lost.
  - Changed the type of `lat` on the `Noise` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `lng` on the `Noise` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Noise" DROP COLUMN "timeOfNoise",
ADD COLUMN     "dateOfNoise" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "lat",
ADD COLUMN     "lat" INTEGER NOT NULL,
DROP COLUMN "lng",
ADD COLUMN     "lng" INTEGER NOT NULL;
