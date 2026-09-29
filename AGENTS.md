<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## FreshNest structure
- Mock catalogue lives in `src/data/catalog.ts`; swap it for a real API later without touching components.
- Cart/wishlist/modal state lives in `src/lib/store.tsx` (React context + localStorage) — no external state library.
- Shared chrome (header, footer, cart drawer, product sheet) is mounted once in `src/routes/__root.tsx`.
