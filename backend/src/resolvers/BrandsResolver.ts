import { Arg, ID, Info, Mutation, Query, Resolver } from "type-graphql";
import { Brand, BrandCreateInput, BrandUpdateInput } from "../entities/BrandEntitie";
import { makeRelations } from "../utils/makeRelations";
import { GraphQLResolveInfo } from "graphql";
import { In } from "typeorm";
import { cleanAndCapitalize } from "../utils/cleanAndCapitalizeFirstLetter";
import { IngredientVariation } from "../entities/IngredientVariationEntitie";

@Resolver()
export class BrandResolver {
    @Query(() => [Brand])
    async brands(@Info() info: GraphQLResolveInfo): Promise<Brand[]> {
        return await Brand.find({
            relations: makeRelations(info, Brand),
        });
    }

    @Query(() => Brand, { nullable: true })
    async brand(@Arg("id", () => ID) id: number, @Info() info: GraphQLResolveInfo): Promise<Brand | null> {
        return await Brand.findOne({
            where: { id },
            relations: makeRelations(info, Brand),
        });
    }

    @Mutation(() => Brand, { nullable: true })
    async createBrand(
        @Arg("data", () => BrandCreateInput) data: BrandCreateInput
    ): Promise<Brand> {
        // Vérifie si un ingrédient avec le même nom existe déjà
        const existingBrand = await Brand.findOneBy({ name: cleanAndCapitalize(data.name) });
        if (existingBrand) {
            throw new Error(`La marque "${data.name}" existe déjà !`);
        }

        const newBrand = new Brand();

        Object.assign(newBrand, { ...data });
        newBrand.name = cleanAndCapitalize(data.name);
        await newBrand.save();
        return newBrand;
    }


    @Mutation(() => Brand, { nullable: true })
    async updateBrand(
        @Arg("id", () => ID) id: number,
        @Info() info: GraphQLResolveInfo,
        @Arg("data", () => BrandUpdateInput) data: BrandUpdateInput
    ): Promise<Brand | null> {
        const brand = await Brand.findOne({
            where: { id },
            relations: makeRelations(info, Brand), // Charge les relations existantes si nécessaire
        });
        if (!brand) return null;

        // Mise à jour des champs simples
        if (data.name) brand.name = data.name;
        if (data.image) brand.image = data.image;

        // Mise à jour des ingrédients (ingredientVariationIds)
        if (data.ingredientVariationIds) {
            const ingredientVariations = await IngredientVariation.findBy({
                id: In(data.ingredientVariationIds),
            });

            if (ingredientVariations.length !== data.ingredientVariationIds.length) {
                throw new Error("Some ingredient IDs are invalid.");
            }

            // Associe les nouveaux ingrédients
            brand.ingredientVariations = ingredientVariations;
        }

        await brand.save();
        return brand;
    }


    @Mutation(() => Brand, { nullable: true })
    async deleteBrand(@Arg("id", () => ID) id: number): Promise<Brand | null> {
        const brand = await Brand.findOneBy({ id });
        if (brand !== null) {
            await brand.remove();
            Object.assign(brand, { id });
            return brand;
        } else {
            return null;
        }
    }


}
