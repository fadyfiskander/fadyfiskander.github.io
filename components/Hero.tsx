import Image from "next/image";
import type { HeroData } from "@/lib/portfolio-data";

type HeroProps = {
  data: HeroData;
};

export default function Hero({ data }: HeroProps) {
  return (
    <section className="panel reveal-up overflow-hidden p-3 md:p-4">
      <header className="relative overflow-hidden rounded-2xl border border-[var(--border)]">
        <div className="relative h-72 w-full sm:h-80 md:h-[25rem]">
          <Image
            src={data.coverImage}
            alt="Project cover background"
            fill
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 800px"
            className="object-cover"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-black/25" />

        <div className="absolute inset-x-0 bottom-0 p-5 md:p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent)]">Welcome</p>
          <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">{data.name}</h2>
          <p className="mt-3 max-w-2xl text-sm text-zinc-200 md:text-base">{data.role}</p>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-zinc-300 md:text-base">{data.summary}</p>

          <a
            href={data.ctaHref}
            className="focus-ring mt-5 inline-flex items-center gap-2 rounded-lg border border-[var(--accent)] bg-[var(--accent-soft)] px-4 py-2 text-sm font-semibold text-[var(--accent)] transition hover:bg-[var(--accent)] hover:text-black"
          >
            {data.ctaLabel}
            <span aria-hidden="true">&gt;</span>
          </a>
        </div>
      </header>
    </section>
  );
}
