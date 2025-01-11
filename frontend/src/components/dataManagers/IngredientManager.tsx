import { useMutation, useQuery } from "@apollo/client";
import { queryIngredients } from "../../api/ingredient/QueryIngredients";
import { queryIngredient } from "../../api/ingredient/QueryIngredient";
import OptionSelect, { OptionType } from "../OptionSelect";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleDown,
  faRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import { mutationCreateIngredient } from "../../api/ingredient/CreateIngredient";
import { Bounce, toast } from "react-toastify";
import { useDropdownPosition } from "../../utils/useDropdownPosition";
import { mutationUpdateIngredient } from "../../api/ingredient/UpdateIngredient";
import { mutationDeleteIngredient } from "../../api/ingredient/DeleteIngredient";
import Upload from "../Upload";
import { queryIngredientTypes } from "../../api/ingredientType/QueryIngredientTypes";

const IngredientManager = () => {
  // --------------------------------STATES--------------------------------
  const [selectedIngredient, setSelectedIngredient] =
    useState<OptionType<string> | null>(null);
  const [selectedIngredientType, setSelectedIngredientType] =
    useState<OptionType<string> | null>(null);
  const [ingredientId, setIngredientId] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isManagerOpen, setIsManagerOpen] = useState<boolean>(false);

  const [progress, setProgress] = useState(0);

  const [createImageUrl, setCreateImageUrl] = useState("");
  const [updateImageUrl, setUpdateImageUrl] = useState("");

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
  const [createIngredientType, setCreateIngredientType] = useState<string>("");
  const [createErrors, setCreateErrors] = useState<string>("");
  // -------------------------UPDATE--------------------------------
  const [updateIngredientName, setUpdateIngredientName] = useState<string>("");
  const [updateIngredientImage, setUpdateIngredientImage] =
    useState<string>("");
  const [updateIngredientTypeId, setUpdateIngredientTypeId] = useState<
    string | null
  >(null);
  // const [updateIngredientType, setUpdateIngredientType] = useState<string>("");
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
  //----------------------------------------------------------------
  const { data: ingredientDataFromQuery } = useQuery(queryIngredient, {
    variables: { ingredientId: `${ingredientId}` },
    fetchPolicy: "cache-and-network",
  });
  const ingredient = ingredientDataFromQuery?.ingredient;

  //----------------------------------------------------------------
  const { data: ingredientTypesDataFromQuery } = useQuery(queryIngredientTypes);
  const ingredientTypes = ingredientTypesDataFromQuery?.ingredientTypes || [];
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
    if (!createIngredientType) {
      setCreateErrors("Le type de l'ingrédient est requis.");
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
            image: createIngredientImage || createImageUrl || undefined, // Assurez-vous de définir l'image si nécessaire
            typeId: createIngredientType || undefined,
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
        setCreateIngredientType("");
        setCreateImageUrl("");
      }
      console.log(" Ingredient created successfully:", data);

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
    if (updateIngredientTypeId === ingredient?.type?.id) {
      setUpdateIngredientTypeId(ingredient?.type.id || null);
    }

    try {
      const { data } = await doUpdateIngredient({
        variables: {
          id: `${ingredientId}`,
          data: {
            name: updateIngredientName,
            image: updateIngredientImage || updateImageUrl || undefined, // Assurez-vous de définir l'image si nécessaire
            typeId: updateIngredientTypeId || undefined,
          },
        },
      });
      if (data?.updateIngredient) {
        toast.success(
          `Ingrédient ${data?.updateIngredient.name} modifié avec succès ! 🦄`,
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
      setUpdateIngredientTypeId(updateIngredientTypeId);
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
          `Ingrédient ${data?.deleteIngredient.name} supprimé avec succès ! 🦄`,
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
      setIngredientId(null);
      setIsOpen(false);

      return data?.deleteIngredient;
    } catch (err) {
      console.error(err);
    }
  }

  // -----------------------------HANDLES--------------------------------

  // -----------------------------OPTIONSELECT--------------------

  const handleIngredientChange = (option: OptionType<string>) => {
    setSelectedIngredient(option);
    setIsOpen(isOpen);
  };

  const handleCreateIngredientTypeChange = (option: OptionType<string>) => {
    setSelectedIngredientType(option);
    setCreateIngredientType(option.id as unknown as string);
    console.log("selectedIngredientType", selectedIngredientType);
    setIsOpen(isOpen);
  };

  const handleUpdateIngredientTypeChange = (option: OptionType<string>) => {
    setSelectedIngredientType(option);
    setUpdateIngredientTypeId(option.id as unknown as string);
    console.log("selectedIngredientType", selectedIngredientType);
    setIsOpen(isOpen);
  };

  // -------------------------------------------------------------------
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

  const handleUrlChange = (url: string) => {
    setCreateImageUrl(url); // Stocke l'URL pour utilisation
  };

  interface ChosenIngredient {
    id: string;
    name: string;
    image?: string | null;
    typeId?: string | null;
  }

  const handleClickChosenIngredient = (chosenIngredient: ChosenIngredient) => {
    setIngredientId(Number(chosenIngredient.id));
    setUpdateIngredientName(chosenIngredient.name);
    setUpdateIngredientImage(chosenIngredient.image || "");
    setUpdateIngredientTypeId(chosenIngredient.typeId || null);
  };

  return (
    <>
      <section className="flex flex-col items-center justify-center bg-primary-hover mb-8 rounded-lg max-w-5xl mx-auto transition-200 overflow-hidden">
        <div
          className=" bg-primary-focus flex items-center justify-center w-full p-4 mb-8 cursor-pointer"
          onClick={() => setIsManagerOpen(!isManagerOpen)}
        >
          <button>
            <FontAwesomeIcon
              icon={faChevronCircleDown}
              className={`${
                isManagerOpen ? " rotate-180" : " rotate-0"
              } text-3xl text-white`}
            />
          </button>
          <h1
            id="ingredients"
            className="w-full text-center font-bold text-4xl text-secondary dark:text-secondary-dark transition-200"
          >
            Gestionnaire d'ingrédients
          </h1>
        </div>
        {!isManagerOpen && (
          <div className="flex flex-col w-full items-center justify-center rounded-lg transition-200">
            <h2 className=" mb-4 text-center font-bold text-2xl text-secondary dark:text-secondary-dark transition-200">
              Ingrédients
            </h2>
            {ingredientsDataError && (
              <p className="bg-red-500 p-2 rounded-lg text-light my-4">
                Erreur lors du chargement des ingrédients
              </p>
            )}
            <div className="my-8 px-8 w-full flex items-center justify-between">
              <OptionSelect<string>
                options={ingredients.map((ingredient) => ({
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
            <div className=" w-full p-8">
              <div
                ref={ingredientCreateContainerRef}
                className={`${animeError(
                  "",
                  createErrors
                )} flex flex-col items-center justify-center bg-primary rounded-lg`}
              >
                <h2 className="pt-8 font-bold text-2xl text-secondary">
                  Ajouter un ingrédient
                </h2>
                <div className="w-full px-8 my-8 relative flex flex-col items-center justify-center">
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
                <div className=" w-full px-8 flex items-center justify-between">
                  <OptionSelect<string>
                    onClickFunctionProps={() => setCreateErrors("")}
                    options={ingredientTypes.map((ingredientType) => ({
                      id: Number(ingredientType?.id),
                      data: ingredientType?.name,
                    }))}
                    onSelect={handleCreateIngredientTypeChange}
                    actualOption={selectedIngredientType}
                    defaultOption="Sélectionner un type ingrédient"
                    getDisplayText={(data) => data}
                  />
                  <button
                    onClick={() => {
                      setSelectedIngredientType(null);
                      setCreateErrors("");
                      setCreateIngredientType("");
                    }}
                    title="Réinitialiser le type d'ingrédient"
                    className="cursor-pointer text-primary hover:text-primary-hover dark:text-primary-dark dark:hover:text-primary-dark-hover bg-secondary dark:bg-secondary-dark hover:bg-secondary-hover dark:hover:bg-secondary-dark-hover ml-2 py-[0.6rem] px-[0.8rem] rounded-lg transition-200"
                  >
                    <FontAwesomeIcon icon={faRotateLeft} />
                  </button>
                </div>
                <div className=" my-8 w-full relative flex flex-col items-center justify-center">
                  <div className="flex justify-center items-center w-full px-8">
                    <input
                      onClick={() => setCreateErrors("")}
                      autoComplete="off"
                      required
                      type="text"
                      id="createIngredientImage"
                      placeholder=" "
                      value={
                        createImageUrl ? createImageUrl : createIngredientImage
                      }
                      className={`inputForm h-fit rounded-lg ${animeError(
                        "image",
                        createErrors
                      )}`}
                      ref={inputIngredientUrlRef}
                      onChange={(e) => setCreateIngredientImage(e.target.value)}
                    />
                    <label
                      className="labelForm"
                      htmlFor="createIngredientImage"
                    >
                      Url de l'image de l'ingrédient...
                    </label>
                    {(createIngredientImage || createImageUrl) && (
                      <button
                        title="Effacer le champs"
                        className="-ml-7 text-primary hover:text-primary-hover dark:text-primary-dark dark:hover:text-primary-dark-hover"
                      >
                        <FontAwesomeIcon
                          icon={faRotateLeft}
                          onClick={() => {
                            setCreateImageUrl("");
                            setCreateIngredientImage("");
                          }}
                        />
                      </button>
                    )}
                    <div className=" ml-4 text-nowrap">
                      <Upload useUniqueFileName onUrlChange={handleUrlChange} />
                    </div>
                  </div>

                  <div className="mt-4 flex flex-col items-center justify-center">
                    <button
                      type="button"
                      className="primary-button "
                      onClick={doCreate}
                    >
                      Ajouter un ingrédient
                    </button>
                    {createErrors && (
                      <p className="relative text-red-500">{createErrors}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* -----------------------------UPDATE-------------------------- */}
            <div className="flex flex-col items-center justify-center w-full bg-primary-hover my-8">
              <div className="w-full px-8 my-8 mx-auto mt-8 relative">
                <div
                  className={`${animeError(
                    "",
                    updateErrors
                  )} flex flex-col items-center justify-center bg-primary p-4 rounded-lg transition-200`}
                >
                  <h2 className=" my-8 font-bold text-2xl text-secondary">
                    Mettre à jour un ingrédient
                  </h2>

                  {ingredient && (
                    <div className="p-4">
                      <h2 className="text-center font-bold text-xl text-secondary dark:text-secondary-dark transition-200">
                        Ingrédient id {ingredient?.id}
                      </h2>
                      <p className=" pb-8 text-center font-bold text-4xl text-secondary dark:text-secondary-dark transition-200">
                        {ingredient.name}
                      </p>
                      {ingredient.image ? (
                        <img
                          src={ingredient.image || undefined}
                          alt={`Image de l'ingrédient ${ingredient.name}`}
                          className="w-full h-64 object-cover rounded-lg"
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
                  <div className="w-full px-8 my-8 relative flex flex-col items-center justify-center">
                    <input
                      onClick={() => {
                        setUpdateIngredientName(ingredient?.name ?? "");
                        setUpdateIngredientTypeId(ingredient?.type?.id ?? null);
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
                        } ${dropdownPosition} ${dropdownClasses} bg-secondary dark:bg-secondary-dark w-12/12 inset-8 absolute z-10`}
                      >
                        <p className="px-8 py-2 text-primary dark:text-primary-dark text-xl font-bold">
                          Ingrédients
                        </p>
                        {ingredients
                          .filter((ingredient) =>
                            ingredient.name
                              .toLowerCase()
                              .includes(updateIngredientName.toLowerCase())
                          )
                          .sort((a, b) => a.name.localeCompare(b.name))
                          .map((ingredient) => (
                            <li
                              onClick={() =>
                                handleClickIngredientList(Number(ingredient.id))
                              }
                              key={ingredient.id}
                              className="px-8 py-2 text-primary hover:text-primary-hover dark:text-primary-dark dark:hover:text-primary-dark-hover hover:bg-secondary-hover dark:hover:bg-secondary-dark-hover cursor-pointer"
                            >
                              {ingredient.name}
                            </li>
                          ))}
                      </ul>
                    )}
                  </div>
                  <div className=" w-full px-8 flex items-center justify-between">
                    <OptionSelect<string>
                      onClickFunctionProps={() => setUpdateErrors("")}
                      options={ingredientTypes.map((ingredientType) => ({
                        id: Number(ingredientType?.id),
                        data: ingredientType?.name,
                      }))}
                      onSelect={handleUpdateIngredientTypeChange}
                      actualOption={selectedIngredientType}
                      defaultOption={
                        ingredient && ingredient?.type?.name
                          ? ingredient?.type?.name
                          : "Sélectionner un type ingrédient"
                      }
                      getDisplayText={(data) => data}
                    />
                    <button
                      onClick={() => {
                        setSelectedIngredientType(null);
                        setUpdateErrors("");
                        setUpdateIngredientTypeId("");
                      }}
                      title="Réinitialiser le type d'ingrédient"
                      className="cursor-pointer text-primary hover:text-primary-hover dark:text-primary-dark dark:hover:text-primary-dark-hover bg-secondary dark:bg-secondary-dark hover:bg-secondary-hover dark:hover:bg-secondary-dark-hover ml-2 py-[0.6rem] px-[0.8rem] rounded-lg transition-200"
                    >
                      <FontAwesomeIcon icon={faRotateLeft} />
                    </button>
                  </div>
                  <div className=" my-8 w-full relative flex flex-col items-center justify-center">
                    <div className="flex justify-center items-center w-full px-8">
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
                        value={
                          updateImageUrl
                            ? updateImageUrl
                            : updateIngredientImage || ""
                        }
                        className={`inputForm rounded-lg ${animeError(
                          "image",
                          updateErrors
                        )}`}
                        ref={inputIngredientUrlRef}
                        onChange={(e) =>
                          setUpdateIngredientImage(e.target.value)
                        }
                      />
                      <label
                        className="labelForm"
                        htmlFor="updateIngredientImage"
                      >
                        Url de l'image...
                      </label>
                      {(updateIngredientImage || updateImageUrl) && (
                        <button
                          title="Effacer le champs"
                          className="-ml-7 text-primary hover:text-primary-hover dark:text-primary-dark dark:hover:text-primary-dark-hover"
                        >
                          <FontAwesomeIcon
                            icon={faRotateLeft}
                            onClick={() => {
                              setUpdateImageUrl("");
                              setUpdateIngredientImage("");
                            }}
                          />
                        </button>
                      )}
                      <div className=" ml-4 text-nowrap">
                        <Upload
                          useUniqueFileName
                          onUrlChange={handleUrlChange}
                        />
                      </div>
                    </div>
                    <div className="mt-4 w-full px-8 flex flex-wrap items-center justify-between">
                      <div className="mt-4 flex flex-col items-center justify-center">
                        <button
                          type="button"
                          className="primary-button "
                          onClick={doUpdate}
                        >
                          Mettre à jour un ingrédient
                        </button>
                      </div>
                      <div className="mt-4 flex flex-col items-center justify-center">
                        <button
                          type="button"
                          className="delete-button"
                          onClick={doDelete}
                        >
                          Supprimer un ingrédient
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="errors">
                    {updateErrors && (
                      <p className="relative text-red-500">{updateErrors}</p>
                    )}
                    {deleteErrors && (
                      <p className="relative text-red-500">{deleteErrors}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center px-8">
              <h2 className="text-4xl uppercase font-bold text-center mt-8 text-secondary dark:text-secondary-dark transition-200">
                Tous les ingrédients
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
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4  mt-8 transition-200">
                  {ingredients
                    .slice()
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((ingredient) => (
                      <div
                        key={ingredient.id}
                        className={`${
                          ingredient.variations?.some(
                            (variation) => variation.hasIngredient === true
                          )
                            ? " bg-green-500 hover:bg-green-600"
                            : "bg-primary-focus hover:bg-primary-dark-hover"
                        } group flex flex-col justify-between items-center rounded-lg
                    shadow-xl hover:shadow-2xl  overflow-hidden cursor-pointer`}
                        onClick={() => handleClickChosenIngredient(ingredient)}
                      >
                        <div className="h-1/2 w-full bg-light relative">
                          {ingredient.variations?.some(
                            (variation) => variation.hasIngredient
                          ) ? (
                            <div className="overflow-hidden px-2 absolute bottom-0 right-0 w-full justify-between items-center backdrop-blur-lg bg-gradient-to-tr from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.7)] p-1 flex">
                              <span className="-translate-x-40 group-hover:translate-x-0 text-green-400">
                                Ingrédient disponible
                              </span>
                              <span
                                title="Ingrédient disponible"
                                className="translate-x-4 group-hover:translate-x-0 w-3 h-3 bg-green-400 rounded-full"
                              ></span>
                            </div>
                          ) : (
                            <div className="overflow-hidden px-2 absolute bottom-0 right-0 w-full justify-between items-center backdrop-blur-lg bg-gradient-to-tr from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.7)] p-1 flex">
                              <span className="-translate-x-40 group-hover:translate-x-0 text-red-400">
                                Ingrédient manquant
                              </span>
                              <span
                                title="Ingrédient manquant"
                                className="translate-x-4 group-hover:translate-x-0 w-3 h-3 bg-red-400 rounded-full"
                              ></span>
                            </div>
                          )}
                          {ingredient.image ? (
                            <img
                              className="w-full h-full object-cover"
                              src={ingredient.image}
                              alt={`Image de l'ingrédient ${ingredient.name}`}
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
                        <div className="h-1/2 p-2 w-full text-center flex flex-col justify-between">
                          <div>
                            <div className="flex">
                              <p className="mb-2 font-bold text-base text-secondary-focus dark:text-secondary-dark-focus">
                                Type :&nbsp;
                              </p>
                              {ingredient.type?.name ? (
                                <p className="mb-2 font-bold text-base text-secondary-focus dark:text-secondary-dark-focus">
                                  {ingredient.type?.name}
                                </p>
                              ) : (
                                <p className="text-red-400 mb-2 font-bold text-base  dark:text-red-200">
                                  Non défini
                                </p>
                              )}
                            </div>
                            <p className=" text-center font-bold text-2xl text-secondary dark:text-secondary-dark">
                              {ingredient.name}{" "}
                              <span className=" text-base text-secondary-focus dark:text-secondary-dark-focus">
                                (id {ingredient.id})
                              </span>
                            </p>
                          </div>
                          <div className="">
                            {ingredient.variations?.map((variation) => (
                              <div
                                key={variation.id}
                                className="flex w-full justify-between"
                              >
                                <p className=" font-bold text-xs text-secondary bg-primary-hover p-1 rounded-md dark:text-secondary-dark">
                                  {variation.name}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default IngredientManager;
