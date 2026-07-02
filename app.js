const catalog = window.ALTERFORM_CATALOG;

if (!catalog) {
  throw new Error("ALTERFORM_CATALOG is missing. Make sure catalog.js is loaded before app.js.");
}

const STAGE_WIDTH = catalog.stage?.width || 700;
const STAGE_HEIGHT = catalog.stage?.height || 1100;

const mannequins = catalog.mannequins || [];
const categories = catalog.categories || [];
const clothes = catalog.items || [];

let selectedMannequin = mannequins[0];
let activeCategory = categories[0]?.id || null;
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
        <span class="card-subtitle">${m.subtitle || "базовий силует"}</span>
      </span>
    </button>
  `).join("");

  els.mannequinList.querySelectorAll("[data-mannequin]").forEach(btn => {
    btn.addEventListener("click", () => {
      selectedMannequin = mannequins.find(m => m.id === btn.dataset.mannequin) || mannequins[0];
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

  if (!categoryItems.length) {
    els.itemsGrid.innerHTML = `<div class="empty-note">У цій категорії поки немає елементів.</div>`;
    return;
  }

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
  if (!item) return;

  const exists = selectedItems.some(i => i.id === itemId);

  if (exists) {
    selectedItems = selectedItems.filter(i => i.id !== itemId);
  } else {
    const replacementKeys = item.replaces?.length ? item.replaces : [item.category];
    selectedItems = selectedItems.filter(existing => {
      const existingKeys = existing.replaces?.length ? existing.replaces : [existing.category];
      return !existingKeys.some(key => replacementKeys.includes(key));
    });
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
          <span class="card-subtitle">${categories.find(c => c.id === item.category)?.name || item.category}</span>
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
    els.savedLooks.innerHTML = `<div class="empty-note">Збережені образи з'являться тут.</div>`;
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

    const layers = [selectedMannequin, ...[...selectedItems].sort((a, b) => a.zIndex - b.zIndex)];
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
