import { useEffect } from "react";

const DEFAULT_TITLE = document.title;
const descTag = () => document.querySelector<HTMLMetaElement>('meta[name="description"]');
const DEFAULT_DESCRIPTION = descTag()?.content ?? "";

/** Sets <title> and meta description for the current page; restores the defaults on unmount. */
export function useDocumentMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title;
    descTag()?.setAttribute("content", description);
    return () => {
      document.title = DEFAULT_TITLE;
      descTag()?.setAttribute("content", DEFAULT_DESCRIPTION);
    };
  }, [title, description]);
}
