import { Ingredient } from "../../entities/IngredientEntitie";
import { IngredientType } from "../../entities/IngredientTypeEntitie";
import { Season } from "../../entities/SeasonEntitie";

export async function seedIngredients() {
    console.log("Vérification des ingrédients existants...");

    const existingIngredients = await Ingredient.find();
    if (existingIngredients.length === 0) {
        const ingredientsData = [
            { name: "Carotte", image: "https://cdn.pixabay.com/photo/2015/09/29/19/17/isolated-964393_960_720.png", typeId: 1, seasonId: 1, hasIngredient: true },
            { name: "Tomate", image: "https://cdn.pixabay.com/photo/2017/01/20/15/06/tomatoes-1994669_960_720.jpg", typeId: 1, seasonId: 2, hasIngredient: true },
            { name: "Pomme de terre", image: "https://cdn.pixabay.com/photo/2015/03/24/08/37/potatoes-687489_960_720.jpg", typeId: 1, seasonId: 5, hasIngredient: true },
            { name: "Fraise", image: "https://cdn.pixabay.com/photo/2015/08/19/17/47/strawberry-896397_960_720.jpg", typeId: 2, seasonId: 2, hasIngredient: false },
            { name: "Pomme", image: "https://cdn.pixabay.com/photo/2017/09/26/13/45/apple-2788662_960_720.jpg", typeId: 2, seasonId: 3, hasIngredient: true },
            { name: "Cannelle", image: "https://cdn.pixabay.com/photo/2017/09/26/13/42/cinnamon-2788636_960_720.jpg", typeId: 3, seasonId: 5, hasIngredient: true },
            { name: "Basilic", image: "https://cdn.pixabay.com/photo/2016/06/18/22/14/basil-1469057_960_720.jpg", typeId: 4, seasonId: 1, hasIngredient: false },
            { name: "Riz", image: "https://cdn.pixabay.com/photo/2014/10/12/18/33/rice-485814_960_720.jpg", typeId: 5, seasonId: 5, hasIngredient: true },
            { name: "Poulet", image: "https://cdn.pixabay.com/photo/2021/01/06/13/42/chicken-5894448_960_720.jpg", typeId: 6, seasonId: 5, hasIngredient: true },
            { name: "Saumon", image: "https://cdn.pixabay.com/photo/2017/08/02/20/41/salmon-2579316_960_720.jpg", typeId: 7, seasonId: 5, hasIngredient: true },
            { name: "Lait", image: "https://cdn.pixabay.com/photo/2017/07/27/08/25/milk-2544165_960_720.jpg", typeId: 8, seasonId: 5, hasIngredient: true },
            { name: "Amande", image: "https://cdn.pixabay.com/photo/2017/02/13/14/22/almond-2068361_960_720.jpg", typeId: 9, seasonId: 5, hasIngredient: true },
            { name: "Sel", image: "https://cdn.pixabay.com/photo/2016/12/26/17/28/salt-1932901_960_720.jpg", typeId: 10, seasonId: 5, hasIngredient: true },
            { name: "Miel", image: "https://cdn.pixabay.com/photo/2015/03/26/09/39/honey-691694_960_720.jpg", typeId: 11, seasonId: 5, hasIngredient: true },
            { name: "Thé vert", image: "https://cdn.pixabay.com/photo/2017/07/16/10/43/tea-2508277_960_720.jpg", typeId: 12, seasonId: 5, hasIngredient: true },
            { name: "Poivron", image: "https://cdn.pixabay.com/photo/2014/04/10/11/06/pepper-320138_960_720.jpg", typeId: 1, seasonId: 2, hasIngredient: true },
            { name: "Orange", image: "https://cdn.pixabay.com/photo/2017/01/20/15/06/orange-1995056_960_720.jpg", typeId: 2, seasonId: 4, hasIngredient: true },
            { name: "Thym", image: "https://cdn.pixabay.com/photo/2016/11/29/12/02/spices-1869980_960_720.jpg", typeId: 4, seasonId: 3, hasIngredient: true },
            { name: "Menthe", image: "https://cdn.pixabay.com/photo/2017/01/20/15/06/mint-1995057_960_720.jpg", typeId: 4, seasonId: 2, hasIngredient: true },
            { name: "Blé", image: "https://cdn.pixabay.com/photo/2014/11/23/10/59/wheat-543999_960_720.jpg", typeId: 5, seasonId: 5, hasIngredient: true },
            { name: "Boeuf", image: "https://cdn.pixabay.com/photo/2017/03/30/12/50/beef-2180359_960_720.jpg", typeId: 6, seasonId: 5, hasIngredient: true },
            { name: "Cabillaud", image: "https://cdn.pixabay.com/photo/2016/03/05/22/11/fish-1239157_960_720.jpg", typeId: 7, seasonId: 5, hasIngredient: true },
            { name: "Fromage", image: "https://cdn.pixabay.com/photo/2017/07/31/16/05/cheese-2562367_960_720.jpg", typeId: 8, seasonId: 5, hasIngredient: true },
            { name: "Noix", image: "https://cdn.pixabay.com/photo/2016/03/05/19/02/walnuts-1239612_960_720.jpg", typeId: 9, seasonId: 5, hasIngredient: true },
            { name: "Vinaigre", image: "https://cdn.pixabay.com/photo/2016/01/16/16/50/vinegar-1141463_960_720.jpg", typeId: 10, seasonId: 5, hasIngredient: true },
            { name: "Sucre", image: "https://cdn.pixabay.com/photo/2016/03/05/22/08/sugar-1239148_960_720.jpg", typeId: 11, seasonId: 5, hasIngredient: true },
            { name: "Café", image: "https://cdn.pixabay.com/photo/2017/08/10/07/32/coffee-2612090_960_720.jpg", typeId: 12, seasonId: 5, hasIngredient: true },
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
