import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { ChevronDown, Leaf, MapPin, Mic, Search, ShoppingCart, Sparkles, X, Zap } from "lucide-react";
import { money, useStore } from "@/lib/store";

const placeholders = [
  'Search "milk"',
  'Search "organic eggs"',
  'Ask AI: "dinner for 4"',
  'Search "cold coffee"',
];

const addresses = ["Home · 12 Marine Drive, Mumbai", "Work · Bandra Kurla Complex", "Mom's · Andheri West"];

export function Header() {
  const { count, subtotal, openCart } = useStore();
  const navigate = useNavigate();
  const [idx, setIdx] = useState(0);
  const [q, setQ] = useState("");
  const [locOpen, setLocOpen] = useState(false);
  const [address, setAddress] = useState(addresses[0]);
  const [bounce, setBounce] = useState(false);
  const prev = useRef(count);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % placeholders.length), 2600);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const grew = count > prev.current;
    prev.current = count;
    if (!grew) return undefined;
    setBounce(true);
    const t = setTimeout(() => setBounce(false), 520);
    return () => clearTimeout(t);
  }, [count]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/search", search: { q } });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border glass">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:gap-6">
        <div className="flex min-w-0 items-center gap-3">
          <Link to="/" className="flex shrink-0 items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl gradient-hero text-primary-foreground">
              <Leaf size={18} />
            </span>
            <span className="text-lg font-extrabold tracking-tight">FreshNest</span>
          </Link>
          <div className="hidden min-w-0 lg:block">
            <p className="inline-flex items-center gap-1 rounded-full bg-primary-soft px-2 py-0.5 text-xs font-bold text-primary">
              <Zap size={12} /> Delivery in 10 mins
            </p>
            <button
              type="button"
              onClick={() => setLocOpen(true)}
              className="flex min-w-0 items-center gap-1 text-xs text-muted-foreground"
            >
              <MapPin size={12} className="shrink-0" />
              <span className="truncate">{address}</span>
              <ChevronDown size={12} className="shrink-0" />
            </button>
          </div>
        </div>

        <form
          onSubmit={submit}
          role="search"
          className="order-3 col-span-2 flex items-center gap-2 rounded-2xl border border-border bg-background px-3 py-2 lg:order-none lg:col-span-1"
        >
          <Search size={16} className="shrink-0 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={placeholders[idx]}
            aria-label="Search products"
            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <button type="button" aria-label="Voice search" className="text-muted-foreground hover:text-foreground">
            <Mic size={16} />
          </button>
          <button
            type="submit"
            aria-label="Search with AI"
            className="grid h-7 w-7 shrink-0 place-items-center rounded-lg gradient-offer text-highlight-foreground"
          >
            <Sparkles size={14} />
          </button>
        </form>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setLocOpen(true)}
            aria-label="Change delivery address"
            className="grid h-9 w-9 place-items-center rounded-xl border border-border lg:hidden"
          >
            <MapPin size={16} />
          </button>
          <button
            type="button"
            className="hidden rounded-xl border border-border px-3 py-2 text-sm font-semibold sm:block"
          >
            Login
          </button>
          <button
            type="button"
            onClick={openCart}
            aria-label="Open cart"
            className={`flex items-center gap-2 rounded-xl bg-primary px-3 py-2 text-sm font-bold text-primary-foreground shadow-glow ${
              bounce ? "animate-cart-bounce" : ""
            }`}
          >
            <ShoppingCart size={16} />
            <span className="hidden sm:inline">
              {count === 0 ? "Cart" : `${count} · ${money(subtotal)}`}
            </span>
            {count > 0 && <span className="sm:hidden">{count}</span>}
          </button>
        </div>
      </div>

      {locOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-foreground/40 p-4">
          <div className="w-full max-w-sm animate-pop-in rounded-2xl bg-card p-5 shadow-lift">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold">Delivery address</h2>
              <button type="button" onClick={() => setLocOpen(false)} aria-label="Close address picker">
                <X size={18} />
              </button>
            </div>
            <button
              type="button"
              onClick={() => setLocOpen(false)}
              className="mt-4 w-full rounded-xl bg-primary-soft px-3 py-2 text-sm font-bold text-primary"
            >
              Detect my location
            </button>
            <ul className="mt-3 space-y-2">
              {addresses.map((a) => (
                <li key={a}>
                  <button
                    type="button"
                    onClick={() => {
                      setAddress(a);
                      setLocOpen(false);
                    }}
                    className={`w-full rounded-xl border px-3 py-2 text-left text-sm ${
                      a === address ? "border-primary bg-primary-soft" : "border-border"
                    }`}
                  >
                    {a}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}
