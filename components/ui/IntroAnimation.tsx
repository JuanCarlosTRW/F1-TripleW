"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { gsap } from "gsap";
import F1HeroAnimation from "./F1HeroAnimation";

interface IntroAnimationProps {
  children: ReactNode;
}

export default function IntroAnimation({ children }: IntroAnimationProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(true);
      return;
    }

    gsap.set(overlay, { clipPath: "inset(0% 0% 0% 0%)" });

    const tl = gsap.timeline({
      onComplete: () => setDone(true),
    });

    tl.to(
      overlay,
      {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: 1.2,
        ease: "power1.inOut",
      },
      2.2
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="relative">
      {children}

      {!done && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[60] pointer-events-none overflow-hidden"
          style={{ clipPath: "inset(0% 0% 0% 0%)" }}
        >
          <F1HeroAnimation />
        </div>
      )}
    </div>
  );
}
