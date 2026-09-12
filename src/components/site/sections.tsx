"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactElement,
  type ReactNode,
} from "react";
import { useLocale } from "@/i18n/locale-provider";
import { useZone } from "@/content/schema-ext";
import {
  PLANS,
  PLAN_TERMS,
  HEADLINE,
  DISCOUNT,
  EFFICIENCY,
  PROFILE,
  firstYearOutlay,
} from "@/content/media";
import { PriceDrop } from "@/components/webgl/price-drop";

/* ---------------------------------------------------------------- motion -- */

function useOnScreen<T extends HTMLElement>(rootMargin = "-8% 0px -8% 0px") {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reveal = () => node.setAttribute("data-seen", "");
    if (typeof IntersectionObserver === "undefined") {
      reveal();
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          reveal();
          io.disconnect();
        }
      },
      { rootMargin, threshold: 0.01 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [rootMargin]);
  return ref;
}

const delayVar = (d: number) => ({ "--count-delay": `${d}ms` }) as CSSProperties;

/** This site's arrival: the count. Figures land the way a total does. */
function Count({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
}) {
  const ref = useOnScreen<HTMLElement>();
  const C = Tag as unknown as (p: Record<string, unknown>) => ReactElement;
  return (
    <C ref={ref} data-count="" className={className} style={delayVar(delay)}>
      {children}
    </C>
  );
}

function Rule({ className, delay = 0 }: { className?: string; delay?: number }) {
  const ref = useOnScreen<HTMLDivElement>();
  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-rule=""
      className={`h-[3px] w-full origin-[left_center] bg-offer-deep rtl:origin-[right_center] ${className ?? ""}`}
      style={delayVar(delay)}
    />
  );
}

const money = (n: number) => n.toLocaleString("en-US");

/* -------------------------------------------------------------------- nav -- */

