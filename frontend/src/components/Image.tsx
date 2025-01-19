import { IKImage } from "imagekitio-react";

type ImageProps = React.ComponentProps<typeof IKImage>;

const Image = (props: ImageProps) => {
  const urlEndpoint = import.meta.env.VITE_IMAGEKITIO_PUBLIC_URL_ENDPOINT;
  return (
    <div>
      <IKImage urlEndpoint={urlEndpoint} {...props} />
    </div>
  );
};

export default Image;
