import React, { useRef, useState } from "react";
import { TagType } from "../types";
import { useQuery } from "@apollo/client";
import { queryTags } from "../api/tag/QueryTags";

type MultiSelectProps = {
  dataIds: number[] | null;
  setDataIds: React.Dispatch<React.SetStateAction<number[]>> | null;
  tagsData: TagType[] | undefined;
};

const MultiSelect: React.FC<MultiSelectProps> = ({
  dataIds,
  setDataIds,
  tagsData,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { data: tagsDataFromQuery } = useQuery<{ tags: TagType[] }>(queryTags);
  const tags = tagsDataFromQuery?.tags || tagsData;

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

  const pushTags = () => {
    if (!dataIds || !tags) return null;
    const selectedTags = tags.filter((tag) => dataIds.includes(tag.id));
    return (
      <div className="mt-2">
        {selectedTags.length > 0 ? (
          <span className="text-sm font-medium">
            {selectedTags.map((tag) => tag.name).join(", ")}
          </span>
        ) : (
          <span className="text-sm italic">Aucun tag sélectionné</span>
        )}
      </div>
    );
  };

  return (
    <div className="flex items-center w-full" ref={dropdownRef}>
      <div
        className="relative w-full min-w-[40px] h-[40px] p-2 rounded-lg border-2 border-primary flex justify-center items-center gap-1 text-[12px] font-bold text-[#ffa41b] bg-white cursor-pointer transition-all duration-250 ease-in-out"
        onClick={toggleDropdown}
      >
        <div className="flex justify-between items-center p-2 w-full">
          <span>Sélectionner les tags</span>
          <span
            className={`${
              isOpen ? " rotate-180" : " rotate-0"
            } duration-300 ml-2 ease-in-out`}
          >
            ▼
          </span>
        </div>

        {isOpen && (
          <div
            className={`absolute top-full left-0 overflow-y-scroll w-full border-2 border-primary rounded-md bg-white z-10 duration-300 ease-in-out`}
          >
            <ul onClick={(e) => e.stopPropagation()}>
              {pushTags()}
              {[...(tagsData ?? [])]
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((tag) => (
                  <li
                    key={tag.id}
                    className={`flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100 ${
                      dataIds?.includes(tag.id) ? "bg-gray-200" : ""
                    }`}
                    onClick={() => handleMultiSelect(tag.id)}
                  >
                    <span>{tag.name}</span>
                    <input
                      type="checkbox"
                      className="mr-2 cursor-pointer"
                      checked={dataIds?.includes(tag.id)}
                      onChange={() => handleMultiSelect(tag.id)}
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
