import { useEffect, useRef } from "react";

/**
 * Adds an "in-view" class to the element once it scrolls into the viewport.
 * Pair with the .reveal utility class in style.css.
 */
const useScrollReveal = (options = { threshold: 0.15 }) => {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    }, options);

    observer.observe(node);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
};

export default useScrollReveal;
