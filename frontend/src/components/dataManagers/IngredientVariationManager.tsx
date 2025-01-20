import { useMutation, useQuery } from "@apollo/client";
import { queryIngredientVariations } from "../../api/ingredientVariation/QueryIngredientVariations";
import OptionSelect, { OptionType } from "../OptionSelect";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleDown,
  faRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import { Bounce, toast } from "react-toastify";
import Upload from "../Upload";
import { mutationCreateIngredientVariation } from "../../api/ingredientVariation/CreateIngredientVariation";
import { queryBrands } from "../../api/brand/QueryBrands";
import { queryIngredients } from "../../api/ingredient/QueryIngredients";
import { querySeasons } from "../../api/season/QuerySeasons";
import { queryShops } from "../../api/shop/QueryShops";
import MultiSelect from "../MultiSelect";
import { queryIngredientVariation } from "../../api/ingredientVariation/QueryIngredientVariation";
import { queryIngredientTypes } from "../../api/ingredientType/QueryIngredientTypes";
import { useDropdownPosition } from "../../utils/useDropdownPosition";
import { mutationUpdateIngredientVariation } from "../../api/ingredientVariation/UpdateIngredientVariation";
import { IngredientVariation } from "../../gql/graphql";
import { mutationDeleteIngredientVariation } from "../../api/ingredientVariation/DeleteIngredientVariation";

