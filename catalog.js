window.ALTERFORM_CATALOG = {
  stage: {
    width: 700,
    height: 1100
  },

  mannequins: [
    {
      id: "muse-light",
      name: "Muse Light",
      subtitle: "стрункий жіночний силует",
      image: "assets/mannequins/muse-light.svg"
    },
    {
      id: "andro-form",
      name: "Andro Form",
      subtitle: "андрогінний силует",
      image: "assets/mannequins/andro-form.svg"
    },
    {
      id: "noir-curvy",
      name: "Noir Curvy",
      subtitle: "виразний curvy-силует",
      image: "assets/mannequins/noir-curvy.svg"
    }
  ],

  categories: [
    { id: "hair", name: "Волосся" },
    { id: "makeup", name: "Макіяж" },
    { id: "dress", name: "Сукні" },
    { id: "top", name: "Верх" },
    { id: "bottom", name: "Низ" },
    { id: "shoes", name: "Взуття" },
    { id: "accessory", name: "Аксесуари" }
  ],

  items: [
    {
      id: "hair-copper",
      name: "Мідне довге пряме",
      category: "hair",
      image: "assets/clothes/hair-copper.svg",
      zIndex: 70,
      replaces: ["hair"]
    },
    {
      id: "hair-noir",
      name: "Темний короткий боб",
      category: "hair",
      image: "assets/clothes/hair-noir.svg",
      zIndex: 70,
      replaces: ["hair"]
    },
    {
      id: "hair-blonde",
      name: "Світлі довгі хвилі",
      category: "hair",
      image: "assets/clothes/hair-blonde.svg",
      zIndex: 70,
      replaces: ["hair"]
    },

    {
      id: "makeup-red",
      name: "Червона помада",
      category: "makeup",
      image: "assets/clothes/makeup-red.svg",
      zIndex: 86,
      replaces: ["makeup"]
    },
    {
      id: "makeup-smoky",
      name: "Smoky eyes",
      category: "makeup",
      image: "assets/clothes/makeup-smoky.svg",
      zIndex: 84,
      replaces: ["makeup"]
    },
    {
      id: "makeup-soft",
      name: "М'який nude-макіяж",
      category: "makeup",
      image: "assets/clothes/makeup-soft.svg",
      zIndex: 84,
      replaces: ["makeup"]
    },

    {
      id: "dress-black",
      name: "Black Noir Dress",
      category: "dress",
      image: "assets/clothes/dress-black.svg",
      zIndex: 42,
      replaces: ["dress", "top", "bottom"]
    },
    {
      id: "dress-bordeaux",
      name: "Burgundy Satin Slip Dress",
      category: "dress",
      image: "assets/clothes/dress-bordeaux.svg",
      zIndex: 42,
      replaces: ["dress", "top", "bottom"]
    },
    {
      id: "dress-slip",
      name: "Soft Satin Slip Dress",
      category: "dress",
      image: "assets/clothes/dress-slip.svg",
      zIndex: 42,
      replaces: ["dress", "top", "bottom"]
    },

    {
      id: "top-corset",
      name: "Dark Corset Top",
      category: "top",
      image: "assets/clothes/top-corset.svg",
      zIndex: 50,
      replaces: ["dress", "top"]
    },
    {
      id: "top-silk",
      name: "Ivory Silk Blouse",
      category: "top",
      image: "assets/clothes/top-silk.svg",
      zIndex: 50,
      replaces: ["dress", "top"]
    },

    {
      id: "bottom-skirt",
      name: "Black Pleated Skirt",
      category: "bottom",
      image: "assets/clothes/bottom-skirt.svg",
      zIndex: 35,
      replaces: ["dress", "bottom"]
    },
    {
      id: "bottom-trousers",
      name: "High-Waisted Tailored Trousers",
      category: "bottom",
      image: "assets/clothes/bottom-trousers.svg",
      zIndex: 35,
      replaces: ["dress", "bottom"]
    },

    {
      id: "shoes-heels",
      name: "Classic Heels",
      category: "shoes",
      image: "assets/clothes/shoes-heels.svg",
      zIndex: 62,
      replaces: ["shoes"]
    },
    {
      id: "shoes-boots",
      name: "High Boots",
      category: "shoes",
      image: "assets/clothes/shoes-boots.svg",
      zIndex: 62,
      replaces: ["shoes"]
    },

    {
      id: "acc-choker",
      name: "Black Choker",
      category: "accessory",
      image: "assets/clothes/acc-choker.svg",
      zIndex: 92,
      replaces: ["necklace"]
    },
    {
      id: "acc-glasses",
      name: "Dark Sunglasses",
      category: "accessory",
      image: "assets/clothes/acc-glasses.svg",
      zIndex: 94,
      replaces: ["glasses"]
    },
    {
      id: "acc-earrings",
      name: "Hoop Earrings",
      category: "accessory",
      image: "assets/clothes/acc-earrings.svg",
      zIndex: 91,
      replaces: ["earrings"]
    }
  ]
};
