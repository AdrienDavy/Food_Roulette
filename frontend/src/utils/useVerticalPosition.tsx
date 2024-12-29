import { useEffect, useState } from "react";

export const useVerticalPosition = (
  ref: React.RefObject<HTMLElement>,
  firstHalf: string,
  secondHalf: string
) => {
  const [windowPosition, setWindowPosition] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Vérifie si l'élément est dans la première ou deuxième moitié de l'écran
      if (rect.top > windowHeight / 2) {
        setWindowPosition(secondHalf);
      } else {
        setWindowPosition(firstHalf);
      }
    };

    // Écoute le scroll et le redimensionnement de la fenêtre
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    // Calcul initial
    handleScroll();

    // Nettoyage
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [ref, firstHalf, secondHalf]);

  return windowPosition;
};
