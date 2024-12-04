import { Arg, ID, Info, Mutation, Query, Resolver } from "type-graphql";
import { Ingredient, IngredientCreateInput, IngredientUpdateInput } from "../entities/IngredientEntitie";
import { IngredientType } from "../entities/IngredientTypeEntitie";
import { Season } from "../entities/SeasonEntitie";
import { validate } from "class-validator";
import { GraphQLResolveInfo } from "graphql";
import { makeRelations } from "../utils/makeRelations";

@Resolver()
export class IngredientsResolver {
    @Query(() => [Ingredient])
    async ingredients(@Info() info: GraphQLResolveInfo): Promise<Ingredient[]> {
        const ingredients = await Ingredient.find({
            relations:
                makeRelations(info, Ingredient),

        });
        return ingredients;
    }

    @Query(() => Ingredient, { nullable: true })
    async ingredient(@Arg("id", () => ID) id: number): Promise<Ingredient | null> {
        const ingredient = await Ingredient.findOne({
            where: { id },
            relations: {
                type: true,
                season: true
            },
        });
        if (ingredient) {
            return ingredient;
        } else {
            return null;
        }
    }

    @Mutation(() => Ingredient)
    async createIngredient(
        @Arg("data", () => IngredientCreateInput) data: IngredientCreateInput
    ): Promise<Ingredient> {
        const newIngredient = new Ingredient();

        if (data.typeId) {
            const type = await IngredientType.findOneBy({ id: data.typeId });
            if (!type) throw new Error("Invalid typeId");
            newIngredient.type = type;
        }

        if (data.seasonId) {
            const season = await Season.findOneBy({ id: data.seasonId });
            if (!season) throw new Error("Invalid seasonId");
            newIngredient.season = season;
        }

        Object.assign(newIngredient, data);
        await newIngredient.save();
        return newIngredient;
    }

    @Mutation(() => Ingredient, { nullable: true })
    async updateIngredient(
        @Arg("id", () => ID) id: number,
        @Arg("data", () => IngredientUpdateInput) data: IngredientUpdateInput
    ): Promise<Ingredient | null> {
        const ingredient = await Ingredient.findOne({
            where: { id },
            relations: ["type", "season"],
        });
        if (!ingredient) return null;

        if (data.typeId) {
            const type = await IngredientType.findOneBy({ id: data.typeId });
            if (!type) throw new Error("Invalid typeId");
            ingredient.type = type;
        }

        if (data.seasonId) {
            const season = await Season.findOneBy({ id: data.seasonId });
            if (!season) throw new Error("Invalid seasonId");
            ingredient.season = season;
        }

        Object.assign(ingredient, data);
        await ingredient.save();
        return ingredient;
    }

    @Mutation(() => Ingredient, { nullable: true })
    async deleteIngredient(@Arg("id", () => ID) id: number): Promise<Ingredient | null> {
        const ingredient = await Ingredient.findOneBy({ id });
        if (!ingredient) return null;

        await ingredient.remove();
        Object.assign(ingredient, { id });
        return ingredient;
    }
}
