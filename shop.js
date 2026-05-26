// Navigationslinks
let navItems = [
  { label: "Startseite", href: "#hero" },
  { label: "Kategorien", href: "#categories" },
  { label: "Produkte",   href: "#products" }
];

function buildNav() {
  let ul = document.getElementById("nav-links");
  for (let i = 0; i < navItems.length; i++) {
    let li = document.createElement("li");
    let a  = document.createElement("a");
    a.href        = navItems[i].href;
    a.textContent = navItems[i].label;
    li.appendChild(a);
    ul.appendChild(li);
  }
}

buildNav();


// Theme umschalten
let darkMode = false;
let themeBtn = document.getElementById("theme-btn");

themeBtn.addEventListener("click", function() {
  darkMode = !darkMode;
  if (darkMode) {
    document.body.classList.add("dark");
    themeBtn.textContent = "☀️";
  } else {
    document.body.classList.remove("dark");
    themeBtn.textContent = "🌙";
  }
});


// Kategorien
let categories = [
  { icon: "🎧", name: "Audio" },
  { icon: "💻", name: "Laptops" },
  { icon: "📱", name: "Smartphones" },
  { icon: "⌨️", name: "Zubehör" },
  { icon: "📷", name: "Kameras" },
  { icon: "🖥️", name: "Monitore" }
];

function buildCategories() {
  let container = document.getElementById("categories-list");
  for (let i = 0; i < categories.length; i++) {
    let cat = categories[i];

    let card = document.createElement("div");
    card.className = "category-card";

    let icon = document.createElement("div");
    icon.className   = "cat-icon";
    icon.textContent = cat.icon;

    let name = document.createElement("div");
    name.className   = "cat-name";
    name.textContent = cat.name;

    card.appendChild(icon);
    card.appendChild(name);

    // Klick filtert die Produkte nach Kategorie
    card.addEventListener("click", function() {
      filterProducts(cat.name);
      // aktiven Filter-Button setzen
      let btns = document.querySelectorAll(".filter-btn");
      for (let j = 0; j < btns.length; j++) {
        btns[j].classList.remove("active");
        if (btns[j].dataset.filter === cat.name) {
          btns[j].classList.add("active");
        }
      }
      document.getElementById("products").scrollIntoView({ behavior: "smooth" });
    });

    container.appendChild(card);
  }
}

buildCategories();


// Produkte
let products = [
  {
    id: 1,
    icon:     "🎧",
    bg:       "#e0f2fe",
    category: "Audio",
    name:     "Kopfhörer SoundX 200",
    price:    49.90,
    oldPrice: 75.00,
    rating:   4.8,
    reviews:  312,
    badge:    "–34%"
  },
  {
    id: 2,
    icon:     "💻",
    bg:       "#ede9fe",
    category: "Laptops",
    name:     "ProBook Slim 14",
    price:    699.00,
    oldPrice: 849.00,
    rating:   4.6,
    reviews:  87,
    badge:    "–18%"
  },
  {
    id: 3,
    icon:     "📱",
    bg:       "#dcfce7",
    category: "Smartphones",
    name:     "Nova Phone 12",
    price:    399.00,
    oldPrice: null,
    rating:   4.5,
    reviews:  204,
    badge:    "NEU"
  },
  {
    id: 4,
    icon:     "⌨️",
    bg:       "#fef9c3",
    category: "Zubehör",
    name:     "MechKey Pro Tastatur",
    price:    89.90,
    oldPrice: 120.00,
    rating:   4.9,
    reviews:  560,
    badge:    "–25%"
  },
  {
    id: 5,
    icon:     "📷",
    bg:       "#ffe4e6",
    category: "Kameras",
    name:     "SnapShot Cam 4K",
    price:    299.00,
    oldPrice: 380.00,
    rating:   4.7,
    reviews:  145,
    badge:    "–21%"
  },
  {
    id: 6,
    icon:     "🖥️",
    bg:       "#f0fdf4",
    category: "Monitore",
    name:     "ViewMax 27\" QHD",
    price:    259.00,
    oldPrice: null,
    rating:   4.4,
    reviews:  93,
    badge:    "NEU"
  },
  {
    id: 7,
    icon:     "🎧",
    bg:       "#fef3c7",
    category: "Audio",
    name:     "BassBoost Earbuds",
    price:    29.90,
    oldPrice: 49.90,
    rating:   4.3,
    reviews:  421,
    badge:    "–40%"
  },
  {
    id: 8,
    icon:     "💻",
    bg:       "#e0e7ff",
    category: "Laptops",
    name:     "GameForce 15 Pro",
    price:    1199.00,
    oldPrice: 1399.00,
    rating:   4.8,
    reviews:  62,
    badge:    "–14%"
  }
];

