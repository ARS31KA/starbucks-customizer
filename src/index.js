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
      calories: selected.baseCalories + selected.customization.calorieModifier,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "サーバーエラーが発生しました" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
