import { Arg, ID, Info, Mutation, Query, Resolver } from "type-graphql";
import { Ingredient } from "../entities/IngredientEntitie";
import { IngredientVariation, IngredientVariationCreateInput, IngredientVariationUpdateInput } from "../entities/IngredientVariationEntitie";
import { makeRelations } from "../utils/makeRelations";
import { GraphQLResolveInfo } from "graphql";
import { In } from "typeorm";
import { cleanAndCapitalize } from "../utils/cleanAndCapitalizeFirstLetter";
import { IngredientType } from "../entities/IngredientTypeEntitie";
import { Season } from "../entities/SeasonEntitie";
import { Shop } from "../entities/ShopEntitie";
import { Brand } from "../entities/BrandEntitie";

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

    @Mutation(() => IngredientVariation)
    async createIngredientVariation(
        @Arg("data", () => IngredientVariationCreateInput) data: IngredientVariationCreateInput): Promise<IngredientVariation> {
        // Vérifie si un ingrédient avec le même nom existe déjà
        const existingIngredientVariation = await IngredientVariation.findOneBy({ name: cleanAndCapitalize(data.name) });
        if (existingIngredientVariation) {
            throw new Error(`An ingredient with the name "${data.name}" already exists.`);
        }

        const newIngredientVariation = new IngredientVariation();

        // Associe le type si fourni
        if (data.ingredientId) {
            const ingredient = await Ingredient.findOneBy({ id: data.ingredientId });
            if (!ingredient) throw new Error("Invalid ingredientId");
            newIngredientVariation.ingredient = ingredient;
        }

        // Associe le type si fourni
        if (data.brandId) {
            const brand = await Brand.findOneBy({ id: data.brandId });
            if (!brand) throw new Error("Invalid brandId");
            newIngredientVariation.brand = brand;
        }

        // Associe le type si fourni
        if (data.typeId) {
            const type = await IngredientType.findOneBy({ id: data.typeId });
            if (!type) throw new Error("Invalid typeId");
            newIngredientVariation.type = type;
        }

        // Associe la saison si fournie
        if (data.seasonId) {
            const season = await Season.findOneBy({ id: data.seasonId });
            if (!season) throw new Error("Invalid seasonId");
            newIngredientVariation.season = season;
        }

        // Associe les magasins si fournis
        if (data.shopIds && data.shopIds.length > 0) {
            const shops = await Shop.findBy({ id: In(data.shopIds) });
            if (shops.length !== data.shopIds.length) {
                throw new Error("Some shop IDs are invalid.");
            }
            newIngredientVariation.shops = shops;
        }



        // Assigne les autres champs
        Object.assign(newIngredientVariation, { ...data });

        // Nettoie et capitalise le nom
        newIngredientVariation.name = cleanAndCapitalize(newIngredientVariation.name);

        // Sauvegarde l'ingrédient
        await newIngredientVariation.save();
        return newIngredientVariation;
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
