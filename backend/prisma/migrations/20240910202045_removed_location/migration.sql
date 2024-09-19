/*
  Warnings:

  - You are about to drop the column `locationId` on the `car` table. All the data in the column will be lost.
  - You are about to drop the `location` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `car` DROP FOREIGN KEY `Car_locationId_fkey`;

-- AlterTable
ALTER TABLE `car` DROP COLUMN `locationId`;

-- DropTable
DROP TABLE `location`;
