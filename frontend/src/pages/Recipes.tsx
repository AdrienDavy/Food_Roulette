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
import SearchBar from "../components/SearchBar";

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
      <div className="max-w-xl mx-auto mt-8">
        <SearchBar setSearch={setSearch} placeholder="Rechercher une recette" />
      </div>
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
