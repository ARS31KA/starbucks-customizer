-- CreateTable
CREATE TABLE "Drink" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Drink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Size" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Size_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customization" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "priceModifier" DECIMAL(5,2) NOT NULL,
    "calorieModifier" INTEGER NOT NULL,

    CONSTRAINT "Customization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DrinkCustomization" (
    "id" SERIAL NOT NULL,
    "drinkId" INTEGER NOT NULL,
    "sizeId" INTEGER NOT NULL,
    "customizationId" INTEGER NOT NULL,
    "basePrice" DECIMAL(5,2) NOT NULL,
    "baseCalories" INTEGER NOT NULL,
    "suggestedCustomizationName" TEXT NOT NULL,

    CONSTRAINT "DrinkCustomization_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DrinkCustomization" ADD CONSTRAINT "DrinkCustomization_drinkId_fkey" FOREIGN KEY ("drinkId") REFERENCES "Drink"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DrinkCustomization" ADD CONSTRAINT "DrinkCustomization_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES "Size"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DrinkCustomization" ADD CONSTRAINT "DrinkCustomization_customizationId_fkey" FOREIGN KEY ("customizationId") REFERENCES "Customization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
