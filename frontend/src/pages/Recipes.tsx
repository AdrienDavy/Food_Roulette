import { useQuery } from "@apollo/client";
import OptionSelect, { OptionType } from "../components/OptionSelect";

import { useState } from "react";
import { queryRecipes } from "../api/recipe/QueryRecipes";
import RecipeCard from "../components/RecipeCard";
import {
  Recipe,
  Ingredient,
  IngredientVariation,
  Season,
} from "../gql/graphql";
import { querySeasons } from "../api/season/QuerySeasons";

const Recipes = () => {
  // --------------------------------STATES--------------------------------

  const [seasonId, setSeasonId] = useState<number | null>(null);
  const [recipeType, setRecipeType] = useState<string | null>(null);
  const [hasIngredient, setHasIngredient] = useState<boolean | null>(false);
  const [search, setSearch] = useState<string | "">("");
  const [selectedSeason, setSelectedSeason] =
    useState<OptionType<string> | null>(null);
  const [selectedRecipeType, setSelectedRecipeType] =
    useState<OptionType<string> | null>(null);

  // --------------------------------QUERY--------------------------------

  const { data: seasonsDataFromQuery } = useQuery(querySeasons);
  const seasons = seasonsDataFromQuery?.seasons || [];

  const { data: recipesDataFromQuery } = useQuery(queryRecipes);
  const recipes: Recipe[] = recipesDataFromQuery?.recipes || [];

  // -----------------------------FUNCTIONS-----------------------------------
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value.toLowerCase());
  };
  const handleSeasonChange = (option: OptionType<string>) => {
    setSeasonId(Number(option.id));
    setSelectedSeason(option);
  };
  const handleRecipeTypeChange = (option: OptionType<string>) => {
    setRecipeType(option.data);
    setSelectedRecipeType(option);
  };

  const resetFilters = () => {
    setSeasonId(null);
    setRecipeType(null);
    setHasIngredient(false);
    setSearch("");
    setSelectedSeason(null);
    setSelectedRecipeType(null);
  };
  // ----------------------------------------------------------------------

  return (
    <div>
      <h1 className="font-bold text-4xl text-center text-secondary dark:text-secondary-dark transition-200">
        Recettes
      </h1>

      <form className="max-w-md mx-auto mt-8">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-primary sr-only dark:text-primary-dark transition-200"
        >
          Rechercher
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-primary dark:text-primary-dark transition-200"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            onChange={handleSearchChange}
            type="search"
            id="default-search"
            className=" transition-200 block w-full p-4 ps-10 text-sm text-primary rounded-lg bg-gray-50 focus:outline-double focus:outline-primary-focus focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-primary-dark dark:focus:ring-primary-dark dark:focus:border-primary-dark"
            placeholder="Boeuf Bourguinon, Tartiflette..."
            required
          />
          <button
            type="submit"
            className="text-secondary dark:text-secondary-dark absolute end-2.5 bottom-2.5 bg-primary hover:bg-primary-hover focus:ring-1 focus:outline-none focus:ring-primary-focus font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-dark dark:hover:bg-primary-dark-hover dark:focus:bg-primary-dark-focus transition-200"
          >
            Rechercher
          </button>
        </div>
      </form>
      <div className="max-w-xl mx-auto mt-8 z-10 bg-secondary dark:bg-gray-800 rounded-lg p-4">
        <h2 className=" pb-4 font-bold text-2xl text-center text-primary dark:text-primary-dark transition-200">
          Filtrer par
        </h2>
        <div className="max-w-xl mx-auto grid grid-cols-2 gap-4 justify-center items-center">
          <div>
            <h3 className="pb-4 font-bold text-xl text-center text-primary dark:text-primary-dark transition-200">
              Saison
            </h3>
            <div className=" w-full">
              <OptionSelect<string>
                options={seasons.map((season: Season) => ({
                  id: Number(season.id), // Assurez-vous que `id` est un nombre
                  data: season.seasonName, // Transformez le champ `seasonName` en `data`
                }))}
                onSelect={handleSeasonChange}
                actualOption={selectedSeason}
                defaultOption="Sélectionner une saison"
                getDisplayText={(data) => data}
              />
            </div>
          </div>
          <div>
            <h3 className="pb-4 font-bold text-xl text-center text-primary dark:text-primary-dark transition-200">
              Type de recette
            </h3>
            <div className=" w-full">
              <OptionSelect<string>
                options={recipes.map((recipe) => ({
                  id: Number(recipe.id),
                  data: recipe.recipeType,
                }))}
                onSelect={handleRecipeTypeChange}
                actualOption={selectedRecipeType}
                defaultOption="Sélectionner un type"
                getDisplayText={(data) => data}
              />
            </div>
          </div>
          <div>
            <input
              type="checkbox"
              id="hasIngredients"
              value=""
              className="hidden peer"
              required
              onChange={(e) => setHasIngredient(e.target.checked)}
            />
            <label
              htmlFor="hasIngredients"
              className="inline-flex items-center justify-center w-full p-2 text-primary bg-gray-100 rounded-lg cursor-pointer dark:hover:text-primary-dark-hover border dark:border-primary-dark-focus peer-checked:border-primary-focus hover:text-primary-hover dark:peer-checked:text-primary-dark-focus peer-checked:text-primary peer-checked:bg-secondary-focus hover:bg-secondary-hover dark:text-primary-dark dark:bg-gray-800 dark:hover:bg-gray-700 transition-200"
            >
              <div className="text-lg font-semibold text-center">
                Ingrédients dispos
              </div>
            </label>
          </div>
          <button
            type="button"
            onClick={resetFilters}
            className=" bg-red-500 text-white font-bold w-full p-2 rounded-lg hover:bg-red-600 transition-200"
          >
            Réinitialiser les filtres
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 max-w-screen-xl mx-auto py-8">
        {recipes
          .filter((recipe) =>
            seasonId ? Number(recipe.season?.id) === seasonId : true
          )
          .filter((recipe) =>
            search ? recipe.name.toLowerCase().includes(search) : recipe
          )
          .filter((recipe) =>
            recipeType ? recipe.recipeType === recipeType : true
          )
          .filter((recipe) =>
            hasIngredient
              ? recipe.ingredients?.some((ingredient: Ingredient) =>
                  ingredient.variations?.some(
                    (variation: IngredientVariation) =>
                      variation.hasIngredient === true
                  )
                )
              : true
          )

          .map((recipe: Recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
      </div>
    </div>
  );
};

export default Recipes;
