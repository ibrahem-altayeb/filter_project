let filteredProducts = [...products];
let productsContainer = document.querySelector(".products-container");
let container = document.querySelector(".companies");
let myINput = document.querySelector(".input-form");
let searching = document.querySelector(".search-input");

window.addEventListener("DOMContentLoaded", function (e) {
  searching.focus();
  mapItme(filteredProducts);
  displayMenuButtons();
});
function mapItme(menuItem) {
  const displayMenu = menuItem
    .map((product) => {
      const { id, title, image, price } = product;
      return `<article class="product" data-id ${id}>
    <img
    src="${image}"
    class="product-img img"
    alt=""
    />
    <footer>
    <h5 class="product-name">${title}</h5>
    <span class="product-price">$${price}</span>
    </footer>
    </article>`;
    })
    .join("");
  productsContainer.innerHTML = displayMenu;
}
function displayMenuButtons() {
  const companies = filteredProducts.reduce((accumulator, product) => {
    accumulator.add(product.company);
    return accumulator;
  }, new Set(["all"]));

  const uniqueCompanies = Array.from(companies);

  const myReduce = uniqueCompanies
    .map((element) => {
      return `<button class="company-btn" id="${element}">${element}</button>`;
    })
    .join("");

  container.innerHTML = myReduce;

  let Btns = document.querySelectorAll(".company-btn");
  Btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let element = e.currentTarget.id;
      let companys = filteredProducts.filter((name) => {
        if (name.company === element) {
          return name;
        }
      });
      if (element === "all") {
        mapItme(filteredProducts);
      } else {
        mapItme(companys);
      }
    });
  });
  myINput.addEventListener("keyup", () => {
    const valueInput = searching.value;
    if (valueInput.length > 0) {
      const filterChars = filteredProducts.filter((item) => {
        const titles = item.title;

        return titles.includes(valueInput);
      });

      const lastMap = filterChars
        .map((img) => {
          const { id, title, image, price } = img;
          return `<article class="product" data-id ${id}>
    <img
    src="${image}"
    class="product-img img"
    alt=""
    />
    <footer>
    <h5 class="product-name">${title}</h5>
    <span class="product-price">$${price}</span>
    </footer>
    </article>`;
        })
        .join("");
      productsContainer.innerHTML = lastMap;
      if (lastMap.length === 0) {
        productsContainer.innerHTML = `<h6>Sorry, no products matched your search</h6>`;
      }
    } else {
      mapItme(filteredProducts);
    }
  });
}
