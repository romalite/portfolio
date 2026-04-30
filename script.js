// Navigationslinks
let navItems = [
  { label: "Über mich",  href: "#hero" },
  { label: "Kenntnisse", href: "#skills" },
  { label: "Projekte",   href: "#projects" },
  { label: "Shop",       href: "#product" },
  { label: "Kontakt",    href: "#contacts" }
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


// Dunkles/helles Theme
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


// Name buchstabenweise eintippen
let fullName  = "Roman Hrebennikov";
let nameEl    = document.getElementById("name-typed");
let charIndex = 0;

function typeName() {
  if (charIndex < fullName.length) {
    nameEl.textContent += fullName[charIndex];
    charIndex++;
    setTimeout(typeName, 120);
  }
}

setTimeout(typeName, 500); // kurze Verzögerung vor dem Start


// Daten für Kenntnisse
let skills = [
  { icon: "🌐", name: "HTML / CSS",},
  { icon: "⚡", name: "JavaScript",},
  { icon: "⚛️", name: "React", },
  { icon: "🛠",  name: "Git",},
  { icon: "🐍", name: "Python",},
  { icon: "</>", name: "VScode",},
  { icon: "♨️", name: "Java",},
];

function buildSkills() {
  let container = document.getElementById("skills-list");
  for (let i = 0; i < skills.length; i++) {
    let s = skills[i];

    let card = document.createElement("div");
    card.className = "skill-card";

    let icon = document.createElement("div");
    icon.className   = "icon";
    icon.textContent = s.icon;

    let name = document.createElement("h3");
    name.textContent = s.name;

    let bg = document.createElement("div");
  

    let fill = document.createElement("div");
    fill.className     = "progress-fill";
    fill.dataset.level = s.level; // für die Animation gespeichert

    bg.appendChild(fill);
    card.appendChild(icon);
    card.appendChild(name);
    card.appendChild(bg);
    container.appendChild(card);
  }
}

buildSkills();


// Fortschrittsbalken beim Scrollen animieren
function animateBars() {
  let bars = document.querySelectorAll(".progress-fill");
  for (let i = 0; i < bars.length; i++) {
    let bar    = bars[i];
    let rect   = bar.getBoundingClientRect();
    let inView = rect.top < window.innerHeight - 50;
    if (inView && bar.style.width === "") {
      bar.style.width = bar.dataset.level + "%";
    }
  }
}

window.addEventListener("scroll", animateBars);
animateBars(); // direkt beim Laden prüfen


// Daten für Projekte
let projects = [
  {
    emoji: "🛒",
    bg:    "#e0f2fe",
    name:  "Online-Shop",
    desc:  "Einfacher Shop mit HTML/CSS/JS und Warenkorb",
    link:  "#"
  },
  {
    emoji: "📋",
    bg:    "#dcfce7",
    name:  "To-Do-App",
    desc:  "Aufgabenliste mit Speicherung im localStorage",
    link:  "#"
  },
  {
    emoji: "🌤",
    bg:    "#fef9c3",
    name:  "Wetter-Widget",
    desc:  "Zeigt das Wetter per Stadtname über eine API an",
    link:  "#"
  }
];

function buildProjects() {
  let container = document.getElementById("projects-list");
  for (let i = 0; i < projects.length; i++) {
    let p = projects[i];

    let card = document.createElement("div");
    card.className = "project-card";

    let thumb = document.createElement("div");
    thumb.className        = "project-thumb";
    thumb.style.background = p.bg;
    thumb.textContent      = p.emoji;

    let body = document.createElement("div");
    body.className = "project-body";

    let h3 = document.createElement("h3");
    h3.textContent = p.name;

    let desc = document.createElement("p");
    desc.textContent = p.desc;

    let link = document.createElement("a");
    link.href        = p.link;
    link.textContent = "Ansehen →";

    body.appendChild(h3);
    body.appendChild(desc);
    body.appendChild(link);
    card.appendChild(thumb);
    card.appendChild(body);
    container.appendChild(card);
  }
}

buildProjects();


// Produktkarte
let product = {
  name:     "Kopfhörer SoundX 200",
  price:    "49,90 €",
  oldPrice: "75,00 €",
  desc:     "Kabellose Kopfhörer mit gutem Klang und 20 Stunden Akkulaufzeit. Bequem, leicht – ideal für Sport und Arbeit.",
  images:   ["🎧", "🎵", "📦"]
};

let currentQty   = 1;
let currentImage = 0;

function buildProductCard() {
  let container = document.getElementById("product-card");

  // Bildbereich
  let imgBlock = document.createElement("div");
  imgBlock.className = "product-img-block";

  let mainImg = document.createElement("div");
  mainImg.className   = "product-main-img";
  mainImg.id          = "main-img";
  mainImg.textContent = product.images[0];

  let thumbsRow = document.createElement("div");
  thumbsRow.className = "product-thumbs-row";

  for (let i = 0; i < product.images.length; i++) {
    let thumb = document.createElement("div");
    thumb.className   = "product-thumb";
    thumb.textContent = product.images[i];
    if (i === 0) thumb.classList.add("active");

    // let hält sein eigenes i pro Iteration – kein Closure nötig
    thumb.addEventListener("click", function() {
      document.getElementById("main-img").textContent = product.images[i];
      document.querySelectorAll(".product-thumb").forEach(function(t) {
        t.classList.remove("active");
      });
      thumb.classList.add("active");
    });

    thumbsRow.appendChild(thumb);
  }

  imgBlock.appendChild(mainImg);
  imgBlock.appendChild(thumbsRow);

  // Detailbereich
  let details = document.createElement("div");
  details.className = "product-details";

  let title = document.createElement("h3");
  title.textContent = product.name;

  let price = document.createElement("div");
  price.className   = "product-price";
  price.textContent = product.price;

  let oldPrice = document.createElement("div");
  oldPrice.className   = "product-price-old";
  oldPrice.textContent = product.oldPrice;

  let desc = document.createElement("p");
  desc.textContent = product.desc;

  // Mengenauswahl
  let qtyRow = document.createElement("div");
  qtyRow.className = "qty-row";

  let btnMinus = document.createElement("button");
  btnMinus.textContent = "−";
  btnMinus.addEventListener("click", function() {
    if (currentQty > 1) {
      currentQty--;
      document.getElementById("qty-display").textContent = currentQty;
    }
  });

  let qtyDisplay = document.createElement("span");
  qtyDisplay.id          = "qty-display";
  qtyDisplay.textContent = currentQty;

  let btnPlus = document.createElement("button");
  btnPlus.textContent = "+";
  btnPlus.addEventListener("click", function() {
    currentQty++;
    document.getElementById("qty-display").textContent = currentQty;
  });

  qtyRow.appendChild(btnMinus);
  qtyRow.appendChild(qtyDisplay);
  qtyRow.appendChild(btnPlus);

  // Kaufen-Button
  let buyBtn = document.createElement("button");
  buyBtn.className   = "btn";
  buyBtn.textContent = "🛒 In den Warenkorb";

  let cartMsg = document.createElement("div");
  cartMsg.className = "cart-msg";

  buyBtn.addEventListener("click", function() {
    cartMsg.textContent = "✅ " + currentQty + " Stk. in den Warenkorb gelegt!";
    setTimeout(function() {
      cartMsg.textContent = "";
    }, 3000);
  });

  details.appendChild(title);
  details.appendChild(price);
  details.appendChild(oldPrice);
  details.appendChild(desc);
  details.appendChild(qtyRow);
  details.appendChild(buyBtn);
  details.appendChild(cartMsg);

  container.appendChild(imgBlock);
  container.appendChild(details);
}

buildProductCard();


// Kontaktformular
let contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", function(e) {
  e.preventDefault();

  let name   = document.getElementById("form-name").value;
  let result = document.getElementById("form-result");

  result.textContent = "Danke, " + name + "! Ich melde mich bald 👋";
  contactForm.reset();

  setTimeout(function() {
    result.textContent = "";
  }, 4000);
});
