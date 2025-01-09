import { Bounce, toast } from "react-toastify";
import BrandManager from "../components/dataManagers/BrandManager";
import IngredientManager from "../components/dataManagers/IngredientManager";
import Image from "../components/Image";
import Upload from "../components/Upload";
import { handleScrollToElement } from "../utils/handleScrollToElement";
import { useState } from "react";

const Creation = () => {
  // --------------------------------STATES--------------------------------
  const [progress, setProgress] = useState(0);
  // --------------------------------QUERY--------------------------------

  // -----------------------------FUNCTIONS-----------------------------------

  const onError = () => {
    const error = new Error("Upload failed");
    toast.error(`Erreur lors du chargement de l'image: ${error.message} 🦄`, {
      className: "toast-error bg-danger",
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
  };

  interface UploadSuccessResponse {
    thumbnailUrl: string;
    name: string;
    fileType: string;
  }

  const onSuccess = (res: UploadSuccessResponse) => {
    console.log("Success", res);

    toast.success(
      <div className="flex flex-col items-center">
        <img
          src={res.thumbnailUrl}
          alt={res.name}
          className="w-full mb-3 object-cover rounded-lg"
        />
        <span>
          {res.fileType} <strong>{res.name}</strong> chargée avec succès ! 🎉
        </span>
      </div>,
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
  };

  interface UploadProgressEvent extends ProgressEvent {
    lengthComputable: boolean;
    loaded: number;
    total: number;
  }

  const onUploadProgress = (event: UploadProgressEvent) => {
    if (event.lengthComputable) {
      const percentComplete = Math.round((event.loaded / event.total) * 100);
      setProgress(percentComplete); // Met à jour le pourcentage
      console.log("Progress:", percentComplete + "%");
    }
    setTimeout(() => {
      setProgress(0);
    }, 5000);
  };

  return (
    <div>
      <div className=" backdrop-blur-lg bg-gradient-to-tr from-[rgba(255,255,255,0.3)] max-w-5xl mx-auto p-2 rounded-lg flex justify-between sticky top-4 z-20">
        <a
          className="text-secondary bg-[rgba(66,119,133,0.5)] hover:bg-primary p-2 rounded-lg dark:text-secondary-dark hover:text-secondary-hover dark:hover:text-secondary-dark-hover cursor-pointer"
          onClick={(event) => handleScrollToElement(event, "brands")}
          href="#brands"
        >
          Marques
        </a>
        <a
          className="text-secondary bg-[rgba(66,119,133,0.5)] hover:bg-primary-hover p-2 rounded-lg dark:text-secondary-dark hover:text-secondary-hover dark:hover:text-secondary-dark-hover cursor-pointer"
          onClick={(event) => handleScrollToElement(event, "ingredients")}
          href="#ingredients"
        >
          Ingredients
        </a>
      </div>
      <div
        style={{ position: "relative", width: "500px", height: "500px" }}
        className="mx-auto"
      >
        <Image
          transformation={[{ height: "500", width: "500", quality: "auto" }]}
          path="logo_cook_recipe.png"
          alt="Création"
          loading="lazy"
          lqip={{ active: true, quality: 20 }}
        />
        <div className="relative">
          <div
            className={`${
              !progress ? "visible opacity-100" : " hidden opacity-0"
            } w-full `}
          >
            <p className="text-center py-2 animate-pulse text-light dark:text-primary-hover">
              {progress < 100
                ? `Chargement... ${progress}%`
                : "Chargement terminé !"}
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div
                className="bg-primary-focus dark:bg-primary-dark-hover h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <Upload
            useUniqueFileName
            onError={onError}
            onSuccess={onSuccess}
            onUploadProgress={onUploadProgress}
          />
        </div>
      </div>
      <BrandManager />
      <IngredientManager />
    </div>
  );
};

export default Creation;
