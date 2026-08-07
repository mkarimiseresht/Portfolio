import { useEffect, useRef } from "react";

/**
 * Applies a subtle vertical parallax offset to an element as the page scrolls,
 * based on the element's position relative to the viewport center.
 * Respects prefers-reduced-motion by doing nothing at all in that case.
 */
const useParallax = (speed = 0.12) => {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return undefined;

    let rafId = null;

    const update = () => {
      const rect = node.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const elementCenter = rect.top + rect.height / 2;
      const distance = elementCenter - viewportCenter;
      const offset = Math.max(-40, Math.min(40, distance * -speed));
      node.style.transform = `translateY(${offset}px)`;
      rafId = null;
    };

    const onScroll = () => {
      if (rafId === null) rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [speed]);

  return ref;
};

export default useParallax;