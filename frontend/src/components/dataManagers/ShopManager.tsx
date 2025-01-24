import { useMutation, useQuery } from "@apollo/client";
import { queryShops } from "../../api/shop/QueryShops";
import { queryShop } from "../../api/shop/QueryShop";
import { Shop } from "../../gql/graphql";
import OptionSelect, { OptionType } from "../OptionSelect";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleDown,
  faRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import { mutationCreateShop } from "../../api/shop/CreateShop";
import { Bounce, toast } from "react-toastify";
import { useDropdownPosition } from "../../utils/useDropdownPosition";
import { mutationUpdateShop } from "../../api/shop/UpdateShop";
import { mutationDeleteShop } from "../../api/shop/DeleteShop";
import Upload from "../Upload";

const ShopManager = () => {
  // --------------------------------STATES--------------------------------
  const [selectedShop, setSelectedShop] = useState<OptionType<string> | null>(
    null
  );
  const [shopId, setShopId] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [progress, setProgress] = useState(0);

  const [createImageUrl, setCreateImageUrl] = useState("");
  const [updateImageUrl, setUpdateImageUrl] = useState("");

  const [isManagerOpen, setIsManagerOpen] = useState<boolean>(false);

  // --------------------------------REFS--------------------------------

  const shopCreateContainerRef = useRef<HTMLDivElement>(null);
  const inputShopNameRef = useRef<HTMLInputElement>(null);
  const inputShopUrlRef = useRef<HTMLInputElement>(null);
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
  const [createShopName, setCreateShopName] = useState<string>("");
  const [createShopImage, setCreateShopImage] = useState<string>("");
  const [createErrors, setCreateErrors] = useState<string>("");
  // -------------------------UPDATE--------------------------------
  const [updateShopName, setUpdateShopName] = useState<string>("");
  const [updateShopImage, setUpdateShopImage] = useState<string>("");
  const [updateErrors, setUpdateErrors] = useState<string>("");
  // -------------------------UPDATE--------------------------------
  const [deleteErrors, setDeleteErrors] = useState<string>("");

  // --------------------------------QUERY--------------------------------

  const {
    data: shopsDataFromQuery,
    error: shopsDataError,
    loading: shopsDataLoading,
  } = useQuery(queryShops);
  const shops = shopsDataFromQuery?.shops || [];

  const { data: shopDataFromQuery } = useQuery(queryShop, {
    variables: { shopId: `${shopId}` },
    fetchPolicy: "cache-and-network",
  });

  const shop = shopDataFromQuery?.shop;

  // -----------------------------MUTATIONS-----------------------------------

  const [doCreateShop] = useMutation(mutationCreateShop, {
    refetchQueries: [queryShops],
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

  const [doUpdateShop] = useMutation(mutationUpdateShop, {
    refetchQueries: [queryShops, queryShop],
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

  const [doDeleteShop] = useMutation(mutationDeleteShop, {
    refetchQueries: [queryShops, queryShop],
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
    if (shopsDataLoading) {
      const interval = setInterval(() => {
        setProgress((prev) => (prev < 80 ? prev + 5 : prev));
      }, 100);
      return () => clearInterval(interval);
    } else if (shopsDataFromQuery) {
      setProgress(100);
      setTimeout(() => setProgress(0), 500); // Réinitialiser la barre après le chargement
    }
  }, [shopsDataLoading, shopsDataFromQuery]);

  // -----------------------------FUNCTIONS-----------------------------------

  // -----------------------------CREATE--------------------------
  const validateCreateForm = () => {
    if (!createShopName) {
      setCreateErrors("Le nom de la supermarché est requis.");
      return;
    }
    if (
      createShopImage &&
      !createShopImage.match(
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
      const { data } = await doCreateShop({
        variables: {
          data: {
            name: createShopName,
            image: createShopImage || createImageUrl || undefined, // Assurez-vous de définir l'image si nécessaire
          },
        },
      });
      if (data?.createShop) {
        toast.success(
          `Supermarché ${data?.createShop.name} créée avec succès ! 🦄`,
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
        setCreateShopName("");
        setCreateShopImage("");
        setCreateImageUrl("");
      }
      console.log(" Shop created successfully:", data);

      return data;
    } catch (err) {
      console.error(err);
    }
  }

  // -----------------------------UPDATE--------------------------

  const validateUpdateForm = () => {
    if (!updateShopName) {
      setUpdateErrors("Le nom de la supermarché est requis.");
      return;
    }
    if (
      updateShopImage &&
      !updateShopImage.match(
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
    if (!shopId) {
      setUpdateErrors("Veuillez sélectionner un supermarché.");
      return;
    }
    if (!validateUpdateForm()) {
      return;
    }

    if (updateShopName === shop?.name) {
      setUpdateShopName(shop?.name);
    }
    if (updateShopImage === shop?.image) {
      setUpdateShopImage(shop?.image || "");
    }

    try {
      const { data } = await doUpdateShop({
        variables: {
          updateShopId: `${shopId}`,
          data: {
            name: updateShopName,
            image: updateShopImage || updateImageUrl || undefined, // Assurez-vous de définir l'image si nécessaire
          },
        },
      });
      if (data?.updateShop) {
        toast.success(
          `Supermarché ${data?.updateShop.name} modifiée avec succès ! 🦄`,
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
      setUpdateShopName(updateShopName);
      setUpdateShopImage(updateShopImage);
      setIsOpen(false);

      return data?.updateShop;
    } catch (err) {
      console.error(err);
    }
  }

  // -----------------------------DELETE--------------------------

  const validateDeleteForm = () => {
    if (!updateShopName) {
      setDeleteErrors("Le nom de la supermarché est requis.");
      return;
    }
    setDeleteErrors("");
    return true;
  };

  async function doDelete() {
    if (!shopId) {
      setDeleteErrors("Veuillez sélectionner un supermarché.");
      return;
    }
    if (!validateDeleteForm()) {
      return;
    }

    try {
      const { data } = await doDeleteShop({
        variables: {
          id: `${shopId}`,
        },
      });
      if (data?.deleteShop) {
        toast.success(
          `Supermarché ${data?.deleteShop.name} supprimée avec succès ! 🦄`,
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
      setUpdateShopName("");
      setUpdateShopImage("");
      setIsOpen(false);

      return data?.deleteShop;
    } catch (err) {
      console.error(err);
    }
  }

  // -----------------------------HANDLES--------------------------

  const handleShopChange = (option: OptionType<string>) => {
    setSelectedShop(option);
    setIsOpen(isOpen);
    console.log(isOpen);
  };

  const handleClickShopList = (id: number) => {
    setShopId(Number(id));
    setUpdateShopName("");
    setUpdateShopImage("");
    setIsOpen(!isOpen);
    setUpdateErrors("");
  };

  const handleSearchShop = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateShopName(e.target.value);
    setIsOpen(e.target.value.trim() !== ""); // Ouvre la liste si la recherche contient du texte
  };

  const handleUrlChange = (url: string) => {
    setCreateImageUrl(url); // Stocke l'URL pour utilisation
  };

  interface ChosenShop {
    id: string;
    name: string;
    image?: string | null;
  }

  const handleClickChosenShop = (chosenShop: ChosenShop) => {
    setShopId(Number(chosenShop.id));
    setUpdateShopName(chosenShop.name);
    setUpdateShopImage(chosenShop.image || "");
  };

  return (
    <>
      <section className="flex flex-col items-center justify-center bg-primary-hover mb-8 rounded-lg max-w-5xl mx-auto transition-200 overflow-hidden shadow-2xl">
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
            id="shops"
            className="w-full text-center font-bold text-4xl text-secondary dark:text-secondary-dark transition-200"
          >
            Gestionnaire de Supermarchés
          </h1>
        </div>
        {isManagerOpen && (
          <div className="flex flex-col p-8 items-center justify-center rounded-lg">
            <h2 className=" mb-4 text-center font-bold text-2xl text-secondary dark:text-secondary-dark transition-200">
              Supermarchés
            </h2>
            {shopsDataError && (
              <p className="bg-red-500 p-2 rounded-lg text-light my-4">
                Erreur lors du chargement des supermarchés
              </p>
            )}
            <div className="mb-4 w-full flex items-center justify-between">
              <OptionSelect<string>
                options={shops.map((shop: Shop) => ({
                  id: Number(shop.id),
                  data: shop.name,
                }))}
                onSelect={handleShopChange}
                actualOption={selectedShop}
                defaultOption="Sélectionner un supermarché"
                getDisplayText={(data) => data}
              />
              <button
                onClick={() => setSelectedShop(null)}
                title="Réinitialiser la supermarché"
                className="cursor-pointer text-primary hover:text-primary-hover dark:text-primary-dark dark:hover:text-primary-dark-hover bg-secondary dark:bg-secondary-dark hover:bg-secondary-hover dark:hover:bg-secondary-dark-hover ml-2 py-[0.4rem] px-[0.6rem] rounded-lg transition-200"
              >
                <FontAwesomeIcon icon={faRotateLeft} />
              </button>
            </div>

            <div
              ref={shopCreateContainerRef}
              className={`${animeError(
                "",
                createErrors
              )} flex flex-col items-center justify-center w-full bg-primary p-8 rounded-lg m-8 transition-200`}
            >
              <h2 className=" font-bold text-2xl text-secondary">
                Ajouter un supermarché
              </h2>
              <div className=" mt-8 w-full px-8 relative flex flex-col items-center justify-center">
                <input
                  onClick={() => setCreateErrors("")}
                  autoComplete="off"
                  required
                  type="text"
                  id="createShopName"
                  placeholder=" "
                  value={createShopName}
                  className={`inputForm rounded-lg ${animeError(
                    "nom",
                    createErrors
                  )}`}
                  ref={inputShopNameRef}
                  onChange={(e) => setCreateShopName(e.target.value)}
                />
                <label className="labelForm" htmlFor="createShopName">
                  Nom de la supermarché...
                </label>
              </div>
              <div className="mt-8 w-full relative flex flex-col items-center justify-center">
                <div className="flex w-full justify-center items-center  px-8">
                  <input
                    onClick={() => setCreateErrors("")}
                    autoComplete="off"
                    required
                    type="text"
                    id="createShopImage"
                    placeholder=" "
                    value={createImageUrl ? createImageUrl : createShopImage}
                    className={`inputForm h-fit rounded-lg ${animeError(
                      "image",
                      createErrors
                    )}`}
                    ref={inputShopUrlRef}
                    onChange={(e) => setCreateShopImage(e.target.value)}
                  />
                  <label className="labelForm" htmlFor="createShopImage">
                    Url de l'image de la supermarché...
                  </label>
                  {(createShopImage || createImageUrl) && (
                    <button
                      title="Effacer le champs"
                      className="-ml-7 text-primary hover:text-primary-hover dark:text-primary-dark dark:hover:text-primary-dark-hover"
                    >
                      <FontAwesomeIcon
                        icon={faRotateLeft}
                        onClick={() => {
                          setCreateImageUrl("");
                          setCreateShopImage("");
                        }}
                      />
                    </button>
                  )}
                  <div className="ml-4 text-nowrap flex flex-col items-center justify-center">
                    <Upload useUniqueFileName onUrlChange={handleUrlChange} />
                  </div>
                </div>
                <div className="mt-16 flex flex-col items-center justify-center">
                  <button
                    type="button"
                    className="primary-button "
                    onClick={doCreate}
                  >
                    Ajouter ma Supermarché
                  </button>
                  {createErrors && (
                    <p className="relative my-4 text-red-500">{createErrors}</p>
                  )}
                </div>
              </div>
            </div>
            <div
              className={`flex flex-col items-center justify-center bg-primary w-full p-8 rounded-lg m-8`}
            >
              <h2 className=" font-bold text-2xl text-secondary">
                Mettre à jour un supermarché
              </h2>
              <div className="w-full mx-auto mt-8 relative">
                <div
                  className={`${animeError(
                    "",
                    updateErrors
                  )} flex flex-col items-center justify-center bg-primary-hover p-4 rounded-lg transition-200`}
                >
                  <h2 className=" font-bold text-2xl text-secondary">
                    Modifier un supermarché
                  </h2>

                  {shop && (
                    <div className="p-4">
                      <h2 className="text-center font-bold text-2xl text-secondary dark:text-secondary-dark transition-200">
                        Supermarché id {shop?.id}
                      </h2>
                      <p className=" pb-8 text-center font-bold text-4xl text-secondary dark:text-secondary-dark transition-200">
                        {shop.name}
                      </p>
                      {shop.image ? (
                        <img
                          src={shop.image || undefined}
                          alt={`Logo de la supermarché ${shop.name}`}
                          className="w-full h-64 object-contain rounded-lg"
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
                        setUpdateShopName(shop?.name ?? "");
                        setUpdateErrors("");
                        setDeleteErrors("");
                      }}
                      autoComplete="off"
                      required
                      type="text"
                      id="updateShopName"
                      placeholder=" "
                      value={updateShopName}
                      className={`inputForm ${animeError(
                        "",
                        updateErrors || deleteErrors
                      )} ${isOpen ? triggerClasses : "rounded-lg"}`}
                      ref={triggerRef}
                      onChange={handleSearchShop}
                    />
                    <label className="labelForm" htmlFor="updateShopName">
                      Nom de la supermarché...
                    </label>
                    {updateShopName && isOpen && (
                      <ul
                        ref={dropdownRef}
                        className={`${
                          shops.filter((shop) =>
                            shop.name
                              .toLowerCase()
                              .includes(updateShopName.toLowerCase())
                          ).length > 10
                            ? " h-80 overflow-y-scroll"
                            : shops.filter((shop) =>
                                shop.name
                                  .toLowerCase()
                                  .includes(updateShopName.toLowerCase())
                              ).length === 0
                            ? "hidden "
                            : "h-fit"
                        } ${dropdownPosition} ${dropdownClasses} bg-secondary dark:bg-secondary-dark w-12/12 inset-8 absolute z-10`}
                      >
                        <p className="px-4 py-2 text-primary dark:text-primary-dark text-xl font-bold">
                          Supermarchés
                        </p>
                        {shops
                          .filter((shop) =>
                            shop.name
                              .toLowerCase()
                              .includes(updateShopName.toLowerCase())
                          )
                          .map((shop) => (
                            <li
                              onClick={() =>
                                handleClickShopList(Number(shop.id))
                              }
                              key={shop.id}
                              className="px-4 py-2 text-primary hover:text-primary-hover dark:text-primary-dark dark:hover:text-primary-dark-hover hover:bg-secondary-hover dark:hover:bg-secondary-dark-hover cursor-pointer"
                            >
                              {shop.name}
                            </li>
                          ))}
                      </ul>
                    )}
                  </div>
                  <div className=" w-full mt-8 relative flex flex-col items-center justify-center">
                    <div className="flex justify-center items-center w-full px-8">
                      <input
                        disabled={!shopId}
                        onClick={() => {
                          setUpdateShopImage(shop?.image ?? "");
                          setUpdateErrors("");
                          setDeleteErrors("");
                        }}
                        autoComplete="off"
                        required
                        type="text"
                        id="updateShopImage"
                        placeholder=" "
                        value={
                          updateImageUrl
                            ? updateImageUrl
                            : updateShopImage || ""
                        }
                        className={`inputForm h-fit rounded-lg ${animeError(
                          "image",
                          updateErrors
                        )} disabled:bg-slate-400 disabled:text-gray-100 disabled:cursor-not-allowed`}
                        title={`${
                          shopId
                            ? "Modifier l'image"
                            : "Sélectionnez un supermarché pour modifier l'image"
                        }`}
                        ref={inputShopUrlRef}
                        onChange={(e) => setUpdateShopImage(e.target.value)}
                      />
                      <label className="labelForm" htmlFor="updateShopImage ">
                        Url de l'image...
                      </label>
                      {(updateShopImage || updateImageUrl) && (
                        <button
                          title="Effacer le champs"
                          className="-ml-7 text-primary hover:text-primary-hover dark:text-primary-dark dark:hover:text-primary-dark-hover"
                        >
                          <FontAwesomeIcon
                            icon={faRotateLeft}
                            onClick={() => {
                              setUpdateImageUrl("");
                              setUpdateShopImage("");
                            }}
                          />
                        </button>
                      )}
                      <div className="ml-4 text-nowrap flex flex-col items-center justify-center">
                        <Upload
                          disabled={!shopId}
                          useUniqueFileName
                          onUrlChange={handleUrlChange}
                        />
                      </div>
                    </div>
                    <div className="mt-8 flex items-center w-full px-8 justify-between">
                      <button
                        type="button"
                        className="primary-button "
                        onClick={doUpdate}
                      >
                        Mettre à jour un supermarché
                      </button>
                      {updateErrors && (
                        <p className="relative text-red-500">{updateErrors}</p>
                      )}

                      <button
                        type="button"
                        className="delete-button "
                        onClick={doDelete}
                      >
                        Supprimer un Supermarché
                      </button>
                    </div>
                    <div className="errors my-4">
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
            </div>

            <div className="flex flex-col items-center justify-center">
              <h2 className="text-4xl uppercase font-bold text-center mt-8 text-secondary dark:text-secondary-dark transition-200">
                Tous les Supermarchés
              </h2>

              {shopsDataError ? (
                <p className="bg-red-500 p-2 rounded-lg text-light my-4 col-span-4">
                  Erreur lors du chargement des supermarchés
                </p>
              ) : shopsDataLoading ? (
                <div className="w-full my-16">
                  <p className=" text-center py-2 animate-pulse text-light dark:text-primary-hover">
                    Chargement des supermarchés...
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 ">
                    <div
                      className=" bg-primary-focus dark:bg-primary-dark-hover h-2.5 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              ) : (
                <div className="grid gap-4 grid-cols-2 md:grid-cols-4  items-center justify-center mt-8 transition-200">
                  {shops
                    .slice()
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((shop: Shop) => (
                      <div
                        key={shop.id}
                        className="flex flex-col justify-between items-center h-60 rounded-lg hover:bg-primary-dark-hover shadow-xl hover:shadow-2xl bg-primary-focus overflow-hidden cursor-pointer"
                        onClick={() => handleClickChosenShop(shop)}
                      >
                        <div className="h-1/2 p-4 w-full bg-light">
                          {shop.image ? (
                            <img
                              className="w-full h-full object-contain"
                              src={shop.image}
                              alt={`Logo de la supermarché ${shop.name}`}
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
                            Supermarché id {shop.id}
                          </h2>
                          <p className=" pb-8 text-center font-bold text-2xl text-secondary dark:text-secondary-dark transition-200">
                            {shop.name}
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

export default ShopManager;
