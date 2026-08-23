"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { GALLERY } from "@/content/site";

const AUTO_ADVANCE_MS = 5000;

/**
 * Rotating photo carousel of real Triple W units. CSS scroll-snap track
 * (no animation library), gentle auto-advance with a visible pause control,
 * paused while hovered, focused or touched, and disabled under
 * prefers-reduced-motion. No model names.
 */
export default function FleetCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<number | null>(null);
  const [index, setIndex] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [reduced, setReduced] = useState(false);
  const count = GALLERY.length;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const goTo = useCallback(
    (next: number) => {
      const track = trackRef.current;
      if (!track) return;
      const target = ((next % count) + count) % count;
      targetRef.current = target;
      track.scrollTo({
        left: target * track.clientWidth,
        behavior: reduced ? "auto" : "smooth",
      });
      setIndex(target);
    },
    [count, reduced]
  );

  // Keep the index in sync with manual swipes. While a programmatic scroll is
  // in flight, ignore intermediate positions so the dots don't flicker.
  const onScroll = () => {
    const track = trackRef.current;
    if (!track || track.clientWidth === 0) return;
    const i = Math.round(track.scrollLeft / track.clientWidth);
    if (targetRef.current !== null) {
      if (i === targetRef.current) targetRef.current = null;
      return;
    }
    if (i !== index) setIndex(i);
  };

  const autoplay = playing && !hovering && !reduced;

  useEffect(() => {
    if (!autoplay) return;
    const id = window.setInterval(() => goTo(index + 1), AUTO_ADVANCE_MS);
    return () => window.clearInterval(id);
  }, [index, autoplay, goTo]);

  const navBtn =
    "flex h-11 w-11 items-center justify-center border border-line bg-white text-ink transition-colors hover:border-navy";

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocus={() => setHovering(true)}
      onBlur={() => setHovering(false)}
      onTouchStart={() => setHovering(true)}
    >
      <div
        ref={trackRef}
        onScroll={onScroll}
        role="region"
        aria-roledescription="carousel"
        aria-label="Photos of Triple W rental RVs"
        className="clip-tr flex snap-x snap-mandatory overflow-x-auto scroll-smooth border border-line bg-navy [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {GALLERY.map((img, i) => (
          <figure
            key={img.src}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
            className="relative aspect-[4/3] w-full shrink-0 snap-start sm:aspect-[16/9]"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(min-width: 1280px) 1172px, 100vw"
              loading={i === 0 ? "eager" : "lazy"}
              className="object-cover"
              draggable={false}
            />
            <figcaption className="absolute bottom-0 left-0 bg-navy/85 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-white">
              {img.caption}
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between gap-4">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label="Previous photo"
            className={navBtn}
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={2.5} aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label="Next photo"
            className={navBtn}
          >
            <ChevronRight className="h-5 w-5" strokeWidth={2.5} aria-hidden />
          </button>
          {!reduced ? (
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              aria-pressed={!playing}
              aria-label={playing ? "Pause automatic rotation" : "Resume automatic rotation"}
              className={navBtn}
            >
              {playing ? (
                <Pause className="h-4 w-4" strokeWidth={2.5} aria-hidden />
              ) : (
                <Play className="h-4 w-4" strokeWidth={2.5} aria-hidden />
              )}
            </button>
          ) : null}
        </div>

        <div className="flex items-center gap-3">
          <ol className="hidden gap-2 sm:flex" aria-label="Choose a photo">
            {GALLERY.map((img, i) => (
              <li key={img.src}>
                <button
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Photo ${i + 1}: ${img.caption}`}
                  aria-current={i === index ? "true" : undefined}
                  className="flex h-11 w-6 items-center justify-center"
                >
                  <span
                    aria-hidden
                    className={`block h-2 transition-all ${
                      i === index ? "w-6 bg-action" : "w-3 bg-line"
                    }`}
                  />
                </button>
              </li>
            ))}
          </ol>
          <p className="whitespace-nowrap text-sm tabular-nums text-slate">
            {index + 1} / {count}
          </p>
        </div>
      </div>
    </div>
  );
}
