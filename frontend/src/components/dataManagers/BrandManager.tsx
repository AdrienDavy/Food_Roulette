import { useMutation, useQuery } from "@apollo/client";
import { queryBrands } from "../../api/brand/QueryBrands";
import { queryBrand } from "../../api/brand/QueryBrand";
import { Brand } from "../../gql/graphql";
import OptionSelect, { OptionType } from "../OptionSelect";
import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { mutationCreateBrand } from "../../api/brand/CreateBrand";
import { Bounce, toast } from "react-toastify";
import { useDropdownPosition } from "../../utils/useDropdownPosition";
import { mutationUpdateBrand } from "../../api/brand/UpdateBrand";

const BrandManager = () => {
  // --------------------------------STATES--------------------------------
  const [selectedBrand, setSelectedBrand] = useState<OptionType<string> | null>(
    null
  );
  const [brandId, setBrandId] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // --------------------------------REFS--------------------------------

  const brandCreateContainerRef = useRef<HTMLDivElement>(null);
  const inputBrandNameRef = useRef<HTMLInputElement>(null);
  const inputBrandUrlRef = useRef<HTMLInputElement>(null);
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
  const [createBrandName, setCreateBrandName] = useState<string>("");
  const [createBrandImage, setCreateBrandImage] = useState<string>("");
  const [createErrors, setCreateErrors] = useState<string>("");
  // -------------------------UPDATE--------------------------------
  const [updateBrandName, setUpdateBrandName] = useState<string>("");
  const [updateBrandImage, setUpdateBrandImage] = useState<string>("");
  const [updateErrors, setUpdateErrors] = useState<string>("");

  // --------------------------------QUERY--------------------------------

  const { data: brandsDataFromQuery } = useQuery(queryBrands);
  const brands = brandsDataFromQuery?.brands || [];

  const { data: brandDataFromQuery } = useQuery(queryBrand, {
    variables: { brandId: `${brandId}` },
    fetchPolicy: "cache-and-network",
  });

  const brand = brandDataFromQuery?.brand;

  // -----------------------------MUTATIONS-----------------------------------

  const [doCreateBrand] = useMutation(mutationCreateBrand, {
    refetchQueries: [queryBrands],
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

  const [doUpdateBrand] = useMutation(mutationUpdateBrand, {
    refetchQueries: [queryBrands, queryBrand],
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

  // -----------------------------UX-----------------------------------

  const animeError = (wordToWatch: string | "", errors: string) => {
    if (errors && errors.includes(wordToWatch || "")) {
      return `border border-red-500 animate-vibrate`;
    } else {
      return `border-none`;
    }
  };

  // -----------------------------FUNCTIONS-----------------------------------

  const handleBrandChange = (option: OptionType<string>) => {
    setSelectedBrand(option);
    setIsOpen(isOpen);
    console.log(isOpen);
  };

  // -----------------------------CREATE--------------------------
  const validateCreateForm = () => {
    if (!createBrandName) {
      setCreateErrors("Le nom de la marque est requis.");
      return;
    }
    if (
      createBrandImage &&
      !createBrandImage.match(
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
      const { data } = await doCreateBrand({
        variables: {
          data: {
            name: createBrandName,
            image: createBrandImage || undefined, // Assurez-vous de définir l'image si nécessaire
          },
        },
      });
      if (data?.createBrand) {
        toast.success(
          `Marque ${data?.createBrand.name} créée avec succès ! 🦄`,
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
        setCreateBrandName("");
        setCreateBrandImage("");
      }

      return data;
    } catch (err) {
      console.error(err);
    }
  }
  // -----------------------------UPDATE--------------------------
  const validateUpdateForm = () => {
    if (!updateBrandName) {
      setUpdateErrors("Le nom de la marque est requis.");
      return;
    }
    if (
      updateBrandImage &&
      !updateBrandImage.match(
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
    if (!brandId) {
      setUpdateErrors("Veuillez sélectionner une marque.");
      return;
    }
    if (!validateUpdateForm()) {
      return;
    }

    if (updateBrandName === brand?.name) {
      setUpdateBrandName(brand?.name);
    }
    if (updateBrandImage === brand?.image) {
      setUpdateBrandImage(brand?.image || "");
    }

    try {
      const { data } = await doUpdateBrand({
        variables: {
          id: `${brandId}`,
          data: {
            name: updateBrandName,
            image: updateBrandImage || undefined, // Assurez-vous de définir l'image si nécessaire
          },
        },
      });
      if (data?.updateBrand) {
        toast.success(
          `Marque ${data?.updateBrand.name} modifiée avec succès ! 🦄`,
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
      setUpdateBrandName(updateBrandName);
      setUpdateBrandImage(updateBrandImage);
      setIsOpen(false);

      return data?.updateBrand;
    } catch (err) {
      console.error(err);
    }
  }

  const handleClickBrandList = (id: number) => {
    setBrandId(Number(id));
    setIsOpen(!isOpen);
    setUpdateErrors("");
    setUpdateBrandName("");
    setUpdateBrandImage("");
  };

  const handleSearchBrand = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateBrandName(e.target.value);
    setIsOpen(e.target.value.trim() !== ""); // Ouvre la liste si la recherche contient du texte
  };

  return (
    <section className="flex flex-col items-center justify-center">
      <div className="h-[800px]"></div>
      <h1 className=" mb-4 text-center font-bold text-4xl text-secondary dark:text-secondary-dark transition-200">
        Gestionnaire de marque
      </h1>
      <h2 className=" mb-4 text-center font-bold text-2xl text-secondary dark:text-secondary-dark transition-200">
        Marques
      </h2>
      <div className="mb-4  w-80 flex items-center justify-between">
        <OptionSelect<string>
          options={brands.map((brand: Brand) => ({
            id: Number(brand.id),
            data: brand.name,
          }))}
          onSelect={handleBrandChange}
          actualOption={selectedBrand}
          defaultOption="Sélectionner une marque"
          getDisplayText={(data) => data}
        />
        <button
          onClick={() => setSelectedBrand(null)}
          title="Réinitialiser la marque"
          className="cursor-pointer text-primary hover:text-primary-hover dark:text-primary-dark dark:hover:text-primary-dark-hover bg-secondary dark:bg-secondary-dark hover:bg-secondary-hover dark:hover:bg-secondary-dark-hover ml-2 py-[0.4rem] px-[0.6rem] rounded-lg transition-200"
        >
          <FontAwesomeIcon icon={faRotateLeft} />
        </button>
      </div>

      <div
        ref={brandCreateContainerRef}
        className={`${animeError(
          "",
          createErrors
        )} flex flex-col items-center justify-center bg-primary-hover p-8 rounded-lg m-8 transition-200`}
      >
        <h2 className=" font-bold text-2xl text-secondary">Créer une marque</h2>
        <div className=" mt-8 relative flex flex-col items-center justify-center">
          <input
            autoComplete="off"
            required
            type="text"
            id="createBrandName"
            placeholder=" "
            value={createBrandName}
            className={`inputForm rounded-lg ${animeError(
              "nom",
              createErrors
            )}`}
            ref={inputBrandNameRef}
            onChange={(e) => setCreateBrandName(e.target.value)}
          />
          <label className="labelForm" htmlFor="createBrandName">
            Nom de la marque...
          </label>
        </div>
        <div className="mt-8 relative flex flex-col items-center justify-center">
          <input
            autoComplete="off"
            required
            type="text"
            id="createBrandImage"
            placeholder=" "
            value={createBrandImage}
            className={`inputForm rounded-lg ${animeError(
              "image",
              createErrors
            )}`}
            ref={inputBrandUrlRef}
            onChange={(e) => setCreateBrandImage(e.target.value)}
          />
          <label className="labelForm" htmlFor="createBrandImage">
            Url de l'image de la marque...
          </label>
          <div className="mt-4 flex flex-col items-center justify-center">
            <button
              type="button"
              className="primary-button "
              onClick={doCreate}
            >
              Créer ma Marque
            </button>
            {createErrors && <p className=" text-red-500">{createErrors}</p>}
          </div>
        </div>
      </div>
      <div
        className={`flex flex-col items-center justify-center bg-primary-hover p-8 rounded-lg m-8`}
      >
        <h2 className=" font-bold text-2xl text-secondary">
          Mettre à jour une marque
        </h2>
        <div className="w-96 mx-auto mt-8 relative">
          <div
            // ref={brandUpdateContainerRef}
            className={`${animeError(
              "",
              updateErrors
            )} flex flex-col items-center justify-center bg-primary-hover rounded-lg transition-200`}
          >
            <h2 className=" font-bold text-2xl text-secondary">
              Modifier une marque
            </h2>

            <h2 className="text-center font-bold text-2xl text-secondary dark:text-secondary-dark transition-200">
              Marque id {brand?.id}
            </h2>
            {brand && (
              <div>
                <p className=" pb-8 text-center font-bold text-4xl text-secondary dark:text-secondary-dark transition-200">
                  {brand.name}
                </p>
                {brand.image ? (
                  <img
                    src={brand.image || undefined}
                    alt={`Logo de la marque ${brand.name}`}
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
                onClick={() => setUpdateBrandName(brand?.name ?? "")}
                autoComplete="off"
                required
                type="text"
                id="updateBrandName"
                placeholder=" "
                value={updateBrandName}
                className={`inputForm ${animeError("nom", updateErrors)} ${
                  isOpen ? triggerClasses : "rounded-lg"
                }`}
                ref={triggerRef}
                onChange={handleSearchBrand}
              />
              <label className="labelForm" htmlFor="updateBrandName">
                Nom de la marque...
              </label>
              {updateBrandName && isOpen && (
                <ul
                  ref={dropdownRef}
                  className={`${
                    brands.filter((brand) =>
                      brand.name
                        .toLowerCase()
                        .includes(updateBrandName.toLowerCase())
                    ).length > 10
                      ? " h-80 overflow-y-scroll"
                      : brands.filter((brand) =>
                          brand.name
                            .toLowerCase()
                            .includes(updateBrandName.toLowerCase())
                        ).length === 0
                      ? "hidden "
                      : "h-fit"
                  } ${dropdownPosition} ${dropdownClasses} bg-secondary dark:bg-secondary-dark w-full absolute z-10`}
                >
                  <p className="px-4 py-2 text-primary dark:text-primary-dark text-xl font-bold">
                    Marques
                  </p>
                  {brands
                    .filter((brand) =>
                      brand.name
                        .toLowerCase()
                        .includes(updateBrandName.toLowerCase())
                    )
                    .map((brand) => (
                      <li
                        onClick={() => handleClickBrandList(Number(brand.id))}
                        key={brand.id}
                        className="px-4 py-2 text-primary hover:text-primary-hover dark:text-primary-dark dark:hover:text-primary-dark-hover hover:bg-secondary-hover dark:hover:bg-secondary-dark-hover cursor-pointer"
                      >
                        {brand.name}
                      </li>
                    ))}
                </ul>
              )}
            </div>
            <div className="mt-8 relative flex flex-col items-center justify-center">
              <input
                onClick={() => setUpdateBrandImage(brand?.image ?? "")}
                autoComplete="off"
                required
                type="text"
                id="updateBrandImage"
                placeholder=" "
                value={updateBrandImage}
                className={`inputForm rounded-lg ${animeError(
                  "image",
                  updateErrors
                )}`}
                ref={inputBrandUrlRef}
                onChange={(e) => setUpdateBrandImage(e.target.value)}
              />
              <label className="labelForm" htmlFor="updateBrandImage">
                Url de l'image...
              </label>
              <div className="mt-4 flex flex-col items-center justify-center">
                <button
                  type="button"
                  className="primary-button "
                  onClick={doUpdate}
                >
                  Modifier ma Marque
                </button>
                {updateErrors && (
                  <p className=" text-red-500">{updateErrors}</p>
                )}
              </div>
            </div>
          </div>
          <div className="h-[800px] bg-primary"></div>
        </div>
      </div>
    </section>
  );
};

export default BrandManager;
