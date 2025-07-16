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
      drinkId: frappuccino.id,
      sizeId: tall.id,
      customizationId: shot.id,
      basePrice: 540,
      baseCalories: 250,
      suggestedCustomizationName: "エスプレッソの香りでビターなフラペ",
    },
    {
      drinkId: frappuccino.id,
      sizeId: tall.id,
      customizationId: oat.id,
      basePrice: 530,
      baseCalories: 245,
      suggestedCustomizationName: "オーツでクリーミーな仕上がり",
    },
    {
      drinkId: frappuccino.id,
      sizeId: tall.id,
      customizationId: whip.id,
      basePrice: 550,
      baseCalories: 265,
      suggestedCustomizationName: "ホイップ追加で贅沢フラペに",
    },
    {
      drinkId: coffee.id,
      sizeId: tall.id,
      customizationId: shot.id,
      basePrice: 430,
      baseCalories: 110,
      suggestedCustomizationName: "さらに深いコクを楽しむショット追加",
    },
    {
      drinkId: tea.id,
      sizeId: grande.id,
      customizationId: whip.id,
      basePrice: 430,
      baseCalories: 140,
      suggestedCustomizationName: "グランデティーにホイップのアクセント",
    },
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
      {
      drinkId: tea.id,
      sizeId: short.id,
      customizationId: oat.id,
      basePrice: 370,
      baseCalories: 85,
      suggestedCustomizationName: "ショートサイズでもまろやかオーツで上品に",
    },
    {
      drinkId: tea.id,
      sizeId: short.id,
      customizationId: shot.id,
      basePrice: 380,
      baseCalories: 90,
      suggestedCustomizationName: "スパイシーさ際立つティーにショットをプラス",
    },
    {
      drinkId: tea.id,
      sizeId: tall.id,
      customizationId: oat.id,
      basePrice: 390,
      baseCalories: 100,
      suggestedCustomizationName: "Tallサイズのティーをオーツでやさしく",
    },
    {
      drinkId: tea.id,
      sizeId: venti.id,
      customizationId: oat.id,
      basePrice: 470,
      baseCalories: 115,
      suggestedCustomizationName: "Ventiのたっぷりティーにオーツのコク",
    },
    {
      drinkId: tea.id,
      sizeId: venti.id,
      customizationId: whip.id,
      basePrice: 480,
      baseCalories: 170,
      suggestedCustomizationName: "甘党におすすめ！ホイップ盛りティー",
    },
    {
      drinkId: coffee.id,
      sizeId: venti.id,
      customizationId: shot.id,
      basePrice: 500,
      baseCalories: 140,
      suggestedCustomizationName: "エスプレッソでしっかり目覚めるVenti",
    },
    {
      drinkId: coffee.id,
      sizeId: venti.id,
      customizationId: oat.id,
      basePrice: 495,
      baseCalories: 130,
      suggestedCustomizationName: "オーツで飲みやすくヘルシーなVentiコーヒー",
    },
    {
      drinkId: coffee.id,
      sizeId: tall.id,
      customizationId: whip.id,
      basePrice: 430,
      baseCalories: 160,
      suggestedCustomizationName: "Tallコーヒーに贅沢ホイップのアクセント",
    },
    {
      drinkId: frappuccino.id,
      sizeId: venti.id,
      customizationId: whip.id,
      basePrice: 620,
      baseCalories: 300,
      suggestedCustomizationName: "ホイップたっぷり贅沢Ventiフラペチーノ",
    },
    {
      drinkId: frappuccino.id,
      sizeId: venti.id,
      customizationId: shot.id,
      basePrice: 610,
      baseCalories: 280,
      suggestedCustomizationName: "ビター好きにおすすめ！ショット入りVentiフラペ",
    },
    {
      drinkId: frappuccino.id,
      sizeId: venti.id,
      customizationId: oat.id,
      basePrice: 615,
      baseCalories: 270,
      suggestedCustomizationName: "オーツで軽やか！大容量でも飲みやすい",
    },
    {
      drinkId: frappuccino.id,
      sizeId: short.id,
      customizationId: oat.id,
      basePrice: 490,
      baseCalories: 220,
      suggestedCustomizationName: "オーツミルクでさっぱりShortフラペ",
    },
    {
      drinkId: frappuccino.id,
      sizeId: short.id,
      customizationId: whip.id,
      basePrice: 500,
      baseCalories: 240,
      suggestedCustomizationName: "ミニサイズでも贅沢ホイップ",
    },
    {
      drinkId: frappuccino.id,
      sizeId: short.id,
      customizationId: shot.id,
      basePrice: 505,
      baseCalories: 230,
      suggestedCustomizationName: "ショット追加で深みのあるShortフラペ",
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