export function Nav() {
  const c = useZone();
  const { locale, toggleLocale } = useLocale();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-card/92 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[84rem] items-center gap-5 px-5 sm:px-8">
        <a href="#top" className="flex shrink-0 items-center gap-2.5" aria-label={c.brand.name}>
          <img src="/mark.svg" alt="" className="h-6 w-6" />
          <span className="font-display text-[1rem] font-bold leading-none text-chalk">
            {c.brand.name}
          </span>
        </a>

        <nav className="ms-auto hidden items-center gap-6 md:flex">
          {c.nav.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="py-2 text-[0.86rem] text-chalk-2 transition-colors hover:text-chalk"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href={PROFILE.phoneHref}
          className="latin tnum ms-auto shrink-0 text-[0.88rem] font-semibold text-offer transition-opacity hover:opacity-80 md:ms-0"
        >
          {PROFILE.phone}
        </a>

        <button
          onClick={toggleLocale}
          className="shrink-0 border border-white/20 px-3 py-1.5 text-[0.72rem] text-chalk-2 transition-colors hover:border-offer hover:text-chalk"
          aria-label={c.a11y.toggleLanguage}
        >
          {locale === "ar" ? "EN" : "ع"}
        </button>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------- page -- */

export function Sections() {
  const c = useZone();

  // They publish a deposit and a monthly per model but no price, so the only
  // honest derivation is the one that needs neither a price nor a rate.
  const rows = useMemo(
    () => PLANS.map((p) => ({ ...p, firstYear: firstYearOutlay(p.deposit, p.monthly) })),
    [],
  );

  return (
    <main>
      {/* ------------------------------------------------------------ hero -- */}
      <section id="top" className="w-full pt-16">
        <div className="mx-auto max-w-[84rem] px-5 py-14 sm:px-8 sm:py-16">
          <Count className="max-w-[44rem]">
            <p className="label text-offer">{c.hero.eyebrow}</p>
            <h1 className="mt-4 font-display text-hero font-bold text-chalk">{c.hero.headline}</h1>
            <Rule className="mt-6 max-w-[12rem]" delay={130} />
            <p className="mt-6 text-lead leading-relaxed text-chalk-2">{c.hero.sub}</p>
          </Count>

          {/* The discount, as the page's largest object. */}
          <Count delay={90} className="mt-12">
            <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
              <span className="label text-chalk-2">{DISCOUNT.model}</span>
              <span className="label text-offer">
                {c.hero.savingLabel} {money(DISCOUNT.saving)} {c.plans.currency}
              </span>
            </div>

            <div className="relative mt-3 h-[13rem] w-full sm:h-[17rem]">
              <PriceDrop
                from={money(DISCOUNT.was)}
                to={money(DISCOUNT.now)}
                alt={c.hero.dropAlt}
                className="absolute inset-0 h-full w-full"
              />
            </div>

            <div className="mt-3 flex flex-wrap items-baseline gap-x-8 gap-y-1 text-[0.84rem]">
              <span className="text-chalk-2">
                {c.hero.wasLabel}{" "}
                <span className="latin tnum line-through">{money(DISCOUNT.was)}</span>
              </span>
              <span className="text-chalk">
                {c.hero.nowLabel}{" "}
                <span className="latin tnum text-offer">{money(DISCOUNT.now)}</span>{" "}
                {c.plans.currency}
              </span>
              <a
                href={DISCOUNT.postUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-chalk-2 underline decoration-white/25 underline-offset-4 transition-colors hover:text-offer"
              >
                {c.plans.viewPost}
              </a>
              <span className="text-chalk-3">{c.hero.dropHint}</span>
            </div>
          </Count>

          <Count delay={140} className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href={PROFILE.phoneHref}
              className="inline-flex items-center gap-2 bg-offer-deep px-7 py-3.5 text-[0.86rem] font-semibold text-chalk transition-opacity hover:opacity-90"
            >
              {c.hero.primaryCta}
            </a>
            <a
              href="#plans"
              className="inline-flex items-center gap-2 border border-white/25 px-7 py-3.5 text-[0.86rem] font-semibold text-chalk transition-colors hover:border-offer hover:text-offer"
            >
              {c.hero.secondaryCta}
            </a>
          </Count>

          {/* Why there are no photographs on this page. */}
          <Count delay={180} className="mt-10 max-w-[44rem] border-s-2 border-white/15 ps-5">
            <p className="text-[0.86rem] leading-relaxed text-chalk-2">{c.hero.noPhotoNote}</p>
          </Count>
        </div>
      </section>

      {/* -------------------------------------------------------- headline -- */}
      <section id="headline" className="border-t border-white/10 bg-card-2 py-20 sm:py-28">
        <div className="mx-auto max-w-[84rem] px-5 sm:px-8">
          <Count className="max-w-[44rem]">
            <p className="label text-offer">{c.headline.eyebrow}</p>
            <h2 className="mt-4 font-display text-display font-bold text-chalk">
              {c.headline.heading}
            </h2>
            <Rule className="mt-5 max-w-[8rem]" delay={100} />
            <p className="mt-6 text-lead leading-relaxed text-chalk-2">{c.headline.intro}</p>
          </Count>

          <Count delay={90} className="mt-12">
            <p className="latin font-display text-[clamp(1.6rem,3.4vw,2.6rem)] font-bold text-chalk">
              {HEADLINE.model}
            </p>

            <dl className="mt-7 grid gap-px overflow-hidden border border-white/12 bg-white/12 sm:grid-cols-3">
              {(
                [
                  [c.headline.officialPriceLabel, HEADLINE.officialPrice],
                  [c.headline.depositFromLabel, HEADLINE.depositFrom],
                  [c.headline.monthlyFromLabel, HEADLINE.monthlyFrom],
                ] as [string, number][]
              ).map(([label, value], i) => (
                <div key={label} className="bg-card-2 p-6 sm:p-7">
                  <dt className="label text-chalk-2">{label}</dt>
                  <dd
                    className={`latin tnum mt-2 font-display text-[clamp(1.5rem,4vw,2.4rem)] font-bold leading-none ${
                      i === 0 ? "text-offer" : "theirs"
                    }`}
                  >
                    {money(value)}
                  </dd>
                  <dd className="label mt-1.5 text-chalk-3">{c.plans.currency}</dd>
                </div>
              ))}
            </dl>

            <ul className="mt-6 flex flex-wrap gap-x-7 gap-y-2">
              {HEADLINE.perks.map((p) => (
                <li key={p} className="flex items-baseline gap-2 text-[0.88rem] text-chalk-2">
                  <span aria-hidden="true" className="text-offer">
                    ✓
                  </span>
                  {c.headline.perks[p]}
                </li>
              ))}
            </ul>

            <a
              href={HEADLINE.postUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block text-[0.8rem] text-chalk-2 underline decoration-white/25 underline-offset-4 transition-colors hover:text-offer"
            >
              {c.headline.viewPost}
            </a>
          </Count>
        </div>
      </section>

      {/* ----------------------------------------------------------- plans -- */}
      <section id="plans" className="border-t border-white/10 bg-card py-20 sm:py-28">
        <div className="mx-auto max-w-[84rem] px-5 sm:px-8">
          <Count className="max-w-[44rem]">
            <p className="label text-offer">{c.plans.eyebrow}</p>
            <h2 className="mt-4 font-display text-display font-bold text-chalk">
              {c.plans.heading}
            </h2>
            <Rule className="mt-5 max-w-[8rem]" delay={100} />
            <p className="mt-6 text-lead leading-relaxed text-chalk-2">{c.plans.intro}</p>
          </Count>

          <Count delay={80} className="mt-10 flex flex-wrap items-baseline gap-x-8 gap-y-3">
            <span className="flex items-baseline gap-2">
              <span className="label text-chalk-2">{c.plans.interestLabel}</span>
              <span className="latin tnum font-display text-[1.6rem] font-bold text-offer">
                {PLAN_TERMS.interestFrom}%
              </span>
            </span>
            <ul className="flex flex-wrap gap-x-6 gap-y-1">
              {c.plans.termsList.map((t) => (
                <li key={t} className="text-[0.84rem] text-chalk-2">
                  {t}
                </li>
              ))}
            </ul>
          </Count>

          <Count delay={120} className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[40rem] border-collapse text-start">
              <thead>
                <tr className="border-b-2 border-chalk">
                  <th className="label py-3 text-start text-chalk-2">{c.plans.columns.model}</th>
                  <th className="label py-3 text-end text-chalk-2">{c.plans.columns.deposit}</th>
                  <th className="label py-3 text-end text-chalk-2">{c.plans.columns.monthly}</th>
                  <th className="label py-3 text-end text-chalk-2">{c.plans.columns.firstYear}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} className="border-b border-white/12">
                    <td className="latin py-4 text-[1rem] text-chalk">{r.model}</td>
                    <td className="latin tnum theirs py-4 text-end text-[1rem]">
                      {money(r.deposit)}
                    </td>
                    <td className="latin tnum theirs py-4 text-end text-[1rem]">
                      {money(r.monthly)}
                    </td>
                    <td className="py-4 text-end">
                      <span className="latin tnum derived text-[0.95rem]">
                        {money(r.firstYear)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Count>

          {/* The integrity note: which figures are theirs and which are not. */}
          <Count delay={160} className="mt-6 max-w-[46rem] border-s-2 border-offer ps-5">
            <p className="text-[0.85rem] leading-relaxed text-chalk-2">{c.plans.derivedNote}</p>
          </Count>
        </div>
      </section>

      {/* ------------------------------------------------------ efficiency -- */}
      <section id="efficiency" className="border-t border-white/10 bg-card-2 py-20 sm:py-28">
        <div className="mx-auto max-w-[84rem] px-5 sm:px-8">
          <Count className="max-w-[44rem]">
            <p className="label text-offer">{c.efficiency.eyebrow}</p>
            <h2 className="mt-4 font-display text-display font-bold text-chalk">
              {c.efficiency.heading}
            </h2>
            <Rule className="mt-5 max-w-[8rem]" delay={100} />
            <p className="mt-6 text-lead leading-relaxed text-chalk-2">{c.efficiency.intro}</p>
          </Count>

          <Count delay={90} className="mt-10">
            <p className="latin font-display text-[clamp(1.5rem,3.2vw,2.3rem)] font-bold text-chalk">
              {EFFICIENCY.model} <span className="tnum text-chalk-2">{EFFICIENCY.year}</span>
            </p>
            <ul className="mt-5 grid gap-px overflow-hidden border border-white/12 bg-white/12 sm:grid-cols-3">
              {EFFICIENCY.claims.map((k) => (
                <li key={k} className="bg-card-2 p-6 text-[0.95rem] leading-relaxed text-chalk">
                  {c.efficiency.claims[k]}
                </li>
              ))}
            </ul>
            <a
              href={EFFICIENCY.postUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-block text-[0.8rem] text-chalk-2 underline decoration-white/25 underline-offset-4 transition-colors hover:text-offer"
            >
              {c.efficiency.viewPost}
            </a>
          </Count>
        </div>
      </section>

      {/* ------------------------------------------------------------ shop -- */}
      <section id="shop" className="border-t border-white/10 bg-card py-20 sm:py-28">
        <div className="mx-auto max-w-[84rem] px-5 sm:px-8">
          <Count className="max-w-[44rem]">
            <p className="label text-offer">{c.shop.eyebrow}</p>
            <h2 className="mt-4 font-display text-display font-bold text-chalk">
              {c.shop.heading}
            </h2>
            <Rule className="mt-5 max-w-[8rem]" delay={100} />
          </Count>

          <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-14">
            <Count delay={70}>
              <div className="space-y-4 text-[0.96rem] leading-relaxed text-chalk-2">
                {c.shop.body.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
                {c.about.body.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
            </Count>

            <Count delay={120}>
              <dl className="space-y-5">
                <div className="border-t border-white/12 pt-4">
                  <dt className="label text-chalk-2">{c.contact.addressLabel}</dt>
                  <dd className="mt-1.5 text-[1.02rem] leading-snug text-chalk">
                    {c.contact.address}
                  </dd>
                </div>
                <div className="border-t border-white/12 pt-4">
                  <dt className="label text-chalk-2">{c.contact.phoneLabel}</dt>
                  <dd className="mt-1.5">
                    <a
                      href={PROFILE.phoneHref}
                      className="latin tnum text-[1.3rem] font-semibold text-offer transition-opacity hover:opacity-80"
                    >
                      {PROFILE.phone}
                    </a>
                  </dd>
                </div>
              </dl>

              <div className="mt-7 flex gap-8 border-t border-white/12 pt-5">
                <div>
                  <p className="tnum font-display text-[1.6rem] font-bold leading-none text-chalk">
                    {PROFILE.followers}
                  </p>
                  <p className="label mt-1 text-chalk-3">{c.shop.followersLabel}</p>
                </div>
                <div>
                  <p className="tnum font-display text-[1.6rem] font-bold leading-none text-chalk">
                    {PROFILE.posts}
                  </p>
                  <p className="label mt-1 text-chalk-3">{c.shop.postsLabel}</p>
                </div>
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href={PROFILE.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-offer-deep px-6 py-3 text-[0.85rem] font-semibold text-chalk transition-opacity hover:opacity-90"
                >
                  {c.shop.cta}
                </a>
                <a
                  href={PROFILE.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-white/25 px-6 py-3 text-[0.85rem] font-semibold text-chalk transition-colors hover:border-offer hover:text-offer"
                >
                  {c.shop.instagramCta}
                </a>
              </div>
            </Count>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ----------------------------------------------------------------- footer -- */

export function Footer() {
  const c = useZone();

  return (
    <footer className="border-t border-white/10 bg-card-2">
      <div className="mx-auto max-w-[84rem] px-5 py-11 sm:px-8 sm:py-13">
        <div className="grid gap-9 md:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] md:gap-14">
          <div>
            <div className="flex items-center gap-2.5">
              <img src="/mark.svg" alt="" className="h-6 w-6" />
              <span className="font-display text-[1rem] font-bold text-chalk">{c.brand.name}</span>
            </div>
            <p className="mt-4 text-[0.9rem] text-chalk-2">{c.brand.tagline}</p>
            <a
              href={PROFILE.phoneHref}
              className="latin tnum mt-3 inline-block text-[1rem] font-semibold text-offer"
            >
              {PROFILE.phone}
            </a>
          </div>
          <div className="space-y-5">
            <nav className="flex flex-wrap gap-x-7 gap-y-3">
              {c.nav.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="label text-chalk-2 transition-colors hover:text-offer"
                >
                  {l.label}
                </a>
              ))}
              <a
                href={PROFILE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="label text-chalk-2 transition-colors hover:text-offer"
              >
                {c.shop.instagramCta}
              </a>
            </nav>
            <div className="max-w-2xl space-y-2.5 border-t border-white/12 pt-5">
              <p className="label text-chalk-3">{c.footer.rights}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
