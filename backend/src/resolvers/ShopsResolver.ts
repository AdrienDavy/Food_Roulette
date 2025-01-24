import { Arg, ID, Info, Mutation, Query, Resolver } from "type-graphql";
import {
  Shop,
  ShopCreateInput,
  ShopUpdateInput,
} from "../entities/ShopEntitie";
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
  async shop(
    @Arg("id", () => ID) id: number,
    @Info() info: GraphQLResolveInfo
  ): Promise<Shop | null> {
    return await Shop.findOne({
      where: { id },
      relations: makeRelations(info, Shop),
    });
  }

  @Mutation(() => Shop)
  async createShop(
    @Arg("data", () => ShopCreateInput) data: ShopCreateInput
  ): Promise<Shop> {
    // Déduplique les noms
    const uniqueName = [...new Set(data.name)];

    // Vérifie les doublons existants
    const existingShops = await Shop.find({
      where: {
        name: In(uniqueName),
      },
    });

    if (existingShops.length > 0) {
      const existingNames = existingShops.map((b) => b.name).join(", ");
      throw new Error(`The following shops already exist: ${existingNames}`);
    }

    const shop = new Shop();
    Object.assign(shop, data);
    await shop.save();
    return shop;
  }

  @Mutation(() => Shop, { nullable: true })
  async updateShop(
    @Arg("id", () => ID) id: number,
    @Arg("data", () => ShopUpdateInput) data: ShopUpdateInput
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
    if (shop !== null) {
      await shop.remove();
      Object.assign(shop, { id });
      return shop;
    } else {
      return null;
    }
  }
}
