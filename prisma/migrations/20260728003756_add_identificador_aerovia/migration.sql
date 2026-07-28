/*
  Warnings:

  - Added the required column `identificador` to the `Aerovia` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "OcupacaoAerovia" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "aeroviaId" INTEGER NOT NULL,
    "data" DATETIME NOT NULL,
    "altitude" INTEGER NOT NULL,
    "slot" INTEGER NOT NULL,
    CONSTRAINT "OcupacaoAerovia_aeroviaId_fkey" FOREIGN KEY ("aeroviaId") REFERENCES "Aerovia" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Aerovia" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "identificador" TEXT NOT NULL,
    "origem" TEXT NOT NULL,
    "destino" TEXT NOT NULL,
    "tamanho" INTEGER NOT NULL
);
INSERT INTO "new_Aerovia" ("destino", "id", "origem", "tamanho") SELECT "destino", "id", "origem", "tamanho" FROM "Aerovia";
DROP TABLE "Aerovia";
ALTER TABLE "new_Aerovia" RENAME TO "Aerovia";
CREATE UNIQUE INDEX "Aerovia_identificador_key" ON "Aerovia"("identificador");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "OcupacaoAerovia_aeroviaId_data_altitude_slot_key" ON "OcupacaoAerovia"("aeroviaId", "data", "altitude", "slot");
