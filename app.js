const STAGE_WIDTH = 700;
const STAGE_HEIGHT = 1100;

const mannequins = [
  {
    id: "muse-light",
    name: "Muse Light",
    subtitle: "м’який fashion-силует",
    image: "assets/mannequins/muse-light.svg"
  },
  {
    id: "andro-form",
    name: "Andro Form",
    subtitle: "андрогінна база",
    image: "assets/mannequins/andro-form.svg"
  },
  {
    id: "noir-curvy",
    name: "Noir Curvy",
    subtitle: "виразніший силует",
    image: "assets/mannequins/noir-curvy.svg"
  }
];

const categories = [
  { id: "hair", name: "Волосся" },
  { id: "makeup", name: "Макіяж" },
  { id: "dress", name: "Сукні" },
  { id: "top", name: "Верх" },
  { id: "bottom", name: "Низ" },
  { id: "shoes", name: "Взуття" },
  { id: "accessory", name: "Аксесуари" }
];

const clothes = [
  { id: "hair-copper", name: "Мідне довге волосся", category: "hair", image: "assets/clothes/hair-copper.svg", zIndex: 70 },
  { id: "hair-noir", name: "Чорна коротка укладка", category: "hair", image: "assets/clothes/hair-noir.svg", zIndex: 70 },
  { id: "hair-blonde", name: "Світла перука", category: "hair", image: "assets/clothes/hair-blonde.svg", zIndex: 70 },

  { id: "makeup-red", name: "Червона помада", category: "makeup", image: "assets/clothes/makeup-red.svg", zIndex: 86 },
  { id: "makeup-smoky", name: "Smoky eyes", category: "makeup", image: "assets/clothes/makeup-smoky.svg", zIndex: 84 },
  { id: "makeup-soft", name: "М’який нюд", category: "makeup", image: "assets/clothes/makeup-soft.svg", zIndex: 84 },

  { id: "dress-black", name: "Чорна сукня Noir", category: "dress", image: "assets/clothes/dress-black.svg", zIndex: 42 },
  { id: "dress-bordeaux", name: "Бордова сукня", category: "dress", image: "assets/clothes/dress-bordeaux.svg", zIndex: 42 },
  { id: "dress-slip", name: "Сатинова сукня", category: "dress", image: "assets/clothes/dress-slip.svg", zIndex: 42 },

  { id: "top-corset", name: "Темний корсет", category: "top", image: "assets/clothes/top-corset.svg", zIndex: 50 },
  { id: "top-silk", name: "Шовкова блуза", category: "top", image: "assets/clothes/top-silk.svg", zIndex: 50 },

  { id: "bottom-skirt", name: "Чорна спідниця", category: "bottom", image: "assets/clothes/bottom-skirt.svg", zIndex: 35 },
  { id: "bottom-trousers", name: "Високі штани", category: "bottom", image: "assets/clothes/bottom-trousers.svg", zIndex: 35 },

  { id: "shoes-heels", name: "Підбори", category: "shoes", image: "assets/clothes/shoes-heels.svg", zIndex: 62 },
  { id: "shoes-boots", name: "Високі чоботи", category: "shoes", image: "assets/clothes/shoes-boots.svg", zIndex: 62 },

  { id: "acc-choker", name: "Чокер", category: "accessory", image: "assets/clothes/acc-choker.svg", zIndex: 92 },
  { id: "acc-glasses", name: "Темні окуляри", category: "accessory", image: "assets/clothes/acc-glasses.svg", zIndex: 94 },
  { id: "acc-earrings", name: "Кільця-сережки", category: "accessory", image: "assets/clothes/acc-earrings.svg", zIndex: 91 }
];

let selectedMannequin = mannequins[0];
let activeCategory = categories[0].id;
let selectedItems = [];

