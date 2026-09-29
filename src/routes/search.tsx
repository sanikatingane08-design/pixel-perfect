import { useEffect, useMemo, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { SlidersHorizontal, Sparkles, X } from "lucide-react";
import { categories, diets, discount, products, type Diet } from "@/data/catalog";
import { ProductCard } from "@/components/ProductCard";

type Sort = "relevance" | "price" | "discount" | "rating";

export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>) => ({ q: (search.q as string) ?? "" }),
  head: () => ({
    meta: [
      { title: "Search groceries — FreshNest" },
      {
        name: "description",
        content: "Filter FreshNest's catalogue by category, price, diet, rating and discount, delivered in 10 minutes.",
      },
      { property: "og:title", content: "Search groceries — FreshNest" },
      {
        property: "og:description",
        content: "Filter by category, price, diet and discount across 5000+ products.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SearchPage,
});

const brands = [...new Set(products.map((p) => p.brand))].sort();

function SearchPage() {
  const { q } = Route.useSearch();
  const navigate = useNavigate();
  const [maxPrice, setMaxPrice] = useState(700);
  const [cats, setCats] = useState<string[]>([]);
  const [brandSel, setBrandSel] = useState<string[]>([]);
  const [dietSel, setDietSel] = useState<Diet[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [minOff, setMinOff] = useState(0);
  const [sort, setSort] = useState<Sort>("relevance");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(t);
  }, [q]);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    let list = products.filter((p) => {
      const haystack = [p.name, p.brand, p.category, ...p.diets].join(" ").toLowerCase();
      return !term || haystack.includes(term);
    });
    if (cats.length) list = list.filter((p) => cats.includes(p.category));
    if (brandSel.length) list = list.filter((p) => brandSel.includes(p.brand));
    if (dietSel.length) list = list.filter((p) => dietSel.every((d) => p.diets.includes(d)));
    list = list.filter(
      (p) => p.price <= maxPrice && p.rating >= minRating && discount(p) >= minOff,
    );
    const sorted = [...list];
    if (sort === "price") sorted.sort((a, b) => a.price - b.price);
    if (sort === "discount") sorted.sort((a, b) => discount(b) - discount(a));
    if (sort === "rating") sorted.sort((a, b) => b.rating - a.rating);
    return sorted;
  }, [q, cats, brandSel, dietSel, maxPrice, minRating, minOff, sort]);

  const toggle = <T,>(arr: T[], v: T, set: (x: T[]) => void) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const Filters = (
    <div className="space-y-5">
      <div>
        <h3 className="text-sm font-bold">Category</h3>
        <ul className="mt-2 space-y-1.5">
          {categories.map((c) => (
            <li key={c.slug}>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={cats.includes(c.slug)}
                  onChange={() => toggle(cats, c.slug, setCats)}
                  className="accent-primary"
                />
                {c.emoji} {c.name}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-sm font-bold">Max price: ₹{maxPrice}</h3>
        <input
          type="range"
          min={39}
          max={700}
          step={10}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          aria-label="Maximum price"
          className="mt-2 w-full accent-primary"
        />
      </div>
      <div>
        <h3 className="text-sm font-bold">Brand</h3>
        <ul className="mt-2 space-y-1.5">
          {brands.map((b) => (
            <li key={b}>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={brandSel.includes(b)}
                  onChange={() => toggle(brandSel, b, setBrandSel)}
                  className="accent-primary"
                />
                {b}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-sm font-bold">Diet</h3>
        <ul className="mt-2 flex flex-wrap gap-2">
          {diets.map((d) => (
            <li key={d.value}>
              <button
                type="button"
                onClick={() => toggle(dietSel, d.value, setDietSel)}
                aria-pressed={dietSel.includes(d.value)}
                className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                  dietSel.includes(d.value) ? "border-primary bg-primary-soft text-primary" : "border-border"
                }`}
              >
                {d.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-sm font-bold">Rating {minRating > 0 ? `${minRating}+` : "any"}</h3>
        <input
          type="range"
          min={0}
          max={4.8}
          step={0.2}
          value={minRating}
          onChange={(e) => setMinRating(Number(e.target.value))}
          aria-label="Minimum rating"
          className="mt-2 w-full accent-primary"
        />
      </div>
      <div>
        <h3 className="text-sm font-bold">Discount {minOff > 0 ? `${minOff}%+` : "any"}</h3>
        <input
          type="range"
          min={0}
          max={40}
          step={5}
          value={minOff}
          onChange={(e) => setMinOff(Number(e.target.value))}
          aria-label="Minimum discount"
          className="mt-2 w-full accent-primary"
        />
      </div>
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="grid gap-4 md:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="hidden h-fit rounded-2xl border border-border bg-card p-4 md:block">
          <h2 className="mb-4 text-base font-extrabold">Filters</h2>
          {Filters}
        </aside>

        <div>
          <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 sm:flex sm:justify-between">
            <div className="min-w-0">
              <h1 className="truncate text-xl font-extrabold">
                {q ? `Results for "${q}"` : "All products"}
              </h1>
              <p className="text-sm text-muted-foreground">{results.length} items · delivered in 10 mins</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => setFiltersOpen(true)}
                className="inline-flex items-center gap-1 rounded-xl border border-border px-3 py-2 text-sm font-semibold md:hidden"
              >
                <SlidersHorizontal size={15} /> Filters
              </button>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                aria-label="Sort results"
                className="rounded-xl border border-border bg-card px-3 py-2 text-sm font-semibold"
              >
                <option value="relevance">Relevance</option>
                <option value="price">Price: low to high</option>
                <option value="discount">Discount</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </header>

          {loading ? (
            <ul className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4 xl:grid-cols-5">
              {Array.from({ length: 10 }).map((_, i) => (
                <li key={i} className="h-72 animate-pulse rounded-2xl bg-muted" />
              ))}
            </ul>
          ) : results.length === 0 ? (
            <div className="mt-10 flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-10 text-center">
              <span className="text-5xl">🧺</span>
              <p className="font-bold">Nothing matched those filters</p>
              <p className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                <Sparkles size={14} className="text-primary" /> AI suggests trying broader terms
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {["milk", "snacks", "avocado", "coffee"].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => navigate({ to: "/search", search: { q: s } })}
                    className="rounded-full border border-border px-3 py-1 text-sm font-semibold"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <ul className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4 xl:grid-cols-5">
              {results.map((p, i) => (
                <li
                  key={p.id}
                  className="animate-rise"
                  style={{ animationDelay: `${Math.min(i, 10) * 40}ms` }}
                >
                  <ProductCard product={p} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {filtersOpen && (
        <div className="fixed inset-0 z-50 flex items-end bg-foreground/40 md:hidden">
          <button type="button" aria-label="Close filters" className="absolute inset-0" onClick={() => setFiltersOpen(false)} />
          <div className="relative max-h-[85vh] w-full overflow-y-auto rounded-t-3xl bg-card p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-extrabold">Filters</h2>
              <button type="button" onClick={() => setFiltersOpen(false)} aria-label="Close filters">
                <X size={18} />
              </button>
            </div>
            <div className="mt-4">{Filters}</div>
            <button
              type="button"
              onClick={() => setFiltersOpen(false)}
              className="mt-5 w-full rounded-xl bg-primary py-3 text-sm font-bold text-primary-foreground"
            >
              Show {results.length} items
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
