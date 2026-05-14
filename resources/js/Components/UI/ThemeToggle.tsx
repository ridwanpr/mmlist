import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function getInitialTheme(initialTheme?: Theme): Theme {
  if (initialTheme) return initialTheme;

  if (typeof document === "undefined") return "light";

  const cookieTheme = document.cookie
    .split("; ")
    .find((row) => row.startsWith("theme="))
    ?.split("=")[1];

  return cookieTheme === "dark" ? "dark" : "light";
}

export default function ThemeToggle({
  initialTheme,
}: {
  initialTheme?: Theme;
}) {
  const [theme, setTheme] = useState<Theme>(() =>
    getInitialTheme(initialTheme),
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.cookie = `theme=${theme}; path=/; max-age=31536000; samesite=lax`;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  };

  return (
    <button type="button" onClick={toggleTheme}>
      {theme === "dark" ? "Light mode" : "Dark mode"}
    </button>
  );
}
