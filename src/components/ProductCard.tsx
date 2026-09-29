import { useState } from "react";
import { Heart, Minus, Plus, Star, Timer } from "lucide-react";
import { discount, type Product } from "@/data/catalog";
import { money, useStore, variantPrice } from "@/lib/store";

const tintFor = (category: string) =>
  ["fruits-veg", "beverages", "meat-fish", "baby"].includes(category)
    ? "var(--tint-green)"
    : ["dairy", "staples", "personal-care"].includes(category)
      ? "var(--tint-yellow)"
      : "var(--tint-coral)";

export function ProductCard({ product }: { product: Product }) {
  const { qtyOf, add, setQty, wishlist, toggleWishlist, openDetail } = useStore();
  const [variant, setVariant] = useState(product.variants[0]!);
  const qty = qtyOf(product.id);
  const { price, mrp } = variantPrice(product, variant);
  const off = discount(product);
  const wished = wishlist.includes(product.id);

  return (
    <article className="group relative flex h-full flex-col rounded-2xl border border-border bg-card p-3 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-lift">
      <button
        type="button"
        onClick={() => openDetail(product)}
        aria-label={`View details for ${product.name}`}
        className="relative grid h-32 place-items-center overflow-hidden rounded-xl text-5xl sm:h-36 sm:text-6xl"
        style={{ backgroundColor: tintFor(product.category) }}
      >
        <span className="transition-transform duration-300 group-hover:scale-110">{product.emoji}</span>
        {off > 0 && (
          <span className="absolute left-0 top-2 rounded-r-full gradient-offer px-2 py-0.5 text-[11px] font-bold text-highlight-foreground">
            {off}% OFF
          </span>
        )}
      </button>

      <button
        type="button"
        onClick={() => toggleWishlist(product.id)}
        aria-label={wished ? `Remove ${product.name} from wishlist` : `Save ${product.name}`}
        aria-pressed={wished}
        className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-card/90 shadow-card"
      >
        <Heart
          className={wished ? "animate-burst fill-highlight text-highlight" : "text-muted-foreground"}
          size={16}
        />
      </button>

      <div className="mt-3 flex items-center gap-2 text-[11px] text-muted-foreground">
        <span className="inline-flex items-center gap-1 rounded-md bg-muted px-1.5 py-0.5 font-medium">
          <Timer size={11} /> {product.eta}
        </span>
        <span
          className={`grid h-3.5 w-3.5 shrink-0 place-items-center rounded-sm border ${
            product.veg ? "border-primary" : "border-highlight"
          }`}
          aria-label={product.veg ? "Vegetarian" : "Non-vegetarian"}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${product.veg ? "bg-primary" : "bg-highlight"}`} />
        </span>
        <span className="ml-auto inline-flex items-center gap-0.5 font-semibold text-foreground">
          <Star size={11} className="fill-accent text-accent" /> {product.rating}
        </span>
      </div>

      <button
        type="button"
        onClick={() => openDetail(product)}
        className="mt-1 text-left text-sm font-semibold leading-snug text-foreground"
      >
        {product.name}
      </button>
      <p className="text-xs text-muted-foreground">{product.brand}</p>

      {product.variants.length > 1 ? (
        <select
          value={variant}
          onChange={(e) => setVariant(e.target.value)}
          aria-label={`Select size for ${product.name}`}
          className="mt-2 w-fit rounded-lg border border-border bg-background px-2 py-1 text-xs font-medium"
        >
          {product.variants.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
      ) : (
        <p className="mt-2 text-xs font-medium text-muted-foreground">{variant}</p>
      )}

      <div className="mt-auto flex items-end justify-between gap-2 pt-3">
        <div className="min-w-0">
          <p className="text-sm font-bold text-foreground">{money(price)}</p>
          {mrp > price && (
            <p className="text-xs text-muted-foreground line-through">{money(mrp)}</p>
          )}
        </div>
        {qty === 0 ? (
          <button
            type="button"
            onClick={() => add(product, variant)}
            className="rounded-xl bg-primary-soft px-3 py-2 text-xs font-bold uppercase tracking-wide text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            Add
          </button>
        ) : (
          <div className="flex animate-pop-in items-center gap-1 rounded-xl bg-primary px-1 py-1 text-primary-foreground">
            <button
              type="button"
              onClick={() => setQty(product.id, qty - 1)}
              aria-label={`Decrease ${product.name}`}
              className="grid h-6 w-6 place-items-center rounded-lg hover:bg-primary-foreground/20"
            >
              <Minus size={13} />
            </button>
            <span className="min-w-4 text-center text-xs font-bold">{qty}</span>
            <button
              type="button"
              onClick={() => setQty(product.id, qty + 1)}
              aria-label={`Increase ${product.name}`}
              className="grid h-6 w-6 place-items-center rounded-lg hover:bg-primary-foreground/20"
            >
              <Plus size={13} />
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
