export const authenticator = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_IMAGEKITIO_URL}/auth`);
        console.log("Response:", response);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Request failed with status ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        console.log("Auth Data from Backend:", data);
        const { signature, expire, token } = data;

        return { signature, expire, token };
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Authentication request failed: ${error.message}`);
        } else {
            throw new Error('Authentication request failed with an unknown error');
        }
    }
};

export const publicKey = import.meta.env.VITE_IMAGEKITIO_PUBLIC_KEY;
export const urlEndpoint = import.meta.env.VITE_IMAGEKITIO_PUBLIC_URL_ENDPOINT;