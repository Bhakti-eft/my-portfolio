import { useEffect, useState } from 'react';

interface Options {
  typeMs?: number;
  deleteMs?: number;
  holdMs?: number;
  /** When true, words rotate without the per-letter animation. */
  instant?: boolean;
}

/** Types, holds and deletes each word in turn. */
export function useTypewriter(words: string[], { typeMs = 70, deleteMs = 35, holdMs = 1600, instant = false }: Options = {}) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(instant ? words[0] ?? '' : '');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (words.length === 0) return;
    const word = words[index % words.length];

    if (instant) {
      setText(word);
      const t = window.setTimeout(() => setIndex((i) => i + 1), holdMs + 1200);
      return () => window.clearTimeout(t);
    }

    let delay = deleting ? deleteMs : typeMs;
    if (!deleting && text === word) delay = holdMs;

    const t = window.setTimeout(() => {
      if (!deleting && text === word) {
        setDeleting(true);
      } else if (deleting && text === '') {
        setDeleting(false);
        setIndex((i) => i + 1);
      } else {
        setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
      }
    }, delay);
    return () => window.clearTimeout(t);
  }, [words, index, text, deleting, typeMs, deleteMs, holdMs, instant]);

  return text;
}
