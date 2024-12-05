import { Arg, ID, Info, Mutation, Query, Resolver } from "type-graphql";
import { Brand, BrandCreateInput, BrandUpdateInput } from "../entities/BrandEntitie";
import { makeRelations } from "../utils/makeRelations";
import { GraphQLResolveInfo } from "graphql";
import { In } from "typeorm";

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
        const uniqueNames = [...new Set(data.map((brand) => brand.name))];

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
        for (const name of uniqueNames) {
            const brand = new Brand();
            brand.name = name;
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
        if (!brand) return null;

        await brand.remove();
        return brand;
    }


}
