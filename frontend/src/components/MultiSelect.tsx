import React, { useRef, useState } from "react";
import { useDropdownPosition } from "../utils/useDropdownPosition";

type MultiSelectProps<T extends number | string> = {
  selectionDefaultValue: string;
  dataIds: T[] | null;
  setDataIds: React.Dispatch<React.SetStateAction<T[]>> | null;
  datas: { id: number; name: string }[];
};

const MultiSelect: React.FC<MultiSelectProps<number | string>> = ({
  selectionDefaultValue,
  dataIds,
  setDataIds,
  datas,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);
  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleMultiSelect = (id: number) => {
    if (setDataIds && dataIds) {
      if (dataIds.includes(id)) {
        setDataIds(dataIds.filter((existingId) => existingId !== id));
      } else {
        setDataIds([...dataIds, id]);
      }
    }
  };

  const pushElements = () => {
    if (!dataIds || !datas) return null;
    const selectedElements = datas.filter((data) => dataIds.includes(data.id));
    return (
      <div className={`${isOpen ? "p-2 font-bold" : ""}`}>
        {selectedElements.length > 0 ? (
          <span className="text-sm">
            {selectedElements.map((data) => data.name).join(", ")}
          </span>
        ) : (
          <span className="text-sm italic">Aucun élément sélectionné</span>
        )}
      </div>
    );
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
    <div className="flex items-center w-full">
      <div
        ref={triggerRef}
        className={`relative flex justify-between p-3 w-full bg-secondary transition-all duration-100 ease-in-out ${
          isOpen ? triggerClasses : "rounded-lg"
        }  border-primary text-primary text-sm cursor-pointer`}
        onClick={toggleDropdown}
      >
        <div className="flex justify-between items-center w-full">
          <span>
            {pushElements() && !isOpen ? pushElements() : selectionDefaultValue}
          </span>
          <span
            className={`${
              isOpen ? " rotate-180" : " rotate-0"
            } duration-300 ml-4 ease-in-out`}
          >
            ▼
          </span>
        </div>

        {isOpen && (
          <div
            className={`border-primary left-0 text-primary flex-col flex justify-start bg-secondary custom-scrollbar absolute ${dropdownPosition} ${dropdownClasses} w-full`}
          >
            <ul
              ref={dropdownRef}
              onClick={(e) => e.stopPropagation()}
              className=""
            >
              {pushElements()}
              {[...(datas ?? [])]
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((data) => (
                  <li
                    key={data.id}
                    className={`flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100 ${
                      dataIds?.includes(data.id) ? "bg-gray-200" : ""
                    }`}
                    onClick={() => handleMultiSelect(data.id)}
                  >
                    <span>{data.name}</span>
                    <input
                      type="checkbox"
                      className="mr-2 cursor-pointer"
                      checked={dataIds?.includes(data.id)}
                      onChange={() => handleMultiSelect(data.id)}
                    />
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiSelect;
