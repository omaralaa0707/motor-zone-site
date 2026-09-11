# Motor Zone — site 18 of 46

A concept site built entirely from this dealership's own published material.
**Not affiliated with Motor Zone, and not an official site.**

- **Live:** https://motor-zone-site.vercel.app
- **Repo:** [motor-zone-site](https://github.com/omaralaa0707/motor-zone-site)

## What this page is about

Every site in this series is built around something true and checkable about
the dealer's own account — a pattern in what they publish, a contradiction
between two of their channels, or a fact about their showroom — rather than
around a generic template. The palette, type, 3D piece and motion below were
all chosen to serve that finding.

## Design record

**Palette**
: Taken from their offer cards rather than a room, because they publish no photography at all: card black #0D0E10, their offer red measured at #F4121A (lifted to #FF3D44 for text), and near-white for figures. **No third colour** — there is nothing on the page but money, and red is reserved strictly for figures and the discount

**Type pairing**
: Archivo + Hanken Grotesk / Changa + Almarai (AR)

**3D / signature technique**
: **The price drop**: the discount rendered as independent 3D digits standing on a floor — digits that differ between 1,600,000 and 1,500,000 fall under gravity, bounce with real restitution and swap glyph at the moment of impact, while identical digits never move. Each digit owns its physics in refs and both glyphs are mounted with visibility toggled from the frame loop, so no state is written during animation

**Motion language**
: The count: figures land the way a total does — a hard short vertical settle, staggered like a receipt printing

## Sources

Everything on the page was sourced from:

- Instagram: https://www.instagram.com/motorzone.automotive/
- Facebook: https://www.facebook.com/MotorZoneAutomotive/
- Google Maps: https://www.google.com/maps/place/M/data=!4m2!3m1!1s0x0:0xb14f56f5a16fd955

Photography belongs to the dealership (or, where their frames are watermarked
by an outside studio, to that studio) and is used here only to document their
own published material. No figure on the page is invented: anything the dealer
did not publish is marked as unpublished rather than estimated.

## Running it

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # production build — must pass before shipping
pnpm lint     # eslint, zero warnings
```

Requires `node-linker=hoisted` in `.npmrc` (already present) or three.js peer
deps fail to resolve.

## Structure

```
src/content/media.ts      verified facts and figures — the data layer
src/content/en.ts|ar.ts   all copy, both locales, identical shapes
src/content/schema-ext.ts the page-specific content contract
src/components/webgl/     the 3D piece
src/components/site/      the page composition
src/app/globals.css       palette tokens, type, RTL overrides, motion
```

Arabic/English toggle with full RTL. All CSS direction overrides key off
`[dir="rtl"]` (never `[lang]`) and live outside `@layer`. Every Latin or
numeric fragment inside Arabic copy is wrapped in `.latin` for correct bidi.

---

Part of a 46-site series. See the [top-level README](../README.md) for the full
index and [`TRACKING.md`](../TRACKING.md) for the differentiation log.
