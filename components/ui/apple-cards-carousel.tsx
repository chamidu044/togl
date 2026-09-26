"use client";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useOutsideClick } from "@/hooks/use-outside-click";

// Aceternity UI — Apple Cards Carousel, themed for TOGL.

type CardData = {
  src: string;
  alt: string;
  title: string;
  category: string;
  content: React.ReactNode;
};

const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
}>({ onCardClose: () => {} });

export const Carousel = ({ items }: { items: React.ReactElement[] }) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollability = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    checkScrollability();
    window.addEventListener("resize", checkScrollability);
    return () => window.removeEventListener("resize", checkScrollability);
  }, [checkScrollability]);

  const step = () => (window.innerWidth < 768 ? 260 : 420);
  const scrollLeft = () =>
    carouselRef.current?.scrollBy({ left: -step(), behavior: "smooth" });
  const scrollRight = () =>
    carouselRef.current?.scrollBy({ left: step(), behavior: "smooth" });

  const handleCardClose = (index: number) => {
    const el = carouselRef.current;
    if (!el) return;
    const card = el.querySelectorAll<HTMLElement>("[data-card]")[index];
    if (card) el.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
  };

  return (
    <CarouselContext.Provider value={{ onCardClose: handleCardClose }}>
      <div className="relative w-full">
        <div
          ref={carouselRef}
          onScroll={checkScrollability}
          className="carousel-gutter flex w-full snap-x snap-mandatory scroll-pl-[var(--gutter)] overflow-x-scroll overscroll-x-auto scroll-smooth py-8 [scrollbar-width:none] md:py-10 [&::-webkit-scrollbar]:hidden"
        >
          <div className="flex flex-row justify-start gap-4 px-[var(--gutter)]">
            {items.map((item, index) => (
              <motion.div
                key={"card" + index}
                data-card
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.55, delay: 0.08 * index, ease: "easeOut" }}
                className="snap-start rounded-panel"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
        <div className="container-page flex justify-end gap-2">
          <button
            type="button"
            aria-label="Previous services"
            className="press flex h-11 w-11 items-center justify-center rounded-full bg-mist text-ink hover:bg-hairline disabled:opacity-40"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next services"
            className="press flex h-11 w-11 items-center justify-center rounded-full bg-mist text-ink hover:bg-hairline disabled:opacity-40"
            onClick={scrollRight}
            disabled={!canScrollRight}
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

export const Card = ({
  card,
  index,
  layout = false,
}: {
  card: CardData;
  index: number;
  layout?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { onCardClose } = useContext(CarouselContext);

  const handleClose = useCallback(() => {
    setOpen(false);
    onCardClose(index);
  }, [index, onCardClose]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, handleClose]);

  useOutsideClick(containerRef, () => open && handleClose());

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[70] h-dvh overflow-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 h-full w-full bg-tile-navy/40 backdrop-blur-xl"
            />
            <motion.div
              ref={containerRef}
              role="dialog"
              aria-modal="true"
              aria-label={card.title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              layoutId={layout ? `card-${card.title}` : undefined}
              className="relative z-[80] mx-auto my-6 h-fit max-w-4xl rounded-panel bg-canvas p-5 shadow-[0_30px_80px_-20px_rgba(14,31,66,0.35)] md:my-12 md:p-10"
            >
              <button
                type="button"
                autoFocus
                aria-label="Close"
                className="press sticky top-4 right-0 ml-auto flex h-10 w-10 items-center justify-center rounded-full bg-ink text-white"
                onClick={handleClose}
              >
                <X className="h-5 w-5" />
              </button>
              <motion.p
                layoutId={layout ? `category-${card.title}` : undefined}
                className="text-caption-strong text-brand-teal"
              >
                {card.category}
              </motion.p>
              <motion.p
                layoutId={layout ? `title-${card.title}` : undefined}
                className="text-display-xl mt-2 text-ink"
              >
                {card.title}
              </motion.p>
              <div className="pt-8">{card.content}</div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <motion.button
        type="button"
        layoutId={layout ? `card-${card.title}` : undefined}
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className="group relative z-10 flex h-[26rem] w-64 flex-col items-start justify-start overflow-hidden rounded-panel bg-mist text-left md:h-[36rem] md:w-[25rem]"
      >
        <div className="pointer-events-none absolute inset-0 z-30 bg-gradient-to-b from-tile-navy/70 via-tile-navy/10 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-1/3 bg-gradient-to-t from-tile-navy/60 to-transparent" />
        <div className="relative z-40 p-7 md:p-8">
          <motion.p
            layoutId={layout ? `category-${card.category}` : undefined}
            className="text-caption-strong text-white/80 md:text-body-strong"
          >
            {card.category}
          </motion.p>
          <motion.p
            layoutId={layout ? `title-${card.title}` : undefined}
            className="mt-2 max-w-xs text-2xl font-semibold tracking-tight text-balance text-white md:text-[2rem] md:leading-tight"
          >
            {card.title}
          </motion.p>
        </div>
        <span className="absolute right-5 bottom-5 z-40 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition duration-300 group-hover:bg-white group-hover:text-ink">
          <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:-rotate-45" />
        </span>
        <Image
          src={card.src}
          alt={card.alt}
          fill
          sizes="(min-width: 768px) 400px, 256px"
          className="absolute inset-0 z-10 object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </motion.button>
    </>
  );
};
