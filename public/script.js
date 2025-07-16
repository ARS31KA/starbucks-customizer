document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("custom-form");
  const resultDiv = document.getElementById("result");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const drink = document.getElementById("drink").value;
    const size = document.getElementById("size").value;

    try {
      const response = await fetch("/api/suggest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ drink, size }),
      });

      const data = await response.json();

      resultDiv.innerHTML = `
        <h2>おすすめカスタム</h2>
        <p>ドリンク: ${drink}</p>
        <p>サイズ: ${size}</p>
        <p>提案: ${data.suggestion}</p>
        <p>価格: ¥${data.price}</p>
        <p>カロリー: ${data.calories} kcal</p>
      `;
    } catch (error) {
      resultDiv.innerHTML = '<p style="color:red;">エラーが発生しました。</p>';
      console.error(error);
    }
  });
});
