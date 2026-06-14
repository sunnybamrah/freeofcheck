import { useEffect, useRef, useState } from "react";
import { S } from "../content/strings";
import { ShieldCheck } from "./Icons";

const SEEN_KEY = "foc_intro_seen_v1";

// One-time dismissible intro with the disclaimer in short form. Reads
// localStorage in an effect (client-only) so it never runs during prerender.
export function IntroModal() {
  const [open, setOpen] = useState(false);
  const acceptRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    try {
      if (!localStorage.getItem(SEEN_KEY)) setOpen(true);
    } catch {
      /* storage blocked — just skip the modal */
    }
  }, []);

  useEffect(() => {
    if (open) acceptRef.current?.focus();
  }, [open]);

  function dismiss() {
    try {
      localStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* ignore */
    }
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="intro-title"
      onKeyDown={(e) => {
        if (e.key === "Escape") dismiss();
      }}
    >
      <div className="w-full max-w-md rounded-2xl border border-hairline bg-surface p-5">
        <div className="flex items-center gap-2">
          <ShieldCheck className="text-teal" size={22} />
          <h2 id="intro-title" className="text-h2 text-ink">
            {S.disclaimer.modalTitle}
          </h2>
        </div>
        <p className="mt-3 text-body text-muted">{S.disclaimer.full}</p>
        <button
          ref={acceptRef}
          type="button"
          onClick={dismiss}
          className="mt-5 min-h-[44px] w-full rounded-xl bg-trustBtn px-5 text-body font-semibold text-white"
        >
          {S.disclaimer.modalAccept}
        </button>
      </div>
    </div>
  );
}
