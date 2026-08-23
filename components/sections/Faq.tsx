import { FAQ_CORE, FAQ_SECONDARY } from "@/content/site";

function Item({ q, a, open }: { q: string; a: string; open?: boolean }) {
  return (
    <details
      open={open}
      className="group rounded-md border border-line bg-white transition-colors open:border-navy/30"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 marker:content-none [&::-webkit-details-marker]:hidden">
        <span className="text-[15px] font-semibold leading-snug text-ink">{q}</span>
        <span
          aria-hidden
          className="shrink-0 text-xl leading-none text-action transition-transform group-open:rotate-45"
        >
          +
        </span>
      </summary>
      <div className="border-t border-line px-5 py-4">
        <p className="type-body-sm text-slate">{a}</p>
      </div>
    </details>
  );
}

/**
 * Prioritized FAQ (audit §13). The top five booking blockers are also answered
 * up-page in their own sections - this is the consolidated reference.
 */
export default function Faq() {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="space-y-3">
        {FAQ_CORE.map((item, i) => (
          <Item key={item.q} q={item.q} a={item.a} open={i === 0} />
        ))}
      </div>

      <h3 className="type-h3 mb-4 mt-12 text-ink">Planning details</h3>
      <div className="space-y-3">
        {FAQ_SECONDARY.map((item) => (
          <Item key={item.q} q={item.q} a={item.a} />
        ))}
      </div>
    </div>
  );
}
