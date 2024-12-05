import { Arg, ID, Info, Mutation, Query, Resolver } from "type-graphql";
import { Ingredient, IngredientCreateInput, IngredientUpdateInput } from "../entities/IngredientEntitie";
import { IngredientType } from "../entities/IngredientTypeEntitie";
import { Season } from "../entities/SeasonEntitie";
import { validate } from "class-validator";
import { GraphQLResolveInfo } from "graphql";
import { makeRelations } from "../utils/makeRelations";
import { Brand } from "../entities/BrandEntitie";
import { Shop } from "../entities/ShopEntitie";

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
    async ingredient(@Arg("id", () => ID) id: number, @Info() info: GraphQLResolveInfo): Promise<Ingredient | null> {
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
        const existingIngredient = await Ingredient.findOneBy({ name: data.name });
        if (existingIngredient) {
            throw new Error(`An ingredient with the name "${data.name}" already exists.`);
        }

        // Vérifie si le type existe
        const type = data.typeId ? await IngredientType.findOneBy({ id: data.typeId }) : null;
        if (data.typeId && !type) {
            throw new Error(`No ingredient type found with id "${data.typeId}".`);
        }

        // Vérifie si la saison existe
        const season = data.seasonId ? await Season.findOneBy({ id: data.seasonId }) : null;
        if (data.seasonId && !season) {
            throw new Error(`No season found with id "${data.seasonId}".`);
        }

        // Vérifie si la saison existe
        const brand = data.brandId ? await Season.findOneBy({ id: data.brandId }) : null;
        if (data.brandId && !brand) {
            throw new Error(`No brand found with id "${data.brandId}".`);
        }

        // Vérifie si la saison existe
        const shop = data.shopId ? await Season.findOneBy({ id: data.shopId }) : null;
        if (data.shopId && !shop) {
            throw new Error(`No shop found with id "${data.shopId}".`);
        }

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

        if (data.brandId) {
            const brand = await Brand.findOneBy({ id: data.brandId });
            if (!brand) throw new Error("Invalid brandId");
            newIngredient.brand = brand;
        }

        if (data.shopId) {
            const shop = await Shop.findOneBy({ id: data.shopId });
            if (!shop) throw new Error("Invalid shopId");
            newIngredient.shops = [shop];

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
            relations: {
                type: true,
                season: true,
                brand: true,
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

        if (data.brandId) {
            const brand = await Brand.findOneBy({ id: data.brandId });
            if (!brand) throw new Error("Invalid brandId");
            ingredient.brand = brand;
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
