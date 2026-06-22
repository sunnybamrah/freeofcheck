import { useEffect, useState } from "react";
import { Sun, Moon } from "./Icons";

const KEY = "foc_theme";

function apply(theme: "light" | "dark") {
  const el = document.documentElement;
  if (theme === "dark") el.setAttribute("data-theme", "dark");
  else el.removeAttribute("data-theme");
  // keep the iOS status-bar tint in sync
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", theme === "dark" ? "#0B0F14" : "#F2F3F6");
}

/** Light is the default; this toggles + persists an optional dark mode. */
export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    try {
      setDark(localStorage.getItem(KEY) === "dark");
    } catch {
      /* ignore */
    }
  }, []);

  function toggle() {
    const next = dark ? "light" : "dark";
    setDark(!dark);
    apply(next);
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* ignore */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline text-muted"
    >
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
