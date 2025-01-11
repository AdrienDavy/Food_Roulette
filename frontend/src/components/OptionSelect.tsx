import { useState, useEffect, useRef } from "react";
import { useDropdownPosition } from "../utils/useDropdownPosition";

export type OptionType<T> = {
  id: number;
  data: T;
};

type OptionSelectProps<T extends string> = {
  disabledOption?: boolean;
  onClickFunctionProps?: () => void;
  options: OptionType<T>[] | undefined;
  onSelect: (option: OptionType<T>) => void;
  actualOption: OptionType<T> | null;
  defaultOption: string;
  getDisplayText: (data: T) => string;
};

const OptionSelect = <T extends string>({
  disabledOption,
  onClickFunctionProps,
  options,
  onSelect,
  actualOption,
  defaultOption,
  getDisplayText,
}: OptionSelectProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<OptionType<T> | null>(actualOption);
  const triggerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    setSelected(actualOption);
  }, [actualOption]);

  useEffect(() => {
    if (selected && !options?.some((option) => option.id === selected.id)) {
      setSelected(null);
    }
  }, [options, selected]);

  const handleSelect = (option: OptionType<T>) => {
    setSelected(option);
    onSelect(option);
    setIsOpen(false);
  };

  const { dropdownPosition, triggerClasses, dropdownClasses } =
    useDropdownPosition(
      triggerRef,
      dropdownRef,
      "rounded-tl-lg rounded-tr-lg", // Classes pour le trigger en bas
      "rounded-bl-lg rounded-br-lg", // Classes pour le trigger en haut
      "top-full", // Position pour le dropdown en bas
      "rounded-bl-lg rounded-br-lg shadow-lg", // Classes pour le dropdown en bas
      "bottom-full", // Position pour le dropdown en haut
      "rounded-tl-lg rounded-tr-lg" // Classes pour le dropdown en haut
    );

  return (
    <div
      className="relative w-full disabled:bg-slate-400 disabled:text-gray-100 disabled:cursor-not-allowed"
      ref={triggerRef}
      onClick={(e) => {
        onClickFunctionProps?.();
        e.stopPropagation();
      }}
    >
      <button
        disabled={disabledOption}
        onClick={() => setIsOpen(!isOpen)}
        className={`flex justify-between px-4 py-3 w-full bg-secondary transition-all duration-100 ease-in-out ${
          isOpen ? triggerClasses : "rounded-lg"
        }  border-primary text-primary text-sm cursor-pointer`}
      >
        {selected ? getDisplayText(selected.data) : defaultOption}
        <span
          className={`${
            isOpen ? " rotate-180" : " rotate-0"
          } duration-300 ml-2 ease-in-out`}
        >
          ▼
        </span>
      </button>
      {isOpen && (
        <ul
          ref={dropdownRef}
          className={`${
            options && options?.filter((option) => option).length > 10
              ? " h-80 overflow-y-scroll z-20"
              : options?.filter((option) => option).length === 0
              ? "hidden "
              : "h-fit z-20"
          } border-primary  text-primary flex-col flex justify-start bg-secondary custom-scrollbar absolute ${dropdownPosition} ${dropdownClasses} w-full`}
          onClick={() => setIsOpen(false)}
        >
          {options
            ?.sort((a, b) => a.data.localeCompare(b.data))
            .map((option) => (
              <li
                key={option.id}
                className="p-2 hover:bg-secondary-hover cursor-pointer"
                onClick={() => {
                  handleSelect(option);
                }}
              >
                {getDisplayText(option.data)}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default OptionSelect;
