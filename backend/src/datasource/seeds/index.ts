import { datasource } from "../datasource";
import { seedSeasons } from "./seedSeasons";
import { seedIngredientTypes } from "./seedIngredientTypes";
import { seedUnits } from "./seedUnits";
import { seedIngredients } from "./seedIngredients";
import { seedIngredientVariations } from "./seedIngredientVariations";
import { seedBrands } from "./seedBrands";
import { seedShops } from "./seedShops";
import { seedRecipes } from "./seedRecipes";


// When you init this project, run npm run seed

async function runSeeds() {
    try {
        await datasource.initialize();
        console.log("Datasource is connected 🔌");

        await seedBrands();
        await seedIngredients();
        await seedIngredientTypes();
        await seedIngredientVariations();
        await seedRecipes();
        await seedSeasons();
        await seedShops();
        await seedUnits();

        console.log("Seeds executed successfully! 🌱");
    } catch (error) {
        console.error("Error running seeds:", error);
    } finally {
        await datasource.destroy();
        console.log("Datasource is disconnected 🔌");
    }
}

runSeeds();
