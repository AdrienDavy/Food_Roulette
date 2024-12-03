import { datasource } from "../datasource";
import { seedSeasons } from "./seedSeasons";
import { seedIngredients } from "./seedIngredientTypes";

async function runSeeds() {
    try {
        await datasource.initialize();
        console.log("Datasource is connected 🔌");

        await seedSeasons();
        await seedIngredients();

        console.log("Seeds executed successfully! 🌱");
    } catch (error) {
        console.error("Error running seeds:", error);
    } finally {
        await datasource.destroy();
        console.log("Datasource is disconnected 🔌");
    }
}

runSeeds();
