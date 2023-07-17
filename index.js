document.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch("./db/model.json");
  const data = await response.json();
  const div = document.querySelector("#index");

  for (const product of data.product) {
    const getMinPrice = (array = []) => {
      return Math.min(...array.map((item) => item.price.count));
    };

    const count = getMinPrice(product.specifications);
    const productDiv = document.createElement("div");
    productDiv.innerHTML = `
        <a class="card" href="/product.html?id=${product._id}">
            <div class="name">Название Товара: <span> ${product?.name} </span></div>
            <div class="price">Цена от : <span> ${count} RUB </span></div>
        </a>
      `;
    div.appendChild(productDiv);
  }
});
