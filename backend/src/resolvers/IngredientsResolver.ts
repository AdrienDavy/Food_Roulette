import { Arg, ID, Info, Mutation, Query, Resolver } from "type-graphql";
import { Ingredient, IngredientCreateInput, IngredientUpdateInput } from "../entities/IngredientEntitie";
import { IngredientType } from "../entities/IngredientTypeEntitie";
import { Season } from "../entities/SeasonEntitie";
import { validate } from "class-validator";
import { GraphQLResolveInfo } from "graphql";
import { makeRelations } from "../utils/makeRelations";
import { Shop } from "../entities/ShopEntitie";
import { cleanAndCapitalize } from "../utils/cleanAndCapitalizeFirstLetter";
import { In } from "typeorm";
import { IdInput } from "../entities/id";

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
    async ingredient(@Arg("id", () => IdInput) id: number, @Info() info: GraphQLResolveInfo): Promise<Ingredient | null> {
        const ingredient = await Ingredient.findOne({
            where: { id },
            relations: makeRelations(info, Ingredient)
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
        // Vérifie si un ingrédient avec le même nom existe déjà
        const existingIngredient = await Ingredient.findOneBy({ name: cleanAndCapitalize(data.name) });
        if (existingIngredient) {
            throw new Error(`An ingredient with the name "${data.name}" already exists.`);
        }

        const newIngredient = new Ingredient();

        // Associe le type si fourni
        if (data.typeId) {
            const type = await IngredientType.findOneBy({ id: data.typeId });
            if (!type) throw new Error("Invalid typeId");
            newIngredient.type = type;
        }

        // Associe la saison si fournie
        if (data.seasonId) {
            const season = await Season.findOneBy({ id: data.seasonId });
            if (!season) throw new Error("Invalid seasonId");
            newIngredient.season = season;
        }

        // Associe les magasins si fournis
        if (data.shopIds && data.shopIds.length > 0) {
            const shops = await Shop.findBy({ id: In(data.shopIds) });
            if (shops.length !== data.shopIds.length) {
                throw new Error("Some shop IDs are invalid.");
            }
            newIngredient.shops = shops;
        }



        // Assigne les autres champs
        Object.assign(newIngredient, { ...data });

        // Nettoie et capitalise le nom
        newIngredient.name = cleanAndCapitalize(newIngredient.name);

        // Sauvegarde l'ingrédient
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
            relations: {
                type: true,
                season: true,
                shops: true
            },
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


        if (data.shopId) {
            const shop = await Shop.findOneBy({ id: data.shopId });
            if (!shop) throw new Error("Invalid shopId");
            ingredient.shops = [shop];
        }

        Object.assign(ingredient, data);
        await ingredient.save();
        return ingredient;
    }

    @Mutation(() => Ingredient, { nullable: true })
    async deleteIngredient(@Arg("id", () => ID) id: number): Promise<Ingredient | null> {
        const ingredient = await Ingredient.findOneBy({ id });
        if (ingredient !== null) {
            await ingredient.remove();
            Object.assign(ingredient, { id });
            return ingredient;
        } else {
            return null;
        }
    }
}
