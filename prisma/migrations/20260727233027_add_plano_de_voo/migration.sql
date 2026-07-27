/*
  Warnings:

  - You are about to drop the `Aeronave` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Aeronave";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "PlanoDeVoo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pilotoId" INTEGER NOT NULL,
    "aeroviaId" INTEGER NOT NULL,
    "data" DATETIME NOT NULL,
    "horario" TEXT NOT NULL,
    "altitude" INTEGER NOT NULL,
    "slots" JSONB NOT NULL,
    "cancelado" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "PlanoDeVoo_pilotoId_fkey" FOREIGN KEY ("pilotoId") REFERENCES "Piloto" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PlanoDeVoo_aeroviaId_fkey" FOREIGN KEY ("aeroviaId") REFERENCES "Aerovia" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
