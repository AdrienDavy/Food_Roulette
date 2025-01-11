import { useMutation, useQuery } from "@apollo/client";
import { queryIngredientTypes } from "../../api/ingredientType/QueryIngredientTypes";
import { queryIngredientType } from "../../api/ingredientType/QueryIngredientType";
import OptionSelect, { OptionType } from "../OptionSelect";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleDown,
  faRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import { mutationCreateIngredientType } from "../../api/ingredientType/CreateIngredientType";
import { Bounce, toast } from "react-toastify";
import { useDropdownPosition } from "../../utils/useDropdownPosition";
import { mutationUpdateIngredientType } from "../../api/ingredientType/UpdateIngredientType";
import { mutationDeleteIngredientType } from "../../api/ingredientType/DeleteIngredientType";
import Upload from "../Upload";

const IngredientTypeManager = () => {
  // --------------------------------STATES--------------------------------
  const [selectedIngredientType, setSelectedIngredientType] =
    useState<OptionType<string> | null>(null);

  const [ingredientTypeId, setIngredientTypeId] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isManagerOpen, setIsManagerOpen] = useState<boolean>(false);

  const [progress, setProgress] = useState(0);

  const [createImageUrl, setCreateImageUrl] = useState("");
  const [updateImageUrl, setUpdateImageUrl] = useState("");

  // --------------------------------REFS--------------------------------

  const ingredientTypeCreateContainerRef = useRef<HTMLDivElement>(null);
  const inputIngredientTypeNameRef = useRef<HTMLInputElement>(null);
  const inputIngredientTypeUrlRef = useRef<HTMLInputElement>(null);
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
  const [createIngredientTypeName, setCreateIngredientTypeName] =
    useState<string>("");
  const [createIngredientTypeImage, setCreateIngredientTypeImage] =
    useState<string>("");
  const [createErrors, setCreateErrors] = useState<string>("");
  // -------------------------UPDATE--------------------------------
  const [updateIngredientTypeName, setUpdateIngredientTypeName] =
    useState<string>("");
  const [updateIngredientTypeImage, setUpdateIngredientTypeImage] =
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
    data: ingredientTypesDataFromQuery,
    error: ingredientTypesDataError,
    loading: ingredientTypesDataLoading,
  } = useQuery(queryIngredientTypes);
  const ingredientTypes = ingredientTypesDataFromQuery?.ingredientTypes || [];
  //----------------------------------------------------------------
  const { data: ingredientTypeDataFromQuery } = useQuery(queryIngredientType, {
    variables: { ingredientTypeId: `${ingredientTypeId}` },
    fetchPolicy: "cache-and-network",
  });
  const ingredientType = ingredientTypeDataFromQuery?.ingredientType;

  // -----------------------------MUTATIONS-----------------------------------

  const [doCreateIngredientType] = useMutation(mutationCreateIngredientType, {
    refetchQueries: [queryIngredientTypes],
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

  const [doUpdateIngredientType] = useMutation(mutationUpdateIngredientType, {
    refetchQueries: [queryIngredientTypes, queryIngredientType],
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

  const [doDeleteIngredientType] = useMutation(mutationDeleteIngredientType, {
    refetchQueries: [queryIngredientTypes, queryIngredientType],
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
    if (ingredientTypesDataLoading) {
      const interval = setInterval(() => {
        setProgress((prev) => (prev < 80 ? prev + 5 : prev));
      }, 100);
      return () => clearInterval(interval);
    } else if (ingredientTypesDataFromQuery) {
      setProgress(100);
      setTimeout(() => setProgress(0), 500); // Réinitialiser la barre après le chargement
    }
  }, [ingredientTypesDataLoading, ingredientTypesDataFromQuery]);

  // -----------------------------FUNCTIONS-----------------------------------

  // -----------------------------CREATE--------------------------
  const validateCreateForm = () => {
    if (!createIngredientTypeName) {
      setCreateErrors("Le nom du type d'ingrédient est requis.");
      return;
    }

    if (
      createIngredientTypeImage &&
      !createIngredientTypeImage.match(
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
      const { data } = await doCreateIngredientType({
        variables: {
          data: {
            name: createIngredientTypeName,
            image: createIngredientTypeImage || createImageUrl || undefined, // Assurez-vous de définir l'image si nécessaire
          },
        },
      });
      if (data?.createIngredientType) {
        toast.success(
          `Type d'ingrédient ${data?.createIngredientType.name} créé avec succès ! 🦄`,
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
        setCreateIngredientTypeName("");
        setCreateIngredientTypeImage("");
        setCreateImageUrl("");
      }
      console.log(" IngredientType created successfully:", data);

      return data;
    } catch (err) {
      console.error(err);
    }
  }

  // -----------------------------UPDATE--------------------------

  const validateUpdateForm = () => {
    if (!updateIngredientTypeName) {
      setUpdateErrors("Le nom du type d'ingrédient est requis.");
      return;
    }
    if (
      updateIngredientTypeImage &&
      !updateIngredientTypeImage.match(
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
    if (!ingredientTypeId) {
      setUpdateErrors("Veuillez sélectionner un type ingrédient.");
      return;
    }
    if (!validateUpdateForm()) {
      return;
    }

    if (updateIngredientTypeName === ingredientType?.name) {
      setUpdateIngredientTypeName(ingredientType?.name);
    }
    if (updateIngredientTypeImage === ingredientType?.image) {
      setUpdateIngredientTypeImage(ingredientType?.image || "");
    }

    try {
      const { data } = await doUpdateIngredientType({
        variables: {
          id: `${ingredientTypeId}`,
          data: {
            name: updateIngredientTypeName,
            image: updateIngredientTypeImage || updateImageUrl || undefined, // Assurez-vous de définir l'image si nécessaire
          },
        },
      });
      if (data?.updateIngredientType) {
        toast.success(
          `Type d'ingrédient ${data?.updateIngredientType.name} modifié avec succès ! 🦄`,
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
      setUpdateIngredientTypeName(updateIngredientTypeName);
      setUpdateIngredientTypeImage(updateIngredientTypeImage);
      setUpdateIngredientTypeId(updateIngredientTypeId);
      setIsOpen(false);

      return data?.updateIngredientType;
    } catch (err) {
      console.error(err);
    }
  }

  // -----------------------------DELETE--------------------------

  const validateDeleteForm = () => {
    if (!updateIngredientTypeName) {
      setDeleteErrors("Le nom du type d'ingrédient est requis.");
      return;
    }
    setDeleteErrors("");
    return true;
  };

  async function doDelete() {
    if (!ingredientTypeId) {
      setDeleteErrors("Veuillez sélectionner un type d'ingrédient.");
      return;
    }
    if (!validateDeleteForm()) {
      return;
    }

    try {
      const { data } = await doDeleteIngredientType({
        variables: {
          id: `${ingredientTypeId}`,
        },
      });
      if (data?.deleteIngredientType) {
        toast.success(
          `Type d'ingrédient ${data?.deleteIngredientType.name} supprimé avec succès ! 🦄`,
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
      setUpdateIngredientTypeName("");
      setUpdateIngredientTypeImage("");
      setIngredientTypeId(null);
      setIsOpen(false);

      return data?.deleteIngredientType;
    } catch (err) {
      console.error(err);
    }
  }

  // -----------------------------HANDLES--------------------------------

  // -----------------------------OPTIONSELECT--------------------

  const handleIngredientTypeChange = (option: OptionType<string>) => {
    setSelectedIngredientType(option);
    setIsOpen(isOpen);
  };

  // -------------------------------------------------------------------
  const handleClickIngredientTypeList = (id: number) => {
    setIngredientTypeId(Number(id));
    setUpdateIngredientTypeName("");
    setUpdateIngredientTypeImage("");
    setIsOpen(!isOpen);
    setUpdateErrors("");
  };

  const handleSearchIngredientType = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUpdateIngredientTypeName(e.target.value);
    setIsOpen(e.target.value.trim() !== ""); // Ouvre la liste si la recherche contient du texte
  };

  const handleUrlChange = (url: string) => {
    setCreateImageUrl(url); // Stocke l'URL pour utilisation
  };

  interface ChosenIngredientType {
    id: string;
    name: string;
    image?: string | null;
    typeId?: string | null;
  }

  const handleClickChosenIngredientType = (
    chosenIngredientType: ChosenIngredientType
  ) => {
    setIngredientTypeId(Number(chosenIngredientType.id));
    setUpdateIngredientTypeName(chosenIngredientType.name);
    setUpdateIngredientTypeImage(chosenIngredientType.image || "");
    setUpdateIngredientTypeId(chosenIngredientType.typeId || null);
  };

  return (
    <>
      <section className="flex flex-col items-center justify-center bg-primary-hover mb-8 rounded-lg max-w-5xl mx-auto transition-200 overflow-hidden shadow-2xl">
        <div
          className="bg-primary-focus flex items-center justify-center w-full p-4 mb-8 cursor-pointer"
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
            id="ingredientTypes"
            className="w-full text-center font-bold text-4xl text-secondary dark:text-secondary-dark transition-200"
          >
            Gestionnaire de types d'ingrédients
          </h1>
        </div>
        {isManagerOpen && (
          <div className="flex flex-col w-full py-8 items-center justify-center rounded-lg transition-200">
            <h2 className=" mb-4 text-center font-bold text-2xl text-secondary dark:text-secondary-dark transition-200">
              Types d'ingrédients
            </h2>
            {ingredientTypesDataError && (
              <p className="bg-red-500 p-2 rounded-lg text-light my-4">
                Erreur lors du chargement des ingrédients
              </p>
            )}
            <div className="my-8 px-8 w-full flex items-center justify-between">
              <OptionSelect<string>
                options={ingredientTypes.map((ingredientType) => ({
                  id: Number(ingredientType.id),
                  data: ingredientType.name,
                }))}
                onSelect={handleIngredientTypeChange}
                actualOption={selectedIngredientType}
                defaultOption="Sélectionner un type d'ingrédient"
                getDisplayText={(data) => data}
              />
              <button
                onClick={() => setSelectedIngredientType(null)}
                title="Réinitialiser le type d'ingrédient"
                className="cursor-pointer text-primary hover:text-primary-hover dark:text-primary-dark dark:hover:text-primary-dark-hover bg-secondary dark:bg-secondary-dark hover:bg-secondary-hover dark:hover:bg-secondary-dark-hover ml-2 py-[0.4rem] px-[0.6rem] rounded-lg transition-200"
              >
                <FontAwesomeIcon icon={faRotateLeft} />
              </button>
            </div>
            <div className=" w-full p-8">
              <div
                ref={ingredientTypeCreateContainerRef}
                className={`${animeError(
                  "",
                  createErrors
                )} flex flex-col items-center justify-center bg-primary rounded-lg`}
              >
                <h2 className="pt-8 font-bold text-2xl text-secondary">
                  Ajouter un type d'ingrédient
                </h2>
                <div className="w-full px-8 my-8 relative flex flex-col items-center justify-center">
                  <input
                    onClick={() => setCreateErrors("")}
                    autoComplete="off"
                    required
                    type="text"
                    id="createIngredientTypeName"
                    placeholder=" "
                    value={createIngredientTypeName}
                    className={`inputForm rounded-lg ${animeError(
                      "nom",
                      createErrors
                    )}`}
                    ref={inputIngredientTypeNameRef}
                    onChange={(e) =>
                      setCreateIngredientTypeName(e.target.value)
                    }
                  />
                  <label
                    className="labelForm"
                    htmlFor="createIngredientTypeName"
                  >
                    Nom du type d'ingrédient...
                  </label>
                </div>
                <div className=" mb-8 w-full relative flex flex-col items-center justify-center">
                  <div className="flex justify-center items-center w-full px-8">
                    <input
                      onClick={() => setCreateErrors("")}
                      autoComplete="off"
                      required
                      type="text"
                      id="createIngredientTypeImage"
                      placeholder=" "
                      value={
                        createImageUrl
                          ? createImageUrl
                          : createIngredientTypeImage
                      }
                      className={`inputForm h-fit rounded-lg ${animeError(
                        "image",
                        createErrors
                      )}`}
                      ref={inputIngredientTypeUrlRef}
                      onChange={(e) =>
                        setCreateIngredientTypeImage(e.target.value)
                      }
                    />
                    <label
                      className="labelForm"
                      htmlFor="createIngredientTypeImage"
                    >
                      Url de l'image du type d'ingrédient...
                    </label>
                    {(createIngredientTypeImage || createImageUrl) && (
                      <button
                        title="Effacer le champs"
                        className="-ml-7 text-primary hover:text-primary-hover dark:text-primary-dark dark:hover:text-primary-dark-hover"
                      >
                        <FontAwesomeIcon
                          icon={faRotateLeft}
                          onClick={() => {
                            setCreateImageUrl("");
                            setCreateIngredientTypeImage("");
                          }}
                        />
                      </button>
                    )}
                    <div className=" ml-4 text-nowrap">
                      <Upload useUniqueFileName onUrlChange={handleUrlChange} />
                    </div>
                  </div>

                  <div className="mt-16 flex flex-col items-center justify-center">
                    <button
                      type="button"
                      className="primary-button "
                      onClick={doCreate}
                    >
                      Ajouter un type d'ingrédient
                    </button>
                    {createErrors && (
                      <p className="mt-4 relative text-red-500">
                        {createErrors}
                      </p>
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
                    Mettre à jour un type d'ingrédient
                  </h2>

                  {ingredientType && (
                    <div className="p-4">
                      <h2 className="text-center font-bold text-xl text-secondary dark:text-secondary-dark transition-200">
                        Type d'ingrédient id {ingredientType?.id}
                      </h2>
                      <p className=" pb-8 text-center font-bold text-4xl text-secondary dark:text-secondary-dark transition-200">
                        {ingredientType.name}
                      </p>
                      {ingredientType.image ? (
                        <img
                          src={ingredientType.image || undefined}
                          alt={`Image du type d'ingrédient ${ingredientType.name}`}
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
                        setUpdateIngredientTypeName(ingredientType?.name ?? "");
                        setUpdateErrors("");
                        setDeleteErrors("");
                      }}
                      autoComplete="off"
                      required
                      type="text"
                      id="updateIngredientTypeName"
                      placeholder=" "
                      value={updateIngredientTypeName}
                      className={`inputForm ${animeError(
                        "",
                        updateErrors || deleteErrors
                      )} ${isOpen ? triggerClasses : "rounded-lg"}`}
                      ref={triggerRef}
                      onChange={handleSearchIngredientType}
                    />
                    <label
                      className="labelForm"
                      htmlFor="updateIngredientTypeName"
                    >
                      Nom du type d'ingrédient...
                    </label>
                    {updateIngredientTypeName && isOpen && (
                      <ul
                        ref={dropdownRef}
                        className={`${
                          ingredientTypes.filter((ingredientType) =>
                            ingredientType.name
                              .toLowerCase()
                              .includes(updateIngredientTypeName.toLowerCase())
                          ).length > 10
                            ? " h-80 overflow-y-scroll"
                            : ingredientTypes.filter((ingredientType) =>
                                ingredientType.name
                                  .toLowerCase()
                                  .includes(
                                    updateIngredientTypeName.toLowerCase()
                                  )
                              ).length === 0
                            ? "hidden "
                            : "h-fit"
                        } ${dropdownPosition} ${dropdownClasses} bg-secondary dark:bg-secondary-dark w-12/12 inset-8 absolute z-10`}
                      >
                        <p className="px-8 py-2 text-primary dark:text-primary-dark text-xl font-bold">
                          Type d'ingrédients
                        </p>
                        {ingredientTypes
                          .filter((ingredientType) =>
                            ingredientType.name
                              .toLowerCase()
                              .includes(updateIngredientTypeName.toLowerCase())
                          )
                          .sort((a, b) => a.name.localeCompare(b.name))
                          .map((ingredientType) => (
                            <li
                              onClick={() =>
                                handleClickIngredientTypeList(
                                  Number(ingredientType.id)
                                )
                              }
                              key={ingredientType.id}
                              className="px-8 py-2 text-primary hover:text-primary-hover dark:text-primary-dark dark:hover:text-primary-dark-hover hover:bg-secondary-hover dark:hover:bg-secondary-dark-hover cursor-pointer"
                            >
                              {ingredientType.name}
                            </li>
                          ))}
                      </ul>
                    )}
                  </div>
                  {/* SHOP ET BRAND <div className=" w-full px-8 flex items-center justify-between">
                    <OptionSelect<string>
                      onClickFunctionProps={() => setUpdateErrors("")}
                      options={ingredientTypes.map((ingredientType) => ({
                        id: Number(ingredientType?.id),
                        data: ingredientType?.name,
                      }))}
                      onSelect={handleUpdateIngredientTypeChange}
                      actualOption={selectedIngredientType}
                      defaultOption={
                        ingredientType && ingredientType?.type?.name
                          ? ingredientType?.type?.name
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
                  </div> */}
                  <div className=" my-8 w-full relative flex flex-col items-center justify-center">
                    <div className="flex justify-center items-center w-full px-8">
                      <input
                        onClick={() => {
                          setUpdateIngredientTypeImage(
                            ingredientType?.image ?? ""
                          );
                          setUpdateErrors("");
                          setDeleteErrors("");
                        }}
                        autoComplete="off"
                        required
                        type="text"
                        id="updateIngredientTypeImage"
                        placeholder=" "
                        value={
                          updateImageUrl
                            ? updateImageUrl
                            : updateIngredientTypeImage || ""
                        }
                        className={`inputForm rounded-lg ${animeError(
                          "image",
                          updateErrors
                        )}`}
                        ref={inputIngredientTypeUrlRef}
                        onChange={(e) =>
                          setUpdateIngredientTypeImage(e.target.value)
                        }
                      />
                      <label
                        className="labelForm"
                        htmlFor="updateIngredientTypeImage"
                      >
                        Url de l'image...
                      </label>
                      {(updateIngredientTypeImage || updateImageUrl) && (
                        <button
                          title="Effacer le champs"
                          className="-ml-7 text-primary hover:text-primary-hover dark:text-primary-dark dark:hover:text-primary-dark-hover"
                        >
                          <FontAwesomeIcon
                            icon={faRotateLeft}
                            onClick={() => {
                              setUpdateImageUrl("");
                              setUpdateIngredientTypeImage("");
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
                          Mettre à jour un type d'ingrédient
                        </button>
                      </div>
                      <div className="mt-4 flex flex-col items-center justify-center">
                        <button
                          type="button"
                          className="delete-button"
                          onClick={doDelete}
                        >
                          Supprimer un type d'ingrédient
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

              {ingredientTypesDataError ? (
                <p className="bg-red-500 p-2 rounded-lg text-light my-4 col-span-4">
                  Erreur lors du chargement des ingrédients
                </p>
              ) : ingredientTypesDataLoading ? (
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
                  {ingredientTypes
                    .slice()
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((ingredientType) => (
                      <div
                        key={ingredientType.id}
                        className={`
                        bg-primary-focus hover:bg-primary-dark-hover group flex flex-col justify-between items-center rounded-lg
                    shadow-xl hover:shadow-2xl  overflow-hidden cursor-pointer`}
                        onClick={() =>
                          handleClickChosenIngredientType(ingredientType)
                        }
                      >
                        <div className="h-1/2 w-full bg-light relative">
                          {ingredientType.image ? (
                            <img
                              className="w-full h-full object-cover"
                              src={ingredientType.image}
                              alt={`Image du type d'ingrédient ${ingredientType.name}`}
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
                            <p className=" text-center font-bold text-2xl text-secondary dark:text-secondary-dark">
                              {ingredientType.name}{" "}
                              <span className=" text-base text-secondary-focus dark:text-secondary-dark-focus">
                                (id {ingredientType.id})
                              </span>
                            </p>
                          </div>
                          <p className=" font-bold text-xs text-secondary bg-primary-hover p-1 rounded-md dark:text-secondary-dark">
                            {ingredientType.brand?.name}
                          </p>
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

export default IngredientTypeManager;
