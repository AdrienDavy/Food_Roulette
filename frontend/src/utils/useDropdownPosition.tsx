import { useEffect, useState } from "react";

export const useDropdownPosition = <T extends HTMLElement>(
  triggerRef: React.RefObject<T>,
  dropdownRef: React.RefObject<HTMLUListElement>,
  positionClassTop: string,
  positionClassBottom: string
): string => {
  const [classes, setClasses] = useState(positionClassTop); // Default to top position classes

  useEffect(() => {
    const updatePosition = () => {
      if (!triggerRef.current || !dropdownRef.current) return;

      const triggerRect = triggerRef.current.getBoundingClientRect();
      const dropdownHeight = dropdownRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;

      const fitsBelow = triggerRect.bottom + dropdownHeight <= viewportHeight;
      const fitsAbove = triggerRect.top - dropdownHeight >= 0;

      if (fitsBelow) {
        setClasses(positionClassTop);
      } else if (fitsAbove) {
        setClasses(positionClassBottom);
      } else {
        // Fallback to default if neither fits
        setClasses(positionClassTop);
      }
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition);
    };
  }, [triggerRef, dropdownRef, positionClassTop, positionClassBottom]);

  return classes;
};
