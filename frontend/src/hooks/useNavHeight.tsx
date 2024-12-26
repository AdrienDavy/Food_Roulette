import { useEffect, useState } from "react";

const useNavHeight = () => {
  const [navHeight, setNavHeight] = useState(0);

  useEffect(() => {
    const updateNavHeight = () => {
      const nav = document.querySelector("nav");
      if (nav) {
        setNavHeight(nav.clientHeight);
      }
    };

    // Calcul initial
    updateNavHeight();

    // Recalculer si la fenêtre est redimensionnée
    window.addEventListener("resize", updateNavHeight);

    return () => {
      window.removeEventListener("resize", updateNavHeight);
    };
  }, []);

  return navHeight;
};

export default useNavHeight;
