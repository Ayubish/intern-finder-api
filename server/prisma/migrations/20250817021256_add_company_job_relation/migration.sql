/*
  Warnings:

  - A unique constraint covering the columns `[companyId]` on the table `job` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "job_companyId_key" ON "job"("companyId");
