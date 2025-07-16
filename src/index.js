const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
const app = express();
app.use(express.static("public"));
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use(express.json()); // ← これを追加（JSONボディを使うため）

app.post("/api/suggest", async (req, res) => {
  const { drink, size } = req.body;

  if (
    typeof drink !== "string" ||
    drink.trim() === "" ||
    typeof size !== "string" ||
    size.trim() === ""
  ) {
    return res.status(400).json({ error: "飲み物とサイズは必須です" });
  }

  try {
    
    /*
    const drinkData = await prisma.drink.findUnique({ where: { name: drink } });
    const sizeData = await prisma.size.findUnique({ where: { name: size } });

    if (!drinkData || !sizeData) {
      return res.status(400).json({ error: "無効な入力です" });
    }

    const candidates = await prisma.drinkCustomization.findMany({
      where: {
        drinkId: drinkData.id,
        sizeId: sizeData.id,
      },
      include: { customization: true },
    });
    if (candidates.length === 0) {
      return res
        .status(404)
        .json({ error: "該当するカスタマイズが見つかりませんでした" });
    
        
    }

    const selected = candidates[Math.floor(Math.random() * candidates.length)];

    res.json({
      suggestion: selected.suggestedCustomizationName,
      price:
        Number(selected.basePrice) +
        Number(selected.customization.priceModifier),
      calories: selected.baseCalories + selected.customization.calorieModifier
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "サーバーエラーが発生しました" });
  }*/
 // ① カテゴリに属するドリンクをランダムに1つ選ぶ
   /* const drinks = await prisma.drink.findMany({ where: { type: drink } });
    if (drinks.length === 0) {
      return res.status(404).json({ error: "該当するカテゴリにドリンクがありません" });
    }
    const drinkData = drinks[Math.floor(Math.random() * drinks.length)];

    // ② サイズ情報を取得
    const sizeData = await prisma.size.findUnique({ where: { name: size } });
    if (!sizeData) {
      return res.status(400).json({ error: "無効なサイズです" });
    }

    // ③ 該当するカスタマイズ候補を取得
    const candidates = await prisma.drinkCustomization.findMany({
      where: {
        drinkId: drinkData.id,
        sizeId: sizeData.id,
      },
      include: { customization: true },
    });
    if (candidates.length === 0) {
      return res.status(404).json({ error: "該当するカスタマイズが見つかりませんでした" });
    }

    // ④ ランダムな提案を返す
    const selected = candidates[Math.floor(Math.random() * candidates.length)];

    res.json({
      suggestion: selected.suggestedCustomizationName,
      price:
        Number(selected.basePrice) +
        Number(selected.customization.priceModifier),
      calories: selected.baseCalories + selected.customization.calorieModifier,
      drinkName: drinkData.name, // ← ここで具体的なドリンク名を返す
    });*/
    // ユーザーが選択した「飲み物の種類」（カテゴリ）のIDを取得
    const selectedDrinkCategory = await prisma.drink.findUnique({ where: { name: drink } });
    if (!selectedDrinkCategory) {
      return res.status(400).json({ error: "無効な飲み物の種類です" });
    }

    // サイズ情報を取得
    const sizeData = await prisma.size.findUnique({ where: { name: size } });
    if (!sizeData) {
      return res.status(400).json({ error: "無効なサイズです" });
    }

    // 選択されたカテゴリとサイズに紐づくカスタマイズ候補を取得
    const candidates = await prisma.drinkCustomization.findMany({
      where: {
        drinkId: selectedDrinkCategory.id, // ここでカテゴリのIDを使用
        sizeId: sizeData.id,
      },
      include: { customization: true },
    });

    if (candidates.length === 0) {
      return res.status(404).json({ error: "該当するカスタマイズが見つかりませんでした" });
    }

    // ランダムな提案を返す
    const selected = candidates[Math.floor(Math.random() * candidates.length)];

    // カテゴリに属する具体的なドリンク名をランダムに取得
    const actualDrinksInCategory = await prisma.drink.findMany({ where: { type: drink } });
    let actualDrinkName = selectedDrinkCategory.name; // デフォルトはカテゴリ名
    if (actualDrinksInCategory.length > 0) {
      const randomActualDrink = actualDrinksInCategory[Math.floor(Math.random() * actualDrinksInCategory.length)];
      actualDrinkName = randomActualDrink.name; // 具体的なドリンク名があればそれを採用
    }

    res.json({
      suggestion: selected.suggestedCustomizationName,
      price:
        Number(selected.basePrice) +
        Number(selected.customization.priceModifier),
      calories: selected.baseCalories + selected.customization.calorieModifier,
      drinkName: actualDrinkName, // ここで具体的なドリンク名を返す
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "サーバーエラーが発生しました" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
