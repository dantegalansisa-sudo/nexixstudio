import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";

type Line = { text: string; tone: "ink" | "blue" };

function Word({ word, tone, progress, range }: { word: string; tone: Line["tone"]; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.06, 1]);
  const y = useTransform(progress, range, ["0.45em", "0em"]);
  const filter = useTransform(progress, range, ["blur(10px)", "blur(0px)"]);
  return (
    <motion.span className={`nx-scrub__word ${tone === "blue" ? "nx-hero__line--blue" : ""}`} style={{ opacity, y, filter }}>
      {word}
    </motion.span>
  );
}

/**
 * Heading whose words light up one by one as it scrolls through the viewport
 * (scroll-linked, like GSAP ScrollTrigger scrub). Static with reduced motion.
 */
export default function ScrubWords({ lines, className = "", as: Tag = "h2" }: { lines: Line[]; className?: string; as?: "h1" | "h2" }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const reduce = !!useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.95", "start 0.3"] });
  const label = lines.map((l) => l.text).join(" ");
  const words = lines.flatMap((l, li) => l.text.split(" ").map((w, wi) => ({ w, tone: l.tone, key: `${li}-${wi}`, br: wi === 0 && li > 0 })));
  const n = words.length;

  return (
    <Tag ref={ref} className={`nx-scrub ${className}`} aria-label={label}>
      {words.map((x, i) => (
        <span key={x.key} aria-hidden="true">
          {x.br && <br />}
          {reduce ? (
            <span className={`nx-scrub__word ${x.tone === "blue" ? "nx-hero__line--blue" : ""}`}>{x.w}</span>
          ) : (
            <Word word={x.w} tone={x.tone} progress={scrollYProgress} range={[i / n, Math.min(1, (i + 1.6) / n)]} />
          )}{" "}
        </span>
      ))}
    </Tag>
  );
}
