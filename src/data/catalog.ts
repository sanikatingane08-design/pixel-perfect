export type Diet = "vegan" | "keto" | "gluten-free" | "high-protein";

export type Product = {
  id: string;
  name: string;
  brand: string;
  emoji: string;
  unit: string;
  variants: string[];
  price: number;
  mrp: number;
  category: string;
  rating: number;
  eta: string;
  veg: boolean;
  diets: Diet[];
  description: string;
  nutrition: { label: string; value: string }[];
  ai: { health: number; bestFor: string; substitutes: string[] };
  reason?: string;
};

export type Category = { slug: string; name: string; emoji: string; tint: string };

export const categories: Category[] = [
  { slug: "fruits-veg", name: "Fruits & Veg", emoji: "🥦", tint: "var(--tint-green)" },
  { slug: "dairy", name: "Dairy & Eggs", emoji: "🥛", tint: "var(--tint-yellow)" },
  { slug: "snacks", name: "Snacks", emoji: "🍿", tint: "var(--tint-coral)" },
  { slug: "beverages", name: "Beverages", emoji: "🧃", tint: "var(--tint-green)" },
  { slug: "staples", name: "Staples", emoji: "🍚", tint: "var(--tint-yellow)" },
  { slug: "bakery", name: "Bakery", emoji: "🥐", tint: "var(--tint-coral)" },
  { slug: "meat-fish", name: "Meat & Fish", emoji: "🐟", tint: "var(--tint-green)" },
  { slug: "personal-care", name: "Personal Care", emoji: "🧼", tint: "var(--tint-yellow)" },
  { slug: "household", name: "Household", emoji: "🧹", tint: "var(--tint-coral)" },
  { slug: "baby", name: "Baby Care", emoji: "🍼", tint: "var(--tint-green)" },
];

const n = (label: string, value: string) => ({ label, value });

function make(
  id: string,
  name: string,
  brand: string,
  emoji: string,
  unit: string,
  price: number,
  mrp: number,
  category: string,
  opts: Partial<Product> = {},
): Product {
  return {
    id,
    name,
    brand,
    emoji,
    unit,
    variants: [unit],
    price,
    mrp,
    category,
    rating: 4.3,
    eta: "10 mins",
    veg: true,
    diets: [],
    description: `${name} from ${brand}, handpicked and quality-checked at our nearest FreshNest store before it reaches your door.`,
    nutrition: [n("Energy", "112 kcal"), n("Protein", "3.1 g"), n("Carbs", "14 g"), n("Fat", "2.4 g")],
    ai: { health: 78, bestFor: "Everyday cooking", substitutes: [] },
    ...opts,
  };
}

