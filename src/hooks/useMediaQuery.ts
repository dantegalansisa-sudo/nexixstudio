import { useEffect, useState } from "react";

/** Tracks a CSS media query. Reads it synchronously on first render to avoid a layout flash. */
export function useMediaQuery(query: string) {
  const [match, setMatch] = useState(() => typeof window !== "undefined" && window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setMatch(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [query]);
  return match;
}

/** Phones only; the desktop/tablet hero is used from 768px up. */
export const MOBILE_QUERY = "(max-width: 767px)";
