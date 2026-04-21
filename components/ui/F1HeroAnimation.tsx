"use client";

import { useEffect, useRef } from "react";

const F1_CAR_URL =
  "https://static.wixstatic.com/media/62f926_3049f53a4cfd442ea58cdc92a52c35dc~mv2.png";

export default function F1HeroAnimation() {
  const particlesRef = useRef<HTMLDivElement>(null);
  const mainImgRef = useRef<HTMLImageElement>(null);
  const fallbackRef = useRef<SVGSVGElement>(null);
  const ghost1Ref = useRef<HTMLDivElement>(null);
  const ghost2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = particlesRef.current;
    if (!container) return;
    container.innerHTML = "";
    for (let i = 0; i < 25; i++) {
      const p = document.createElement("div");
      p.className = "particle";
      const startX = Math.random() * 100;
      const startY = 30 + Math.random() * 40;
      const tx = 50 + Math.random() * 80 + "vw";
      const ty = Math.random() * 60 - 30 + "px";
      p.style.left = startX + "%";
      p.style.top = startY + "%";
      p.style.setProperty("--tx", tx);
      p.style.setProperty("--ty", ty);
      p.style.animationDelay = 0.4 + Math.random() * 1.5 + "s";
      p.style.animationDuration = 1.5 + Math.random() * 1.5 + "s";
      container.appendChild(p);
    }
  }, []);

  useEffect(() => {
    const mainImg = mainImgRef.current;
    if (!mainImg) return;
    const handleError = () => {
      mainImg.style.display = "none";
      fallbackRef.current?.classList.add("show");
      [ghost1Ref.current, ghost2Ref.current].forEach((ghost) => {
        if (!ghost) return;
        const img = ghost.querySelector("img");
        if (img) img.style.display = "none";
      });
    };
    mainImg.addEventListener("error", handleError);
    return () => mainImg.removeEventListener("error", handleError);
  }, []);

  return (
    <div className="f1-hero-animation">
      <div className="stage active">
        <div className="horizon" />
        <div className="particles" ref={particlesRef} />

        <div className="streaks">
          {Array.from({ length: 10 }).map((_, i) => (
            <div className="streak" key={i} />
          ))}
        </div>

        <div className="glow-cool" />
        <div className="glow" />
        <div className="smoke-trail" />

        <div className="car-ghost ghost-1" ref={ghost1Ref}>
          <img src={F1_CAR_URL} alt="" crossOrigin="anonymous" referrerPolicy="no-referrer" />
        </div>
        <div className="car-ghost ghost-2" ref={ghost2Ref}>
          <img src={F1_CAR_URL} alt="" crossOrigin="anonymous" referrerPolicy="no-referrer" />
        </div>

        <div className="exhaust" />

        <div className="car-wrapper">
          <div className="car-bounce">
            <img
              ref={mainImgRef}
              src={F1_CAR_URL}
              alt=""
              className="car-img"
              crossOrigin="anonymous"
              referrerPolicy="no-referrer"
            />
            <svg
              ref={fallbackRef}
              className="fallback-car"
              viewBox="0 0 500 160"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="fbBody" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#e10600" />
                  <stop offset="50%" stopColor="#b10500" />
                  <stop offset="100%" stopColor="#700300" />
                </linearGradient>
                <radialGradient id="fbWheel" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#2a2a2a" />
                  <stop offset="70%" stopColor="#0a0a0a" />
                  <stop offset="100%" stopColor="#000" />
                </radialGradient>
              </defs>
              <rect x="60" y="35" width="60" height="8" fill="#fff" rx="1" />
              <rect x="70" y="30" width="40" height="4" fill="#e10600" />
              <rect x="85" y="43" width="10" height="20" fill="#222" />
              <circle cx="140" cy="110" r="35" fill="url(#fbWheel)" />
              <circle cx="140" cy="110" r="18" fill="#1a1a1a" />
              <circle cx="140" cy="110" r="8" fill="#444" />
              <circle cx="140" cy="110" r="3" fill="#e10600" />
              <path
                d="M 100 85 L 180 70 L 260 65 L 340 75 L 390 85 L 420 95 L 420 110 L 100 110 Z"
                fill="url(#fbBody)"
                stroke="#500"
                strokeWidth="1"
              />
              <path
                d="M 180 85 L 260 80 L 320 85 L 320 105 L 180 105 Z"
                fill="#1a1a1a"
                opacity="0.8"
              />
              <rect x="200" y="90" width="80" height="3" fill="#fff" opacity="0.6" />
              <path d="M 230 75 Q 270 45, 310 50 Q 330 55, 340 75 Z" fill="#111" />
              <ellipse cx="285" cy="65" rx="14" ry="12" fill="#fff" />
              <rect x="275" y="62" width="20" height="5" fill="#0a0a0a" />
              <rect x="380" y="92" width="55" height="5" fill="#fff" />
              <rect x="395" y="88" width="30" height="4" fill="#e10600" />
              <rect x="400" y="97" width="8" height="12" fill="#222" />
              <circle cx="360" cy="110" r="33" fill="url(#fbWheel)" />
              <circle cx="360" cy="110" r="17" fill="#1a1a1a" />
              <circle cx="360" cy="110" r="7" fill="#444" />
              <circle cx="360" cy="110" r="3" fill="#e10600" />
            </svg>
          </div>
        </div>

        <div className="shockwave" />
        <div className="flash" />

        <div className="finish-label">Finish</div>
        <div className="finish-line" />
        <div className="finish-glow" />

        <div className="vignette" />
      </div>

      <style jsx>{`
        .f1-hero-animation {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }
        .f1-hero-animation :global(.stage) {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at center, #1a0505 0%, #000 70%);
          overflow: hidden;
        }

        .f1-hero-animation :global(.finish-line) {
          position: absolute;
          top: 0;
          right: -80px;
          height: 100%;
          width: 80px;
          background: repeating-conic-gradient(#fff 0deg 90deg, #0a0a0a 90deg 180deg) 0 0 / 40px 40px;
          z-index: 4;
          box-shadow: -20px 0 40px rgba(255, 255, 255, 0.15),
            -40px 0 80px rgba(225, 6, 0, 0.2);
          opacity: 0;
        }
        .f1-hero-animation :global(.stage.active .finish-line) {
          animation: f1FinishSlideIn 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.2s forwards;
        }
        @keyframes f1FinishSlideIn {
          0% { right: -80px; opacity: 0; }
          100% { right: 0; opacity: 1; }
        }

        .f1-hero-animation :global(.finish-glow) {
          position: absolute;
          top: 0;
          right: 0;
          height: 100%;
          width: 200px;
          background: linear-gradient(270deg, rgba(255, 255, 255, 0.8), transparent);
          opacity: 0;
          z-index: 5;
          pointer-events: none;
          mix-blend-mode: screen;
        }
        .f1-hero-animation :global(.stage.active .finish-glow) {
          animation: f1FinishFlare 0.8s ease-out 3.4s;
        }
        @keyframes f1FinishFlare {
          0% { opacity: 0; }
          40% { opacity: 1; }
          100% { opacity: 0; }
        }

        .f1-hero-animation :global(.finish-label) {
          position: absolute;
          top: 50%;
          right: 100px;
          transform: translateY(-50%) rotate(-90deg);
          transform-origin: right center;
          font-size: 0.75rem;
          letter-spacing: 0.5em;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.4);
          text-transform: uppercase;
          z-index: 4;
          opacity: 0;
          white-space: nowrap;
        }
        .f1-hero-animation :global(.stage.active .finish-label) {
          animation: f1LabelFade 0.6s ease 0.8s forwards;
        }
        @keyframes f1LabelFade {
          to { opacity: 1; }
        }

        .f1-hero-animation :global(.particles) {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
        }
        .f1-hero-animation :global(.particle) {
          position: absolute;
          width: 3px;
          height: 3px;
          background: #ff3030;
          border-radius: 50%;
          opacity: 0;
          box-shadow: 0 0 8px #e10600, 0 0 16px rgba(225, 6, 0, 0.6);
        }
        .f1-hero-animation :global(.stage.active .particle) {
          animation: f1ParticleFly 2.5s ease-out forwards;
        }
        @keyframes f1ParticleFly {
          0% { opacity: 0; transform: translate(0, 0) scale(0); }
          20% { opacity: 1; transform: translate(var(--tx, 50vw), var(--ty, -30px)) scale(1); }
          100% { opacity: 0; transform: translate(calc(var(--tx, 50vw) * 2), var(--ty, -30px)) scale(0.2); }
        }

        .f1-hero-animation :global(.horizon) {
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #e10600, #ff5030, #e10600, transparent);
          box-shadow: 0 0 40px #e10600, 0 0 80px rgba(225, 6, 0, 0.6);
          opacity: 0;
          z-index: 2;
          transform: translateY(-50%);
        }
        .f1-hero-animation :global(.stage.active .horizon) {
          animation: f1HorizonGlow 2.5s ease-out 0.3s forwards;
        }
        @keyframes f1HorizonGlow {
          0% { opacity: 0; transform: translateY(-50%) scaleX(0); }
          40% { opacity: 1; transform: translateY(-50%) scaleX(1); }
          100% { opacity: 0.25; transform: translateY(-50%) scaleX(1); }
        }

        .f1-hero-animation :global(.streaks) {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 3;
        }
        .f1-hero-animation :global(.streak) {
          position: absolute;
          height: 2px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(225, 6, 0, 0.7) 20%,
            #fff 50%,
            rgba(225, 6, 0, 0.7) 80%,
            transparent
          );
          opacity: 0;
          transform: translateX(-100%);
          filter: blur(0.5px);
          border-radius: 2px;
        }
        .f1-hero-animation :global(.stage.active .streak:nth-child(1))  { top: 10%; width: 40vw; animation: f1Streak 1.4s ease-out 0.05s forwards; }
        .f1-hero-animation :global(.stage.active .streak:nth-child(2))  { top: 18%; width: 55vw; animation: f1Streak 1.3s ease-out 0.18s forwards; }
        .f1-hero-animation :global(.stage.active .streak:nth-child(3))  { top: 28%; width: 70vw; animation: f1Streak 1.2s ease-out 0.30s forwards; height: 3px; }
        .f1-hero-animation :global(.stage.active .streak:nth-child(4))  { top: 38%; width: 90vw; animation: f1Streak 1.1s ease-out 0.40s forwards; height: 3px; }
        .f1-hero-animation :global(.stage.active .streak:nth-child(5))  { top: 45%; width: 100vw; animation: f1Streak 1.0s ease-out 0.45s forwards; height: 4px; }
        .f1-hero-animation :global(.stage.active .streak:nth-child(6))  { top: 55%; width: 90vw; animation: f1Streak 1.1s ease-out 0.55s forwards; height: 3px; }
        .f1-hero-animation :global(.stage.active .streak:nth-child(7))  { top: 65%; width: 75vw; animation: f1Streak 1.2s ease-out 0.70s forwards; }
        .f1-hero-animation :global(.stage.active .streak:nth-child(8))  { top: 75%; width: 55vw; animation: f1Streak 1.3s ease-out 0.85s forwards; }
        .f1-hero-animation :global(.stage.active .streak:nth-child(9))  { top: 85%; width: 40vw; animation: f1Streak 1.4s ease-out 1.00s forwards; }
        .f1-hero-animation :global(.stage.active .streak:nth-child(10)) { top: 92%; width: 30vw; animation: f1Streak 1.4s ease-out 1.15s forwards; }
        @keyframes f1Streak {
          0% { transform: translateX(-100%); opacity: 0; }
          15% { opacity: 1; }
          100% { transform: translateX(250vw); opacity: 0; }
        }

        .f1-hero-animation :global(.glow) {
          position: absolute;
          top: 50%;
          left: -30%;
          width: 90vw;
          height: 70vh;
          transform: translate(-50%, -50%);
          background: radial-gradient(
            ellipse at center,
            rgba(255, 60, 20, 0.5) 0%,
            rgba(225, 6, 0, 0.3) 30%,
            transparent 65%
          );
          filter: blur(50px);
          opacity: 0;
          pointer-events: none;
          z-index: 2;
          mix-blend-mode: screen;
        }
        .f1-hero-animation :global(.stage.active .glow) {
          animation: f1GlowMove 2.8s cubic-bezier(0.35, 0.05, 0.2, 1) 0.35s forwards;
        }
        @keyframes f1GlowMove {
          0% { left: -20%; opacity: 0; }
          15% { opacity: 0.7; }
          45% { left: 50%; opacity: 1; }
          100% { left: 130%; opacity: 0; }
        }

        .f1-hero-animation :global(.glow-cool) {
          position: absolute;
          top: 50%;
          left: -30%;
          width: 60vw;
          height: 40vh;
          transform: translate(-50%, -50%);
          background: radial-gradient(ellipse, rgba(100, 150, 255, 0.2), transparent 60%);
          filter: blur(40px);
          opacity: 0;
          pointer-events: none;
          z-index: 2;
          mix-blend-mode: screen;
        }
        .f1-hero-animation :global(.stage.active .glow-cool) {
          animation: f1GlowCoolMove 2.8s cubic-bezier(0.35, 0.05, 0.2, 1) 0.45s forwards;
        }
        @keyframes f1GlowCoolMove {
          0% { left: -20%; opacity: 0; }
          50% { left: 55%; opacity: 0.8; }
          100% { left: 130%; opacity: 0; }
        }

        .f1-hero-animation :global(.car-ghost) {
          position: absolute;
          top: 50%;
          left: -60%;
          width: 55vw;
          max-width: 900px;
          min-width: 500px;
          transform: translateY(-50%);
          pointer-events: none;
          opacity: 0;
        }
        .f1-hero-animation :global(.car-ghost img) {
          width: 100%;
          height: auto;
          display: block;
        }
        .f1-hero-animation :global(.ghost-1) { z-index: 3; }
        .f1-hero-animation :global(.ghost-1 img) {
          filter: blur(20px) brightness(0.7) hue-rotate(-10deg);
          transform: scaleX(1.15);
        }
        .f1-hero-animation :global(.stage.active .ghost-1) {
          animation: f1GhostSweep1 4.4s cubic-bezier(0.22, 0.61, 0.36, 1) 0.3s forwards;
        }
        @keyframes f1GhostSweep1 {
          0% { left: -60%; opacity: 0; }
          45% { left: 5%; opacity: 0.45; }
          100% { left: 115%; opacity: 0; }
        }

        .f1-hero-animation :global(.ghost-2) { z-index: 4; }
        .f1-hero-animation :global(.ghost-2 img) {
          filter: blur(8px) brightness(0.85);
          transform: scaleX(1.08);
        }
        .f1-hero-animation :global(.stage.active .ghost-2) {
          animation: f1GhostSweep2 4.4s cubic-bezier(0.22, 0.61, 0.36, 1) 0.37s forwards;
        }
        @keyframes f1GhostSweep2 {
          0% { left: -60%; opacity: 0; }
          45% { left: 6%; opacity: 0.6; }
          100% { left: 116%; opacity: 0; }
        }

        .f1-hero-animation :global(.car-wrapper) {
          position: absolute;
          top: 50%;
          left: -60%;
          width: 55vw;
          max-width: 900px;
          min-width: 500px;
          transform: translateY(-50%);
          will-change: transform, left, filter;
          z-index: 6;
        }
        .f1-hero-animation :global(.stage.active .car-wrapper) {
          animation: f1CarSweep 4.5s cubic-bezier(0.22, 0.61, 0.36, 1) 0.4s forwards;
        }
        @keyframes f1CarSweep {
          0% {
            left: -60%;
            filter: blur(8px) drop-shadow(0 20px 30px rgba(225, 6, 0, 0.3)) brightness(0.7);
            transform: translateY(-50%) scale(0.82);
          }
          45% {
            left: 8%;
            filter: blur(0) drop-shadow(0 40px 80px rgba(225, 6, 0, 1))
              drop-shadow(0 0 60px rgba(255, 100, 50, 0.8)) brightness(1.15);
            transform: translateY(-50%) scale(1.05);
          }
          100% {
            left: 118%;
            filter: blur(2px) drop-shadow(0 20px 30px rgba(225, 6, 0, 0.3)) brightness(0.9);
            transform: translateY(-50%) scale(0.95);
          }
        }

        .f1-hero-animation :global(.car-img) {
          width: 100%;
          height: auto;
          display: block;
        }

        .f1-hero-animation :global(.fallback-car) {
          width: 100%;
          height: auto;
          display: none;
        }
        .f1-hero-animation :global(.fallback-car.show) { display: block; }

        .f1-hero-animation :global(.car-bounce) {
          animation: f1Bounce 0.15s ease-in-out infinite alternate;
        }
        @keyframes f1Bounce {
          from { transform: translateY(0) rotate(-0.5deg); }
          to   { transform: translateY(-2px) rotate(0.5deg); }
        }

        .f1-hero-animation :global(.exhaust) {
          position: absolute;
          top: 50%;
          left: -60%;
          width: 55vw;
          max-width: 900px;
          min-width: 500px;
          transform: translateY(-50%);
          pointer-events: none;
          z-index: 5;
          opacity: 0;
        }
        .f1-hero-animation :global(.exhaust::before) {
          content: "";
          position: absolute;
          left: -8%;
          top: 52%;
          width: 22%;
          height: 14%;
          transform: translateY(-50%);
          background: radial-gradient(
            ellipse at right,
            #fff 0%,
            #ffdd00 15%,
            #ff5500 40%,
            #e10600 65%,
            transparent 85%
          );
          filter: blur(6px);
          border-radius: 50%;
          animation: f1FlameFlicker 0.08s ease-in-out infinite alternate;
        }
        .f1-hero-animation :global(.stage.active .exhaust) {
          animation: f1ExhaustSweep 4.5s cubic-bezier(0.22, 0.61, 0.36, 1) 0.4s forwards;
        }
        @keyframes f1ExhaustSweep {
          0% { left: -60%; opacity: 0; }
          12% { opacity: 1; }
          45% { left: 8%; opacity: 1; }
          90% { opacity: 0.4; }
          100% { left: 118%; opacity: 0; }
        }
        @keyframes f1FlameFlicker {
          from { transform: translateY(-50%) scaleX(1) scaleY(1); opacity: 1; }
          to   { transform: translateY(-50%) scaleX(1.3) scaleY(0.85); opacity: 0.85; }
        }

        .f1-hero-animation :global(.smoke-trail) {
          position: absolute;
          top: 50%;
          left: 0;
          width: 100%;
          height: 35vh;
          transform: translateY(-50%);
          pointer-events: none;
          opacity: 0;
          z-index: 3;
        }
        .f1-hero-animation :global(.smoke-trail::before),
        .f1-hero-animation :global(.smoke-trail::after) {
          content: "";
          position: absolute;
          top: 50%;
          left: 0;
          width: 100%;
          height: 100%;
          transform: translateY(-50%);
          background: radial-gradient(
            ellipse at 30% 50%,
            rgba(255, 255, 255, 0.25) 0%,
            rgba(255, 100, 50, 0.2) 30%,
            transparent 65%
          );
          filter: blur(30px);
        }
        .f1-hero-animation :global(.smoke-trail::after) {
          background: radial-gradient(ellipse at 55% 50%, rgba(255, 80, 40, 0.3) 0%, transparent 55%);
          filter: blur(40px);
        }
        .f1-hero-animation :global(.stage.active .smoke-trail) {
          animation: f1SmokeDrift 2.5s ease-out 1.1s forwards;
        }
        @keyframes f1SmokeDrift {
          0% { opacity: 0; transform: translateY(-50%) scaleX(0.3) scaleY(0.8); }
          35% { opacity: 0.9; transform: translateY(-50%) scaleX(1) scaleY(1); }
          100% { opacity: 0; transform: translateY(-50%) scaleX(1.8) scaleY(1.5); }
        }

        .f1-hero-animation :global(.shockwave) {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 20px;
          height: 20px;
          transform: translate(-50%, -50%);
          border: 3px solid rgba(255, 255, 255, 0.8);
          border-radius: 50%;
          opacity: 0;
          pointer-events: none;
          z-index: 7;
        }
        .f1-hero-animation :global(.stage.active .shockwave) {
          animation: f1ShockExpand 0.9s cubic-bezier(0, 0.6, 0.3, 1) 1.7s forwards;
        }
        @keyframes f1ShockExpand {
          0% { opacity: 0.9; width: 20px; height: 20px; border-width: 4px; }
          100% { opacity: 0; width: 150vw; height: 150vw; border-width: 0; }
        }

        .f1-hero-animation :global(.flash) {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at 50% 50%,
            rgba(255, 255, 255, 1) 0%,
            rgba(255, 100, 50, 0.6) 20%,
            rgba(225, 6, 0, 0.3) 40%,
            transparent 70%
          );
          opacity: 0;
          pointer-events: none;
          mix-blend-mode: screen;
          z-index: 8;
        }
        .f1-hero-animation :global(.stage.active .flash) {
          animation: f1FlashBurst 0.6s ease-out 1.75s;
        }
        @keyframes f1FlashBurst {
          0%, 100% { opacity: 0; }
          30% { opacity: 1; }
        }

        .f1-hero-animation :global(.vignette) {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 10;
          background: radial-gradient(
            ellipse at center,
            transparent 40%,
            rgba(0, 0, 0, 0.4) 80%,
            rgba(0, 0, 0, 0.7) 100%
          );
        }

        @media (prefers-reduced-motion: reduce) {
          .f1-hero-animation :global(.stage.active *) {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
}
