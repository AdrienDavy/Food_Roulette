import { Arg, ID, Info, Mutation, Query, Resolver } from "type-graphql";
import { Shop, ShopCreateInput, ShopUpdateInput } from "../entities/ShopEntitie";
import { makeRelations } from "../utils/makeRelations";
import { GraphQLResolveInfo } from "graphql";
import { In } from "typeorm";
import { Brand } from "../entities/BrandEntitie";
import { Ingredient } from "../entities/IngredientEntitie";

@Resolver()
export class ShopResolver {
    @Query(() => [Shop])
    async shops(@Info() info: GraphQLResolveInfo): Promise<Shop[]> {
        return await Shop.find({
            relations: makeRelations(info, Shop),
        });
    }

    @Query(() => Shop, { nullable: true })
    async shop(@Arg("id", () => ID) id: number, @Info() info: GraphQLResolveInfo): Promise<Shop | null> {
        return await Shop.findOne({
            where: { id },
            relations: makeRelations(info, Shop),
        });
    }

    @Mutation(() => [Shop])
    async createShops(
        @Arg("data", () => [ShopCreateInput]) data: ShopCreateInput[]
    ): Promise<Shop[]> {
        // Déduplique les noms
        const uniqueNames = [...new Set(data.map((shop) => shop.name))];

        // Vérifie les doublons existants
        const existingShops = await Shop.find({
            where: {
                name: In(uniqueNames),
            },
        });

        if (existingShops.length > 0) {
            const existingNames = existingShops.map((b) => b.name).join(", ");
            throw new Error(
                `The following shops already exist: ${existingNames}`
            );
        }

        // Crée les nouvelles marques
        const shops: Shop[] = [];
        for (const name of uniqueNames) {
            const shop = new Shop();
            shop.name = name;
            await shop.save();
            shops.push(shop);
        }

        return shops;
    }

    @Mutation(() => Shop, { nullable: true })
    async updateShop(
        @Arg("id", () => ID) id: number,
        @Arg("data", () => ShopCreateInput) data: ShopCreateInput
    ): Promise<Shop | null> {
        const shop = await Shop.findOne({
            where: { id },
            relations: ["brands", "ingredients"],
        });
        if (!shop) return null;

        // Mise à jour des relations
        if (data.brandIds) {
            shop.brands = await Brand.find({
                where: { id: In(data.brandIds) }, // Utilise `In` pour chercher plusieurs IDs
            });
        }
        if (data.ingredientIds) {
            shop.ingredients = await Ingredient.find({
                where: { id: In(data.ingredientIds) },
            });
        }

        // Mise à jour des autres champs
        Object.assign(shop, data);
        await shop.save();
        return shop;
    }


    @Mutation(() => Shop, { nullable: true })
    async deleteShop(@Arg("id", () => ID) id: number): Promise<Shop | null> {
        const shop = await Shop.findOneBy({ id });
        if (!shop) return null;

        await shop.remove();
        return shop;
    }


}
