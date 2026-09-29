import { createContext } from "react";
import type { Product } from "@/data/catalog";

export type CartLine = { id: string; qty: number; variant: string };

export type StoreValue = {
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

const noop = () => {};

/** Inert fallback so a missing provider never blanks the screen. */
export const fallbackStore: StoreValue = {
  lines: [],
  wishlist: [],
  cartOpen: false,
  count: 0,
  subtotal: 0,
  savings: 0,
  qtyOf: () => 0,
  add: noop,
  remove: noop,
  setQty: noop,
  clear: noop,
  toggleWishlist: noop,
  openCart: noop,
  closeCart: noop,
  detailProduct: null,
  openDetail: noop,
  closeDetail: noop,
};

/* Kept in its own module so hot-reloading the provider does not recreate the
   context identity and orphan consumers. */
export const StoreContext = createContext<StoreValue | null>(null);
