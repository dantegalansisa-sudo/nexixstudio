import { useEffect } from "react";

const SITE = "https://www.nexixstudio.com";
const DEFAULT_TITLE = document.title;
const tag = (sel: string) => document.querySelector<HTMLElement>(sel);
const DEFAULT_DESCRIPTION = tag('meta[name="description"]')?.getAttribute("content") ?? "";

function setMeta(title: string, description: string, path: string) {
  document.title = title;
  tag('meta[name="description"]')?.setAttribute("content", description);
  tag('meta[property="og:title"]')?.setAttribute("content", title);
  tag('meta[property="og:description"]')?.setAttribute("content", description);
  tag('meta[property="og:url"]')?.setAttribute("content", SITE + path);
  tag('link[rel="canonical"]')?.setAttribute("href", SITE + path);
}

/** Sets title, description and canonical for the current page; restores the home values on unmount. */
export function useDocumentMeta(title: string, description: string) {
  useEffect(() => {
    setMeta(title, description, window.location.pathname);
    return () => setMeta(DEFAULT_TITLE, DEFAULT_DESCRIPTION, "/");
  }, [title, description]);
}