// Aktuell sichtbare Produkte (für Filterung)
let visibleProducts = products;

function formatPrice(price) {
  return price.toFixed(2).replace(".", ",") + " €";
}

function renderStars(rating) {
  let full  = Math.floor(rating);
  let stars = "";
  for (let i = 0; i < full; i++) {
    stars += "★";
  }
  if (rating % 1 >= 0.5) stars += "½";
  return stars;
}

function buildProductCard(p) {
  let card = document.createElement("div");
  card.className    = "product-card";
  card.dataset.id   = p.id;
  card.dataset.cat  = p.category;

  // Vorschaubild
  let thumb = document.createElement("div");
  thumb.className        = "product-thumb";
  thumb.style.background = p.bg;
  thumb.textContent      = p.icon;

  if (p.badge) {
    let badge = document.createElement("span");
    badge.className   = "product-badge";
    badge.textContent = p.badge;
    thumb.appendChild(badge);
  }

  // Info
  let body = document.createElement("div");
  body.className = "product-body";

  let cat = document.createElement("div");
  cat.className   = "product-category";
  cat.textContent = p.category;

  let name = document.createElement("div");
  name.className   = "product-name";
  name.textContent = p.name;

  let rating = document.createElement("div");
  rating.className = "product-rating";
  rating.innerHTML = "<span class='product-stars'>" + renderStars(p.rating) + "</span> " + p.rating + " (" + p.reviews + ")";

  let priceRow = document.createElement("div");
  priceRow.className = "product-price-row";

  let price = document.createElement("span");
  price.className   = "product-price";
  price.textContent = formatPrice(p.price);

  priceRow.appendChild(price);

  if (p.oldPrice) {
    let oldPrice = document.createElement("span");
    oldPrice.className   = "product-price-old";
    oldPrice.textContent = formatPrice(p.oldPrice);
    priceRow.appendChild(oldPrice);
  }

  body.appendChild(cat);
  body.appendChild(name);
  body.appendChild(rating);
  body.appendChild(priceRow);

  // Kaufen-Button
  let footer = document.createElement("div");
  footer.className = "product-footer";

  let btn = document.createElement("button");
  btn.className   = "btn-add";
  btn.textContent = "🛒 In den Warenkorb";
  btn.addEventListener("click", function() {
    addToCart(p);
  });

  footer.appendChild(btn);

  card.appendChild(thumb);
  card.appendChild(body);
  card.appendChild(footer);

  return card;
}

function renderProducts(list) {
  let container = document.getElementById("products-list");
  container.innerHTML = ""; // leeren
  for (let i = 0; i < list.length; i++) {
    container.appendChild(buildProductCard(list[i]));
  }
}

renderProducts(products);


// Filter-Buttons aufbauen
function buildFilters() {
  let filtersDiv = document.querySelector(".filters");

  // eindeutige Kategorien sammeln
  let cats = [];
  for (let i = 0; i < products.length; i++) {
    if (cats.indexOf(products[i].category) === -1) {
      cats.push(products[i].category);
    }
  }

  for (let i = 0; i < cats.length; i++) {
    let btn = document.createElement("button");
    btn.className       = "filter-btn";
    btn.textContent     = cats[i];
    btn.dataset.filter  = cats[i];
    btn.addEventListener("click", function() {
      filterProducts(cats[i]);
      setActiveFilter(btn);
    });
    filtersDiv.appendChild(btn);
  }

  // "Alle" Button
  document.querySelector("[data-filter='all']").addEventListener("click", function() {
    filterProducts("all");
    setActiveFilter(this);
  });
}

buildFilters();

function setActiveFilter(activeBtn) {
  let btns = document.querySelectorAll(".filter-btn");
  for (let i = 0; i < btns.length; i++) {
    btns[i].classList.remove("active");
  }
  activeBtn.classList.add("active");
}

function filterProducts(cat) {
  if (cat === "all") {
    renderProducts(products);
  } else {
    let filtered = [];
    for (let i = 0; i < products.length; i++) {
      if (products[i].category === cat) {
        filtered.push(products[i]);
      }
    }
    renderProducts(filtered);
  }
}


