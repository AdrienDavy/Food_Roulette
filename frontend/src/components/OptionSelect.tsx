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
        className={`flex justify-between px-4 w-full py-2 z-10 bg-white transition-all duration-100 ease-in-out ${
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
          onClick={() => setIsOpen(false)}
          className={` border-primary border-2 text-primary rounded-none rounded-bl-lg rounded-br-lg absolute w-full top-full flex-col flex justify-start bg-gray-50 custom-scrollbar duration-200`}
        >
          {options
            ?.sort((a, b) => a.data.localeCompare(b.data))
            .map((option) => (
              <li
                key={option.id}
                className="p-2 hover:bg-gray-100 cursor-pointer z-10"
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
