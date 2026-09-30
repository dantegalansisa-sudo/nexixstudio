import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

export type LoopVideoSource = { mp4: string; webm: string; poster: string; width: number; height: number };

/**
 * Muted looping video that only downloads when it gets near the viewport and
 * pauses while off-screen. Sets the `muted` attribute (iOS needs it), puts MP4
 * first (reliable loops on Safari) and restarts itself if it ever stops.
 * With prefers-reduced-motion only the poster is shown.
 */
export default function LoopVideo({ src, className = "" }: { src: LoopVideoSource; className?: string }) {
  const reduce = !!useReducedMotion();
  const ref = useRef<HTMLVideoElement>(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v || reduce) return;
    v.muted = true;
    v.defaultMuted = true;
    v.setAttribute("muted", "");
    v.setAttribute("playsinline", "");

    let visible = false;
    const play = () => {
      if (visible && document.visibilityState === "visible") v.play().catch(() => {});
    };
    const restart = () => {
      v.currentTime = 0;
      play();
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setLoad(true);
        visible = entry.intersectionRatio > 0.15;
        if (visible) play();
        else v.pause();
      },
      { rootMargin: "300px 0px", threshold: [0, 0.15, 0.5] }
    );
    io.observe(v);
    v.addEventListener("ended", restart);
    v.addEventListener("canplay", play);
    document.addEventListener("visibilitychange", play);
    return () => {
      io.disconnect();
      v.removeEventListener("ended", restart);
      v.removeEventListener("canplay", play);
      document.removeEventListener("visibilitychange", play);
    };
  }, [reduce]);

  // Sources are injected lazily; tell the element to pick them up
  useEffect(() => {
    if (load) ref.current?.load();
  }, [load]);

  if (reduce) {
    return <img className={className} src={src.poster} alt="" width={src.width} height={src.height} loading="lazy" />;
  }

  return (
    <video
      ref={ref}
      className={className}
      muted
      loop
      playsInline
      preload="none"
      poster={src.poster}
      width={src.width}
      height={src.height}
      aria-hidden="true"
      tabIndex={-1}
    >
      {load && <source src={src.mp4} type="video/mp4" />}
      {load && <source src={src.webm} type="video/webm" />}
    </video>
  );
}
