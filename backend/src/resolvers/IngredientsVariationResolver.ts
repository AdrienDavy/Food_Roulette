import { Arg, ID, Info, Mutation, Query, Resolver } from "type-graphql";
import { Ingredient } from "../entities/IngredientEntitie";
import { IngredientVariation, IngredientVariationCreateManyInput, IngredientVariationUpdateInput } from "../entities/IngredientVariationEntitie";
import { makeRelations } from "../utils/makeRelations";
import { GraphQLResolveInfo } from "graphql";
import { In } from "typeorm";

@Resolver()
export class IngredientVariationResolver {
    @Query(() => [IngredientVariation])
    async ingredientVariations(@Info() info: GraphQLResolveInfo): Promise<IngredientVariation[]> {
        const ingredientVariation = await IngredientVariation.find({
            relations: makeRelations(info, IngredientVariation),
        });
        return ingredientVariation;
    }

    @Query(() => IngredientVariation, { nullable: true })
    async ingredientVariation(@Arg("id", () => ID) id: number, @Info() info: GraphQLResolveInfo): Promise<IngredientVariation | null> {
        return await IngredientVariation.findOne({
            where: { id },
            relations: makeRelations(info, IngredientVariation),
        });
    }

    @Mutation(() => [IngredientVariation])
    async createIngredientVariations(
        @Arg("data", () => IngredientVariationCreateManyInput) data: IngredientVariationCreateManyInput
    ): Promise<IngredientVariation[]> {
        // Vérifie que l'ingrédient parent existe
        const ingredient = await Ingredient.findOneBy({ id: data.ingredientId });
        if (!ingredient) {
            throw new Error("Invalid ingredientId");
        }

        // Déduplique les noms dans le tableau
        const uniqueNames = [...new Set(data.names)];

        // Vérifie s'il y a des doublons déjà existants dans la base de données
        const existingVariations = await IngredientVariation.find({
            where: {
                name: In(uniqueNames),
                ingredient: { id: data.ingredientId },
            },
            relations: ["ingredient"],
        });

        if (existingVariations.length > 0) {
            const existingNames = existingVariations.map((v) => v.name).join(", ");
            throw new Error(
                `The following variations already exist for this ingredient: ${existingNames}`
            );
        }

        // Crée les nouvelles variations
        const variations: IngredientVariation[] = [];
        for (const name of uniqueNames) {
            const variation = new IngredientVariation();
            variation.name = name;
            variation.ingredient = ingredient;
            await variation.save();
            variations.push(variation);
        }

        return variations;
    }



    @Mutation(() => IngredientVariation, { nullable: true })
    async updateIngredientVariation(
        @Arg("id", () => ID) id: number,
        @Arg("data", () => IngredientVariationUpdateInput) data: IngredientVariationUpdateInput
    ): Promise<IngredientVariation | null> {
        const variation = await IngredientVariation.findOne({
            where: { id },
            relations: { ingredient: true },
        });
        if (!variation) return null;

        if (data.ingredientId) {
            const ingredient = await Ingredient.findOneBy({ id: data.ingredientId });
            if (!ingredient) throw new Error("Invalid ingredientId");
            variation.ingredient = ingredient;
        }

        Object.assign(variation, data);
        await variation.save();
        return variation;
    }

    @Mutation(() => IngredientVariation, { nullable: true })
    async deleteIngredientVariation(@Arg("id", () => ID) id: number): Promise<IngredientVariation | null> {
        const variation = await IngredientVariation.findOneBy({ id });
        if (variation !== null) {
            await variation.remove();
            Object.assign(variation, { id });
            return variation;
        } else {
            return null;
        }
    }
}
