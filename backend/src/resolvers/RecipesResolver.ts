import { Arg, ID, Info, Mutation, Query, Resolver } from "type-graphql";
import { Recipe, RecipeCreateInput, RecipeUpdateInput } from "../entities/RecipeEntitie";
import { GraphQLResolveInfo } from "graphql";
import { makeRelations } from "../utils/makeRelations";
import { Season } from "../entities/SeasonEntitie";
import { Ingredient } from "../entities/IngredientEntitie";
import { In } from "typeorm";
import { IngredientVariation } from "../entities/IngredientVariationEntitie";
import { Tag } from "../entities/TagEntitie";




@Resolver()
export class RecipesResolver {
    @Query(() => [Recipe])
    async recipes(@Info() info: GraphQLResolveInfo): Promise<Recipe[]> {
        return await Recipe.find({
            relations: makeRelations(info, Recipe),
        });
    }

    @Query(() => Recipe, { nullable: true })
    async recipe(@Arg("id", () => ID) id: number, @Info() info: GraphQLResolveInfo): Promise<Recipe | null> {
        return await Recipe.findOne({
            where: { id },
            relations: makeRelations(info, Recipe),
        });
    }

    @Mutation(() => Recipe)
    async createRecipe(@Arg("data", () => RecipeCreateInput) data: RecipeCreateInput): Promise<Recipe> {
        const newRecipe = new Recipe();

        // Season
        if (data.seasonId) {
            const season = await Season.findOneBy({ id: data.seasonId });
            if (!season) throw new Error("Invalid seasonId");
            newRecipe.season = season;
        }

        // Ingredients
        if (data.ingredientIds && data.ingredientIds.length > 0) {
            const ingredients = await Ingredient.findBy({ id: In(data.ingredientIds) });
            if (ingredients.length !== data.ingredientIds.length) {
                throw new Error("Some ingredient IDs are invalid.");
            }
            newRecipe.ingredients = ingredients;
        }

        // Variations
        if (data.variationIds && data.variationIds.length > 0) {
            const variations = await IngredientVariation.findBy({ id: In(data.variationIds) });
            if (variations.length !== data.variationIds.length) {
                throw new Error("Some variation IDs are invalid.");
            }
            newRecipe.variations = variations;
        }

        // Tags
        if (data.tagIds && data.tagIds.length > 0) {
            const tags = await Tag.findBy({ id: In(data.tagIds) });
            if (tags.length !== data.tagIds.length) {
                throw new Error("Some tag IDs are invalid.");
            }
            newRecipe.tags = tags;
        }

        Object.assign(newRecipe, { ...data });
        await newRecipe.save();
        return newRecipe;
    }

    @Mutation(() => Recipe, { nullable: true })
    async updateRecipe(
        @Arg("id", () => ID) id: number,
        @Arg("data", () => RecipeUpdateInput) data: RecipeUpdateInput
    ): Promise<Recipe | null> {
        const recipe = await Recipe.findOne({
            where: { id },
            relations: {
                ingredients: true,
                variations: true,
                tags: true,
                season: true,
            },
        });
        if (!recipe) return null;

        // Season
        if (data.seasonId) {
            const season = await Season.findOneBy({ id: data.seasonId });
            if (!season) throw new Error("Invalid seasonId");
            recipe.season = season;
        }

        // Ingredients
        if (data.ingredientIds) {
            const ingredients = await Ingredient.findBy({ id: In(data.ingredientIds) });
            if (ingredients.length !== data.ingredientIds.length) {
                throw new Error("Some ingredient IDs are invalid.");
            }
            recipe.ingredients = ingredients;
        }

        // Variations
        if (data.variationIds) {
            const variations = await IngredientVariation.findBy({ id: In(data.variationIds) });
            if (variations.length !== data.variationIds.length) {
                throw new Error("Some variation IDs are invalid.");
            }
            recipe.variations = variations;
        }

        // Tags
        if (data.tagIds) {
            const tags = await Tag.findBy({ id: In(data.tagIds) });
            if (tags.length !== data.tagIds.length) {
                throw new Error("Some tag IDs are invalid.");
            }
            recipe.tags = tags;
        }

        Object.assign(recipe, data);
        await recipe.save();
        return recipe;
    }

    @Mutation(() => Recipe, { nullable: true })
    async deleteRecipe(@Arg("id", () => ID) id: number): Promise<Recipe | null> {
        const recipe = await Recipe.findOneBy({ id });
        if (!recipe) return null;

        await recipe.remove();
        return recipe;
    }
}
