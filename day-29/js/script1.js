function renderBadge() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

  document.getElementById("bedgeItems").innerHTML = `
    <button type="button" class="btn btn-primary position-relative mt-2 mb-2">
      <i class="fa-solid fa-cart-plus"></i>
      <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
        ${cartItems.length}
        <span class="visually-hidden">items in cart</span>
      </span>
    </button>
  `;
}

function addToCart(item) {
  let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  const index = cartItems.findIndex(p => p.id === item.id);

  if (index !== -1) {
    cartItems[index].quantity = (cartItems[index].quantity || 1) + 1;
  } else {
    item.quantity = 1;
    cartItems.push(item);
  }

  localStorage.setItem('cart', JSON.stringify(cartItems));
  renderBadge();
}

function getCartItems() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  const container = document.getElementById("cart-items");
  container.innerHTML = "";

  if (cartItems.length === 0) {
    container.innerHTML = "<p>No items in cart.</p>";
    return;
  }

  cartItems.forEach(item => {
    container.innerHTML += `
      <div class="col-8 card m-5" style="width: 18rem;">
        <img src="${item.thumbnail}" class="card-img-top" alt="${item.item}" style="height: 250px; object-fit: cover;">
        <div class="card-body">
          <h5 class="card-title">${item.item}</h5>
          <p class="card-text">₹${item.price}</p>
          <p class="card-text text-secondary">${item.description}</p>
          <div class="d-flex align-items-center gap-2 ">
          <button onclick="decreaseQty(${item.id})" class="btn btn-sm btn-outline-secondary">–</button>
          <span>${item.quantity}</span>
          <button onclick="increaseQty(${item.id})" class="btn btn-sm btn-outline-secondary">+</button>
          </div>
          <div class=" you-total bg-success text-center p-3 m-2 rounded">Total : ${item.price * item.quantity}</div>
          <button onclick="deleteProduct(${item.id})" class="btn btn-danger btn-sm mt-2 d-flex align-item-center">Remove</button>
          </div>
          </div>
          `;
  });
}

// let yourTotal = document.getElementById("your-total");
// yourTotal.innerText = `Total Amount : $ ${cart.reduce((acc, item) => acc = item.price * item.quantity, 0)}`

function increaseQty(id) {
  let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  const item = cartItems.find(p => p.id === id);
  if (item) item.quantity += 1;
  localStorage.setItem('cart', JSON.stringify(cartItems));
  renderBadge();
  getCartItems();
}

function decreaseQty(id) {
  let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  const item = cartItems.find(p => p.id === id);
  if (item && item.quantity > 1) {
    item.quantity -= 1;
  } else {
    cartItems = cartItems.filter(p => p.id !== id);
  }
  localStorage.setItem('cart', JSON.stringify(cartItems));
  renderBadge();
  getCartItems();
}

function deleteProduct(id) {
  let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cartItems = cartItems.filter(item => item.id !== id);
  localStorage.setItem('cart', JSON.stringify(cartItems));
  renderBadge();
  getCartItems();
}

// Initial render
renderBadge();
getCartItems();