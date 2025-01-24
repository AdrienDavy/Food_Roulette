import { useMutation, useQuery } from "@apollo/client";
import { queryUnits } from "../../api/unit/QueryUnits";
import { queryUnit } from "../../api/unit/QueryUnit";
import { Unit } from "../../gql/graphql";
import OptionSelect, { OptionType } from "../OptionSelect";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleDown,
  faRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import { mutationCreateUnit } from "../../api/unit/CreateUnit";
import { Bounce, toast } from "react-toastify";
import { useDropdownPosition } from "../../utils/useDropdownPosition";
import { mutationUpdateUnit } from "../../api/unit/UpdateUnit";
import { mutationDeleteUnit } from "../../api/unit/DeleteUnit";

const UnitManager = () => {
  // --------------------------------STATES--------------------------------
  const [selectedUnit, setSelectedUnit] = useState<OptionType<string> | null>(
    null
  );
  const [unitId, setUnitId] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [progress, setProgress] = useState(0);

  const [isManagerOpen, setIsManagerOpen] = useState<boolean>(false);

  // --------------------------------REFS--------------------------------

  const unitCreateContainerRef = useRef<HTMLDivElement>(null);
  const inputUnitNameRef = useRef<HTMLInputElement>(null);
  const inputUnitUrlRef = useRef<HTMLInputElement>(null);
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
  const [createUnitName, setCreateUnitName] = useState<string>("");
  const [createUnitAbbreviation, setCreateUnitAbbreviation] =
    useState<string>("");
  const [createErrors, setCreateErrors] = useState<string>("");
  // -------------------------UPDATE--------------------------------
  const [updateUnitName, setUpdateUnitName] = useState<string>("");
  const [updateUnitAbbreviation, setUpdateUnitAbbreviation] =
    useState<string>("");
  const [updateErrors, setUpdateErrors] = useState<string>("");
  // -------------------------UPDATE--------------------------------
  const [deleteErrors, setDeleteErrors] = useState<string>("");

  // --------------------------------QUERY--------------------------------

  const {
    data: unitsDataFromQuery,
    error: unitsDataError,
    loading: unitsDataLoading,
  } = useQuery(queryUnits);
  const units = unitsDataFromQuery?.units || [];

  const { data: unitDataFromQuery } = useQuery(queryUnit, {
    variables: { unitId: `${unitId}` },
    fetchPolicy: "cache-and-network",
  });

  const unit = unitDataFromQuery?.unit;

  // -----------------------------MUTATIONS-----------------------------------

  const [doCreateUnit] = useMutation(mutationCreateUnit, {
    refetchQueries: [queryUnits],
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

  const [doUpdateUnit] = useMutation(mutationUpdateUnit, {
    refetchQueries: [queryUnits, queryUnit],
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

  const [doDeleteUnit] = useMutation(mutationDeleteUnit, {
    refetchQueries: [queryUnits, queryUnit],
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
    if (unitsDataLoading) {
      const interval = setInterval(() => {
        setProgress((prev) => (prev < 80 ? prev + 5 : prev));
      }, 100);
      return () => clearInterval(interval);
    } else if (unitsDataFromQuery) {
      setProgress(100);
      setTimeout(() => setProgress(0), 500); // Réinitialiser la barre après le chargement
    }
  }, [unitsDataLoading, unitsDataFromQuery]);

  // -----------------------------FUNCTIONS-----------------------------------

  // -----------------------------CREATE--------------------------
  const validateCreateForm = () => {
    if (!createUnitName) {
      setCreateErrors("Le nom de l'unité est requis.");
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
      const { data } = await doCreateUnit({
        variables: {
          data: {
            name: createUnitName,
            abbreviation: createUnitAbbreviation, // Assurez-vous de définir l'abbreviation si nécessaire
          },
        },
      });
      if (data?.createUnit) {
        toast.success(`Unité ${data?.createUnit.name} créée avec succès ! 🦄`, {
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
        });
        setCreateUnitName("");
        setCreateUnitAbbreviation("");
      }
      console.log(" Unit created successfully:", data);

      return data;
    } catch (err) {
      console.error(err);
    }
  }

  // -----------------------------UPDATE--------------------------

  const validateUpdateForm = () => {
    if (!updateUnitName) {
      setUpdateErrors("Le nom de l'unité est requis.");
      return;
    }

    setUpdateErrors("");
    return true;
  };

  async function doUpdate() {
    if (!unitId) {
      setUpdateErrors("Veuillez sélectionner une unité.");
      return;
    }
    if (!validateUpdateForm()) {
      return;
    }

    if (updateUnitName === unit?.name) {
      setUpdateUnitName(unit?.name);
    }
    if (updateUnitAbbreviation === unit?.abbreviation) {
      setUpdateUnitAbbreviation(unit?.abbreviation || "");
    }

    try {
      const { data } = await doUpdateUnit({
        variables: {
          updateUnitId: `${unitId}`,
          data: {
            name: updateUnitName,
            abbreviation: updateUnitAbbreviation, // Assurez-vous de définir l'abbreviation si nécessaire
          },
        },
      });
      if (data?.updateUnit) {
        toast.success(
          `Unité ${data?.updateUnit.name} modifiée avec succès ! 🦄`,
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
      setUpdateUnitName(updateUnitName);
      setUpdateUnitAbbreviation(updateUnitAbbreviation);
      setIsOpen(false);

      return data?.updateUnit;
    } catch (err) {
      console.error(err);
    }
  }

  // -----------------------------DELETE--------------------------

  const validateDeleteForm = () => {
    if (!updateUnitName) {
      setDeleteErrors("Le nom de l'unité est requis.");
      return;
    }
    setDeleteErrors("");
    return true;
  };

  async function doDelete() {
    if (!unitId) {
      setDeleteErrors("Veuillez sélectionner un unité.");
      return;
    }
    if (!validateDeleteForm()) {
      return;
    }

    try {
      const { data } = await doDeleteUnit({
        variables: {
          id: `${unitId}`,
        },
      });
      if (data?.deleteUnit) {
        toast.success(
          `Unité ${data?.deleteUnit.name} supprimée avec succès ! 🦄`,
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
      setUpdateUnitName("");
      setUpdateUnitAbbreviation("");
      setIsOpen(false);

      return data?.deleteUnit;
    } catch (err) {
      console.error(err);
    }
  }

  // -----------------------------HANDLES--------------------------

  const handleUnitChange = (option: OptionType<string>) => {
    setSelectedUnit(option);
    setIsOpen(isOpen);
    console.log(isOpen);
  };

  const handleClickUnitList = (id: number) => {
    setUnitId(Number(id));
    setUpdateUnitName("");
    setUpdateUnitAbbreviation("");
    setIsOpen(!isOpen);
    setUpdateErrors("");
  };

  const handleSearchUnit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateUnitName(e.target.value);
    setIsOpen(e.target.value.trim() !== ""); // Ouvre la liste si la recherche contient du texte
  };

  interface ChosenUnit {
    id: string;
    name: string;
    abbreviation?: string | null;
  }

  const handleClickChosenUnit = (chosenUnit: ChosenUnit) => {
    setUnitId(Number(chosenUnit.id));
    setUpdateUnitName(chosenUnit.name);
    setUpdateUnitAbbreviation(chosenUnit.abbreviation || "");
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
            id="units"
            className="w-full text-center font-bold text-4xl text-secondary dark:text-secondary-dark transition-200"
          >
            Gestionnaire de Unités
          </h1>
        </div>
        {!isManagerOpen && (
          <div className="flex flex-col p-8 items-center justify-center rounded-lg">
            <h2 className=" mb-4 text-center font-bold text-2xl text-secondary dark:text-secondary-dark transition-200">
              Unités
            </h2>
            {unitsDataError && (
              <p className="bg-red-500 p-2 rounded-lg text-light my-4">
                Erreur lors du chargement des unités
              </p>
            )}
            <div className="mb-4 w-full flex items-center justify-between">
              <OptionSelect<string>
                options={units.map((unit: Unit) => ({
                  id: Number(unit.id),
                  data: unit.name,
                }))}
                onSelect={handleUnitChange}
                actualOption={selectedUnit}
                defaultOption="Sélectionner un unité"
                getDisplayText={(data) => data}
              />
              <button
                onClick={() => setSelectedUnit(null)}
                title="Réinitialiser la unité"
                className="cursor-pointer text-primary hover:text-primary-hover dark:text-primary-dark dark:hover:text-primary-dark-hover bg-secondary dark:bg-secondary-dark hover:bg-secondary-hover dark:hover:bg-secondary-dark-hover ml-2 py-[0.4rem] px-[0.6rem] rounded-lg transition-200"
              >
                <FontAwesomeIcon icon={faRotateLeft} />
              </button>
            </div>

            <div
              ref={unitCreateContainerRef}
              className={`${animeError(
                "",
                createErrors
              )} flex flex-col items-center justify-center w-full bg-primary p-8 rounded-lg m-8 transition-200`}
            >
              <h2 className=" font-bold text-2xl text-secondary">
                Ajouter une unité
              </h2>
              <div className=" mt-8 w-full px-8 relative flex flex-col items-center justify-center">
                <input
                  onClick={() => setCreateErrors("")}
                  autoComplete="off"
                  required
                  type="text"
                  id="createUnitName"
                  placeholder=" "
                  value={createUnitName}
                  className={`inputForm rounded-lg ${animeError(
                    "nom",
                    createErrors
                  )}`}
                  ref={inputUnitNameRef}
                  onChange={(e) => setCreateUnitName(e.target.value)}
                />
                <label className="labelForm" htmlFor="createUnitName">
                  Nom de l'unité...
                </label>
              </div>
              <div className="mt-8 w-full relative flex flex-col items-center justify-center">
                <div className="flex w-full justify-center items-center  px-8">
                  <input
                    onClick={() => setCreateErrors("")}
                    autoComplete="off"
                    required
                    type="text"
                    id="createUnitAbbreviation"
                    placeholder=" "
                    value={createUnitAbbreviation}
                    className={`inputForm h-fit rounded-lg ${animeError(
                      "abbreviation",
                      createErrors
                    )}`}
                    ref={inputUnitUrlRef}
                    onChange={(e) => setCreateUnitAbbreviation(e.target.value)}
                  />
                  <label className="labelForm" htmlFor="createUnitAbbreviation">
                    Nom de l'abbreviation de l'unité...
                  </label>
                  {createUnitAbbreviation && (
                    <button
                      title="Effacer le champs"
                      className="-ml-7 text-primary hover:text-primary-hover dark:text-primary-dark dark:hover:text-primary-dark-hover"
                    >
                      <FontAwesomeIcon
                        icon={faRotateLeft}
                        onClick={() => {
                          setCreateUnitAbbreviation("");
                        }}
                      />
                    </button>
                  )}
                </div>
                <div className="mt-16 flex flex-col items-center justify-center">
                  <button
                    type="button"
                    className="primary-button "
                    onClick={doCreate}
                  >
                    Ajouter une unité
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
                Mettre à jour une unité
              </h2>
              <div className="w-full mx-auto mt-8 relative">
                <div
                  className={`${animeError(
                    "",
                    updateErrors
                  )} flex flex-col items-center justify-center bg-primary-hover p-4 rounded-lg transition-200`}
                >
                  <h2 className=" font-bold text-2xl text-secondary">
                    Modifier une unité
                  </h2>

                  {unit && (
                    <div className="p-4">
                      <h2 className="text-center font-bold text-2xl text-secondary dark:text-secondary-dark transition-200">
                        Unité id {unit?.id}
                      </h2>
                      <p className=" pb-8 text-center font-bold text-4xl text-secondary dark:text-secondary-dark transition-200">
                        {unit.name}
                      </p>
                      <p className=" pb-8 text-center font-bold text-4xl text-secondary dark:text-secondary-dark transition-200">
                        {unit.abbreviation}
                      </p>
                    </div>
                  )}
                  <div className="w-full px-8 mt-8 relative flex flex-col items-center justify-center">
                    <input
                      onClick={() => {
                        setUpdateUnitName(unit?.name ?? "");
                        setUpdateErrors("");
                        setDeleteErrors("");
                      }}
                      autoComplete="off"
                      required
                      type="text"
                      id="updateUnitName"
                      placeholder=" "
                      value={updateUnitName}
                      className={`inputForm ${animeError(
                        "",
                        updateErrors || deleteErrors
                      )} ${isOpen ? triggerClasses : "rounded-lg"}`}
                      ref={triggerRef}
                      onChange={handleSearchUnit}
                    />
                    <label className="labelForm" htmlFor="updateUnitName">
                      Nom de l'unité...
                    </label>
                    {updateUnitName && isOpen && (
                      <ul
                        ref={dropdownRef}
                        className={`${
                          units.filter((unit) =>
                            unit.name
                              .toLowerCase()
                              .includes(updateUnitName.toLowerCase())
                          ).length > 10
                            ? " h-80 overflow-y-scroll"
                            : units.filter((unit) =>
                                unit.name
                                  .toLowerCase()
                                  .includes(updateUnitName.toLowerCase())
                              ).length === 0
                            ? "hidden "
                            : "h-fit"
                        } ${dropdownPosition} ${dropdownClasses} bg-secondary dark:bg-secondary-dark w-12/12 inset-8 absolute z-10`}
                      >
                        <p className="px-4 py-2 text-primary dark:text-primary-dark text-xl font-bold">
                          Unités
                        </p>
                        {units
                          .filter((unit) =>
                            unit.name
                              .toLowerCase()
                              .includes(updateUnitName.toLowerCase())
                          )
                          .map((unit) => (
                            <li
                              onClick={() =>
                                handleClickUnitList(Number(unit.id))
                              }
                              key={unit.id}
                              className="px-4 py-2 text-primary hover:text-primary-hover dark:text-primary-dark dark:hover:text-primary-dark-hover hover:bg-secondary-hover dark:hover:bg-secondary-dark-hover cursor-pointer"
                            >
                              {unit.name}
                            </li>
                          ))}
                      </ul>
                    )}
                  </div>
                  <div className=" w-full mt-8 relative flex flex-col items-center justify-center">
                    <div className="flex justify-center items-center w-full px-8">
                      <input
                        disabled={!unitId}
                        onClick={() => {
                          setUpdateUnitAbbreviation(unit?.abbreviation ?? "");
                          setUpdateErrors("");
                          setDeleteErrors("");
                        }}
                        autoComplete="off"
                        required
                        type="text"
                        id="updateUnitAbbreviation"
                        placeholder=" "
                        value={updateUnitAbbreviation || ""}
                        className={`inputForm h-fit rounded-lg ${animeError(
                          "abbreviation",
                          updateErrors
                        )} disabled:bg-slate-400 disabled:text-gray-100 disabled:cursor-not-allowed`}
                        title={`${
                          unitId
                            ? "Modifier l'abbreviation"
                            : "Sélectionnez un unité pour modifier l'abbreviation"
                        }`}
                        ref={inputUnitUrlRef}
                        onChange={(e) =>
                          setUpdateUnitAbbreviation(e.target.value)
                        }
                      />
                      <label
                        className="labelForm"
                        htmlFor="updateUnitAbbreviation "
                      >
                        Nom de l'abbreviation...
                      </label>
                      {updateUnitAbbreviation && (
                        <button
                          title="Effacer le champs"
                          className="-ml-7 text-primary hover:text-primary-hover dark:text-primary-dark dark:hover:text-primary-dark-hover"
                        >
                          <FontAwesomeIcon
                            icon={faRotateLeft}
                            onClick={() => {
                              setUpdateUnitAbbreviation("");
                            }}
                          />
                        </button>
                      )}
                    </div>
                    <div className="mt-8 flex items-center w-full px-8 justify-between">
                      <button
                        type="button"
                        className="primary-button "
                        onClick={doUpdate}
                      >
                        Mettre à jour une unité
                      </button>
                      {updateErrors && (
                        <p className="relative text-red-500">{updateErrors}</p>
                      )}

                      <button
                        type="button"
                        className="delete-button "
                        onClick={doDelete}
                      >
                        Supprimer une unité
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
                Toutes les unités
              </h2>

              {unitsDataError ? (
                <p className="bg-red-500 p-2 rounded-lg text-light my-4 col-span-4">
                  Erreur lors du chargement des unités
                </p>
              ) : unitsDataLoading ? (
                <div className="w-full my-16">
                  <p className=" text-center py-2 animate-pulse text-light dark:text-primary-hover">
                    Chargement des unités...
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
                  {units
                    .slice()
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((unit: Unit) => (
                      <div
                        key={unit.id}
                        className="flex flex-col justify-between items-center h-60 rounded-lg hover:bg-primary-dark-hover shadow-xl hover:shadow-2xl bg-primary-focus overflow-hidden cursor-pointer"
                        onClick={() => handleClickChosenUnit(unit)}
                      >
                        <div className="h-1/2 p-4 text-center">
                          <h2 className=" font-bold text-xl text-secondary">
                            Unité id {unit.id}
                          </h2>
                          <p className=" pb-8 text-center font-bold text-2xl text-secondary dark:text-secondary-dark transition-200">
                            {unit.name}
                          </p>
                          <p className=" pb-8 text-center font-bold text-6xl text-secondary dark:text-secondary-dark transition-200">
                            {unit.abbreviation}
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

export default UnitManager;
