import { IngredientType } from "../../entities/IngredientType";

export async function seedIngredients() {
    console.log("Vérification des types d'ingrédients existants...");

    const existingIngredientTypes = await IngredientType.find();
    if (existingIngredientTypes.length === 0) {
        await IngredientType.insert([
            { name: "Légume" },
            { name: "Fruit" },
            { name: "Épice" },
            { name: "Aromate" },
            { name: "Céréale" },
            { name: "Viande" },
            { name: "Poisson" },
            { name: "Produit laitier" },
            { name: "Noix et graines" },
            { name: "Condiment" },
            { name: "Sucrant" },
            { name: "Boisson" },
        ]);
        console.log("Types d'ingrédients initialisés dans la base de données !");
    } else {
        console.log("Les types d'ingrédients sont déjà présents dans la base de données.");
    }
}
