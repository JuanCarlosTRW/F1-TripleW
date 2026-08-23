import { FAQ_CORE, FAQ_SECONDARY } from "@/content/site";

function Item({ q, a, open }: { q: string; a: string; open?: boolean }) {
  return (
    <details
      open={open}
      className="group border-b border-line transition-colors last:border-b-0 open:bg-white"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-3 py-3.5 marker:content-none [&::-webkit-details-marker]:hidden">
        <span className="text-[15px] font-semibold leading-snug text-ink">{q}</span>
        <span
          aria-hidden
          className="shrink-0 text-xl leading-none text-action transition-transform group-open:rotate-45"
        >
          +
        </span>
      </summary>
      <div className="px-3 pb-4">
        <p className="text-sm leading-relaxed text-slate">{a}</p>
      </div>
    </details>
  );
}

/**
 * Prioritized FAQ (audit §13). The top five booking blockers are also answered
 * up-page in their own sections; this is the consolidated reference. Secondary
 * planning questions sit in one collapsed group to keep the page short.
 */
export default function Faq() {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-md border border-line bg-paper-warm/60">
        {FAQ_CORE.map((item, i) => (
          <Item key={item.q} q={item.q} a={item.a} open={i === 0} />
        ))}
      </div>

      <details className="group mt-4 rounded-md border border-line bg-paper-warm/60">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-3 py-3.5 marker:content-none [&::-webkit-details-marker]:hidden">
          <span className="text-[15px] font-semibold leading-snug text-ink">
            More planning details ({FAQ_SECONDARY.length} questions: distance, noise, pets, cell
            service, ADA)
          </span>
          <span
            aria-hidden
            className="shrink-0 text-xl leading-none text-action transition-transform group-open:rotate-45"
          >
            +
          </span>
        </summary>
        <div className="border-t border-line">
          {FAQ_SECONDARY.map((item) => (
            <Item key={item.q} q={item.q} a={item.a} />
          ))}
        </div>
      </details>
    </div>
  );
}
