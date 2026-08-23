import Image from "next/image";
import { UNITS, type UnitCard } from "@/content/site";

const AVAILABILITY_LABEL: Record<UnitCard["availability"], string> = {
  available: "Available for race weekend",
  "on-hold": "On hold, ask about it",
  booked: "Booked for race weekend",
};

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-line py-2 last:border-b-0">
      <dt className="text-xs uppercase tracking-wider text-slate">{label}</dt>
      <dd className="text-right text-sm font-medium text-ink">{value}</dd>
    </div>
  );
}

function Card({ unit }: { unit: UnitCard }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-md border border-line bg-white">
      <div className="relative aspect-[16/10]">
        <Image
          src={unit.exteriorImage}
          alt={`${unit.name} exterior`}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
        <span
          className={`absolute left-3 top-3 rounded-sm px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider ${
            unit.availability === "available"
              ? "bg-white text-ink"
              : "bg-navy text-white"
          }`}
        >
          {AVAILABILITY_LABEL[unit.availability]}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <h3 className="type-h3 text-ink">{unit.name}</h3>
        <p className="mt-1 text-sm font-medium text-action">{unit.bestFor}</p>

        <dl className="mt-4">
          <SpecRow label="Length" value={`${unit.lengthFt} ft`} />
          <SpecRow label="Slide-outs" value={unit.slideOuts} />
          <SpecRow label="Permanent beds" value={unit.permanentBeds} />
          <SpecRow label="Convertible beds" value={unit.convertibleBeds} />
          <SpecRow label="Sleeps comfortably" value={`${unit.realisticAdultCapacity} adults`} />
          <SpecRow label="Bathroom" value={unit.bathroom} />
          <SpecRow label="Kitchen" value={unit.kitchen} />
          <SpecRow label="Power" value={unit.power} />
        </dl>

        {unit.included.length > 0 ? (
          <p className="mt-4 text-xs leading-relaxed text-slate">
            Included: {unit.included.join(", ")}
          </p>
        ) : null}

        <div className="mt-auto pt-5">
          <p className="text-sm font-medium text-ink">{unit.priceContext}</p>
          <a href="#check-availability" className="btn-primary mt-3 w-full">
            Check This Unit for My Site
          </a>
        </div>
      </div>
    </article>
  );
}

/**
 * Exact unit cards (audit §3, §7). Renders only business-verified 2026
 * inventory from content/site.ts - nothing is invented while UNITS is empty.
 */
export default function UnitCards() {
  if (UNITS.length === 0) return null;
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {UNITS.map((unit) => (
        <Card key={unit.id} unit={unit} />
      ))}
    </div>
  );
}
