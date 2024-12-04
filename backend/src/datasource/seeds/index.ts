import { datasource } from "../datasource";
import { seedSeasons } from "./seedSeasons";
import { seedIngredientTypes } from "./seedIngredientTypes";
import { seedUnits } from "./seedUnits";


// When you init this project, run npm run seed

async function runSeeds() {
    try {
        await datasource.initialize();
        console.log("Datasource is connected 🔌");

        await seedUnits();
        await seedSeasons();
        await seedIngredientTypes();

        console.log("Seeds executed successfully! 🌱");
    } catch (error) {
        console.error("Error running seeds:", error);
    } finally {
        await datasource.destroy();
        console.log("Datasource is disconnected 🔌");
    }
}

runSeeds();
