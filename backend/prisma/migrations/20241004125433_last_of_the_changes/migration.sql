/*
  Warnings:

  - Added the required column `agenceId` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `booking` ADD COLUMN `agenceId` INTEGER NOT NULL;
