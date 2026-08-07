import { useEffect, useRef } from "react";

/**
 * Applies a parallax offset to an element as the page scrolls, driven by
 * raw scroll distance (so it keeps building as you scroll, rather than
 * maxing out once the element is centered in the viewport).
 * Respects prefers-reduced-motion by doing nothing at all in that case.
 *
 * @param {number} speed - how much of the scroll distance to translate by
 * @param {"x" | "y"} axis - direction to move
 * @param {number} max - max offset in px, in either direction
 */
const useParallax = (speed = 0.15, axis = "x", max = 70) => {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return undefined;

    let rafId = null;

    const update = () => {
      const offset = Math.max(-max, Math.min(max, window.scrollY * speed));
      node.style.transform = axis === "x" ? `translateX(${offset}px)` : `translateY(${offset}px)`;
      rafId = null;
    };

    const onScroll = () => {
      if (rafId === null) rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [speed, axis, max]);

  return ref;
};

export default useParallax;