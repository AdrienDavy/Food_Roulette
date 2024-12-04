import { Arg, ID, Info, Mutation, Query, Resolver } from "type-graphql";
import { Season, SeasonCreateInput, SeasonUpdateInput } from "../entities/SeasonEntitie";
import { GraphQLResolveInfo } from "graphql";
import { makeRelations } from "../utils/makeRelations";

@Resolver()
export class SeasonsResolver {
    // Requête pour récupérer toutes les saisons
    @Query(() => [Season])
    async seasons(@Info() info: GraphQLResolveInfo): Promise<Season[]> {
        const seasons = await Season.find({
            relations:
                makeRelations(info, Season),
        });
        return seasons;
    }

    // Requête pour récupérer une saison par ID
    @Query(() => Season, { nullable: true })
    async season(@Arg("id", () => ID) id: number): Promise<Season | null> {
        const season = await Season.findOneBy({ id });
        if (season) {
            return season;
        } else {
            return null;
        }
    }

    // Mutation pour créer une nouvelle saison
    @Mutation(() => Season)
    async createSeason(@Arg("data", () => SeasonCreateInput) data: SeasonCreateInput): Promise<Season> {
        const newSeason = new Season();
        Object.assign(newSeason, data);
        await newSeason.save();
        return newSeason;
    }

    // Mutation pour mettre à jour une saison existante
    @Mutation(() => Season, { nullable: true })
    async updateSeason(
        @Arg("id", () => ID) id: number,
        @Arg("data", () => SeasonUpdateInput) data: SeasonUpdateInput
    ): Promise<Season | null> {
        const season = await Season.findOneBy({ id });
        if (season !== null) {
            Object.assign(season, data);
            await season.save();
            return season;
        } else {
            return null;
        }
    }

    // Mutation pour supprimer une saison
    @Mutation(() => Season, { nullable: true })
    async deleteSeason(@Arg("id", () => ID) id: number): Promise<Season | null> {
        const season = await Season.findOneBy({ id });
        if (season !== null) {
            await season.remove();
            return season;
        } else {
            return null;
        }
    }
}
