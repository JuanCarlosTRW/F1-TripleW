import { FAQ_CORE, FAQ_MORE } from "@/content/site";

function Item({ q, a, open }: { q: string; a: string; open?: boolean }) {
  return (
    <details
      open={open}
      className="group border-b border-line last:border-b-0"
    >
      <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-4 py-3.5 marker:content-none [&::-webkit-details-marker]:hidden">
        <span className="text-base font-semibold leading-snug text-ink">{q}</span>
        <span
          aria-hidden
          className="shrink-0 text-2xl leading-none text-ink transition-transform group-open:rotate-45"
        >
          +
        </span>
      </summary>
      <div className="px-4 pb-4">
        <p className="text-[15px] leading-relaxed text-slate">{a}</p>
      </div>
    </details>
  );
}

/**
 * Decisive FAQ (brief §7.11): eight questions, then the expanded list behind
 * "View all questions". Native <details> keeps accordions keyboard operable
 * and exposes expanded state.
 */
export default function Faq() {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="border border-line bg-white">
        {FAQ_CORE.map((item, i) => (
          <Item key={item.q} q={item.q} a={item.a} open={i === 0} />
        ))}
      </div>

      <details className="group mt-4 border border-line bg-white">
        <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-4 py-3.5 marker:content-none [&::-webkit-details-marker]:hidden">
          <span className="text-[15px] font-semibold uppercase tracking-wider text-ink">
            View all questions ({FAQ_MORE.length} more)
          </span>
          <span
            aria-hidden
            className="shrink-0 text-2xl leading-none text-ink transition-transform group-open:rotate-45"
          >
            +
          </span>
        </summary>
        <div className="border-t border-line">
          {FAQ_MORE.map((item) => (
            <Item key={item.q} q={item.q} a={item.a} />
          ))}
        </div>
      </details>
    </div>
  );
}