export const products: Product[] = [
  make("p1", "Baby Spinach", "FarmNest", "🥬", "250 g", 39, 55, "fruits-veg", {
    variants: ["250 g", "500 g"],
    diets: ["vegan", "keto", "gluten-free"],
    rating: 4.6,
    ai: { health: 96, bestFor: "Iron-rich salads", substitutes: ["Kale", "Methi leaves"] },
    reason: "You buy this weekly",
  }),
  make("p2", "Alphonso Mangoes", "Orchard Co.", "🥭", "1 kg", 249, 349, "fruits-veg", {
    variants: ["500 g", "1 kg", "2 kg"],
    diets: ["vegan", "gluten-free"],
    rating: 4.8,
    ai: { health: 82, bestFor: "Smoothies & desserts", substitutes: ["Kesar mango", "Papaya"] },
  }),
  make("p3", "Hass Avocado", "Orchard Co.", "🥑", "2 pcs", 189, 240, "fruits-veg", {
    diets: ["vegan", "keto", "gluten-free"],
    rating: 4.4,
    ai: { health: 91, bestFor: "Keto breakfast toast", substitutes: ["Olive oil", "Nut butter"] },
    reason: "Goes well with your cart",
  }),
  make("p4", "Cherry Tomatoes", "FarmNest", "🍅", "400 g", 59, 79, "fruits-veg", {
    diets: ["vegan", "keto", "gluten-free"],
  }),
  make("p5", "Farm Fresh Milk", "Meadow", "🥛", "1 L", 66, 72, "dairy", {
    variants: ["500 ml", "1 L"],
    diets: ["high-protein"],
    rating: 4.7,
    ai: { health: 74, bestFor: "Morning coffee", substitutes: ["Oat milk", "Almond milk"] },
    reason: "Running low, usually reordered now",
  }),
  make("p6", "Organic Brown Eggs", "Meadow", "🥚", "6 pcs", 89, 110, "dairy", {
    variants: ["6 pcs", "12 pcs"],
    veg: false,
    diets: ["keto", "high-protein", "gluten-free"],
    rating: 4.9,
    ai: { health: 88, bestFor: "High-protein breakfast", substitutes: ["Paneer", "Tofu"] },
  }),
  make("p7", "Greek Yogurt", "Meadow", "🍶", "400 g", 119, 149, "dairy", {
    diets: ["high-protein", "keto"],
    ai: { health: 85, bestFor: "Post-workout snack", substitutes: ["Curd", "Skyr"] },
  }),
  make("p8", "Artisan Paneer", "Meadow", "🧈", "200 g", 94, 120, "dairy", {
    diets: ["high-protein", "keto"],
  }),
  make("p9", "Sea Salt Potato Chips", "Crunchlab", "🥔", "90 g", 45, 60, "snacks", {
    diets: ["vegan"],
    ai: { health: 38, bestFor: "Movie night", substitutes: ["Baked makhana", "Roasted chana"] },
  }),
  make("p10", "Roasted Makhana", "Crunchlab", "🌰", "120 g", 139, 180, "snacks", {
    diets: ["vegan", "gluten-free", "high-protein"],
    rating: 4.5,
    ai: { health: 80, bestFor: "Guilt-free munching", substitutes: ["Popcorn", "Almonds"] },
    reason: "Trending in your area",
  }),
  make("p11", "Dark Chocolate 70%", "Cacao Street", "🍫", "100 g", 165, 220, "snacks", {
    diets: ["vegan", "gluten-free"],
  }),
  make("p12", "Butter Cookies", "Crunchlab", "🍪", "200 g", 75, 99, "snacks"),
  make("p13", "Cold Pressed Orange Juice", "Squeeze", "🧃", "750 ml", 129, 160, "beverages", {
    diets: ["vegan", "gluten-free"],
    rating: 4.6,
  }),
  make("p14", "Sparkling Water Lime", "Squeeze", "🥤", "4 x 300 ml", 149, 199, "beverages", {
    diets: ["vegan", "keto", "gluten-free"],
  }),
  make("p15", "Assam Breakfast Tea", "Leafhouse", "🍵", "250 g", 199, 265, "beverages", {
    diets: ["vegan"],
  }),
  make("p16", "Arabica Coffee Beans", "Leafhouse", "☕", "500 g", 449, 599, "beverages", {
    rating: 4.8,
    diets: ["vegan", "keto"],
  }),
  make("p17", "Sona Masoori Rice", "Golden Fields", "🍚", "5 kg", 419, 520, "staples", {
    variants: ["1 kg", "5 kg", "10 kg"],
    diets: ["vegan", "gluten-free"],
  }),
  make("p18", "Toor Dal", "Golden Fields", "🫘", "1 kg", 159, 199, "staples", {
    diets: ["vegan", "high-protein", "gluten-free"],
  }),
  make("p19", "Cold Pressed Groundnut Oil", "Golden Fields", "🫙", "1 L", 289, 360, "staples", {
    diets: ["vegan", "keto"],
  }),
  make("p20", "Sourdough Loaf", "Hearth", "🍞", "400 g", 129, 150, "bakery", {
    rating: 4.7,
    ai: { health: 62, bestFor: "Sandwiches", substitutes: ["Multigrain bread", "Pita"] },
  }),
  make("p21", "Butter Croissant", "Hearth", "🥐", "2 pcs", 99, 130, "bakery"),
  make("p22", "Blueberry Muffins", "Hearth", "🧁", "4 pcs", 149, 185, "bakery"),
  make("p23", "Atlantic Salmon Fillet", "Blue Harbour", "🐟", "300 g", 649, 799, "meat-fish", {
    veg: false,
    diets: ["keto", "high-protein", "gluten-free"],
    rating: 4.8,
    ai: { health: 93, bestFor: "Omega-3 dinner", substitutes: ["Basa fillet", "Tuna"] },
  }),
  make("p24", "Chicken Breast Boneless", "Blue Harbour", "🍗", "500 g", 289, 350, "meat-fish", {
    veg: false,
    diets: ["keto", "high-protein"],
  }),
  make("p25", "Aloe Face Wash", "Pure Ritual", "🧴", "150 ml", 249, 320, "personal-care"),
  make("p26", "Charcoal Toothpaste", "Pure Ritual", "🪥", "100 g", 149, 189, "personal-care"),
  make("p27", "Lemon Floor Cleaner", "HomeShine", "🧽", "1 L", 189, 239, "household"),
  make("p28", "Bamboo Kitchen Towels", "HomeShine", "🧻", "2 rolls", 129, 169, "household"),
  make("p29", "Baby Wipes Fragrance Free", "TinyNest", "🍼", "72 pcs", 199, 249, "baby", {
    rating: 4.6,
  }),
  make("p30", "Organic Baby Cereal", "TinyNest", "🥣", "300 g", 279, 340, "baby"),
];

export const discount = (p: Product) => Math.round(((p.mrp - p.price) / p.mrp) * 100);

export const byCategory = (slug: string) => products.filter((p) => p.category === slug);

export const aiPicks = products.filter((p) => p.reason);

export const deals = [...products].sort((a, b) => discount(b) - discount(a)).slice(0, 8);

export const searchProducts = (q: string) => {
  const term = q.trim().toLowerCase();
  if (!term) return products;
  return products.filter((p) =>
    [p.name, p.brand, p.category, ...p.diets].join(" ").toLowerCase().includes(term),
  );
};

export const frequentlyBought = (p: Product) =>
  products.filter((x) => x.id !== p.id && x.category === p.category).slice(0, 3);

export const diets: { label: string; value: Diet }[] = [
  { label: "Vegan", value: "vegan" },
  { label: "Keto", value: "keto" },
  { label: "Gluten-free", value: "gluten-free" },
  { label: "High-protein", value: "high-protein" },
];
