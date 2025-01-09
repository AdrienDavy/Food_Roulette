import { IKContext, IKUpload } from "imagekitio-react";
import {
  authenticator,
  publicKey,
  urlEndpoint,
} from "../api/imagekitio/ImageKitIoAuth";
import { useRef, useState } from "react";
import { Bounce, toast } from "react-toastify";

type IKUploadType = React.ComponentProps<typeof IKUpload>;

interface UploadProps {
  fileName?: string;
  useUniqueFileName?: boolean;
  tags?: string[];
  folder?: string;
  isPrivateFile?: boolean;
  customCoordinates?: string;
  responseFields?: string[];
  onError?: IKUploadType["onError"];
  onSuccess?: IKUploadType["onSuccess"];
  onUploadProgress?: IKUploadType["onUploadProgress"];
}

const Upload: React.FC<UploadProps> = (props) => {
  const ikUploadRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState(0);

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

  // Gestion du succès
  interface SuccessResponse {
    thumbnailUrl: string;
    name: string;
    fileType: string;
  }

  const onSuccess: UploadProps["onSuccess"] = (res: SuccessResponse) => {
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

  // Gestion de la progression
  const handleProgress = (event: ProgressEvent) => {
    if (event.lengthComputable) {
      const percentComplete = Math.round((event.loaded / event.total) * 100);
      setProgress(percentComplete);
      if (percentComplete === 100) {
        setTimeout(() => {
          setProgress(0);
        }, 5000);
      }
    }
  };

  return (
    <div className="upload-container relative">
      <IKContext
        publicKey={publicKey}
        urlEndpoint={urlEndpoint}
        transformationPosition="path"
        authenticator={authenticator}
      >
        {/* Upload hidden for custom button */}
        <IKUpload
          {...props}
          style={{ display: "none" }}
          ref={ikUploadRef}
          onError={onError}
          onSuccess={onSuccess}
          onUploadProgress={(event) => {
            handleProgress(event);
            if (props.onUploadProgress) props.onUploadProgress(event);
          }}
        />

        <div className="relative w-fit h-14">
          <div
            className={`${
              progress ? "visible opacity-100" : " hidden opacity-0"
            } w-full z-20 absolute -top-10 `}
          >
            <p className="text-center py-2 animate-pulse text-light dark:text-primary-hover">
              {progress < 100
                ? `Chargement... ${progress}%`
                : "Chargement terminé !"}
            </p>
            <div className="w-full bg-gray-200 rounded-t-md overflow-hidden h-2.5 dark:bg-gray-700">
              <div
                className="bg-primary dark:bg-primary-dark h-2.5 transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
          <button
            className="primary-button"
            onClick={() => ikUploadRef.current?.click()}
          >
            Charger une image
          </button>
        </div>
      </IKContext>
    </div>
  );
};

export default Upload;
