import { Arg, ID, Info, Mutation, Query, Resolver } from "type-graphql";
import { IngredientType, IngredientTypeCreateInput, IngredientTypeUpdateInput } from "../entities/IngredientType";
import { GraphQLResolveInfo } from "graphql";
import { makeRelations } from "../utils/makeRelations";

@Resolver()
export class IngredientTypesResolver {
    // Requête pour récupérer tous les types d'ingrédients
    @Query(() => [IngredientType])
    async ingredientTypes(@Info() info: GraphQLResolveInfo): Promise<IngredientType[]> {
        const ingredientTypes = await IngredientType.find({
            relations:
                makeRelations(info, IngredientType),
        });
        return ingredientTypes;
    }

    // Requête pour récupérer un type d'ingrédient par ID
    @Query(() => IngredientType, { nullable: true })
    async ingredientType(@Arg("id", () => ID) id: number): Promise<IngredientType | null> {
        const ingredientType = await IngredientType.findOneBy({ id });
        if (ingredientType) {
            return ingredientType;
        } else {
            return null;
        }
    }

    // Mutation pour créer un nouveau type d'ingrédient
    @Mutation(() => IngredientType)
    async createIngredientType(@Arg("data", () => IngredientTypeCreateInput) data: IngredientTypeCreateInput): Promise<IngredientType> {
        const newIngredientType = new IngredientType();
        Object.assign(newIngredientType, data);
        await newIngredientType.save();
        return newIngredientType;
    }

    // Mutation pour mettre à jour un type d'ingrédient existant
    @Mutation(() => IngredientType, { nullable: true })
    async updateIngredientType(
        @Arg("id", () => ID) id: number,
        @Arg("data", () => IngredientTypeUpdateInput) data: IngredientTypeUpdateInput
    ): Promise<IngredientType | null> {
        const ingredientType = await IngredientType.findOneBy({ id });
        if (ingredientType !== null) {
            Object.assign(ingredientType, data);
            await ingredientType.save();
            return ingredientType;
        } else {
            return null;
        }
    }

    // Mutation pour supprimer un type d'ingrédient
    @Mutation(() => IngredientType, { nullable: true })
    async deleteIngredientType(@Arg("id", () => ID) id: number): Promise<IngredientType | null> {
        const ingredientType = await IngredientType.findOneBy({ id });
        if (ingredientType !== null) {
            await ingredientType.remove();
            return ingredientType;
        } else {
            return null;
        }
    }
}
