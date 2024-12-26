import { useQuery } from "@apollo/client";
import { queryIngredients } from "../api/QueryIngredients";
import { useState } from "react";

const ShoppingList = () => {
  // --------------------------------STATES--------------------------------

  const [dataIds, setDataIds] = useState<number[]>([]);
  // --------------------------------QUERY--------------------------------

  const { data: ingredientsDataFromQuery } = useQuery(queryIngredients);
  const ingredients = ingredientsDataFromQuery?.ingredients || [];

  // --------------------------------FUNCTIONS--------------------------------
  const handleMultiSelect = (id: number) => {
    if (setDataIds && dataIds) {
      if (dataIds.includes(id)) {
        setDataIds(dataIds.filter((existingId) => existingId !== id));
      } else {
        setDataIds([...dataIds, id]);
      }
    }
  };

  const pushIngredients = () => {
    if (!dataIds || !ingredients) return null;
    const selectedIngredients = ingredients.filter((ingredient) =>
      dataIds.includes(Number(ingredient.id))
    );
    return (
      <div className="p-4">
        {selectedIngredients.length > 0 ? (
          <span className="text-md font-bold text-primary">
            {selectedIngredients
              .map((ingredient) => ingredient.name)
              .join(", ")}
          </span>
        ) : (
          <span className="text-sm italic text-red-400">
            Aucun ingredient sélectionné
          </span>
        )}
      </div>
    );
  };
  return (
    <div className=" max-w-screen-xl flex flex-col items-center justify-center mx-auto gap-4 py-16 px-4">
      <div
        className={` w-full bg-secondary rounded-lg shadow-lg overflow-hidden relative`}
      >
        <ul
          onClick={(e) => e.stopPropagation()}
          className="divide-y divide-primary "
        >
          <div className="sticky top-0 bg-secondary border-b-primary border-b">
            {pushIngredients()}
          </div>
          {[...(ingredients ?? [])]
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((ingredient) => (
              <li
                key={Number(ingredient.id)}
                className={`transition-200 flex items-center text-primary hover:text-secondary-hover dark:text-secondary-dark dark:hover:text-secondary-dark-hover justify-between p-2 px4 cursor-pointer hover:bg-primary-hover ${
                  dataIds?.includes(Number(ingredient.id))
                    ? "text-secondary dark:text-secondary-dark bg-primary-focus dark:bg-primary-dark-focus hover:bg-primary-hover"
                    : ""
                }`}
                onClick={() => handleMultiSelect(Number(ingredient.id))}
              >
                <span>{ingredient.name}</span>
                <input
                  type="checkbox"
                  className="mr-2 cursor-pointer"
                  checked={dataIds?.includes(Number(ingredient.id))}
                  onChange={() => handleMultiSelect(Number(ingredient.id))}
                />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default ShoppingList;
