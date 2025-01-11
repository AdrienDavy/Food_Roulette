import BrandManager from "../components/dataManagers/BrandManager";
import IngredientManager from "../components/dataManagers/IngredientManager";
import IngredientTypeManager from "../components/dataManagers/IngredientTypeManager";
import IngredientVariationManager from "../components/dataManagers/IngredientVariationManager";
import Image from "../components/Image";
import { handleScrollToElement } from "../utils/handleScrollToElement";

const Creation = () => {
  // --------------------------------STATES--------------------------------

  // --------------------------------QUERY--------------------------------

  // -----------------------------FUNCTIONS-----------------------------------

  return (
    <div className="creation  flex flex-col items-center justify-center  py-16 ">
      <div className=" backdrop-blur-lg bg-gradient-to-tr from-[rgba(255,255,255,0.3)] w-full max-w-5xl mx-auto p-2 rounded-lg flex justify-between sticky top-4 z-20">
        <a
          className="text-secondary bg-[rgba(66,119,133,0.5)] hover:bg-primary p-2 rounded-lg dark:text-secondary-dark hover:text-secondary-hover dark:hover:text-secondary-dark-hover cursor-pointer"
          onClick={(event) => handleScrollToElement(event, "ingredientTypes")}
          href="#ingredientTypes"
        >
          Type d'ingredients
        </a>
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
      <div
        style={{ position: "relative", width: "300px", height: "300px" }}
        className="mx-auto"
      >
        <Image
          transformation={[{ height: "300", width: "300", quality: "auto" }]}
          path="logo_cook_recipe_AsJ_Jb9s1.png"
          alt="Création"
          loading="lazy"
          lqip={{ active: true, quality: 20 }}
        />
      </div>
      <div className=" w-full max-w-5xl mx-auto">
        <IngredientVariationManager />
        <IngredientTypeManager />
        <IngredientManager />
        <BrandManager />
      </div>
    </div>
  );
};

export default Creation;
