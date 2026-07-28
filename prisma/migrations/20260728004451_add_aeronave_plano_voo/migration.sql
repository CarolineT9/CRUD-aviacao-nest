/*
  Warnings:

  - Added the required column `aeronaveId` to the `PlanoDeVoo` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PlanoDeVoo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pilotoId" INTEGER NOT NULL,
    "aeronaveId" INTEGER NOT NULL,
    "aeroviaId" INTEGER NOT NULL,
    "data" DATETIME NOT NULL,
    "horario" TEXT NOT NULL,
    "altitude" INTEGER NOT NULL,
    "slots" JSONB NOT NULL,
    "cancelado" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "PlanoDeVoo_pilotoId_fkey" FOREIGN KEY ("pilotoId") REFERENCES "Piloto" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PlanoDeVoo_aeronaveId_fkey" FOREIGN KEY ("aeronaveId") REFERENCES "Aeronave" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PlanoDeVoo_aeroviaId_fkey" FOREIGN KEY ("aeroviaId") REFERENCES "Aerovia" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PlanoDeVoo" ("aeroviaId", "altitude", "cancelado", "data", "horario", "id", "pilotoId", "slots") SELECT "aeroviaId", "altitude", "cancelado", "data", "horario", "id", "pilotoId", "slots" FROM "PlanoDeVoo";
DROP TABLE "PlanoDeVoo";
ALTER TABLE "new_PlanoDeVoo" RENAME TO "PlanoDeVoo";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
