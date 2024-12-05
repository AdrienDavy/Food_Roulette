import { Recipe } from "../../entities/RecipeEntitie";
import { Ingredient } from "../../entities/IngredientEntitie";
import { IngredientVariation } from "../../entities/IngredientVariationEntitie";
import { Tag } from "../../entities/TagEntitie";
import { Season } from "../../entities/SeasonEntitie";
import { In } from "typeorm";

export async function seedRecipes() {
    console.log("Vérification des recettes existantes...");

    const existingRecipes = await Recipe.find();
    if (existingRecipes.length === 0) {
        const recipesData = [
            {
                name: "Salade de carottes",
                preparation: "Râpez les carottes et assaisonnez avec une vinaigrette.",
                cookTime: 0,
                ingredientIds: [1], // Carotte
                variationIds: [], // Aucune variation
                tagIds: [1], // Exemple : Tag 'Végétarien'
                seasonId: 1, // Printemps
                image: "https://cdn.pixabay.com/photo/2017/03/22/22/35/salad-2163197_960_720.jpg",
                type: "entrée",
                isAlcoholicDrink: false,
            },
            {
                name: "Fraises à la crème",
                preparation: "Servez les fraises avec de la crème fouettée.",
                cookTime: 0,
                ingredientIds: [2], // Fraise
                variationIds: [], // Aucune variation
                tagIds: [2], // Exemple : Tag 'Dessert'
                seasonId: 2, // Été
                image: "https://cdn.pixabay.com/photo/2016/03/05/19/02/strawberries-1239425_960_720.jpg",
                type: "dessert",
                isAlcoholicDrink: false,
            },
            {
                name: "Poulet au riz",
                preparation: "Faites cuire le riz et le poulet ensemble avec des épices.",
                cookTime: 30,
                ingredientIds: [5, 6], // Riz, Poulet
                variationIds: [], // Aucune variation
                tagIds: [3], // Exemple : Tag 'Plat principal'
                seasonId: 5, // Toute l'année
                image: "https://cdn.pixabay.com/photo/2020/07/28/21/53/rice-5444517_960_720.jpg",
                type: "plat",
                isAlcoholicDrink: false,
            },
        ];

        for (const data of recipesData) {
            const season = data.seasonId ? await Season.findOneBy({ id: data.seasonId }) : null;
            const ingredients = data.ingredientIds ? await Ingredient.findBy({ id: In(data.ingredientIds) }) : [];
            const variations = data.variationIds ? await IngredientVariation.findBy({ id: In(data.variationIds) }) : [];
            const tags = data.tagIds ? await Tag.findBy({ id: In(data.tagIds) }) : [];

            // Vérifie les relations obligatoires
            if (!season || ingredients.length !== (data.ingredientIds?.length || 0)) {
                console.warn(`Recette "${data.name}" non créée : relations manquantes.`);
                continue;
            }

            const recipe = new Recipe();
            Object.assign(recipe, data, { season, ingredients, variations, tags });
            await recipe.save();
        }

        console.log("Recettes initialisées dans la base de données !");
    } else {
        console.log("Les recettes sont déjà présentes dans la base de données.");
    }
}
