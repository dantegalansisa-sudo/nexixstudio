import { useEffect, useState, type RefObject } from "react";

/**
 * Computes the rect an image would occupy with object-fit: cover inside the
 * container, so overlays can be positioned in image-relative percentages.
 * `focusX`/`focusY` (0–1) mirror object-position.
 * With fit "width" the image always spans the full width (no side crop) and
 * `focusY` decides where it sits vertically.
 */
export function useCoverFrame(
  ref: RefObject<HTMLElement | null>,
  ratio: number,
  focusX = 0.5,
  focusY = 0.5,
  fit: "cover" | "width" = "cover"
) {
  const [frame, setFrame] = useState({ width: 0, height: 0, left: 0, top: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const cw = el.clientWidth;
      const ch = el.clientHeight;
      let width = cw;
      let height = cw / ratio;
      if (fit === "cover" && height < ch) {
        height = ch;
        width = ch * ratio;
      }
      setFrame({
        width,
        height,
        left: (cw - width) * focusX,
        top: (ch - height) * focusY,
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref, ratio, focusX, focusY, fit]);

  return frame;
}
