"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ZoomIn, Maximize2, Play } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export type GalleryItem =
  | { type: "image"; src: string }
  | { type: "video"; src: string; poster?: string };

type Props = {
  items?: GalleryItem[];
  images?: string[];
  autoPlayInterval?: number;
  showThumbnails?: boolean;
  enableFullscreen?: boolean;
};

function toItems(props: Pick<Props, "items" | "images">): GalleryItem[] {
  if (props.items?.length) return props.items;
  return (props.images ?? []).map((src) => ({ type: "image" as const, src }));
}

export default function PremiumImageGallery({
  items,
  images,
  autoPlayInterval = 5000,
  showThumbnails = true,
  enableFullscreen = true,
}: Props) {
  const media = toItems({ items, images });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const pauseAutoPlay = useCallback(() => {
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  }, []);

  const goNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % media.length);
    pauseAutoPlay();
  }, [media.length, pauseAutoPlay]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + media.length) % media.length);
    pauseAutoPlay();
  }, [media.length, pauseAutoPlay]);

  const currentItem = media[currentIndex];
  const isVideoSlide = currentItem?.type === "video";

  useEffect(() => {
    if (!isAutoPlaying || isFullscreen || isVideoSlide) return;
    autoPlayRef.current = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % media.length);
    }, autoPlayInterval);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlaying, media.length, autoPlayInterval, isFullscreen, isVideoSlide]);

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const threshold = 50;
    if (info.offset.x < -threshold) goNext();
    else if (info.offset.x > threshold) goPrev();
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    pauseAutoPlay();
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    setIsZoomed(false);
  };

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 1000 : -1000, opacity: 0, scale: 0.92 }),
    center: { zIndex: 1, x: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({ zIndex: 0, x: dir < 0 ? 1000 : -1000, opacity: 0, scale: 0.92 }),
  };

  return (
    <>
      <div className="relative w-full">
        <div className="relative bg-charcoal-warm/60 rounded-2xl overflow-hidden border border-gold/15 shadow-[0_10px_60px_rgba(0,0,0,0.4)]">
          <div className="relative aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] overflow-hidden bg-charcoal">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 280, damping: 32 },
                  opacity: { duration: 0.3 },
                  scale: { duration: 0.3 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                className="absolute inset-0 cursor-grab active:cursor-grabbing"
              >
                {currentItem?.type === "video" ? (
                  <video
                    key={currentItem.src}
                    src={currentItem.src}
                    poster={currentItem.poster}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
                  />
                ) : (
                  <Image
                    src={currentItem!.src}
                    alt={`Gallery image ${currentIndex + 1}`}
                    fill
                    priority={currentIndex === 0}
                    sizes="(min-width: 1024px) 80vw, 100vw"
                    className="object-cover select-none pointer-events-none"
                    draggable={false}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent" />
              </motion.div>
            </AnimatePresence>

            {enableFullscreen && !isVideoSlide && (
              <div className="absolute top-3 right-3 md:top-4 md:right-4 z-10">
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={toggleFullscreen}
                  className="p-2 md:p-2.5 rounded-full bg-charcoal/80 backdrop-blur-sm hover:bg-charcoal text-gold transition-colors"
                  aria-label="Fullscreen"
                >
                  <Maximize2 size={isMobile ? 16 : 18} />
                </motion.button>
              </div>
            )}

            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2 md:px-4 z-10 pointer-events-none">
              <motion.button
                whileHover={{ scale: 1.1, x: -3 }}
                whileTap={{ scale: 0.94 }}
                onClick={goPrev}
                className="pointer-events-auto p-2 md:p-3 rounded-full bg-charcoal/80 backdrop-blur-sm hover:bg-charcoal text-gold transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft size={isMobile ? 20 : 24} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1, x: 3 }}
                whileTap={{ scale: 0.94 }}
                onClick={goNext}
                className="pointer-events-auto p-2 md:p-3 rounded-full bg-charcoal/80 backdrop-blur-sm hover:bg-charcoal text-gold transition-colors"
                aria-label="Next"
              >
                <ChevronRight size={isMobile ? 20 : 24} />
              </motion.button>
            </div>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {media.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className="relative focus:outline-none"
                  aria-label={`Go to slide ${index + 1}`}
                >
                  <div
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex
                        ? "bg-gold w-6"
                        : "bg-white/40 hover:bg-white/70"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {showThumbnails && (
            <div className="p-4 md:p-5 bg-charcoal-warm/80 border-t border-gold/10">
              <div className="flex gap-2 md:gap-3 overflow-x-auto pb-1">
                {media.map((item, index) => (
                  <motion.button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`relative flex-shrink-0 w-16 h-14 md:w-20 md:h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      index === currentIndex
                        ? "border-gold shadow-[0_0_16px_rgba(212,168,83,0.3)]"
                        : "border-white/10 hover:border-gold/50 opacity-70 hover:opacity-100"
                    }`}
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    {item.type === "video" ? (
                      <>
                        {item.poster ? (
                          <Image
                            src={item.poster}
                            alt={`Thumbnail ${index + 1}`}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        ) : (
                          <video
                            src={item.src}
                            muted
                            playsInline
                            preload="metadata"
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        )}
                        <div className="absolute inset-0 flex items-center justify-center bg-charcoal/40">
                          <Play size={14} className="text-gold drop-shadow" fill="currentColor" />
                        </div>
                      </>
                    ) : (
                      <Image
                        src={item.src}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          )}
        </div>

        <p className="text-center mt-5 text-xs md:text-sm text-text-secondary tabular-nums">
          {currentIndex + 1} / {media.length}
        </p>
      </div>

      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-charcoal/95 backdrop-blur-lg"
            onClick={() => !isZoomed && toggleFullscreen()}
          >
            <div className="relative w-full h-full flex items-center justify-center p-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleFullscreen}
                className="absolute top-4 right-4 p-3 rounded-full bg-charcoal/80 hover:bg-charcoal text-gold z-10"
                aria-label="Close fullscreen"
              >
                <X size={24} />
              </motion.button>
              {!isVideoSlide && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsZoomed(!isZoomed);
                  }}
                  className="absolute top-4 right-20 p-3 rounded-full bg-charcoal/80 hover:bg-charcoal text-gold z-10"
                  aria-label="Zoom"
                >
                  <ZoomIn size={24} />
                </motion.button>
              )}

              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 z-10">
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    goPrev();
                  }}
                  size="lg"
                  variant="secondary"
                  className="rounded-full size-12 p-0"
                >
                  <ChevronLeft size={24} />
                </Button>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    goNext();
                  }}
                  size="lg"
                  variant="secondary"
                  className="rounded-full size-12 p-0"
                >
                  <ChevronRight size={24} />
                </Button>
              </div>

              <motion.div
                className={`relative max-w-[92vw] max-h-[85vh] w-full h-full ${
                  isVideoSlide
                    ? ""
                    : isZoomed
                    ? "cursor-zoom-out"
                    : "cursor-zoom-in"
                }`}
                animate={{ scale: !isVideoSlide && isZoomed ? 1.5 : 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isVideoSlide) setIsZoomed(!isZoomed);
                }}
              >
                {isVideoSlide ? (
                  <video
                    key={currentItem.src}
                    src={currentItem.src}
                    poster={currentItem.type === "video" ? currentItem.poster : undefined}
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls
                    className="absolute inset-0 w-full h-full object-contain"
                  />
                ) : (
                  <Image
                    src={currentItem!.src}
                    alt={`Fullscreen image ${currentIndex + 1}`}
                    fill
                    sizes="90vw"
                    className="object-contain select-none"
                    draggable={false}
                  />
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