const els = {
  mannequinList: document.getElementById("mannequinList"),
  categoryTabs: document.getElementById("categoryTabs"),
  itemsGrid: document.getElementById("itemsGrid"),
  stage: document.getElementById("stage"),
  selectedList: document.getElementById("selectedList"),
  savedLooks: document.getElementById("savedLooks"),
  itemsTitle: document.getElementById("itemsTitle"),
  lookTitle: document.getElementById("lookTitle"),
  clearBtn: document.getElementById("clearBtn"),
  saveLookBtn: document.getElementById("saveLookBtn"),
  exportBtn: document.getElementById("exportBtn")
};

function render() {
  renderMannequins();
  renderCategories();
  renderItems();
  renderStage();
  renderSelected();
  renderSavedLooks();
}

function renderMannequins() {
  els.mannequinList.innerHTML = mannequins.map(m => `
    <button class="mannequin-card ${m.id === selectedMannequin.id ? "active" : ""}" data-mannequin="${m.id}">
      <img class="thumb" src="${m.image}" alt="${m.name}">
      <span>
        <span class="card-title">${m.name}</span>
        <span class="card-subtitle">${m.subtitle}</span>
      </span>
    </button>
  `).join("");

  els.mannequinList.querySelectorAll("[data-mannequin]").forEach(btn => {
    btn.addEventListener("click", () => {
      selectedMannequin = mannequins.find(m => m.id === btn.dataset.mannequin);
      selectedItems = [];
      toast("Манекен змінено. Шари очищено.");
      render();
    });
  });
}

function renderCategories() {
  els.categoryTabs.innerHTML = categories.map(c => `
    <button class="category-tab ${c.id === activeCategory ? "active" : ""}" data-category="${c.id}">${c.name}</button>
  `).join("");

  els.categoryTabs.querySelectorAll("[data-category]").forEach(btn => {
    btn.addEventListener("click", () => {
      activeCategory = btn.dataset.category;
      renderCategories();
      renderItems();
    });
  });
}

function renderItems() {
  const category = categories.find(c => c.id === activeCategory);
  const categoryItems = clothes.filter(item => item.category === activeCategory);
  els.itemsTitle.textContent = category?.name || "Елементи";

  els.itemsGrid.innerHTML = categoryItems.map(item => `
    <button class="item-card ${selectedItems.some(i => i.id === item.id) ? "active" : ""}" data-item="${item.id}">
      <img class="item-preview" src="${item.image}" alt="${item.name}">
      <div class="item-name">${item.name}</div>
      <div class="item-meta">шар ${item.zIndex}</div>
    </button>
  `).join("");

  els.itemsGrid.querySelectorAll("[data-item]").forEach(btn => {
    btn.addEventListener("click", () => toggleItem(btn.dataset.item));
  });
}

function toggleItem(itemId) {
  const item = clothes.find(i => i.id === itemId);
  const exists = selectedItems.some(i => i.id === itemId);

  if (exists) {
    selectedItems = selectedItems.filter(i => i.id !== itemId);
  } else {
    selectedItems = selectedItems.filter(i => i.category !== item.category);
    selectedItems.push(item);
  }

  renderItems();
  renderStage();
  renderSelected();
}

function renderStage() {
  const sorted = [...selectedItems].sort((a, b) => a.zIndex - b.zIndex);
  els.stage.innerHTML = `
    <img class="layer" src="${selectedMannequin.image}" style="z-index: 10" alt="Манекен">
    ${sorted.map(item => `<img class="layer" src="${item.image}" style="z-index: ${item.zIndex}" alt="${item.name}">`).join("")}
  `;
  els.lookTitle.textContent = `${selectedMannequin.name} / ${selectedItems.length} шарів`;
}

