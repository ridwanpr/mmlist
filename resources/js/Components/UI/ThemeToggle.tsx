import { useEffect, useSyncExternalStore } from "react";
import { LuMoon, LuSun } from "react-icons/lu";

type Theme = "light" | "dark";

const THEME_EVENT = "themechange";

function getTheme(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function subscribe(callback: () => void) {
  window.addEventListener(THEME_EVENT, callback);
  return () => window.removeEventListener(THEME_EVENT, callback);
}

function setTheme(next: Theme) {
  document.documentElement.classList.toggle("dark", next === "dark");
  document.documentElement.dataset.theme = next;
  document.cookie = `theme=${next}; path=/; max-age=31536000; samesite=lax`;
  window.dispatchEvent(new Event(THEME_EVENT));
}

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getTheme, () => "light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.dataset.theme = theme;
    document.cookie = `theme=${theme}; path=/; max-age=31536000; samesite=lax`;
  }, [theme]);

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label={
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      }
      className="border-border bg-surface text-text inline-flex items-center justify-center rounded-full border p-2 shadow-sm hover:cursor-pointer"
    >
      {theme === "dark" ? (
        <LuSun className="h-5 w-5" />
      ) : (
        <LuMoon className="h-5 w-5" />
      )}
    </button>
  );
}
