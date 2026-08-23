import Image from "next/image";
import { GALLERY } from "@/content/site";

/**
 * Static photo grid of real Triple W units. No carousel, no JS: eight
 * photos, each with a caption that only states what is visible.
 */
export default function FleetGallery() {
  return (
    <ul className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
      {GALLERY.map((img, i) => (
        <li key={img.src} className="group">
          <figure>
            <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-paper-warm">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                loading={i < 2 ? "eager" : "lazy"}
                className="object-cover"
              />
            </div>
            <figcaption className="mt-1.5 text-xs text-slate">{img.caption}</figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}
