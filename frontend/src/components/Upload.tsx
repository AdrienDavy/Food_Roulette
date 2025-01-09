import { IKContext, IKUpload } from "imagekitio-react";
import {
  authenticator,
  publicKey,
  urlEndpoint,
} from "../api/imagekitio/ImageKitIoAuth";
import { useRef } from "react";

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
  return (
    <div>
      <IKContext
        publicKey={publicKey}
        urlEndpoint={urlEndpoint}
        transformationPosition="path"
        authenticator={authenticator}
      >
        <IKUpload {...props} style={{ display: "none" }} ref={ikUploadRef} />

        <button
          className="primary-button"
          onClick={() => ikUploadRef.current?.click()}
        >
          Charger une image
        </button>
      </IKContext>
    </div>
  );
};

export default Upload;
