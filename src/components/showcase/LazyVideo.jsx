import React, { useRef, useEffect } from "react";

// Autoplaying loop video that only plays (and buffers) while on screen — saves mobile data.
// A small rootMargin means it only starts fetching once it's actually about to
// enter the viewport, instead of every card firing at once on page load.
export default function LazyVideo({ src, className }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { rootMargin: "150px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [src]);
  return <video ref={ref} src={src} muted loop playsInline preload="none" className={className} />;
}

