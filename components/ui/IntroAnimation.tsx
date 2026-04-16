"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { gsap } from "gsap";
import Image from "next/image";

const F1_CAR_URL =
  "https://static.wixstatic.com/media/62f926_37bdf5fe398f43b08f6a9d1d09823a90~mv2.png";

interface IntroAnimationProps {
  children: ReactNode;
}

export default function IntroAnimation({ children }: IntroAnimationProps) {
  const carRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const car = carRef.current;
    const overlay = overlayRef.current;
    if (!car || !overlay) return;

    // Respect reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(true);
      return;
    }

    // Initial state
    gsap.set(car, { bottom: "-35vh", left: "50%", xPercent: -50, opacity: 1 });
    gsap.set(overlay, { clipPath: "inset(0% 0% 0% 0%)" });

    const tl = gsap.timeline({
      onComplete: () => setDone(true),
    });

    tl
      // Car enters fast from bottom → center (0–0.6s)
      .to(car, {
        bottom: "35vh",
        duration: 0.6,
        ease: "power2.out",
      }, 0)

      // Brief pause at center, then car rockets upward (0.6–1.8s)
      .to(car, {
        bottom: "130vh",
        duration: 1.2,
        ease: "power2.in",
      }, 0.7)

      // Black overlay wipes up in sync — starts slightly after car starts moving up
      .to(overlay, {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: 1.1,
        ease: "power1.inOut",
      }, 0.8)

      // Car fades as it exits top
      .to(car, {
        opacity: 0,
        duration: 0.3,
        ease: "power1.out",
      }, 1.5);

    return () => { tl.kill(); };
  }, []);

  return (
    <div className="relative">
      {/* Content is always rendered but covered by overlay initially */}
      {children}

      {/* Black overlay — covers everything, gets wiped away */}
      {!done && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[60] bg-[#0D0B09] pointer-events-none"
          style={{ clipPath: "inset(0% 0% 0% 0%)" }}
        />
      )}

      {/* F1 Car — drives from bottom to top */}
      {!done && (
        <div
          ref={carRef}
          className="fixed z-[70] pointer-events-none"
          style={{
            width: "clamp(120px, 18vw, 240px)",
            bottom: "-35vh",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          {/* Motion blur trails */}
          <div className="absolute inset-0 opacity-15 translate-y-[12px] blur-[1px]">
            <Image
              src={F1_CAR_URL}
              alt=""
              width={400}
              height={200}
              className="w-full h-auto"
              priority
              aria-hidden="true"
            />
          </div>
          <div className="absolute inset-0 opacity-30 translate-y-[6px]">
            <Image
              src={F1_CAR_URL}
              alt=""
              width={400}
              height={200}
              className="w-full h-auto"
              priority
              aria-hidden="true"
            />
          </div>
          {/* Main car */}
          <Image
            src={F1_CAR_URL}
            alt="F1 Racing Car"
            width={400}
            height={200}
            className="w-full h-auto relative drop-shadow-[0_0_30px_rgba(212,168,83,0.5)]"
            priority
          />
        </div>
      )}
    </div>
  );
}
