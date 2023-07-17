import Product from "./model/Product";

document.addEventListener("DOMContentLoaded", async () => {
  const id = new URLSearchParams(window.location.search).get("id");
  const response = await fetch("/db/model.json");
  const data = await response.json();
  const currentProduct = data.product.find((item) => item._id === id);

  const product = new Product(
    currentProduct,
    document.querySelector("#product"),
    {
      dimensions: data.dimensions,
    }
  );
  //   product.render();
});
