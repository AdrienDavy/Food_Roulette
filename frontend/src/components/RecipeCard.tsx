import { NavLink } from "react-router-dom";
import { Ingredient, Recipe } from "../gql/graphql";

const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
  return (
    <NavLink
      to={recipe.id}
      key={recipe.id}
      className=" backdrop-blur-lg bg-gray-100  rounded-lg p-4"
    >
      <div>
        {recipe.image ? (
          <img
            src={recipe.image}
            alt={recipe.name}
            className=" w-full h-64 object-cover rounded-lg"
          />
        ) : (
          <svg
            className="w-full h-64 text-gray-200 dark:text-gray-600"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 18"
          >
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
          </svg>
        )}
      </div>
      <h2 className=" font-bold text-2xl text-left text-primary dark:text-primary-dark transition-200">
        {recipe.name} - {recipe.recipeType}
      </h2>
      <h3 className="text-primary">Saison : {recipe.season?.seasonName}</h3>
      <h3 className="text-primary">{recipe.cookTime} minutes</h3>
      <p className=" text-primary dark:text-primary-dark transition-200">
        Ingrédients :
        {recipe.ingredients?.map((ingredient: Ingredient) =>
          ingredient.variations?.map((variation) => (
            <kbd
              title={
                variation.hasIngredient
                  ? "Vous avez cet ingrédient"
                  : "Vous n'avez pas cet ingrédient"
              }
              key={variation.id}
              className={`px-2 py-1.5 text-xs font-semibold text-gray-800 ${
                variation.hasIngredient ? "bg-green-300 " : "bg-red-300 "
              } border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500`}
            >
              {variation.name}
            </kbd>
          ))
        )}
      </p>
    </NavLink>
  );
};

export default RecipeCard;
