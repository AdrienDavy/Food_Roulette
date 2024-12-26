import { useQuery } from "@apollo/client";
import OptionSelect, { OptionType } from "../components/OptionSelect";
import { useState } from "react";
import { querySeasons } from "../api/season/QuerySeasons";
import { Season } from "../gql/graphql";

const Creation = () => {
  // --------------------------------STATES--------------------------------

  const [selectedSeason, setSelectedSeason] =
    useState<OptionType<string> | null>(null);
  // --------------------------------QUERY--------------------------------

  const { data: seasonsDataFromQuery } = useQuery(querySeasons);
  const seasons = seasonsDataFromQuery?.seasons || [];

  // -----------------------------FUNCTIONS-----------------------------------
  const handleSeasonChange = (option: OptionType<string>) => {
    setSelectedSeason(option);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-secondary dark:bg-secondary-dark rounded-lg shadow-lg transition-200">
      <h1 className="text-3xl font-bold text-center text-primary dark:text-primary-dark mb-6 transition-200">
        Créez votre recette
      </h1>
      <form>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-primary dark:text-primary-dark mb-2"
          >
            Nom de la recette
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full p-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-focus dark:bg-gray-700 dark:border-primary-dark dark:focus:ring-primary-dark"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-primary dark:text-primary-dark mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            required
            className="w-full p-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-focus dark:bg-gray-700 dark:border-primary-dark dark:focus:ring-primary-dark"
          ></textarea>
        </div>

        <div className="mb-4">
          <label
            htmlFor="type"
            className="block text-primary dark:text-primary-dark mb-2"
          >
            Type de recette
          </label>
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

        <div className="mb-4">
          <label
            htmlFor="season"
            className="block text-primary dark:text-primary-dark mb-2"
          >
            Saison
          </label>
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

        <div className="mb-4">
          <label
            htmlFor="ingredients"
            className="block text-primary dark:text-primary-dark mb-2"
          >
            Ingrédients
          </label>
          <input
            type="text"
            id="ingredients"
            name="ingredients"
            required
            className="w-full p-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-focus dark:bg-gray-700 dark:border-primary-dark dark:focus:ring-primary-dark"
          />
        </div>

        <button
          type="submit"
          className="w-full p-2 bg-primary hover:bg-primary-hover focus:ring-2 focus:ring-primary-focus text-white font-bold rounded-lg transition-200 dark:bg-primary-dark dark:hover:bg-primary-dark-hover dark:focus:ring-primary-dark"
        >
          Créer
        </button>
      </form>
    </div>
  );
};

export default Creation;
