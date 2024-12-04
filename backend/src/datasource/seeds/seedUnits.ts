import { Unit } from "../../entities/UnitEntitie";

export async function seedUnits() {
    console.log("Vérification des unités existantes...");

    // Vérifie si des unités existent déjà dans la base de données
    const existingUnits = await Unit.find();
    if (existingUnits.length === 0) {
        // Insère les unités si aucune n'est trouvée
        console.log("Insertion des nouvelles unités...");
        await Unit.insert([
            { name: "unité", abbreviation: "unité" },
            { name: "gramme", abbreviation: "g" },
            { name: "kilogramme", abbreviation: "kg" },
            { name: "litre", abbreviation: "L" },
            { name: "centilitre", abbreviation: "cl" },
            { name: "pincée", abbreviation: "pincée" },
            { name: "cuillère à soupe", abbreviation: "cs" },
            { name: "cuillère à café", abbreviation: "cc" },
        ]);
        console.log("Unités initialisées dans la base de données !");
    } else {
        console.log("Les unités sont déjà présentes dans la base de données.");
    }
}
