import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { products, type Product } from "@/data/catalog";

export type CartLine = { id: string; qty: number; variant: string };

type StoreValue = {
  lines: CartLine[];
  wishlist: string[];
  cartOpen: boolean;
  count: number;
  subtotal: number;
  savings: number;
  qtyOf: (id: string) => number;
  add: (p: Product, variant?: string) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  toggleWishlist: (id: string) => void;
  openCart: () => void;
  closeCart: () => void;
  detailProduct: Product | null;
  openDetail: (p: Product) => void;
  closeDetail: () => void;
};

const KEY = "freshnest.cart.v1";
const WKEY = "freshnest.wishlist.v1";

const StoreContext = createContext<StoreValue | null>(null);

const priceFor = (p: Product, variant: string) => {
  const i = Math.max(0, p.variants.indexOf(variant));
  return { price: Math.round(p.price * (1 + i * 0.85)), mrp: Math.round(p.mrp * (1 + i * 0.85)) };
};

export function StoreProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setLines(JSON.parse(raw));
      const w = localStorage.getItem(WKEY);
      if (w) setWishlist(JSON.parse(w));
    } catch {
      /* ignore corrupt storage */
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(lines));
  }, [lines]);
  useEffect(() => {
    localStorage.setItem(WKEY, JSON.stringify(wishlist));
  }, [wishlist]);

  const add = useCallback((p: Product, variant?: string) => {
    setLines((prev) => {
      const v = variant ?? p.variants[0];
      const found = prev.find((l) => l.id === p.id);
      if (found) return prev.map((l) => (l.id === p.id ? { ...l, qty: l.qty + 1, variant: v } : l));
      return [...prev, { id: p.id, qty: 1, variant: v }];
    });
  }, []);

  const remove = useCallback((id: string) => setLines((p) => p.filter((l) => l.id !== id)), []);

  const setQty = useCallback(
    (id: string, qty: number) =>
      setLines((prev) =>
        qty <= 0 ? prev.filter((l) => l.id !== id) : prev.map((l) => (l.id === id ? { ...l, qty } : l)),
      ),
    [],
  );

  const value = useMemo<StoreValue>(() => {
    const priced = lines.map((l) => {
      const p = products.find((x) => x.id === l.id)!;
      const { price, mrp } = priceFor(p, l.variant);
      return { line: l, price, mrp };
    });
    return {
      lines,
      wishlist,
      cartOpen,
      count: lines.reduce((s, l) => s + l.qty, 0),
      subtotal: priced.reduce((s, x) => s + x.price * x.line.qty, 0),
      savings: priced.reduce((s, x) => s + (x.mrp - x.price) * x.line.qty, 0),
      qtyOf: (id) => lines.find((l) => l.id === id)?.qty ?? 0,
      add,
      remove,
      setQty,
      clear: () => setLines([]),
      toggleWishlist: (id) =>
        setWishlist((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])),
      openCart: () => setCartOpen(true),
      closeCart: () => setCartOpen(false),
      detailProduct,
      openDetail: (p) => setDetailProduct(p),
      closeDetail: () => setDetailProduct(null),
    };
  }, [lines, wishlist, cartOpen, detailProduct, add, remove, setQty]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}

export const money = (v: number) => `₹${v.toLocaleString("en-IN")}`;
export const variantPrice = priceFor;
