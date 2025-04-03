/*
  Warnings:

  - The primary key for the `Documentes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Documentes` table. All the data in the column will be lost.
  - You are about to drop the column `mimeType` on the `Documentes` table. All the data in the column will be lost.
  - You are about to drop the column `path` on the `Documentes` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `Documentes` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Documentes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Documentes" DROP CONSTRAINT "Documentes_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "mimeType",
DROP COLUMN "path",
DROP COLUMN "size",
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Documentes_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Documentes_id_seq";

-- AddForeignKey
ALTER TABLE "Documentes" ADD CONSTRAINT "Documentes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
