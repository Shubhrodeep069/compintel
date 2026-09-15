-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompensationRecord" (
    "id" SERIAL NOT NULL,
    "companyId" INTEGER NOT NULL,
    "role" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "baseSalary" DECIMAL(12,2) NOT NULL,
    "bonus" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "stock" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "totalCompensation" DECIMAL(12,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CompensationRecord_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_name_key" ON "Company"("name");

-- CreateIndex
CREATE INDEX "CompensationRecord_companyId_idx" ON "CompensationRecord"("companyId");

-- CreateIndex
CREATE INDEX "CompensationRecord_role_idx" ON "CompensationRecord"("role");

-- CreateIndex
CREATE INDEX "CompensationRecord_level_idx" ON "CompensationRecord"("level");

-- CreateIndex
CREATE INDEX "CompensationRecord_location_idx" ON "CompensationRecord"("location");

-- CreateIndex
CREATE INDEX "CompensationRecord_totalCompensation_idx" ON "CompensationRecord"("totalCompensation");

-- AddForeignKey
ALTER TABLE "CompensationRecord" ADD CONSTRAINT "CompensationRecord_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
