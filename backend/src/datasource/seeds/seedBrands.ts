import { Brand } from "../../entities/BrandEntitie";

export async function seedBrands() {
    const brandsData = ["Lustucru", "Bonduelle", "Herta", "La Laitière"];
    for (const name of brandsData) {
        const existingBrand = await Brand.findOneBy({ name });
        if (!existingBrand) {
            const brand = new Brand();
            brand.name = name;
            await brand.save();
        }
    }
}
