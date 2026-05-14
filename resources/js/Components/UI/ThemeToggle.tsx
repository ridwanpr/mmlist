import { useEffect, useState } from "react";
import { LuMoon, LuSun } from "react-icons/lu";

type Theme = "light" | "dark";

function getThemeFromDocument(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => getThemeFromDocument());

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.dataset.theme = theme;
    document.cookie = `theme=${theme}; path=/; max-age=31536000; samesite=lax`;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      }
      className="border-border bg-surface text-text inline-flex items-center justify-center rounded-full border p-2 shadow-sm"
    >
      {theme === "dark" ? (
        <LuSun className="h-5 w-5" />
      ) : (
        <LuMoon className="h-5 w-5" />
      )}
    </button>
  );
}
