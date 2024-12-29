import { useState, useEffect, useRef } from "react";

export type OptionType<T> = {
  id: number;
  data: T;
};

type OptionSelectProps<T extends string> = {
  options: OptionType<T>[] | undefined;
  onSelect: (option: OptionType<T>) => void;
  actualOption: OptionType<T> | null;
  defaultOption: string;
  getDisplayText: (data: T) => string;
};

const OptionSelect = <T extends string>({
  options,
  onSelect,
  actualOption,
  defaultOption,
  getDisplayText,
}: OptionSelectProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<OptionType<T> | null>(actualOption);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  return (
    <div
      className="relative w-full z-10"
      ref={dropdownRef}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex justify-between px-4 py-2 w-full  z-10 bg-secondary transition-all duration-100 ease-in-out ${
          isOpen
            ? "rounded-tl-lg rounded-tr-lg border-2 border-b-0"
            : " rounded-lg border-2"
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
          className={`${
            options && options?.filter((option) => option).length > 10
              ? " h-80 overflow-y-scroll"
              : options?.filter((option) => option).length === 0
              ? "hidden "
              : "h-fit"
          } border-primary border-x-2 text-primary rounded-none rounded-bl-lg rounded-br-lg flex-col flex justify-start bg-secondary custom-scrollbar absolute top-full w-full`}
          onClick={() => setIsOpen(false)}
        >
          {options
            ?.sort((a, b) => a.data.localeCompare(b.data))
            .map((option) => (
              <li
                key={option.id}
                className="p-2 hover:bg-secondary-hover cursor-pointer z-10"
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
