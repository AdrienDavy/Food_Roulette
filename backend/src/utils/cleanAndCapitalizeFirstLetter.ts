export const cleanAndCapitalize = (word: string): string =>
    word.trim().charAt(0).toUpperCase() + word.trim().slice(1).toLowerCase();