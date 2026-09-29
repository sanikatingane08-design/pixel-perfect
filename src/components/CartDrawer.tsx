import { Minus, Plus, ShoppingBag, Trash2, X, Zap } from "lucide-react";
import { products } from "@/data/catalog";
import { money, useStore, variantPrice } from "@/lib/store";

const FREE_DELIVERY = 499;

export function CartDrawer() {
  const { cartOpen, closeCart, lines, setQty, remove, subtotal, savings, clear } = useStore();
  if (!cartOpen) return null;

  const toFree = Math.max(0, FREE_DELIVERY - subtotal);
  const delivery = toFree > 0 && subtotal > 0 ? 29 : 0;
  const progress = Math.min(100, (subtotal / FREE_DELIVERY) * 100);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-foreground/40" role="dialog" aria-label="Your cart">
      <button type="button" aria-label="Close cart" className="flex-1" onClick={closeCart} />
      <aside className="flex w-full max-w-md flex-col bg-card shadow-lift animate-in slide-in-from-right duration-300 max-sm:mt-auto max-sm:h-[88vh] max-sm:rounded-t-3xl">
        <div className="flex items-center justify-between border-b border-border px-4 py-4">
          <h2 className="text-base font-bold">Your cart ({lines.length})</h2>
          <button type="button" onClick={closeCart} aria-label="Close cart">
            <X size={18} />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
            <span className="grid h-20 w-20 place-items-center rounded-full bg-primary-soft text-4xl">🛒</span>
            <p className="font-semibold">Your cart is empty</p>
            <p className="text-sm text-muted-foreground">Add fresh picks and get them in 10 minutes.</p>
            <button
              type="button"
              onClick={closeCart}
              className="rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground"
            >
              Start shopping
            </button>
          </div>
        ) : (
          <>
            <div className="border-b border-border px-4 py-3">
              <p className="text-xs font-semibold">
                {toFree > 0 ? `Add ${money(toFree)} more for free delivery` : "Free delivery unlocked 🎉"}
              </p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full gradient-hero transition-all" style={{ width: `${progress}%` }} />
              </div>
            </div>

            <ul className="flex-1 divide-y divide-border overflow-y-auto px-4">
              {lines.map((l) => {
                const p = products.find((x) => x.id === l.id)!;
                const { price } = variantPrice(p, l.variant);
                return (
                  <li key={l.id} className="flex items-center gap-3 py-3">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-muted text-2xl">
                      {p.emoji}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">{p.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {l.variant} · {money(price)}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-1 rounded-xl bg-primary px-1 py-1 text-primary-foreground">
                      <button
                        type="button"
                        onClick={() => setQty(l.id, l.qty - 1)}
                        aria-label={`Decrease ${p.name}`}
                        className="grid h-6 w-6 place-items-center rounded-lg hover:bg-primary-foreground/20"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="min-w-4 text-center text-xs font-bold">{l.qty}</span>
                      <button
                        type="button"
                        onClick={() => setQty(l.id, l.qty + 1)}
                        aria-label={`Increase ${p.name}`}
                        className="grid h-6 w-6 place-items-center rounded-lg hover:bg-primary-foreground/20"
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                    <p className="w-16 shrink-0 text-right text-sm font-bold">{money(price * l.qty)}</p>
                    <button
                      type="button"
                      onClick={() => remove(l.id)}
                      aria-label={`Remove ${p.name}`}
                      className="shrink-0 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 size={15} />
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="space-y-2 border-t border-border p-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Item total</span>
                <span className="font-semibold">{money(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Delivery</span>
                <span className="font-semibold text-primary">{delivery === 0 ? "FREE" : money(delivery)}</span>
              </div>
              {savings > 0 && (
                <p className="rounded-lg bg-primary-soft px-2 py-1 text-xs font-semibold text-primary">
                  You saved {money(savings)} on this order
                </p>
              )}
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground shadow-glow"
              >
                <ShoppingBag size={16} /> Checkout · {money(subtotal + delivery)}
              </button>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <Zap size={12} /> Arrives in 10 minutes
                </span>
                <button type="button" onClick={clear} className="font-semibold hover:text-destructive">
                  Clear cart
                </button>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
