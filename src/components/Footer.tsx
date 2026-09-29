import { Leaf, Smartphone } from "lucide-react";

const columns = [
  { title: "Shop", links: ["Fruits & Veg", "Dairy & Eggs", "Snacks", "Beverages", "Bakery"] },
  { title: "Company", links: ["About FreshNest", "Careers", "Press", "Partner stores"] },
  { title: "Help", links: ["Order support", "Returns & refunds", "Delivery areas", "Contact us"] },
];

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-card">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <p className="flex items-center gap-2 text-lg font-extrabold">
            <span className="grid h-9 w-9 place-items-center rounded-xl gradient-hero text-primary-foreground">
              <Leaf size={18} />
            </span>
            FreshNest
          </p>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Groceries at your door in 10 minutes, picked fresh from the store closest to you.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {["App Store", "Google Play"].map((s) => (
              <button
                key={s}
                type="button"
                className="inline-flex items-center gap-2 rounded-xl border border-border px-3 py-2 text-xs font-semibold"
              >
                <Smartphone size={14} /> {s}
              </button>
            ))}
          </div>
        </div>
        {columns.map((c) => (
          <div key={c.title}>
            <h3 className="text-sm font-bold">{c.title}</h3>
            <ul className="mt-3 space-y-2">
              {c.links.map((l) => (
                <li key={l}>
                  <span className="text-sm text-muted-foreground">{l}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border px-4 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} FreshNest. Prices include taxes. Mock catalogue for demo purposes.
      </div>
    </footer>
  );
}