// Warenkorb
let cart = []; // Array von { product, qty }

function addToCart(product) {
  // prüfen ob schon drin
  let found = false;
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].product.id === product.id) {
      cart[i].qty++;
      found = true;
      break;
    }
  }
  if (!found) {
    cart.push({ product: product, qty: 1 });
  }

  updateCartCount();
  renderCartItems();
  showToast("✅ " + product.name + " hinzugefügt!");
}

function removeFromCart(productId) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].product.id === productId) {
      cart.splice(i, 1);
      break;
    }
  }
  updateCartCount();
  renderCartItems();
}

function changeCartQty(productId, delta) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].product.id === productId) {
      cart[i].qty += delta;
      if (cart[i].qty <= 0) {
        cart.splice(i, 1);
      }
      break;
    }
  }
  updateCartCount();
  renderCartItems();
}

function updateCartCount() {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total += cart[i].qty;
  }
  document.getElementById("cart-count").textContent = total;
}

function calcTotal() {
  let sum = 0;
  for (let i = 0; i < cart.length; i++) {
    sum += cart[i].product.price * cart[i].qty;
  }
  return sum;
}

function renderCartItems() {
  let container = document.getElementById("cart-items");
  container.innerHTML = "";

  if (cart.length === 0) {
    let empty = document.createElement("p");
    empty.className   = "cart-empty";
    empty.textContent = "Dein Warenkorb ist leer 🛒";
    container.appendChild(empty);
    document.getElementById("cart-total").textContent = "0,00 €";
    return;
  }

  for (let i = 0; i < cart.length; i++) {
    let item = cart[i];

    let div = document.createElement("div");
    div.className = "cart-item";

    let icon = document.createElement("div");
    icon.className   = "cart-item-icon";
    icon.textContent = item.product.icon;

    let info = document.createElement("div");
    info.className = "cart-item-info";

    let name = document.createElement("div");
    name.className   = "cart-item-name";
    name.textContent = item.product.name;

    let price = document.createElement("div");
    price.className   = "cart-item-price";
    price.textContent = formatPrice(item.product.price * item.qty);

    info.appendChild(name);
    info.appendChild(price);

    // Menge ändern
    let qtyDiv = document.createElement("div");
    qtyDiv.className = "cart-item-qty";

    let btnMinus = document.createElement("button");
    btnMinus.textContent = "−";

    // Closure mit let – i bleibt korrekt
    let productId = item.product.id;
    btnMinus.addEventListener("click", function() {
      changeCartQty(productId, -1);
    });

    let qtySpan = document.createElement("span");
    qtySpan.textContent = item.qty;

    let btnPlus = document.createElement("button");
    btnPlus.textContent = "+";
    btnPlus.addEventListener("click", function() {
      changeCartQty(productId, 1);
    });

    qtyDiv.appendChild(btnMinus);
    qtyDiv.appendChild(qtySpan);
    qtyDiv.appendChild(btnPlus);

    div.appendChild(icon);
    div.appendChild(info);
    div.appendChild(qtyDiv);
    container.appendChild(div);
  }

  // Gesamtpreis
  document.getElementById("cart-total").textContent = formatPrice(calcTotal());
}

// Warenkorb öffnen/schließen
document.getElementById("cart-btn").addEventListener("click", function() {
  document.getElementById("cart-overlay").classList.remove("hidden");
  renderCartItems();
});

document.getElementById("cart-close").addEventListener("click", function() {
  document.getElementById("cart-overlay").classList.add("hidden");
});

document.getElementById("cart-overlay").addEventListener("click", function(e) {
  // Schließen bei Klick außerhalb des Panels
  if (e.target === this) {
    this.classList.add("hidden");
  }
});

// Zur Kasse
document.getElementById("checkout-btn").addEventListener("click", function() {
  if (cart.length === 0) {
    showToast("⚠️ Warenkorb ist leer!");
    return;
  }
  cart = [];
  updateCartCount();
  renderCartItems();
  document.getElementById("cart-overlay").classList.add("hidden");
  showToast("🎉 Bestellung aufgegeben! Danke fürs Einkaufen.");
});


// Toast-Benachrichtigung
function showToast(message) {
  let toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.remove("hidden");
  setTimeout(function() {
    toast.classList.add("hidden");
  }, 2800);
}
