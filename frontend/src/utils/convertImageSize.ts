
export const convertSizeInKB = (size: number): string => {
    const sizeInKB = (size / 1024).toFixed(2); // Convertit en Ko avec 2 décimales
    return `${sizeInKB} Ko`;
};

export const convertSizeInMB = (size: number): string => {
    const sizeInMB = (size / (1024 * 1024)).toFixed(2); // Convertit en Mo avec 2 décimales
    return `${sizeInMB} Mo`;
};

