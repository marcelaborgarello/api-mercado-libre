const showResults = (results) => {
  const container = document.querySelector(".results");
  const template = document.querySelector("#result-item-template");

  const counter = document.querySelector(".results-count");
  counter.textContent = results.length;

  for (let item of results) {
    const titleProduct = template.content.querySelector(".result-item-title");
    titleProduct.textContent = item.title;

    const conditionProduct = template.content.querySelector(
      ".result-item-condition"
    );

    conditionProduct.textContent = item.condition === "new" ? "Nuevo" : "Usado";

    const imgProduct = template.content.querySelector(".result-item-img");
    imgProduct.src = item.thumbnail;

    const priceProduct = template.content.querySelector(".result-item-price");
    priceProduct.textContent = `$${item.price}`;

    const soldQuantityProduct = template.content.querySelector(
      ".result-item-sold-count"
    );
    soldQuantityProduct.textContent = item.sold_quantity;

    const clone = document.importNode(template.content, true);
    container.appendChild(clone);
  }
};

const handleSubmit = (e) => {
  e.preventDefault();
  e.target.buscar.value !== ""
    ? e.target.buscar.value
    : alert("Este campo no puede estar vacío para realizar una búsqueda");

  const datoABuscar = e.target.buscar.value;

  fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${datoABuscar}`)
    .then((res) => res.json())
    .then((data) => {
      showResults(data.results);
    });

  e.target.buscar.value = "";
};

const main = () => {
  const formEl = document.querySelector(".search-form");
  formEl.addEventListener("submit", handleSubmit);
};
main();
