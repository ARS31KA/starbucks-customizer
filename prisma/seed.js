const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Drinkデータ
  const coffee = await prisma.drink.upsert({
    where: { name: "コーヒー" },
    update: {},
    create: { name: "コーヒー", type: "Hot" },
  });

  const tea = await prisma.drink.upsert({
    where: { name: "ティー" },
    update: {},
    create: { name: "ティー", type: "Hot" },
  });

  const frappuccino = await prisma.drink.upsert({
    where: { name: "フラペチーノ" },
    update: {},
    create: { name: "フラペチーノ", type: "Cold" },
  });

  // Sizeデータ

  const short = await prisma.size.upsert({
    where: { name: "Short" },
    update: {},
    create: { name: "Short" },
  });

  const tall = await prisma.size.upsert({
    where: { name: "Tall" },
    update: {},
    create: { name: "Tall" },
  });

  const grande = await prisma.size.upsert({
    where: { name: "Grande" },
    update: {},
    create: { name: "Grande" },
  });

  const venti = await prisma.size.upsert({
    where: { name: "Venti" },
    update: {},
    create: { name: "Venti" },
  });

  // Customizationデータ
  const oat = await prisma.customization.upsert({
    where: { name: "オーツミルクに変更" },
    update: {},
    create: {
      name: "オーツミルクに変更",
      priceModifier: 55.0,
      calorieModifier: 30,
    },
  });

  const shot = await prisma.customization.upsert({
    where: { name: "エスプレッソショット追加" },
    update: {},
    create: {
      name: "エスプレッソショット追加",
      priceModifier: 60.0,
      calorieModifier: 15,
    },
  });

  const whip = await prisma.customization.upsert({
    where: { name: "ホイップ追加" },
    update: {},
    create: {
      name: "ホイップ追加",
      priceModifier: 70.0,
      calorieModifier: 80,
    },
  });

  // DrinkCustomizationデータ（組み合わせ）
  await prisma.drinkCustomization.createMany({
    data: [
      {
        drinkId: coffee.id,
        sizeId: short.id,
        customizationId: shot.id,
        basePrice: 390,
        baseCalories: 95,
        suggestedCustomizationName: "キレのある味わいのショット追加",
      },
      {
        drinkId: coffee.id,
        sizeId: short.id,
        customizationId: oat.id,
        basePrice: 390,
        baseCalories: 90,
        suggestedCustomizationName: "まろやかなオーツで軽やかに",
      },
      {
        drinkId: coffee.id,
        sizeId: tall.id,
        customizationId: oat.id,
        basePrice: 400,
        baseCalories: 100,
        suggestedCustomizationName: "オーツミルクのまろやかさをプラス",
      },
      {
        drinkId: coffee.id,
        sizeId: grande.id,
        customizationId: shot.id,
        basePrice: 450,
        baseCalories: 120,
        suggestedCustomizationName:
          "深みのある味わいに仕上げるエスプレッソ追加",
      },
      {
        drinkId: tea.id,
        sizeId: tall.id,
        customizationId: whip.id,
        basePrice: 390,
        baseCalories: 90,
        suggestedCustomizationName: "紅茶にホイップの甘さを",
      },
      {
        drinkId: tea.id,
        sizeId: grande.id,
        customizationId: oat.id,
        basePrice: 420,
        baseCalories: 105,
        suggestedCustomizationName: "紅茶にオーツミルクのまろやかさを",
      },
      {
        drinkId: frappuccino.id,
        sizeId: tall.id,
        customizationId: whip.id,
        basePrice: 520,
        baseCalories: 240,
        suggestedCustomizationName: "ホイップで贅沢感をプラス",
      },
      {
        drinkId: frappuccino.id,
        sizeId: grande.id,
        customizationId: oat.id,
        basePrice: 570,
        baseCalories: 260,
        suggestedCustomizationName: "オーツミルクで軽やかに仕上げる",
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
