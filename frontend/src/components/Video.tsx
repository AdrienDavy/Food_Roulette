import { IKVideo } from "imagekitio-react";

type VideoProps = React.ComponentProps<typeof IKVideo>;

const Video = (props: VideoProps) => {
  const urlEndpoint = import.meta.env.VITE_IMAGEKITIO_PUBLIC_URL_ENDPOINT;
  return (
    <div>
      <IKVideo urlEndpoint={urlEndpoint} {...props} />
    </div>
  );
};

export default Video;