function renderSelected() {
  if (!selectedItems.length) {
    els.selectedList.innerHTML = `<div class="empty-note">Поки що шарів немає. Обери категорію і додай перший елемент.</div>`;
    return;
  }

  els.selectedList.innerHTML = [...selectedItems]
    .sort((a, b) => b.zIndex - a.zIndex)
    .map(item => `
      <div class="selected-row">
        <span>
          <span class="card-title">${item.name}</span>
          <span class="card-subtitle">${categories.find(c => c.id === item.category)?.name}</span>
        </span>
        <button title="Прибрати" data-remove="${item.id}">×</button>
      </div>
    `).join("");

  els.selectedList.querySelectorAll("[data-remove]").forEach(btn => {
    btn.addEventListener("click", () => {
      selectedItems = selectedItems.filter(i => i.id !== btn.dataset.remove);
      renderItems();
      renderStage();
      renderSelected();
    });
  });
}

function clearLook() {
  selectedItems = [];
  toast("Образ очищено");
  renderItems();
  renderStage();
  renderSelected();
}

function getSavedLooks() {
  try {
    return JSON.parse(localStorage.getItem("alterform.looks") || "[]");
  } catch {
    return [];
  }
}

function saveLook() {
  const looks = getSavedLooks();
  const name = `Образ ${looks.length + 1}`;
  looks.unshift({
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    name,
    createdAt: new Date().toISOString(),
    mannequinId: selectedMannequin.id,
    itemIds: selectedItems.map(i => i.id)
  });
  localStorage.setItem("alterform.looks", JSON.stringify(looks.slice(0, 12)));
  toast("Образ збережено в браузері");
  renderSavedLooks();
}

function renderSavedLooks() {
  const looks = getSavedLooks();
  if (!looks.length) {
    els.savedLooks.innerHTML = `<div class="empty-note">Збережені образи з’являться тут.</div>`;
    return;
  }

  els.savedLooks.innerHTML = looks.map(look => `
    <button class="saved-card" data-look="${look.id}">
      <span>
        <span class="card-title">${look.name}</span>
        <span class="card-subtitle">${new Date(look.createdAt).toLocaleString("uk-UA", { dateStyle: "short", timeStyle: "short" })}</span>
      </span>
    </button>
  `).join("");

  els.savedLooks.querySelectorAll("[data-look]").forEach(btn => {
    btn.addEventListener("click", () => loadLook(btn.dataset.look));
  });
}

function loadLook(id) {
  const look = getSavedLooks().find(l => l.id === id);
  if (!look) return;
  selectedMannequin = mannequins.find(m => m.id === look.mannequinId) || mannequins[0];
  selectedItems = look.itemIds.map(id => clothes.find(item => item.id === id)).filter(Boolean);
  toast("Образ завантажено");
  render();
}

async function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

async function exportPng() {
  try {
    const canvas = document.createElement("canvas");
    canvas.width = STAGE_WIDTH;
    canvas.height = STAGE_HEIGHT;
    const ctx = canvas.getContext("2d");

    const gradient = ctx.createLinearGradient(0, 0, STAGE_WIDTH, STAGE_HEIGHT);
    gradient.addColorStop(0, "#1a1223");
    gradient.addColorStop(1, "#09070d");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, STAGE_WIDTH, STAGE_HEIGHT);

    const layers = [selectedMannequin, ...selectedItems.sort((a, b) => a.zIndex - b.zIndex)];
    for (const layer of layers) {
      const img = await loadImage(layer.image);
      ctx.drawImage(img, 0, 0, STAGE_WIDTH, STAGE_HEIGHT);
    }

    const link = document.createElement("a");
    link.download = `alterform-${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    toast("PNG експортовано");
  } catch (error) {
    console.error(error);
    toast("Не вдалося експортувати PNG");
  }
}

function toast(message) {
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();
  const node = document.createElement("div");
  node.className = "toast";
  node.textContent = message;
  document.body.appendChild(node);
  requestAnimationFrame(() => node.classList.add("show"));
  setTimeout(() => {
    node.classList.remove("show");
    setTimeout(() => node.remove(), 240);
  }, 2100);
}

els.clearBtn.addEventListener("click", clearLook);
els.saveLookBtn.addEventListener("click", saveLook);
els.exportBtn.addEventListener("click", exportPng);

render();
