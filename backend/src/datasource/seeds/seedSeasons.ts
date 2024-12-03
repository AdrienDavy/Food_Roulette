import { Season, SeasonName } from "../../entities/Season";

export async function seedSeasons() {
    console.log("Vérification des saisons existantes...");

    const existingSeasons = await Season.find();
    if (existingSeasons.length === 0) {
        await Season.insert([
            { name: SeasonName.PRINTEMPS },
            { name: SeasonName.ETE },
            { name: SeasonName.AUTOMNE },
            { name: SeasonName.HIVER },
            { name: SeasonName.TOUTE_ANNEE },
        ]);
        console.log("Saisons initialisées dans la base de données !");
    } else {
        console.log("Les saisons sont déjà présentes dans la base de données.");
    }
}
