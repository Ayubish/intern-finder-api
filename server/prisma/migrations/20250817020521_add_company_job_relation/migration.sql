/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `company` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `intern` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "company_userId_key" ON "company"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "intern_userId_key" ON "intern"("userId");
