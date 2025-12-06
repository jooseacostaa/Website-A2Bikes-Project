const PRODUCT_FORM = document.querySelector(".contact-form");
const PRODUCT_LIST_UL = document.getElementById("product-list-ul");
const LOCAL_STORAGE_KEY = "a2BikesStorage";

const productNameInput = document.getElementById("product-name");
const productDescriptionInput = document.getElementById("product-description");
const productPriceInput = document.getElementById("product-price");
const submitButton = document.querySelector(".submit-btn");

function loadProducts() {
  const productsJson = localStorage.getItem(LOCAL_STORAGE_KEY);
  return productsJson ? JSON.parse(productsJson) : [];
}

function saveProducts(productsArray) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(productsArray));
}

function renderProductList(productsArray) {
  PRODUCT_LIST_UL.innerHTML = "";

  productsArray.forEach((product) => {
    const listItem = document.createElement("li");
    listItem.dataset.id = product.id;

    const productDetails = document.createElement("span");
    productDetails.textContent = `${product.name} - ${product.description} | Precio: ${product.price}€`;

    const updateButton = document.createElement("button");
    updateButton.textContent = "Modificar";
    updateButton.classList.add("update-btn");
    updateButton.addEventListener("click", () => startUpdate(product.id));

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Borrar";
    deleteButton.classList.add("delete-btn");
    deleteButton.addEventListener("click", () => deleteProduct(product.id));

    listItem.appendChild(productDetails);
    listItem.appendChild(updateButton);
    listItem.appendChild(deleteButton);
    PRODUCT_LIST_UL.appendChild(listItem);
  });
}

function createProduct(event) {
  event.preventDefault();

  const newProduct = {
    id: Date.now(),
    name: productNameInput.value.trim(),
    description: productDescriptionInput.value.trim(),
    price: parseFloat(productPriceInput.value),
  };

  if (!newProduct.name || !newProduct.description || isNaN(newProduct.price)) {
    alert("Por favor, completa todos los campos válidos.");
    return;
  }

  const products = loadProducts();
  products.push(newProduct);
  saveProducts(products);

  PRODUCT_FORM.reset();
  renderProductList(products);
}

function startUpdate(productId) {
  const products = loadProducts();
  const productToUpdate = products.find((p) => p.id === productId);

  if (productToUpdate) {
    productNameInput.value = productToUpdate.name;
    productDescriptionInput.value = productToUpdate.description;
    productPriceInput.value = productToUpdate.price;

    submitButton.textContent = "Guardar Cambios";
    PRODUCT_FORM.onsubmit = (event) => finishUpdate(event, productId);

    PRODUCT_FORM.scrollIntoView({ behavior: "smooth" });
  }
}

function finishUpdate(event, productId) {
  event.preventDefault();

  const products = loadProducts();
  const productIndex = products.findIndex((p) => p.id === productId);

  if (productIndex !== -1) {
    products[productIndex].name = productNameInput.value.trim();
    products[productIndex].description = productDescriptionInput.value.trim();
    products[productIndex].price = parseFloat(productPriceInput.value);

    saveProducts(products);
    renderProductList(products);

    resetFormForCreation();
  }
}

function deleteProduct(productId) {
  const products = loadProducts();
  const updatedProducts = products.filter((p) => p.id !== productId);

  saveProducts(updatedProducts);
  renderProductList(updatedProducts);
}

function resetFormForCreation() {
  PRODUCT_FORM.reset();
  submitButton.textContent = "Agregar Producto";
  PRODUCT_FORM.onsubmit = createProduct;
}

function initializeApp() {
  const initialProducts = loadProducts();
  renderProductList(initialProducts);

  PRODUCT_FORM.onsubmit = createProduct;
}

initializeApp();
