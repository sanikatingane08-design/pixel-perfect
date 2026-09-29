import { Sparkles, Star, X } from "lucide-react";
import { discount, frequentlyBought } from "@/data/catalog";
import { money, useStore } from "@/lib/store";

export function ProductSheet() {
  const { detailProduct: p, closeDetail, add, qtyOf, openCart } = useStore();
  if (!p) return null;
  const qty = qtyOf(p.id);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/40 sm:items-center" role="dialog" aria-label={p.name}>
      <button type="button" aria-label="Close details" className="absolute inset-0" onClick={closeDetail} />
      <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-card p-5 shadow-lift animate-pop-in sm:rounded-3xl">
        <button
          type="button"
          onClick={closeDetail}
          aria-label="Close details"
          className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-muted"
        >
          <X size={16} />
        </button>

        <div className="grid h-40 place-items-center rounded-2xl bg-primary-soft text-7xl">{p.emoji}</div>
        <div className="mt-3 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="text-xl font-extrabold">{p.name}</h2>
            <p className="text-sm text-muted-foreground">
              {p.brand} · {p.unit}
            </p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-muted px-2 py-1 text-xs font-bold">
            <Star size={12} className="fill-accent text-accent" /> {p.rating}
          </span>
        </div>

        <div className="mt-2 flex items-center gap-2">
          <span className="text-lg font-bold">{money(p.price)}</span>
          <span className="text-sm text-muted-foreground line-through">{money(p.mrp)}</span>
          <span className="rounded-md gradient-offer px-2 py-0.5 text-xs font-bold text-highlight-foreground">
            {discount(p)}% off
          </span>
        </div>

        <p className="mt-3 text-sm text-muted-foreground">{p.description}</p>

        <div className="mt-4 rounded-2xl border border-border bg-primary-soft p-3">
          <p className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-primary">
            <Sparkles size={13} /> AI insight
          </p>
          <p className="mt-1 text-sm font-semibold">Health score {p.ai.health}/100</p>
          <p className="text-sm text-muted-foreground">Best for: {p.ai.bestFor}</p>
          {p.ai.substitutes.length > 0 && (
            <p className="mt-1 text-xs text-muted-foreground">Substitutes: {p.ai.substitutes.join(", ")}</p>
          )}
        </div>

        <h3 className="mt-4 text-sm font-bold">Nutrition facts</h3>
        <dl className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {p.nutrition.map((f) => (
            <div key={f.label} className="rounded-xl bg-muted p-2 text-center">
              <dt className="text-[11px] text-muted-foreground">{f.label}</dt>
              <dd className="text-sm font-bold">{f.value}</dd>
            </div>
          ))}
        </dl>

        <h3 className="mt-4 text-sm font-bold">Frequently bought together</h3>
        <ul className="mt-2 flex gap-2 overflow-x-auto no-scrollbar">
          {frequentlyBought(p).map((x) => (
            <li key={x.id} className="w-28 shrink-0 rounded-xl border border-border p-2 text-center">
              <span className="text-3xl">{x.emoji}</span>
              <p className="truncate text-xs font-semibold">{x.name}</p>
              <button
                type="button"
                onClick={() => add(x)}
                className="mt-1 w-full rounded-lg bg-primary-soft py-1 text-[11px] font-bold text-primary"
              >
                Add · {money(x.price)}
              </button>
            </li>
          ))}
        </ul>

        <div className="sticky bottom-0 mt-5 flex gap-2 bg-card pt-3">
          <button
            type="button"
            onClick={() => add(p)}
            className="flex-1 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground shadow-glow"
          >
            {qty > 0 ? `Add another · ${qty} in cart` : `Add to cart · ${money(p.price)}`}
          </button>
          <button
            type="button"
            onClick={() => {
              closeDetail();
              openCart();
            }}
            className="rounded-xl border border-border px-4 py-3 text-sm font-bold"
          >
            View cart
          </button>
        </div>
      </div>
    </div>
  );
}
