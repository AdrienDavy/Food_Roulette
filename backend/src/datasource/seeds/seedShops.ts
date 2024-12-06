import { Shop } from "../../entities/ShopEntitie";

export async function seedShops() {
    const shopsData = ["Super U", "Intermarché", "Carrefour", "Leclerc"];
    for (const name of shopsData) {
        const existingShop = await Shop.findOneBy({ name });
        if (!existingShop) {
            const shop = new Shop();
            shop.name = name;
            await shop.save();
        }
    }
}
