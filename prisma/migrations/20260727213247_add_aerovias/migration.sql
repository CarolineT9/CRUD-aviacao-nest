/*
  Warnings:

  - You are about to drop the `Aerovias` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Aerovias";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Aerovia" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "origem" TEXT NOT NULL,
    "destino" TEXT NOT NULL,
    "tamanho" INTEGER NOT NULL
);
