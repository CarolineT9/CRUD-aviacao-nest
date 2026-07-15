-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Aeronave" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "prefixo" TEXT NOT NULL,
    "autonomia" INTEGER NOT NULL
);
INSERT INTO "new_Aeronave" ("autonomia", "id", "prefixo") SELECT "autonomia", "id", "prefixo" FROM "Aeronave";
DROP TABLE "Aeronave";
ALTER TABLE "new_Aeronave" RENAME TO "Aeronave";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
