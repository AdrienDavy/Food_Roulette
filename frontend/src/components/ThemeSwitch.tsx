import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

function ThemeSwitch() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <label
      htmlFor="toggle-switch"
      className="relative inline-flex items-center cursor-pointer"
      title={`Passer en ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <input
        id="toggle-switch"
        type="checkbox"
        checked={theme === "dark"}
        className="sr-only peer"
        onChange={handleThemeSwitch}
      />
      <div className="w-8 h-4 bg-gradient-to-bl from-primary/20 to-secondary/80 peer-focus:outline-none peer-checked:bg-gradient-to-tr peer-checked:from-primary/20 peer-checked:to-secondary/80 transition-colors duration-300 rounded-full border-gradient">
        <div
          className={`absolute top-1/2 -translate-y-1/2 left-0 w-[0.9rem] h-[0.9rem] bg-light border-primary rounded-full transition-all duration-300 ${
            theme === "dark" ? "translate-x-[17px]" : "translate-x-[1px]"
          } flex items-center justify-center`}
        >
          <svg
            viewBox="0 0 24 24"
            fill="#0C0928"
            width="12px"
            xmlns="http://www.w3.org/2000/svg"
            className={`${
              theme === "dark" ? "opacity-100" : "opacity-0"
            } transition-opacity duration-300`}
          >
            <path
              d="M12 23V22M4.22183 19.7782L4.92893 19.0711M1 12H2M4.22183 4.22183L4.92893 4.92893M12 2V1M19.0711 4.92893L19.7782 4.22183M22 12H23M19.0711 19.0711L19.7782 19.7782M18 12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12Z"
              stroke={theme === "dark" ? "#0C0928" : "none"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <FontAwesomeIcon
            className={`absolute ${
              theme === "light"
                ? "opacity-100 text-secondary"
                : "opacity-0 text-secondary"
            } transition-opacity duration-300 text-xs`}
            icon={faMoon}
          />
        </div>
      </div>
    </label>
  );
}

export default ThemeSwitch;
