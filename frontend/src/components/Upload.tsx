import { IKContext, IKUpload } from "imagekitio-react";
import {
  authenticator,
  publicKey,
  urlEndpoint,
} from "../api/imagekitio/ImageKitIoAuth";
import { useRef, useState } from "react";
import { Bounce, toast } from "react-toastify";
import { convertSizeInKB, convertSizeInMB } from "../utils/convertImageSize";

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
  onUrlChange?: (url: string) => void; // Callback pour transmettre l'URL
}

const Upload: React.FC<UploadProps> = ({ onUrlChange, ...props }) => {
  const ikUploadRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [, setImageUrl] = useState("");

  const onError = () => {
    const error = new Error("Upload failed");
    setError(error.message);
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
    fileId: string;
    name: string;
    size: number;
    filePath: string;
    url: string;
    fileType: string;
    height: number;
    width: number;
    thumbnailUrl: string;
  }

  const onSuccess: UploadProps["onSuccess"] = (res: SuccessResponse) => {
    if (res.fileType === "image" && !res.thumbnailUrl) {
      console.error("No thumbnail URL in response", res);
      return;
    }
    if (!res.name) {
      console.error("No name in response", res);
      return;
    }
    if (res.fileType === "image" && res.size >= 1048576) {
      setError("Image trop grande (1 Mo maximum)");
      console.error("Image too large", res);
      return;
    }
    if (res.fileType !== "image") {
      setError("Format non pris en charge");
      console.error("Unsupported format", res);
      return;
    }
    console.log("Success", res);
    setImageUrl(res.thumbnailUrl);
    if (onUrlChange) {
      onUrlChange(res.thumbnailUrl); // Notifie le composant parent
    }
    toast.success(
      <div className="flex flex-col items-start">
        <img
          src={res.thumbnailUrl}
          alt={res.name}
          className="w-full mb-3 object-cover rounded-lg"
        />
        <span>
          {res.fileType} <strong>{res.name}</strong> chargée avec succès ! 🎉
        </span>
        <span>
          Taille :
          {res.size && res.size < 1048576
            ? ` ${convertSizeInKB(res.size)}`
            : ` ${convertSizeInMB(res.size)}`}
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
    setError("");
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

        <div className="relative w-fit h-14 items-center justify-center flex flex-col">
          <button
            className="primary-button relative"
            onClick={() => ikUploadRef.current?.click()}
          >
            <div
              className={` ${
                progress ? "visible opacity-100" : " hidden opacity-0"
              } absolute top-0 left-0 w-full bg-gray-200 rounded-t-md overflow-hidden h-2.5 dark:bg-gray-700`}
            >
              <div
                className="bg-primary dark:bg-primary-dark h-2.5 transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            {progress < 100 && progress !== 0
              ? `Chargement... ${progress}%`
              : progress === 0
              ? "Charger une image"
              : "Chargement terminé !"}
          </button>
          {error && <p className=" text-red-500">{error}</p>}
        </div>
      </IKContext>
    </div>
  );
};

export default Upload;
