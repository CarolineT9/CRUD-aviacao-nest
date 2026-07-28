-- CreateTable
CREATE TABLE "Aeronave" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "prefixo" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "velocidadeCruzeiro" INTEGER NOT NULL,
    "autonomia" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "AeronaveParticular" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "aeronaveId" INTEGER NOT NULL,
    "respManutencao" TEXT NOT NULL,
    CONSTRAINT "AeronaveParticular_aeronaveId_fkey" FOREIGN KEY ("aeronaveId") REFERENCES "Aeronave" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AeronaveComercial" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "aeronaveId" INTEGER NOT NULL,
    "nomeCia" TEXT NOT NULL,
    CONSTRAINT "AeronaveComercial_aeronaveId_fkey" FOREIGN KEY ("aeronaveId") REFERENCES "Aeronave" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AeronavePassageiro" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "comercialId" INTEGER NOT NULL,
    "maxPassageiros" INTEGER NOT NULL,
    CONSTRAINT "AeronavePassageiro_comercialId_fkey" FOREIGN KEY ("comercialId") REFERENCES "AeronaveComercial" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AeronaveCarga" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "comercialId" INTEGER NOT NULL,
    "pesoMax" REAL NOT NULL,
    CONSTRAINT "AeronaveCarga_comercialId_fkey" FOREIGN KEY ("comercialId") REFERENCES "AeronaveComercial" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Aeronave_prefixo_key" ON "Aeronave"("prefixo");

-- CreateIndex
CREATE UNIQUE INDEX "AeronaveParticular_aeronaveId_key" ON "AeronaveParticular"("aeronaveId");

-- CreateIndex
CREATE UNIQUE INDEX "AeronaveComercial_aeronaveId_key" ON "AeronaveComercial"("aeronaveId");

-- CreateIndex
CREATE UNIQUE INDEX "AeronavePassageiro_comercialId_key" ON "AeronavePassageiro"("comercialId");

-- CreateIndex
CREATE UNIQUE INDEX "AeronaveCarga_comercialId_key" ON "AeronaveCarga"("comercialId");
