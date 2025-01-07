import { useMutation, useQuery } from "@apollo/client";
import { queryIngredients } from "../../api/ingredient/QueryIngredients";
import { queryIngredient } from "../../api/ingredient/QueryIngredient";
import { Ingredient } from "../../gql/graphql";
import OptionSelect, { OptionType } from "../OptionSelect";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { mutationCreateIngredient } from "../../api/ingredient/CreateIngredient";
import { Bounce, toast } from "react-toastify";
import { useDropdownPosition } from "../../utils/useDropdownPosition";
import { mutationUpdateIngredient } from "../../api/ingredient/UpdateIngredient";
import { mutationDeleteIngredient } from "../../api/ingredient/DeleteIngredient";

const IngredientManager = () => {
  // --------------------------------STATES--------------------------------
  const [selectedIngredient, setSelectedIngredient] =
    useState<OptionType<string> | null>(null);
  const [ingredientId, setIngredientId] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [progress, setProgress] = useState(0);

  // --------------------------------REFS--------------------------------

  const ingredientCreateContainerRef = useRef<HTMLDivElement>(null);
  const inputIngredientNameRef = useRef<HTMLInputElement>(null);
  const inputIngredientUrlRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);

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

  // -------------------------CREATE--------------------------------
  const [createIngredientName, setCreateIngredientName] = useState<string>("");
  const [createIngredientImage, setCreateIngredientImage] =
    useState<string>("");
  const [createErrors, setCreateErrors] = useState<string>("");
  // -------------------------UPDATE--------------------------------
  const [updateIngredientName, setUpdateIngredientName] = useState<string>("");
  const [updateIngredientImage, setUpdateIngredientImage] =
    useState<string>("");
  const [updateErrors, setUpdateErrors] = useState<string>("");
  // -------------------------UPDATE--------------------------------
  const [deleteErrors, setDeleteErrors] = useState<string>("");

  // --------------------------------QUERY--------------------------------

  const {
    data: ingredientsDataFromQuery,
    error: ingredientsDataError,
    loading: ingredientsDataLoading,
  } = useQuery(queryIngredients);
  const ingredients = ingredientsDataFromQuery?.ingredients || [];

  const { data: ingredientDataFromQuery } = useQuery(queryIngredient, {
    variables: { ingredientId: `${ingredientId}` },
    fetchPolicy: "cache-and-network",
  });

  const ingredient = ingredientDataFromQuery?.ingredient;

  // -----------------------------MUTATIONS-----------------------------------

  const [doCreateIngredient] = useMutation(mutationCreateIngredient, {
    refetchQueries: [queryIngredients],
    onError: (error) => {
      const validationErrors =
        error.graphQLErrors[0]?.extensions?.validationErrors;
      if (validationErrors) {
        const errorMessages = Array.isArray(validationErrors)
          ? validationErrors
              .map(
                (err: { constraints: { isUrl: string } }) =>
                  err.constraints.isUrl
              )
              .join(", ")
          : "Unknown error";
        setCreateErrors(errorMessages);
      } else {
        setCreateErrors(error.message);
      }
    },
  });

  const [doUpdateIngredient] = useMutation(mutationUpdateIngredient, {
    refetchQueries: [queryIngredients, queryIngredient],
    onError: (error) => {
      const validationErrors =
        error.graphQLErrors[0]?.extensions?.validationErrors;
      if (validationErrors) {
        const errorMessages = Array.isArray(validationErrors)
          ? validationErrors
              .map(
                (err: { constraints: { isUrl: string } }) =>
                  err.constraints.isUrl
              )
              .join(", ")
          : "Unknown error";
        setUpdateErrors(errorMessages);
      } else {
        setUpdateErrors(error.message);
      }
    },
  });

  const [doDeleteIngredient] = useMutation(mutationDeleteIngredient, {
    refetchQueries: [queryIngredients, queryIngredient],
    onError: (error) => {
      const validationErrors =
        error.graphQLErrors[0]?.extensions?.validationErrors;
      if (validationErrors) {
        interface ValidationError {
          constraints: { [key: string]: string };
        }
        const errorMessages = Array.isArray(validationErrors)
          ? validationErrors
              .map((err: ValidationError) =>
                Object.values(err.constraints).join(", ")
              )
              .join(", ")
          : "Unknown error";
        setUpdateErrors(errorMessages);
      } else {
        setUpdateErrors(error.message);
      }
    },
  });

  // -----------------------------UX-----------------------------------

  const animeError = (wordToWatch: string | "", errors: string) => {
    if (errors && errors.includes(wordToWatch || "")) {
      return `border border-red-500 animate-vibrate`;
    } else {
      return `border-none`;
    }
  };

  useEffect(() => {
    if (ingredientsDataLoading) {
      const interval = setInterval(() => {
        setProgress((prev) => (prev < 80 ? prev + 5 : prev));
      }, 100);
      return () => clearInterval(interval);
    } else if (ingredientsDataFromQuery) {
      setProgress(100);
      setTimeout(() => setProgress(0), 500); // Réinitialiser la barre après le chargement
    }
  }, [ingredientsDataLoading, ingredientsDataFromQuery]);

  // -----------------------------FUNCTIONS-----------------------------------

  // -----------------------------CREATE--------------------------
  const validateCreateForm = () => {
    if (!createIngredientName) {
      setCreateErrors("Le nom de l'ingrédient est requis.");
      return;
    }
    if (
      createIngredientImage &&
      !createIngredientImage.match(
        /(http(s?):)([/|.|\w|\s|-]|%[0-9a-fA-F]{2})+\.(?:jpg|gif|png|svg)/g
      )
    ) {
      setCreateErrors("L'url de l'image n'est pas valide.");
      return;
    }
    setCreateErrors("");
    return true;
  };

  async function doCreate() {
    if (!validateCreateForm()) {
      return;
    }
    try {
      const { data } = await doCreateIngredient({
        variables: {
          data: {
            name: createIngredientName,
            image: createIngredientImage || undefined, // Assurez-vous de définir l'image si nécessaire
          },
        },
      });
      if (data?.createIngredient) {
        toast.success(
          `Ingrédient ${data?.createIngredient.name} créé avec succès ! 🦄`,
          {
            className: "toast-success bg-primary",
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          }
        );
        setCreateIngredientName("");
        setCreateIngredientImage("");
      }

      return data;
    } catch (err) {
      console.error(err);
    }
  }

  // -----------------------------UPDATE--------------------------

  const validateUpdateForm = () => {
    if (!updateIngredientName) {
      setUpdateErrors("Le nom de l'ingrédient est requis.");
      return;
    }
    if (
      updateIngredientImage &&
      !updateIngredientImage.match(
        /(http(s?):)([/|.|\w|\s|-]|%[0-9a-fA-F]{2})+\.(?:jpg|jpeg|gif|png|svg)/g
      )
    ) {
      setUpdateErrors("L'url de l'image n'est pas valide.");
      return;
    }
    setUpdateErrors("");
    return true;
  };

  async function doUpdate() {
    if (!ingredientId) {
      setUpdateErrors("Veuillez sélectionner un ingrédient.");
      return;
    }
    if (!validateUpdateForm()) {
      return;
    }

    if (updateIngredientName === ingredient?.name) {
      setUpdateIngredientName(ingredient?.name);
    }
    if (updateIngredientImage === ingredient?.image) {
      setUpdateIngredientImage(ingredient?.image || "");
    }

    try {
      const { data } = await doUpdateIngredient({
        variables: {
          id: `${ingredientId}`,
          data: {
            name: updateIngredientName,
            image: updateIngredientImage || undefined, // Assurez-vous de définir l'image si nécessaire
          },
        },
      });
      if (data?.updateIngredient) {
        toast.success(
          `Ingrédient ${data?.updateIngredient.name} modifiée avec succès ! 🦄`,
          {
            className: "toast-success bg-primary",
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          }
        );
      }
      setUpdateIngredientName(updateIngredientName);
      setUpdateIngredientImage(updateIngredientImage);
      setIsOpen(false);

      return data?.updateIngredient;
    } catch (err) {
      console.error(err);
    }
  }

  // -----------------------------DELETE--------------------------

  const validateDeleteForm = () => {
    if (!updateIngredientName) {
      setDeleteErrors("Le nom de l'ingrédient est requis.");
      return;
    }
    setDeleteErrors("");
    return true;
  };

  async function doDelete() {
    if (!ingredientId) {
      setDeleteErrors("Veuillez sélectionner un ingrédient.");
      return;
    }
    if (!validateDeleteForm()) {
      return;
    }

    try {
      const { data } = await doDeleteIngredient({
        variables: {
          id: `${ingredientId}`,
        },
      });
      if (data?.deleteIngredient) {
        toast.success(
          `Ingrédient ${data?.deleteIngredient.name} supprimée avec succès ! 🦄`,
          {
            className: "toast-success bg-primary",
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          }
        );
      }
      setUpdateIngredientName("");
      setUpdateIngredientImage("");
      setIsOpen(false);

      return data?.deleteIngredient;
    } catch (err) {
      console.error(err);
    }
  }

  // -----------------------------HANDLES--------------------------

  const handleIngredientChange = (option: OptionType<string>) => {
    setSelectedIngredient(option);
    setIsOpen(isOpen);
    console.log(isOpen);
  };

  const handleClickIngredientList = (id: number) => {
    setIngredientId(Number(id));
    setUpdateIngredientName("");
    setUpdateIngredientImage("");
    setIsOpen(!isOpen);
    setUpdateErrors("");
  };

  const handleSearchIngredient = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateIngredientName(e.target.value);
    setIsOpen(e.target.value.trim() !== ""); // Ouvre la liste si la recherche contient du texte
  };

  return (
    <>
      <section
        id="ingredients"
        className="flex flex-col items-center justify-center bg-primary-hover p-8 mb-8 rounded-lg max-w-5xl mx-auto transition-200"
      >
        <h1 className=" mb-4 text-center font-bold text-4xl text-secondary dark:text-secondary-dark transition-200">
          Gestionnaire d'ingrédients
        </h1>
        <h2 className=" mb-4 text-center font-bold text-2xl text-secondary dark:text-secondary-dark transition-200">
          Ingrédients
        </h2>
        {ingredientsDataError && (
          <p className="bg-red-500 p-2 rounded-lg text-light my-4">
            Erreur lors du chargement des ingrédients
          </p>
        )}
        <div className="mb-4  w-80 flex items-center justify-between">
          <OptionSelect<string>
            options={ingredients.map((ingredient: Ingredient) => ({
              id: Number(ingredient.id),
              data: ingredient.name,
            }))}
            onSelect={handleIngredientChange}
            actualOption={selectedIngredient}
            defaultOption="Sélectionner un ingrédient"
            getDisplayText={(data) => data}
          />
          <button
            onClick={() => setSelectedIngredient(null)}
            title="Réinitialiser l'ingrédient"
            className="cursor-pointer text-primary hover:text-primary-hover dark:text-primary-dark dark:hover:text-primary-dark-hover bg-secondary dark:bg-secondary-dark hover:bg-secondary-hover dark:hover:bg-secondary-dark-hover ml-2 py-[0.4rem] px-[0.6rem] rounded-lg transition-200"
          >
            <FontAwesomeIcon icon={faRotateLeft} />
          </button>
        </div>

        <div
          ref={ingredientCreateContainerRef}
          className={`${animeError(
            "",
            createErrors
          )} flex flex-col items-center justify-center bg-primary-focus p-8 rounded-lg m-8 transition-200`}
        >
          <h2 className=" font-bold text-2xl text-secondary">
            Ajouter un ingrédient
          </h2>
          <div className=" mt-8 relative flex flex-col items-center justify-center">
            <input
              onClick={() => setCreateErrors("")}
              autoComplete="off"
              required
              type="text"
              id="createIngredientName"
              placeholder=" "
              value={createIngredientName}
              className={`inputForm rounded-lg ${animeError(
                "nom",
                createErrors
              )}`}
              ref={inputIngredientNameRef}
              onChange={(e) => setCreateIngredientName(e.target.value)}
            />
            <label className="labelForm" htmlFor="createIngredientName">
              Nom de l'ingrédient...
            </label>
          </div>
          <div className="mt-8 relative flex flex-col items-center justify-center">
            <input
              onClick={() => setCreateErrors("")}
              autoComplete="off"
              required
              type="text"
              id="createIngredientImage"
              placeholder=" "
              value={createIngredientImage}
              className={`inputForm rounded-lg ${animeError(
                "image",
                createErrors
              )}`}
              ref={inputIngredientUrlRef}
              onChange={(e) => setCreateIngredientImage(e.target.value)}
            />
            <label className="labelForm" htmlFor="createIngredientImage">
              Url de l'image de l'ingrédient...
            </label>
            <div className="mt-4 flex flex-col items-center justify-center">
              <button
                type="button"
                className="primary-button "
                onClick={doCreate}
              >
                Ajouter un ingrédient
              </button>
              {createErrors && <p className=" text-red-400">{createErrors}</p>}
            </div>
          </div>
        </div>
        <div
          className={`flex flex-col items-center justify-center bg-primary-focus p-8 rounded-lg m-8`}
        >
          <h2 className=" font-bold text-2xl text-secondary">
            Mettre à jour un ingrédient
          </h2>
          <div className="w-96 mx-auto mt-8 relative">
            <div
              // ref={ingredientUpdateContainerRef}
              className={`${animeError(
                "",
                updateErrors
              )} flex flex-col items-center justify-center bg-primary-hover p-4 rounded-lg transition-200`}
            >
              <h2 className=" font-bold text-2xl text-secondary">
                Modifier un ingrédient
              </h2>

              <h2 className="text-center font-bold text-2xl text-secondary dark:text-secondary-dark transition-200">
                Ingrédient id {ingredient?.id}
              </h2>
              {ingredient && (
                <div>
                  <p className=" pb-8 text-center font-bold text-4xl text-secondary dark:text-secondary-dark transition-200">
                    {ingredient.name}
                  </p>
                  {ingredient.image ? (
                    <img
                      src={ingredient.image || undefined}
                      alt={`Ingrédient ${ingredient.name}`}
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
              )}
              <div className=" mt-8 relative flex flex-col items-center justify-center">
                <input
                  onClick={() => {
                    setUpdateIngredientName(ingredient?.name ?? "");
                    setUpdateErrors("");
                    setDeleteErrors("");
                  }}
                  autoComplete="off"
                  required
                  type="text"
                  id="updateIngredientName"
                  placeholder=" "
                  value={updateIngredientName}
                  className={`inputForm ${animeError(
                    "",
                    updateErrors || deleteErrors
                  )} ${isOpen ? triggerClasses : "rounded-lg"}`}
                  ref={triggerRef}
                  onChange={handleSearchIngredient}
                />
                <label className="labelForm" htmlFor="updateIngredientName">
                  Nom de l'ingrédient...
                </label>
                {updateIngredientName && isOpen && (
                  <ul
                    ref={dropdownRef}
                    className={`${
                      ingredients.filter((ingredient) =>
                        ingredient.name
                          .toLowerCase()
                          .includes(updateIngredientName.toLowerCase())
                      ).length > 10
                        ? " h-80 overflow-y-scroll"
                        : ingredients.filter((ingredient) =>
                            ingredient.name
                              .toLowerCase()
                              .includes(updateIngredientName.toLowerCase())
                          ).length === 0
                        ? "hidden "
                        : "h-fit"
                    } ${dropdownPosition} ${dropdownClasses} bg-secondary dark:bg-secondary-dark w-full absolute z-10`}
                  >
                    <p className="px-4 py-2 text-primary dark:text-primary-dark text-xl font-bold">
                      Ingrédients
                    </p>
                    {ingredients
                      .filter((ingredient) =>
                        ingredient.name
                          .toLowerCase()
                          .includes(updateIngredientName.toLowerCase())
                      )
                      .map((ingredient) => (
                        <li
                          onClick={() =>
                            handleClickIngredientList(Number(ingredient.id))
                          }
                          key={ingredient.id}
                          className="px-4 py-2 text-primary hover:text-primary-hover dark:text-primary-dark dark:hover:text-primary-dark-hover hover:bg-secondary-hover dark:hover:bg-secondary-dark-hover cursor-pointer"
                        >
                          {ingredient.name}
                        </li>
                      ))}
                  </ul>
                )}
              </div>
              <div className="mt-8 relative flex flex-col items-center justify-center">
                <input
                  onClick={() => {
                    setUpdateIngredientImage(ingredient?.image ?? "");
                    setUpdateErrors("");
                    setDeleteErrors("");
                  }}
                  autoComplete="off"
                  required
                  type="text"
                  id="updateIngredientImage"
                  placeholder=" "
                  value={updateIngredientImage || ""}
                  className={`inputForm rounded-lg ${animeError(
                    "image",
                    updateErrors
                  )}`}
                  ref={inputIngredientUrlRef}
                  onChange={(e) => setUpdateIngredientImage(e.target.value)}
                />
                <label className="labelForm" htmlFor="updateIngredientImage">
                  Url de l'image...
                </label>
                <div className="mt-4 flex flex-col items-center justify-center">
                  <button
                    type="button"
                    className="primary-button "
                    onClick={doUpdate}
                  >
                    Modifier un ingrédient
                  </button>
                  {updateErrors && (
                    <p className=" text-red-500">{updateErrors}</p>
                  )}
                </div>
                <div className="mt-4 flex flex-col items-center justify-center">
                  <button
                    type="button"
                    className="primary-button "
                    onClick={doDelete}
                  >
                    Supprimer un Ingrédient
                  </button>
                  {deleteErrors && (
                    <p className=" text-red-500">{deleteErrors}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <h2 className="text-4xl uppercase font-bold text-center text-secondary dark:text-secondary-dark transition-200">
            Tous les Ingrédients
          </h2>

          {ingredientsDataError ? (
            <p className="bg-red-500 p-2 rounded-lg text-light my-4 col-span-4">
              Erreur lors du chargement des ingrédients
            </p>
          ) : ingredientsDataLoading ? (
            <div className="w-full my-16">
              <p className=" text-center py-2 animate-pulse text-light dark:text-primary-hover">
                Chargement des ingrédients...
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 ">
                <div
                  className=" bg-primary-focus dark:bg-primary-dark-hover h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          ) : (
            <div className="grid gap-4 grid-cols-2 md:grid-cols-4  items-center justify-center my-8 transition-200">
              {ingredients
                .slice()
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((ingredient: Ingredient) => (
                  <div
                    key={ingredient.id}
                    className="flex flex-col justify-between items-center h-80 rounded-lg bg-primary-focus overflow-hidden"
                  >
                    <div className="h-1/2 w-full bg-light">
                      {ingredient.image ? (
                        <img
                          className="w-full h-full object-cover"
                          src={ingredient.image}
                          alt={`Ingrédient ${ingredient.name}`}
                        />
                      ) : (
                        <svg
                          className="w-full h-full  text-gray-200 dark:text-gray-600"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 18"
                        >
                          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                        </svg>
                      )}
                    </div>
                    <div className="h-1/2 p-4 text-center">
                      <h2 className=" font-bold text-xl text-secondary">
                        Ingrédient id {ingredient.id}
                      </h2>
                      <p className=" pb-8 text-center font-bold text-2xl text-secondary dark:text-secondary-dark transition-200">
                        {ingredient.name}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default IngredientManager;
