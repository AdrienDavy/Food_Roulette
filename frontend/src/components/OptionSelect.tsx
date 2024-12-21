import { useEffect, useRef, useState } from "react";

type OptionType = {
  id: number;
  seasonName: string;
};

type OptionSelectProps = {
  options: OptionType[] | undefined;
  onSelect: (option: OptionType) => void;
  actualOption: OptionType | null;
  defaultOption: string;
};

const OptionSelect: React.FC<OptionSelectProps> = ({
  options,
  onSelect,
  actualOption,
  defaultOption,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<OptionType | null>(actualOption);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Mettre à jour la sélection si `actualOption` change
  useEffect(() => {
    setSelected(actualOption);
  }, [actualOption]);

  // Vérifier les changements dans les options et réinitialiser la sélection si nécessaire
  useEffect(() => {
    if (selected && !options?.some((option) => option.id === selected.id)) {
      setSelected(null); // Réinitialiser si l'option sélectionnée n'existe plus
    }
  }, [options, selected]);

  const handleSelect = (option: OptionType) => {
    setSelected(option);
    onSelect(option);
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
        {selected ? selected?.seasonName : defaultOption}
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
          className={`shadow-2xl border-primary border-2 text-primary shadow-gray-500 p-0 rounded-none rounded-bl-lg rounded-br-lg absolute w-full overflow-y-scroll top-full flex-col flex justify-start bg-light custom-scrollbar transition-all duration-300 ease-in-out
            `}
        >
          {options?.map((option) => (
            <li
              key={option.id}
              className=" py-2 w-full hover:bg-gray-100 cursor-pointer z-10 "
              onClick={() => {
                handleSelect(option);
                setIsOpen(false);
              }}
            >
              {option.seasonName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OptionSelect;
