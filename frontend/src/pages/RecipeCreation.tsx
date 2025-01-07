import BrandManager from "../components/dataManagers/BrandManager";
import IngredientManager from "../components/dataManagers/IngredientManager";
import { handleScrollToElement } from "../utils/handleScrollToElement";

const Creation = () => {
  // --------------------------------STATES--------------------------------

  // --------------------------------QUERY--------------------------------

  // -----------------------------FUNCTIONS-----------------------------------

  return (
    <div>
      <div className=" backdrop-blur-lg bg-gradient-to-tr from-[rgba(255,255,255,0.3)] max-w-5xl mx-auto p-2 rounded-lg flex justify-between sticky top-4 z-20">
        <a
          className="text-secondary bg-[rgba(66,119,133,0.5)] hover:bg-primary p-2 rounded-lg dark:text-secondary-dark hover:text-secondary-hover dark:hover:text-secondary-dark-hover cursor-pointer"
          onClick={(event) => handleScrollToElement(event, "brands")}
          href="#brands"
        >
          Marques
        </a>
        <a
          className="text-secondary bg-[rgba(66,119,133,0.5)] hover:bg-primary-hover p-2 rounded-lg dark:text-secondary-dark hover:text-secondary-hover dark:hover:text-secondary-dark-hover cursor-pointer"
          onClick={(event) => handleScrollToElement(event, "ingredients")}
          href="#ingredients"
        >
          Ingredients
        </a>
      </div>
      <BrandManager />
      <IngredientManager />
    </div>
  );
};

export default Creation;
