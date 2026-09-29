import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { categories, diets, type Product } from "@/data/catalog";
import { ProductCard } from "@/components/ProductCard";

export function SectionHeader({
  title,
  badge,
  seeAll,
}: {
  title: string;
  badge?: string;
  seeAll?: string;
}) {
  return (
    <div className="mb-3 flex items-center justify-between gap-3">
      <h2 className="flex min-w-0 items-center gap-2 truncate text-lg font-extrabold sm:text-xl">
        {badge === "ai" && <Sparkles size={18} className="shrink-0 text-primary" />}
        {title}
      </h2>
      {seeAll && (
        <Link
          to="/search"
          search={{ q: seeAll }}
          className="shrink-0 text-sm font-bold text-primary hover:underline"
        >
          See all
        </Link>
      )}
    </div>
  );
}

export function CategoryRail() {
  return (
    <ul className="rail gap-3 pb-2">
      {categories.map((c) => (
        <li key={c.slug} className="shrink-0">
          <Link
            to="/search"
            search={{ q: c.slug }}
            className="group flex w-20 flex-col items-center gap-2 sm:w-24"
          >
            <span
              className="grid h-20 w-20 place-items-center rounded-2xl text-3xl shadow-card transition-transform duration-200 group-hover:-translate-y-1 group-hover:rotate-3 sm:h-24 sm:w-24 sm:text-4xl"
              style={{ backgroundColor: c.tint }}
            >
              {c.emoji}
            </span>
            <span className="text-center text-xs font-semibold leading-tight">{c.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function ProductRail({ items }: { items: Product[] }) {
  return (
    <ul className="rail gap-3 pb-2">
      {items.map((p) => (
        <li key={p.id} className="w-40 shrink-0 sm:w-48">
          <ProductCard product={p} />
        </li>
      ))}
    </ul>
  );
}

export function AiPickRail({ items }: { items: Product[] }) {
  return (
    <ul className="rail gap-3 pb-2">
      {items.map((p) => (
        <li key={p.id} className="w-40 shrink-0 sm:w-48">
          <div className="flex h-full flex-col gap-2">
            <span className="inline-flex w-fit items-center gap-1 rounded-full bg-primary-soft px-2 py-0.5 text-[11px] font-bold text-primary">
              <Sparkles size={11} /> {p.reason}
            </span>
            <div className="flex-1">
              <ProductCard product={p} />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function DietChips() {
  return (
    <ul className="flex flex-wrap gap-2">
      {diets.map((d) => (
        <li key={d.value}>
          <Link
            to="/search"
            search={{ q: d.value }}
            className="inline-flex rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
          >
            {d.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