const IngredientVariationManager = () => {
  // --------------------------------STATES--------------------------------

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isManagerOpen, setIsManagerOpen] = useState<boolean>(false);

  const [progress, setProgress] = useState(0);

  // --------------------------------REFS--------------------------------

  const ingredientVariationCreateContainerRef = useRef<HTMLDivElement>(null);
  const inputIngredientVariationNameRef = useRef<HTMLInputElement>(null);
  const inputIngredientVariationUrlRef = useRef<HTMLInputElement>(null);
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

  // -------------------------CREATE STATES--------------------------------
  const [
    selectedCreateIngredientVariation,
    setSelectedCreateIngredientVariation,
  ] = useState<OptionType<string> | null>(null);

  const [createImageUrl, setCreateImageUrl] = useState("");

  const [selectedCreateBrand, setSelectedCreateBrand] =
    useState<OptionType<string> | null>(null);

  const [selectedCreateIngredient, setSelectedCreateIngredient] =
    useState<OptionType<string> | null>(null);

  const [selectedCreateType, setSelectedCreateType] =
    useState<OptionType<string> | null>(null);

  const [selectedCreateSeason, setSelectedCreateSeason] =
    useState<OptionType<string> | null>(null);

  const [, setSelectedCreateShops] = useState<OptionType<string>[]>([]);

  const [createIngredientVariationName, setCreateIngredientVariationName] =
    useState<string>("");

  const [createIngredientVariationImage, setCreateIngredientVariationImage] =
    useState<string>("");

  const [createErrors, setCreateErrors] = useState<string>("");

  const [
    createIngredientVariationShopsIds,
    setCreateIngredientVariationShopsIds,
  ] = useState<(string | number)[]>([]);

  // -------------------------------------UPDATE STATES-------------------------------
  const [ingredientVariationId, setIngredientVariationId] = useState<
    number | null
  >(null);

  const [updateIngredientVariationName, setUpdateIngredientVariationName] =
    useState<string>("");
  const [updateIngredientVariationImage, setUpdateIngredientVariationImage] =
    useState<string>("");
  const [updateIngredientVariationId, setUpdateIngredientVariationId] =
    useState<string>("");
  const [selectedUpdateSeason, setSelectedUpdateSeason] =
    useState<OptionType<string> | null>(null);
  const [selectedUpdateIngredientFamily, setSelectedUpdateIngredientFamily] =
    useState<OptionType<string> | null>(null);
  const [selectedUpdateIngredientType, setSelectedUpdateIngredientType] =
    useState<OptionType<string> | null>(null);
  const [selectedUpdateBrand, setSelectedUpdateBrand] =
    useState<OptionType<string> | null>(null);
  const [selectedUpdateShops, setSelectedUpdateShops] = useState<string>("");
  const [
    updateIngredientVariationShopsIds,
    setUpdateIngredientVariationShopsIds,
  ] = useState<(string | number)[]>([]);

  const [updateErrors, setUpdateErrors] = useState<string>("");
  const [deleteErrors, setDeleteErrors] = useState<string>("");

  // --------------------------------QUERIES--------------------------------
  // --------------------INGREDIENT VARIATIONS---------------------

  const {
    data: ingredientVariationsDataFromQuery,
    error: ingredientVariationsDataError,
    loading: ingredientVariationsDataLoading,
  } = useQuery(queryIngredientVariations);
  const ingredientVariations =
    ingredientVariationsDataFromQuery?.ingredientVariations || [];
  //--------------------- INGREDIENT VARIATION ---------------------

  const { data: ingredientVariationDataFromQuery } = useQuery(
    queryIngredientVariation,
    {
      variables: { ingredientVariationId: `${ingredientVariationId}` },
      fetchPolicy: "cache-and-network",
    }
  );
  const ingredientVariation =
    ingredientVariationDataFromQuery?.ingredientVariation;

  // --------------------INGREDIENT BRANDS---------------------

  const {
    data: brandsDataFromQuery,
    error: brandsDataError,
    loading: brandsDataLoading,
  } = useQuery(queryBrands);
  const brands = brandsDataFromQuery?.brands || [];

  // --------------------INGREDIENT INGREDIENTS---------------------
  const {
    data: ingredientsDataFromQuery,
    error: ingredientsDataError,
    loading: ingredientsDataLoading,
  } = useQuery(queryIngredients);
  const ingredients = ingredientsDataFromQuery?.ingredients || [];
  // --------------------INGREDIENT TYPES---------------------
  const {
    data: typesDataFromQuery,
    error: typesDataError,
    loading: typesDataLoading,
  } = useQuery(queryIngredientTypes);
  const types = typesDataFromQuery?.ingredientTypes || [];
  // --------------------INGREDIENT SEASONS---------------------
  const {
    data: seasonsDataFromQuery,
    error: seasonsDataError,
    loading: seasonsDataLoading,
  } = useQuery(querySeasons);
  const seasons = seasonsDataFromQuery?.seasons || [];
  // --------------------INGREDIENT SHOPS---------------------
  const {
    data: shopsDataFromQuery,
    error: shopsDataError,
    loading: shopsDataLoading,
  } = useQuery(queryShops);
  const shops = shopsDataFromQuery?.shops || [];

  // -----------------------------MUTATIONS-----------------------------------

  const [doCreateIngredientVariation] = useMutation(
    mutationCreateIngredientVariation,
    {
      refetchQueries: [queryIngredientVariations],
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
    }
  );

  const [doUpdateIngredientVariation] = useMutation(
    mutationUpdateIngredientVariation,
    {
      refetchQueries: [queryIngredientVariations, queryIngredientVariation],
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
    }
  );

  const [doDeleteIngredientType] = useMutation(
    mutationDeleteIngredientVariation,
    {
      refetchQueries: [queryIngredientVariation, queryIngredientVariations],
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
    }
  );

  // -----------------------------UX-----------------------------------

  const animeError = (wordToWatch: string | "", errors: string) => {
    if (errors && errors.includes(wordToWatch || "")) {
      return `border border-red-500 animate-vibrate shadow-md shadow-red-400`;
    } else {
      return `border-none`;
    }
  };

  useEffect(() => {
    if (
      ingredientVariationsDataLoading ||
      brandsDataLoading ||
      ingredientsDataLoading ||
      typesDataLoading ||
      seasonsDataLoading ||
      shopsDataLoading
    ) {
      const interval = setInterval(() => {
        setProgress((prev) => (prev < 80 ? prev + 5 : prev));
      }, 100);
      return () => clearInterval(interval);
    } else if (ingredientVariationsDataFromQuery || brandsDataFromQuery) {
      setProgress(100);
      setTimeout(() => setProgress(0), 500); // Réinitialiser la barre après le chargement
    }
  }, [
    ingredientVariationsDataLoading,
    ingredientVariationsDataFromQuery,
    brandsDataLoading,
    brandsDataFromQuery,
    ingredientsDataLoading,
    typesDataLoading,
    seasonsDataLoading,
    shopsDataLoading,
  ]);

  // -----------------------------FUNCTIONS-----------------------------------

  // -----------------------------DOCREATE--------------------------
  const validateCreateForm = () => {
    if (!createIngredientVariationName) {
      setCreateErrors("Le nom de la variation d'ingrédient est requis.");
      return;
    }
    if (
      ingredientVariations.find(
        (ingredientVariation) =>
          createIngredientVariationName.toLocaleLowerCase() ===
          ingredientVariation?.name.toLocaleLowerCase()
      )
    ) {
      setCreateErrors("La variation d'ingrédient existe déjà.");
      return;
    }

    if (
      createIngredientVariationImage &&
      !createIngredientVariationImage.match(
        /(http(s?):)([/|.|\w|\s|-]|%[0-9a-fA-F]{2})+\.(?:jpg|gif|png|svg)/g
      )
    ) {
      setCreateErrors("L'url de l'image n'est pas valide.");
      return;
    }

    if (!selectedCreateSeason) {
      setCreateErrors("La saison est requise.");
      return;
    }
    if (!selectedCreateIngredient) {
      setCreateErrors("Le nom de la famille de l'ingrédient est requis.");
      return;
    }
    if (!selectedCreateType) {
      setCreateErrors("Le nom du type est requis.");
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
      const { data } = await doCreateIngredientVariation({
        variables: {
          data: {
            name: createIngredientVariationName,
            image:
              createIngredientVariationImage || createImageUrl || undefined, // Assurez-vous de définir l'image si nécessaire
            seasonId: `${selectedCreateSeason?.id}`,
            brandId: `${selectedCreateBrand?.id || ""}`,
            ingredientId: `${selectedCreateIngredient?.id}`,
            typeId: `${selectedCreateType?.id}`,
            shopIds: createIngredientVariationShopsIds.map(String),
          },
        },
      });
      if (data?.createIngredientVariation) {
        toast.success(
          `Variation d'ingrédient ${data?.createIngredientVariation.name} créée avec succès ! 🦄`,
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
        setCreateIngredientVariationName("");
        setCreateIngredientVariationImage("");
        setCreateImageUrl("");
        setSelectedCreateBrand(null);
        setSelectedCreateIngredient(null);
        setSelectedCreateType(null);
        setSelectedCreateSeason(null);
        setSelectedCreateShops([]);
        setCreateErrors("");
      }
      console.log(" IngredientVariation created successfully:", data);

      return data;
    } catch (err) {
      console.error(err);
    }
  }

  // -----------------------------DOUPDATE--------------------------

  const validateUpdateForm = () => {
    if (!updateIngredientVariationName) {
      setUpdateErrors("Le nom du variation d'ingrédient est requis.");
      return;
    }
    if (
      updateIngredientVariationImage &&
      !updateIngredientVariationImage.match(
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
    if (!ingredientVariationId) {
      setUpdateErrors("Veuillez sélectionner un type ingrédient.");
      return;
    }
    if (!validateUpdateForm()) {
      return;
    }

    if (updateIngredientVariationName === ingredientVariation?.name) {
      setUpdateIngredientVariationName(ingredientVariation?.name);
    }
    if (updateIngredientVariationImage === ingredientVariation?.image) {
      setUpdateIngredientVariationImage(ingredientVariation?.image || "");
    }
    console.log(
      "updateIngredientVariationShopsIds before click:",
      updateIngredientVariationShopsIds
    );

    try {
      const { data } = await doUpdateIngredientVariation({
        variables: {
          id: `${ingredientVariationId}`,
          data: {
            name: updateIngredientVariationName,
            image: updateIngredientVariationImage || undefined, // Assurez-vous de définir l'image si nécessaire
            seasonId: `${selectedUpdateSeason?.id}`,
            ingredientId: `${selectedUpdateIngredientFamily?.id}`,
            typeId: `${selectedUpdateIngredientType?.id}`,
            brandId: `${selectedUpdateBrand?.id || ""}`,
            shopIds: updateIngredientVariationShopsIds.map(String),
          },
        },
      });
      setUpdateIngredientVariationName(updateIngredientVariationName);
      setUpdateIngredientVariationImage(updateIngredientVariationImage);
      setUpdateIngredientVariationId(updateIngredientVariationId);
      setSelectedUpdateSeason(selectedUpdateSeason);
      setSelectedUpdateIngredientFamily(selectedUpdateIngredientFamily);
      setSelectedUpdateIngredientType(selectedUpdateIngredientType);
      setSelectedUpdateBrand(selectedUpdateBrand);
      setSelectedUpdateShops(selectedUpdateShops);
      setIsOpen(false);
      console.log(
        "updateIngredientVariationShopsIds after click:",
        updateIngredientVariationShopsIds
      );
      if (data?.updateIngredientVariation) {
        toast.success(
          `Variation d'ingrédient ${data?.updateIngredientVariation.name} modifié avec succès ! 🦄`,
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
      return data?.updateIngredientVariation;
    } catch (err) {
      console.error(err);
    }
  }

  // -----------------------------DODELETE--------------------------

  const validateDeleteForm = () => {
    if (!updateIngredientVariationName) {
      setDeleteErrors("La variation d'ingrédient est requise.");
      return;
    }
    setDeleteErrors("");
    return true;
  };

  async function doDelete() {
    if (!ingredientVariationId) {
      setDeleteErrors("Veuillez sélectionner une variation d'ingrédient.");
      return;
    }
    if (!validateDeleteForm()) {
      return;
    }

    try {
      const { data } = await doDeleteIngredientType({
        variables: {
          id: `${ingredientVariationId}`,
        },
      });
      if (data?.deleteIngredientVariation) {
        toast.success(
          `Type d'ingrédient ${data?.deleteIngredientVariation.name} supprimé avec succès ! 🦄`,
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
      setUpdateIngredientVariationId("");
      setUpdateIngredientVariationName("");
      setUpdateIngredientVariationImage("");
      setSelectedUpdateSeason(null);
      setSelectedUpdateIngredientFamily(null);
      setSelectedUpdateIngredientType(null);
      setSelectedUpdateBrand(null);
      setSelectedUpdateShops("");
      setIsOpen(false);

      return data?.deleteIngredientVariation;
    } catch (err) {
      console.error(err);
    }
  }

  // -----------------------------HANDLES--------------------------------

  // -----------------------------HANDLE CREATE--------------------

  const handleCreateOptionChange = (
    key: string,
    option: OptionType<string>
  ) => {
    switch (key) {
      case "ingredientVariation":
        setSelectedCreateIngredientVariation(option);
        break;
      case "brand":
        setSelectedCreateBrand(option);
        break;
      case "ingredient":
        setSelectedCreateIngredient(option);
        break;
      case "type":
        setSelectedCreateType(option);
        break;
      case "season":
        setSelectedCreateSeason(option);
        break;
      default:
        break;
    }
    setCreateErrors("");
    setIsOpen(isOpen);
  };

  const handleUrlChange = (url: string) => {
    setCreateImageUrl(url); // Stocke l'URL pour utilisation
  };

  // ---------------------------HANDLE UPDATE----------------------------------------

  const handleSearchUpdateIngredientVariationName = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUpdateIngredientVariationName(e.target.value);
    setIsOpen(e.target.value.trim() !== ""); // Ouvre la liste si la recherche contient du texte
  };

  const handleClickUpdateIngredientVariationList = (
    ingredientVariationSearched: IngredientVariation
  ) => {
    setIngredientVariationId(Number(ingredientVariationSearched.id));
    setUpdateIngredientVariationName(ingredientVariationSearched.name);
    setUpdateIngredientVariationImage(ingredientVariationSearched.image || "");
    setSelectedUpdateSeason({
      id: ingredientVariationSearched.season?.id || null || "",
      data:
        ingredientVariationSearched.season?.seasonName ||
        "Sélectionner une saison",
    });
    setSelectedUpdateIngredientFamily({
      id: ingredientVariationSearched.ingredient?.id || null || "",
      data:
        ingredientVariationSearched.ingredient?.name ||
        "Sélectionner une famille d'ingrédient",
    });
    setSelectedUpdateIngredientType({
      id: ingredientVariationSearched.type?.id || null || "",
      data: ingredientVariationSearched.type?.name || " Sélectionner un type",
    });
    setSelectedUpdateBrand({
      id: ingredientVariationSearched.brand?.id || null || "",
      data:
        ingredientVariationSearched.brand?.name || "Sélectionner une marque",
    });

    console.log("Shops data:", ingredientVariationSearched.shops);

    setSelectedUpdateShops(
      ingredientVariationSearched.shops?.map((shop) => shop.id).join(",") || ""
    );
    setUpdateIngredientVariationShopsIds(
      ingredientVariationSearched.shops?.map((shop) => Number(shop.id)) || []
    );

    console.log(
      "VARIATION :",
      ingredientVariation?.id,
      "IngredientVariation selected:",
      ingredientVariationSearched
    );

    setIsOpen(false);
    setUpdateErrors("");
  };

  const handleUpdateOptionChange = (
    key: string,
    option: OptionType<string>
  ) => {
    switch (key) {
      case "season":
        setSelectedUpdateSeason(option);
        break;
      case "ingredient":
        setSelectedUpdateIngredientFamily(option);
        break;
      case "type":
        setSelectedUpdateIngredientType(option);
        break;
      case "brand":
        setSelectedUpdateBrand(option);
        break;
      default:
        break;
    }
    console.log("Option selectedCreate:", option);
    setCreateErrors("");
    setIsOpen(isOpen);
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
            id="ingredientVariations"
            className="w-full text-center font-bold text-4xl text-secondary dark:text-secondary-dark transition-200"
          >
            Gestionnaire de variations d'ingrédients
          </h1>
        </div>
        {!isManagerOpen && (
          <div className="flex flex-col w-full py-8 items-center justify-center rounded-lg transition-200">
            <h2 className=" mb-4 text-center font-bold text-2xl text-secondary dark:text-secondary-dark transition-200">
              Variations d'ingrédients
            </h2>
            {ingredientVariationsDataError && (
              <p className="bg-red-500 p-2 rounded-lg text-light my-4">
                Erreur lors du chargement des variations d'ingrédients
              </p>
            )}
            <div className="my-8 px-8 w-full flex items-center justify-between">
              <OptionSelect<string>
                options={ingredientVariations.map((ingredientVariation) => ({
                  id: Number(ingredientVariation.id),
                  data: ingredientVariation.name,
                }))}
                onSelect={(option) =>
                  handleCreateOptionChange("ingredientVariation", option)
                }
                actualOption={selectedCreateIngredientVariation}
                defaultOption="Sélectionner une variation d'ingrédient"
                getDisplayText={(data) => data}
              />
              <button
                onClick={() => setSelectedCreateIngredientVariation(null)}
                title="Réinitialiser la variation d'ingrédient"
                className="cursor-pointer text-primary hover:text-primary-hover dark:text-primary-dark dark:hover:text-primary-dark-hover bg-secondary dark:bg-secondary-dark hover:bg-secondary-hover dark:hover:bg-secondary-dark-hover ml-2 py-[0.6rem] px-[0.8rem] rounded-lg transition-200"
              >
                <FontAwesomeIcon icon={faRotateLeft} />
              </button>
            </div>
            <div className=" w-full p-8">
              <div
                ref={ingredientVariationCreateContainerRef}
                className={`${animeError(
                  "",
                  createErrors
                )} flex flex-col items-center justify-center bg-primary rounded-lg`}
              >
                <h2 className="pt-8 font-bold text-2xl text-secondary">
                  Ajouter une variation d'ingrédient
                </h2>
                <div className="w-full px-8 my-8 relative flex flex-col items-center justify-center">
                  <input
                    onClick={() => setCreateErrors("")}
                    autoComplete="off"
                    required
                    type="text"
                    id="createIngredientVariationName"
                    placeholder=" "
                    value={createIngredientVariationName}
                    className={`inputForm rounded-lg ${animeError(
                      "variation d'ingrédient",
                      createErrors
                    )}`}
                    ref={inputIngredientVariationNameRef}
                    onChange={(e) =>
                      setCreateIngredientVariationName(e.target.value)
                    }
                  />
                  <label
                    className="labelForm"
                    htmlFor="createIngredientVariationName"
                  >
                    Nom de la variation d'ingrédient...
                  </label>
                  {createErrors.includes("variation d'ingrédient") &&
                    createErrors && (
                      <p className="absolute top-full text-red-500">
                        {createErrors}
                      </p>
                    )}
                  {createErrors.includes("existe") && createErrors && (
                    <p className="absolute top-full text-red-500">
                      {createErrors}
                    </p>
                  )}
                </div>
                <div className=" mb-8 w-full relative flex flex-col items-center justify-center">
                  <div className="relative flex mb-4 justify-center items-center w-full px-8">
                    <input
                      onClick={() => setCreateErrors("")}
                      autoComplete="off"
                      required
                      type="text"
                      id="createIngredientVariationImage"
                      placeholder=" "
                      value={
                        createImageUrl
                          ? createImageUrl
                          : createIngredientVariationImage
                      }
                      className={`inputForm h-fit rounded-lg ${animeError(
                        "image",
                        createErrors
                      )}`}
                      ref={inputIngredientVariationUrlRef}
                      onChange={(e) =>
                        setCreateIngredientVariationImage(e.target.value)
                      }
                    />
                    <label
                      className="labelForm"
                      htmlFor="createIngredientVariationImage"
                    >
                      Url de l'image de la variation d'ingrédient...
                    </label>
                    {(createIngredientVariationImage || createImageUrl) && (
                      <button
                        title="Effacer le champs"
                        className="-ml-7 text-primary hover:text-primary-hover dark:text-primary-dark dark:hover:text-primary-dark-hover"
                      >
                        <FontAwesomeIcon
                          icon={faRotateLeft}
                          onClick={() => {
                            setCreateImageUrl("");
                            setCreateIngredientVariationImage("");
                          }}
                        />
                      </button>
                    )}
                    <div className=" ml-4 text-nowrap">
                      <Upload useUniqueFileName onUrlChange={handleUrlChange} />
                    </div>
                    {createErrors.includes("image") && createErrors && (
                      <p className="absolute top-full text-red-500">
                        {createErrors}
                      </p>
                    )}
                  </div>
                  {/* ----------------------------SEASONSELECT-------------------------------- */}
                  {seasonsDataError ? (
                    <p className="bg-red-500 p-2 rounded-lg text-light my-4 col-span-4">
                      Erreur lors du chargement des saisons
                    </p>
                  ) : seasonsDataLoading ? (
                    <div className="w-full my-16">
                      <p className=" text-center py-2 animate-pulse text-light dark:text-primary-hover">
                        Chargement des saisons...
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 ">
                        <div
                          className=" bg-primary-focus dark:bg-primary-dark-hover h-2.5 rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                  ) : (
                    <div className="relative my-4 px-8 w-full flex items-center justify-between">
                      <OptionSelect<string>
                        classError={animeError("saison", createErrors)}
                        options={seasons.map((season) => ({
                          id: Number(season.id),
                          data: season.seasonName,
                        }))}
                        onSelect={(option) =>
                          handleCreateOptionChange("season", option)
                        }
                        actualOption={selectedCreateSeason}
                        defaultOption="Sélectionner une saison"
                        getDisplayText={(data) => data}
                      />
                      <button
                        onClick={() => setSelectedCreateSeason(null)}
                        title="Réinitialiser la saison"
                        className="cursor-pointer text-primary hover:text-primary-hover dark:text-primary-dark dark:hover:text-primary-dark-hover bg-secondary dark:bg-secondary-dark hover:bg-secondary-hover dark:hover:bg-secondary-dark-hover ml-2 py-[0.6rem] px-[0.8rem] rounded-lg transition-200"
                      >
                        <FontAwesomeIcon icon={faRotateLeft} />
                      </button>
                      {createErrors.includes("saison") && createErrors && (
                        <p className="absolute left-1/2 -translate-x-1/2 top-full text-red-500">
                          {createErrors}
                        </p>
                      )}
                    </div>
                  )}
                  {/* ----------------------------INGREDIENTSELECT-------------------------------- */}
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
                    <div className="relative my-4 px-8 w-full flex items-center justify-between">
                      <OptionSelect<string>
                        classError={animeError(
                          "famille de l'ingrédient",
                          createErrors
                        )}
                        options={ingredients.map((ingredient) => ({
                          id: Number(ingredient.id),
                          data: ingredient.name,
                        }))}
                        onSelect={(option) =>
                          handleCreateOptionChange("ingredient", option)
                        }
                        actualOption={selectedCreateIngredient}
                        defaultOption="Sélectionner une famille d'ingrédient"
                        getDisplayText={(data) => data}
                      />
                      <button
                        onClick={() => setSelectedCreateIngredient(null)}
                        title="Réinitialiser la famille d'ingrédient"
                        className="cursor-pointer text-primary hover:text-primary-hover dark:text-primary-dark dark:hover:text-primary-dark-hover bg-secondary dark:bg-secondary-dark hover:bg-secondary-hover dark:hover:bg-secondary-dark-hover ml-2 py-[0.6rem] px-[0.8rem] rounded-lg transition-200"
                      >
                        <FontAwesomeIcon icon={faRotateLeft} />
                      </button>
                      {createErrors.includes("famille de l'ingrédient") &&
                        createErrors && (
                          <p className="absolute left-1/2 -translate-x-1/2 top-full text-red-500">
                            {createErrors}
                          </p>
                        )}
                    </div>
                  )}
                  {/* ----------------------------TYPESELECT-------------------------------- */}
                  {typesDataError ? (
                    <p className="bg-red-500 p-2 rounded-lg text-light my-4 col-span-4">
                      Erreur lors du chargement des types d'ingrédients
                    </p>
                  ) : typesDataLoading ? (
                    <div className="w-full my-16">
                      <p className=" text-center py-2 animate-pulse text-light dark:text-primary-hover">
                        Chargement des types d'ingrédients...
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 ">
                        <div
                          className=" bg-primary-focus dark:bg-primary-dark-hover h-2.5 rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                  ) : (
                    <div className="relative my-4 px-8 w-full flex items-center justify-between">
                      <OptionSelect<string>
                        classError={animeError("type", createErrors)}
                        options={types.map((type) => ({
                          id: Number(type.id),
                          data: type.name,
                        }))}
                        onSelect={(option) =>
                          handleCreateOptionChange("type", option)
                        }
                        actualOption={selectedCreateType}
                        defaultOption="Sélectionner un type d'ingrédient"
                        getDisplayText={(data) => data}
                      />
                      <button
                        onClick={() => setSelectedCreateType(null)}
                        title="Réinitialiser le variation d'ingrédient"
                        className="cursor-pointer text-primary hover:text-primary-hover dark:text-primary-dark dark:hover:text-primary-dark-hover bg-secondary dark:bg-secondary-dark hover:bg-secondary-hover dark:hover:bg-secondary-dark-hover ml-2 py-[0.6rem] px-[0.8rem] rounded-lg transition-200"
                      >
                        <FontAwesomeIcon icon={faRotateLeft} />
                      </button>
                      {createErrors.includes("type") && createErrors && (
                        <p className="absolute left-1/2 -translate-x-1/2 top-full text-red-500">
                          {createErrors}
                        </p>
                      )}
                    </div>
                  )}

                  {/* ----------------------------BRANDSELECT-------------------------------- */}
                  {brandsDataError ? (
                    <p className="bg-red-500 p-2 rounded-lg text-light my-4 col-span-4">
                      Erreur lors du chargement des Marques
                    </p>
                  ) : brandsDataLoading ? (
                    <div className="w-full my-16">
                      <p className=" text-center py-2 animate-pulse text-light dark:text-primary-hover">
                        Chargement des Marques...
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 ">
                        <div
                          className=" bg-primary-focus dark:bg-primary-dark-hover h-2.5 rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                  ) : (
                    <div className="relative my-4 px-8 w-full flex items-center justify-between">
                      <OptionSelect<string>
                        classError={animeError("marque", createErrors)}
                        options={brands.map((brand) => ({
                          id: Number(brand.id),
                          data: brand.name,
                        }))}
                        onSelect={(option) =>
                          handleCreateOptionChange("brand", option)
                        }
                        actualOption={selectedCreateBrand}
                        defaultOption="Sélectionner une marque"
                        getDisplayText={(data) => data}
                      />

                      <button
                        onClick={() => setSelectedCreateBrand(null)}
                        title="Réinitialiser la Marque"
                        className="cursor-pointer text-primary hover:text-primary-hover dark:text-primary-dark dark:hover:text-primary-dark-hover bg-secondary dark:bg-secondary-dark hover:bg-secondary-hover dark:hover:bg-secondary-dark-hover ml-2 py-[0.6rem] px-[0.8rem] rounded-lg transition-200"
                      >
                        <FontAwesomeIcon icon={faRotateLeft} />
                      </button>
                      {createErrors.includes("marque") && createErrors && (
                        <p className="absolute left-1/2 -translate-x-1/2 top-full text-red-500">
                          {createErrors}
                        </p>
                      )}
                    </div>
                  )}

                  {/* --------------------------------------------SHOPSSELECT-------------------------------- */}
                  {shopsDataError ? (
                    <p className="bg-red-500 p-2 rounded-lg text-light my-4 col-span-4">
                      Erreur lors du chargement des magasins
                    </p>
                  ) : shopsDataLoading ? (
                    <div className="w-full my-16">
                      <p className=" text-center py-2 animate-pulse text-light dark:text-primary-hover">
                        Chargement des magasins...
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 ">
                        <div
                          className=" bg-primary-focus dark:bg-primary-dark-hover h-2.5 rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                  ) : (
                    <div className="relative my-4 px-8 w-full flex items-center justify-between">
                      <MultiSelect
                        selectionDefaultValue="Sélectionner les magasins"
                        dataIds={createIngredientVariationShopsIds}
                        setDataIds={setCreateIngredientVariationShopsIds}
                        datas={shops.map((shop) => ({
                          id: Number(shop.id),
                          name: shop.name,
                        }))}
                      />
                      <button
                        onClick={() => setCreateIngredientVariationShopsIds([])}
                        title="Réinitialiser le ou les magasins"
                        className="cursor-pointer text-primary hover:text-primary-hover dark:text-primary-dark dark:hover:text-primary-dark-hover bg-secondary dark:bg-secondary-dark hover:bg-secondary-hover dark:hover:bg-secondary-dark-hover ml-2 py-[0.6rem] px-[0.8rem] rounded-lg transition-200"
                      >
                        <FontAwesomeIcon icon={faRotateLeft} />
                      </button>
                      {createErrors.includes("magasin") && createErrors && (
                        <p className="absolute left-1/2 -translate-x-1/2 top-full text-red-500">
                          {createErrors}
                        </p>
                      )}
                    </div>
                  )}
                  <div className="mt-16 flex flex-col items-center justify-center">
                    <button
                      type="button"
                      className="primary-button "
                      onClick={doCreate}
                    >
                      Ajouter une variation d'ingrédient
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* -------------------------------------------------------UPDATE--------------------------------------------------------------- */}
            <div className="flex flex-col items-center justify-center w-full bg-primary-hover my-8">
              <div className="w-full px-8 my-8 mx-auto mt-8 relative">
                <div
                  className={`${animeError(
                    "",
                    updateErrors
                  )} flex flex-col items-center justify-center bg-primary p-4 rounded-lg transition-200`}
                >
                  <h2 className=" my-8 font-bold text-2xl text-secondary">
                    Mettre à jour une variation d'ingrédient
                  </h2>

                  {ingredientVariation && (
                    <div className="p-4">
                      <h2 className="text-center font-bold text-xl text-secondary dark:text-secondary-dark transition-200">
                        Type d'ingrédient id {ingredientVariation?.id}
                      </h2>
                      <p className=" pb-8 text-center font-bold text-4xl text-secondary dark:text-secondary-dark transition-200">
                        {ingredientVariation.name}
                      </p>
                      {ingredientVariation.image ? (
                        <img
                          src={ingredientVariation.image || undefined}
                          alt={`Image du variation d'ingrédient ${ingredientVariation.name}`}
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
                  <div className="w-full px-8 mt-8 relative flex flex-col items-center justify-center">
                    <input
                      onClick={() => {
                        setUpdateIngredientVariationName(
                          ingredientVariation?.name ?? ""
                        );
                        setUpdateErrors("");
                        setDeleteErrors("");
                      }}
                      autoComplete="off"
                      required
                      type="text"
                      id="updateIngredientVariationName"
                      placeholder=" "
                      value={updateIngredientVariationName}
                      className={`inputForm ${animeError(
                        "",
                        updateErrors || deleteErrors
                      )} ${isOpen ? triggerClasses : "rounded-lg"}`}
                      ref={triggerRef}
                      onChange={handleSearchUpdateIngredientVariationName}
                    />
                    <label
                      className="labelForm"
                      htmlFor="updateIngredientVariationName"
                    >
                      Nom de la variation d'ingrédient...
                    </label>
                    {updateIngredientVariationName && isOpen && (
                      <ul
                        ref={dropdownRef}
                        className={`${
                          ingredientVariations.filter((ingredientVariation) =>
                            ingredientVariation.name
                              .toLowerCase()
                              .includes(
                                updateIngredientVariationName.toLowerCase()
                              )
                          ).length > 10
                            ? " h-80 overflow-y-scroll"
                            : ingredientVariations.filter(
                                (ingredientVariation) =>
                                  ingredientVariation.name
                                    .toLowerCase()
                                    .includes(
                                      updateIngredientVariationName.toLowerCase()
                                    )
                              ).length === 0
                            ? "hidden "
                            : "h-fit"
                        } ${dropdownPosition} ${dropdownClasses} bg-secondary dark:bg-secondary-dark w-12/12 inset-8 absolute z-10`}
                      >
                        <p className="px-8 py-2 text-primary dark:text-primary-dark text-xl font-bold">
                          Variations d'ingrédients
                        </p>
                        {ingredientVariations
                          .filter((ingredientVariation) =>
                            ingredientVariation.name
                              .toLowerCase()
                              .includes(
                                updateIngredientVariationName.toLowerCase()
                              )
                          )
                          .sort((a, b) => a.name.localeCompare(b.name))
                          .map((ingredientVariation) => (
                            <li
                              onClick={() =>
                                handleClickUpdateIngredientVariationList(
                                  ingredientVariation
                                )
                              }
                              key={ingredientVariation.id}
                              className="px-8 py-2 text-primary hover:text-primary-hover dark:text-primary-dark dark:hover:text-primary-dark-hover hover:bg-secondary-hover dark:hover:bg-secondary-dark-hover cursor-pointer"
                            >
                              {ingredientVariation.name}
                            </li>
                          ))}
                      </ul>
                    )}
                  </div>

                  <div className=" my-8 w-full gap-4 relative flex flex-col items-center justify-center">
                    <div className="flex justify-center items-center w-full px-8">
                      <input
                        onClick={() => {
                          setUpdateIngredientVariationImage(
                            ingredientVariation?.image ?? ""
                          );
                          setUpdateErrors("");
                          setDeleteErrors("");
                        }}
                        autoComplete="off"
                        required
                        type="text"
                        id="updateIngredientVariationImage"
                        placeholder=" "
                        value={updateIngredientVariationImage || ""}
                        className={`inputForm rounded-lg ${animeError(
                          "image",
                          updateErrors
                        )}`}
                        ref={inputIngredientVariationUrlRef}
                        onChange={(e) =>
                          setUpdateIngredientVariationImage(e.target.value)
                        }
                      />
                      <label
                        className="labelForm"
                        htmlFor="updateIngredientVariationImage"
                      >
                        Url de l'image...
                      </label>
                      {updateIngredientVariationImage && (
                        <button
                          title="Effacer le champs"
                          className="-ml-7 text-primary hover:text-primary-hover dark:text-primary-dark dark:hover:text-primary-dark-hover"
                        >
                          <FontAwesomeIcon
                            icon={faRotateLeft}
                            onClick={() => {
                              setUpdateIngredientVariationImage("");
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
                    {/* UPDATE----------------------------SEASONSELECT-------------------------------- */}
                    <div className="my-4 px-8 w-full flex items-center justify-between">
                      <OptionSelect<string>
                        options={seasons.map((season) => ({
                          id: Number(season.id),
                          data: season.seasonName,
                        }))}
                        onSelect={(option) =>
                          handleUpdateOptionChange("season", option)
                        }
                        actualOption={selectedUpdateSeason}
                        defaultOption={
                          selectedUpdateSeason
                            ? selectedUpdateSeason?.data
                            : "Sélectionner une saison"
                        }
                        getDisplayText={(data) => data}
                      />
                      <button
                        onClick={() => setSelectedUpdateSeason(null)}
                        title="Réinitialiser la saison"
                        className="cursor-pointer text-primary hover:text-primary-hover dark:text-primary-dark dark:hover:text-primary-dark-hover bg-secondary dark:bg-secondary-dark hover:bg-secondary-hover dark:hover:bg-secondary-dark-hover ml-2 py-[0.6rem] px-[0.8rem] rounded-lg transition-200"
                      >
                        <FontAwesomeIcon icon={faRotateLeft} />
                      </button>
                    </div>
                    {/* UPDATE----------------------------INGREDIENTSELECT-------------------------------- */}
                    <div className="my-2 px-8 w-full flex items-center justify-between">
                      <OptionSelect<string>
                        options={ingredients.map((ingredient) => ({
                          id: Number(ingredient.id),
                          data: ingredient.name,
                        }))}
                        onSelect={(option) =>
                          handleUpdateOptionChange("ingredient", option)
                        }
                        actualOption={selectedUpdateIngredientFamily}
                        defaultOption={
                          selectedUpdateIngredientFamily
                            ? selectedUpdateIngredientFamily?.data
                            : "Sélectionner une famille d'ingrédient"
                        }
                        getDisplayText={(data) => data}
                      />
                      <button
                        onClick={() => setSelectedUpdateIngredientFamily(null)}
                        title="Réinitialiser la famille d'ingrédient"
                        className="cursor-pointer text-primary hover:text-primary-hover dark:text-primary-dark dark:hover:text-primary-dark-hover bg-secondary dark:bg-secondary-dark hover:bg-secondary-hover dark:hover:bg-secondary-dark-hover ml-2 py-[0.6rem] px-[0.8rem] rounded-lg transition-200"
                      >
                        <FontAwesomeIcon icon={faRotateLeft} />
                      </button>
                    </div>
                    {/* UPDATE----------------------------TYPESELECT-------------------------------- */}
                    <div className="my-2 px-8 w-full flex items-center justify-between">
                      <OptionSelect<string>
                        options={types.map((type) => ({
                          id: Number(type.id),
                          data: type.name,
                        }))}
                        onSelect={(option) =>
                          handleUpdateOptionChange("type", option)
                        }
                        actualOption={selectedUpdateIngredientType}
                        defaultOption={
                          selectedUpdateIngredientType
                            ? selectedUpdateIngredientType?.data
                            : "Sélectionner un type d'ingrédient"
                        }
                        getDisplayText={(data) => data}
                      />
                      <button
                        onClick={() => setSelectedUpdateIngredientType(null)}
                        title="Réinitialiser le type d'ingrédient"
                        className="cursor-pointer text-primary hover:text-primary-hover dark:text-primary-dark dark:hover:text-primary-dark-hover bg-secondary dark:bg-secondary-dark hover:bg-secondary-hover dark:hover:bg-secondary-dark-hover ml-2 py-[0.6rem] px-[0.8rem] rounded-lg transition-200"
                      >
                        <FontAwesomeIcon icon={faRotateLeft} />
                      </button>
                    </div>
                    {/* UPDATE----------------------------BRANDSELECT-------------------------------- */}
                    <div className="my-2 px-8 w-full flex items-center justify-between">
                      <OptionSelect<string>
                        options={brands.map((brand) => ({
                          id: Number(brand.id),
                          data: brand.name,
                        }))}
                        onSelect={(option) =>
                          handleUpdateOptionChange("brand", option)
                        }
                        actualOption={selectedUpdateBrand}
                        defaultOption={
                          selectedUpdateBrand
                            ? selectedUpdateBrand?.data
                            : "Sélectionner une marque"
                        }
                        getDisplayText={(data) => data}
                      />
                      <button
                        onClick={() => setSelectedUpdateBrand(null)}
                        title="Réinitialiser la marque"
                        className="cursor-pointer text-primary hover:text-primary-hover dark:text-primary-dark dark:hover:text-primary-dark-hover bg-secondary dark:bg-secondary-dark hover:bg-secondary-hover dark:hover:bg-secondary-dark-hover ml-2 py-[0.6rem] px-[0.8rem] rounded-lg transition-200"
                      >
                        <FontAwesomeIcon icon={faRotateLeft} />
                      </button>
                    </div>
                    {/* UPDATE----------------------------SHOPSSELECT-------------------------------- */}
                    <div className="relative my-4 px-8 w-full flex items-center justify-between">
                      <MultiSelect
                        selectionDefaultValue="Sélectionner les magasins"
                        dataIds={updateIngredientVariationShopsIds}
                        setDataIds={setUpdateIngredientVariationShopsIds}
                        datas={shops.map((shop) => ({
                          id: Number(shop.id),
                          name: shop.name,
                        }))}
                      />
                      <button
                        onClick={() => setUpdateIngredientVariationShopsIds([])}
                        title="Réinitialiser le ou les magasins"
                        className="cursor-pointer text-primary hover:text-primary-hover dark:text-primary-dark dark:hover:text-primary-dark-hover bg-secondary dark:bg-secondary-dark hover:bg-secondary-hover dark:hover:bg-secondary-dark-hover ml-2 py-[0.6rem] px-[0.8rem] rounded-lg transition-200"
                      >
                        <FontAwesomeIcon icon={faRotateLeft} />
                      </button>
                      {createErrors.includes("magasin") && createErrors && (
                        <p className="absolute left-1/2 -translate-x-1/2 top-full text-red-500">
                          {createErrors}
                        </p>
                      )}
                    </div>

                    <div className="mt-4 w-full px-8 flex flex-wrap items-center justify-between">
                      <div className="mt-4 flex flex-col items-center justify-center">
                        <button
                          type="button"
                          className="primary-button "
                          onClick={doUpdate}
                        >
                          Mettre à jour une variation d'ingrédient
                        </button>
                      </div>
                      <div className="mt-4 flex flex-col items-center justify-center">
                        <button
                          type="button"
                          className="delete-button"
                          onClick={doDelete}
                        >
                          Supprimer une variation d'ingrédient
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
            {/* -----------------------------------------------------------------END UPDATE----------------------------------------------------------- */}

            <div className="flex flex-col items-center justify-center px-8">
              <h2 className="text-4xl uppercase font-bold text-center mt-8 text-secondary dark:text-secondary-dark transition-200">
                Toutes les variations ingrédients
              </h2>

              {ingredientVariationsDataError ? (
                <p className="bg-red-500 p-2 rounded-lg text-light my-4 col-span-4">
                  Erreur lors du chargement des variations d'ingrédients
                </p>
              ) : ingredientVariationsDataLoading ? (
                <div className="w-full my-16">
                  <p className=" text-center py-2 animate-pulse text-light dark:text-primary-hover">
                    Chargement des variations d'ingrédients...
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
                  {ingredientVariations
                    .slice()
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((ingredientVariation) => (
                      <div
                        key={ingredientVariation.id}
                        className={`${
                          ingredientVariation.hasIngredient === true
                            ? " bg-green-600 hover:bg-green-700"
                            : "bg-primary-focus hover:bg-primary-dark-hover"
                        } group flex flex-col justify-between items-center rounded-lg
                    shadow-xl hover:shadow-2xl  overflow-hidden cursor-pointer`}
                        onClick={() =>
                          handleClickUpdateIngredientVariationList(
                            ingredientVariation
                          )
                        }
                      >
                        <div className="h-1/2 w-full bg-light relative">
                          {ingredientVariation.hasIngredient ? (
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
                          {ingredientVariation.image ? (
                            <img
                              className="w-full h-full object-cover"
                              src={ingredientVariation.image}
                              alt={`Image de l'ingrédient ${ingredientVariation.name}`}
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
                            <p className=" text-left font-bold text-2xl text-secondary dark:text-secondary-dark">
                              {ingredientVariation.name}{" "}
                              <span className=" text-sm text-secondary-focus dark:text-secondary-dark-focus">
                                (id {ingredientVariation.id})
                              </span>
                            </p>
                            <div className="flex">
                              <p className="mb-2 font-bold text-base text-secondary-focus dark:text-secondary-dark-focus">
                                Type :&nbsp;
                              </p>
                              {ingredientVariation.type?.name ? (
                                <p className="mb-2 font-bold text-base text-secondary-focus dark:text-secondary-dark-focus">
                                  {ingredientVariation.type?.name}
                                </p>
                              ) : (
                                <p className="text-red-400 mb-2 font-bold text-base  dark:text-red-200">
                                  Non défini
                                </p>
                              )}
                            </div>
                            <div className="flex">
                              <p className="mb-2 font-bold text-base text-secondary-focus dark:text-secondary-dark-focus">
                                Famille :&nbsp;
                              </p>
                              <p className="mb-2 text-left font-bold text-base text-secondary-focus dark:text-secondary-dark-focus">
                                {ingredientVariation.ingredient?.name}
                              </p>
                            </div>
                            <div className="flex">
                              <p className="mb-2 font-bold text-base text-secondary-focus dark:text-secondary-dark-focus">
                                Saison :&nbsp;
                              </p>
                              <p className="mb-2 text-left font-bold text-base text-secondary-focus dark:text-secondary-dark-focus">
                                {ingredientVariation.season?.seasonName}
                              </p>
                            </div>
                            <div className="flex">
                              <p className="mb-2 font-bold text-base text-secondary-focus dark:text-secondary-dark-focus">
                                Marque :&nbsp;
                              </p>
                              <p className="mb-2 text-left font-bold text-base text-secondary-focus dark:text-secondary-dark-focus">
                                {ingredientVariation.brand?.name}
                              </p>
                            </div>
                          </div>
                          <div className="flex w-full justify-start">
                            {ingredientVariation.shops?.map((shop) => (
                              <div key={shop.id} className="flex">
                                <p className="mx-1 font-bold text-xs text-secondary bg-primary-hover p-1 rounded-md dark:text-secondary-dark">
                                  {shop.name}
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

export default IngredientVariationManager;
