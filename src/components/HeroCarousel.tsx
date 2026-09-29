import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import produce from "@/assets/promo-produce.jpg";
import dairy from "@/assets/promo-dairy.jpg";
import snacks from "@/assets/promo-snacks.jpg";

const slides = [
  {
    eyebrow: "Farm to door in 10 minutes",
    title: "Crisp produce, picked this morning",
    cta: "Shop fruits & veg",
    to: "/search",
    q: "fruits-veg",
    image: produce,
    bg: "linear-gradient(120deg, oklch(0.5 0.16 146), oklch(0.72 0.17 140))",
  },
  {
    eyebrow: "Daily essentials",
    title: "Milk, eggs & more at best prices",
    cta: "Shop dairy",
    to: "/search",
    q: "dairy",
    image: dairy,
    bg: "linear-gradient(120deg, oklch(0.8 0.14 88), oklch(0.9 0.11 95))",
  },
  {
    eyebrow: "Up to 40% off",
    title: "Snack drawer restock, sorted",
    cta: "Shop snacks",
    to: "/search",
    q: "snacks",
    image: snacks,
    bg: "linear-gradient(120deg, oklch(0.67 0.19 33), oklch(0.78 0.15 50))",
  },
];

export function HeroCarousel() {
  const [i, setI] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);

  const s = slides[i];

  return (
    <section
      aria-label="Promotions"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setTilt({ x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 });
      }}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      className="relative overflow-hidden rounded-3xl p-6 sm:p-10"
      style={{ backgroundImage: s.bg }}
    >
      <div className="grid items-center gap-6 sm:grid-cols-[1.1fr_1fr]">
        <div key={s.title} className="animate-rise text-primary-foreground">
          <p className="text-xs font-bold uppercase tracking-[0.18em] opacity-90">{s.eyebrow}</p>
          <h1 className="mt-2 max-w-md text-3xl font-extrabold leading-tight sm:text-4xl">{s.title}</h1>
          <Link
            to={s.to}
            search={{ q: s.q }}
            className="mt-5 inline-flex rounded-xl bg-background px-4 py-2.5 text-sm font-bold text-foreground shadow-lift"
          >
            {s.cta}
          </Link>
        </div>
        <img
          src={s.image}
          alt=""
          width={1280}
          height={720}
          className="h-40 w-full rounded-2xl object-cover transition-transform duration-300 sm:h-56"
          style={{ transform: `translate3d(${tilt.x * 16}px, ${tilt.y * 12}px, 0) scale(1.04)` }}
        />
      </div>

      <div className="mt-6 flex gap-2">
        {slides.map((sl, idx) => (
          <button
            key={sl.title}
            type="button"
            onClick={() => setI(idx)}
            aria-label={`Show promotion ${idx + 1}`}
            aria-current={idx === i}
            className={`h-1.5 rounded-full transition-all ${
              idx === i ? "w-8 bg-background" : "w-3 bg-background/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
