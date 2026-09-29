import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { BadgePercent, PackageCheck, RotateCcw, Timer, Wallet } from "lucide-react";
import { aiPicks, byCategory, categories, deals } from "@/data/catalog";
import { HeroCarousel } from "@/components/HeroCarousel";
import { AiPickRail, CategoryRail, DietChips, ProductRail, SectionHeader } from "@/components/Rails";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FreshNest — Groceries delivered in 10 minutes" },
      {
        name: "description",
        content:
          "Order fresh fruits, dairy, snacks and daily essentials on FreshNest and get them at your door in 10 minutes.",
      },
      { property: "og:title", content: "FreshNest — Groceries delivered in 10 minutes" },
      {
        property: "og:description",
        content: "Fresh produce, dairy and daily essentials at your door in 10 minutes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const trust = [
  { icon: Timer, title: "10-minute delivery", copy: "From the store nearest you" },
  { icon: Wallet, title: "Best prices", copy: "Daily price checks" },
  { icon: PackageCheck, title: "5000+ products", copy: "One basket, everything" },
  { icon: RotateCcw, title: "Easy returns", copy: "No-questions refunds" },
];

function Countdown() {
  const [left, setLeft] = useState(3 * 3600 + 42 * 60);
  useEffect(() => {
    const t = setInterval(() => setLeft((v) => (v > 0 ? v - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <span className="inline-flex items-center gap-1 rounded-full gradient-offer px-2.5 py-1 text-xs font-bold text-highlight-foreground">
      <BadgePercent size={12} /> Ends in {pad(Math.floor(left / 3600))}:{pad(Math.floor((left % 3600) / 60))}:
      {pad(left % 60)}
    </span>
  );
}

function Home() {
  return (
    <div className="mx-auto max-w-7xl space-y-10 px-4 py-6">
      <HeroCarousel />

      <section>
        <SectionHeader title="Shop by category" />
        <CategoryRail />
      </section>

      <section>
        <SectionHeader title="AI picks for you" badge="ai" />
        <AiPickRail items={aiPicks} />
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="truncate text-lg font-extrabold sm:text-xl">Deals of the day</h2>
          <Countdown />
        </div>
        <ProductRail items={deals} />
      </section>

      {["fruits-veg", "dairy", "snacks", "beverages"].map((slug) => {
        const cat = categories.find((c) => c.slug === slug)!;
        return (
          <section key={slug}>
            <SectionHeader title={cat.name} seeAll={slug} />
            <ProductRail items={byCategory(slug)} />
          </section>
        );
      })}

      <section>
        <SectionHeader title="Shop by diet" />
        <DietChips />
      </section>

      <section className="grid gap-3 rounded-3xl bg-card p-5 shadow-card sm:grid-cols-2 lg:grid-cols-4">
        {trust.map((t) => (
          <div key={t.title} className="flex min-w-0 items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
              <t.icon size={18} />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold">{t.title}</p>
              <p className="truncate text-xs text-muted-foreground">{t.copy}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
