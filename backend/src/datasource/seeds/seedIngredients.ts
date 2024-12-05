import { Ingredient } from "../../entities/IngredientEntitie";
import { IngredientType } from "../../entities/IngredientTypeEntitie";
import { Season } from "../../entities/SeasonEntitie";

export async function seedIngredients() {
    console.log("Vérification des ingrédients existants...");

    const existingIngredients = await Ingredient.find();
    if (existingIngredients.length === 0) {
        const ingredientsData = [
            { name: "Carotte", image: "https://cdn.pixabay.com/photo/2015/09/29/19/17/isolated-964393_960_720.png", typeId: 1, seasonId: 1, hasIngredient: true },
            { name: "Fraise", image: "https://cdn.pixabay.com/photo/2015/08/19/17/47/strawberry-896397_960_720.jpg", typeId: 2, seasonId: 2, hasIngredient: false },
            { name: "Cannelle", image: "https://cdn.pixabay.com/photo/2024/07/01/04/13/ai-generated-8864269_960_720.png", typeId: 3, seasonId: 5, hasIngredient: true },
            { name: "Basilic", image: "https://cdn.pixabay.com/photo/2024/06/20/07/36/ai-generated-8841454_960_720.png", typeId: 4, seasonId: 1, hasIngredient: false },
            { name: "Riz", image: "https://cdn.pixabay.com/photo/2014/10/12/18/33/rice-485814_960_720.jpg", typeId: 5, seasonId: 5, hasIngredient: true },
            { name: "Poulet", image: "https://cdn.pixabay.com/photo/2021/01/06/13/42/chicken-5894448_960_720.jpg", typeId: 6, seasonId: 5, hasIngredient: true },
        ];

        for (const data of ingredientsData) {
            const type = await IngredientType.findOneBy({ id: data.typeId });
            const season = await Season.findOneBy({ id: data.seasonId });

            if (!type || !season) continue;

            const ingredient = new Ingredient();
            Object.assign(ingredient, data, { type, season });
            await ingredient.save();
        }

        console.log("Ingrédients initialisés dans la base de données !");
    } else {
        console.log("Les ingrédients sont déjà présents dans la base de données.");
    }
}
