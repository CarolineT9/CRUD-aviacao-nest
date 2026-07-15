-- CreateTable
CREATE TABLE "Piloto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "matricula" TEXT NOT NULL,
    "isAtivo" BOOLEAN NOT NULL DEFAULT true
);

-- CreateIndex
CREATE UNIQUE INDEX "Piloto_matricula_key" ON "Piloto"("matricula");
