/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Customization` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Drink` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Size` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Customization_name_key" ON "Customization"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Drink_name_key" ON "Drink"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Size_name_key" ON "Size"("name");
