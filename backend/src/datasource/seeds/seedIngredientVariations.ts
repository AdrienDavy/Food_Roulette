import { Ingredient } from "../../entities/IngredientEntitie";
import { IngredientVariation } from "../../entities/IngredientVariationEntitie";

export async function seedIngredientVariations() {
    console.log("Vérification des variations d'ingrédients existantes...");

    const existingVariations = await IngredientVariation.find();
    if (existingVariations.length === 0) {
        const variationsData = [
            { name: "Carottes râpées", ingredientId: 1 },
            { name: "Fraise des bois", ingredientId: 2 },
            { name: "Cannelle moulue", ingredientId: 3 },
            { name: "Basilic frais", ingredientId: 4 },
            { name: "Riz basmati", ingredientId: 5 },
            { name: "Poulet fermier", ingredientId: 6 },
            { name: "Lentilles vertes", ingredientId: 7 },
        ];

        for (const data of variationsData) {
            // Vérifie si l'ingrédient avec cet ID existe
            const ingredient = await Ingredient.findOneBy({ id: data.ingredientId });

            if (!ingredient) {
                console.error(`Ingrédient avec l'id ${data.ingredientId} non trouvé.`);
                continue;
            }

            // Vérifie si une variation avec ce nom existe déjà pour cet ingrédient
            const existingVariation = await IngredientVariation.findOneBy({
                name: data.name,
                ingredient: { id: ingredient.id },
            });

            if (existingVariation) {
                console.log(`Variation "${data.name}" pour l'ingrédient ${ingredient.name} existe déjà.`);
                continue;
            }

            // Crée et sauvegarde la nouvelle variation
            const variation = new IngredientVariation();
            variation.name = data.name;
            variation.ingredient = ingredient;

            await variation.save();
        }

        console.log("Variations d'ingrédients initialisées !");
    } else {
        console.log("Les variations d'ingrédients sont déjà présentes dans la base de données.");
    }
}
