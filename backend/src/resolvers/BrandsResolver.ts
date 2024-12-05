import { Arg, ID, Info, Mutation, Query, Resolver } from "type-graphql";
import { Brand, BrandCreateInput, BrandUpdateInput } from "../entities/BrandEntitie";
import { makeRelations } from "../utils/makeRelations";
import { GraphQLResolveInfo } from "graphql";
import { In } from "typeorm";
import { cleanAndCapitalize } from "../utils/cleanAndCapitalizeFirstLetter";
import { Ingredient } from "../entities/IngredientEntitie";

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

    @Mutation(() => [Brand])
    async createBrands(
        @Arg("data", () => [BrandCreateInput]) data: BrandCreateInput[]
    ): Promise<Brand[]> {
        // Déduplique les noms
        const uniqueNames = [...new Set(data.map((brand) => cleanAndCapitalize(brand.name)))];

        // Vérifie les doublons existants
        const existingBrands = await Brand.find({
            where: {
                name: In(uniqueNames),
            },
        });

        if (existingBrands.length > 0) {
            const existingNames = existingBrands.map((b) => b.name).join(", ");
            throw new Error(
                `The following brands already exist: ${existingNames}`
            );
        }

        // Crée les nouvelles marques
        const brands: Brand[] = [];
        for (const item of data) {
            const brand = new Brand();
            brand.name = cleanAndCapitalize(item.name);
            brand.image = item.image;

            // Si des ingredientIds sont fournis, les associer
            if (item.ingredientIds && item.ingredientIds.length > 0) {
                const ingredients = await Ingredient.findBy({
                    id: In(item.ingredientIds),
                });

                if (ingredients.length !== item.ingredientIds.length) {
                    throw new Error("Some ingredient IDs are invalid.");
                }

                brand.ingredients = ingredients;
            }

            await brand.save();
            brands.push(brand);
        }

        return brands;
    }


    @Mutation(() => Brand, { nullable: true })
    async updateBrand(
        @Arg("id", () => ID) id: number,
        @Arg("data", () => BrandUpdateInput) data: BrandUpdateInput
    ): Promise<Brand | null> {
        const brand = await Brand.findOneBy({ id });
        if (!brand) return null;

        // Mise à jour des données
        Object.assign(brand, data);
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
