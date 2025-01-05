import { useEffect, useState } from "react";

export type PositionClass = "top-full" | "bottom-full";

export const useDropdownPosition = <T extends HTMLElement>(
  triggerRef: React.RefObject<T>,
  dropdownRef: React.RefObject<HTMLUListElement>
): PositionClass => {
  const [position, setPosition] = useState<PositionClass>("top-full");

  useEffect(() => {
    const updatePosition = () => {
      if (!triggerRef.current || !dropdownRef.current) return;

      const triggerRect = triggerRef.current.getBoundingClientRect();
      const dropdownHeight = dropdownRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;

      const fitsBelow = triggerRect.bottom + dropdownHeight <= viewportHeight;
      const fitsAbove = triggerRect.top - dropdownHeight >= 0;

      setPosition(
        fitsBelow ? "top-full" : fitsAbove ? "bottom-full" : "top-full"
      );
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition);
    };
  }, [triggerRef, dropdownRef]);

  return position;
};
